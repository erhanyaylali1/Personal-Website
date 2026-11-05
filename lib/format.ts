const monthFmt = new Intl.DateTimeFormat("en", { month: "short", year: "numeric", timeZone: "UTC" });

/** "2024-12" → "Dec 2024" */
export function formatMonth(ym: string) {
  const [y, m] = ym.split("-").map(Number);
  return monthFmt.format(new Date(Date.UTC(y, (m ?? 1) - 1, 1)));
}

/** Human duration between two "YYYY-MM" values, inclusive of the start month. */
export function formatDuration(start: string, end: string | null, now: Date) {
  const [sy, sm] = start.split("-").map(Number);
  const [ey, em] = end ? end.split("-").map(Number) : [now.getUTCFullYear(), now.getUTCMonth() + 1];
  const months = Math.max(1, (ey - sy) * 12 + (em - sm));
  const y = Math.floor(months / 12);
  const m = months % 12;
  return [y && `${y} yr${y > 1 ? "s" : ""}`, m && `${m} mo${m > 1 ? "s" : ""}`].filter(Boolean).join(" ");
}
