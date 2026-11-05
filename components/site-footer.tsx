import Link from "next/link";
import { profile } from "@/content/profile";
import { getBuildDate } from "@/lib/build-date";
import { CookieSettingsButton } from "./cookie-banner";
import { Container } from "./ui/container";

const linkClass = "transition-colors hover:text-fg";

export async function SiteFooter() {
  const year = (await getBuildDate()).slice(0, 4);
  return (
    <footer className="border-t border-border">
      <Container className="flex flex-col gap-6 py-10 text-sm text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {profile.name}. Built with Next.js.
        </p>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {profile.socials.map((s) => (
              <li key={s.href}>
                <a href={s.href} rel="me noopener" target="_blank" className={linkClass}>
                  {s.label}
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${profile.email}`} className={linkClass}>
                Email
              </a>
            </li>
            <li>
              <Link href="/privacy" className={linkClass}>
                Privacy
              </Link>
            </li>
            <li>
              <CookieSettingsButton className={`cursor-pointer ${linkClass}`} />
            </li>
          </ul>
        </nav>
      </Container>
    </footer>
  );
}
