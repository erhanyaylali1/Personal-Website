import Link from "next/link";
import { ui } from "@/content/ui";
import type { PostSummary } from "@/lib/blog/types";
import { localePath, type Locale } from "@/lib/i18n";
import { PostCover } from "./post-cover";
import { PostMeta } from "./post-meta";

export function PostCard({ post, locale, featured = false, headingLevel = 2 }: { post: PostSummary; locale: Locale; featured?: boolean; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const t = ui[locale].blog;
  return (
    <article className={`group relative flex flex-col ${featured ? "gap-8 md:grid md:grid-cols-12 md:items-center md:gap-12" : "gap-5"}`}>
      <PostCover
        src={post.coverImage}
        alt={post.coverAlt}
        title={post.title}
        eager={featured}
        sizes={featured ? "(min-width: 1152px) 640px, (min-width: 768px) 56vw, 100vw" : "(min-width: 1152px) 344px, (min-width: 1024px) 30vw, (min-width: 640px) 46vw, 100vw"}
        className={`aspect-[3/2] w-full rounded-2xl transition-[border-color,box-shadow] duration-300 group-hover:border-border-strong group-hover:shadow-(--shadow-lift) ${featured ? "md:col-span-7" : ""}`}
      />
      <div className={featured ? "md:col-span-5" : ""}>
        <PostMeta publishedAt={post.publishedAt} readingMinutes={post.readingMinutes} locale={locale} />
        <Heading
          className={`mt-3 font-semibold tracking-tight text-fg ${featured ? "text-2xl leading-tight md:text-[2.25rem]" : "text-xl leading-snug"}`}
        >
          <Link href={localePath(locale, `/blog/${post.slug}`)} className="after:absolute after:inset-0 after:z-10 focus-visible:outline-none">
            {post.title}
          </Link>
        </Heading>
        <p className={`mt-3 leading-relaxed text-fg-muted ${featured ? "text-[17px]" : "text-[15px]"}`}>
          {post.excerpt}
        </p>
        <p className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-fg">
          {t.readMore}
          <span aria-hidden="true" className="text-accent transition-transform duration-200 group-hover:translate-x-0.5">→</span>
        </p>
      </div>
      <span aria-hidden="true" className="pointer-events-none absolute -inset-2 rounded-3xl ring-2 ring-transparent group-has-[a:focus-visible]:ring-ring" />
    </article>
  );
}
