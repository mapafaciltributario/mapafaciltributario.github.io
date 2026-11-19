import { createFileRoute } from "@tanstack/react-router";
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

import { checkoutHref, checkoutClick } from "@/lib/checkout-links";
import { Logo } from "@/components/brand/Logo";
import { Reveal } from "@/components/landing/Reveal";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BONUSES, GUARANTEE_DAYS, PLANS, bonusTotal, brl, savings } from "@/lib/plans";
import bonus01 from "@/assets/bonus-01-glossario.jpg";
import bonus02 from "@/assets/bonus-02-checklist.jpg";
import bonus03 from "@/assets/bonus-03-linha-do-tempo.jpg";
import bonus04 from "@/assets/bonus-04-antes-depois.jpg";
import bonus05 from "@/assets/bonus-05-tabela-codigos.jpg";
import bonus06 from "@/assets/bonus-06-calculadora.jpg";
import bonus07 from "@/assets/bonus-07-gabarito-nota.jpg";
import bonus08 from "@/assets/bonus-08-guia-emissao.jpg";
import heroAsset from "@/assets/mapa-facil-mesa.jpg";
import devicesAsset from "@/assets/mapa-facil-dispositivos.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mapa Fácil da Reforma Tributária — Códigos IBS/CBS, CST, cClassTrib e NF-e 2027" },
      {
        name: "description",
        content:
          "Evite erros de parametrização e rejeição na NF-e em 2027: tabela pronta de códigos IBS/CBS (CST, cClassTrib, cIndOp), gabarito de Nota Fiscal e mapas visuais. Acesso imediato.",
      },
      { property: "og:title", content: "Mapa Fácil da Reforma Tributária — Códigos IBS/CBS e NF-e 2027" },
      {
        property: "og:description",
        content: "Tabela de CST/cClassTrib, gabarito de NF-e e mapas visuais da Reforma Tributária. A partir de R$ 27,90.",
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
          <a href="#bonus" className="hover:text-foreground">Ferramentas &amp; Bônus</a>
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
              IBS · CBS · CST · cClassTrib · NF-e 2027
            </span>
          </Reveal>
          <Reveal delay={60}>
            <h1 className="mt-5 text-[2.45rem] leading-[1.05] font-extrabold text-foreground sm:text-5xl lg:text-[3.75rem]">
              Evite erros de parametrização e <span className="marker">rejeição na NF-e</span> com os novos códigos IBS/CBS.
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Tenha em mãos a <strong className="text-foreground">Tabela Pronta de Códigos (CST, cClassTrib, cIndOp e cCredPres)</strong>, o{" "}
              <strong className="text-foreground">Gabarito de preenchimento na Nota Fiscal</strong> e os Mapas Visuais da Reforma Tributária para consultar em segundos no dia a dia.
            </p>
          </Reveal>
          <Reveal delay={180} className="mt-7 flex flex-col gap-2.5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild variant="cta" size="2xl" className="w-full sm:w-auto">
                <a href="#planos">
                  Quero acessar o Guia e a Tabela agora
                  <ArrowRight />
                </a>
              </Button>
            </div>
            <p className="text-[13px] font-semibold text-foreground/85">
              Acesso imediato por apenas <span className="font-extrabold text-primary">{brl(basico.price)}</span> (ou{" "}
              <span className="font-extrabold text-primary">{brl(completo.price)}</span> no Plano Completo com todos os códigos e planilhas)
            </p>
          </Reveal>
          <Reveal delay={240}>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[13px] font-semibold text-muted-foreground">
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
              src={heroAsset}
              alt="Coleção Mapa Fácil: mapas visuais de IBS e CBS, tabela de códigos fiscais, gabarito de NF-e e checklist"
              width={1600}
              height={1200}
              className="aspect-[4/3] w-full object-cover"
              fetchPriority="high"
            />
          </div>
          <div className="animate-float absolute -bottom-5 left-3 flex items-center gap-2.5 rounded-2xl border border-border bg-card px-3.5 py-2.5 shadow-lift sm:left-6">
            <span className="grid size-9 place-items-center rounded-xl bg-secondary text-primary"><Files className="size-5" /></span>
            <span className="text-xs leading-tight"><strong className="block text-sm text-foreground">Tabela de Códigos + PDF</strong><span className="text-muted-foreground">celular, PC ou impresso</span></span>
          </div>
          <div className="absolute -top-4 right-3 rotate-3 rounded-xl bg-accent px-3 py-1.5 font-display text-sm font-extrabold text-accent-foreground shadow-card sm:right-6">
            CST · cClassTrib · NF-e ✓
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SpecsStrip() {
  const items = [
    { icon: Table2, label: "Tabela de códigos IBS/CBS" },
    { icon: FileCheck, label: "Gabarito de NF-e 2027" },
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
    "Dúvida na hora de parametrizar CST, cClassTrib e cIndOp no ERP",
    "Risco de rejeição de NF-e e travamento de faturamento na virada de 2027",
    "Perder horas cruzando notas técnicas e leis extensas soltas",
  ];
  const gains = [
    "Tabela pronta dos novos códigos IBS/CBS para consulta rápida",
    "Gabarito visual passo a passo dos campos da Nota Fiscal",
    "Mapas mentais objetivos para alinhar equipe e orientar clientes",
  ];
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 md:py-28">
      <Reveal className="mx-auto max-w-2xl text-center">
        <SectionEyebrow icon={Sparkles}>Menos risco fiscal. Mais agilidade.</SectionEyebrow>
        <h2 className="mt-4 text-3xl font-extrabold sm:text-5xl">
          Sua rotina fiscal está pronta para parametrizar <span className="marker">IBS e CBS</span> sem travar notas?
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
    { icon: Table2, title: "Códigos mapeados", text: "CST, cClassTrib, cIndOp e cCredPres organizados para consulta rápida no ERP." },
    { icon: FileCheck, title: "Gabarito de NF-e", text: "Passo a passo visual dos novos campos de destaque de IBS e CBS na nota." },
    { icon: Brain, title: "Mapas visuais prontos", text: "IBS, CBS, Imposto Seletivo e regras de transição resumidos sem juridiquês." },
    { icon: FolderOpen, title: "Consulta imediata", text: "Arquivos organizados em pastas para usar no computador, celular ou imprimir." },
  ];
  return (
    <section className="relative overflow-hidden bg-ink-gradient text-ink-foreground">
      <div className="ink-grid pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-6xl px-4 py-20 md:py-28">
        <Reveal className="max-w-2xl">
          <SectionEyebrow icon={Layers} tone="light">Parametrização sem erro</SectionEyebrow>
          <h2 className="mt-4 text-3xl font-extrabold sm:text-5xl">
            Tudo fica mais seguro quando está <span className="text-highlight">mapeado na prática</span>
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
            <a href="#planos">Quero o Guia e a Tabela <ArrowRight /></a>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------- Contents ------------------------------- */

const CONTENTS = [
  "Tabela de CST, cClassTrib, cIndOp e cCredPres (Plano Completo)",
  "Gabarito de preenchimento na Nota Fiscal (Plano Completo)",
  "Guia de emissão de NF-e, NFC-e, CT-e e NFS-e (Plano Completo)",
  "Planilha Calculadora de IBS/CBS (Plano Completo)",
  "IBS e CBS explicados visualmente",
  "Apuração assistida e novos créditos",
  "Quando emitir Nota de Débito e Crédito",
  "Cronograma da transição 2026–2033",
  "Impactos na rotina contábil e fiscal",
  "Simples Nacional, MEI e regimes específicos",
  "Glossário de termos técnicos traduzidos",
  "Atualizações conforme novas notas técnicas",
];

function Contents() {
  return (
    <section id="conteudo" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 md:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal className="order-2 lg:order-1">
          <SectionEyebrow icon={BookOpen}>O que você vai receber</SectionEyebrow>
          <h2 className="mt-4 text-3xl font-extrabold sm:text-5xl">
            Consulte na tela do ERP, no celular <span className="marker">ou imprima</span>
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
              src={devicesAsset}
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
    ["Parametrizar CST e cClassTrib sem erro", "Consulte rapidamente os códigos exigidos para evitar rejeição na emissão."],
    ["Conferir o destaque de IBS/CBS na Nota Fiscal", "Use o gabarito visual e a calculadora para validar valores antes de transmitir."],
    ["Evitar travamento de NF-e, NFC-e, CT-e e NFS-e", "Tenha um guia objetivo das regras de emissão para cada documento fiscal."],
    ["Orientar clientes e equipes com segurança", "Mostre o impacto da transição de forma clara em reuniões e diagnósticos."],
    ["Dominar a Reforma sem ler centenas de páginas", "Estude pelos mapas mentais visuais em poucos minutos por dia."],
    ["Ter um material de bancada sempre atualizado", "Acompanhe as mudanças regulamentares sem ficar perdido em notícias soltas."],
  ];
  return (
    <section className="border-y border-border bg-muted/60">
      <div className="mx-auto max-w-6xl px-4 py-20 md:py-28">
        <Reveal className="max-w-2xl">
          <SectionEyebrow icon={Star}>Feito para a operação fiscal</SectionEyebrow>
          <h2 className="mt-4 text-3xl font-extrabold sm:text-5xl">Ideal para quem precisa…</h2>
          <p className="mt-3 text-muted-foreground">
            Contadores, Analistas Fiscais, Faturistas, Consultores de ERP e Empresários que precisam parametrizar sistemas e evitar rejeição de notas.
          </p>
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
    <section id="bonus" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 md:py-28">
      <Reveal className="mx-auto max-w-2xl text-center">
        <SectionEyebrow icon={Gift}>Pacote operacional completo</SectionEyebrow>
        <h2 className="mt-4 text-3xl font-extrabold sm:text-5xl">
          <span className="marker">8 ferramentas práticas</span> inclusas no Plano Completo
        </h2>
        <p className="mt-3 text-muted-foreground">
          Inclui a Tabela de CST/cClassTrib, Gabarito de Nota Fiscal, Calculadora IBS/CBS e Guia de Emissão. Separados, custariam{" "}
          <strong className="text-foreground">{brl(bonusTotal())}</strong> — no Plano Completo, saem de graça.
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
            <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-card transition-shadow hover:shadow-lift">
              <div className="relative aspect-square overflow-hidden bg-secondary">
                <img
                  src={img}
                  alt={`Mockup do bônus ${title}`}
                  width={1024}
                  height={1024}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 rounded-full bg-accent px-2.5 py-1 text-[10px] font-extrabold tracking-wider text-accent-foreground shadow-card">
                  FERRAMENTA {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-secondary text-primary"><Icon className="size-4" /></span>
                  <h3 className="text-[16px] font-bold leading-snug">{title}</h3>
                </div>
                <p className="mt-2 mb-4 text-sm leading-relaxed text-muted-foreground">{text}</p>
                <div className="mt-auto flex items-center justify-between gap-2 border-t border-border pt-4">
                  <span className="text-sm text-muted-foreground">
                    De <span className="font-bold line-through decoration-destructive/70">{brl(value)}</span>
                  </span>
                  <span className="rounded-full bg-success px-3 py-1 text-xs font-extrabold tracking-wider text-primary-foreground">
                    INCLUSO
                  </span>
                </div>
              </div>
            </div>
            </CarouselItem>
          );
        })}
          </CarouselContent>
        </Carousel>
      </Reveal>
      <p className="mt-3 text-center text-xs text-muted-foreground">Arraste para o lado para ver todas as ferramentas</p>

      <Reveal className="mx-auto mt-10 max-w-3xl rounded-[2rem] border-2 border-dashed border-primary/30 bg-card p-6 text-center shadow-card sm:p-8">
        <p className="text-sm font-bold tracking-wider text-muted-foreground uppercase">Valor total das 8 ferramentas práticas</p>
        <p className="mt-1 font-display text-3xl font-extrabold text-muted-foreground line-through decoration-destructive/70 sm:text-4xl">
          {brl(bonusTotal())}
        </p>
        <p className="mt-3 text-xl font-extrabold sm:text-2xl">
          Hoje: <span className="marker-green">R$ 0,00</span> ao adquirir o Plano Completo
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Você leva o Mapa Fácil + Tabela de Códigos + Gabarito de NF-e + Calculadora por apenas {brl(completo.price)}.
        </p>
        <Button asChild variant="cta" size="xl" className="mt-6 w-full sm:w-auto">
          <a href={checkoutHref("completo")} onClick={(event) => checkoutClick(event, "completo")}>
            Quero o Plano Completo com as 8 ferramentas <ArrowRight />
          </a>
        </Button>
      </Reveal>
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
                ★ MAIS ESCOLHIDO · TABELA DE CÓDIGOS + NF-e
              </span>
              <div className="flex items-start justify-between gap-4 pt-2">
                <div>
                  <h3 className="text-2xl font-extrabold">{completo.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Mapas visuais + Tabela de códigos + 7 ferramentas</p>
                </div>
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-secondary text-primary"><Gift className="size-6" /></span>
              </div>
              <PriceBlock plan={completo} />
              <Button asChild variant="cta" size="2xl" className="mt-6 w-full">
                <a href={checkoutHref("completo")} onClick={(event) => checkoutClick(event, "completo")}>
                  Quero o Plano Completo <ArrowRight />
                </a>
              </Button>
              <ul className="mt-7 space-y-3 border-t border-border pt-6">
                <li className="flex gap-3 text-[15px] font-bold"><Tick />Mapa Fácil da Reforma Tributária completo</li>
                {BONUSES.map((b, i) => (
                  <li key={b.title} className="flex gap-3 text-[14.5px]">
                    <Tick />
                    <span className="flex-1"><span className="font-extrabold text-primary">Item {String(i + 1).padStart(2, "0")}</span> · {b.title}</span>
                    <span className="shrink-0 text-right text-xs leading-tight">
                      <span className="block font-extrabold text-success">INCLUSO</span>
                    </span>
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
                  <p className="mt-1 text-sm text-ink-muted">Só os mapas visuais principais</p>
                </div>
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-ink-foreground/10"><BookOpen className="size-6" /></span>
              </div>
              <PriceBlock plan={basico} tone="light" />
              <Button asChild variant="outlineInk" size="xl" className="mt-6 w-full">
                <a href={checkoutHref("basico")} onClick={(event) => checkoutClick(event, "basico")}>Quero só o básico</a>
              </Button>
              <ul className="mt-7 space-y-3 border-t border-ink-foreground/10 pt-6 text-[15px]">
                <li className="flex gap-3"><Tick />Mapa Fácil da Reforma Tributária (PDF)</li>
                <li className="flex gap-3"><Tick />Acesso imediato</li>
                <li className="flex gap-3 text-ink-muted line-through decoration-ink-muted/60"><span className="grid size-6 shrink-0 place-items-center"><X className="size-4" /></span>Tabela de códigos e 7 ferramentas fiscais</li>
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
            Se o material não ajudar na sua rotina fiscal ou não deixar a Reforma Tributária mais clara para você, peça o reembolso integral dentro de {GUARANTEE_DAYS} dias. Sem burocracia e sem explicação obrigatória.
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
    { title: "Receba o acesso", text: "O link chega no seu e-mail e no seu WhatsApp na mesma hora." },
    { title: "Consulte na prática", text: "Abra a tabela de códigos, o gabarito da NF-e e os mapas no PC ou celular." },
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
    ["Como recebo o material e a tabela de códigos?", "Logo após a confirmação do pagamento, você recebe o acesso imediato por e-mail e WhatsApp."],
    ["Qual plano inclui a Tabela de CST/cClassTrib e o Gabarito de NF-e?", "O Plano Completo (R$ 37,90) inclui o Mapa Fácil principal mais todas as 8 ferramentas práticas, incluindo a Tabela de Códigos, o Gabarito de preenchimento da Nota Fiscal, o Guia de emissão e a Calculadora IBS/CBS."],
    ["O material é físico?", "Não. O material é 100% digital (PDF e planilhas), para consultar no computador durante a emissão de notas, no celular ou imprimir."],
    ["O material substitui a legislação?", "Não. É um material prático e educacional de apoio rápido. Para casos específicos, consulte sempre a legislação e notas técnicas vigentes."],
    ["E se a Reforma ou as tabelas mudarem?", "O material prevê atualizações conforme mudanças relevantes nas regras e códigos da Reforma Tributária."],
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
            Não deixe sua nota travar. <span className="text-highlight">Parametrize com segurança hoje.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-ink-muted">
            Tabela de códigos IBS/CBS, gabarito de NF-e, planilha calculadora e mapas visuais com acesso imediato e {GUARANTEE_DAYS} dias de garantia.
          </p>
          <Button asChild variant="cta" size="2xl" className="mt-8 w-full sm:w-auto">
            <a href={checkoutHref("completo")} onClick={(event) => checkoutClick(event, "completo")}>
              Quero meu acesso agora <ArrowRight />
            </a>
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
