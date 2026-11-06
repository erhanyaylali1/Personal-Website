import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/profile";
import { getProjects } from "@/content/projects";
import { getBuildDate } from "@/lib/build-date";
import { localePath, locales } from "@/lib/i18n";

/** Every page in every language, each listing its translations (hreflang) so search engines pair them up. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = await getBuildDate();
  const abs = (path: string) => `${siteUrl}${path === "/" ? "" : path}`;

  const pages: { path: string; changeFrequency: "monthly" | "yearly"; priority: number; images?: string[] }[] = [
    { path: "/", changeFrequency: "monthly", priority: 1 },
    { path: "/projects", changeFrequency: "monthly", priority: 0.8 },
    ...getProjects("en").map((p) => ({
      path: `/projects/${p.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.7,
      images: p.images.slice(0, 4).map((i) => `${siteUrl}${i.src.src}`),
    })),
    { path: "/privacy", changeFrequency: "yearly", priority: 0.2 },
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
