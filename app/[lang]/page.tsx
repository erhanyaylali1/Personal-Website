import me from "@/assets/me.jpg";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { LatestPosts } from "@/components/sections/latest-posts";
import { Projects } from "@/components/sections/projects";
import { getProjects } from "@/content/projects";
import { getPublishedPosts } from "@/lib/blog/queries";
import { getBuildDate } from "@/lib/build-date";
import { JsonLd, profilePageSchema } from "@/lib/jsonld";
import { getLocale } from "@/lib/locale";

export default async function Home() {
  const locale = await getLocale();
  // The blog section only appears once something is published — no empty "coming soon" on the home page.
  const hasPosts = (await getPublishedPosts()).length > 0;
  return (
    <>
      <JsonLd data={profilePageSchema(locale, me, getProjects(locale), await getBuildDate())} />
      <Hero />
      <About />
      <Experience />
      <Projects />
      {hasPosts && <LatestPosts />}
      <Contact index={hasPosts ? "05" : "04"} />
    </>
  );
}
