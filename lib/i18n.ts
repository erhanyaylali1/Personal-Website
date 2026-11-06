/**
 * Locale primitives shared by server code, client components and proxy.ts — keep it dependency-free.
 *
 * URL scheme: English (the default) lives at the unprefixed URLs ("/", "/projects"), Turkish under "/tr".
 * Internally every page sits in app/[lang]; proxy.ts rewrites unprefixed URLs to /en/… and redirects /en/… back.
 */
export const locales = ["en", "tr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const hasLocale = (value: string | undefined): value is Locale => (locales as readonly string[]).includes(value ?? "");

/** One value per locale. */
export type Localized<T> = Record<Locale, T>;
/** Copy that is either the same in every language (tech names, brands) or translated. */
export type Text = string | Localized<string>;
export const tx = (value: Text, locale: Locale) => (typeof value === "string" ? value : value[locale]);

/** Open Graph locale codes. */
export const ogLocales: Localized<string> = { en: "en_US", tr: "tr_TR" };

/** Native names, shown in the language switcher. */
export const localeNames: Localized<string> = { en: "English", tr: "Türkçe" };

/** Public URL path for a locale-neutral path: ("tr", "/projects") → "/tr/projects", ("tr", "/#about") → "/tr#about". */
export function localePath(locale: Locale, path = "/"): string {
  if (locale === defaultLocale) return path;
  if (path === "/") return `/${locale}`;
  if (path.startsWith("/#")) return `/${locale}${path.slice(1)}`;
  return `/${locale}${path}`;
}

/** Locale-neutral path: "/tr/projects" → "/projects"; also strips the internal "/en" the server sees after a rewrite. */
export function stripLocale(pathname: string): string {
  const match = pathname.match(/^\/([a-z]{2})(?=\/|$)/);
  if (!match || !hasLocale(match[1])) return pathname || "/";
  return pathname.slice(match[0].length) || "/";
}

/** `alternates` metadata: canonical for this locale plus hreflang links to every language version. */
export function languageAlternates(locale: Locale, path: string) {
  return {
    canonical: localePath(locale, path),
    languages: {
      ...Object.fromEntries(locales.map((l) => [l, localePath(l, path)])),
      "x-default": localePath(defaultLocale, path),
    },
  };
}
