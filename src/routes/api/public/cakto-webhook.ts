import { createFileRoute } from "@tanstack/react-router";
import { createHmac, timingSafeEqual } from "crypto";

// Receives Cakto "purchase_approved" notifications. Signature (HMAC-SHA256 over
// `${timestamp}.${rawBody}`) and timestamp freshness are verified before use.
export const Route = createFileRoute("/api/public/cakto-webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const secret = process.env["CAKTO_WEBHOOK_SECRET"];
        if (!secret) return Response.json({ error: "Webhook não configurado" }, { status: 503 });

        const raw = await request.text();
        if (raw.length > 1024 * 1024) return Response.json({ error: "Payload muito grande" }, { status: 413 });

        const ts = request.headers.get("x-cakto-timestamp") ?? "";
        const sig = request.headers.get("x-cakto-signature") ?? "";
        if (!/^\d{10,}$/.test(ts) || Math.abs(Date.now() / 1000 - Number(ts)) > 300)
          return Response.json({ error: "Assinatura inválida" }, { status: 401 });

        const expected = "v1=" + createHmac("sha256", secret).update(`${ts}.${raw}`).digest("hex");
        const a = Buffer.from(sig);
        const b = Buffer.from(expected);
        if (a.length !== b.length || !timingSafeEqual(a, b))
          return Response.json({ error: "Assinatura inválida" }, { status: 401 });

        let payload: { event?: string; data?: unknown };
        try {
          payload = JSON.parse(raw);
        } catch {
          return Response.json({ error: "JSON inválido" }, { status: 400 });
        }
        const records = Array.isArray(payload.data) ? payload.data : [payload.data];
        for (const item of records) {
          if (!item || typeof item !== "object") continue;
          const d = item as { id?: string; status?: string; offer?: { id?: string } };
          if (payload.event === "purchase_approved" && d.status === "paid")
            console.info("Pagamento aprovado (entrega automática pendente):", { id: d.id, offer: d.offer?.id });
        }
        return Response.json({ received: true }, { headers: { "Cache-Control": "no-store" } });
      },
    },
  },
});
