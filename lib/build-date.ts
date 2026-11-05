/** Timestamp frozen at prerender time, so static pages stay deterministic. */
export async function getBuildDate() {
  "use cache";
  return new Date().toISOString();
}
