import { tx, type Locale, type Text } from "@/lib/i18n";

/**
 * Skills grouped by area. Groups — and items within each group — are ordered by
 * current hiring demand, highest first. `core` marks the in-demand skills with the
 * strongest evidence; they're visually emphasised.
 *
 * Every item is backed by real work (see the trailing comments) — keep it that way.
 */
export type ToolkitItem = { name: string; detail?: string; core?: boolean };
export type ToolkitGroup = { title: string; items: ToolkitItem[] };

type Source = { title: Text; items: (Omit<ToolkitItem, "name"> & { name: Text })[] };

const toolkit: Source[] = [
  {
    title: "Frontend",
    items: [
      { name: "TypeScript", core: true }, // Angular at Accenture, this site
      { name: "React", core: true }, // E-Wallet, Spordaş, Erhan Oyunları
      { name: "Next.js", core: true }, // Reyhan Eren, Rich Blog Post, this site
      { name: "Angular", core: true }, // Accenture
      { name: "JavaScript" }, // CV
      { name: "Tailwind CSS" }, // Reyhan Eren, Erhan Oyunları, this site
      { name: "Redux" }, // CV, E-Wallet
      { name: "PWA" }, // Erhan Oyunları
    ],
  },
  {
    title: { en: "Backend & real-time", tr: "Backend ve gerçek zamanlı" },
    items: [
      { name: "Node.js", core: true }, // Accenture, Orion/Yapı Kredi full-stack, Rich Blog Post, E-Wallet
      { name: { en: "REST APIs", tr: "REST API'ler" }, core: true }, // Express APIs behind Rich Blog Post and E-Wallet
      { name: "WebSockets", detail: "Socket.IO", core: true }, // Erhan Oyunları
      { name: "Express" }, // Rich Blog Post, E-Wallet, Erhan Oyunları
      { name: { en: "JWT auth", tr: "JWT kimlik doğrulama" } }, // Rich Blog Post, E-Wallet
      { name: "Java", detail: "Spring" }, // Yapı Kredi Technology
      { name: "C#", detail: ".NET" }, // Ibtech
    ],
  },
  {
    title: { en: "Cloud & DevOps", tr: "Bulut ve DevOps" },
    items: [
      { name: "AWS", detail: "Lambda, S3, Athena, Glue", core: true }, // Accenture
      { name: "Docker", core: true }, // Accenture
      { name: "Terraform", core: true }, // Accenture (IaC)
      { name: "Google Cloud", core: true }, // Orion Innovation (built from scratch), Rich Blog Post, Erhan Oyunları hosting
      { name: "Firebase" }, // Orion Innovation, Spordaş
      { name: "Vercel & Netlify" }, // Rich Blog Post, Reyhan Eren
    ],
  },
  {
    title: { en: "AI-assisted development", tr: "Yapay zeka destekli geliştirme" },
    items: [
      { name: "Claude Code", core: true }, // this site
      { name: "Google AI Studio" }, // Spordaş, Erhan Oyunları
    ],
  },
  {
    title: { en: "Data", tr: "Veri" },
    items: [
      { name: "MySQL" }, // E-Wallet
      { name: "MongoDB" }, // Rich Blog Post
      { name: "Cloud Firestore" }, // Orion Innovation, Spordaş
      { name: "Sequelize" }, // E-Wallet
    ],
  },
  {
    title: { en: "Search, quality & design", tr: "Arama, kalite ve tasarım" },
    items: [
      { name: { en: "Technical SEO", tr: "Teknik SEO" }, core: true }, // Hesehus, Reyhan Eren
      { name: { en: "Accessibility", tr: "Erişilebilirlik" }, detail: "WCAG", core: true }, // Hesehus
      { name: { en: "Unit testing", tr: "Birim testleri" } }, // Yapı Kredi Technology
      { name: { en: "Structured data", tr: "Yapılandırılmış veri" }, detail: "JSON-LD" }, // Reyhan Eren, this site
      { name: { en: "Analytics", tr: "Analitik" }, detail: "GA / GTM" }, // Reyhan Eren, CV (Google Console)
      { name: "Figma" }, // Civil Defence Ukraine
    ],
  },
];

export const getToolkit = (locale: Locale): ToolkitGroup[] =>
  toolkit.map((g) => ({
    title: tx(g.title, locale),
    items: g.items.map((i) => ({ ...i, name: tx(i.name, locale) })),
  }));

/** Flat list for metadata keywords and JSON-LD `knowsAbout`. */
export const getSkillNames = (locale: Locale) => getToolkit(locale).flatMap((g) => g.items.map((i) => i.name));
