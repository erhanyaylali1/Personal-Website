import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Gallery } from "@/components/gallery";
import { ProjectCard } from "@/components/project-card";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ArrowUpRight } from "@/components/ui/icons";
import { profile, siteUrl } from "@/content/profile";
import { getProject, projects } from "@/content/projects";
import { JsonLd, projectSchema } from "@/lib/jsonld";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const title = `${project.title} — ${project.category}`;
  // Add as much of the stack as fits in the ~160 characters search engines show.
  let description = project.summary;
  for (let n = project.stack.length; n > 0; n--) {
    const candidate = `${project.summary} Built with ${project.stack.slice(0, n).join(", ")}.`;
    if (candidate.length <= 160) {
      description = candidate;
      break;
    }
  }
  return {
    title,
    description,
    keywords: [project.title, ...project.stack, profile.name],
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      url: `/projects/${project.slug}`,
      title: `${project.title} · ${profile.name}`,
      description,
      authors: [siteUrl],
    },
    twitter: { card: "summary_large_image", title: `${project.title} · ${profile.name}`, description },
  };
}

const linkLabels = { live: "Live site", source: "Source code", prototype: "Figma prototype" } as const;

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const idx = projects.indexOf(project);
  const next = projects[(idx + 1) % projects.length];
  const links = (Object.keys(linkLabels) as (keyof typeof linkLabels)[]).filter((k) => project.links[k]);

  return (
    <>
      <JsonLd data={projectSchema(project)} />

      <article>
        <header className="pt-10 pb-16 sm:pt-16 sm:pb-20">
          <Container>
            <Breadcrumbs
              className="rise"
              trail={[
                { name: "Home", href: "/" },
                { name: "Projects", href: "/projects" },
                { name: project.title, href: `/projects/${project.slug}` },
              ]}
            />

            <div className="mt-10 grid gap-10 md:grid-cols-12">
              <div className="md:col-span-8">
                <p className="rise font-mono text-xs tracking-[0.14em] text-fg-subtle uppercase" style={{ ["--i" as string]: 1 }}>
                  {project.category}
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
                          <span className="sr-only">(opens in a new tab)</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <dl className="rise grid content-start gap-6 border-t border-border pt-6 text-sm md:col-span-4 md:border-t-0 md:border-l md:pt-0 md:pl-8" style={{ ["--i" as string]: 3 }}>
                <div>
                  <dt className="font-mono text-xs tracking-[0.14em] text-fg-subtle uppercase">Stack</dt>
                  <dd className="mt-3 flex flex-wrap gap-1.5">
                    {project.stack.map((s) => (
                      <span key={s} className="rounded-md bg-surface px-2 py-1 font-mono text-xs text-fg-muted">{s}</span>
                    ))}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-xs tracking-[0.14em] text-fg-subtle uppercase">Highlights</dt>
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
              Overview
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
              Screens <span className="text-fg-muted tabular-nums">({project.images.length})</span>
            </h2>
            <Gallery images={project.images} title={project.title} portrait={!!project.mobileScreens} />
          </Container>
        </section>
      </article>

      <aside aria-labelledby="next-heading" className="border-t border-border py-20 sm:py-24">
        <Container>
          <h2 id="next-heading" className="mb-8 font-mono text-xs tracking-[0.16em] text-fg-subtle uppercase">Next project</h2>
          <div className="max-w-xl">
            <ProjectCard project={next} />
          </div>
        </Container>
      </aside>
    </>
  );
}
