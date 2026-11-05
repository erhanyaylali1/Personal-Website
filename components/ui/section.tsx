import type { ReactNode } from "react";
import { Container } from "./container";
import { Reveal } from "./reveal";

type Props = {
  id: string;
  index: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
  className?: string;
};

/** Consistent section shell: mono eyebrow, h2, optional intro, then content. */
export function Section({ id, index, label, title, intro, children, className = "" }: Props) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className={`py-24 sm:py-32 ${className}`}>
      <Container>
        <Reveal>
          <header className="mb-12 grid gap-4 sm:mb-16 md:grid-cols-12">
            <p className="font-mono text-xs tracking-[0.16em] text-fg-subtle uppercase md:col-span-3 md:pt-3">
              <span className="text-accent">{index}</span>
              <span aria-hidden="true"> — </span>
              {label}
            </p>
            <div className="md:col-span-9">
              <h2 id={headingId} className="text-h2 font-semibold text-fg">
                {title}
              </h2>
              {intro && <p className="mt-4 max-w-[62ch] text-lede text-fg-muted">{intro}</p>}
            </div>
          </header>
        </Reveal>
        {children}
      </Container>
    </section>
  );
}
