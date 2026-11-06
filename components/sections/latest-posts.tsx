import Link from "next/link";
import { ui } from "@/content/ui";
import { getPublishedPosts } from "@/lib/blog/queries";
import { localePath } from "@/lib/i18n";
import { getLocale } from "@/lib/locale";
import { PostCard } from "../blog/post-card";
import { ArrowRight } from "../ui/icons";
import { Reveal } from "../ui/reveal";
import { Section } from "../ui/section";

/** Home page teaser: the three newest posts. Rendered only when posts exist. */
export async function LatestPosts() {
  const locale = await getLocale();
  const t = ui[locale].blog;
  const posts = (await getPublishedPosts()).slice(0, 3);

  return (
    <Section id="blog" index="04" label={t.label} title={t.latestTitle} intro={t.latestIntro} className="border-t border-border">
      <ul className="grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, i) => (
          <Reveal as="li" key={post.id} delay={i * 0.06}>
            <PostCard post={post} locale={locale} headingLevel={3} />
          </Reveal>
        ))}
      </ul>
      <Reveal className="mt-14">
        <Link
          href={localePath(locale, "/blog")}
          className="group inline-flex h-11 items-center gap-2 rounded-full border border-border-strong px-5 text-sm font-medium text-fg transition-[background-color,border-color] duration-200 hover:border-fg/40 hover:bg-surface"
        >
          {t.allPosts}
          <ArrowRight className="transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </Reveal>
    </Section>
  );
}
