import { createFileRoute } from "@tanstack/react-router";
import { OfferPage } from "@/components/OfferPage";

export const Route = createFileRoute("/upsell")({
  head: () => ({ meta: [
    { title: "Espere! Oferta exclusiva — Pack Tributário Pro" },
    { name: "description", content: "Oferta única liberada só agora: planilha comparativa + 15 modelos profissionais." },
    { property: "og:title", content: "Espere! Oferta exclusiva — Pack Tributário Pro" },
    { property: "og:description", content: "Planilha comparativa + 15 modelos de pareceres e apresentações." },
  ] }),
  component: () => (
    <OfferPage step={1} minutes={10} alert="Sua compra principal foi concluída" badge="Oferta complementar opcional"
      titleA="Você aprendeu a teoria." titleHi="Conheça ferramentas práticas" titleB="para organizar suas análises."
      subtitle="Complemente o mapa visual com recursos de apoio para comparar regimes tributários e preparar apresentações profissionais."
      pains={["Organizar comparações entre regimes pode levar tempo", "Estruturar pareceres exige atenção aos detalhes", "Explicar cenários tributários pede clareza"]}
      items={["Planilha comparativa Simples × Presumido × Real (com campos para avaliação)", "15 modelos prontos de pareceres e apresentações", "Editável: adapte para cada cliente em minutos", "Material digital complementar"]}
      price="R$ 21,90" priceNote="Pagamento único • Acesso imediato" discount="OFERTA COMPLEMENTAR"
      offerId="cmuqduv" offerType="upsell" rejectUrl="https://mapafaciltributario.vercel.app/downsell"
      acceptLabel="SIM! QUERO O PACK PRO AGORA" rejectLabel="Não, obrigado. Quero continuar"
      footnote="Esta é uma compra adicional opcional. As comparações são instrumentos de apoio e não substituem análise tributária individualizada." />
  ),
});
