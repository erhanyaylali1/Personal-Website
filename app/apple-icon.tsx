import { ImageResponse } from "next/og";
import { BrandMark } from "@/lib/brand-mark";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// iOS applies its own rounded mask, so the background is full-bleed and the glyph sits a bit smaller.
export default function AppleIcon() {
  return new ImageResponse(<BrandMark size={size.width} rounded={false} scale={0.82} />, size);
}
