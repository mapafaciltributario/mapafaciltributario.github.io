// Single source of truth for offers, prices and client/server-safe validators.

export type PlanId = "basico" | "completo";

export interface Plan {
  id: PlanId;
  name: string;
  title: string;
  description: string;
  price: number;
  fromPrice: number;
}

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

export const GUARANTEE_DAYS = 7;

export function brl(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function savings(plan: Plan) {
  return Math.round((plan.fromPrice - plan.price) * 100) / 100;
}

/** Extra cost to upgrade from Básico to Completo. */
export function upgradeDiff() {
  return Math.round((PLANS.completo.price - PLANS.basico.price) * 100) / 100;
}

export const digits = (s: unknown) => String(s ?? "").replace(/\D/g, "");

export function validCPF(s: string) {
  if (!/^\d{11}$/.test(s) || /^(\d)\1+$/.test(s)) return false;
  for (let n = 9; n <= 10; n++) {
    let sum = 0;
    for (let i = 0; i < n; i++) sum += Number(s[i]) * (n + 1 - i);
    let d = (sum * 10) % 11;
    if (d === 10) d = 0;
    if (d !== Number(s[n])) return false;
  }
  return true;
}

export function validCNPJ(s: string) {
  if (!/^\d{14}$/.test(s) || /^(\d)\1+$/.test(s)) return false;
  for (const len of [12, 13]) {
    const w = len === 12 ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2] : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    let sum = 0;
    for (let i = 0; i < len; i++) sum += Number(s[i]) * (w[i] ?? 0);
    const d = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (d !== Number(s[len])) return false;
  }
  return true;
}

export const validDocument = (value: string) => {
  const d = digits(value);
  return validCPF(d) || validCNPJ(d);
};

export function validPhone(value: string) {
  const d = digits(value);
  return d.length === 10 || d.length === 11;
}

export function luhn(number: string) {
  let sum = 0;
  let alt = false;
  for (let i = number.length - 1; i >= 0; i--) {
    let n = Number(number[i]);
    if (alt) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    alt = !alt;
  }
  return sum % 10 === 0;
}

export function maskDocument(value: string) {
  const d = digits(value).slice(0, 14);
  if (d.length > 11)
    return d
      .replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{0,2}).*$/, "$1.$2.$3/$4-$5")
      .replace(/[-/.]$/, "");
  return d
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
}

export function maskPhone(value: string) {
  const d = digits(value).slice(0, 11);
  if (d.length <= 2) return d;
  const cut = d.length > 10 ? 7 : 6;
  const rest = d.length > cut ? `-${d.slice(cut)}` : "";
  return `(${d.slice(0, 2)}) ${d.slice(2, cut)}${rest}`;
}

export function maskCard(value: string) {
  return digits(value)
    .slice(0, 19)
    .replace(/(\d{4})(?=\d)/g, "$1 ");
}

export function maskExpiry(value: string) {
  const d = digits(value).slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
}
