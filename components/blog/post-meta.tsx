import { ui } from "@/content/ui";
import { formatPostDate } from "@/lib/blog/text";
import type { Locale } from "@/lib/i18n";

export function PostMeta({
  publishedAt,
  readingMinutes,
  locale,
  children,
}: {
  publishedAt: string | null;
  readingMinutes: number;
  locale: Locale;
  children?: React.ReactNode;
}) {
  return (
    <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-xs tracking-[0.04em] text-fg-subtle">
      {publishedAt && <time dateTime={publishedAt}>{formatPostDate(publishedAt, locale)}</time>}
      {publishedAt && <span aria-hidden="true">·</span>}
      <span>{ui[locale].blog.minRead(readingMinutes)}</span>
      {children}
    </p>
  );
}
