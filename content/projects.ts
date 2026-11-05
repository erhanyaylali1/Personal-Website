import { projectImages, type ProjectImage } from "./project-images";
import type { ProjectSlug } from "./project-slugs";

export type Project = {
  slug: ProjectSlug;
  title: string;
  category: "Website" | "Web application" | "Mobile-first web app" | "UI design";
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

const make = (p: Omit<Project, "images">): Project => ({
  ...p,
  images: projectImages[p.slug],
});

export const projects: Project[] = [
  make({
    slug: "reyhan-eren",
    title: "Reyhan Eren Family Counselling",
    category: "Website",
    summary:
      "A calm, SEO-first website for a family counsellor in İzmir, with service pages, a blog and online appointment booking.",
    description: [
      "A production website for Reyhan Eren, a family and couples counsellor based in Bayraklı, İzmir, who also works online across Turkey. The design is deliberately quiet: warm neutrals, a single green accent and serif headlines, so visitors feel safe before they ever book a session.",
      "Built for local search from the ground up. Each service has its own page, FAQs and clear calls to action, and the site ships LocalBusiness, Person and FAQPage structured data, a sitemap and generated social images. Visitors can request an appointment through a form or reach out directly on WhatsApp, and a blog covers topics from healthy boundaries to helping children through divorce.",
    ],
    features: ["Local SEO & structured data", "Service pages", "Appointment booking", "Blog", "WhatsApp contact"],
    stack: ["Next.js", "React", "Tailwind CSS", "EmailJS", "Google Tag Manager", "Netlify"],
    links: { live: "https://reyhaneren.com.tr" },
    cover: "landscape",
  }),
  make({
    slug: "erhan-oyunlari",
    title: "Erhan Oyunları",
    category: "Web application",
    summary:
      "A real-time multiplayer platform with 14 board, card and party games — create a room, share the code and play with friends or bots.",
    description: [
      "Erhan Oyunları is a game night in the browser. It hosts 14 games across three groups: two-player strategy games like Quoridor and Karakum, four-player card and tile games like King, 101 Okey, Sequence and Azul, and party games like Codenames, Tabu, Charades and Çiz Bakalım.",
      "Every game runs in real time over WebSockets. A host creates a room, friends join from their own phones with a short room code, and empty seats can be filled with bots, so a match can start even with one player. Games include in-game chat, turn timers and rules screens, and in Çiz Bakalım every brush stroke is streamed live to the other players. The site is installable as a PWA.",
    ],
    features: ["14 multiplayer games", "Room codes", "Bots for empty seats", "Live drawing & chat", "Installable PWA"],
    stack: ["React", "Vite", "Tailwind CSS", "Socket.IO", "Node.js", "Express", "Canvas API", "PWA", "Google AI Studio"],
    links: { live: "https://erhan-oyunlar.ai.studio" },
    cover: "landscape",
  }),
  make({
    slug: "spordas",
    title: "Spordaş",
    category: "Web application",
    summary:
      "A multi-sport community app for creating and joining local matches, with Elo rankings and match history.",
    description: [
      "Spordaş brings amateur athletes together. Players create matches for tennis, volleyball, football, basketball, padel, running and more, then browse what's happening nearby and join with one tap. Each match shows its location on a map, the weather at kick-off and how many spots are left.",
      "Matches are either social or ranked. Ranked results feed an Elo rating per sport and an overall leaderboard, and players can challenge each other directly. Profiles show recent form, win rate, per-sport ratings, a trust score and the full match history with scores.",
    ],
    features: ["Match creation & joining", "Elo rating per sport", "Leaderboard & challenges", "Match history", "Maps & weather"],
    stack: ["React", "React Router", "Firebase Auth", "Cloud Firestore", "Google Maps API", "Google AI Studio"],
    links: { live: "https://spordas.ai.studio" },
    cover: "landscape",
  }),
  make({
    slug: "rich-blog-post",
    title: "Rich Blog Post",
    category: "Web application",
    summary:
      "A full-stack publishing platform with a rich text editor, author profiles and an admin panel.",
    description: [
      "Rich Blog Post is a multi-author blogging platform. Writers sign in, compose posts in a rich text editor, edit them later and manage their public profile.",
      "Posts are organised by category and tag, and an admin area lets moderators manage users, categories and tags. The client is built with Next.js on top of a Node.js and Express API backed by MongoDB, with token-based authentication and media on Google Cloud.",
    ],
    features: ["Rich text editor", "Categories & tags", "Author profiles", "Admin dashboard", "JWT authentication"],
    stack: ["Next.js", "Node.js", "Express", "MongoDB", "JSON Web Token", "Google Cloud"],
    links: {
      live: "https://blog-post-client.vercel.app/",
      source: "https://github.com/erhanyaylali1/blog-post-client",
    },
    cover: "portrait",
  }),
  make({
    slug: "civil-defense-ukraine",
    title: "Civil Defence Ukraine",
    category: "UI design",
    summary:
      "A website design in Figma for a humanitarian initiative, built around a clear donation call to action.",
    description: [
      "A design concept for a Civil Defence Ukraine website, produced as an interactive Figma prototype.",
      "The layout leads with a single, unmistakable donation call to action and supporting QR payment, followed by about and contact pages that keep the content calm and easy to scan.",
    ],
    features: ["Interactive prototype", "Donation flow", "About & contact pages"],
    stack: ["Figma"],
    links: {
      prototype:
        "https://www.figma.com/proto/Fl8NMovelipgIPGF3zz2FK/Civil-Defence-Ukraine?node-id=2-6&t=rftKaxqOcJzKUKW9-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=2%3A6",
    },
    cover: "portrait",
  }),
  make({
    slug: "e-wallet",
    title: "E-Wallet",
    category: "Mobile-first web app",
    summary:
      "A personal portfolio tracker for crypto, currencies and gold with live prices and chart breakdowns.",
    description: [
      "E-Wallet tracks a personal portfolio of assets such as BTC, ETH, USD and gold. Each holding shows its current price, daily change and total value.",
      "Allocations can be explored as pie, bar or line charts. Users can add, edit and delete assets, and the whole interface is available in Turkish and English. The backend is a Node.js and Express API with Sequelize on MySQL and hashed, token-based authentication.",
    ],
    features: ["Live asset prices", "Pie, bar & line charts", "Asset management", "Turkish / English"],
    stack: ["React", "Redux", "Material UI", "Ant Design", "Chart.js", "Node.js", "Express", "Sequelize", "MySQL", "bcrypt", "JSON Web Token"],
    links: {
      live: "http://portfolio-wallet.s3-website.eu-north-1.amazonaws.com/",
      source: "https://github.com/erhanyaylali1/wallet-client",
    },
    cover: "portrait",
    mobileScreens: true,
  }),
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
