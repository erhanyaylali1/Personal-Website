import type { Metadata } from "next";
import { CookieSettingsButton } from "@/components/cookie-banner";
import { Container } from "@/components/ui/container";
import { profile, siteUrl } from "@/content/profile";
import { JsonLd, websiteId } from "@/lib/jsonld";

const title = "Privacy policy";
const description = `How ${profile.name}'s website uses cookies and analytics, and how to change your choice.`;
const updated = "2026-11-06";
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/privacy" },
  openGraph: { title: `${title} · ${profile.name}`, description, url: "/privacy" },
};

const sections = [
  {
    heading: "Who is responsible",
    body: [
      `This website is run by ${profile.name}, ${profile.location.city}, ${profile.location.country}. For any privacy question, email ${profile.email}.`,
    ],
  },
  {
    heading: "Analytics cookies — only with your consent",
    body: [
      "If you click “Accept”, the site loads Google Tag Manager and Google Analytics 4 to measure which pages are visited, roughly where visitors come from and which device types they use. Google Analytics then sets cookies such as _ga and _ga_<ID>.",
      "If you click “Decline”, or make no choice, none of these scripts load and no analytics cookies are set. Google Consent Mode defaults to “denied” before anything else runs.",
      "Analytics data is processed by Google and kept for the retention period configured in Google Analytics. Advertising features are not used: ad storage and personalisation stay denied in every case.",
    ],
  },
  {
    heading: "Stored in your browser",
    body: [
      "Your theme preference (light or dark) and your cookie choice are saved in your browser's local storage. They never leave your device.",
    ],
  },
  {
    heading: "Legal basis and your rights",
    body: [
      "Analytics is based on your consent (GDPR Art. 6(1)(a); KVKK Art. 5). You can withdraw consent at any time — analytics stops immediately and its cookies are removed. You may also request access to, correction of or deletion of personal data by email.",
    ],
  },
  {
    heading: "Links to other sites",
    body: [
      "Project pages link to live demos and code on other domains (for example GitHub). Those sites have their own privacy policies.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              "@id": `${siteUrl}/privacy#webpage`,
              url: `${siteUrl}/privacy`,
              name: title,
              description,
              inLanguage: "en",
              dateModified: updated,
              isPartOf: { "@id": websiteId },
            },
            { "@type": "WebSite", "@id": websiteId, url: siteUrl, name: profile.name },
          ],
        }}
      />
      <article className="py-16 sm:py-24">
        <Container>
          {/* Inner wrapper: Container already sets max-w-6xl, so a second max-w on it would conflict. */}
          <div className="max-w-[68ch]">
          <p className="font-mono text-xs tracking-[0.16em] text-fg-subtle uppercase">Legal</p>
          <h1 className="mt-4 text-h2 font-semibold text-fg">{title}</h1>
          <p className="mt-4 text-sm text-fg-muted">
            Last updated <time dateTime={updated}>6 November 2026</time>
          </p>

          <div className="mt-12 space-y-10">
            {sections.map((s) => (
              <section key={s.heading} aria-labelledby={slug(s.heading)}>
                <h2 id={slug(s.heading)} className="text-lg font-semibold tracking-tight text-fg">
                  {s.heading}
                </h2>
                {s.body.map((p) => (
                  <p key={p} className="mt-3 text-[16px] leading-[1.75] text-fg-muted">
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </div>

          <div className="mt-12 border-t border-border pt-8">
            <CookieSettingsButton className="inline-flex h-11 cursor-pointer items-center rounded-full border border-border-strong px-5 text-sm font-medium text-fg transition-[background-color,border-color] duration-200 hover:border-fg/40 hover:bg-surface" />
          </div>
          </div>
        </Container>
      </article>
    </>
  );
}
