import { profile } from "@/content/profile";
import { CopyEmail } from "../copy-email";
import { Container } from "../ui/container";
import { ArrowUpRight } from "../ui/icons";
import { Reveal } from "../ui/reveal";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="border-t border-border py-24 sm:py-36">
      <Container>
        <Reveal>
          <p className="font-mono text-xs tracking-[0.16em] text-fg-subtle uppercase">
            <span className="text-accent">04</span>
            <span aria-hidden="true"> — </span>Contact
          </p>
          <h2 id="contact-heading" className="mt-6 max-w-[18ch] text-display font-semibold text-fg">
            Let&apos;s build something people enjoy using.
          </h2>
          <p className="mt-6 max-w-[52ch] text-lede text-fg-muted">
            Open to conversations about frontend, full-stack and cloud work. The quickest way to reach me is email.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <address className="mt-12 not-italic">
            <a
              href={`mailto:${profile.email}`}
              className="group inline-flex items-center gap-3 text-[clamp(1.25rem,0.9rem+1.8vw,2.25rem)] font-medium tracking-tight text-fg underline decoration-border-strong decoration-1 underline-offset-[0.3em] transition-[text-decoration-color,color] duration-200 hover:decoration-accent"
            >
              {profile.email}
              <ArrowUpRight
                width={28}
                height={28}
                className="shrink-0 text-fg-subtle transition-[transform,color] duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent"
              />
            </a>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <CopyEmail email={profile.email} />
              {profile.socials.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="me noopener"
                  className="group inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-medium text-fg-muted transition-[background-color,color] duration-200 hover:bg-surface hover:text-fg"
                >
                  {s.label}
                  <ArrowUpRight className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              ))}
            </div>
          </address>
        </Reveal>
      </Container>
    </section>
  );
}
