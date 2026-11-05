import { profile } from "@/content/profile";
import { ogCard, ogSize } from "@/lib/og";

export const alt = `${profile.name} — ${profile.jobTitle} in ${profile.location.city}`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogCard({
    eyebrow: `${profile.jobTitle} · ${profile.location.city}`,
    title: profile.name,
    subtitle: profile.headline,
    footer: "Portfolio & CV",
  });
}
