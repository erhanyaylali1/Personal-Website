"use client";

import { useSyncExternalStore } from "react";
import { ui } from "@/content/ui";
import { useLocale } from "./providers";
import { Moon, Sun } from "./ui/icons";

/** Runs before paint (inlined in <head>) so there is never a flash of the wrong theme. */
export const themeScript = `(()=>{try{var t=localStorage.getItem("theme");var d=t?t==="dark":matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d)}catch(e){}})()`;

const subscribe = (cb: () => void) => {
  const obs = new MutationObserver(cb);
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => obs.disconnect();
};
const getSnapshot = () => document.documentElement.classList.contains("dark");
const getServerSnapshot = () => null;

export function ThemeToggle() {
  const dark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const t = ui[useLocale()].theme;

  const toggle = () => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? t.toLight : t.toDark}
      title={dark ? t.light : t.dark}
      className="inline-flex size-10 items-center justify-center rounded-full text-fg-muted transition-[background-color,color] duration-200 hover:bg-surface hover:text-fg"
    >
      {/* Render both and swap via CSS so SSR markup is stable. */}
      <Sun className="hidden dark:block" width={18} height={18} />
      <Moon className="block dark:hidden" width={18} height={18} />
    </button>
  );
}
