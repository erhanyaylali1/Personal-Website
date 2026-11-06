import me from "@/assets/me.jpg";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { getProjects } from "@/content/projects";
import { getBuildDate } from "@/lib/build-date";
import { JsonLd, profilePageSchema } from "@/lib/jsonld";
import { getLocale } from "@/lib/locale";

export default async function Home() {
  const locale = await getLocale();
  return (
    <>
      <JsonLd data={profilePageSchema(locale, me, getProjects(locale), await getBuildDate())} />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Contact />
    </>
  );
}
