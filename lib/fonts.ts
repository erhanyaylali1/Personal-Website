import { Geist, Geist_Mono } from "next/font/google";

/** Shared by the site layout (app/[lang]) and the admin layout (app/admin). */
export const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin", "latin-ext"], display: "swap" });
// Mono renders labels, dates and tech names; latin-ext covers Turkish letters such as the "İ" in "İzmir".
// Not preloaded so it doesn't compete with the LCP image. Sans keeps latin-ext too (e.g. "ı" in Yaylalı).
export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  preload: false,
});

export const fontVariables = `${geistSans.variable} ${geistMono.variable}`;
