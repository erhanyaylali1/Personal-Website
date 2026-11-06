import { ui } from "@/content/ui";
import type { Locale } from "./i18n";

const monthFmt = {
  en: new Intl.DateTimeFormat("en", { month: "short", year: "numeric", timeZone: "UTC" }),
  tr: new Intl.DateTimeFormat("tr", { month: "short", year: "numeric", timeZone: "UTC" }),
} satisfies Record<Locale, Intl.DateTimeFormat>;

/** "2024-12" → "Dec 2024" (en) / "Ara 2024" (tr) */
export function formatMonth(ym: string, locale: Locale = "en") {
  const [y, m] = ym.split("-").map(Number);
  return monthFmt[locale].format(new Date(Date.UTC(y, (m ?? 1) - 1, 1)));
}

/** Human duration between two "YYYY-MM" values, inclusive of the start month. */
export function formatDuration(start: string, end: string | null, now: Date, locale: Locale = "en") {
  const [sy, sm] = start.split("-").map(Number);
  const [ey, em] = end ? end.split("-").map(Number) : [now.getUTCFullYear(), now.getUTCMonth() + 1];
  const months = Math.max(1, (ey - sy) * 12 + (em - sm));
  return ui[locale].duration(Math.floor(months / 12), months % 12);
}

/** "2026-11-06" → "6 November 2026" (en) / "6 Kasım 2026" (tr) */
export function formatDate(iso: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "tr" ? "tr" : "en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${iso}T00:00:00Z`),
  );
}
