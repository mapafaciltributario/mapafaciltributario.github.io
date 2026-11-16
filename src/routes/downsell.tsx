import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Check, FileSpreadsheet, FileText, LockKeyhole, ShieldCheck, Sparkles } from "lucide-react";

export const Route = createFileRoute("/downsell")({
  head: () => ({ meta: [
    { title: "Condição Especial | Pack Planejamento Tributário Pro" },
    { name: "description", content: "Última condição opcional para adicionar o Pack Planejamento Tributário Pro à sua compra." },
    { name: "robots", content: "noindex, nofollow" },
  ] }),
  component: DownsellPage,
});

function DownsellPage() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://caktoscripts.nyc3.cdn.digitaloceanspaces.com/upsell.js";
    script.async = true;
    document.body.appendChild(script);
    return () => { script.remove(); };
  }, []);

  return <div className="min-h-screen bg-[#071321] text-white" style={{fontFamily:"Manrope, sans-serif"}}>
    <style>{`
      .downsell-aura {background:radial-gradient(ellipse at 50% 0%,rgba(23,165,128,.20),transparent 57%),radial-gradient(ellipse at 95% 65%,rgba(37,88,145,.14),transparent 48%)}
      cakto-upsell-buttons, cakto-upsell-accept, cakto-upsell-reject {display:block;width:100%}
      cakto-upsell-accept::part(button){display:block;width:100%;min-height:62px;padding:15px 20px;background:#0f7865;color:#fff;border:0;border-radius:14px;font-size:16px;font-weight:800;cursor:pointer;box-shadow:0 12px 30px rgba(15,120,101,.3)}
      cakto-upsell-reject::part(button){display:block;width:100%;margin-top:13px;padding:14px;background:transparent;color:#b8c8d7;border:1px solid #425568;border-radius:12px;font-size:14px;cursor:pointer}
      @media(min-width:640px){cakto-upsell-accept::part(button){font-size:18px}}
    `}</style>
    <div className="downsell-aura min-h-screen">
      <header className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-5 py-5">
        <span className="text-sm font-extrabold tracking-tight sm:text-base">MAPA FÁCIL <span className="text-[#65e9ba]">DA REFORMA TRIBUTÁRIA</span></span>
        <span className="flex items-center gap-1.5 text-xs text-slate-300"><ShieldCheck size={15} className="text-[#65e9ba]"/> Oferta via Cakto</span>
      </header>
      <main className="mx-auto max-w-4xl px-4 pb-16 pt-7 sm:pt-12">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#51d7ad]/40 bg-[#51d7ad]/10 px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-[#8cf5cf]"><Sparkles size={15}/> Condição especial após sua compra</div>
          <h1 className="mt-6 text-3xl font-black leading-tight tracking-tight sm:text-5xl">Antes de finalizar, uma <span className="text-[#6ee7ba]">última oportunidade</span> para complementar seu material.</h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">Você optou por não adicionar o Pack Pro na oferta anterior. Se ele ainda fizer sentido para você, disponibilizamos uma condição de preço reduzido — sem alterar sua compra já realizada.</p>
        </div>
        <section className="mx-auto mt-9 grid max-w-3xl gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-[#315467] bg-[#0e2435] p-5 sm:p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#155c4e] text-[#8cf5cf]"><FileSpreadsheet size={25}/></div>
            <h2 className="text-lg font-extrabold">Comparativo de regimes</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">Material de apoio para organizar comparações entre Simples Nacional, Lucro Presumido e Lucro Real.</p>
          </div>
          <div className="rounded-2xl border border-[#315467] bg-[#0e2435] p-5 sm:p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#173c66] text-[#a6d4ff]"><FileText size={25}/></div>
            <h2 className="text-lg font-extrabold">15 modelos profissionais</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">Estruturas editáveis de apoio para pareceres e apresentações de análises tributárias.</p>
          </div>
        </section>
        <section className="mx-auto mt-7 max-w-3xl overflow-hidden rounded-3xl border border-[#58cda7]/50 bg-gradient-to-br from-[#123b36] to-[#102335] shadow-2xl">
          <div className="border-b border-white/10 px-5 py-5 text-center sm:px-9">
            <div className="text-xs font-extrabold uppercase tracking-[.16em] text-[#94f5d0]">Pack Planejamento Tributário Pro</div>
            <h2 className="mt-2 text-2xl font-black sm:text-3xl">Mesmo Pack. Condição especial.</h2>
          </div>
          <div className="px-5 pb-7 pt-6 sm:px-9 sm:pb-9">
            <div className="mx-auto max-w-lg space-y-3 text-sm text-slate-100">
              {["Comparativo dos três regimes tributários", "15 modelos para apoiar seu trabalho", "Oferta adicional opcional, sem substituir a compra principal"].map(item=><div key={item} className="flex items-start gap-3"><Check size={18} className="mt-0.5 shrink-0 text-[#83f1c8]"/>{item}</div>)}
            </div>
            <div className="mx-auto mt-7 max-w-lg rounded-2xl border border-white/10 bg-[#061824]/85 p-5 text-center sm:p-7">
              <div className="text-sm text-slate-300">De <span className="line-through">R$ 21,90</span> por</div>
              <div className="mt-1 text-5xl font-black tracking-tight text-[#8cf5cf] sm:text-6xl">R$ 14,90</div>
              <div className="mt-2 text-sm font-semibold text-[#b6f8df]">Economia de R$ 7,00 em relação à oferta anterior</div>
              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-300"><LockKeyhole size={15} className="text-[#8cf5cf]"/> Cobrança adicional processada pela Cakto</div>
              <div className="mt-4 text-left">
                {/* Botões oficiais gerados pela Cakto para a oferta de downsell */}
                {/* @ts-expect-error Web component oficial da Cakto */}
                <cakto-upsell-buttons>
                  {/* @ts-expect-error Web component oficial da Cakto */}
                  <cakto-upsell-accept bg-color="#0f7865" text-color="#ffffff" upsell-accept-url="members_area" offer-id="342v6ec" app-base-url="https://app.cakto.com.br" offer-type="downsell" upsell-reject-url="members_area">Sim, quero adicionar o Pack por R$ 14,90</cakto-upsell-accept>
                  {/* @ts-expect-error Web component oficial da Cakto */}
                  <cakto-upsell-reject upsell-reject-url="members_area">Não, obrigado. Quero acessar meu material</cakto-upsell-reject>
                </cakto-upsell-buttons>
              </div>
              <p className="mt-4 text-xs leading-5 text-slate-400">Ao recusar, você segue para a área de membros sem esta compra adicional. A compra principal permanece válida.</p>
            </div>
          </div>
        </section>
        <p className="mx-auto mt-7 max-w-2xl text-center text-xs leading-6 text-slate-400">Material educativo de apoio. As comparações não substituem avaliação profissional individualizada nem consulta à legislação vigente.</p>
      </main>
    </div>
  </div>;
}
