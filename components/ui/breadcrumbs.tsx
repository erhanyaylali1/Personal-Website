import Link from "next/link";
import { ui } from "@/content/ui";
import { getLocale } from "@/lib/locale";
import { ChevronRight } from "./icons";

/** Visible breadcrumb trail; mirrors the BreadcrumbList in each page's JSON-LD. */
export async function Breadcrumbs({ trail, className = "" }: { trail: { name: string; href: string }[]; className?: string }) {
  const locale = await getLocale();
  return (
    <nav aria-label={ui[locale].breadcrumb.label} className={className}>
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-fg-muted">
        {trail.map((t, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={t.href} className="inline-flex items-center gap-1.5">
              {last ? (
                <span aria-current="page" className="text-fg">
                  {t.name}
                </span>
              ) : (
                <>
                  <Link href={t.href} className="transition-colors hover:text-fg">
                    {t.name}
                  </Link>
                  <ChevronRight aria-hidden="true" width={14} height={14} className="text-fg-subtle" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
