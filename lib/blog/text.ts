// Pure helpers shared by the editor (client) and the data layer (server).
import type { Locale } from "@/lib/i18n";

const TR_MAP: Record<string, string> = { ç: "c", ğ: "g", ı: "i", ö: "o", ş: "s", ü: "u", â: "a", î: "i", û: "u" };

export function slugify(input: string): string {
  return input
    .toLocaleLowerCase("tr-TR")
    .replace(/[çğıöşüâîû]/g, (ch) => TR_MAP[ch] ?? ch)
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export const SLUG_PATTERN = /^[a-z0-9-]{1,120}$/;

export function htmlToText(html: string): string {
  return html
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&[a-z#0-9]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function countWords(text: string): number {
  return text ? text.split(" ").filter(Boolean).length : 0;
}

/** ~200 words/minute, +10s per image or video, never below 1 minute. */
export function readingMinutes(html: string): number {
  const words = countWords(htmlToText(html));
  const media = (html.match(/<(img|video)\b/gi) ?? []).length;
  return Math.max(1, Math.round(words / 200 + (media * 10) / 60));
}

export function makeExcerpt(html: string, max = 170): string {
  const text = htmlToText(html);
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,.;:–-]+$/, "")}…`;
}

/** True when the post has something to show besides formatting. */
export const hasContent = (html: string) => Boolean(htmlToText(html)) || /<(img|iframe|video|audio)\b/i.test(html);

const dateFormats = {
  en: new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Istanbul" }),
  tr: new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Istanbul" }),
} satisfies Record<Locale, Intl.DateTimeFormat>;

export const formatPostDate = (iso: string, locale: Locale = "tr") => dateFormats[locale].format(new Date(iso));

const numberFormats = { en: new Intl.NumberFormat("en"), tr: new Intl.NumberFormat("tr-TR") } satisfies Record<Locale, Intl.NumberFormat>;
export const formatNumber = (n: number, locale: Locale = "tr") => numberFormats[locale].format(n);

/** Number of <img> tags with no or blank alt text (shared by editor and server). */
export function countImagesMissingAlt(html: string): number {
  return [...html.matchAll(/<img\b[^>]*>/g)].filter((m) => !/\salt="\s*[^"\s][^"]*"/.test(m[0])).length;
}
