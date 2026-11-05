import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const ogSize = { width: 1200, height: 630 };

const fontDir = join(process.cwd(), "node_modules/geist/dist/fonts");
// Read synchronously at module load: async fs access would opt the route out of prerendering.
const regular = readFileSync(join(fontDir, "geist-sans/Geist-Regular.ttf"));
const semibold = readFileSync(join(fontDir, "geist-sans/Geist-SemiBold.ttf"));
const mono = readFileSync(join(fontDir, "geist-mono/GeistMono-Regular.ttf"));

const c = { bg: "#121317", fg: "#f2f1ee", muted: "#a3a6ae", subtle: "#5d616b", accent: "#5fd3c4", border: "#2a2c33" };

/** Shared, typographic OG card — no imagery, so it reads at thumbnail size. */
export function ogCard({ eyebrow, title, subtitle, footer }: { eyebrow: string; title: string; subtitle: string; footer?: string }) {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: c.bg, color: c.fg, padding: "72px 80px", fontFamily: "Geist" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontFamily: "Geist Mono", fontSize: 22, letterSpacing: "0.14em", textTransform: "uppercase", color: c.muted }}>
          <div style={{ width: 12, height: 12, borderRadius: 999, background: c.accent }} />
          {eyebrow}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: title.length > 18 ? 84 : 104, fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1.02 }}>{title}</div>
          <div style={{ marginTop: 28, fontSize: 34, lineHeight: 1.35, color: c.muted, maxWidth: 940 }}>{subtitle}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", borderTop: `1px solid ${c.border}`, paddingTop: 28, fontFamily: "Geist Mono", fontSize: 22, color: c.subtle }}>
          <span>{footer ?? profile.name}</span>
          <span>erhanyaylali.com.tr</span>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Geist", data: regular, weight: 400, style: "normal" },
        { name: "Geist", data: semibold, weight: 600, style: "normal" },
        { name: "Geist Mono", data: mono, weight: 400, style: "normal" },
      ],
    },
  );
}
