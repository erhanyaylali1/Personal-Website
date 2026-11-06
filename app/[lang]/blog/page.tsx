import type { Metadata } from "next";
import { PostCard } from "@/components/blog/post-card";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { getProfile, siteUrl } from "@/content/profile";
import { ui } from "@/content/ui";
import { getPublishedPosts } from "@/lib/blog/queries";
import { languageAlternates, localePath } from "@/lib/i18n";
import { JsonLd, personId, websiteId } from "@/lib/jsonld";
import { getLocale } from "@/lib/locale";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = ui[locale].blog;
  const alternates = languageAlternates(locale, "/blog");
  return {
    title: t.label,
    description: t.description,
    alternates,
    openGraph: { title: `${t.label} · ${getProfile(locale).name}`, description: t.description, url: alternates.canonical },
  };
}

export default async function BlogPage() {
  const locale = await getLocale();
  const t = ui[locale];
  const posts = await getPublishedPosts();
  const [featured, ...rest] = posts;
  const pageUrl = `${siteUrl}${localePath(locale, "/blog")}`.replace(/\/$/, "");

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Blog",
              "@id": `${pageUrl}#blog`,
              url: pageUrl,
              name: `${t.blog.label} — ${getProfile(locale).name}`,
              description: t.blog.description,
              inLanguage: locale,
              isPartOf: { "@id": websiteId },
              author: { "@id": personId },
              blogPost: posts.slice(0, 20).map((p) => ({
                "@type": "BlogPosting",
                headline: p.title,
                url: `${siteUrl}${localePath(locale, `/blog/${p.slug}`)}`,
                datePublished: p.publishedAt,
              })),
            },
          ],
        }}
      />
      <section aria-labelledby="blog-heading" className="pt-10 pb-24 sm:pt-16 sm:pb-32">
        <Container>
          <Breadcrumbs
            className="rise"
            trail={[
              { name: t.breadcrumb.home, href: localePath(locale, "/") },
              { name: t.blog.label, href: localePath(locale, "/blog") },
            ]}
          />
          <header className="mt-10 mb-16 max-w-3xl sm:mb-20">
            <p className="rise font-mono text-xs tracking-[0.14em] text-fg-subtle uppercase" style={{ ["--i" as string]: 1 }}>
              {t.blog.label}
            </p>
            <h1 id="blog-heading" className="mt-4 text-display font-semibold text-fg">
              {t.blog.title}
            </h1>
            <p className="rise mt-6 max-w-[58ch] text-lede text-fg-muted" style={{ ["--i" as string]: 3 }}>
              {t.blog.intro}
            </p>
          </header>

          {posts.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-border-strong px-6 py-16 text-center text-fg-muted">{t.blog.empty}</p>
          ) : (
            <>
              <div className="border-t border-border pt-14">
                <PostCard post={featured} locale={locale} featured />
              </div>
              {rest.length > 0 && (
                <div className="mt-16 grid gap-x-10 gap-y-16 border-t border-border pt-14 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((post) => (
                    <PostCard key={post.id} post={post} locale={locale} />
                  ))}
                </div>
              )}
            </>
          )}
        </Container>
      </section>
    </>
  );
}
