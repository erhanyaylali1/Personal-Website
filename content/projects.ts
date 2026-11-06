import { tx, type Locale, type Localized, type Text } from "@/lib/i18n";
import { projectImages, type ProjectImage } from "./project-images";
import type { ProjectSlug } from "./project-slugs";

export type ProjectCategory = "Website" | "Web application" | "Mobile-first web app" | "UI design";

export type Project = {
  slug: ProjectSlug;
  title: string;
  /** Stable key; the visible label comes from `ui[locale].projects.categories`. */
  category: ProjectCategory;
  /** One sentence, shown on cards and used as meta description. */
  summary: string;
  /** Longer copy for the detail page. */
  description: string[];
  features: string[];
  stack: string[];
  links: { live?: string; source?: string; prototype?: string };
  /** How the cover should be framed in a 4:3 card. */
  cover: "landscape" | "portrait";
  /** Screenshots are phone-sized (tall, narrow). */
  mobileScreens?: boolean;
  images: ProjectImage[];
};

type Source = Omit<Project, "title" | "summary" | "description" | "features" | "images"> & {
  title: Text;
  summary: Localized<string>;
  description: Localized<string[]>;
  features: Localized<string[]>;
};

const source: Source[] = [
  {
    slug: "reyhan-eren",
    title: { en: "Reyhan Eren Family Counselling", tr: "Reyhan Eren Aile Danışmanlığı" },
    category: "Website",
    summary: {
      en: "A calm, SEO-first website for a family counsellor in İzmir, with service pages, a blog and online appointment booking.",
      tr: "İzmir'deki bir aile danışmanı için hizmet sayfaları, blog ve online randevu sistemi içeren, sade ve SEO odaklı bir web sitesi.",
    },
    description: {
      en: [
        "A production website for Reyhan Eren, a family and couples counsellor based in Bayraklı, İzmir, who also works online across Turkey. The design is deliberately quiet: warm neutrals, a single green accent and serif headlines, so visitors feel safe before they ever book a session.",
        "Built for local search from the ground up. Each service has its own page, FAQs and clear calls to action, and the site ships LocalBusiness, Person and FAQPage structured data, a sitemap and generated social images. Visitors can request an appointment through a form or reach out directly on WhatsApp, and a blog covers topics from healthy boundaries to helping children through divorce.",
      ],
      tr: [
        "İzmir Bayraklı'da hizmet veren ve Türkiye genelinde online görüşmeler de yapan aile ve çift danışmanı Reyhan Eren için geliştirilmiş, yayında olan bir web sitesi. Tasarım bilinçli olarak sade tutuldu: sıcak nötr tonlar, tek bir yeşil vurgu rengi ve serif başlıklar sayesinde ziyaretçiler daha randevu almadan kendilerini güvende hissediyor.",
        "Site, en baştan yerel arama (local SEO) için kurgulandı. Her hizmetin kendi sayfası, sıkça sorulan soruları ve net eylem çağrıları var; site LocalBusiness, Person ve FAQPage yapılandırılmış verileri, site haritası ve otomatik oluşturulan sosyal medya görselleriyle birlikte geliyor. Ziyaretçiler form üzerinden randevu talep edebiliyor ya da doğrudan WhatsApp'tan ulaşabiliyor; blog ise sağlıklı sınırlardan boşanma sürecinde çocuklara destek olmaya kadar pek çok konuyu ele alıyor.",
      ],
    },
    features: {
      en: ["Local SEO & structured data", "Service pages", "Appointment booking", "Blog", "WhatsApp contact"],
      tr: ["Yerel SEO ve yapılandırılmış veri", "Hizmet sayfaları", "Randevu sistemi", "Blog", "WhatsApp iletişimi"],
    },
    stack: ["Next.js", "React", "Tailwind CSS", "EmailJS", "Google Tag Manager", "Netlify"],
    links: { live: "https://reyhaneren.com.tr" },
    cover: "landscape",
  },
  {
    slug: "erhan-oyunlari",
    title: "Erhan Oyunları",
    category: "Web application",
    summary: {
      en: "A real-time multiplayer platform with 14 board, card and party games — create a room, share the code and play with friends or bots.",
      tr: "14 kutu, kart ve parti oyunu içeren gerçek zamanlı, çok oyunculu bir platform — oda oluştur, kodu paylaş, arkadaşlarınla ya da botlarla oyna.",
    },
    description: {
      en: [
        "Erhan Oyunları is a game night in the browser. It hosts 14 games across three groups: two-player strategy games like Quoridor and Karakum, four-player card and tile games like King, 101 Okey, Sequence and Azul, and party games like Codenames, Tabu, Charades and Çiz Bakalım.",
        "Every game runs in real time over WebSockets. A host creates a room, friends join from their own phones with a short room code, and empty seats can be filled with bots, so a match can start even with one player. Games include in-game chat, turn timers and rules screens, and in Çiz Bakalım every brush stroke is streamed live to the other players. The site is installable as a PWA.",
      ],
      tr: [
        "Erhan Oyunları, tarayıcıdaki oyun gecesi. Üç grupta toplam 14 oyun barındırıyor: Quoridor ve Karakum gibi iki kişilik strateji oyunları; King, 101 Okey, Sequence ve Azul gibi dört kişilik kart ve taş oyunları; Codenames, Tabu, Charades ve Çiz Bakalım gibi parti oyunları.",
        "Tüm oyunlar WebSockets üzerinden gerçek zamanlı çalışıyor. Oda sahibi bir oda oluşturuyor, arkadaşları kısa bir oda koduyla kendi telefonlarından katılıyor ve boş koltuklar botlarla doldurulabiliyor; böylece tek oyuncuyla bile maç başlayabiliyor. Oyunlarda oyun içi sohbet, hamle süreleri ve kural ekranları bulunuyor; Çiz Bakalım'da her fırça darbesi diğer oyunculara canlı olarak aktarılıyor. Site, PWA olarak cihaza yüklenebiliyor.",
      ],
    },
    features: {
      en: ["14 multiplayer games", "Room codes", "Bots for empty seats", "Live drawing & chat", "Installable PWA"],
      tr: ["14 çok oyunculu oyun", "Oda kodları", "Boş koltuklar için botlar", "Canlı çizim ve sohbet", "Yüklenebilir PWA"],
    },
    stack: ["React", "Vite", "Tailwind CSS", "Socket.IO", "Node.js", "Express", "Canvas API", "PWA", "Google AI Studio"],
    links: { live: "https://erhan-oyunlar.ai.studio" },
    cover: "landscape",
  },
  {
    slug: "spordas",
    title: "Spordaş",
    category: "Web application",
    summary: {
      en: "A multi-sport community app for creating and joining local matches, with Elo rankings and match history.",
      tr: "Yerel maçlar oluşturup katılabileceğin, Elo sıralamaları ve maç geçmişi sunan çok sporlu bir topluluk uygulaması.",
    },
    description: {
      en: [
        "Spordaş brings amateur athletes together. Players create matches for tennis, volleyball, football, basketball, padel, running and more, then browse what's happening nearby and join with one tap. Each match shows its location on a map, the weather at kick-off and how many spots are left.",
        "Matches are either social or ranked. Ranked results feed an Elo rating per sport and an overall leaderboard, and players can challenge each other directly. Profiles show recent form, win rate, per-sport ratings, a trust score and the full match history with scores.",
      ],
      tr: [
        "Spordaş amatör sporcuları bir araya getiriyor. Oyuncular tenis, voleybol, futbol, basketbol, padel, koşu ve daha birçok spor için maç oluşturuyor, yakınlarındaki maçlara göz atıyor ve tek dokunuşla katılıyor. Her maçta haritada konum, maç saatindeki hava durumu ve kalan kontenjan gösteriliyor.",
        "Maçlar sosyal ya da dereceli olabiliyor. Dereceli maç sonuçları her spor için ayrı bir Elo puanını ve genel sıralamayı besliyor; oyuncular birbirlerine doğrudan meydan okuyabiliyor. Profillerde son form, kazanma oranı, spor bazında puanlar, güven skoru ve skorlarıyla birlikte tüm maç geçmişi yer alıyor.",
      ],
    },
    features: {
      en: ["Match creation & joining", "Elo rating per sport", "Leaderboard & challenges", "Match history", "Maps & weather"],
      tr: ["Maç oluşturma ve katılma", "Spor bazında Elo puanı", "Sıralama ve meydan okumalar", "Maç geçmişi", "Harita ve hava durumu"],
    },
    stack: ["React", "React Router", "Firebase Auth", "Cloud Firestore", "Google Maps API", "Google AI Studio"],
    links: { live: "https://spordas.ai.studio" },
    cover: "landscape",
  },
  {
    slug: "rich-blog-post",
    title: "Rich Blog Post",
    category: "Web application",
    summary: {
      en: "A full-stack publishing platform with a rich text editor, author profiles and an admin panel.",
      tr: "Zengin metin editörü, yazar profilleri ve yönetim paneli içeren full-stack bir yayıncılık platformu.",
    },
    description: {
      en: [
        "Rich Blog Post is a multi-author blogging platform. Writers sign in, compose posts in a rich text editor, edit them later and manage their public profile.",
        "Posts are organised by category and tag, and an admin area lets moderators manage users, categories and tags. The client is built with Next.js on top of a Node.js and Express API backed by MongoDB, with token-based authentication and media on Google Cloud.",
      ],
      tr: [
        "Rich Blog Post, çok yazarlı bir blog platformu. Yazarlar giriş yapıyor, zengin metin editöründe yazılarını oluşturuyor, sonradan düzenliyor ve herkese açık profillerini yönetiyor.",
        "Yazılar kategori ve etiketlere göre düzenleniyor; yönetim alanında moderatörler kullanıcıları, kategorileri ve etiketleri yönetebiliyor. İstemci, MongoDB destekli bir Node.js ve Express API'si üzerinde Next.js ile geliştirildi; token tabanlı kimlik doğrulama kullanılıyor ve medya dosyaları Google Cloud'da tutuluyor.",
      ],
    },
    features: {
      en: ["Rich text editor", "Categories & tags", "Author profiles", "Admin dashboard", "JWT authentication"],
      tr: ["Zengin metin editörü", "Kategoriler ve etiketler", "Yazar profilleri", "Yönetim paneli", "JWT kimlik doğrulama"],
    },
    stack: ["Next.js", "Node.js", "Express", "MongoDB", "JSON Web Token", "Google Cloud"],
    links: {
      live: "https://blog-post-client.vercel.app/",
      source: "https://github.com/erhanyaylali1/blog-post-client",
    },
    cover: "portrait",
  },
  {
    slug: "civil-defense-ukraine",
    title: "Civil Defence Ukraine",
    category: "UI design",
    summary: {
      en: "A website design in Figma for a humanitarian initiative, built around a clear donation call to action.",
      tr: "Bir insani yardım girişimi için, net bir bağış çağrısı etrafında kurgulanmış ve Figma'da hazırlanmış bir web sitesi tasarımı.",
    },
    description: {
      en: [
        "A design concept for a Civil Defence Ukraine website, produced as an interactive Figma prototype.",
        "The layout leads with a single, unmistakable donation call to action and supporting QR payment, followed by about and contact pages that keep the content calm and easy to scan.",
      ],
      tr: [
        "Civil Defence Ukraine web sitesi için interaktif bir Figma prototipi olarak hazırlanmış bir tasarım konsepti.",
        "Sayfa düzeni, tek ve net bir bağış çağrısı ile onu destekleyen QR ödeme seçeneğiyle açılıyor; ardından içeriği sakin ve kolay taranabilir tutan hakkımızda ve iletişim sayfaları geliyor.",
      ],
    },
    features: {
      en: ["Interactive prototype", "Donation flow", "About & contact pages"],
      tr: ["İnteraktif prototip", "Bağış akışı", "Hakkımızda ve iletişim sayfaları"],
    },
    stack: ["Figma"],
    links: {
      prototype:
        "https://www.figma.com/proto/Fl8NMovelipgIPGF3zz2FK/Civil-Defence-Ukraine?node-id=2-6&t=rftKaxqOcJzKUKW9-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=2%3A6",
    },
    cover: "portrait",
  },
  {
    slug: "e-wallet",
    title: "E-Wallet",
    category: "Mobile-first web app",
    summary: {
      en: "A personal portfolio tracker for crypto, currencies and gold with live prices and chart breakdowns.",
      tr: "Kripto para, döviz ve altın için canlı fiyatlar ve grafik dağılımları sunan kişisel bir portföy takip uygulaması.",
    },
    description: {
      en: [
        "E-Wallet tracks a personal portfolio of assets such as BTC, ETH, USD and gold. Each holding shows its current price, daily change and total value.",
        "Allocations can be explored as pie, bar or line charts. Users can add, edit and delete assets, and the whole interface is available in Turkish and English. The backend is a Node.js and Express API with Sequelize on MySQL and hashed, token-based authentication.",
      ],
      tr: [
        "E-Wallet; BTC, ETH, USD ve altın gibi varlıklardan oluşan kişisel bir portföyü takip ediyor. Her varlık için güncel fiyat, günlük değişim ve toplam değer gösteriliyor.",
        "Portföy dağılımı pasta, çubuk veya çizgi grafiklerle incelenebiliyor. Kullanıcılar varlık ekleyip düzenleyebiliyor ve silebiliyor; arayüzün tamamı Türkçe ve İngilizce olarak kullanılabiliyor. Backend, MySQL üzerinde Sequelize kullanan bir Node.js ve Express API'si; parolalar hash'lenerek saklanıyor ve token tabanlı kimlik doğrulama kullanılıyor.",
      ],
    },
    features: {
      en: ["Live asset prices", "Pie, bar & line charts", "Asset management", "Turkish / English"],
      tr: ["Canlı varlık fiyatları", "Pasta, çubuk ve çizgi grafikler", "Varlık yönetimi", "Türkçe / İngilizce"],
    },
    stack: ["React", "Redux", "Material UI", "Ant Design", "Chart.js", "Node.js", "Express", "Sequelize", "MySQL", "bcrypt", "JSON Web Token"],
    links: {
      live: "http://portfolio-wallet.s3-website.eu-north-1.amazonaws.com/",
      source: "https://github.com/erhanyaylali1/wallet-client",
    },
    cover: "portrait",
    mobileScreens: true,
  },
];

export const getProjects = (locale: Locale): Project[] =>
  source.map((p) => ({
    ...p,
    title: tx(p.title, locale),
    summary: p.summary[locale],
    description: p.description[locale],
    features: p.features[locale],
    images: projectImages[p.slug].map((i) => ({ src: i.src, alt: i.alt[locale] })),
  }));

export const getProject = (slug: string, locale: Locale) => getProjects(locale).find((p) => p.slug === slug);
