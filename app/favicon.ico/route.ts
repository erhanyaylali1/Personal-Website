import { ImageResponse } from "next/og";
import { createElement } from "react";
import { BrandMark } from "@/lib/brand-mark";

// Browsers, feed readers and crawlers still request /favicon.ico directly, even though pages link the
// PNG icons from app/icon.tsx. This serves a real multi-size ICO built from the same brand mark, so the
// two always match. Prerendered at build time like the other icons.

const SIZES = [16, 32, 48];

export async function GET() {
  const pngs = await Promise.all(
    SIZES.map(async (s) => new Uint8Array(await new ImageResponse(createElement(BrandMark, { size: s }), { width: s, height: s }).arrayBuffer())),
  );
  return new Response(toIco(pngs, SIZES), {
    headers: { "Content-Type": "image/x-icon", "Cache-Control": "public, max-age=86400" },
  });
}

/** ICO container with PNG-compressed entries (supported by every browser since Windows Vista-era formats). */
function toIco(pngs: Uint8Array[], sizes: number[]) {
  const headerSize = 6 + 16 * pngs.length;
  const out = new Uint8Array(headerSize + pngs.reduce((n, p) => n + p.length, 0));
  const view = new DataView(out.buffer);
  view.setUint16(0, 0, true); // reserved
  view.setUint16(2, 1, true); // type: icon
  view.setUint16(4, pngs.length, true);
  let offset = headerSize;
  pngs.forEach((png, i) => {
    const entry = 6 + 16 * i;
    view.setUint8(entry, sizes[i] >= 256 ? 0 : sizes[i]); // width
    view.setUint8(entry + 1, sizes[i] >= 256 ? 0 : sizes[i]); // height
    view.setUint8(entry + 2, 0); // palette size
    view.setUint8(entry + 3, 0); // reserved
    view.setUint16(entry + 4, 1, true); // color planes
    view.setUint16(entry + 6, 32, true); // bits per pixel
    view.setUint32(entry + 8, png.length, true);
    view.setUint32(entry + 12, offset, true);
    out.set(png, offset);
    offset += png.length;
  });
  return out;
}
