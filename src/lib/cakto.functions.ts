import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { cakto, offerFor } from "./cakto.server";
import { PLANS, digits, validDocument } from "./plans";

export const getPaymentConfig = createServerFn({ method: "GET" }).handler(async () => {
  return {
    cardClientId: process.env["CAKTO_CLIENT_ID"] ?? null,
    basicoReady: !!process.env["CAKTO_OFFER_ID_BASICO"],
    completoReady: !!process.env["CAKTO_OFFER_ID_COMPLETO"],
    cardEnabled: process.env["CAKTO_ENABLE_CARD"] === "true",
  };
});

const paySchema = z.object({
  plan: z.enum(["basico", "completo"]),
  method: z.enum(["pix", "card"]),
  name: z.string().trim().min(3).max(255),
  email: z.string().trim().email().max(254),
  phone: z.string().max(20),
  document: z.string().max(20),
  fingerprint: z.string().min(8).max(128),
  idempotencyKey: z.string().regex(/^[a-f0-9-]{36}$/i),
  cardToken: z.string().min(8).max(512).optional(),
  antifraudReference: z.string().min(8).max(512).optional(),
});

type PayResult =
  | {
      ok: true;
      id: string;
      status: string | null;
      amount: number | null;
      pixCode: string | null;
    }
  | { ok: false; error: string };

export const createPayment = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => paySchema.parse(input))
  .handler(async ({ data }): Promise<PayResult> => {
    try {
      const plan = PLANS[data.plan];
      const offerId = offerFor(data.plan);
      if (!offerId) return { ok: false, error: "Esta oferta ainda não foi configurada. Nenhuma cobrança foi feita." };

      const doc = digits(data.document);
      const tel = digits(data.phone);
      if (!validDocument(doc) || !(tel.length === 10 || tel.length === 11))
        return { ok: false, error: "Confira seu CPF/CNPJ e WhatsApp." };

      const check = await cakto(`/offers/${encodeURIComponent(offerId)}/`);
      if (!check.ok) return { ok: false, error: "Não foi possível verificar a oferta. Nenhuma cobrança foi feita." };
      const offer = check.body;
      if (
        offer.id !== offerId ||
        offer.status !== "active" ||
        offer.type !== "unique" ||
        offer.currency !== "BRL" ||
        !Number.isFinite(Number(offer.price)) ||
        Math.abs(Number(offer.price) - plan.price) > 0.009
      )
        return { ok: false, error: "Preço ou configuração da oferta incorretos. Nenhuma cobrança foi feita." };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const payload: Record<string, any> = {
        paymentMethod: data.method === "pix" ? "pix" : "credit_card",
        customer: {
          name: data.name,
          email: data.email,
          phone: `55${tel}`,
          fingerprint: data.fingerprint,
          docType: doc.length === 11 ? "cpf" : "cnpj",
          docNumber: doc,
        },
        items: [{ offerId, quantity: 1, offerType: "main" }],
      };

      if (data.method === "card") {
        if (process.env["CAKTO_ENABLE_CARD"] !== "true")
          return { ok: false, error: "Pagamento por cartão ainda não está disponível." };
        if (!data.cardToken || !data.antifraudReference)
          return { ok: false, error: "Não foi possível validar o cartão com segurança." };
        payload["card"] = { token: data.cardToken };
        payload["installments"] = 1;
        payload["antifraud_profiling_attempt_reference"] = data.antifraudReference;
      }

      const result = await cakto("/payments/", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Idempotency-Key": data.idempotencyKey },
        body: JSON.stringify(payload),
      });
      if (!result.ok) {
        console.error("Cakto cobrança erro HTTP", result.status);
        return {
          ok: false,
          error:
            result.status === 403
              ? "A conta de pagamentos está sem permissão para cobrar."
              : "Não foi possível criar a cobrança. Tente novamente em instantes.",
        };
      }
      const p = result.body;
      if (p.offer?.id && p.offer.id !== offerId)
        return { ok: false, error: "A oferta retornada não confere. Fale com o suporte antes de pagar." };
      if (!Number.isFinite(Number(p.amount)) || Number(p.amount) < plan.price - 0.009)
        return { ok: false, error: "Cobrança criada com valor inesperado. Não pague e fale com o suporte." };

      return {
        ok: true,
        id: String(p.id),
        status: p.status ?? null,
        amount: Number(p.amount),
        pixCode: data.method === "pix" ? (p.pix?.qrCode ?? null) : null,
      };
    } catch (e) {
      console.error("Erro no pagamento:", e instanceof Error ? e.message : e);
      return { ok: false, error: "Serviço de pagamento temporariamente indisponível." };
    }
  });

export const getOrderStatus = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    z.object({ id: z.string().regex(/^[a-f\d-]{36}$/i) }).parse(input),
  )
  .handler(async ({ data }) => {
    try {
      const result = await cakto(`/orders/${encodeURIComponent(data.id)}/`);
      if (!result.ok) return { ok: false as const, paid: false };
      return { ok: true as const, paid: result.body.status === "paid", status: String(result.body.status ?? "") };
    } catch {
      return { ok: false as const, paid: false };
    }
  });
