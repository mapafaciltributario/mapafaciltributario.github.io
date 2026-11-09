// Recovered from the published site bundle (mapafaciltributario.vercel.app).
// Offers, prices, bonus values and validators live only here.

export type PlanId = "basico" | "completo";

export type Plan = {
  id: PlanId;
  name: string;
  title: string;
  description: string;
  price: number;
  fromPrice: number;
};

export const GUARANTEE_DAYS = 7;

export const PLANS: Record<PlanId, Plan> = {
  basico: {
    id: "basico",
    name: "Plano Básico",
    title: "Mapa Fácil da Reforma Tributária",
    description: "Material principal em PDF",
    price: 27.9,
    fromPrice: 57.9,
  },
  completo: {
    id: "completo",
    name: "Plano Completo",
    title: "Mapa Fácil + 8 bônus",
    description: "Material principal + 8 bônus (planilhas, tabelas e guias)",
    price: 37.9,
    fromPrice: 77.9,
  },
};

export const BONUSES: { title: string; text: string; value: number }[] = [
  { title: "Glossário Visual da Reforma", text: "Os principais termos sem juridiquês, para consulta rápida.", value: 27 },
  { title: "Checklist “O Que Entender Primeiro”", text: "Saiba quais temas priorizar antes de se aprofundar.", value: 19.9 },
  { title: "Linha do Tempo Visual", text: "As fases da transição da Reforma em um único material.", value: 24.9 },
  { title: "Quadro Antes x Depois", text: "Comparativo entre o sistema atual e o novo modelo.", value: 24.9 },
  { title: "Tabela de CST, cClassTrib, cIndOp e cCredPres", text: "Consulta rápida dos novos códigos.", value: 37 },
  { title: "Planilha Calculadora de IBS/CBS", text: "Calcule e confira o destaque na nota. Excel e Google Planilhas.", value: 47 },
  { title: "Gabarito de preenchimento na Nota Fiscal", text: "O que preencher nos campos de IBS/CBS, etapa por etapa.", value: 37 },
  { title: "Guia de emissão de NF-e, NFC-e, CT-e e NFS-e", text: "Como emitir cada documento com as novas regras.", value: 47 },
];

export function bonusTotal() {
  return Math.round(BONUSES.reduce((s, b) => s + b.value, 0) * 100) / 100;
}

export function brl(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function savings(plan: Plan) {
  return Math.round((plan.fromPrice - plan.price) * 100) / 100;
}

export function upgradeDiff() {
  return Math.round((PLANS.completo.price - PLANS.basico.price) * 100) / 100;
}

export const digits = (v: unknown) => String(v ?? "").replace(/\D/g, "");

function validCpf(d: string) {
  if (!/^\d{11}$/.test(d) || /^(\d)\1+$/.test(d)) return false;
  for (let t = 9; t <= 10; t++) {
    let n = 0;
    for (let r = 0; r < t; r++) n += Number(d[r]) * (t + 1 - r);
    let r = (n * 10) % 11;
    if (r === 10) r = 0;
    if (r !== Number(d[t])) return false;
  }
  return true;
}

function validCnpj(d: string) {
  if (!/^\d{14}$/.test(d) || /^(\d)\1+$/.test(d)) return false;
  for (const t of [12, 13]) {
    const w = t === 12 ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2] : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    let s = 0;
    for (let i = 0; i < t; i++) s += Number(d[i]) * (w[i] ?? 0);
    if ((s % 11 < 2 ? 0 : 11 - (s % 11)) !== Number(d[t])) return false;
  }
  return true;
}

export const validDocument = (v: string) => {
  const d = digits(v);
  return validCpf(d) || validCnpj(d);
};

export function validPhone(v: string) {
  const d = digits(v);
  return d.length === 10 || d.length === 11;
}

export function luhn(num: string) {
  let sum = 0;
  let dbl = false;
  for (let i = num.length - 1; i >= 0; i--) {
    let n = Number(num[i]);
    if (dbl) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    dbl = !dbl;
  }
  return sum % 10 === 0;
}

export function maskDocument(v: string) {
  const d = digits(v).slice(0, 14);
  return d.length > 11
    ? d.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{0,2}).*$/, "$1.$2.$3/$4-$5").replace(/[-/.]$/, "")
    : d
        .replace(/^(\d{3})(\d)/, "$1.$2")
        .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
}

export function maskPhone(v: string) {
  const d = digits(v).slice(0, 11);
  if (d.length <= 2) return d;
  const cut = d.length > 10 ? 7 : 6;
  const tail = d.length > cut ? `-${d.slice(cut)}` : "";
  return `(${d.slice(0, 2)}) ${d.slice(2, cut)}${tail}`;
}

export function maskCard(v: string) {
  return digits(v).slice(0, 19).replace(/(\d{4})(?=\d)/g, "$1 ");
}

export function maskExpiry(v: string) {
  const d = digits(v).slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
}
