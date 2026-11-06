import "server-only";
import { randomUUID } from "node:crypto";
import type { MediaKind } from "./media";
import {
  LOGIN_LOCK_MS,
  LOGIN_MAX_FAILURES,
  firstFreeSlug,
  hashPassword,
  initialPassword,
  preparePost,
  verifyPassword,
} from "./prepare";
import type { UploadTarget } from "./store-supabase";
import type { Post, PostInput } from "./types";

// In-memory fallback used when Supabase isn't configured (local development).
// Everything — posts, settings and uploaded media — lives until the server restarts.

type Db = {
  posts: Map<string, Post>;
  settings: { passwordHash: string; sessionVersion: number };
  attempts: Map<string, { failures: number; lockedUntil: number }>;
  media: Map<string, { type: string; data: Buffer }>;
};

const g = globalThis as typeof globalThis & { __blogDb?: Db };

function db(): Db {
  g.__blogDb ??= {
    posts: new Map(),
    settings: { passwordHash: hashPassword(initialPassword()), sessionVersion: 1 },
    attempts: new Map(),
    media: new Map(),
  };
  return g.__blogDb;
}

function build(id: string, input: PostInput, existing: Post | null): Post {
  const p = preparePost(input);
  const taken = new Set([...db().posts.values()].filter((x) => x.id !== id).map((x) => x.slug));
  const now = new Date().toISOString();
  return {
    id,
    slug: firstFreeSlug(p.baseSlug, taken),
    title: p.title,
    excerpt: p.excerpt,
    coverImage: p.coverImage,
    coverAlt: p.coverAlt,
    contentHtml: p.contentHtml,
    readingMinutes: p.readingMinutes,
    status: p.status,
    publishedAt: p.status === "published" ? (existing?.publishedAt ?? now) : null,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
    views: existing?.views ?? 0,
  };
}

const byNewest = (a: Post, b: Post) => (b.publishedAt ?? b.updatedAt).localeCompare(a.publishedAt ?? a.updatedAt);

export async function listPosts(opts: { includeDrafts?: boolean } = {}) {
  return [...db().posts.values()]
    .filter((p) => opts.includeDrafts || p.status === "published")
    .sort(byNewest)
    .map((p) => ({ ...p }));
}

export async function findPostBySlug(slug: string) {
  const post = [...db().posts.values()].find((p) => p.slug === slug);
  return post ? { ...post } : null;
}

export async function findPostById(id: string) {
  const post = db().posts.get(id);
  return post ? { ...post } : null;
}

export async function insertPost(input: PostInput) {
  const post = build(randomUUID(), input, null);
  db().posts.set(post.id, post);
  return { ...post };
}

export async function updatePost(id: string, input: PostInput) {
  const existing = db().posts.get(id);
  if (!existing) return null;
  const post = build(id, input, existing);
  db().posts.set(id, post);
  return { ...post };
}

export async function removePost(id: string) {
  db().posts.delete(id);
}

export async function incrementViews(slug: string) {
  const post = [...db().posts.values()].find((p) => p.slug === slug && p.status === "published");
  if (!post) return null;
  post.views += 1;
  return post.views;
}

export async function checkPassword(password: string) {
  return verifyPassword(password, db().settings.passwordHash);
}

export async function setPassword(password: string) {
  const { settings } = db();
  settings.passwordHash = hashPassword(password);
  settings.sessionVersion += 1;
  return settings.sessionVersion;
}

export async function getSessionVersion() {
  return db().settings.sessionVersion;
}

export async function getLoginLock(key: string): Promise<Date | null> {
  const a = db().attempts.get(key);
  return a && a.lockedUntil > Date.now() ? new Date(a.lockedUntil) : null;
}

export async function recordFailedLogin(key: string) {
  const a = db().attempts.get(key) ?? { failures: 0, lockedUntil: 0 };
  a.failures += 1;
  if (a.failures >= LOGIN_MAX_FAILURES) {
    a.failures = 0;
    a.lockedUntil = Date.now() + LOGIN_LOCK_MS;
  }
  db().attempts.set(key, a);
  return { remaining: LOGIN_MAX_FAILURES - a.failures, locked: a.lockedUntil > Date.now() };
}

export async function clearLoginFailures(key: string) {
  db().attempts.delete(key);
}

/** Demo: the browser posts the file to /api/media, which keeps it in memory. */
export async function createUpload(...[]: [MediaKind, string]): Promise<UploadTarget> {
  return { method: "local", uploadUrl: "/api/media" };
}

export async function saveLocalMedia(type: string, data: Buffer): Promise<string> {
  const id = randomUUID();
  db().media.set(id, { type, data });
  return `/api/media/${id}`;
}

export async function readLocalMedia(id: string) {
  return db().media.get(id) ?? null;
}
