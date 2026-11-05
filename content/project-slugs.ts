/** Kept dependency-free so it can be imported by proxy.ts without pulling in images. */
export const projectSlugs = [
  "reyhan-eren",
  "erhan-oyunlari",
  "spordas",
  "rich-blog-post",
  "civil-defense-ukraine",
  "e-wallet",
] as const;

export type ProjectSlug = (typeof projectSlugs)[number];
