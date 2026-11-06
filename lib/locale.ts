import { lang } from "next/root-params";
import { defaultLocale, hasLocale, type Locale } from "./i18n";

/** Current locale from the app/[lang] root segment. Server Components only. */
export async function getLocale(): Promise<Locale> {
  const value = await lang();
  return hasLocale(value) ? value : defaultLocale;
}
