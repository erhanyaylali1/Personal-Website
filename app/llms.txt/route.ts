import { getEducation } from "@/content/education";
import { getExperience } from "@/content/experience";
import { profile, site, siteUrl } from "@/content/profile";
import { getProjects } from "@/content/projects";
import { getToolkit } from "@/content/toolkit";
import { formatMonth } from "@/lib/format";

// English, like the default site; the Turkish version is linked below.
const projects = getProjects("en");
const experience = getExperience("en");
const education = getEducation("en");
const toolkit = getToolkit("en");

/**
 * /llms.txt — a plain-Markdown summary for AI assistants and AI search (llmstxt.org).
 * Generated from the same content files as the site, so it never drifts.
 */
export function GET() {
  const lines = [
    `# ${profile.name}`,
    "",
    `> ${site.description}`,
    "",
    profile.about.join("\n\n"),
    "",
    `- Role: ${profile.jobTitle} at ${profile.employer}`,
    `- Location: ${profile.location.city}, ${profile.location.country}`,
    `- Email: ${profile.email}`,
    ...profile.socials.map((s) => `- ${s.label}: ${s.href}`),
    `- CV (PDF): ${siteUrl}${profile.cv}`,
    "",
    "## Projects",
    "",
    ...projects.map((p) => `- [${p.title}](${siteUrl}/projects/${p.slug}): ${p.summary} Stack: ${p.stack.join(", ")}.`),
    "",
    "## Experience",
    "",
    ...experience.map(
      (e) => `- ${e.role}, ${e.company} (${e.location}), ${formatMonth(e.start)} – ${e.end ? formatMonth(e.end) : "present"}`,
    ),
    "",
    "## Education",
    "",
    ...education.map((e) => `- ${e.degree}${e.field ? `, ${e.field}` : ""} — ${e.institution} (${e.start}–${e.end})`),
    "",
    "## Skills",
    "",
    ...toolkit.map((g) => `- ${g.title}: ${g.items.map((i) => (i.detail ? `${i.name} (${i.detail})` : i.name)).join(", ")}`),
    "",
    "## Optional",
    "",
    `- [Turkish version of the site (Türkçe)](${siteUrl}/tr)`,
    `- [Privacy policy](${siteUrl}/privacy)`,
    `- [Sitemap](${siteUrl}/sitemap.xml)`,
    "",
  ];
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
