import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { checkoutHref } from "@/lib/checkout-links";

/** Compatibility redirect for old ads or bookmarks pointing to /checkout. */
export const Route = createFileRoute("/checkout")({
  component: LegacyCheckoutRedirect,
});
function LegacyCheckoutRedirect() {
  useEffect(() => {
    const plano = new URLSearchParams(window.location.search).get("plano") === "basico" ? "basico" : "completo";
    window.location.replace(checkoutHref(plano));
  }, []);
  return <main className="min-h-screen grid place-items-center p-8 text-center"><p>Redirecionando para o checkout seguro da Cakto…</p></main>;
}
