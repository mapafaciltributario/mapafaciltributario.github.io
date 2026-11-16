import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { ArrowRight, BadgeCheck, Check, FileSpreadsheet, FileText, ShieldCheck, Sparkles } from "lucide-react";

export const Route = createFileRoute("/upsell")({
  head: () => ({
    meta: [
      { title: "Oferta Especial | Pack Planejamento Tributário Pro" },
      { name: "description", content: "Oferta complementar de planejamento tributário: planilha comparativa de regimes e 15 modelos profissionais." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: UpsellPage,
});

function UpsellPage() {
  useEffect(() => {
    // Script oficial gerado pela Cakto; carregado apenas nesta página.
    const script = document.createElement("script");
    script.src = "https://caktoscripts.nyc3.cdn.digitaloceanspaces.com/upsell.js";
    script.async = true;
    document.body.appendChild(script);
    return () => { script.remove(); };
  }, []);

  return (
    <div className="min-h-screen bg-[#071321] text-white" style={{ fontFamily: "Manrope, sans-serif" }}>
      <style>{`
        .upsell-glow { background: radial-gradient(ellipse at 50% -15%, rgba(27,177,136,.24), transparent 58%), radial-gradient(ellipse at 100% 60%, rgba(24,89,159,.16), transparent 50%); }
        cakto-upsell-buttons { display:block; width:100%; }
        cakto-upsell-accept, cakto-upsell-reject { display:block; width:100%; }
        cakto-upsell-accept::part(button) { display:block; width:100%; min-height:60px; border-radius:14px; font-size:16px; font-weight:800; padding:14px 18px; box-shadow:0 10px 32px rgba(15,120,101,.25); cursor:pointer; }
        cakto-upsell-reject::part(button) { display:block; width:100%; background:transparent; color:#c3d0df; border:1px solid #405167; border-radius:12px; font-size:14px; padding:14px; margin-top:12px; cursor:pointer; }
        @media(min-width:640px){ cakto-upsell-accept::part(button){font-size:18px;} }
      `}</style>
      <div className="upsell-glow min-h-screen">
        <header className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-5 py-5">
          <span className="text-sm font-extrabold tracking-tight text-white sm:text-base">MAPA FÁCIL <span className="text-[#61e5ba]">DA REFORMA TRIBUTÁRIA</span></span>
          <span className="flex items-center gap-1.5 text-xs text-slate-300"><ShieldCheck size={15} className="text-[#61e5ba]"/> Ambiente de oferta segura</span>
        </header>
        <main className="mx-auto max-w-5xl px-4 pb-20 pt-7 sm:pt-12">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#31bd91]/40 bg-[#31bd91]/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#70eac2]"><Sparkles size={15}/> Oferta complementar</span>
            <h1 className="mt-6 text-3xl font-black leading-tight tracking-tight sm:text-5xl">Sua compra abriu uma oportunidade de <span className="text-[#65e9ba]">ir além da teoria.</span></h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">Aprofunde suas análises com ferramentas para comparar regimes tributários e apresentar conclusões de forma mais profissional.</p>
          </div>
          <section className="mx-auto mt-10 grid max-w-4xl gap-5 sm:grid-cols-2">
            <div className="rounded-3xl border border-[#2c5269] bg-[#0e2435] p-6 shadow-2xl">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#155c4e] text-[#70eac2]"><FileSpreadsheet size={30}/></div>
              <h2 className="text-xl font-extrabold">Planilha comparativa de regimes</h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">Compare cenários de Simples Nacional, Lucro Presumido e Lucro Real, considerando os impactos da Reforma Tributária e as particularidades de cada empresa.</p>
              <div className="mt-5 rounded-xl border border-white/10 bg-[#081723] p-4 text-sm text-slate-200"><span className="font-bold text-[#7aeac6]">Simples Nacional</span> <span className="text-slate-400">×</span> <span className="font-bold text-[#7aeac6]">Presumido</span> <span className="text-slate-400">×</span> <span className="font-bold text-[#7aeac6]">Real</span></div>
            </div>
            <div className="rounded-3xl border border-[#2c5269] bg-[#0e2435] p-6 shadow-2xl">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#173c66] text-[#8fc9ff]"><FileText size={30}/></div>
              <h2 className="text-xl font-extrabold">15 modelos profissionais</h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">Estruturas de pareceres e apresentações para organizar resultados e comunicar análises a clientes, gestores e diretoria.</p>
              <div className="mt-5 flex flex-wrap gap-2"><span className="rounded-lg bg-white/10 px-3 py-2 text-xs font-semibold">Pareceres</span><span className="rounded-lg bg-white/10 px-3 py-2 text-xs font-semibold">Apresentações</span><span className="rounded-lg bg-white/10 px-3 py-2 text-xs font-semibold">Clientes e diretoria</span></div>
            </div>
          </section>
          <section className="mx-auto mt-8 max-w-4xl rounded-3xl border border-[#4bc79d]/50 bg-gradient-to-br from-[#123b36] to-[#102335] p-6 shadow-2xl sm:p-9">
            <div className="text-center"><span className="text-xs font-extrabold uppercase tracking-[.2em] text-[#8cf5cf]">Pack Planejamento Tributário Pro</span><h2 className="mt-3 text-2xl font-black sm:text-3xl">Adicione ferramentas práticas à sua compra</h2><p className="mt-3 text-sm leading-6 text-slate-200">Uma oferta complementar, opcional, para quem quer transformar conhecimento em análises e apresentações profissionais.</p></div>
            <div className="mx-auto mt-7 max-w-xl space-y-3 text-sm text-slate-100">
              {[
                "Planilha para comparar três regimes tributários",
                "15 modelos de pareceres e apresentações",
                "Material para adaptar à realidade de cada cliente",
              ].map((item) => <div key={item} className="flex items-start gap-3"><Check size={18} className="mt-0.5 shrink-0 text-[#7ff2c7]"/>{item}</div>)}
            </div>
            <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-white/10 bg-[#061824]/80 p-4 sm:p-6">
              <div className="mb-4 flex items-center justify-center gap-2 text-xs text-slate-300"><BadgeCheck size={16} className="text-[#7ff2c7]"/> Compra adicional processada pela Cakto</div>
              { /* Componentes oficiais do gerador de upsell da Cakto. Não substituir por links de checkout. */ }
              { /* @ts-expect-error Elementos customizados oficiais da Cakto */ }
              <cakto-upsell-buttons>
                { /* @ts-expect-error Elemento customizado oficial da Cakto */ }
                <cakto-upsell-accept bg-color="#0f7865" text-color="#ffffff" upsell-accept-url="members_area" offer-id="cmuqduv" app-base-url="https://app.cakto.com.br" offer-type="upsell" upsell-reject-url="https://mapafaciltributario.vercel.app/downsell">Sim, quero aproveitar a oferta</cakto-upsell-accept>
                { /* @ts-expect-error Elemento customizado oficial da Cakto */ }
                <cakto-upsell-reject upsell-reject-url="https://mapafaciltributario.vercel.app/downsell">Não, eu não quero aproveitar a oferta</cakto-upsell-reject>
              </cakto-upsell-buttons>
              <p className="mt-4 text-center text-xs leading-5 text-slate-400">A oferta é opcional. Se não quiser, você poderá avaliar uma última condição especial na próxima página.</p>
            </div>
          </section>
          <p className="mx-auto mt-7 max-w-2xl text-center text-xs leading-6 text-slate-400">As comparações são instrumentos de apoio e não substituem análise tributária individualizada nem verificação da legislação vigente.</p>
        </main>
      </div>
    </div>
  );
}
