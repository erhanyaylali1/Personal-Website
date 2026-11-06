import { notFound } from "next/navigation";

/**
 * Localized 404 for unknown URLs: proxy.ts rewrites every path it doesn't recognise to /<lang>/404,
 * which lands here and renders app/[lang]/not-found.tsx inside the localized layout with a real 404 status.
 */
export { generateMetadata } from "../not-found";

export function generateStaticParams() {
  return [{ missing: ["404"] }];
}

export default function Missing() {
  notFound();
}
