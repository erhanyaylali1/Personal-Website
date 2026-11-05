import type { StaticImageData } from "next/image";
import { education } from "@/content/education";
import { experience } from "@/content/experience";
import { profile, site, siteUrl } from "@/content/profile";
import type { Project } from "@/content/projects";
import { skillNames } from "@/content/toolkit";

/**
 * Structured data. Every page emits one @graph; entities are linked by @id so search
 * engines can merge them into a single picture of the person, the site and the work.
 */
export const personId = `${siteUrl}/#person`;
export const websiteId = `${siteUrl}/#website`;
export const projectsListId = `${siteUrl}/projects#list`;

const abs = (path: string) => `${siteUrl}${path}`;
const imageObject = (img: StaticImageData, caption: string) => ({
  "@type": "ImageObject",
  url: abs(img.src),
  contentUrl: abs(img.src),
  width: img.width,
  height: img.height,
  caption,
});

/** Public company websites, used to disambiguate employers and schools. */
const orgUrls: Record<string, string> = {
  Accenture: "https://www.accenture.com",
};

export function personSchema(photo?: StaticImageData) {
  const current = experience.find((e) => e.end === null);
  return {
    "@type": "Person",
    "@id": personId,
    name: profile.name,
    alternateName: profile.alternateName,
    givenName: profile.givenName,
    familyName: profile.familyName,
    jobTitle: profile.jobTitle,
    description: profile.summary,
    url: siteUrl,
    mainEntityOfPage: { "@id": `${siteUrl}/#profilepage` },
    email: `mailto:${profile.email}`,
    ...(photo && { image: imageObject(photo, `Portrait of ${profile.name}`) }),
    address: {
      "@type": "PostalAddress",
      addressLocality: profile.location.city,
      addressCountry: profile.location.countryCode,
    },
    birthPlace: { "@type": "Place", name: profile.birthPlace },
    knowsLanguage: [
      { "@type": "Language", name: "Turkish", alternateName: "tr" },
      { "@type": "Language", name: "English", alternateName: "en" },
    ],
    hasOccupation: {
      "@type": "Occupation",
      name: profile.jobTitle,
      occupationLocation: { "@type": "City", name: profile.location.city },
      skills: skillNames.join(", "),
    },
    ...(current && {
      worksFor: {
        "@type": "Organization",
        name: current.company,
        ...(orgUrls[current.company] && { url: orgUrls[current.company] }),
      },
    }),
    alumniOf: education.map((e) => ({
      "@type": "EducationalOrganization",
      name: e.institution,
      ...(e.url && { url: e.url }),
    })),
    knowsAbout: skillNames,
    sameAs: profile.socials.map((s) => s.href),
  };
}

/** Lightweight reference used on pages where the full Person lives elsewhere. */
const personRef = () => ({ "@type": "Person", "@id": personId, name: profile.name, url: siteUrl });

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": websiteId,
    url: siteUrl,
    name: profile.name,
    alternateName: profile.alternateName,
    description: site.description,
    inLanguage: "en",
    publisher: { "@id": personId },
    author: { "@id": personId },
  };
}

export function projectsListSchema(projects: Project[]) {
  return {
    "@type": "ItemList",
    "@id": projectsListId,
    name: `Projects by ${profile.name}`,
    numberOfItems: projects.length,
    itemListElement: projects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: abs(`/projects/${p.slug}`),
      name: p.title,
    })),
  };
}

export function profilePageSchema(photo: StaticImageData, projects: Project[], dateModified: string) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${siteUrl}/#profilepage`,
        url: siteUrl,
        name: site.title,
        description: site.description,
        inLanguage: "en",
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": personId },
        primaryImageOfPage: imageObject(photo, `Portrait of ${profile.name}`),
        hasPart: { "@id": projectsListId },
        dateModified,
      },
      personSchema(photo),
      websiteSchema(),
      projectsListSchema(projects),
    ],
  };
}

const breadcrumb = (id: string, trail: { name: string; path: string }[]) => ({
  "@type": "BreadcrumbList",
  "@id": id,
  itemListElement: trail.map((t, i) => ({ "@type": "ListItem", position: i + 1, name: t.name, item: abs(t.path) })),
});

export function projectsPageSchema(projects: Project[]) {
  const url = abs("/projects");
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#webpage`,
        url,
        name: `Projects — ${profile.name}`,
        inLanguage: "en",
        isPartOf: { "@id": websiteId },
        about: { "@id": personId },
        mainEntity: { "@id": projectsListId },
        breadcrumb: { "@id": `${url}#breadcrumb` },
      },
      projectsListSchema(projects),
      breadcrumb(`${url}#breadcrumb`, [
        { name: "Home", path: "/" },
        { name: "Projects", path: "/projects" },
      ]),
      personRef(),
      { "@type": "WebSite", "@id": websiteId, url: siteUrl, name: profile.name },
    ],
  };
}

export function projectSchema(project: Project) {
  const url = abs(`/projects/${project.slug}`);
  const isApp = project.category === "Web application" || project.category === "Mobile-first web app";
  const cover = project.images[0];
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: `${project.title} — ${project.category}`,
        description: project.summary,
        inLanguage: "en",
        isPartOf: { "@id": websiteId },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        primaryImageOfPage: imageObject(cover.src, cover.alt),
        mainEntity: { "@id": `${url}#work` },
      },
      {
        "@type": isApp ? "SoftwareApplication" : "CreativeWork",
        "@id": `${url}#work`,
        name: project.title,
        description: project.description.join(" "),
        abstract: project.summary,
        url,
        mainEntityOfPage: { "@id": `${url}#webpage` },
        image: project.images.slice(0, 4).map((i) => imageObject(i.src, i.alt)),
        author: { "@id": personId },
        creator: { "@id": personId },
        keywords: [...project.stack, ...project.features].join(", "),
        ...(isApp && {
          applicationCategory: "WebApplication",
          operatingSystem: "Web browser",
        }),
        sameAs: Object.values(project.links),
      },
      breadcrumb(`${url}#breadcrumb`, [
        { name: "Home", path: "/" },
        { name: "Projects", path: "/projects" },
        { name: project.title, path: `/projects/${project.slug}` },
      ]),
      personRef(),
      { "@type": "WebSite", "@id": websiteId, url: siteUrl, name: profile.name },
    ],
  };
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
