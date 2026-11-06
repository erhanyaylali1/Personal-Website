// Single list of remote image sources that Next.js may optimize (resize, WebP/AVIF, cache).
// Used by next.config.ts (remotePatterns) and by components deciding whether to optimize a URL.
// Anything else (e.g. images hot-linked from other websites) is still shown, but served as-is.

type Pattern = { protocol: "https"; hostname: string; pathname: string };

export function optimizedImagePatterns(): Pattern[] {
  const supabase = process.env.SUPABASE_URL;
  if (!supabase) return [];
  return [{ protocol: "https", hostname: new URL(supabase).hostname, pathname: "/storage/v1/object/public/blog-media/image/**" }];
}

/** True when next/image may optimize this src (allowed remote host). Demo uploads (/api/media/…) are served as-is. */
export function canOptimizeImage(src: string): boolean {
  let url: URL;
  try {
    url = new URL(src);
  } catch {
    return false;
  }
  return optimizedImagePatterns().some(
    (p) => url.protocol === `${p.protocol}:` && url.hostname === p.hostname && url.pathname.startsWith(p.pathname.replace("/**", "/")),
  );
}
