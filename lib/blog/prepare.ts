import "server-only";
import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { sanitizePostHtml } from "./sanitize";
import { makeExcerpt, readingMinutes, slugify } from "./text";
import type { PostInput } from "./types";

// Backend-agnostic rules shared by every store implementation.

export function preparePost(input: PostInput) {
  const contentHtml = sanitizePostHtml(input.contentHtml);
  return {
    baseSlug: slugify(input.slug || input.title) || "post",
    title: input.title.trim(),
    excerpt: input.excerpt.trim() || makeExcerpt(contentHtml),
    coverImage: input.coverImage,
    coverAlt: input.coverAlt.trim(),
    contentHtml,
    readingMinutes: readingMinutes(contentHtml),
    status: input.status,
  };
}

/** First free slug: base, base-2, base-3 … */
export function firstFreeSlug(base: string, taken: Set<string>): string {
  let slug = base;
  for (let n = 2; taken.has(slug); n++) slug = `${base}-${n}`;
  return slug;
}

/** Salted scrypt hash; the password is never stored in plain text. */
export function hashPassword(password: string): string {
  const salt = randomBytes(16);
  return `${salt.toString("hex")}:${scryptSync(password, salt, 32).toString("hex")}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const candidate = scryptSync(password, Buffer.from(salt, "hex"), 32);
  const expected = Buffer.from(hash, "hex");
  return candidate.length === expected.length && timingSafeEqual(candidate, expected);
}

/** Used only to create the settings row the very first time; change it from the panel afterwards. */
export const initialPassword = () => process.env.ADMIN_PASSWORD || "1234";

export const LOGIN_MAX_FAILURES = 5;
export const LOGIN_LOCK_MS = 15 * 60 * 1000;
export const PASSWORD_MIN = 4;
export const PASSWORD_MAX = 128;
