import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Gallery } from "@/components/gallery";
import { ProjectCard } from "@/components/project-card";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ArrowUpRight } from "@/components/ui/icons";
import { getProfile, siteUrl } from "@/content/profile";
import { getProject, getProjects } from "@/content/projects";
import { projectSlugs } from "@/content/project-slugs";
import { ui } from "@/content/ui";
import { languageAlternates, localePath } from "@/lib/i18n";
import { JsonLd, projectSchema } from "@/lib/jsonld";
import { getLocale } from "@/lib/locale";

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const t = ui[locale];
  const profile = getProfile(locale);
  const project = getProject(slug, locale);
  if (!project) return {};
  const title = `${project.title} — ${t.projects.categories[project.category]}`;
  // Add as much of the stack as fits in the ~160 characters search engines show.
  let description = project.summary;
  for (let n = project.stack.length; n > 0; n--) {
    const candidate = `${project.summary} ${t.project.builtWith(project.stack.slice(0, n).join(", "))}`;
    if (candidate.length <= 160) {
      description = candidate;
      break;
    }
  }
  const alternates = languageAlternates(locale, `/projects/${project.slug}`);
  return {
    title,
    description,
    keywords: [project.title, ...project.stack, profile.name],
    alternates,
    openGraph: {
      type: "article",
      url: alternates.canonical,
      title: `${project.title} · ${profile.name}`,
      description,
      authors: [siteUrl],
    },
    twitter: { card: "summary_large_image", title: `${project.title} · ${profile.name}`, description },
  };
}

export default async function ProjectPage({ params }: PageProps<"/[lang]/projects/[slug]">) {
  const { slug } = await params;
  const locale = await getLocale();
  const t = ui[locale];
  const projects = getProjects(locale);
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();
  const linkLabels = t.project.links;

  const idx = projects.indexOf(project);
  const next = projects[(idx + 1) % projects.length];
  const links = (Object.keys(linkLabels) as (keyof typeof linkLabels)[]).filter((k) => project.links[k]);

  return (
    <>
      <JsonLd data={projectSchema(locale, project)} />

      <article>
        <header className="pt-10 pb-16 sm:pt-16 sm:pb-20">
          <Container>
            <Breadcrumbs
              className="rise"
              trail={[
                { name: t.breadcrumb.home, href: localePath(locale, "/") },
                { name: t.projectsPage.title, href: localePath(locale, "/projects") },
                { name: project.title, href: localePath(locale, `/projects/${project.slug}`) },
              ]}
            />

            <div className="mt-10 grid gap-10 md:grid-cols-12">
              <div className="md:col-span-8">
                <p className="rise font-mono text-xs tracking-[0.14em] text-fg-subtle uppercase" style={{ ["--i" as string]: 1 }}>
                  {t.projects.categories[project.category]}
                </p>
                <h1 className="mt-4 text-display font-semibold text-fg">
                  {project.title}
                </h1>
                <p className="rise mt-6 max-w-[52ch] text-lede text-fg-muted" style={{ ["--i" as string]: 3 }}>
                  {project.summary}
                </p>
                {links.length > 0 && (
                  <ul className="rise mt-8 flex flex-wrap gap-3" style={{ ["--i" as string]: 4 }}>
                    {links.map((k, i) => (
                      <li key={k}>
                        <a
                          href={project.links[k]}
                          target="_blank"
                          rel="noopener"
                          className={`group inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-medium transition-[background-color,border-color,transform] duration-200 active:scale-[0.98] ${
                            i === 0 ? "bg-fg text-bg hover:bg-fg/85" : "border border-border-strong text-fg hover:border-fg/40 hover:bg-surface"
                          }`}
                        >
                          {linkLabels[k]}
                          <ArrowUpRight className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          <span className="sr-only">{t.newTab}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <dl className="rise grid content-start gap-6 border-t border-border pt-6 text-sm md:col-span-4 md:border-t-0 md:border-l md:pt-0 md:pl-8" style={{ ["--i" as string]: 3 }}>
                <div>
                  <dt className="font-mono text-xs tracking-[0.14em] text-fg-subtle uppercase">{t.project.stack}</dt>
                  <dd className="mt-3 flex flex-wrap gap-1.5">
                    {project.stack.map((s) => (
                      <span key={s} className="rounded-md bg-surface px-2 py-1 font-mono text-xs text-fg-muted">{s}</span>
                    ))}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-xs tracking-[0.14em] text-fg-subtle uppercase">{t.project.highlights}</dt>
                  <dd className="mt-3">
                    <ul className="space-y-1.5 text-fg">
                      {project.features.map((f) => <li key={f}>{f}</li>)}
                    </ul>
                  </dd>
                </div>
              </dl>
            </div>
          </Container>
        </header>

        <section aria-labelledby="overview-heading" className="border-t border-border py-16 sm:py-20">
          <Container className="grid gap-8 md:grid-cols-12">
            <h2 id="overview-heading" className="font-mono text-xs tracking-[0.16em] text-fg-subtle uppercase md:col-span-3 md:pt-1.5">
              {t.project.overview}
            </h2>
            <div className="space-y-5 md:col-span-7">
              {project.description.map((p, i) => (
                <p key={i} className={i === 0 ? "text-lede text-fg" : "text-[17px] leading-[1.75] text-fg-muted"}>{p}</p>
              ))}
            </div>
          </Container>
        </section>

        <section aria-labelledby="screens-heading" className="border-t border-border py-16 sm:py-20">
          <Container>
            <h2 id="screens-heading" className="mb-10 font-mono text-xs tracking-[0.16em] text-fg-subtle uppercase">
              {t.project.screens} <span className="text-fg-muted tabular-nums">({project.images.length})</span>
            </h2>
            <Gallery images={project.images} title={project.title} portrait={!!project.mobileScreens} />
          </Container>
        </section>
      </article>

      <aside aria-labelledby="next-heading" className="border-t border-border py-20 sm:py-24">
        <Container>
          <h2 id="next-heading" className="mb-8 font-mono text-xs tracking-[0.16em] text-fg-subtle uppercase">{t.project.next}</h2>
          <div className="max-w-xl">
            <ProjectCard project={next} />
          </div>
        </Container>
      </aside>
    </>
  );
}
