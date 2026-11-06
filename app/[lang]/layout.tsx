import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Analytics } from "@/components/analytics";
import { CookieBanner } from "@/components/cookie-banner";
import { Providers } from "@/components/providers";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { themeScript } from "@/components/theme-toggle";
import { getProfile, getSite, gtmId, siteUrl } from "@/content/profile";
import { getSkillNames } from "@/content/toolkit";
import { ui } from "@/content/ui";
import { consentDefaultsScript } from "@/lib/consent";
import { fontVariables } from "@/lib/fonts";
import { hasLocale, languageAlternates, locales, ogLocales } from "@/lib/i18n";
import { getLocale } from "@/lib/locale";
import "../globals.css";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const profile = getProfile(locale);
  const site = getSite(locale);
  return {
    metadataBase: new URL(siteUrl),
    title: { default: site.title, template: `%s · ${profile.name}` },
    description: site.description,
    applicationName: profile.name,
    authors: [{ name: profile.name, url: siteUrl }],
    creator: profile.name,
    publisher: profile.name,
    keywords: [profile.name, profile.alternateName, profile.jobTitle, ...site.keywords, ...getSkillNames(locale)],
    alternates: languageAlternates(locale, "/"),
    openGraph: {
      type: "profile",
      firstName: profile.givenName,
      lastName: profile.familyName,
      username: "erhanyaylali",
      url: languageAlternates(locale, "/").canonical,
      siteName: profile.name,
      title: site.title,
      description: site.description,
      locale: ogLocales[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocales[l]),
    },
    twitter: {
      card: "summary_large_image",
      title: site.title,
      description: site.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
    formatDetection: { telephone: false },
    category: "technology",
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf8" },
    { media: "(prefers-color-scheme: dark)", color: "#121317" },
  ],
  colorScheme: "light dark",
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return (
    <html lang={lang} suppressHydrationWarning className={fontVariables}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* Consent Mode defaults (all denied) must exist before any Google tag. */}
        <script dangerouslySetInnerHTML={{ __html: consentDefaultsScript }} />
      </head>
      <body className="min-h-dvh font-sans antialiased">
        <a
          href="#main"
          className="fixed top-3 left-3 z-50 -translate-y-20 rounded-full bg-fg px-4 py-2 text-sm font-medium text-bg transition-transform focus:translate-y-0"
        >
          {ui[lang].skipToContent}
        </a>
        <Providers locale={lang}>
          <SiteHeader />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <SiteFooter />
          <CookieBanner />
        </Providers>
        {/* Production only (so local development doesn't pollute analytics), and only after consent. */}
        {gtmId && process.env.NODE_ENV === "production" && <Analytics gtmId={gtmId} />}
      </body>
    </html>
  );
}
