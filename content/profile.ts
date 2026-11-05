export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://erhanyaylali.com.tr"
).replace(/\/$/, "");

export const profile = {
  name: "Erhan Yaylalı",
  /** ASCII form used for file names, search aliases and OG fallbacks. */
  alternateName: "Erhan Yaylali",
  givenName: "Erhan",
  familyName: "Yaylalı",
  jobTitle: "Senior Software Developer",
  employer: "Accenture",
  location: { city: "Istanbul", country: "Turkey", countryCode: "TR" },
  birthPlace: "İzmir, Turkey",
  email: "erhanyaylali9@gmail.com",
  cv: "/Erhan_Yaylali_CV.pdf",
  headline:
    "I build fast, accessible web products — from AWS-backed dashboards to SEO-optimised websites.",
  summary:
    "Software developer with 5+ years of experience across banking, consulting and digitalization, shipping for clients in Turkey, Denmark, Germany and Sweden.",
  about: [
    "I'm a software developer based in Istanbul with five-plus years of experience shipping web products. My work spans banking, consulting and digitalization, for clients in Turkey, Denmark, Germany and Sweden.",
    "Beyond writing code, I work closely with UI/UX teams on design, own SEO optimisation and talk directly with customers. I care about pages that are user-friendly, accessible and fast — and software that stays maintainable long after launch.",
    "Weighing budget and scope, I help customers shape their roadmap: analysing the problems they have today and finding solutions that fit what they actually need.",
  ],
  strengths: ["Team player", "Open-minded", "Detail oriented", "Clear communicator", "Engineering problem solver"],
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/erhanyaylali/" },
    { label: "GitHub", href: "https://github.com/erhanyaylali1" },
  ],
} as const;

/** Google Tag Manager container. Override with NEXT_PUBLIC_GTM_ID; set it to "" to disable. */
export const gtmId = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-W3W7882X";

export const site = {
  title: `${profile.name} — ${profile.jobTitle}`,
  // ≤160 chars so search engines show it untruncated.
  description:
    "Senior software developer in Istanbul with 5+ years building fast, accessible web products for clients in Turkey, Denmark, Germany and Sweden.",
  locale: "en_US",
};
