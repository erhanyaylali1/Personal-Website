import { ImageResponse } from "next/og";
import { BrandMark } from "@/lib/brand-mark";

// Google Search shows a site's favicon only if it's square and a multiple of 48px;
// 192 and 512 are the sizes browsers use when installing the site.
const sizes = [48, 96, 192, 512] as const;

export function generateImageMetadata() {
  return sizes.map((s) => ({ id: String(s), size: { width: s, height: s }, contentType: "image/png" }));
}

export default async function Icon({ id }: { id: Promise<string | number> }) {
  const s = Number(await id);
  return new ImageResponse(<BrandMark size={s} />, { width: s, height: s });
}
