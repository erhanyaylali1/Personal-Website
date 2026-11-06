"use server";

import { findPostBySlug, incrementViews } from "./store";
import { SLUG_PATTERN } from "./text";

const validSlug = (s: unknown): s is string => typeof s === "string" && SLUG_PATTERN.test(s);

/** Called once per browser session per post from <ViewCounter>. */
export async function recordView(slug: string): Promise<number | null> {
  return validSlug(slug) ? incrementViews(slug) : null;
}

export async function getViews(slug: string): Promise<number | null> {
  if (!validSlug(slug)) return null;
  const post = await findPostBySlug(slug);
  return post?.status === "published" ? post.views : null;
}
