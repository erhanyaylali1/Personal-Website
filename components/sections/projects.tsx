import { getProjects } from "@/content/projects";
import { ui } from "@/content/ui";
import { getLocale } from "@/lib/locale";
import { ProjectGrid } from "../project-grid";
import { Section } from "../ui/section";

export async function Projects() {
  const locale = await getLocale();
  const t = ui[locale].projects;
  return (
    <Section id="projects" index="03" label={t.label} title={t.title} intro={t.intro} className="border-t border-border">
      <ProjectGrid projects={getProjects(locale)} />
    </Section>
  );
}
