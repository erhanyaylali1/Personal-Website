import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/profile";
import { getProjects } from "@/content/projects";
import { getPublishedPosts } from "@/lib/blog/queries";
import { getBuildDate } from "@/lib/build-date";
import { localePath, locales } from "@/lib/i18n";

/**
 * Next.js writes image URLs into <image:loc> without XML-escaping them, so a URL with a query string
 * (e.g. "?e=1&v=beta" on a hot-linked cover) produced invalid XML and Search Console rejected the whole file.
 */
const xmlEscape = (url: string) => url.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Every page in every language, each listing its translations (hreflang) so search engines pair them up. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = await getBuildDate();
  const abs = (path: string) => `${siteUrl}${path === "/" ? "" : path}`;

  const posts = await getPublishedPosts();
  const pages: { path: string; changeFrequency: "monthly" | "yearly"; priority: number; images?: string[]; lastModified?: string }[] = [
    { path: "/", changeFrequency: "monthly", priority: 1 },
    { path: "/projects", changeFrequency: "monthly", priority: 0.8 },
    ...getProjects("en").map((p) => ({
      path: `/projects/${p.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.7,
      images: p.images.slice(0, 4).map((i) => xmlEscape(`${siteUrl}${i.src.src}`)),
    })),
    { path: "/blog", changeFrequency: "monthly", priority: 0.8 },
    { path: "/privacy", changeFrequency: "yearly", priority: 0.2 },
    // Posts are served in both interfaces, like every other page.
    ...posts.map((p) => ({
      path: `/blog/${p.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.6,
      ...(p.publishedAt && { lastModified: p.publishedAt }),
      ...(p.coverImage?.startsWith("http") && { images: [xmlEscape(p.coverImage)] }),
    })),
  ];

  return pages.flatMap(({ path, ...rest }) =>
    locales.map((locale) => ({
      url: abs(localePath(locale, path)),
      lastModified,
      ...rest,
      alternates: { languages: Object.fromEntries(locales.map((l) => [l, abs(localePath(l, path))])) },
    })),
  );
}
