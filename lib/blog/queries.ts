import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { findPostBySlug, listPosts } from "./store";
import type { Post, PostSummary } from "./types";

// Public, cached reads. Admin mutations call updateTag(POSTS_TAG) so readers see changes on the next
// request. View counts are deliberately NOT read here — they change on every visit and would defeat the cache.

export const POSTS_TAG = "posts";

export async function getPublishedPosts(): Promise<PostSummary[]> {
  "use cache";
  cacheTag(POSTS_TAG);
  cacheLife("days");
  const posts = await listPosts();
  return posts.map(({ id, slug, title, excerpt, coverImage, coverAlt, readingMinutes, publishedAt }) => ({
    id,
    slug,
    title,
    excerpt,
    coverImage,
    coverAlt,
    readingMinutes,
    publishedAt,
  }));
}

export async function getPublishedPost(slug: string): Promise<Omit<Post, "views"> | null> {
  "use cache";
  cacheTag(POSTS_TAG);
  cacheLife("days");
  const post = await findPostBySlug(slug);
  if (!post || post.status !== "published") return null;
  const rest: Omit<Post, "views"> & { views?: number } = { ...post };
  delete rest.views;
  return rest;
}
