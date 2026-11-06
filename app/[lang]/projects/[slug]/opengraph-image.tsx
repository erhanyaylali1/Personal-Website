import { profile } from "@/content/profile";
import { projectSlugs } from "@/content/project-slugs";
import { getProject } from "@/content/projects";
import { ui } from "@/content/ui";
import { defaultLocale, hasLocale } from "@/lib/i18n";
import { ogCard, ogSize } from "@/lib/og";

export const alt = profile.name;
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const locale = hasLocale(lang) ? lang : defaultLocale;
  const t = ui[locale];
  const project = getProject(slug, locale)!;
  return ogCard({
    eyebrow: t.projects.categories[project.category],
    title: project.title,
    subtitle: project.summary,
    footer: t.project.by(profile.name),
  });
}
