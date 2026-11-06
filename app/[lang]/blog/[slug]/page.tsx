import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import me from "@/assets/me.jpg";
import { PostCard } from "@/components/blog/post-card";
import { PostCover } from "@/components/blog/post-cover";
import { PostMeta } from "@/components/blog/post-meta";
import { ReadingProgress } from "@/components/blog/reading-progress";
import { ShareButtons } from "@/components/blog/share-buttons";
import { ViewCounter } from "@/components/blog/view-counter";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { getProfile, siteUrl } from "@/content/profile";
import { ui } from "@/content/ui";
import { getPublishedPost, getPublishedPosts } from "@/lib/blog/queries";
import { optimizeContentImages } from "@/lib/blog/render";
import { languageAlternates, localePath } from "@/lib/i18n";
import { JsonLd, personId, websiteId } from "@/lib/jsonld";
import { getLocale } from "@/lib/locale";

// Known posts are prerendered; posts published later render on first visit and are then cached.
export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  // Cache Components needs at least one value; the placeholder simply 404s.
  return posts.length ? posts.map((p) => ({ slug: p.slug })) : [{ slug: "__none__" }];
}

export async function generateMetadata({ params }: PageProps<"/[lang]/blog/[slug]">): Promise<Metadata> {
  const post = await getPublishedPost((await params).slug);
  const locale = await getLocale();
  if (!post) return { title: ui[locale].notFound.title, robots: { index: false } };
  // The same post is served in both interfaces (/blog/… and /tr/blog/…); only the menus and labels are
  // translated. hreflang links the two, which Google recommends when just the template is localized.
  const alternates = languageAlternates(locale, `/blog/${post.slug}`);
  const path = alternates.canonical;
  return {
    title: post.title,
    description: post.excerpt,
    alternates,
    openGraph: {
      type: "article",
      url: path,
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt ?? undefined,
      modifiedTime: post.updatedAt,
      authors: [siteUrl],
      ...(post.coverImage?.startsWith("http") && { images: [{ url: post.coverImage, alt: post.coverAlt || post.title }] }),
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.excerpt },
  };
}

export default async function PostPage({ params }: PageProps<"/[lang]/blog/[slug]">) {
  const { slug } = await params;
  const locale = await getLocale();
  const post = await getPublishedPost(slug);
  if (!post) notFound();

  const t = ui[locale];
  const profile = getProfile(locale);
  const path = localePath(locale, `/blog/${post.slug}`);
  const url = `${siteUrl}${path}`;
  const others = (await getPublishedPosts()).filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BlogPosting",
              "@id": `${url}#post`,
              headline: post.title,
              description: post.excerpt,
              datePublished: post.publishedAt,
              dateModified: post.updatedAt,
              timeRequired: `PT${post.readingMinutes}M`,
              url,
              mainEntityOfPage: url,
              ...(post.coverImage && { image: post.coverImage }),
              author: { "@id": personId },
              publisher: { "@id": personId },
              isPartOf: { "@id": `${siteUrl}${localePath(locale, "/blog")}`.replace(/\/$/, "") + "#blog" },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: t.breadcrumb.home, item: `${siteUrl}${localePath(locale, "/")}`.replace(/\/$/, "") },
                { "@type": "ListItem", position: 2, name: t.blog.label, item: `${siteUrl}${localePath(locale, "/blog")}` },
                { "@type": "ListItem", position: 3, name: post.title, item: url },
              ],
            },
            { "@type": "Person", "@id": personId, name: profile.name, url: siteUrl },
            { "@type": "WebSite", "@id": websiteId, url: siteUrl, name: profile.name },
          ],
        }}
      />
      <ReadingProgress targetId="post-content" />
      <article className="pt-10 pb-20 sm:pt-16 md:pb-28">
        <header className="mx-auto max-w-3xl px-5 sm:px-8">
          <Breadcrumbs
            trail={[
              { name: t.breadcrumb.home, href: localePath(locale, "/") },
              { name: t.blog.label, href: localePath(locale, "/blog") },
              { name: post.title, href: path },
            ]}
          />
          <h1 className="mt-8 text-[clamp(2.25rem,1.6rem+2.6vw,3.5rem)] leading-[1.06] font-semibold tracking-[-0.03em] text-fg">{post.title}</h1>
          {post.excerpt && <p className="mt-6 text-lede text-fg-muted">{post.excerpt}</p>}
          <div className="mt-8 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3.5">
              <Image src={me} alt="" sizes="44px" className="size-11 shrink-0 rounded-full object-cover object-top" />
              <div>
                <p className="text-sm font-medium text-fg">{profile.name}</p>
                <PostMeta publishedAt={post.publishedAt} readingMinutes={post.readingMinutes} locale={locale}>
                  <ViewCounter slug={post.slug} />
                </PostMeta>
              </div>
            </div>
            <div className="-mx-2.5 sm:mx-0">
              <ShareButtons url={url} title={post.title} />
            </div>
          </div>
        </header>

        {post.coverImage && (
          <div className="mx-auto mt-12 max-w-5xl px-5 sm:px-8">
            <PostCover
              src={post.coverImage}
              alt={post.coverAlt}
              title={post.title}
              eager
              sizes="(min-width: 1024px) 960px, 100vw"
              className="aspect-[16/9] w-full rounded-2xl md:rounded-3xl"
            />
          </div>
        )}

        <div
          id="post-content"
          className="prose-blog mx-auto mt-12 max-w-3xl px-5 sm:px-8 md:mt-14"
          dangerouslySetInnerHTML={{ __html: optimizeContentImages(post.contentHtml) }}
        />

        <div className="mx-auto mt-14 max-w-3xl px-5 sm:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-y border-border py-6">
            <p className="font-medium text-fg">{t.blog.share}</p>
            <ShareButtons url={url} title={post.title} />
          </div>
        </div>
      </article>

      {others.length > 0 && (
        <aside aria-labelledby="more-posts" className="border-t border-border py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <h2 id="more-posts" className="font-mono text-xs tracking-[0.16em] text-fg-subtle uppercase">
              {t.blog.morePosts}
            </h2>
            <div className="mt-10 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((p) => (
                <PostCard key={p.id} post={p} locale={locale} headingLevel={3} />
              ))}
            </div>
          </div>
        </aside>
      )}
    </>
  );
}
