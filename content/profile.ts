import type { Locale, Localized } from "@/lib/i18n";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://erhanyaylali.com.tr"
).replace(/\/$/, "");

/** Language-neutral facts. Translated copy lives in `profileCopy`; use `getProfile(locale)` to get both. */
const base = {
  name: "Erhan Yaylalı",
  /** ASCII form used for file names, search aliases and OG fallbacks. */
  alternateName: "Erhan Yaylali",
  givenName: "Erhan",
  familyName: "Yaylalı",
  employer: "Accenture",
  location: { city: "İzmir", countryCode: "TR" },
  birthPlace: "İzmir, Turkey",
  email: "erhanyaylali9@gmail.com",
  cv: "/Erhan_Yaylali_CV.pdf",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/erhanyaylali/" },
    { label: "GitHub", href: "https://github.com/erhanyaylali1" },
  ],
} as const;

const profileCopy: Localized<{
  jobTitle: string;
  country: string;
  headline: string;
  summary: string;
  about: string[];
  strengths: string[];
}> = {
  en: {
    jobTitle: "Senior Software Developer",
    country: "Turkey",
    headline: "I build fast, accessible web products — from AWS-backed dashboards to SEO-optimised websites.",
    summary:
      "Software developer with 5+ years of experience across banking, consulting and digitalization, shipping for clients in Turkey, Denmark, Germany and Sweden.",
    about: [
      "I'm a software developer based in İzmir with five-plus years of experience shipping web products. My work spans banking, consulting and digitalization, for clients in Turkey, Denmark, Germany and Sweden.",
      "Beyond writing code, I work closely with UI/UX teams on design, own SEO optimisation and talk directly with customers. I care about pages that are user-friendly, accessible and fast — and software that stays maintainable long after launch.",
      "Weighing budget and scope, I help customers shape their roadmap: analysing the problems they have today and finding solutions that fit what they actually need.",
    ],
    strengths: ["Team player", "Open-minded", "Detail oriented", "Clear communicator", "Engineering problem solver"],
  },
  tr: {
    jobTitle: "Kıdemli Yazılım Geliştirici",
    country: "Türkiye",
    headline: "Hızlı ve erişilebilir web ürünleri geliştiriyorum — AWS tabanlı panellerden SEO odaklı web sitelerine.",
    summary:
      "Bankacılık, danışmanlık ve dijitalleşme alanlarında 5 yılı aşkın deneyime sahip; Türkiye, Danimarka, Almanya ve İsveç'teki müşteriler için ürün geliştiren bir yazılım geliştiriciyim.",
    about: [
      "İzmir'de yaşayan, web ürünleri geliştirmede beş yılı aşkın deneyime sahip bir yazılım geliştiriciyim. Bankacılık, danışmanlık ve dijitalleşme alanlarında; Türkiye, Danimarka, Almanya ve İsveç'teki müşteriler için çalıştım.",
      "Kod yazmanın ötesinde, tasarım sürecinde UI/UX ekipleriyle yakın çalışıyor, SEO optimizasyonunu üstleniyor ve müşterilerle doğrudan iletişim kuruyorum. Kullanıcı dostu, erişilebilir ve hızlı sayfalara; yayına alındıktan çok sonra da sürdürülebilir kalan yazılımlara önem veriyorum.",
      "Bütçe ve kapsamı birlikte değerlendirerek müşterilerin yol haritasını şekillendirmelerine yardımcı oluyorum: bugün yaşadıkları sorunları analiz ediyor, gerçekten ihtiyaç duydukları çözümleri buluyorum.",
    ],
    strengths: ["Takım oyuncusu", "Açık fikirli", "Detay odaklı", "Net iletişim", "Mühendislik odaklı problem çözücü"],
  },
};

export const getProfile = (locale: Locale) => {
  const copy = profileCopy[locale];
  return { ...base, ...copy, location: { ...base.location, country: copy.country } };
};

/** English profile, for locale-agnostic places (llms.txt, manifest, OG fallbacks). */
export const profile = getProfile("en");

/** Google Tag Manager container. Override with NEXT_PUBLIC_GTM_ID; set it to "" to disable. */
export const gtmId = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-W3W7882X";

const siteCopy: Localized<{ title: string; description: string; keywords: string[] }> = {
  en: {
    title: `${base.name} — ${profileCopy.en.jobTitle}`,
    // ≤160 chars so search engines show it untruncated.
    description:
      "Senior software developer in İzmir with 5+ years building fast, accessible web products for clients in Turkey, Denmark, Germany and Sweden.",
    keywords: ["Software Developer İzmir", "Software Developer Izmir", "Frontend Developer", "Full Stack Developer"],
  },
  tr: {
    title: `${base.name} — ${profileCopy.tr.jobTitle}`,
    // ≤160 chars so search engines show it untruncated.
    description:
      "İzmir'de 5+ yıllık deneyime sahip kıdemli yazılım geliştirici. Türkiye, Danimarka, Almanya ve İsveç'teki müşteriler için hızlı, erişilebilir web ürünleri.",
    keywords: [
      "Yazılım Geliştirici İzmir",
      "Yazılım Geliştirici Izmir",
      "Frontend Geliştirici",
      "Full Stack Geliştirici",
      "React Geliştirici",
      "Web Sitesi Geliştirme",
    ],
  },
};

export const getSite = (locale: Locale) => siteCopy[locale];
/** English site copy, for locale-agnostic places. */
export const site = siteCopy.en;
