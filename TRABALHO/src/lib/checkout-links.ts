/** Links oficiais informados pelo produtor. Sem gateway próprio. */
export const CHECKOUT_URLS = {
  basico: "https://pay.cakto.com.br/3eidzea_1292287",
  completo: "https://pay.cakto.com.br/3foqmgo",
} as const;
export type Plano = keyof typeof CHECKOUT_URLS;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/** Preserve UTMs/click IDs from the ad landing page on the external checkout. */
export function checkoutHref(plano: Plano, search?: string): string {
  const url = new URL(CHECKOUT_URLS[plano]);
  const params = new URLSearchParams(search ?? (typeof window !== "undefined" ? window.location.search : ""));
  for (const [key, value] of params) {
    if (/^utm_[a-z0-9_]+$/i.test(key) || ["fbclid", "gclid", "ttclid", "src", "sck"].includes(key.toLowerCase())) {
      url.searchParams.set(key, value);
    }
  }
  return url.toString();
}

/** Keep the HTML href valid even without JS; track InitiateCheckout and attach current UTMs on click. */
export function checkoutClick(event: { preventDefault(): void }, plano: Plano) {
  if (typeof window === "undefined") return;
  event.preventDefault();
  try {
    if (typeof window.fbq === "function") {
      window.fbq("track", "InitiateCheckout", {
        content_name: plano === "completo" ? "Plano Completo - Mapa Fácil" : "Plano Básico - Mapa Fácil",
        value: plano === "completo" ? 37.9 : 27.9,
        currency: "BRL",
      });
    }
  } catch {
    // Ignore pixel errors so navigation never blocks.
  }
  const target = checkoutHref(plano);
  window.setTimeout(() => {
    window.location.assign(target);
  }, 120);
}
