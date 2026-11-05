"use client";

import { GoogleTagManager } from "@next/third-parties/google";
import { useSyncExternalStore } from "react";
import { readConsent, subscribeConsent } from "@/lib/consent";

/** Loads Google Tag Manager only after the visitor has granted analytics consent. */
export function Analytics({ gtmId }: { gtmId: string }) {
  const consent = useSyncExternalStore(subscribeConsent, readConsent, () => null);
  return consent === "granted" ? <GoogleTagManager gtmId={gtmId} /> : null;
}
