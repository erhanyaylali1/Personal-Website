"use client";

import { useState } from "react";
import { ui } from "@/content/ui";
import { useLocale } from "../providers";
import { Check, Copy } from "../ui/icons";

// Share links are built from the post's canonical URL + title (passed from the server), so they work
// without JavaScript; only "copy link" needs it.

const ICONS = {
  linkedin: "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z",
  x: "M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.4l-5.8-7.58-6.63 7.58H.48l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93Zm-1.29 19.5h2.04L6.48 3.24H4.3l13.31 17.41Z",
  whatsapp: "M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35M12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.43 9.88-9.88 9.88M20.46 3.49A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.16-3.48-8.41Z",
};

export function ShareButtons({ url, title }: { url: string; title: string }) {
  const t = ui[useLocale()].blog;
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url);
  const links = [
    { key: "linkedin", label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
    { key: "x", label: "X", href: `https://x.com/intent/post?url=${u}&text=${encodeURIComponent(title)}` },
    { key: "whatsapp", label: "WhatsApp", href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}` },
  ] as const;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt(t.copyLink, url);
    }
  };

  const btn =
    "inline-flex size-10 items-center justify-center rounded-full text-fg-muted transition-[background-color,color] duration-200 hover:bg-surface hover:text-fg";

  return (
    <div className="flex items-center">
      {links.map((l) => (
        <a key={l.key} href={l.href} target="_blank" rel="noopener noreferrer" className={btn} aria-label={t.shareOn(l.label)} title={t.shareOn(l.label)}>
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="size-[18px]">
            <path d={ICONS[l.key]} />
          </svg>
        </a>
      ))}
      <button type="button" onClick={copy} className={`${btn} cursor-pointer`} aria-label={t.copyLink} title={t.copyLink}>
        {copied ? <Check className="text-accent" /> : <Copy />}
      </button>
      <span aria-live="polite" className="sr-only">
        {copied ? t.linkCopied : ""}
      </span>
    </div>
  );
}
