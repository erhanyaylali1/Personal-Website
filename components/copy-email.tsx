"use client";

import { useEffect, useState } from "react";
import { track } from "@/lib/track";
import { Check, Copy } from "./ui/icons";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  return (
    <button
      type="button"
      onClick={async () => {
        track("email_copy", { placement: "contact" });
        try {
          await navigator.clipboard.writeText(email);
          setCopied(true);
        } catch {
          window.location.href = `mailto:${email}`;
        }
      }}
      className="inline-flex h-11 items-center gap-2 rounded-full border border-border-strong px-5 text-sm font-medium text-fg transition-[background-color,border-color,transform] duration-200 hover:border-fg/40 hover:bg-surface active:scale-[0.98]"
    >
      {copied ? <Check className="text-accent" /> : <Copy />}
      <span>{copied ? "Copied" : "Copy email"}</span>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? "Email address copied to clipboard" : ""}
      </span>
    </button>
  );
}
