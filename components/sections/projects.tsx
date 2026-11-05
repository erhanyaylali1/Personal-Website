import { projects } from "@/content/projects";
import { ProjectGrid } from "../project-grid";
import { Section } from "../ui/section";

export const projectsIntro =
  "Production websites, real-time multiplayer games, community and publishing apps, and design work — each with a live demo, source code or prototype.";

export function Projects() {
  return (
    <Section
      id="projects"
      index="03"
      label="Selected work"
      title="Selected side projects."
      intro={projectsIntro}
      className="border-t border-border"
    >
      <ProjectGrid projects={projects} />
    </Section>
  );
}
