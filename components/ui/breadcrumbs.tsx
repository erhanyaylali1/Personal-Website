import Link from "next/link";
import { ChevronRight } from "./icons";

/** Visible breadcrumb trail; mirrors the BreadcrumbList in each page's JSON-LD. */
export function Breadcrumbs({ trail, className = "" }: { trail: { name: string; href: string }[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
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
