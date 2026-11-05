import { NextResponse, type NextRequest } from "next/server";
import { projectSlugs } from "@/content/project-slugs";

const known = new Set<string>(projectSlugs);

/**
 * Unknown project slugs would otherwise render the not-found UI after streaming
 * has started, which returns HTTP 200 (a soft 404). Rewriting here, before
 * rendering, guarantees a real 404 status for crawlers.
 */
export function proxy(request: NextRequest) {
  const [, , slug, ...rest] = request.nextUrl.pathname.split("/");
  if (rest.length > 0 && rest[0] === "opengraph-image" && known.has(slug)) return NextResponse.next();
  if (!known.has(slug) || rest.length > 0) {
    return NextResponse.rewrite(new URL("/_not-found", request.url), { status: 404 });
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/projects/:path+",
};
