/**
 * Captures campaign attribution without reading payment or personal data.
 * The UTMify script remains the source of tracking cookies/storage; this helper
 * forwards the campaign fields supported by Cakto's payment metadata API.
 */
export const TRACKING_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "sck",
] as const;

export type TrackingMetadata = Partial<Record<(typeof TRACKING_KEYS)[number], string>>;

export function getTrackingMetadata(): TrackingMetadata {
  if (typeof window === "undefined") return {};
  const result: TrackingMetadata = {};
  const params = new URLSearchParams(window.location.search);
  for (const key of TRACKING_KEYS) {
    // Prefer parameters on the current URL; fall back to those stored by the
    // landing-page tracking script, which survive internal route navigation.
    let value = params.get(key);
    if (!value) {
      try {
        value = window.localStorage.getItem(key) || window.sessionStorage.getItem(key);
      } catch {
        // Storage can be disabled by browser privacy settings.
      }
    }
    if (value && value.trim()) result[key] = value.trim().slice(0, 255);
  }
  return result;
}
