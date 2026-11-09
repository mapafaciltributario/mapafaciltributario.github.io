import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ComponentType, type ReactNode } from "react";
import AutoScroll from "embla-carousel-auto-scroll";
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
import { CountUp, LiveDot, Spotlight } from "@/components/landing/Effects";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BONUSES, GUARANTEE_DAYS, PLANS, bonusTotal, brl, savings } from "@/lib/plans";
import bonus01 from "@/assets/bonus-01-glossario.jpg";
import bonus02 from "@/assets/bonus-02-checklist.jpg";
import bonus03 from "@/assets/bonus-03-linha-do-tempo.jpg";
import bonus04 from "@/assets/bonus-04-antes-depois.jpg";
import bonus05 from "@/assets/bonus-05-tabela-codigos.jpg";
import bonus06 from "@/assets/bonus-06-calculadora.jpg";
import bonus07 from "@/assets/bonus-07-gabarito-nota.jpg";
import bonus08 from "@/assets/bonus-08-guia-emissao.jpg";
import heroAsset from "@/assets/mapa-facil-hero-dark.jpg";
import devicesAsset from "@/assets/mapa-facil-dispositivos.jpg";

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
    <div className="min-h-screen overflow-x-clip bg-background">
      <TopBar />
      <Header />
      <main>
        <Hero />
        <Stats />
        <Ticker />
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
      <StickyCta />
    </div>
  );
}

/* ---------------------------------- Top ---------------------------------- */

