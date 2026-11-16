import { useEffect } from "react";
import { Check, Lock, ShieldCheck, Zap, AlertTriangle, Flame, X } from "lucide-react";
import { CaktoButtons } from "./CaktoButtons";

type Props = {
  alert: string; badge: string; titleA: string; titleHi: string; titleB: string; subtitle: string;
  pains: string[]; items: string[]; oldPrice: string; price: string; priceNote: string; discount: string;
  minutes: number; offerId: string; offerType: "upsell" | "downsell"; rejectUrl: string;
  acceptLabel: string; rejectLabel: string; step: number; footnote: string;
};



export function OfferPage(p: Props) {

  const steps = ["Compra aprovada", "Oferta especial", "Acesso liberado"];
  return (
    <main className="offer-bg min-h-screen text-foreground overflow-hidden">
      <div className="alert-bar sticky top-0 z-20 flex items-center justify-center gap-2 px-3 py-2 text-xs sm:text-sm font-extrabold uppercase">
        <AlertTriangle className="h-4 w-4 blink" /> {p.alert}

      </div>

      <div className="mx-auto max-w-xl px-5 pb-14 pt-6">
        <ol className="fade-up flex items-center justify-between gap-1 text-[10px] sm:text-xs font-bold uppercase">
          {steps.map((s, i) => (
            <li key={s} className={`flex flex-1 flex-col items-center gap-1 ${i <= p.step ? "text-primary" : "text-muted-foreground"}`}>
              <span className={`step-dot grid h-7 w-7 place-items-center rounded-full ${i < p.step ? "done" : i === p.step ? "active" : ""}`}>
                {i < p.step ? <Check className="h-4 w-4" /> : i + 1}
              </span>{s}
            </li>
          ))}
        </ol>
        <div className="progress mt-3 h-2 rounded-full"><div className="progress-fill h-full rounded-full" style={{ width: p.step === 1 ? "66%" : "88%" }} /></div>
        <p className="mt-2 text-center text-xs text-muted-foreground">Oferta adicional opcional. Sua compra principal já está confirmada.</p>

        <span className="fade-up badge-hot mt-8 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-extrabold uppercase tracking-wider" style={{ animationDelay: ".1s" }}>
          <Flame className="h-3.5 w-3.5" /> {p.badge}
        </span>
        <h1 className="fade-up font-display mt-4 text-[2rem] sm:text-5xl font-extrabold leading-[1.05]" style={{ animationDelay: ".2s" }}>
          {p.titleA} <span className="text-gradient">{p.titleHi}</span> {p.titleB}
        </h1>
        <p className="fade-up mt-4 text-base sm:text-lg text-muted-foreground" style={{ animationDelay: ".3s" }}>{p.subtitle}</p>

        <div className="fade-up mt-7 space-y-2" style={{ animationDelay: ".4s" }}>
          {p.pains.map((x) => (
            <div key={x} className="pain flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold">
              <X className="h-4 w-4 shrink-0 text-destructive" />{x}
            </div>
          ))}
        </div>

        <section className="fade-up offer-card relative mt-8 rounded-2xl p-6 sm:p-8" style={{ animationDelay: ".5s" }}>
          <div className="ribbon absolute -top-3 right-4 rounded-md px-3 py-1 text-xs font-extrabold">{p.discount}</div>
          <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-primary"><Zap className="h-4 w-4" />Pack Planejamento Tributário Pro</p>
          <ul className="mt-5 space-y-3">
            {p.items.map((i, k) => (
              <li key={i} className="slide-in flex gap-3" style={{ animationDelay: `${0.7 + k * 0.12}s` }}>
                <span className="check mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full"><Check className="h-4 w-4" /></span>
                <span className="font-semibold">{i}</span>
              </li>
            ))}
          </ul>

          <div className="price-box mt-7 rounded-xl p-5 text-center">
            <p className="text-sm text-muted-foreground">De <span className="strike font-bold">{p.oldPrice}</span> por apenas</p>
            <p className="price-pop whitespace-nowrap font-display text-5xl sm:text-6xl font-extrabold text-gradient">{p.price}</p>
            <p className="mt-1 text-sm font-bold text-primary">{p.priceNote}</p>
          </div>

          <div className="mt-4"><CaktoButtons offerId={p.offerId} offerType={p.offerType} rejectUrl={p.rejectUrl} acceptLabel={p.acceptLabel} rejectLabel={p.rejectLabel} /></div>

          <div className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Lock className="h-3.5 w-3.5" />1 clique, sem digitar cartão</span>
            <span className="flex items-center gap-1"><ShieldCheck className="h-3.5 w-3.5" />Pagamento seguro Cakto</span>
          </div>
        </section>
        <p className="mt-8 text-center text-xs text-muted-foreground">{p.footnote}</p>
      </div>
    </main>
  );
}
