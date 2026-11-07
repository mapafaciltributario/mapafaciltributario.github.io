// Server-only helpers for the Cakto payments API.
import type { PlanId } from "./plans";

const API = "https://api.cakto.com.br/public_api";

let cache: { value: string; until: number } | null = null;

async function token() {
  if (cache && cache.until > Date.now() + 60_000) return cache.value;
  const id = process.env["CAKTO_CLIENT_ID"];
  const secret = process.env["CAKTO_CLIENT_SECRET"];
  if (!id || !secret) throw new Error("Credenciais Cakto ausentes no servidor.");
  const response = await fetch(`${API}/token/`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ client_id: id, client_secret: secret }),
  });
  if (!response.ok) throw new Error(`Autenticação Cakto indisponível (${response.status}).`);
  const data = (await response.json()) as { access_token: string; expires_in?: number };
  cache = {
    value: data.access_token,
    until: Date.now() + (Number(data.expires_in) || 1800) * 1000,
  };
  return cache.value;
}

export async function cakto(path: string, opts: RequestInit = {}) {
  const access = await token();
  const r = await fetch(`${API}${path}`, {
    ...opts,
    headers: { Authorization: `Bearer ${access}`, ...(opts.headers ?? {}) },
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const body = (await r.json().catch(() => ({}))) as any;
  return { ok: r.ok, status: r.status, body };
}

export function offerFor(plan: PlanId) {
  return plan === "basico"
    ? process.env["CAKTO_OFFER_ID_BASICO"]
    : process.env["CAKTO_OFFER_ID_COMPLETO"];
}
