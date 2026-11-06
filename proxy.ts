import { NextResponse, type NextRequest } from "next/server";
import { projectSlugs } from "@/content/project-slugs";
import { defaultLocale, hasLocale } from "@/lib/i18n";

const known = new Set<string>(projectSlugs);

/** Every page (and its generated OG image) that exists, as a locale-neutral path. */
function isKnownPage(path: string) {
  const parts = path.split("/").filter(Boolean);
  // Only the home page and project pages have their own OG image.
  const ogImage = parts.at(-1) === "opengraph-image";
  if (ogImage) parts.pop();
  const [section, slug, ...tail] = parts;
  if (tail.length > 0) return false;
  if (section === undefined) return true;
  if (section === "projects") return slug === undefined ? !ogImage : known.has(slug);
  return section === "privacy" && slug === undefined && !ogImage;
}

/**
 * Locale routing. Pages live in app/[lang], but English keeps its original, unprefixed URLs:
 * - "/tr/…"  → served as is (Turkish).
 * - "/en/…"  → 308 to the unprefixed URL, so each English page has exactly one address.
 * - "/…"     → rewritten internally to "/en/…".
 *
 * Unknown URLs (including unknown project slugs) are rewritten to the localized 404 page with status 404.
 * Calling notFound() while rendering would happen after streaming has started and return HTTP 200
 * (a soft 404); deciding here, before rendering, guarantees a real 404 for crawlers.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const [, first = ""] = pathname.split("/");
  const prefixed = hasLocale(first);
  const locale = prefixed ? first : defaultLocale;
  const rest = prefixed ? pathname.slice(first.length + 1) || "/" : pathname;

  // Generated OG images keep their internal /en/… URL (that's what Next.js puts in og:image).
  if (prefixed && locale === defaultLocale && !rest.endsWith("/opengraph-image")) {
    const url = request.nextUrl.clone();
    url.pathname = rest;
    return NextResponse.redirect(url, 308);
  }

  if (!isKnownPage(rest)) {
    return NextResponse.rewrite(new URL(`/${locale}/404`, request.url), { status: 404 });
  }

  if (prefixed) return NextResponse.next();
  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Everything except Next.js internals, files with an extension (sitemap.xml, robots.txt, llms.txt,
  // the CV PDF, …) and the root-level generated icons.
  matcher: ["/((?!_next/|icon(?:/|$)|apple-icon(?:/|$)|.*\\.[^/]+$).*)"],
};
