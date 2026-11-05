import type { MetadataRoute } from "next";
import { profile, site } from "@/content/profile";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.title,
    short_name: profile.alternateName,
    description: site.description,
    start_url: "/",
    scope: "/",
    display: "browser",
    lang: "en",
    categories: ["portfolio", "technology"],
    background_color: "#fafaf8",
    theme_color: "#121317",
    icons: [
      { src: "/icon/192", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon/512", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}
