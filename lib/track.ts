import { readConsent } from "./consent";

/**
 * Custom analytics events, pushed to the GTM dataLayer.
 * Each needs a matching Custom Event trigger + GA4 Event tag in the GTM container.
 */
export type TrackEvent =
  | "email_click" // mailto: link
  | "email_copy" // "Copy email" button
  | "cv_download" // CV PDF link
  | "social_click" // LinkedIn / GitHub profile links
  | "project_click" // project card → case study page
  | "project_link_click" // live site / repo link on a case study page
  | "outbound_click"; // any other external link

type Params = Record<string, string | undefined>;

/** Clicks before consent are dropped rather than queued, so nothing is sent retroactively once GTM loads. */
export function track(event: TrackEvent, params: Params = {}) {
  if (readConsent() !== "granted") return;
  (window.dataLayer ??= []).push({ event, ...params });
}

/** Where on the page a click happened: header, footer, or the enclosing section (e.g. "hero", "contact"). */
function placement(el: Element): string {
  const inMain = el.closest("main");
  if (!inMain && el.closest("header")) return "header";
  if (!inMain && el.closest("footer")) return "footer";
  const section = el.closest("section");
  const name = section?.id || section?.getAttribute("aria-labelledby")?.replace(/-heading$/, "");
  return name || location.pathname;
}

/** Link label without screen-reader-only hints like "(opens in a new tab)". */
function visibleText(a: HTMLAnchorElement): string {
  const clone = a.cloneNode(true) as HTMLElement;
  clone.querySelectorAll(".sr-only").forEach((n) => n.remove());
  return (clone.textContent ?? "").replace(/\s+/g, " ").trim().slice(0, 100);
}

/** Turns a click on any link into the right event. Used as one delegated document listener. */
export function trackLinkClick(e: MouseEvent) {
  if (e.type === "auxclick" && e.button !== 1) return; // count middle-click (open in new tab), ignore right-click
  const a = (e.target as Element | null)?.closest?.("a[href]");
  if (!(a instanceof HTMLAnchorElement)) return;

  const url = new URL(a.href, location.href);
  const base = { placement: placement(a), link_text: visibleText(a) };

  if (url.protocol === "mailto:") return track("email_click", base);
  if (a.hasAttribute("download") || /\.pdf$/i.test(url.pathname)) return track("cv_download", { ...base, file_name: url.pathname.split("/").pop() });

  if (url.origin === location.origin) {
    const slug = url.pathname.match(/^\/projects\/([^/]+)\/?$/)?.[1];
    if (slug && !location.pathname.startsWith(`/projects/${slug}`)) track("project_click", { ...base, project: slug });
    return;
  }

  if (a.relList.contains("me")) return track("social_click", { ...base, platform: url.hostname.replace(/^www\./, "").split(".")[0] });
  const project = location.pathname.match(/^\/projects\/([^/]+)/)?.[1];
  if (project) return track("project_link_click", { ...base, project, link_url: url.href });
  track("outbound_click", { ...base, link_url: url.href });
}
