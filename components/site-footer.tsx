import Link from "next/link";
import { profile } from "@/content/profile";
import { ui } from "@/content/ui";
import { getBuildDate } from "@/lib/build-date";
import { localePath } from "@/lib/i18n";
import { getLocale } from "@/lib/locale";
import { CookieSettingsButton } from "./cookie-banner";
import { Container } from "./ui/container";

const linkClass = "transition-colors hover:text-fg";

export async function SiteFooter() {
  const year = (await getBuildDate()).slice(0, 4);
  const locale = await getLocale();
  const t = ui[locale].footer;
  return (
    <footer className="border-t border-border">
      <Container className="flex flex-col gap-6 py-10 text-sm text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {profile.name}. {t.builtWith}
        </p>
        <nav aria-label={t.label}>
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
                {t.email}
              </a>
            </li>
            <li>
              <Link href={localePath(locale, "/privacy")} className={linkClass}>
                {t.privacy}
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
