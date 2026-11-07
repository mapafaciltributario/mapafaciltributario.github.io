import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type ComponentType, type ReactNode } from "react";
import {
  ArrowRight,
  BookOpen,
  Brain,
  Calculator,
  Check,
  ChevronDown,
  Clock,
  FileCheck,
  Files,
  FolderOpen,
  Gift,
  Layers,
  ListChecks,
  Lock,
  MonitorSmartphone,
  Receipt,
  ShieldCheck,
  Sparkles,
  Star,
  Table2,
  X,
  Zap,
} from "lucide-react";

import { Logo } from "@/components/brand/Logo";
import { Reveal } from "@/components/landing/Reveal";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { GUARANTEE_DAYS, PLANS, brl, savings } from "@/lib/plans";
import heroImg from "@/assets/mapa-facil-mesa.jpg";
import devicesImg from "@/assets/mapa-facil-dispositivos.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mapa Fácil da Reforma Tributária — IBS, CBS e Imposto Seletivo em mapas visuais" },
      {
        name: "description",
        content:
          "Entenda a Reforma Tributária sem leis extensas: mapas mentais, checklist, linha do tempo e planilhas de IBS/CBS. Acesso imediato e 7 dias de garantia.",
      },
      { property: "og:title", content: "Mapa Fácil da Reforma Tributária" },
      {
        property: "og:description",
        content: "IBS, CBS e Imposto Seletivo explicados em mapas visuais. A partir de R$ 27,90.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const basico = PLANS.basico;
const completo = PLANS.completo;

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Header />
      <main>
        <Hero />
        <SpecsStrip />
        <Problem />
        <Features />
        <Contents />
        <Audience />
        <Bonuses />
        <Pricing />
        <Guarantee />
        <Steps />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}

/* ---------------------------------- Top ---------------------------------- */

