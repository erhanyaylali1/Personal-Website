"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { OPEN_SETTINGS_EVENT, readConsent, subscribeConsent, writeConsent, type Consent } from "@/lib/consent";

const SERVER = "server" as const;

export function CookieBanner() {
  // "server" on the server and during hydration, so nothing renders until the stored choice is known.
  const consent = useSyncExternalStore<Consent | null | typeof SERVER>(subscribeConsent, readConsent, () => SERVER);
  const [reopened, setReopened] = useState(false);

  useEffect(() => {
    const open = () => setReopened(true);
    window.addEventListener(OPEN_SETTINGS_EVENT, open);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, open);
  }, []);

  if (consent === SERVER || (consent !== null && !reopened)) return null;

  const choose = (value: Consent) => {
    writeConsent(value);
    setReopened(false);
  };

  const button =
    "inline-flex h-10 flex-1 items-center justify-center rounded-full border border-border-strong px-5 text-sm font-medium text-fg " +
    "transition-[background-color,border-color,transform] duration-200 hover:border-fg/40 hover:bg-surface active:scale-[0.98]";

  return (
    <section
      aria-labelledby="cookie-banner-title"
      className="rise fixed inset-x-3 bottom-3 z-50 isolate rounded-2xl border border-border bg-bg p-5 shadow-(--shadow-lift) sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-[24rem]"
    >
      <h2 id="cookie-banner-title" className="text-sm font-semibold text-fg">
        Cookies
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-fg-muted">
        With your permission I use Google Analytics cookies to see which pages people visit. Nothing is set until you
        accept.{" "}
        <Link href="/privacy" className="text-fg underline decoration-border-strong underline-offset-2 hover:decoration-fg">
          Privacy policy
        </Link>
        {consent && <span className="mt-2 block text-fg-subtle">Current choice: {consent === "granted" ? "accepted" : "declined"}.</span>}
      </p>
      {/* Equal size and styling: declining must be as easy as accepting. */}
      <div className="mt-4 flex gap-2">
        <button type="button" className={button} onClick={() => choose("denied")}>
          Decline
        </button>
        <button type="button" className={button} onClick={() => choose("granted")}>
          Accept
        </button>
      </div>
    </section>
  );
}

export function CookieSettingsButton({ className = "" }: { className?: string }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT))}>
      Cookie settings
    </button>
  );
}
