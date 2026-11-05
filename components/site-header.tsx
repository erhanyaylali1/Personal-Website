"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { profile } from "@/content/profile";
import { ThemeToggle } from "./theme-toggle";
import { Container } from "./ui/container";
import { Close, Menu } from "./ui/icons";

const nav = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently crossing the upper third of the viewport.
  useEffect(() => {
    if (!onHome) return;
    const els = nav.map((n) => document.getElementById(n.id)).filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [onHome]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-40 isolate border-b transition-[background-color,border-color] duration-300 ${
        scrolled || open ? "border-border bg-bg/85 backdrop-blur-md" : "border-transparent bg-bg/0"
      }`}
    >
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          className="text-[15px] font-semibold tracking-tight text-fg"
          aria-label={`${profile.name}, home`}
          onClick={() => setOpen(false)}
        >
          {profile.name}
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {nav.map((n) => {
              const isActive = onHome && active === n.id;
              return (
                <li key={n.id}>
                  <Link
                    href={`/#${n.id}`}
                    aria-current={isActive ? "location" : undefined}
                    className={`relative rounded-full px-3.5 py-2 text-sm transition-colors duration-200 ${
                      isActive ? "text-fg" : "text-fg-muted hover:text-fg"
                    }`}
                  >
                    {n.label}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-3.5 -bottom-px h-px origin-left bg-accent transition-transform duration-300 ease-(--ease-out-quint) ${
                        isActive ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full text-fg-muted hover:bg-surface hover:text-fg md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <Close width={20} height={20} /> : <Menu width={20} height={20} />}
          </button>
        </div>
      </Container>

      <nav
        id="mobile-nav"
        aria-label="Primary mobile"
        hidden={!open}
        className="border-t border-border md:hidden"
      >
        <Container>
          <ul className="flex flex-col py-3">
            {nav.map((n) => (
              <li key={n.id}>
                <Link
                  href={`/#${n.id}`}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-lg font-medium text-fg"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </nav>
    </header>
  );
}
