import { NextResponse, type NextRequest } from "next/server";
import { projectSlugs } from "@/content/project-slugs";
import { SESSION_COOKIE, readSessionToken } from "@/lib/auth/session";
import { SLUG_PATTERN } from "@/lib/blog/text";
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
  // Posts live in the database; the page itself 404s for unknown slugs.
  if (section === "blog") return !ogImage && (slug === undefined || SLUG_PATTERN.test(slug));
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
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Admin panel: not localized. Optimistic gate — visitors without a valid cookie are bounced to the
  // sign-in page before anything renders; requireAdmin() in every page and action is the real check.
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    if (pathname !== "/admin" && (await readSessionToken(request.cookies.get(SESSION_COOKIE)?.value)) === null) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }
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
  // Everything except Next.js internals, route handlers under /api, files with an extension
  // (sitemap.xml, robots.txt, llms.txt, the CV PDF, …) and the root-level generated icons.
  matcher: ["/((?!_next/|api/|icon(?:/|$)|apple-icon(?:/|$)|.*\\.[^/]+$).*)"],
};
