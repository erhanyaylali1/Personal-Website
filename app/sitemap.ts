import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/profile";
import { projects } from "@/content/projects";
import { getBuildDate } from "@/lib/build-date";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = await getBuildDate();
  return [
    { url: siteUrl, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/projects`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    ...projects.map((p) => ({
      url: `${siteUrl}/projects/${p.slug}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.7,
      images: p.images.slice(0, 4).map((i) => `${siteUrl}${i.src.src}`),
    })),
    { url: `${siteUrl}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.2 },
  ];
}
