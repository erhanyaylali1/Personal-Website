import { profile } from "@/content/profile";
import { getProject, projects } from "@/content/projects";
import { ogCard, ogSize } from "@/lib/og";

export const alt = "Project by Erhan Yaylalı";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug)!;
  return ogCard({
    eyebrow: project.category,
    title: project.title,
    subtitle: project.summary,
    footer: `A project by ${profile.name}`,
  });
}
