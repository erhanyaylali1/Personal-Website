import type { Project } from "@/content/projects";
import { ProjectCard } from "./project-card";
import { Reveal } from "./ui/reveal";

type Props = {
  projects: Project[];
  /** The grid starts above the fold: render the first card immediately and load its image eagerly (it's the LCP). */
  priority?: boolean;
  headingLevel?: 2 | 3;
};

/** Two-column grid; enough leading projects are featured (full width) that the rest pair up evenly. */
export function ProjectGrid({ projects, priority = false, headingLevel = 3 }: Props) {
  const featuredCount = projects.length % 2 === 0 ? 2 : 1;
  return (
    <ul className="grid gap-x-8 gap-y-16 sm:grid-cols-2">
      {projects.map((p, i) => {
        const featured = i < featuredCount;
        const card = (
          <ProjectCard
            project={p}
            featured={featured}
            reverse={featured && i % 2 === 1}
            eager={priority && i === 0}
            headingLevel={headingLevel}
          />
        );
        const span = featured ? "sm:col-span-2" : undefined;
        // No scroll-reveal for an above-the-fold LCP card: it would stay invisible until JS runs.
        if (priority && i === 0) return <li key={p.slug} className={span}>{card}</li>;
        return (
          <Reveal as="li" key={p.slug} delay={featured ? 0 : ((i - featuredCount) % 2) * 0.08} className={span}>
            {card}
          </Reveal>
        );
      })}
    </ul>
  );
}
