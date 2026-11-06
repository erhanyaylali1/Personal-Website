import { getEducation } from "@/content/education";
import { getExperience } from "@/content/experience";
import { ui } from "@/content/ui";
import { getBuildDate } from "@/lib/build-date";
import { formatDuration, formatMonth } from "@/lib/format";
import { getLocale } from "@/lib/locale";
import { Reveal } from "../ui/reveal";
import { Section } from "../ui/section";

export async function Experience() {
  const now = new Date(await getBuildDate());
  const locale = await getLocale();
  const experience = getExperience(locale);
  const education = getEducation(locale);
  const t = ui[locale].experience;
  return (
    <Section
      id="experience"
      index="02"
      label={t.label}
      title={t.title}
      intro={t.intro}
      className="border-t border-border"
    >
      <ol className="border-t border-border">
        {experience.map((job, i) => {
          const current = job.end === null;
          return (
            <Reveal as="li" key={`${job.company}-${job.start}`} delay={Math.min(i, 4) * 0.04} className="border-b border-border">
              <article className="grid gap-x-8 gap-y-3 py-8 md:grid-cols-12 md:py-10">
                <div className="md:col-span-3">
                  <p className="font-mono text-[13px] text-fg-muted tabular-nums">
                    <time dateTime={job.start}>{formatMonth(job.start, locale)}</time>
                    <span aria-hidden="true"> – </span>
                    <span className="sr-only">{t.to}</span>
                    {current ? t.present : <time dateTime={job.end!}>{formatMonth(job.end!, locale)}</time>}
                  </p>
                  <p className="mt-1 font-mono text-xs text-fg-subtle">{formatDuration(job.start, job.end, now, locale)}</p>
                </div>

                <div className="md:col-span-9">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <h3 className="text-xl font-semibold tracking-tight text-fg">
                      {job.role}
                      <span className="text-fg-subtle"> · </span>
                      <span className="text-fg">{job.company}</span>
                    </h3>
                    {current && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-fg">
                        <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
                        {t.current}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-fg-subtle">{job.location}</p>

                  {job.highlights && (
                    <ul className="mt-5 max-w-[68ch] space-y-2.5">
                      {job.highlights.map((h) => (
                        <li key={h} className="relative pl-5 text-[16px] leading-[1.7] text-fg-muted">
                          <span aria-hidden="true" className="absolute top-[0.8em] left-0 h-px w-2.5 bg-border-strong" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}

                  {job.stack && (
                    <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={t.technologies(job.company)}>
                      {job.stack.map((s) => (
                        <li key={s} className="rounded-md bg-surface px-2 py-1 font-mono text-xs text-fg-muted">
                          {s}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            </Reveal>
          );
        })}
      </ol>

      <div id="education" className="mt-24 scroll-mt-24">
        <Reveal>
          <h3 className="font-mono text-xs tracking-[0.16em] text-fg-subtle uppercase">{t.education}</h3>
        </Reveal>
        <ol className="mt-6 border-t border-border">
          {education.map((ed, i) => (
            <Reveal as="li" key={ed.institution} delay={i * 0.05} className="border-b border-border">
              <article className="grid gap-x-8 gap-y-2 py-7 md:grid-cols-12">
                <p className="font-mono text-[13px] text-fg-muted tabular-nums md:col-span-3">
                  <time dateTime={ed.start}>{ed.start}</time>
                  <span aria-hidden="true"> – </span>
                  <span className="sr-only">{t.to}</span>
                  <time dateTime={ed.end}>{ed.end}</time>
                </p>
                <div className="md:col-span-9">
                  <h4 className="text-lg font-semibold tracking-tight text-fg">{ed.institution}</h4>
                  <p className="mt-1 text-fg-muted">
                    {ed.degree}
                    {ed.field && `, ${ed.field}`}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
