import type { StaticImageData } from "next/image";
import { getEducation } from "@/content/education";
import { getExperience } from "@/content/experience";
import { getProfile, getSite, siteUrl } from "@/content/profile";
import type { Project } from "@/content/projects";
import { getSkillNames } from "@/content/toolkit";
import { ui } from "@/content/ui";
import { localePath, type Locale } from "./i18n";

/**
 * Structured data. Every page emits one @graph; entities are linked by @id so search
 * engines can merge them into a single picture of the person, the site and the work.
 * The Person and WebSite are shared across languages; pages and lists get one @id per language.
 */
export const personId = `${siteUrl}/#person`;
export const websiteId = `${siteUrl}/#website`;

const abs = (path: string) => `${siteUrl}${path}`;
/** Absolute URL of a locale-neutral path in the given language. */
const url = (locale: Locale, path: string) => abs(localePath(locale, path)).replace(/\/$/, "");
// Keeps the original English @id ("…/#profilepage") stable.
const profilePageId = (locale: Locale) => `${abs(localePath(locale, "/"))}#profilepage`;
const projectsListId = (locale: Locale) => `${url(locale, "/projects")}#list`;

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

export function personSchema(locale: Locale, photo?: StaticImageData) {
  const profile = getProfile(locale);
  const current = getExperience(locale).find((e) => e.end === null);
  const skills = getSkillNames(locale);
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
    mainEntityOfPage: { "@id": profilePageId(locale) },
    email: `mailto:${profile.email}`,
    ...(photo && { image: imageObject(photo, ui[locale].hero.portraitAlt) }),
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
      skills: skills.join(", "),
    },
    ...(current && {
      worksFor: {
        "@type": "Organization",
        name: current.company,
        ...(orgUrls[current.company] && { url: orgUrls[current.company] }),
      },
    }),
    alumniOf: getEducation(locale).map((e) => ({
      "@type": "EducationalOrganization",
      name: e.institution,
      ...(e.url && { url: e.url }),
    })),
    knowsAbout: skills,
    sameAs: getProfile(locale).socials.map((s) => s.href),
  };
}

/** Lightweight references used on pages where the full entities live elsewhere. */
const personRef = (locale: Locale) => ({ "@type": "Person", "@id": personId, name: getProfile(locale).name, url: siteUrl });
const websiteRef = (locale: Locale) => ({ "@type": "WebSite", "@id": websiteId, url: siteUrl, name: getProfile(locale).name });

export function websiteSchema(locale: Locale) {
  const profile = getProfile(locale);
  return {
    "@type": "WebSite",
    "@id": websiteId,
    url: siteUrl,
    name: profile.name,
    alternateName: profile.alternateName,
    description: getSite(locale).description,
    inLanguage: ["en", "tr"],
    publisher: { "@id": personId },
    author: { "@id": personId },
  };
}

export function projectsListSchema(locale: Locale, projects: Project[]) {
  return {
    "@type": "ItemList",
    "@id": projectsListId(locale),
    name: ui[locale].projectsPage.listName(getProfile(locale).name),
    numberOfItems: projects.length,
    itemListElement: projects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: url(locale, `/projects/${p.slug}`),
      name: p.title,
    })),
  };
}

export function profilePageSchema(locale: Locale, photo: StaticImageData, projects: Project[], dateModified: string) {
  const site = getSite(locale);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": profilePageId(locale),
        url: url(locale, "/"),
        name: site.title,
        description: site.description,
        inLanguage: locale,
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": personId },
        primaryImageOfPage: imageObject(photo, ui[locale].hero.portraitAlt),
        hasPart: { "@id": projectsListId(locale) },
        dateModified,
      },
      personSchema(locale, photo),
      websiteSchema(locale),
      projectsListSchema(locale, projects),
    ],
  };
}

const breadcrumb = (locale: Locale, id: string, trail: { name: string; path: string }[]) => ({
  "@type": "BreadcrumbList",
  "@id": id,
  itemListElement: trail.map((t, i) => ({ "@type": "ListItem", position: i + 1, name: t.name, item: url(locale, t.path) })),
});

export function projectsPageSchema(locale: Locale, projects: Project[]) {
  const t = ui[locale];
  const pageUrl = url(locale, "/projects");
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: `${t.projectsPage.title} — ${getProfile(locale).name}`,
        inLanguage: locale,
        isPartOf: { "@id": websiteId },
        about: { "@id": personId },
        mainEntity: { "@id": projectsListId(locale) },
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
      },
      projectsListSchema(locale, projects),
      breadcrumb(locale, `${pageUrl}#breadcrumb`, [
        { name: t.breadcrumb.home, path: "/" },
        { name: t.projectsPage.title, path: "/projects" },
      ]),
      personRef(locale),
      websiteRef(locale),
    ],
  };
}

export function projectSchema(locale: Locale, project: Project) {
  const t = ui[locale];
  const pageUrl = url(locale, `/projects/${project.slug}`);
  const isApp = project.category === "Web application" || project.category === "Mobile-first web app";
  const cover = project.images[0];
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: `${project.title} — ${t.projects.categories[project.category]}`,
        description: project.summary,
        inLanguage: locale,
        isPartOf: { "@id": websiteId },
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
        primaryImageOfPage: imageObject(cover.src, cover.alt),
        mainEntity: { "@id": `${pageUrl}#work` },
      },
      {
        "@type": isApp ? "SoftwareApplication" : "CreativeWork",
        "@id": `${pageUrl}#work`,
        name: project.title,
        description: project.description.join(" "),
        abstract: project.summary,
        url: pageUrl,
        inLanguage: locale,
        mainEntityOfPage: { "@id": `${pageUrl}#webpage` },
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
      breadcrumb(locale, `${pageUrl}#breadcrumb`, [
        { name: t.breadcrumb.home, path: "/" },
        { name: t.projectsPage.title, path: "/projects" },
        { name: project.title, path: `/projects/${project.slug}` },
      ]),
      personRef(locale),
      websiteRef(locale),
    ],
  };
}

/** WebPage node for simple pages such as the privacy policy. */
export function simplePageSchema(locale: Locale, path: string, name: string, description: string, dateModified: string) {
  const pageUrl = url(locale, path);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name,
        description,
        inLanguage: locale,
        dateModified,
        isPartOf: { "@id": websiteId },
      },
      websiteRef(locale),
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
