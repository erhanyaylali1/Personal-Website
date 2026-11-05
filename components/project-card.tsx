import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/projects";
import { ArrowUpRight } from "./ui/icons";

type Props = {
  project: Project;
  eager?: boolean;
  /** Wide, side-by-side layout on large screens. */
  featured?: boolean;
  /** Featured only: put the image on the right. */
  reverse?: boolean;
  /** Use 2 when the card sits directly under the page h1. */
  headingLevel?: 2 | 3;
};

export function ProjectCard({ project, eager = false, featured = false, reverse = false, headingLevel = 3 }: Props) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const cover = project.images[0];
  const portrait = project.cover === "portrait";
  const shown = project.stack.slice(0, 4);
  const rest = project.stack.length - shown.length;

  return (
    <article
      className={`group relative isolate flex h-full flex-col ${featured ? "lg:grid lg:grid-cols-12 lg:items-center lg:gap-12" : ""}`}
    >
      <div className={`relative overflow-hidden rounded-2xl ${featured ? `aspect-[4/3] lg:col-span-7 lg:aspect-[16/10] ${reverse ? "lg:order-2" : ""}` : "aspect-[4/3]"} border border-border bg-surface transition-[box-shadow,border-color] duration-300 group-hover:border-border-strong group-hover:shadow-(--shadow-lift)`}>
        <Image
          src={cover.src}
          alt=""
          placeholder="blur"
          // eager: the card is the LCP above the fold — preload it from <head> with high priority.
          {...(eager ? { preload: true } : { loading: "lazy" as const })}
          sizes={featured ? "(min-width: 1024px) 640px, 100vw" : "(min-width: 1024px) 540px, (min-width: 640px) 50vw, 100vw"}
          className={
            portrait
              ? "absolute inset-x-0 top-8 mx-auto h-[calc(100%+2rem)] w-auto max-w-[70%] rounded-t-xl object-cover object-top shadow-(--shadow-card) transition-transform duration-500 ease-(--ease-out-quint) group-hover:-translate-y-2"
              : "absolute inset-0 size-full object-cover object-left-top transition-transform duration-500 ease-(--ease-out-quint) group-hover:scale-[1.025]"
          }
        />
      </div>

      <div className={`mt-5 flex flex-1 flex-col ${featured ? "lg:col-span-5 lg:mt-0 lg:flex-none" : ""}`}>
        <p className="font-mono text-xs tracking-[0.12em] text-fg-subtle uppercase">
          {featured && <span className="text-accent">Featured · </span>}
          {project.category}
        </p>
        <Heading className={`mt-2 font-semibold tracking-tight text-fg ${featured ? "text-xl lg:text-3xl" : "text-xl"}`}>
          <Link
            href={`/projects/${project.slug}`}
            className="after:absolute after:inset-0 after:z-10 after:rounded-2xl focus-visible:outline-none"
          >
            {project.title}
            {/* Inline so the arrow always follows the last word, even when the title wraps. */}
            <ArrowUpRight
              width={18}
              height={18}
              className="ml-2 inline-block align-[-0.1em] text-fg-subtle transition-[transform,color] duration-300 ease-(--ease-out-quint) group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
            />
          </Link>
        </Heading>
        <p className={`mt-2 max-w-[52ch] leading-relaxed text-fg-muted ${featured ? "text-[15px] lg:mt-4 lg:text-[17px]" : "text-[15px]"}`}>{project.summary}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
          {shown.map((s) => (
            <li key={s} className="rounded-md bg-surface px-2 py-1 font-mono text-xs text-fg-muted">
              {s}
            </li>
          ))}
          {rest > 0 && (
            <li className="rounded-md px-1 py-1 font-mono text-xs text-fg-subtle">
              +{rest}
              <span className="sr-only"> more</span>
            </li>
          )}
        </ul>
      </div>
      {/* Keyboard focus ring for the stretched link, drawn on the whole card. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-2 rounded-3xl ring-2 ring-transparent group-has-[a:focus-visible]:ring-ring"
      />
    </article>
  );
}
