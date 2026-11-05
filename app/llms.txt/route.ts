import { education } from "@/content/education";
import { experience } from "@/content/experience";
import { profile, site, siteUrl } from "@/content/profile";
import { projects } from "@/content/projects";
import { toolkit } from "@/content/toolkit";
import { formatMonth } from "@/lib/format";

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
    `- [Privacy policy](${siteUrl}/privacy)`,
    `- [Sitemap](${siteUrl}/sitemap.xml)`,
    "",
  ];
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
