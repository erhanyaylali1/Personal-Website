import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@/components/analytics";
import { CookieBanner } from "@/components/cookie-banner";
import { Providers } from "@/components/providers";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { themeScript } from "@/components/theme-toggle";
import { gtmId, profile, site, siteUrl } from "@/content/profile";
import { skillNames } from "@/content/toolkit";
import { consentDefaultsScript } from "@/lib/consent";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin", "latin-ext"], display: "swap" });
// Mono renders labels, dates and tech names; latin-ext covers the "İ" in the hero's "İzmir". Not preloaded so it
// doesn't compete with the LCP image. Sans keeps latin-ext for Turkish letters (e.g. "ı" in Yaylalı).
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: site.title, template: `%s · ${profile.name}` },
  description: site.description,
  applicationName: profile.name,
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  publisher: profile.name,
  keywords: [
    profile.name,
    profile.alternateName,
    profile.jobTitle,
    "Software Developer İzmir",
    "Software Developer Izmir",
    "Frontend Developer",
    "Full Stack Developer",
    ...skillNames,
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    firstName: profile.givenName,
    lastName: profile.familyName,
    username: "erhanyaylali",
    url: "/",
    siteName: profile.name,
    title: site.title,
    description: site.description,
    locale: site.locale,
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

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf8" },
    { media: "(prefers-color-scheme: dark)", color: "#121317" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
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
          Skip to content
        </a>
        <Providers>
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
