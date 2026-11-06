import Image from "next/image";
import { canOptimizeImage } from "@/lib/image-hosts";

type Props = {
  src: string | null;
  alt: string;
  title: string;
  /** Sizing/shape classes for the frame, e.g. "aspect-[3/2] w-full rounded-2xl". */
  className?: string;
  sizes: string;
  /** The page's LCP image: load immediately with high priority. */
  eager?: boolean;
};

export function PostCover({ src, alt, title, className = "", sizes, eager }: Props) {
  if (src) {
    return (
      <div className={`relative overflow-hidden border border-border bg-surface ${className}`}>
        <Image
          src={src}
          alt={alt || title}
          fill
          sizes={sizes}
          // Hosts outside image-hosts.ts (and demo uploads) are shown as-is rather than proxied.
          unoptimized={!canOptimizeImage(src)}
          {...(eager ? { preload: true } : { loading: "lazy" as const })}
          className="object-cover"
        />
      </div>
    );
  }
  // No cover: a quiet typographic tile in the accent tint.
  return (
    <div aria-hidden="true" className={`flex items-end overflow-hidden border border-border bg-accent-soft p-6 ${className}`}>
      <span className="text-[5.5rem] leading-[0.8] font-semibold tracking-tight text-accent opacity-80 select-none">{title.trim().charAt(0)}</span>
    </div>
  );
}
