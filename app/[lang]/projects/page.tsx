import type { Metadata } from "next";
import { ProjectGrid } from "@/components/project-grid";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { getProfile } from "@/content/profile";
import { getProjects } from "@/content/projects";
import { ui } from "@/content/ui";
import { languageAlternates, localePath } from "@/lib/i18n";
import { JsonLd, projectsPageSchema } from "@/lib/jsonld";
import { getLocale } from "@/lib/locale";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = ui[locale];
  const name = getProfile(locale).name;
  const intro = t.projects.intro;
  const description = `${t.projectsPage.description(name, getProjects(locale).map((p) => p.title).join(", "))} ${intro}`;
  const alternates = languageAlternates(locale, "/projects");
  return {
    title: t.projectsPage.title,
    description: description.length > 160 ? `${description.slice(0, 157).trimEnd()}…` : description,
    alternates,
    openGraph: { title: `${t.projectsPage.title} · ${name}`, url: alternates.canonical, description: intro },
  };
}

export default async function ProjectsPage() {
  const locale = await getLocale();
  const t = ui[locale];
  const projects = getProjects(locale);
  return (
    <>
      <JsonLd data={projectsPageSchema(locale, projects)} />
      <section aria-labelledby="projects-heading" className="pt-10 pb-24 sm:pt-16 sm:pb-32">
        <Container>
          <Breadcrumbs
            className="rise"
            trail={[
              { name: t.breadcrumb.home, href: localePath(locale, "/") },
              { name: t.projectsPage.title, href: localePath(locale, "/projects") },
            ]}
          />
          <header className="mt-10 mb-16 max-w-3xl sm:mb-20">
            <p className="rise font-mono text-xs tracking-[0.14em] text-fg-subtle uppercase" style={{ ["--i" as string]: 1 }}>
              {t.projectsPage.count(projects.length)}
            </p>
            <h1 id="projects-heading" className="mt-4 text-display font-semibold text-fg">
              {t.projectsPage.title}
            </h1>
            <p className="rise mt-6 max-w-[58ch] text-lede text-fg-muted" style={{ ["--i" as string]: 3 }}>
              {t.projects.intro}
            </p>
          </header>
          <ProjectGrid projects={projects} priority headingLevel={2} />
        </Container>
      </section>
    </>
  );
}
