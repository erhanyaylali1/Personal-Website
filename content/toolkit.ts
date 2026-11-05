/**
 * Skills grouped by area. Groups — and items within each group — are ordered by
 * current hiring demand, highest first. `core` marks the in-demand skills with the
 * strongest evidence; they're visually emphasised.
 *
 * Every item is backed by real work (see the trailing comments) — keep it that way.
 */
export type ToolkitItem = { name: string; detail?: string; core?: boolean };
export type ToolkitGroup = { title: string; items: ToolkitItem[] };

export const toolkit: ToolkitGroup[] = [
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
    title: "Backend & real-time",
    items: [
      { name: "Node.js", core: true }, // Accenture, Orion/Yapı Kredi full-stack, Rich Blog Post, E-Wallet
      { name: "REST APIs", core: true }, // Express APIs behind Rich Blog Post and E-Wallet
      { name: "WebSockets", detail: "Socket.IO", core: true }, // Erhan Oyunları
      { name: "Express" }, // Rich Blog Post, E-Wallet, Erhan Oyunları
      { name: "JWT auth" }, // Rich Blog Post, E-Wallet
    ],
  },
  {
    title: "Cloud & DevOps",
    items: [
      { name: "AWS", detail: "Lambda, S3, Athena, Glue", core: true }, // Accenture
      { name: "Docker", core: true }, // Accenture
      { name: "Terraform", core: true }, // Accenture (IaC)
      { name: "Firebase" }, // Spordaş
      { name: "Google Cloud" }, // Rich Blog Post, Erhan Oyunları hosting
      { name: "Vercel & Netlify" }, // Rich Blog Post, Reyhan Eren
    ],
  },
  {
    title: "AI-assisted development",
    items: [
      { name: "Claude Code", core: true }, // this site
      { name: "Google AI Studio" }, // Spordaş, Erhan Oyunları
    ],
  },
  {
    title: "Data",
    items: [
      { name: "MySQL" }, // E-Wallet
      { name: "MongoDB" }, // Rich Blog Post
      { name: "Cloud Firestore" }, // Spordaş
      { name: "Sequelize" }, // E-Wallet
    ],
  },
  {
    title: "Search, quality & design",
    items: [
      { name: "Technical SEO", core: true }, // Hesehus, Reyhan Eren
      { name: "Accessibility", detail: "WCAG", core: true }, // Hesehus
      { name: "Structured data", detail: "JSON-LD" }, // Reyhan Eren, this site
      { name: "Analytics", detail: "GA / GTM" }, // Reyhan Eren, CV (Google Console)
      { name: "Figma" }, // Civil Defence Ukraine
    ],
  },
];

/** Flat list for metadata keywords and JSON-LD `knowsAbout`. */
export const skillNames = toolkit.flatMap((g) => g.items.map((i) => i.name));
