import Image from "next/image";
import me from "@/assets/me.jpg";
import { profile } from "@/content/profile";
import { ButtonLink } from "../ui/button";
import { Container } from "../ui/container";
import { ArrowRight, Download, MapPin } from "../ui/icons";

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="pt-12 pb-20 sm:pt-20 sm:pb-28">
      <Container className="grid items-center gap-12 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-7 lg:col-span-8">
          <p className="rise flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs tracking-[0.14em] text-fg-muted uppercase">
            <span>{profile.jobTitle}</span>
            <span aria-hidden="true" className="hidden h-3 w-px bg-border-strong sm:block" />
            <span className="inline-flex items-center gap-1.5">
              <MapPin width={13} height={13} />
              {profile.location.city}, {profile.location.country}
            </span>
          </p>

          <h1 id="hero-heading" className="mt-6 text-display font-semibold text-fg">
            {profile.name}
          </h1>

          <p className="rise mt-6 max-w-[34ch] text-[clamp(1.375rem,1.2rem+0.8vw,1.875rem)] leading-[1.3] tracking-[-0.015em] text-fg" style={{ ["--i" as string]: 2 }}>
            {profile.headline}
          </p>

          <p className="rise mt-5 max-w-[58ch] text-lede text-fg-muted" style={{ ["--i" as string]: 3 }}>
            {profile.summary}
          </p>

          <div className="rise mt-10 flex flex-wrap items-center gap-3" style={{ ["--i" as string]: 4 }}>
            <ButtonLink
              href="/#projects"
              icon={<ArrowRight className="transition-transform duration-200 group-hover:translate-x-0.5" />}
            >
              View projects
            </ButtonLink>
            <a
              href={profile.cv}
              download="Erhan_Yaylali_CV.pdf"
              className="group inline-flex h-11 items-center justify-center gap-2 rounded-full border border-border-strong px-5 text-sm font-medium text-fg transition-[background-color,border-color,transform] duration-200 hover:border-fg/40 hover:bg-surface active:scale-[0.98]"
            >
              Download CV
              <Download className="transition-transform duration-200 group-hover:translate-y-0.5" />
              <span className="sr-only">(PDF)</span>
            </a>
          </div>
        </div>

        {/* No entrance animation: the portrait is the LCP element and must paint as soon as it loads. */}
        <div className="md:col-span-5 lg:col-span-4">
          <figure className="relative isolate mx-auto w-full max-w-xs md:max-w-none">
            <Image
              src={me}
              alt={`Portrait of ${profile.name} smiling by the sea at sunset`}
              placeholder="blur"
              preload
              sizes="(min-width: 1024px) 360px, (min-width: 768px) 40vw, 320px"
              className="aspect-[4/5] w-full rounded-3xl object-cover object-top shadow-(--shadow-card)"
            />
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-fg/10 ring-inset" />
          </figure>
        </div>
      </Container>
    </section>
  );
}
