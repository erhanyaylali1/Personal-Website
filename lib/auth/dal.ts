import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { getSessionVersion } from "@/lib/blog/store";
import { SESSION_COOKIE, readSessionToken } from "./session";

/** True when the request carries a valid, current admin session. */
export async function hasAdminSession(): Promise<boolean> {
  // Compares against the current time and hits the DB, so it must run per request — never prerendered.
  await connection();
  const version = await readSessionToken((await cookies()).get(SESSION_COOKIE)?.value);
  return version !== null && version === (await getSessionVersion());
}

/** Call at the top of every admin page and Server Action. */
export async function requireAdmin(): Promise<void> {
  if (!(await hasAdminSession())) redirect("/admin");
}
