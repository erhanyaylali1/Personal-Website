import type { Localized } from "@/lib/i18n";

/**
 * Interface copy for every language. English defines the shape; Turkish must match it.
 * Imported by Client Components too, so keep long-form content (privacy policy, projects) out of here.
 */
const en = {
  skipToContent: "Skip to content",
  newTab: "(opens in a new tab)",

  header: {
    nav: { about: "About", experience: "Experience", projects: "Projects", blog: "Blog", contact: "Contact" },
    primaryNav: "Primary",
    mobileNav: "Primary mobile",
    home: (name: string) => `${name}, home`,
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
  /** Label for a link *to* this language, written in this language (the Turkish page links here with this English text). */
  switchLanguage: "View this page in English",

  theme: {
    toLight: "Switch to light theme",
    toDark: "Switch to dark theme",
    light: "Light theme",
    dark: "Dark theme",
  },

  hero: {
    viewProjects: "View projects",
    downloadCv: "Download CV",
    pdf: "(PDF)",
    portraitAlt: "Portrait of Erhan Yaylalı smiling by the sea at sunset",
  },

  about: {
    label: "About",
    title: "Engineering with the user — and the business — in mind.",
    toolkit: "Toolkit",
    coreSkills: "Core skills",
    coreSkill: "(core skill)",
  },

  experience: {
    label: "Experience",
    title: "Seven roles, four markets.",
    intro: "From an IBM internship to senior work at Accenture — across banking, consulting and digitalization.",
    present: "Present",
    to: " to ",
    current: "Current",
    education: "Education",
    technologies: (company: string) => `Technologies used at ${company}`,
  },

  projects: {
    label: "Selected work",
    title: "Selected side projects.",
    intro:
      "Production websites, real-time multiplayer games, community and publishing apps, and design work — each with a live demo, source code or prototype.",
    featured: "Featured",
    technologies: "Technologies",
    more: "more",
    categories: {
      Website: "Website",
      "Web application": "Web application",
      "Mobile-first web app": "Mobile-first web app",
      "UI design": "UI design",
    },
  },

  projectsPage: {
    title: "Projects",
    count: (n: number) => `${n} projects`,
    listName: (name: string) => `Projects by ${name}`,
    description: (name: string, titles: string) => `Projects by ${name}: ${titles}.`,
  },

  project: {
    links: { live: "Live site", source: "Source code", prototype: "Figma prototype" },
    stack: "Stack",
    highlights: "Highlights",
    overview: "Overview",
    screens: "Screens",
    next: "Next project",
    builtWith: (stack: string) => `Built with ${stack}.`,
    by: (name: string) => `A project by ${name}`,
  },

  blog: {
    label: "Blog",
    title: "Notes on building for the web.",
    intro: "Write-ups on frontend, cloud and SEO work — what I tried, what worked and what I'd do differently.",
    description: "Articles by Erhan Yaylalı on frontend development, cloud architecture, SEO and building web products.",
    empty: "No posts yet — the first one is on its way.",
    readMore: "Read more",
    minRead: (n: number) => `${n} min read`,
    views: (n: string) => `${n} views`,
    allPosts: "All posts",
    latestTitle: "Latest writing.",
    latestIntro: "Notes from frontend, cloud and SEO work — the things I'd want to read before starting a similar project.",
    morePosts: "More posts",
    share: "Share this post",
    shareOn: (network: string) => `Share on ${network}`,
    copyLink: "Copy link",
    copied: "Copied",
    linkCopied: "Link copied",
  },

  gallery: {
    open: (i: number, n: number, alt: string) => `Open screenshot ${i} of ${n}: ${alt}`,
    dialog: (title: string) => `${title} screenshots`,
    previous: "Previous screenshot",
    next: "Next screenshot",
    close: "Close",
  },

  breadcrumb: { label: "Breadcrumb", home: "Home" },

  contact: {
    label: "Contact",
    title: "Let's build something people enjoy using.",
    body: "Open to conversations about frontend, full-stack and cloud work. The quickest way to reach me is email.",
    copy: "Copy email",
    copied: "Copied",
    copiedStatus: "Email address copied to clipboard",
  },

  footer: { label: "Footer", builtWith: "Built with Next.js.", email: "Email", privacy: "Privacy" },

  cookies: {
    title: "Cookies",
    body: "With your permission I use Google Analytics cookies to see which pages people visit. Nothing is set until you accept.",
    privacyPolicy: "Privacy policy",
    current: (accepted: boolean) => `Current choice: ${accepted ? "accepted" : "declined"}.`,
    decline: "Decline",
    accept: "Accept",
    settings: "Cookie settings",
  },

  notFound: {
    title: "Page not found",
    heading: "This page doesn't exist.",
    body: "The link may be broken or the page may have moved.",
    back: "Back home",
  },

  duration: (years: number, months: number) =>
    [years && `${years} yr${years > 1 ? "s" : ""}`, months && `${months} mo${months > 1 ? "s" : ""}`].filter(Boolean).join(" "),
};

export type UI = typeof en;

const tr: UI = {
  skipToContent: "İçeriğe geç",
  newTab: "(yeni sekmede açılır)",

  header: {
    nav: { about: "Hakkımda", experience: "Deneyim", projects: "Projeler", blog: "Blog", contact: "İletişim" },
    primaryNav: "Ana menü",
    mobileNav: "Mobil ana menü",
    home: (name) => `${name}, ana sayfa`,
    openMenu: "Menüyü aç",
    closeMenu: "Menüyü kapat",
  },
  switchLanguage: "Bu sayfayı Türkçe görüntüle",

  theme: {
    toLight: "Açık temaya geç",
    toDark: "Koyu temaya geç",
    light: "Açık tema",
    dark: "Koyu tema",
  },

  hero: {
    viewProjects: "Projeleri incele",
    downloadCv: "CV'yi indir",
    pdf: "(PDF)",
    portraitAlt: "Erhan Yaylalı'nın gün batımında deniz kenarında gülümseyen portresi",
  },

  about: {
    label: "Hakkımda",
    title: "Kullanıcıyı ve işin hedeflerini merkeze alan mühendislik.",
    toolkit: "Yetkinlikler",
    coreSkills: "Temel yetkinlikler",
    coreSkill: "(temel yetkinlik)",
  },

  experience: {
    label: "Deneyim",
    title: "Yedi rol, dört pazar.",
    intro: "IBM stajından Accenture'daki kıdemli rolüme kadar — bankacılık, danışmanlık ve dijitalleşme alanlarında.",
    present: "Günümüz",
    to: " ile ",
    current: "Güncel",
    education: "Eğitim",
    technologies: (company) => `${company} bünyesinde kullanılan teknolojiler`,
  },

  projects: {
    label: "Seçili işler",
    title: "Seçili kişisel projeler.",
    intro:
      "Canlıdaki web siteleri, gerçek zamanlı çok oyunculu oyunlar, topluluk ve yayıncılık uygulamaları ile tasarım çalışmaları — her biri canlı demo, kaynak kod veya prototip ile.",
    featured: "Öne çıkan",
    technologies: "Teknolojiler",
    more: "tane daha",
    categories: {
      Website: "Web sitesi",
      "Web application": "Web uygulaması",
      "Mobile-first web app": "Mobil öncelikli web uygulaması",
      "UI design": "Arayüz tasarımı",
    },
  },

  projectsPage: {
    title: "Projeler",
    count: (n) => `${n} proje`,
    listName: (name) => `${name} projeleri`,
    description: (name, titles) => `${name} projeleri: ${titles}.`,
  },

  project: {
    links: { live: "Canlı site", source: "Kaynak kod", prototype: "Figma prototipi" },
    stack: "Teknolojiler",
    highlights: "Öne çıkanlar",
    overview: "Genel bakış",
    screens: "Ekranlar",
    next: "Sonraki proje",
    builtWith: (stack) => `${stack} ile geliştirildi.`,
    by: (name) => `Bir ${name} projesi`,
  },

  blog: {
    label: "Blog",
    title: "Web için ürün geliştirmeye dair notlar.",
    intro: "Frontend, bulut ve SEO çalışmalarından notlar — neyi denedim, ne işe yaradı ve neyi farklı yapardım.",
    description: "Erhan Yaylalı'nın frontend geliştirme, bulut mimarisi, SEO ve web ürünleri üzerine yazıları.",
    empty: "Henüz yazı yok — ilki yolda.",
    readMore: "Devamını oku",
    minRead: (n) => `${n} dk okuma`,
    views: (n) => `${n} görüntülenme`,
    allPosts: "Tüm yazılar",
    latestTitle: "Son yazılar.",
    latestIntro: "Frontend, bulut ve SEO çalışmalarından notlar — benzer bir projeye başlamadan önce okumak isteyeceğim türden.",
    morePosts: "Diğer yazılar",
    share: "Bu yazıyı paylaş",
    shareOn: (network) => `${network} ile paylaş`,
    copyLink: "Bağlantıyı kopyala",
    copied: "Kopyalandı",
    linkCopied: "Bağlantı kopyalandı",
  },

  gallery: {
    open: (i, n, alt) => `${n} ekran görüntüsünden ${i}. görüntüyü aç: ${alt}`,
    dialog: (title) => `${title} ekran görüntüleri`,
    previous: "Önceki ekran görüntüsü",
    next: "Sonraki ekran görüntüsü",
    close: "Kapat",
  },

  breadcrumb: { label: "Sayfa yolu", home: "Ana sayfa" },

  contact: {
    label: "İletişim",
    title: "İnsanların kullanmaktan keyif aldığı bir şey inşa edelim.",
    body: "Frontend, full-stack ve bulut projeleri hakkında konuşmaya açığım. Bana ulaşmanın en hızlı yolu e-posta.",
    copy: "E-postayı kopyala",
    copied: "Kopyalandı",
    copiedStatus: "E-posta adresi panoya kopyalandı",
  },

  footer: { label: "Alt bilgi", builtWith: "Next.js ile geliştirildi.", email: "E-posta", privacy: "Gizlilik" },

  cookies: {
    title: "Çerezler",
    body: "İzninizle, hangi sayfaların ziyaret edildiğini görmek için Google Analytics çerezlerini kullanıyorum. Siz kabul edene kadar hiçbir çerez oluşturulmaz.",
    privacyPolicy: "Gizlilik politikası",
    current: (accepted) => `Mevcut tercih: ${accepted ? "kabul edildi" : "reddedildi"}.`,
    decline: "Reddet",
    accept: "Kabul et",
    settings: "Çerez ayarları",
  },

  notFound: {
    title: "Sayfa bulunamadı",
    heading: "Bu sayfa mevcut değil.",
    body: "Bağlantı bozuk olabilir ya da sayfa taşınmış olabilir.",
    back: "Ana sayfaya dön",
  },

  duration: (years, months) => [years && `${years} yıl`, months && `${months} ay`].filter(Boolean).join(" "),
};

export const ui: Localized<UI> = { en, tr };
