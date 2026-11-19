import { createFileRoute } from "@tanstack/react-router";
import { OfferPage } from "@/components/OfferPage";

export const Route = createFileRoute("/downsell")({
  head: () => ({ meta: [
    { title: "ÚLTIMA CHANCE — Pack Pro por R$ 14,90" },
    { name: "description", content: "Condição final e definitiva: o mesmo Pack Pro com desconto máximo." },
    { property: "og:title", content: "ÚLTIMA CHANCE — Pack Pro por R$ 14,90" },
    { property: "og:description", content: "O mesmo Pack Pro, com desconto máximo, só nesta página." },
  ] }),
  component: () => (
    <OfferPage step={2} minutes={5} alert="Condição alternativa para o Pack Pro" badge="Oferta alternativa"
      titleA="ESPERA!" titleHi="De R$ 21,90 por R$ 14,90." titleB="Uma condição especial para você."
      subtitle="Se o valor anterior não era ideal, você pode adicionar o mesmo Pack Pro à sua compra por R$ 14,90. A decisão é sua."
      pains={["Você pode seguir apenas com o produto principal", "Esta oferta reduz o preço em R$ 7,00", "O conteúdo é o mesmo da oferta anterior"]}
      items={["Planilha comparativa dos 3 regimes tributários", "15 modelos prontos de pareceres e apresentações", "Exatamente o mesmo conteúdo — só mais barato", "Acesso imediato junto com sua compra"]}
      oldPrice="R$ 21,90" price="R$ 14,90" priceNote="Você economiza R$ 7,00 • Pagamento único" discount="CONDIÇÃO ALTERNATIVA"
      offerId="342v6ec" offerType="downsell" rejectUrl="members_area"
      acceptLabel="SIM! QUERO POR SÓ R$ 14,90" rejectLabel="Não, obrigado. Finalizar compra"
      footnote="Ao recusar, você segue para a área de membros e essa condição é encerrada. Sua compra principal permanece válida." />
  ),
});
