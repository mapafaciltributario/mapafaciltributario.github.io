import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import QRCode from "qrcode";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Copy,
  CreditCard,
  Gift,
  Loader2,
  Lock,
  Mail,
  ShieldCheck,
  Smartphone,
  Zap,
} from "lucide-react";

import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { LiveDot } from "@/components/landing/Effects";
import { createPayment, getOrderStatus, getPaymentConfig } from "@/lib/cakto.functions";
import {
  BONUSES,
  GUARANTEE_DAYS,
  PLANS,
  bonusTotal,
  brl,
  digits,
  luhn,
  maskCard,
  maskDocument,
  maskExpiry,
  maskPhone,
  upgradeDiff,
  validDocument,
  validPhone,
  type PlanId,
} from "@/lib/plans";
import { cn } from "@/lib/utils";
import { getTrackingMetadata } from "@/lib/tracking";
import productAsset from "@/assets/mapa-facil-colecao.jpg";

const configQuery = queryOptions({
  queryKey: ["payment-config"],
  queryFn: () => getPaymentConfig(),
  staleTime: 60_000,
});

export const Route = createFileRoute("/checkout")({
  validateSearch: (search: Record<string, unknown>): { plano: PlanId } => ({
    plano: search["plano"] === "completo" ? "completo" : "basico",
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(configQuery),
  head: () => ({
    meta: [
      { title: "Finalizar compra — Mapa Fácil da Reforma Tributária" },
      { name: "description", content: "Finalize sua compra do Mapa Fácil com Pix em segundos. Acesso imediato e 7 dias de garantia." },
      { property: "og:title", content: "Finalizar compra — Mapa Fácil" },
      { property: "og:description", content: "Pagamento seguro via Pix e acesso imediato ao material." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CheckoutPage,
});

type Method = "pix" | "card";
type Fields = { name: string; email: string; document: string; phone: string };
type Errors = Partial<Record<keyof Fields | "card", string>>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CaktoSdk = any;

function randomId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  // fallback v4-like
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

function validateField(key: keyof Fields, value: string): string | undefined {
  const v = value.trim();
  if (key === "name") return v.length >= 3 && v.includes(" ") ? undefined : "Digite seu nome completo.";
  if (key === "email") return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? undefined : "Digite um e-mail válido.";
  if (key === "document") return validDocument(v) ? undefined : "CPF ou CNPJ inválido.";
  return validPhone(v) ? undefined : "Informe o WhatsApp com DDD.";
}

function CheckoutPage() {
  const { plano } = Route.useSearch();
  const navigate = useNavigate({ from: "/checkout" });
  const { data: config } = useSuspenseQuery(configQuery);
  const pay = useServerFn(createPayment);
  const checkOrder = useServerFn(getOrderStatus);

  const plan = PLANS[plano];
  const [fields, setFields] = useState<Fields>({ name: "", email: "", document: "", phone: "" });
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [errors, setErrors] = useState<Errors>({});
  const [method, setMethod] = useState<Method>("pix");
  const [card, setCard] = useState({ holder: "", number: "", expiry: "", cvv: "" });
  const [working, setWorking] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [pix, setPix] = useState<{ id: string; code: string; amount: number; qr: string | null } | null>(null);
  const [paid, setPaid] = useState(false);
  const [copied, setCopied] = useState(false);

  const fingerprint = useRef<string>("");
  const attempt = useRef<{ sig: string; key: string } | null>(null);
  const sdk = useRef<CaktoSdk>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const cardAvailable = config.cardEnabled && !!config.cardClientId;
  const planReady = plano === "basico" ? config.basicoReady : config.completoReady;

  useEffect(() => {
    try {
      let fp = sessionStorage.getItem("mapa_fp");
      if (!fp) {
        fp = randomId();
        sessionStorage.setItem("mapa_fp", fp);
      }
      fingerprint.current = fp;
    } catch {
      fingerprint.current = randomId();
    }
  }, []);

  // Meta Pixel: one InitiateCheckout per checkout page entry.
  // A plan switch changes the URL but does not re-trigger this event.
  // The ref also protects against React StrictMode effect replays.
  const checkoutTracked = useRef(false);
  useEffect(() => {
    if (checkoutTracked.current) return;
    const fbq = (window as Window & {
      fbq?: (...args: unknown[]) => void;
    }).fbq;
    if (typeof fbq !== "function") return;
    checkoutTracked.current = true;
    fbq("track", "InitiateCheckout", {
      currency: "BRL",
      value: PLANS[plano].price,
      content_name: "Mapa Fácil da Reforma Tributária",
      content_type: "product",
      content_ids: [plano],
      num_items: 1,
    });
  }, [plano]);

  // Load the Cakto card SDK only when card payments are enabled and chosen.
  useEffect(() => {
    if (!cardAvailable || method !== "card" || sdk.current) return;
    const w = window as unknown as { Cakto?: { CaktoSDK: new (o: { client_id: string }) => CaktoSdk } };
    const init = () => {
      try {
        if (w.Cakto?.CaktoSDK) {
          sdk.current = new w.Cakto.CaktoSDK({ client_id: config.cardClientId! });
          sdk.current.initAntifraud?.().catch?.(() => {});
        }
      } catch {
        sdk.current = null;
      }
    };
    if (w.Cakto?.CaktoSDK) {
      init();
      return;
    }
    const s = document.createElement("script");
    s.src = "https://cakto-sdk.pages.dev/cakto-sdk.min.js";
    s.async = true;
    s.onload = init;
    document.head.appendChild(s);
  }, [cardAvailable, method, config.cardClientId]);

  // Poll the order status after the Pix is generated.
  useEffect(() => {
    if (!pix || paid) return;
    let alive = true;
    const tick = async () => {
      try {
        const r = await checkOrder({ data: { id: pix.id } });
        if (alive && r.paid) setPaid(true);
      } catch {
        /* keep waiting */
      }
    };
    tick();
    const t = setInterval(tick, 8000);
    return () => {
      alive = false;
      clearInterval(t);
    };
  }, [pix, paid, checkOrder]);

  function setField(key: keyof Fields, raw: string) {
    const value = key === "document" ? maskDocument(raw) : key === "phone" ? maskPhone(raw) : raw;
    setFields((f) => ({ ...f, [key]: value }));
    if (touched[key]) setErrors((e) => ({ ...e, [key]: validateField(key, value) }));
  }

  function blur(key: keyof Fields) {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors((e) => ({ ...e, [key]: validateField(key, fields[key]) }));
  }

  function setPlan(next: PlanId) {
    navigate({ search: { plano: next }, replace: true, resetScroll: false });
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (working || pix) return;
    setMessage(null);

    const nextErrors: Errors = {};
    (Object.keys(fields) as (keyof Fields)[]).forEach((k) => {
      const err = validateField(k, fields[k]);
      if (err) nextErrors[k] = err;
    });
    setTouched({ name: true, email: true, document: true, phone: true });
    setErrors(nextErrors);
    const first = Object.keys(nextErrors)[0];
    if (first) {
      document.getElementById(`f-${first}`)?.focus();
      return;
    }
    if (!planReady) {
      setMessage("Esta oferta ainda não está disponível para pagamento. Nenhuma cobrança foi feita.");
      return;
    }

    setWorking(true);
    try {
      const base = {
        plan: plano,
        method,
        name: fields.name.trim(),
        email: fields.email.trim(),
        document: digits(fields.document),
        phone: digits(fields.phone),
        fingerprint: fingerprint.current || randomId(),
        metadata: getTrackingMetadata(),
      };
      const sig = JSON.stringify(base);
      if (!attempt.current || attempt.current.sig !== sig) attempt.current = { sig, key: randomId() };

      let cardExtra: { cardToken?: string; antifraudReference?: string } = {};
      if (method === "card") {
        if (!sdk.current) throw new Error("Cartão indisponível no momento. Use o Pix.");
        const number = digits(card.number);
        const [mm = "", yy = ""] = card.expiry.split("/");
        const cvv = digits(card.cvv);
        if (number.length < 13 || !luhn(number) || !/^(0?[1-9]|1[0-2])$/.test(mm) || !/^\d{2,4}$/.test(yy) || cvv.length < 3) {
          setErrors((er) => ({ ...er, card: "Confira os dados do cartão." }));
          throw new Error("Confira os dados do cartão.");
        }
        await sdk.current.completeAntifraudProfile();
        const antifraudReference = sdk.current.getAntifraudReference();
        const tokenResult = await sdk.current.createToken({
          holderName: card.holder.trim(),
          cardNumber: number,
          cvv,
          expMonth: mm.padStart(2, "0"),
          expYear: yy,
        });
        cardExtra = { cardToken: tokenResult.cardToken, antifraudReference };
      }

      const result = await pay({ data: { ...base, ...cardExtra, idempotencyKey: attempt.current.key } });
      if (!result.ok) throw new Error(result.error);

      if (method === "pix") {
        if (!result.pixCode) throw new Error("O pedido foi criado, mas o código Pix não voltou. Confira antes de tentar de novo.");
        let qr: string | null = null;
        try {
          qr = await QRCode.toDataURL(result.pixCode, { width: 520, margin: 1, errorCorrectionLevel: "M" });
        } catch {
          qr = null;
        }
        setPix({ id: result.id, code: result.pixCode, amount: result.amount ?? plan.price, qr });
        requestAnimationFrame(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
      } else {
        setCard((c) => ({ ...c, number: "", cvv: "" }));
        if (result.status === "paid") setPaid(true);
        else setMessage(`Status do pagamento: ${result.status ?? "em análise"}.`);
      }
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Não foi possível concluir o pagamento.");
    } finally {
      setWorking(false);
    }
  }

  async function copyPix() {
    if (!pix) return;
    try {
      await navigator.clipboard.writeText(pix.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      const el = document.getElementById("pix-code") as HTMLTextAreaElement | null;
      el?.select();
    }
  }

  return (
    <div className="relative min-h-screen overflow-x-clip bg-background">
      <div className="tech-grid pointer-events-none absolute inset-x-0 top-0 h-[520px] [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />
      <div className="aurora pointer-events-none absolute -inset-x-20 -top-32 h-[460px] opacity-60" />

      <header className="relative z-10 border-b border-border bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Logo />
          <span className="glass flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold text-foreground">
            <Lock className="size-3.5 text-primary" /> Checkout seguro
          </span>
        </div>
      </header>

      <main className="relative mx-auto max-w-6xl px-4 pt-6 pb-16 md:pt-10">
        <Progress step={pix ? 3 : 2} />

        <div className="mt-6 grid items-start gap-6 lg:grid-cols-[1fr_400px] lg:gap-8">
          {/* Mobile summary */}
          <div className="lg:hidden">
            <OrderSummary plano={plano} compact />
          </div>

          <section className="rounded-3xl border border-border bg-card p-5 shadow-lift sm:p-8">
            {paid ? (
              <PaidState email={fields.email} />
            ) : pix ? (
              <div ref={resultRef} className="scroll-mt-6">
                <PixPanel pix={pix} copied={copied} onCopy={copyPix} />
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate>
                <StepHead n={1} title="Seus dados" subtitle="Para enviar o acesso ao material." />
                <div className="mt-5 grid gap-4">
                  <Field id="f-name" label="Nome completo" error={errors.name} valid={!!touched.name && !errors.name}>
                    <input id="f-name" className={inputCls(errors.name)} autoComplete="name" placeholder="Como está no seu documento" value={fields.name} onChange={(e) => setField("name", e.target.value)} onBlur={() => blur("name")} maxLength={255} />
                  </Field>
                  <Field id="f-email" label="E-mail" hint="O acesso chega aqui" error={errors.email} valid={!!touched.email && !errors.email}>
                    <input id="f-email" type="email" inputMode="email" className={inputCls(errors.email)} autoComplete="email" placeholder="seuemail@exemplo.com" value={fields.email} onChange={(e) => setField("email", e.target.value)} onBlur={() => blur("email")} maxLength={254} />
                  </Field>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field id="f-document" label="CPF ou CNPJ" error={errors.document} valid={!!touched.document && !errors.document}>
                      <input id="f-document" inputMode="numeric" className={inputCls(errors.document)} autoComplete="off" placeholder="000.000.000-00" value={fields.document} onChange={(e) => setField("document", e.target.value)} onBlur={() => blur("document")} maxLength={18} />
                    </Field>
                    <Field id="f-phone" label="WhatsApp" hint="Também enviamos aqui" error={errors.phone} valid={!!touched.phone && !errors.phone}>
                      <input id="f-phone" type="tel" inputMode="tel" className={inputCls(errors.phone)} autoComplete="tel" placeholder="(11) 99999-9999" value={fields.phone} onChange={(e) => setField("phone", e.target.value)} onBlur={() => blur("phone")} maxLength={16} />
                    </Field>
                  </div>
                </div>

                <div className="my-8 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                <StepHead n={2} title="Pagamento" subtitle="Escolha como prefere pagar." />
                <div className="mt-5 grid gap-3" role="radiogroup" aria-label="Forma de pagamento">
                  <MethodOption
                    selected={method === "pix"}
                    onSelect={() => setMethod("pix")}
                    icon={<PixGlyph />}
                    title="Pix"
                    badge="Aprovação imediata"
                    description="Pague pelo app do seu banco em segundos"
                  />
                  <MethodOption
                    selected={method === "card"}
                    onSelect={() => cardAvailable && setMethod("card")}
                    disabled={!cardAvailable}
                    icon={<CreditCard className="size-5" />}
                    title="Cartão de crédito"
                    description={cardAvailable ? "Pagamento à vista" : "Indisponível no momento"}
                  />
                </div>

                {method === "card" && cardAvailable && (
                  <div className="mt-4 grid gap-4 rounded-2xl border border-border bg-surface p-4">
                    <Field id="c-holder" label="Nome impresso no cartão">
                      <input id="c-holder" className={inputCls()} autoComplete="cc-name" value={card.holder} onChange={(e) => setCard({ ...card, holder: e.target.value })} />
                    </Field>
                    <Field id="c-number" label="Número do cartão" error={errors.card}>
                      <input id="c-number" inputMode="numeric" className={inputCls(errors.card)} autoComplete="cc-number" placeholder="0000 0000 0000 0000" value={card.number} onChange={(e) => setCard({ ...card, number: maskCard(e.target.value) })} />
                    </Field>
                    <div className="grid grid-cols-2 gap-4">
                      <Field id="c-exp" label="Validade">
                        <input id="c-exp" inputMode="numeric" className={inputCls()} autoComplete="cc-exp" placeholder="MM/AA" value={card.expiry} onChange={(e) => setCard({ ...card, expiry: maskExpiry(e.target.value) })} />
                      </Field>
                      <Field id="c-cvv" label="CVV">
                        <input id="c-cvv" type="password" inputMode="numeric" className={inputCls()} autoComplete="cc-csc" placeholder="123" maxLength={4} value={card.cvv} onChange={(e) => setCard({ ...card, cvv: digits(e.target.value) })} />
                      </Field>
                    </div>
                  </div>
                )}

                {plano === "basico" ? (
                  <OrderBump onAccept={() => setPlan("completo")} />
                ) : (
                  <div className="mt-6 flex items-center justify-between gap-3 rounded-2xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm">
                    <span className="flex items-center gap-2 font-bold text-foreground">
                      <Gift className="size-4 text-primary" /> Você está levando os 8 bônus
                    </span>
                    <button type="button" onClick={() => setPlan("basico")} className="text-xs font-semibold text-muted-foreground underline underline-offset-2 hover:text-foreground">
                      remover
                    </button>
                  </div>
                )}

                {message && (
                  <div role="alert" className="mt-5 rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm font-semibold text-destructive">
                    {message}
                  </div>
                )}

                <Button type="submit" variant="cta" size="2xl" className="mt-6 w-full" disabled={working}>
                  {working ? (
                    <>
                      <Loader2 className="animate-spin" /> Preparando seu pagamento…
                    </>
                  ) : (
                    <>
                      {method === "pix" ? "Gerar Pix" : "Pagar"} de {brl(plan.price)}
                      <ArrowRight />
                    </>
                  )}
                </Button>
                <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[11px] font-semibold text-muted-foreground">
                  <span className="flex flex-col items-center gap-1 rounded-xl border border-border bg-surface px-2 py-2.5"><Lock className="size-4 text-primary" /> Dados protegidos</span>
                  <span className="flex flex-col items-center gap-1 rounded-xl border border-border bg-surface px-2 py-2.5"><ShieldCheck className="size-4 text-primary" /> {GUARANTEE_DAYS} dias de garantia</span>
                  <span className="flex flex-col items-center gap-1 rounded-xl border border-border bg-surface px-2 py-2.5"><Zap className="size-4 text-primary" /> Acesso imediato</span>
                </div>
              </form>
            )}
          </section>

          <aside className="hidden lg:sticky lg:top-6 lg:block">
            <OrderSummary plano={plano} />
          </aside>
        </div>
      </main>

      <footer className="relative border-t border-border bg-ink py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Mapa Fácil da Reforma Tributária · Material educacional digital
      </footer>
    </div>
  );
}

/* ------------------------------- Pieces ---------------------------------- */

function inputCls(error?: string) {
  return cn(
    "h-13 w-full rounded-xl border bg-surface pr-11 pl-4 text-[16px] text-foreground outline-none transition-[border-color,box-shadow,background-color] placeholder:text-muted-foreground/50",
    "focus:border-primary focus:bg-ink focus:ring-4 focus:ring-primary/20",
    error ? "border-destructive focus:border-destructive focus:ring-destructive/20" : "border-input",
  );
}

function Field({
  id,
  label,
  hint,
  error,
  valid,
  children,
}: {
  id: string;
  label: string;
  hint?: string | undefined;
  error?: string | undefined;
  valid?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 flex items-baseline justify-between text-sm font-bold text-foreground">
        {label}
        {hint && <span className="text-xs font-medium text-muted-foreground">{hint}</span>}
      </label>
      <div className="relative">
        {children}
        {valid && (
          <span className="pointer-events-none absolute top-1/2 right-3.5 grid size-5 -translate-y-1/2 place-items-center rounded-full bg-primary text-primary-foreground animate-in zoom-in-50 duration-200">
            <Check className="size-3" strokeWidth={4} />
          </span>
        )}
      </div>
      {error && <p className="mt-1.5 text-xs font-semibold text-destructive">{error}</p>}
    </div>
  );
}

function StepHead({ n, title, subtitle }: { n: number; title: string; subtitle: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid size-9 shrink-0 place-items-center rounded-full border border-primary/40 bg-ink font-display font-extrabold text-primary shadow-glow">{n}</span>
      <div>
        <h2 className="text-xl leading-tight font-extrabold">{title}</h2>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  );
}

function Progress({ step }: { step: 2 | 3 }) {
  const items = ["Plano", "Dados", "Pagamento"];
  return (
    <ol className="mx-auto flex max-w-md items-center justify-between gap-2 text-xs font-bold">
      {items.map((label, i) => {
        const n = i + 1;
        const done = n < step;
        const active = n === step;
        return (
          <li key={label} className="flex flex-1 items-center gap-2 last:flex-none">
            <span
              className={cn(
                "grid size-7 shrink-0 place-items-center rounded-full transition-colors",
                done && "bg-primary text-primary-foreground",
                active && "border border-primary bg-ink text-primary shadow-glow",
                !done && !active && "border border-border bg-surface text-muted-foreground",
              )}
            >
              {done ? <Check className="size-3.5" strokeWidth={3.5} /> : n}
            </span>
            <span className={active || done ? "text-foreground" : "text-muted-foreground"}>{label}</span>
            {n < items.length && <span className={cn("h-0.5 flex-1 rounded", done ? "bg-primary" : "bg-border")} />}
          </li>
        );
      })}
    </ol>
  );
}

function MethodOption({
  selected,
  onSelect,
  disabled,
  icon,
  title,
  badge,
  description,
}: {
  selected: boolean;
  onSelect: () => void;
  disabled?: boolean;
  icon: ReactNode;
  title: string;
  badge?: string;
  description: string;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      aria-disabled={disabled}
      onClick={onSelect}
      className={cn(
        "flex w-full items-center gap-3.5 rounded-2xl border p-4 text-left transition-all",
        selected ? "border-primary bg-primary/10 shadow-glow" : "border-border bg-surface hover:border-foreground/25",
        disabled && "cursor-not-allowed opacity-50 hover:border-border",
      )}
    >
      <span className={cn("grid size-11 shrink-0 place-items-center rounded-xl", selected ? "bg-primary text-primary-foreground" : "bg-muted text-foreground")}>
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-2 font-bold">
          {title}
          {badge && <span className="rounded-full bg-primary/15 px-2 py-0.5 font-mono-tech text-[9.5px] font-extrabold text-primary uppercase">{badge}</span>}
        </span>
        <span className="block text-sm text-muted-foreground">{description}</span>
      </span>
      <span className={cn("grid size-5 shrink-0 place-items-center rounded-full border-2", selected ? "border-primary" : "border-input")}>
        {selected && <span className="size-2.5 rounded-full bg-primary" />}
      </span>
    </button>
  );
}

function PixGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
      <path d="M12 2.5 8.6 5.9l2.1 2.1a1.8 1.8 0 0 0 2.6 0l2.1-2.1L12 2.5Zm-5.5 5.5L2.5 12l4 4h1.3a2.6 2.6 0 0 0 1.8-.8l2-2a.6.6 0 0 1 .8 0l2 2c.5.5 1.1.8 1.8.8h1.3l4-4-4-4h-1.3c-.7 0-1.3.3-1.8.8l-2 2a.6.6 0 0 1-.8 0l-2-2a2.6 2.6 0 0 0-1.8-.8H6.5Zm4.2 8-2.1 2.1L12 21.5l3.4-3.4-2.1-2.1a1.8 1.8 0 0 0-2.6 0Z" />
    </svg>
  );
}

function OrderBump({ onAccept }: { onAccept: () => void }) {
  return (
    <button
      type="button"
      onClick={onAccept}
      className="group relative mt-6 block w-full overflow-hidden rounded-2xl border-2 border-dashed border-highlight/70 bg-highlight/10 p-4 text-left transition-all hover:border-highlight hover:bg-highlight/15"
    >
      <span className="flex items-start gap-3">
        <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-[6px] border-2 border-highlight bg-ink transition-colors group-hover:bg-highlight">
          <Check className="size-3.5 text-accent-foreground opacity-0 transition-opacity group-hover:opacity-100" strokeWidth={4} />
        </span>
        <span className="min-w-0">
          <span className="block font-mono-tech text-[10px] font-extrabold text-highlight uppercase">Oferta única nesta página</span>
          <span className="mt-1 block leading-snug font-bold">
            Sim! Quero levar os <span className="text-highlight">8 bônus</span> por só +{brl(upgradeDiff())}
          </span>
          <span className="mt-1 block text-sm text-muted-foreground">
            Planilha calculadora de IBS/CBS, tabela de códigos, gabarito da nota fiscal, guia de emissão e mais 4 materiais
            {" "}(valem {brl(bonusTotal())}).
          </span>
        </span>
      </span>
    </button>
  );
}

function OrderSummary({ plano, compact }: { plano: PlanId; compact?: boolean }) {
  const plan = PLANS[plano];
  if (compact) {
    return (
      <div className="flex items-center gap-4 rounded-3xl border border-border bg-card p-3 shadow-card">
        <img src={productAsset} alt="Mapa Fácil da Reforma Tributária" className="size-20 shrink-0 rounded-2xl object-cover" />
        <div className="min-w-0 flex-1">
          <p className="font-mono-tech text-[10px] font-extrabold text-primary uppercase">{plan.name}</p>
          <p className="truncate font-bold">{plan.title}</p>
          <p className="mt-0.5 flex items-baseline gap-2">
            <span className="font-display text-xl font-extrabold">{brl(plan.price)}</span>
            <span className="text-xs text-muted-foreground line-through">{brl(plan.fromPrice)}</span>
            <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-extrabold text-primary">
              −{Math.round(((plan.fromPrice - plan.price) / plan.fromPrice) * 100)}%
            </span>
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-lift">
        <div className="relative">
          <img src={productAsset} alt="Prévia dos materiais do Mapa Fácil" className="aspect-[4/3] w-full object-cover" />
          <div className="scan-line" />
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between">
            <span className="font-mono-tech text-[10px] font-extrabold text-muted-foreground uppercase">Resumo do pedido</span>
            <span className="rounded-full bg-primary/15 px-2.5 py-1 font-mono-tech text-[9.5px] font-extrabold text-primary">100% DIGITAL</span>
          </div>
          <h3 className="mt-3 text-xl font-extrabold">{plan.title}</h3>
          <p className="text-sm text-muted-foreground">{plan.name} · {plan.description}</p>
          {plano === "completo" && (
            <ul className="mt-4 space-y-1.5 text-[13px]">
              {BONUSES.map((b) => (
                <li key={b.title} className="flex items-start gap-2 text-muted-foreground">
                  <Check className="mt-0.5 size-3.5 shrink-0 text-primary" strokeWidth={3} />
                  {b.title}
                </li>
              ))}
            </ul>
          )}
          <div className="mt-5 space-y-2 border-t border-border pt-4 text-sm">
            <Row label="Valor original"><span className="line-through">{brl(plan.fromPrice)}</span></Row>
            <Row label="Desconto"><span className="font-bold text-primary">−{brl(plan.fromPrice - plan.price)}</span></Row>
            <Row label="Entrega digital"><span className="font-bold text-primary">Grátis</span></Row>
          </div>
          <div className="mt-4 flex items-end justify-between border-t border-border pt-4">
            <span className="font-bold">Total</span>
            <span className="font-display text-3xl font-extrabold text-gradient">{brl(plan.price)}</span>
          </div>
          <p className="mt-1 text-right text-xs text-muted-foreground">Pagamento único · sem mensalidade</p>
        </div>
      </div>
      <div className="space-y-3 rounded-3xl border border-border bg-card p-5 shadow-card">
        <Trust icon={<ShieldCheck className="size-4" />} title={`Garantia de ${GUARANTEE_DAYS} dias`} text="Reembolso integral, sem burocracia." />
        <Trust icon={<Zap className="size-4" />} title="Acesso imediato" text="Liberado após a confirmação do pagamento." />
        <Trust icon={<Lock className="size-4" />} title="Pagamento seguro" text="Seus dados são protegidos no processamento." />
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-center justify-between text-muted-foreground">
      <span>{label}</span>
      {children}
    </div>
  );
}

function Trust({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <div className="flex gap-3">
      <span className="grid size-8 shrink-0 place-items-center rounded-full border border-primary/30 bg-primary/10 text-primary">{icon}</span>
      <div className="text-sm">
        <p className="font-bold">{title}</p>
        <p className="text-muted-foreground">{text}</p>
      </div>
    </div>
  );
}

function PixPanel({
  pix,
  copied,
  onCopy,
}: {
  pix: { code: string; amount: number; qr: string | null };
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <div>
      <div className="flex items-center gap-3 rounded-2xl border border-primary/30 bg-primary/10 p-4">
        <CheckCircle2 className="size-7 shrink-0 text-primary" />
        <div>
          <h2 className="text-lg leading-tight font-extrabold">Pix gerado! Falta só pagar.</h2>
          <p className="text-sm text-muted-foreground">Valor: <strong className="text-foreground">{brl(pix.amount)}</strong></p>
        </div>
      </div>

      <Button type="button" variant="cta" size="2xl" className="mt-6 w-full" onClick={onCopy}>
        {copied ? <><Check /> Código copiado!</> : <><Copy /> Copiar código Pix</>}
      </Button>

      <ol className="mt-6 space-y-3 text-sm">
        {["Abra o app do seu banco e escolha Pix", "Selecione “Pix Copia e Cola” e cole o código", "Confirme o pagamento — o acesso é liberado em seguida"].map((t, i) => (
          <li key={t} className="flex items-center gap-3">
            <span className="grid size-6 shrink-0 place-items-center rounded-full border border-primary/40 bg-ink text-xs font-extrabold text-primary">{i + 1}</span>
            {t}
          </li>
        ))}
      </ol>

      <div className="mt-6 grid gap-5 rounded-2xl border border-border bg-surface p-4 sm:grid-cols-[180px_1fr] sm:items-center">
        <div className="relative mx-auto w-44 overflow-hidden rounded-xl bg-foreground p-2 shadow-glow sm:w-full">
          {pix.qr ? (
            <img src={pix.qr} alt="QR Code para pagamento Pix" className="aspect-square w-full" />
          ) : (
            <p className="p-3 text-center text-xs text-background">Use o código copia e cola ao lado.</p>
          )}
          {pix.qr && <div className="scan-line" />}
        </div>
        <div>
          <p className="text-xs font-bold text-muted-foreground">Está no computador? Escaneie o QR Code. Ou copie o código:</p>
          <textarea
            id="pix-code"
            readOnly
            rows={3}
            value={pix.code}
            onFocus={(e) => e.currentTarget.select()}
            className="mt-2 w-full resize-none rounded-xl border border-input bg-ink p-3 font-mono text-xs break-all text-foreground"
          />
        </div>
      </div>

      <div className="mt-5 flex items-center justify-center gap-2.5 rounded-2xl border border-border bg-surface px-4 py-3 text-sm font-semibold text-muted-foreground" aria-live="polite">
        <LiveDot />
        Aguardando confirmação do pagamento…
      </div>
    </div>
  );
}

function PaidState({ email }: { email: string }) {
  return (
    <div className="py-6 text-center">
      <span className="relative mx-auto grid size-20 place-items-center rounded-full bg-cta-gradient text-primary-foreground shadow-cta animate-in zoom-in-50 duration-500">
        <span className="absolute inset-0 rounded-full animate-pulse-ring" />
        <Check className="size-10" strokeWidth={3} />
      </span>
      <h2 className="mt-6 text-3xl font-extrabold">Pagamento confirmado!</h2>
      <p className="mx-auto mt-3 max-w-md text-muted-foreground">
        Obrigado pela compra. Guarde o comprovante — o acesso ao material será enviado para você.
      </p>
      <div className="mx-auto mt-6 grid max-w-sm gap-2 text-left text-sm">
        {email && (
          <p className="flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-3"><Mail className="size-4 shrink-0 text-primary" /> <span><strong>Produto entregue no seu e-mail:</strong> {email}</span></p>
        )}
      </div>
    </div>
  );
}
