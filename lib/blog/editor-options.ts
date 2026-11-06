// Formatting choices offered by the rich text editor. The sanitizer (sanitize.ts) accepts any
// safe font-family / font-size / color value, so older posts keep their styling if these lists change.

export const FONT_FAMILIES = [
  { label: "Varsayılan", value: "" },
  { label: "Serif", value: "Georgia, 'Times New Roman', serif" },
  { label: "Mono", value: "ui-monospace, Menlo, Consolas, monospace" },
  { label: "Arial", value: "Arial, Helvetica, sans-serif" },
  { label: "Verdana", value: "Verdana, Geneva, sans-serif" },
  { label: "Trebuchet", value: "'Trebuchet MS', sans-serif" },
  { label: "Times New Roman", value: "'Times New Roman', Times, serif" },
  { label: "Courier New", value: "'Courier New', Courier, monospace" },
  { label: "El yazısı", value: "'Brush Script MT', 'Segoe Script', cursive" },
] as const;

export const FONT_SIZES = ["12px", "14px", "16px", "18px", "20px", "24px", "28px", "32px", "40px", "48px"] as const;

/** Mid-tone colors that stay readable on both the light and the dark theme. */
export const TEXT_COLORS = [
  { name: "Turkuaz", value: "#0f8b80" },
  { name: "Mavi", value: "#2f6fd6" },
  { name: "Mor", value: "#7c4dcc" },
  { name: "Pembe", value: "#c4387a" },
  { name: "Kırmızı", value: "#d33a2c" },
  { name: "Turuncu", value: "#d9730d" },
  { name: "Altın", value: "#b8860b" },
  { name: "Yeşil", value: "#2e8b3e" },
  { name: "Gri", value: "#7a7f8a" },
];

/** Light backgrounds; highlighted text is always drawn dark (see .prose-blog mark). */
export const HIGHLIGHTS = [
  { name: "Sarı", value: "#fde68a" },
  { name: "Turuncu", value: "#fed7aa" },
  { name: "Yeşil", value: "#bbf7d0" },
  { name: "Turkuaz", value: "#a5f3fc" },
  { name: "Mavi", value: "#bfdbfe" },
  { name: "Mor", value: "#ddd6fe" },
  { name: "Pembe", value: "#fbcfe8" },
  { name: "Kırmızı", value: "#fecaca" },
];

/** Normalizes a CSS font-family list so editor state can be compared with the options above. */
export const normalizeFontFamily = (v: string | null | undefined) =>
  (v ?? "").replace(/["']/g, "").replace(/\s*,\s*/g, ",").trim().toLowerCase();
