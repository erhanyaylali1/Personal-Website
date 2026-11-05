import type { Metadata } from "next";
import { ProjectGrid } from "@/components/project-grid";
import { projectsIntro } from "@/components/sections/projects";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { JsonLd, projectsPageSchema } from "@/lib/jsonld";

const description = `Projects by ${profile.name}: ${projects.map((p) => p.title).join(", ")}. ${projectsIntro}`;

export const metadata: Metadata = {
  title: "Projects",
  description: description.length > 160 ? `${description.slice(0, 157).trimEnd()}…` : description,
  alternates: { canonical: "/projects" },
  openGraph: { title: `Projects · ${profile.name}`, url: "/projects", description: projectsIntro },
};

export default function ProjectsPage() {
  return (
    <>
      <JsonLd data={projectsPageSchema(projects)} />
      <section aria-labelledby="projects-heading" className="pt-10 pb-24 sm:pt-16 sm:pb-32">
        <Container>
          <Breadcrumbs
            className="rise"
            trail={[
              { name: "Home", href: "/" },
              { name: "Projects", href: "/projects" },
            ]}
          />
          <header className="mt-10 mb-16 max-w-3xl sm:mb-20">
            <p className="rise font-mono text-xs tracking-[0.14em] text-fg-subtle uppercase" style={{ ["--i" as string]: 1 }}>
              {projects.length} projects
            </p>
            <h1 id="projects-heading" className="mt-4 text-display font-semibold text-fg">
              Projects
            </h1>
            <p className="rise mt-6 max-w-[58ch] text-lede text-fg-muted" style={{ ["--i" as string]: 3 }}>
              {projectsIntro}
            </p>
          </header>
          <ProjectGrid projects={projects} priority headingLevel={2} />
        </Container>
      </section>
    </>
  );
}