function TopBar() {
  return (
    <div className="bg-ink text-ink-foreground">
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 px-4 py-2 text-center text-[12.5px] font-semibold">
        <Zap className="size-3.5 text-highlight" />
        Acesso imediato após a compra
        <span className="text-ink-muted">·</span>
        {GUARANTEE_DAYS} dias de garantia
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Logo />
        <nav className="hidden items-center gap-7 text-sm font-semibold text-muted-foreground md:flex">
          <a href="#conteudo" className="hover:text-foreground">Conteúdo</a>
          <a href="#bonus" className="hover:text-foreground">Bônus</a>
          <a href="#planos" className="hover:text-foreground">Planos</a>
          <a href="#duvidas" className="hover:text-foreground">Dúvidas</a>
        </nav>
        <Button asChild variant="ink" size="sm" className="h-10 rounded-xl px-4">
          <a href="#planos">Quero o meu</a>
        </Button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="paper-grid pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pt-10 pb-14 md:pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:pt-20 lg:pb-24">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-secondary px-3.5 py-1.5 text-xs font-bold text-secondary-foreground">
              <span className="size-1.5 rounded-full bg-primary" />
              IBS · CBS · Imposto Seletivo · Transição
            </span>
          </Reveal>
          <Reveal delay={60}>
            <h1 className="mt-5 text-[2.6rem] leading-[1.02] font-extrabold text-foreground sm:text-6xl lg:text-[4.2rem]">
              A Reforma Tributária, <span className="marker">finalmente fácil</span> de entender.
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Mapas mentais, checklist e linha do tempo que organizam as principais mudanças em um material{" "}
              <strong className="text-foreground">simples, visual e direto ao ponto</strong> — sem leis extensas nem lives longas.
            </p>
          </Reveal>
          <Reveal delay={180} className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild variant="cta" size="2xl" className="w-full sm:w-auto">
              <a href="#planos">
                Quero entender a Reforma
                <ArrowRight />
              </a>
            </Button>
          </Reveal>
          <Reveal delay={240}>
            <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-[13px] font-semibold text-muted-foreground">
              <li className="flex items-center gap-1.5"><ShieldCheck className="size-4 text-primary" />{GUARANTEE_DAYS} dias de garantia</li>
              <li className="flex items-center gap-1.5"><Zap className="size-4 text-primary" />Acesso imediato</li>
              <li className="flex items-center gap-1.5"><Lock className="size-4 text-primary" />Compra segura via Pix</li>
            </ul>
          </Reveal>
        </div>

        <Reveal delay={120} className="relative">
          <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-highlight/30 blur-3xl" />
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-lift">
            <img
              src={heroImg}
              alt="Coleção Mapa Fácil: livro, mapas mentais de IBS e CBS, checklist e linha do tempo sobre uma mesa"
              width={1600}
              height={1200}
              className="aspect-[4/3] w-full object-cover"
              fetchPriority="high"
            />
          </div>
          <div className="animate-float absolute -bottom-5 left-3 flex items-center gap-2.5 rounded-2xl border border-border bg-card px-3.5 py-2.5 shadow-lift sm:left-6">
            <span className="grid size-9 place-items-center rounded-xl bg-secondary text-primary"><Files className="size-5" /></span>
            <span className="text-xs leading-tight"><strong className="block text-sm text-foreground">PDF + planilhas</strong><span className="text-muted-foreground">celular, PC ou impresso</span></span>
          </div>
          <div className="absolute -top-4 right-3 rotate-3 rounded-xl bg-accent px-3 py-1.5 font-display text-sm font-extrabold text-accent-foreground shadow-card sm:right-6">
            Do complexo ao simples ✓
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SpecsStrip() {
  const items = [
    { icon: Brain, label: "Mapas mentais prontos" },
    { icon: MonitorSmartphone, label: "Celular e computador" },
    { icon: Zap, label: "Acesso na hora" },
    { icon: ShieldCheck, label: `${GUARANTEE_DAYS} dias de garantia` },
  ];
  return (
    <section className="border-y border-border bg-card">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px bg-border md:grid-cols-4">
        {items.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-3 bg-card px-4 py-4 sm:justify-center">
            <Icon className="size-5 shrink-0 text-primary" />
            <span className="text-[13px] font-bold text-foreground">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------- Problem -------------------------------- */

function Problem() {
  const pains = [
    "Leis extensas e textos técnicos logo de cara",
    "Lives longas que não chegam ao ponto",
    "Conteúdos soltos que não se conectam",
  ];
  const gains = [
    "Os principais pontos organizados visualmente",
    "IBS, CBS e Imposto Seletivo explicados com clareza",
    "Um caminho simples para saber por onde começar",
  ];
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 md:py-28">
      <Reveal className="mx-auto max-w-2xl text-center">
        <SectionEyebrow icon={Sparkles}>Menos confusão. Mais clareza.</SectionEyebrow>
        <h2 className="mt-4 text-3xl font-extrabold sm:text-5xl">
          Quanto tempo você ainda vai gastar tentando entender a Reforma em <span className="marker">conteúdos soltos?</span>
        </h2>
      </Reveal>
      <div className="mt-12 grid gap-4 md:grid-cols-2">
        <Reveal className="rounded-3xl border border-border bg-muted p-6 sm:p-8">
          <p className="text-xs font-extrabold tracking-[0.16em] text-muted-foreground uppercase">Sem o Mapa Fácil</p>
          <ul className="mt-5 space-y-4">
            {pains.map((p) => (
              <li key={p} className="flex gap-3 text-[15px] text-muted-foreground">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-destructive/10 text-destructive"><X className="size-3.5" strokeWidth={3} /></span>
                {p}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={80} className="rounded-3xl border-2 border-primary/30 bg-card p-6 shadow-card sm:p-8">
          <p className="text-xs font-extrabold tracking-[0.16em] text-primary uppercase">Com o Mapa Fácil</p>
          <ul className="mt-5 space-y-4">
            {gains.map((g) => (
              <li key={g} className="flex gap-3 text-[15px] font-semibold text-foreground">
                <Tick />
                {g}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------- Features ------------------------------- */

function Features() {
  const features = [
    { icon: Brain, title: "Mapas mentais prontos", text: "Os principais temas já organizados em mapas visuais. Nada de montar resumo do zero." },
    { icon: Calculator, title: "Novos tributos explicados", text: "IBS, CBS e Imposto Seletivo com clareza, para entender o papel de cada um." },
    { icon: Layers, title: "Organizado por temas", text: "Visão geral, transição, documentos fiscais, obrigações e regimes em ordem lógica." },
    { icon: FolderOpen, title: "Arquivos em pastas", text: "Tudo separado para estudar, revisar e consultar sempre que precisar." },
  ];
  return (
    <section className="relative overflow-hidden bg-ink-gradient text-ink-foreground">
      <div className="ink-grid pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-6xl px-4 py-20 md:py-28">
        <Reveal className="max-w-2xl">
          <SectionEyebrow icon={Layers} tone="light">Clareza em cada tema</SectionEyebrow>
          <h2 className="mt-4 text-3xl font-extrabold sm:text-5xl">
            Tudo fica mais fácil quando está <span className="text-highlight">organizado visualmente</span>
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 60} className="rounded-3xl border border-ink-foreground/10 bg-ink-foreground/5 p-6 backdrop-blur-sm">
              <span className="grid size-12 place-items-center rounded-2xl bg-highlight text-ink"><Icon className="size-6" /></span>
              <h3 className="mt-5 text-xl font-bold">{title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">{text}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10">
          <Button asChild variant="cta" size="xl" className="w-full sm:w-auto">
            <a href="#planos">Quero o Mapa Fácil <ArrowRight /></a>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------- Contents ------------------------------- */

const CONTENTS = [
  "Visão geral da Reforma Tributária",
  "IBS explicado visualmente",
  "CBS explicado visualmente",
  "Imposto Seletivo",
  "Apuração assistida explicada",
  "Quando fazer Nota de Débito e Crédito",
  "Transição da Reforma",
  "Impactos na rotina contábil e fiscal",
  "Documentos fiscais e obrigações",
  "Simples Nacional, MEI e regimes específicos",
  "Termos técnicos traduzidos",
  "Atualizações conforme mudanças relevantes",
];

function Contents() {
  return (
    <section id="conteudo" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 md:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal className="order-2 lg:order-1">
          <SectionEyebrow icon={BookOpen}>O que você vai receber</SectionEyebrow>
          <h2 className="mt-4 text-3xl font-extrabold sm:text-5xl">
            Estude no celular, no computador <span className="marker">ou imprima</span>
          </h2>
          <ul className="mt-8 grid gap-x-6 gap-y-3.5 sm:grid-cols-2">
            {CONTENTS.map((c) => (
              <li key={c} className="flex gap-3 text-[15px] font-semibold text-foreground">
                <Tick />
                {c}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={100} className="order-1 lg:order-2">
          <div className="overflow-hidden rounded-3xl shadow-lift">
            <img
              src={devicesImg}
              alt="Mapa mental do IBS em um tablet e a capa do Mapa Fácil em um celular"
              width={1200}
              height={1200}
              loading="lazy"
              className="aspect-square w-full object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------- Audience ------------------------------- */

function Audience() {
  const items: [string, string][] = [
    ["Entender a Reforma sem começar por leis extensas", "Compreenda os pontos principais sem travar em textos técnicos."],
    ["Organizar o que está sendo falado no mercado", "IBS, CBS, Imposto Seletivo e transição em uma sequência clara."],
    ["Estudar sem depender de lives longas", "Revise os temas de forma rápida com mapas visuais."],
    ["Saber por onde começar", "Siga um caminho simples, sem pular de conteúdo em conteúdo."],
    ["Falar sobre o tema com mais segurança", "Acompanhe reuniões e conversas com clientes com mais clareza."],
    ["Traduzir termos técnicos", "Consulte conceitos importantes em linguagem simples."],
  ];
  return (
    <section className="border-y border-border bg-muted/60">
      <div className="mx-auto max-w-6xl px-4 py-20 md:py-28">
        <Reveal className="max-w-2xl">
          <SectionEyebrow icon={Star}>Feito para o seu dia a dia</SectionEyebrow>
          <h2 className="mt-4 text-3xl font-extrabold sm:text-5xl">Ideal para quem quer…</h2>
          <p className="mt-3 text-muted-foreground">Contadores, profissionais fiscais, empresários e estudantes.</p>
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(([title, text], i) => (
            <Reveal key={title} delay={(i % 3) * 60} className="rounded-3xl border border-border bg-card p-6 shadow-card">
              <span className="font-display text-3xl font-extrabold text-primary/30">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 text-lg font-bold leading-snug">{title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Bonuses -------------------------------- */

const BONUSES = [
  { icon: BookOpen, title: "Glossário Visual da Reforma", text: "Os principais termos sem juridiquês, para consulta rápida." },
  { icon: ListChecks, title: "Checklist “O Que Entender Primeiro”", text: "Saiba quais temas priorizar antes de se aprofundar." },
  { icon: Clock, title: "Linha do Tempo Visual", text: "As fases da transição da Reforma em um único material." },
  { icon: Layers, title: "Quadro Antes x Depois", text: "Comparativo entre o sistema atual e o novo modelo." },
  { icon: Table2, title: "Tabela de CST, cClassTrib, cIndOp e cCredPres", text: "Consulta rápida dos novos códigos." },
  { icon: Calculator, title: "Planilha Calculadora de IBS/CBS", text: "Calcule e confira o destaque na nota. Excel e Google Planilhas." },
  { icon: FileCheck, title: "Gabarito de preenchimento na Nota Fiscal", text: "O que preencher nos campos de IBS/CBS, etapa por etapa." },
  { icon: Receipt, title: "Guia de emissão de NF-e, NFC-e, CT-e e NFS-e", text: "Como emitir cada documento com as novas regras." },
];

function Bonuses() {
  return (
    <section id="bonus" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 md:py-28">
      <Reveal className="mx-auto max-w-2xl text-center">
        <SectionEyebrow icon={Gift}>E não para por aí</SectionEyebrow>
        <h2 className="mt-4 text-3xl font-extrabold sm:text-5xl">
          <span className="marker">8 bônus</span> no Plano Completo
        </h2>
        <p className="mt-3 text-muted-foreground">Ferramentas práticas para aplicar a Reforma na rotina.</p>
      </Reveal>
      <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {BONUSES.map(({ icon: Icon, title, text }, i) => (
          <Reveal key={title} delay={(i % 4) * 50} className="group relative flex flex-col rounded-3xl border border-border bg-card p-5 shadow-card transition-shadow hover:shadow-lift">
            <div className="flex items-center justify-between">
              <span className="grid size-11 place-items-center rounded-2xl bg-secondary text-primary"><Icon className="size-5" /></span>
              <span className="rounded-full bg-accent px-2.5 py-1 text-[10px] font-extrabold tracking-wider text-accent-foreground">BÔNUS {String(i + 1).padStart(2, "0")}</span>
            </div>
            <h3 className="mt-4 text-[17px] font-bold leading-snug">{title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------- Pricing -------------------------------- */

function Pricing() {
  return (
    <section id="planos" className="relative scroll-mt-16 overflow-hidden bg-ink-gradient text-ink-foreground">
      <div className="ink-grid pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-5xl px-4 py-20 md:py-28">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionEyebrow icon={Sparkles} tone="light">Seu próximo passo</SectionEyebrow>
          <h2 className="mt-4 text-3xl font-extrabold sm:text-5xl">Escolha a opção ideal para você</h2>
          <p className="mt-3 text-ink-muted">Pagamento único. Sem mensalidades.</p>
        </Reveal>

        <div className="mt-12 grid items-start gap-5 md:grid-cols-[1fr_1.15fr]">
          {/* Completo first on mobile */}
          <Reveal className="order-1 md:order-2">
            <div className="relative rounded-[2rem] bg-card p-6 text-card-foreground shadow-lift ring-4 ring-highlight sm:p-8">
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-highlight px-4 py-1.5 text-xs font-extrabold tracking-wider whitespace-nowrap text-ink shadow-card">
                ★ MAIS ESCOLHIDO · MELHOR CUSTO-BENEFÍCIO
              </span>
              <div className="flex items-start justify-between gap-4 pt-2">
                <div>
                  <h3 className="text-2xl font-extrabold">{completo.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Material principal + 8 bônus</p>
                </div>
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-secondary text-primary"><Gift className="size-6" /></span>
              </div>
              <PriceBlock plan={completo} />
              <Button asChild variant="cta" size="2xl" className="mt-6 w-full">
                <Link to="/checkout" search={{ plano: "completo" }}>
                  Quero o Plano Completo <ArrowRight />
                </Link>
              </Button>
              <ul className="mt-7 space-y-3 border-t border-border pt-6">
                <li className="flex gap-3 text-[15px] font-bold"><Tick />Mapa Fácil da Reforma Tributária completo</li>
                {BONUSES.map((b, i) => (
                  <li key={b.title} className="flex gap-3 text-[14.5px]">
                    <Tick />
                    <span><span className="font-extrabold text-primary">Bônus {String(i + 1).padStart(2, "0")}</span> · {b.title}</span>
                  </li>
                ))}
              </ul>
              <GuaranteeNote />
            </div>
          </Reveal>

          <Reveal delay={80} className="order-2 md:order-1 md:mt-10">
            <div className="rounded-[2rem] border border-ink-foreground/15 bg-ink-foreground/5 p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-extrabold">{basico.name}</h3>
                  <p className="mt-1 text-sm text-ink-muted">Só o material principal</p>
                </div>
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-ink-foreground/10"><BookOpen className="size-6" /></span>
              </div>
              <PriceBlock plan={basico} tone="light" />
              <Button asChild variant="outlineInk" size="xl" className="mt-6 w-full">
                <Link to="/checkout" search={{ plano: "basico" }}>Quero só o básico</Link>
              </Button>
              <ul className="mt-7 space-y-3 border-t border-ink-foreground/10 pt-6 text-[15px]">
                <li className="flex gap-3"><Tick />Mapa Fácil da Reforma Tributária</li>
                <li className="flex gap-3"><Tick />Acesso imediato</li>
                <li className="flex gap-3 text-ink-muted line-through decoration-ink-muted/60"><span className="grid size-6 shrink-0 place-items-center"><X className="size-4" /></span>8 bônus práticos</li>
              </ul>
              <p className="mt-6 flex items-center justify-center gap-2 text-sm text-ink-muted"><ShieldCheck className="size-4" />{GUARANTEE_DAYS} dias de garantia</p>
            </div>
          </Reveal>
        </div>
        <Reveal className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-ink-muted">
          <span className="flex items-center gap-1.5"><Lock className="size-4" />Pagamento seguro</span>
          <span className="flex items-center gap-1.5"><Zap className="size-4" />Pix com aprovação na hora</span>
          <span className="flex items-center gap-1.5"><ShieldCheck className="size-4" />Reembolso em até {GUARANTEE_DAYS} dias</span>
        </Reveal>
      </div>
    </section>
  );
}

function PriceBlock({ plan, tone = "dark" }: { plan: (typeof PLANS)["basico"]; tone?: "dark" | "light" }) {
  const [reais = "", cents = ""] = plan.price.toFixed(2).split(".");
  return (
    <div className="mt-6">
      <p className={tone === "light" ? "text-sm text-ink-muted" : "text-sm text-muted-foreground"}>
        de <span className="line-through">{brl(plan.fromPrice)}</span> por apenas
      </p>
      <p className="mt-1 flex items-start font-display font-extrabold leading-none">
        <span className="mt-2 text-xl">R$</span>
        <span className="text-6xl tracking-tight">{reais}</span>
        <span className="mt-2 text-2xl">,{cents}</span>
      </p>
      <span
        className={
          tone === "light"
            ? "mt-3 inline-block rounded-full bg-ink-foreground/10 px-3 py-1 text-xs font-bold"
            : "mt-3 inline-block rounded-full bg-secondary px-3 py-1 text-xs font-bold text-secondary-foreground"
        }
      >
        Você economiza {brl(savings(plan))}
      </span>
    </div>
  );
}

function GuaranteeNote() {
  return (
    <p className="mt-6 flex items-center justify-center gap-2 rounded-2xl bg-muted px-4 py-3 text-sm font-semibold text-muted-foreground">
      <ShieldCheck className="size-4 text-primary" />
      Risco zero: {GUARANTEE_DAYS} dias de garantia
    </p>
  );
}

/* ------------------------------- Guarantee ------------------------------- */

function Guarantee() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-20 md:py-24">
      <Reveal className="flex flex-col items-center gap-8 rounded-[2rem] border-2 border-dashed border-primary/30 bg-card p-8 text-center shadow-card sm:flex-row sm:p-10 sm:text-left">
        <div className="relative grid size-32 shrink-0 place-items-center rounded-full bg-secondary">
          <div className="grid size-24 place-items-center rounded-full bg-primary text-primary-foreground shadow-cta">
            <div className="text-center leading-none">
              <span className="block font-display text-4xl font-extrabold">{GUARANTEE_DAYS}</span>
              <span className="text-[11px] font-extrabold tracking-wider uppercase">dias</span>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-extrabold sm:text-3xl">Garantia de {GUARANTEE_DAYS} dias: o risco fica do nosso lado</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Se o material não deixar a Reforma Tributária mais clara para você, ou se simplesmente não quiser continuar, peça o reembolso integral dentro de {GUARANTEE_DAYS} dias. Sem burocracia e sem explicação obrigatória.
          </p>
        </div>
      </Reveal>
    </section>
  );
}

/* --------------------------------- Steps --------------------------------- */

function Steps() {
  const steps = [
    { title: "Conclua sua compra", text: "Pague com Pix em poucos segundos pelo app do seu banco." },
    { title: "Receba o acesso", text: "O link chega no seu e-mail e no seu WhatsApp." },
    { title: "Comece a estudar", text: "Abra os mapas no celular, no computador ou imprima." },
  ];
  return (
    <section className="border-y border-border bg-muted/60">
      <div className="mx-auto max-w-6xl px-4 py-20 md:py-24">
        <Reveal className="text-center">
          <SectionEyebrow icon={Zap}>Simples do início ao fim</SectionEyebrow>
          <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">Como é o acesso</h2>
        </Reveal>
        <ol className="mt-12 grid gap-4 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 80} className="relative rounded-3xl border border-border bg-card p-6 shadow-card">
              <span className="grid size-11 place-items-center rounded-full bg-ink font-display text-lg font-extrabold text-ink-foreground">{i + 1}</span>
              <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
              <p className="mt-1.5 text-[15px] text-muted-foreground">{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------------------------------- FAQ ---------------------------------- */

function Faq() {
  const faqs: [string, string][] = [
    ["Como recebo o material?", "Logo após a confirmação do pagamento, você recebe o acesso por e-mail e WhatsApp."],
    ["O material é físico?", "Não. O material é 100% digital, para acessar no celular ou computador e imprimir se desejar."],
    ["Serve para estudantes?", "Sim. O conteúdo é organizado de forma visual para quem está começando ou quer revisar os principais temas."],
    ["O material substitui a legislação?", "Não. É um material educacional de apoio. Para decisões e casos específicos, consulte sempre a legislação oficial."],
    ["E se a Reforma mudar?", "O material prevê atualizações conforme mudanças relevantes na Reforma Tributária."],
    ["E se eu não gostar?", `Você pode solicitar reembolso integral dentro do prazo de ${GUARANTEE_DAYS} dias de garantia.`],
  ];
  return (
    <section id="duvidas" className="mx-auto max-w-3xl scroll-mt-20 px-4 py-20 md:py-28">
      <Reveal className="text-center">
        <SectionEyebrow icon={ChevronDown}>Tire suas dúvidas</SectionEyebrow>
        <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">Perguntas frequentes</h2>
      </Reveal>
      <Reveal className="mt-10">
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map(([q, a]) => (
            <AccordionItem key={q} value={q} className="rounded-2xl border border-border bg-card px-5 shadow-card">
              <AccordionTrigger className="py-5 text-base font-bold hover:no-underline">{q}</AccordionTrigger>
              <AccordionContent className="text-[15px] leading-relaxed text-muted-foreground">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  );
}

/* ------------------------------- Final CTA ------------------------------- */

function FinalCta() {
  return (
    <section className="px-4 pb-24">
      <Reveal className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-ink-gradient px-6 py-14 text-center text-ink-foreground sm:px-12">
        <div className="ink-grid pointer-events-none absolute inset-0" />
        <div className="relative">
          <h2 className="text-3xl font-extrabold sm:text-5xl">
            Pare de se perder. <span className="text-highlight">Comece a entender hoje.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-ink-muted">
            Todo o conteúdo da Reforma organizado em mapas visuais, com acesso imediato e {GUARANTEE_DAYS} dias de garantia.
          </p>
          <Button asChild variant="cta" size="2xl" className="mt-8 w-full sm:w-auto">
            <Link to="/checkout" search={{ plano: "completo" }}>
              Quero meu acesso agora <ArrowRight />
            </Link>
          </Button>
          <p className="mt-4 text-sm text-ink-muted">Plano Completo por {brl(completo.price)} · pagamento único</p>
        </div>
      </Reveal>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-card pb-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-10 text-center">
        <Logo />
        <p className="max-w-xl text-xs leading-relaxed text-muted-foreground">
          © {new Date().getFullYear()} Mapa Fácil da Reforma Tributária. Material educacional e informativo; não substitui a consulta à legislação vigente.
        </p>
      </div>
    </footer>
  );
}

/* -------------------------------- Helpers -------------------------------- */

function Tick() {
  return (
    <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
      <Check className="size-3.5" strokeWidth={3.5} />
    </span>
  );
}

function SectionEyebrow({
  icon: Icon,
  children,
  tone = "dark",
}: {
  icon: ComponentType<{ className?: string }>;
  children: ReactNode;
  tone?: "dark" | "light";
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-xs font-extrabold tracking-[0.16em] uppercase ${tone === "light" ? "text-highlight" : "text-primary"}`}
    >
      <Icon className="size-4" />
      {children}
    </span>
  );
}
