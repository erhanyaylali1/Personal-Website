import me from "@/assets/me.jpg";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { projects } from "@/content/projects";
import { getBuildDate } from "@/lib/build-date";
import { JsonLd, profilePageSchema } from "@/lib/jsonld";

export default async function Home() {
  return (
    <>
      <JsonLd data={profilePageSchema(me, projects, await getBuildDate())} />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Contact />
    </>
  );
}
