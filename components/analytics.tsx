"use client";

import { GoogleTagManager } from "@next/third-parties/google";
import { useEffect, useSyncExternalStore } from "react";
import { readConsent, subscribeConsent } from "@/lib/consent";
import { trackLinkClick } from "@/lib/track";

/** Loads Google Tag Manager only after the visitor has granted analytics consent, and tracks key link clicks. */
export function Analytics({ gtmId }: { gtmId: string }) {
  const consent = useSyncExternalStore(subscribeConsent, readConsent, () => null);

  // One delegated listener covers every link, so server components need no client-side click handlers.
  useEffect(() => {
    document.addEventListener("click", trackLinkClick, { capture: true });
    document.addEventListener("auxclick", trackLinkClick, { capture: true });
    return () => {
      document.removeEventListener("click", trackLinkClick, { capture: true });
      document.removeEventListener("auxclick", trackLinkClick, { capture: true });
    };
  }, []);

  return consent === "granted" ? <GoogleTagManager gtmId={gtmId} /> : null;
}
