import "server-only";
import { getImageProps } from "next/image";
import { canOptimizeImage } from "@/lib/image-hosts";

// Post bodies are HTML from the rich text editor, so their <img> tags can't be <Image> components.
// This gives them the same treatment next/image would: a responsive srcset from the image optimizer.

const COLUMN_PX = 704; // .prose-blog text column on desktop

const attr = (attrs: string, name: string) => attrs.match(new RegExp(`\\s${name}="([^"]*)"`))?.[1];
const decode = (s: string) => s.replace(/&amp;/g, "&").replace(/&quot;/g, '"');
const encode = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;");

export function optimizeContentImages(html: string): string {
  return html.replace(/<img\b([^>]*?)\s*\/?>/g, (tag, attrs: string) => {
    const raw = attr(attrs, "src");
    if (!raw) return tag;
    const src = decode(raw);
    if (!canOptimizeImage(src)) return tag;
    // Editor widths are % of the column (data-width); size the srcset to match.
    const pct = Number(attr(attrs, "data-width")) || 100;
    const sizes = `(min-width: 768px) ${Math.round((COLUMN_PX * pct) / 100)}px, 100vw`;
    // width/height only shape the srcset; the real aspect ratio is unknown (CSS keeps height: auto).
    const { props } = getImageProps({ src, alt: "", width: 1600, height: 1000, sizes });
    const rest = attrs.replace(/\s(src|srcset|sizes|width|height)="[^"]*"/g, "");
    return `<img src="${encode(props.src)}" srcset="${encode(props.srcSet ?? "")}" sizes="${sizes}"${rest} />`;
  });
}
