import { getProfile, profile } from "@/content/profile";
import { defaultLocale, hasLocale, locales } from "@/lib/i18n";
import { ogCard, ogSize } from "@/lib/og";

export const alt = profile.name;
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const p = getProfile(hasLocale(lang) ? lang : defaultLocale);
  return ogCard({
    eyebrow: `${p.jobTitle} · ${p.location.city}`,
    title: p.name,
    subtitle: p.headline,
    footer: lang === "tr" ? "Portfolyo ve CV" : "Portfolio & CV",
  });
}
