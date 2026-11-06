"use client";

import { MotionConfig } from "motion/react";
import { createContext, useContext, type ReactNode } from "react";
import { defaultLocale, type Locale } from "@/lib/i18n";

const LocaleContext = createContext<Locale>(defaultLocale);

/** Locale for Client Components, which can't read `next/root-params`. */
export const useLocale = () => useContext(LocaleContext);

export function Providers({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <LocaleContext value={locale}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LocaleContext>
  );
}
