import { getProfile } from "@/content/profile";
import { getToolkit } from "@/content/toolkit";
import { ui } from "@/content/ui";
import { getLocale } from "@/lib/locale";
import { Reveal } from "../ui/reveal";
import { Section } from "../ui/section";

export async function About() {
  const locale = await getLocale();
  const profile = getProfile(locale);
  const toolkit = getToolkit(locale);
  const t = ui[locale].about;
  return (
    <Section id="about" index="01" label={t.label} title={t.title}>
      <div className="grid gap-12 md:grid-cols-12">
        <div className="space-y-6 md:col-span-7 md:col-start-4">
          {profile.about.map((p, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <p className={i === 0 ? "text-lede text-fg" : "text-[17px] leading-[1.75] text-fg-muted"}>{p}</p>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mt-16 grid gap-10 border-t border-border pt-10 md:grid-cols-12">
        <Reveal className="md:col-span-3">
          <h3 className="font-mono text-xs tracking-[0.16em] text-fg-subtle uppercase">{t.toolkit}</h3>
          <p className="mt-4 flex items-center gap-2 text-sm text-fg-muted">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
            {t.coreSkills}
          </p>
        </Reveal>

        <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 md:col-span-9">
          {toolkit.map((group, gi) => (
            <Reveal key={group.title} delay={(gi % 2) * 0.05}>
              <h4 className="text-sm font-semibold tracking-tight text-fg">{group.title}</h4>
              <ul className="mt-3 flex flex-wrap gap-1.5" aria-label={group.title}>
                {group.items.map((item) => (
                  <li
                    key={item.name}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm ${
                      item.core
                        ? "border-border-strong bg-bg font-medium text-fg"
                        : "border-transparent bg-surface text-fg-muted"
                    }`}
                  >
                    {item.core && <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />}
                    {item.name}
                    {item.detail && <span className="text-fg-subtle">· {item.detail}</span>}
                    {item.core && <span className="sr-only"> {t.coreSkill}</span>}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
          <Reveal className="border-t border-border pt-6 sm:col-span-2">
            <p className="text-sm text-fg-muted">{profile.strengths.join(" · ")}</p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
