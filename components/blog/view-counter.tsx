"use client";

import { useEffect, useState } from "react";
import { ui } from "@/content/ui";
import { formatNumber } from "@/lib/blog/text";
import { getViews, recordView } from "@/lib/blog/view-actions";
import { useLocale } from "../providers";

// Counts once per post per browser session (refreshes don't inflate it), and only after the page
// actually renders — link prefetches never count.
export function ViewCounter({ slug }: { slug: string }) {
  const locale = useLocale();
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    const key = `viewed:${slug}`;
    const counted = sessionStorage.getItem(key) !== null;
    sessionStorage.setItem(key, "1"); // synchronously, so React's dev double-effect can't count twice
    let cancelled = false;
    (counted ? getViews(slug) : recordView(slug)).then(
      (n) => !cancelled && setViews(n),
      () => {},
    );
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (views === null) return null;
  return (
    <>
      <span aria-hidden="true">·</span>
      <span className="tabular-nums">{ui[locale].blog.views(formatNumber(views, locale))}</span>
    </>
  );
}