function TopBar() {
  return (
    <div className="relative border-b border-border bg-ink">
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 px-4 py-2 text-center text-[12px] font-semibold text-muted-foreground">
        <LiveDot />
        <span>
          <span className="text-foreground">Oferta de lançamento:</span> de{" "}
          <span className="line-through">{brl(completo.fromPrice)}</span> por{" "}
          <span className="font-extrabold text-primary">{brl(completo.price)}</span>
        </span>
        <span className="hidden text-border sm:inline">|</span>
        <span className="hidden sm:inline">Acesso imediato · {GUARANTEE_DAYS} dias de garantia</span>
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Logo />
        <nav className="hidden items-center gap-7 text-sm font-semibold text-muted-foreground md:flex">
          <a href="#conteudo" className="transition-colors hover:text-foreground">Conteúdo</a>
          <a href="#bonus" className="transition-colors hover:text-foreground">Bônus</a>
          <a href="#planos" className="transition-colors hover:text-foreground">Planos</a>
          <a href="#duvidas" className="transition-colors hover:text-foreground">Dúvidas</a>
        </nav>
        <Button asChild variant="cta" size="sm" className="h-10 rounded-xl px-4 text-[13px]">
          <a href="#planos">
            Quero o meu <ArrowRight />
          </a>
        </Button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="tech-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
      <div className="aurora animate-aurora pointer-events-none absolute -inset-x-20 -top-20 h-[640px]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pt-10 pb-16 md:pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:pt-20 lg:pb-24">
        <div>
          <Reveal>
            <span className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-mono-tech text-[10.5px] font-bold text-foreground uppercase">
              <LiveDot />
              IBS · CBS · Imposto Seletivo · Transição
            </span>
          </Reveal>
          <Reveal delay={60}>
            <h1 className="mt-5 text-[2.55rem] leading-[1.02] font-extrabold text-foreground sm:text-6xl lg:text-[4.1rem]">
              A Reforma Tributária, <span className="text-gradient">finalmente fácil</span> de entender.
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-muted-foreground sm:text-lg">
              Mapas mentais, checklist e linha do tempo que organizam as principais mudanças em um material{" "}
              <strong className="text-foreground">simples, visual e direto ao ponto</strong> — sem leis extensas nem lives longas.
            </p>
          </Reveal>

          <Reveal delay={170}>
            <div className="glass mt-7 flex items-center justify-between gap-4 rounded-2xl px-4 py-3 sm:max-w-md">
              <div>
                <p className="font-mono-tech text-[10px] font-bold text-muted-foreground uppercase">Plano Completo + 8 bônus</p>
                <p className="mt-0.5 flex items-baseline gap-2">
                  <span className="text-sm text-muted-foreground line-through">{brl(completo.fromPrice)}</span>
                  <span className="font-display text-2xl font-extrabold text-foreground">{brl(completo.price)}</span>
                </p>
              </div>
              <span className="rounded-full bg-secondary px-3 py-1 text-xs font-extrabold text-secondary-foreground">
                −{Math.round((savings(completo) / completo.fromPrice) * 100)}%
              </span>
            </div>
          </Reveal>

          <Reveal delay={220} className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild variant="cta" size="2xl" className="w-full sm:w-auto">
              <a href="#planos">
                Quero entender a Reforma
                <ArrowRight />
              </a>
            </Button>
            <Button asChild variant="glass" size="xl" className="hidden sm:inline-flex">
              <a href="#conteudo">Ver o conteúdo</a>
            </Button>
          </Reveal>
          <Reveal delay={260}>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[13px] font-semibold text-muted-foreground">
              <li className="flex items-center gap-1.5"><ShieldCheck className="size-4 text-primary" />{GUARANTEE_DAYS} dias de garantia</li>
              <li className="flex items-center gap-1.5"><Zap className="size-4 text-primary" />Acesso imediato</li>
              <li className="flex items-center gap-1.5"><Lock className="size-4 text-primary" />Compra segura via Pix</li>
            </ul>
          </Reveal>
        </div>

        <Reveal delay={120} className="relative">
          <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-primary/20 blur-3xl" />
          <div className="glow-ring relative rounded-[1.75rem]">
            <div className="relative overflow-hidden rounded-[1.75rem] bg-ink">
              <img
                src={heroAsset}
                alt="Coleção Mapa Fácil: livro, mapas mentais de IBS e CBS, checklist e linha do tempo"
                width={1200}
                height={1200}
                className="aspect-square w-full object-cover"
                fetchPriority="high"
              />
              <div className="scan-line" />
            </div>
          </div>
          <div className="animate-float absolute -bottom-5 left-3 flex items-center gap-2.5 rounded-2xl border border-border bg-card/95 px-3.5 py-2.5 shadow-lift backdrop-blur sm:left-6">
            <span className="grid size-9 place-items-center rounded-xl bg-primary/15 text-primary"><Files className="size-5" /></span>
            <span className="text-xs leading-tight">
              <strong className="block text-sm text-foreground">PDF + planilhas</strong>
              <span className="text-muted-foreground">celular, PC ou impresso</span>
            </span>
          </div>
          <div className="animate-float-delayed absolute -top-4 right-3 flex items-center gap-2 rounded-2xl border border-border bg-card/95 px-3 py-2 shadow-lift backdrop-blur sm:right-6">
            <Gift className="size-4 text-highlight" />
            <span className="text-xs font-extrabold text-foreground">8 bônus inclusos</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Stats() {
  const items = [
    { n: 12, suffix: "", label: "temas organizados" },
    { n: 8, suffix: "", label: "bônus práticos" },
    { n: GUARANTEE_DAYS, suffix: " dias", label: "de garantia" },
    { n: 100, suffix: "%", label: "digital e imediato" },
  ];
  return (
    <section className="relative border-y border-border bg-surface">
      <div className="mx-auto grid max-w-6xl grid-cols-2 md:grid-cols-4">
        {items.map(({ n, suffix, label }, i) => (
          <Reveal
            key={label}
            delay={i * 60}
            className="border-border px-4 py-6 text-center odd:border-r md:border-r md:last:border-r-0 [&:nth-child(-n+2)]:border-b md:[&:nth-child(-n+2)]:border-b-0"
          >
            <p className="font-display text-3xl font-extrabold text-gradient sm:text-4xl">
              <CountUp to={n} suffix={suffix} />
            </p>
            <p className="mt-1 font-mono-tech text-[10px] font-bold text-muted-foreground uppercase">{label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Ticker() {
  const items = [...CONTENTS, ...CONTENTS];
  return (
    <div className="relative overflow-hidden border-b border-border bg-ink py-3 fade-x">
      <div className="motion-safe-marquee flex w-max gap-8 pr-8">
        {items.map((c, i) => (
          <span key={`${c}-${i}`} className="flex items-center gap-2 font-mono-tech text-[11px] font-bold whitespace-nowrap text-muted-foreground uppercase">
            <span className="size-1 rounded-full bg-primary" />
            {c}
          </span>
        ))}
      </div>
    </div>
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
          Quanto tempo você ainda vai gastar tentando entender a Reforma em <span className="text-gradient">conteúdos soltos?</span>
        </h2>
      </Reveal>
      <div className="mt-12 grid gap-4 md:grid-cols-2">
        <Reveal className="rounded-3xl border border-destructive/20 bg-destructive/5 p-6 sm:p-8">
          <p className="font-mono-tech text-[11px] font-bold text-destructive uppercase">Sem o Mapa Fácil</p>
          <ul className="mt-5 space-y-4">
            {pains.map((p) => (
              <li key={p} className="flex gap-3 text-[15px] text-muted-foreground">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-destructive/15 text-destructive">
                  <X className="size-3.5" strokeWidth={3} />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={80} className="rounded-3xl border border-primary/30 bg-primary/5 p-6 shadow-glow sm:p-8">
          <p className="font-mono-tech text-[11px] font-bold text-primary uppercase">Com o Mapa Fácil</p>
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
    <section className="relative overflow-hidden border-y border-border bg-ink">
      <div className="tech-grid pointer-events-none absolute inset-0 fade-b" />
      <div className="relative mx-auto max-w-6xl px-4 py-20 md:py-28">
        <Reveal className="max-w-2xl">
          <SectionEyebrow icon={Layers}>Clareza em cada tema</SectionEyebrow>
          <h2 className="mt-4 text-3xl font-extrabold sm:text-5xl">
            Tudo fica mais fácil quando está <span className="text-gradient">organizado visualmente</span>
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 70}>
              <Spotlight className="glass h-full rounded-3xl p-6 transition-transform duration-300 hover:-translate-y-1">
                <span className="relative grid size-12 place-items-center rounded-2xl border border-primary/30 bg-primary/10 text-primary">
                  <Icon className="size-6" />
                </span>
                <p className="relative mt-5 font-mono-tech text-[10px] font-bold text-muted-foreground">{String(i + 1).padStart(2, "0")} /</p>
                <h3 className="relative mt-1 text-xl font-bold">{title}</h3>
                <p className="relative mt-2 text-[15px] leading-relaxed text-muted-foreground">{text}</p>
              </Spotlight>
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
            Estude no celular, no computador <span className="text-gradient">ou imprima</span>
          </h2>
          <ul className="mt-8 grid gap-2.5 sm:grid-cols-2">
            {CONTENTS.map((c, i) => (
              <li key={c} className="group flex items-center gap-3 rounded-xl border border-border bg-card/60 px-3.5 py-3 text-[14.5px] font-semibold text-foreground transition-colors hover:border-primary/40">
                <span className="font-mono-tech text-[10px] font-bold text-primary">{String(i + 1).padStart(2, "0")}</span>
                {c}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={100} className="order-1 lg:order-2">
          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-tech/15 blur-3xl" />
            <div className="overflow-hidden rounded-3xl border border-border shadow-lift">
              <img
                src={devicesAsset}
                alt="Mapa mental do IBS em um tablet e a capa do Mapa Fácil em um celular"
                width={1200}
                height={1200}
                loading="lazy"
                className="aspect-square w-full object-cover"
              />
            </div>
            <div className="glass absolute right-4 bottom-4 flex items-center gap-2 rounded-xl px-3 py-2">
              <MonitorSmartphone className="size-4 text-tech" />
              <span className="text-xs font-bold">Funciona em qualquer tela</span>
            </div>
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
    <section className="border-y border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-20 md:py-28">
        <Reveal className="max-w-2xl">
          <SectionEyebrow icon={Star}>Feito para o seu dia a dia</SectionEyebrow>
          <h2 className="mt-4 text-3xl font-extrabold sm:text-5xl">Ideal para quem quer…</h2>
          <p className="mt-3 text-muted-foreground">Contadores, profissionais fiscais, empresários e estudantes.</p>
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(([title, text], i) => (
            <Reveal key={title} delay={(i % 3) * 60}>
              <Spotlight className="h-full rounded-3xl border border-border bg-card p-6 shadow-card">
                <span className="relative font-display text-3xl font-extrabold text-primary/40">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="relative mt-2 text-lg leading-snug font-bold">{title}</h3>
                <p className="relative mt-2 text-[15px] leading-relaxed text-muted-foreground">{text}</p>
              </Spotlight>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Bonuses -------------------------------- */

const BONUS_MEDIA = [
  { icon: BookOpen, img: bonus01 },
  { icon: ListChecks, img: bonus02 },
  { icon: Clock, img: bonus03 },
  { icon: Layers, img: bonus04 },
  { icon: Table2, img: bonus05 },
  { icon: Calculator, img: bonus06 },
  { icon: FileCheck, img: bonus07 },
  { icon: Receipt, img: bonus08 },
];

function Bonuses() {
  const autoScroll = useRef(
    AutoScroll({ speed: 0.8, startDelay: 600, stopOnInteraction: false, stopOnMouseEnter: true, stopOnFocusIn: true }),
  );
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) autoScroll.current.stop();
  }, [api]);

  return (
    <section id="bonus" className="relative scroll-mt-20 overflow-hidden py-20 md:py-28">
      <div className="aurora pointer-events-none absolute inset-x-0 top-10 h-96 opacity-60" />
      <div className="relative mx-auto max-w-6xl px-4">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionEyebrow icon={Gift}>E não para por aí</SectionEyebrow>
          <h2 className="mt-4 text-3xl font-extrabold sm:text-5xl">
            <span className="text-gradient">8 bônus</span> no Plano Completo
          </h2>
          <p className="mt-3 text-muted-foreground">
            Ferramentas práticas para aplicar a Reforma na rotina. Separados, custariam{" "}
            <strong className="text-foreground">{brl(bonusTotal())}</strong> — com o Plano Completo, saem de graça.
          </p>
        </Reveal>
        <Reveal className="fade-x -mx-4 mt-12 sm:mx-0">
          <Carousel
            opts={{ loop: true, align: "start", dragFree: true }}
            plugins={[autoScroll.current]}
            setApi={setApi}
            aria-label="Bônus passando na tela"
          >
            <CarouselContent className="py-2">
              {BONUSES.map(({ title, text, value }, i) => {
                const { icon: Icon, img } = BONUS_MEDIA[i % BONUS_MEDIA.length]!;
                return (
                  <CarouselItem key={title} className="basis-[78%] sm:basis-[45%] lg:basis-[30%] xl:basis-[24%]">
                    <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow">
                      <div className="relative aspect-square overflow-hidden bg-muted">
                        <img
                          src={img}
                          alt={`Mockup do bônus ${title}`}
                          width={1024}
                          height={1024}
                          loading="lazy"
                          className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <span className="absolute top-3 left-3 rounded-full bg-accent px-2.5 py-1 font-mono-tech text-[10px] font-extrabold text-accent-foreground shadow-card">
                          BÔNUS {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <div className="flex flex-1 flex-col p-5">
                        <div className="flex items-start gap-3">
                          <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary"><Icon className="size-4" /></span>
                          <h3 className="text-[16px] leading-snug font-bold">{title}</h3>
                        </div>
                        <p className="mt-2 mb-4 text-sm leading-relaxed text-muted-foreground">{text}</p>
                        <div className="mt-auto flex items-center justify-between gap-2 border-t border-border pt-4">
                          <span className="text-sm text-muted-foreground">
                            De <span className="font-bold line-through decoration-destructive/70">{brl(value)}</span>
                          </span>
                          <span className="rounded-full bg-primary px-3 py-1 text-xs font-extrabold tracking-wider text-primary-foreground">GRÁTIS</span>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
        </Reveal>
        <p className="mt-3 text-center text-xs text-muted-foreground">Arraste para o lado para ver com calma</p>

        <Reveal className="glass mx-auto mt-10 max-w-3xl rounded-[2rem] p-6 text-center sm:p-8">
          <p className="font-mono-tech text-[11px] font-bold text-muted-foreground uppercase">Valor total dos 8 bônus</p>
          <p className="mt-1 font-display text-3xl font-extrabold text-muted-foreground line-through decoration-destructive/70 sm:text-4xl">
            {brl(bonusTotal())}
          </p>
          <p className="mt-3 text-xl font-extrabold sm:text-2xl">
            Hoje: <span className="text-gradient">R$ 0,00</span> ao adquirir o Plano Completo
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Você leva o material principal + todos os bônus por apenas {brl(completo.price)}.
          </p>
          <Button asChild variant="cta" size="xl" className="mt-6 w-full sm:w-auto">
            <Link to="/checkout" search={{ plano: "completo" }}>
              Quero os 8 bônus grátis <ArrowRight />
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------- Pricing -------------------------------- */

function Pricing() {
  return (
    <section id="planos" className="relative scroll-mt-16 overflow-hidden border-y border-border bg-ink">
      <div className="tech-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      <div className="aurora animate-aurora pointer-events-none absolute inset-0 opacity-70" />
      <div className="relative mx-auto max-w-5xl px-4 py-20 md:py-28">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionEyebrow icon={Sparkles}>Seu próximo passo</SectionEyebrow>
          <h2 className="mt-4 text-3xl font-extrabold sm:text-5xl">Escolha a opção ideal para você</h2>
          <p className="mt-3 text-muted-foreground">Pagamento único. Sem mensalidades. Acesso na hora.</p>
        </Reveal>

        <div className="mt-14 grid items-start gap-6 md:grid-cols-[1fr_1.15fr]">
          {/* Completo first on mobile */}
          <Reveal className="order-1 md:order-2">
            <div className="glow-ring relative rounded-[2rem]">
              <div className="relative rounded-[2rem] bg-card p-6 sm:p-8">
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-cta-gradient px-4 py-1.5 font-mono-tech text-[10.5px] font-extrabold whitespace-nowrap text-primary-foreground shadow-cta">
                  ★ MAIS ESCOLHIDO · 8 BÔNUS
                </span>
                <div className="flex items-start justify-between gap-4 pt-2">
                  <div>
                    <h3 className="text-2xl font-extrabold">{completo.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Material principal + 8 bônus</p>
                  </div>
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl border border-primary/30 bg-primary/10 text-primary"><Gift className="size-6" /></span>
                </div>
                <PriceBlock plan={completo} />
                <Button asChild variant="cta" size="2xl" className="mt-6 w-full">
                  <Link to="/checkout" search={{ plano: "completo" }}>
                    Quero o Plano Completo <ArrowRight />
                  </Link>
                </Button>
                <p className="mt-3 flex items-center justify-center gap-1.5 text-xs font-semibold text-muted-foreground">
                  <Lock className="size-3.5" /> Pagamento seguro · liberação imediata
                </p>
                <ul className="mt-6 space-y-3 border-t border-border pt-6">
                  <li className="flex gap-3 text-[15px] font-bold"><Tick />Mapa Fácil da Reforma Tributária completo</li>
                  {BONUSES.map((b, i) => (
                    <li key={b.title} className="flex gap-3 text-[14.5px]">
                      <Tick />
                      <span className="flex-1">
                        <span className="font-extrabold text-primary">Bônus {String(i + 1).padStart(2, "0")}</span> · {b.title}
                      </span>
                      <span className="shrink-0 font-mono-tech text-[10px] font-extrabold text-primary">INCLUSO</span>
                    </li>
                  ))}
                </ul>
                <GuaranteeNote />
              </div>
            </div>
          </Reveal>

          <Reveal delay={80} className="order-2 md:order-1 md:mt-10">
            <div className="glass rounded-[2rem] p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-extrabold">{basico.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Só o material principal</p>
                </div>
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-foreground/5"><BookOpen className="size-6" /></span>
              </div>
              <PriceBlock plan={basico} tone="light" />
              <Button asChild variant="outlineInk" size="xl" className="mt-6 w-full">
                <Link to="/checkout" search={{ plano: "basico" }}>Quero só o básico</Link>
              </Button>
              <ul className="mt-7 space-y-3 border-t border-border pt-6 text-[15px]">
                <li className="flex gap-3"><Tick />Mapa Fácil da Reforma Tributária</li>
                <li className="flex gap-3"><Tick />Acesso imediato</li>
                <li className="flex gap-3 text-muted-foreground line-through decoration-muted-foreground/60">
                  <span className="grid size-6 shrink-0 place-items-center"><X className="size-4" /></span>8 bônus práticos
                </li>
              </ul>
              <p className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground"><ShieldCheck className="size-4" />{GUARANTEE_DAYS} dias de garantia</p>
            </div>
          </Reveal>
        </div>
        <Reveal className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5"><Lock className="size-4 text-primary" />Pagamento seguro</span>
          <span className="flex items-center gap-1.5"><Zap className="size-4 text-primary" />Pix com aprovação na hora</span>
          <span className="flex items-center gap-1.5"><ShieldCheck className="size-4 text-primary" />Reembolso em até {GUARANTEE_DAYS} dias</span>
        </Reveal>
      </div>
    </section>
  );
}

function PriceBlock({ plan, tone = "dark" }: { plan: (typeof PLANS)["basico"]; tone?: "dark" | "light" }) {
  const [reais = "", cents = ""] = plan.price.toFixed(2).split(".");
  return (
    <div className="mt-6">
      <p className="text-sm text-muted-foreground">
        de <span className="line-through">{brl(plan.fromPrice)}</span> por apenas
      </p>
      <p className={`mt-1 flex items-start font-display leading-none font-extrabold ${tone === "light" ? "text-foreground" : "text-gradient"}`}>
        <span className="mt-2 text-xl">R$</span>
        <span className="text-6xl tracking-tight">{reais}</span>
        <span className="mt-2 text-2xl">,{cents}</span>
      </p>
      <span
        className={
          tone === "light"
            ? "mt-3 inline-block rounded-full bg-foreground/10 px-3 py-1 text-xs font-bold"
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
    <p className="mt-6 flex items-center justify-center gap-2 rounded-2xl border border-border bg-muted px-4 py-3 text-sm font-semibold text-muted-foreground">
      <ShieldCheck className="size-4 text-primary" />
      Risco zero: {GUARANTEE_DAYS} dias de garantia
    </p>
  );
}

/* ------------------------------- Guarantee ------------------------------- */

function Guarantee() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-20 md:py-24">
      <Reveal className="glass flex flex-col items-center gap-8 rounded-[2rem] p-8 text-center sm:flex-row sm:p-10 sm:text-left">
        <div className="relative grid size-32 shrink-0 place-items-center rounded-full border border-primary/30 bg-primary/10">
          <div className="absolute inset-0 animate-[spin_14s_linear_infinite] rounded-full border border-dashed border-primary/40 motion-reduce:animate-none" />
          <div className="grid size-24 place-items-center rounded-full bg-cta-gradient text-primary-foreground shadow-cta">
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
    <section className="border-y border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-20 md:py-24">
        <Reveal className="text-center">
          <SectionEyebrow icon={Zap}>Simples do início ao fim</SectionEyebrow>
          <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">Como é o acesso</h2>
        </Reveal>
        <ol className="relative mt-12 grid gap-4 md:grid-cols-3">
          <div className="pointer-events-none absolute top-11 right-[16%] left-[16%] hidden h-px bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 md:block" />
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 90} className="relative rounded-3xl border border-border bg-card p-6 shadow-card">
              <span className="grid size-11 place-items-center rounded-full border border-primary/40 bg-ink font-display text-lg font-extrabold text-primary shadow-glow">{i + 1}</span>
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
            <AccordionItem
              key={q}
              value={q}
              className="rounded-2xl border border-border bg-card px-5 shadow-card transition-colors data-[state=open]:border-primary/40"
            >
              <AccordionTrigger className="py-5 text-left text-base font-bold hover:no-underline">{q}</AccordionTrigger>
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
    <section className="px-4 pb-28 md:pb-24">
      <Reveal className="glow-ring relative mx-auto max-w-5xl rounded-[2rem]">
        <div className="relative overflow-hidden rounded-[2rem] bg-ink px-6 py-14 text-center sm:px-12">
          <div className="tech-grid pointer-events-none absolute inset-0 fade-b" />
          <div className="aurora animate-aurora pointer-events-none absolute inset-0 opacity-70" />
          <div className="relative">
            <h2 className="text-3xl font-extrabold sm:text-5xl">
              Pare de se perder. <span className="text-gradient">Comece a entender hoje.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Todo o conteúdo da Reforma organizado em mapas visuais, com acesso imediato e {GUARANTEE_DAYS} dias de garantia.
            </p>
            <Button asChild variant="cta" size="2xl" className="mt-8 w-full sm:w-auto">
              <Link to="/checkout" search={{ plano: "completo" }}>
                Quero meu acesso agora <ArrowRight />
              </Link>
            </Button>
            <p className="mt-4 text-sm text-muted-foreground">Plano Completo por {brl(completo.price)} · pagamento único</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-ink pb-24 md:pb-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-10 text-center">
        <Logo />
        <p className="max-w-xl text-xs leading-relaxed text-muted-foreground">
          © {new Date().getFullYear()} Mapa Fácil da Reforma Tributária. Material educacional e informativo; não substitui a consulta à legislação vigente.
        </p>
      </div>
    </footer>
  );
}

/* ---------------------------- Mobile sticky CTA ---------------------------- */

function StickyCta() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const pricing = document.getElementById("planos");
    let pricingVisible = false;
    const io =
      pricing && "IntersectionObserver" in window
        ? new IntersectionObserver((entries) => {
            pricingVisible = entries.some((e) => e.isIntersecting);
            update();
          })
        : null;
    function update() {
      setShow(window.scrollY > 640 && !pricingVisible);
    }
    if (pricing) io?.observe(pricing);
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", update);
      io?.disconnect();
    };
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/85 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl transition-transform duration-300 md:hidden ${show ? "translate-y-0" : "translate-y-full"}`}
      aria-hidden={!show}
    >
      <div className="flex items-center gap-3">
        <div className="min-w-0 leading-tight">
          <p className="truncate text-[11px] font-semibold text-muted-foreground">Completo + 8 bônus</p>
          <p className="flex items-baseline gap-1.5">
            <span className="font-display text-xl font-extrabold">{brl(completo.price)}</span>
            <span className="text-[11px] text-muted-foreground line-through">{brl(completo.fromPrice)}</span>
          </p>
        </div>
        <Button asChild variant="cta" size="xl" className="ml-auto h-12 flex-1 px-4 text-[15px]">
          <Link to="/checkout" search={{ plano: "completo" }} tabIndex={show ? 0 : -1}>
            Comprar agora <ArrowRight />
          </Link>
        </Button>
      </div>
    </div>
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

function SectionEyebrow({ icon: Icon, children }: { icon: ComponentType<{ className?: string }>; children: ReactNode; tone?: "dark" | "light" }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 font-mono-tech text-[10.5px] font-bold text-primary uppercase">
      <Icon className="size-3.5" />
      {children}
    </span>
  );
}
