import "server-only";
import { randomUUID } from "node:crypto";
import { BLOG_MEDIA_BUCKET, supabaseAdmin } from "@/lib/supabase/server";
import { EXTENSIONS, type MediaKind } from "./media";
import {
  LOGIN_LOCK_MS,
  LOGIN_MAX_FAILURES,
  firstFreeSlug,
  hashPassword,
  initialPassword,
  preparePost,
  verifyPassword,
} from "./prepare";
import type { Post, PostInput } from "./types";

type Row = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  cover_image: string | null;
  cover_alt: string;
  content_html: string;
  reading_minutes: number;
  status: Post["status"];
  published_at: string | null;
  created_at: string;
  updated_at: string;
  views: number;
};

const toPost = (r: Row): Post => ({
  id: r.id,
  slug: r.slug,
  title: r.title,
  excerpt: r.excerpt,
  coverImage: r.cover_image,
  coverAlt: r.cover_alt,
  contentHtml: r.content_html,
  readingMinutes: r.reading_minutes,
  status: r.status,
  publishedAt: r.published_at,
  createdAt: r.created_at,
  updatedAt: r.updated_at,
  views: r.views,
});

function fail(error: { message: string } | null, what: string): asserts error is null {
  if (error) throw new Error(`Supabase: ${what} — ${error.message}`);
}

const posts = () => supabaseAdmin().from("posts");
const UUID = /^[0-9a-f-]{36}$/i;

// ─── Posts ──────────────────────────────────────────────────────────────────

export async function listPosts(opts: { includeDrafts?: boolean } = {}) {
  let q = posts()
    .select("*")
    .order("published_at", { ascending: false, nullsFirst: true })
    .order("updated_at", { ascending: false });
  if (!opts.includeDrafts) q = q.eq("status", "published");
  const { data, error } = await q;
  fail(error, "posts could not be read");
  return (data as Row[]).map(toPost);
}

export async function findPostBySlug(slug: string) {
  const { data, error } = await posts().select("*").eq("slug", slug).maybeSingle();
  fail(error, "post could not be read");
  return data ? toPost(data as Row) : null;
}

export async function findPostById(id: string) {
  if (!UUID.test(id)) return null;
  const { data, error } = await posts().select("*").eq("id", id).maybeSingle();
  fail(error, "post could not be read");
  return data ? toPost(data as Row) : null;
}

async function freeSlug(base: string, ownId: string | null) {
  const { data, error } = await posts().select("id, slug").or(`slug.eq.${base},slug.like.${base}-%`);
  fail(error, "slug check failed");
  const taken = new Set((data ?? []).filter((r) => r.id !== ownId).map((r) => r.slug as string));
  return firstFreeSlug(base, taken);
}

function toRow(input: PostInput) {
  const p = preparePost(input);
  return {
    p,
    row: {
      title: p.title,
      excerpt: p.excerpt,
      cover_image: p.coverImage,
      cover_alt: p.coverAlt,
      content_html: p.contentHtml,
      reading_minutes: p.readingMinutes,
      status: p.status,
    },
  };
}

export async function insertPost(input: PostInput) {
  const { p, row } = toRow(input);
  const { data, error } = await posts()
    .insert({
      ...row,
      slug: await freeSlug(p.baseSlug, null),
      published_at: p.status === "published" ? new Date().toISOString() : null,
    })
    .select("*")
    .single();
  fail(error, "post could not be saved");
  return toPost(data as Row);
}

export async function updatePost(id: string, input: PostInput) {
  const existing = await findPostById(id);
  if (!existing) return null;
  const { p, row } = toRow(input);
  const { data, error } = await posts()
    .update({
      ...row,
      slug: await freeSlug(p.baseSlug, id),
      published_at: p.status === "published" ? (existing.publishedAt ?? new Date().toISOString()) : null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select("*")
    .single();
  fail(error, "post could not be updated");
  return toPost(data as Row);
}

export async function removePost(id: string) {
  if (!UUID.test(id)) return;
  const { error } = await posts().delete().eq("id", id);
  fail(error, "post could not be deleted");
}

export async function incrementViews(slug: string) {
  const { data, error } = await supabaseAdmin().rpc("increment_post_views", { p_slug: slug });
  fail(error, "view could not be recorded");
  return typeof data === "number" ? data : null;
}

// ─── Settings ───────────────────────────────────────────────────────────────

async function settings(): Promise<{ password_hash: string; session_version: number }> {
  const table = supabaseAdmin().from("admin_settings");
  const { data, error } = await table.select("password_hash, session_version").eq("id", 1).maybeSingle();
  fail(error, "settings could not be read");
  if (data) return data as { password_hash: string; session_version: number };
  // First run: create the row with the initial password (ignore if another request won the race).
  const { error: insertError } = await table.upsert(
    { id: 1, password_hash: hashPassword(initialPassword()) },
    { onConflict: "id", ignoreDuplicates: true },
  );
  fail(insertError, "settings could not be created");
  return settings();
}

export async function checkPassword(password: string) {
  return verifyPassword(password, (await settings()).password_hash);
}

export async function setPassword(password: string) {
  const version = (await settings()).session_version + 1;
  const { error } = await supabaseAdmin()
    .from("admin_settings")
    .update({ password_hash: hashPassword(password), session_version: version })
    .eq("id", 1);
  fail(error, "password could not be updated");
  return version;
}

export async function getSessionVersion() {
  return (await settings()).session_version;
}

// ─── Login attempts ─────────────────────────────────────────────────────────

const attempts = () => supabaseAdmin().from("login_attempts");

export async function getLoginLock(key: string): Promise<Date | null> {
  const { data, error } = await attempts().select("locked_until").eq("key", key).maybeSingle();
  fail(error, "login check failed");
  const until = data?.locked_until ? new Date(data.locked_until) : null;
  return until && until.getTime() > Date.now() ? until : null;
}

export async function recordFailedLogin(key: string) {
  const { data, error } = await attempts().select("failures").eq("key", key).maybeSingle();
  fail(error, "login check failed");
  let failures = (data?.failures ?? 0) + 1;
  let lockedUntil: string | null = null;
  if (failures >= LOGIN_MAX_FAILURES) {
    failures = 0;
    lockedUntil = new Date(Date.now() + LOGIN_LOCK_MS).toISOString();
  }
  const { error: upsertError } = await attempts().upsert({ key, failures, locked_until: lockedUntil });
  fail(upsertError, "login attempt could not be recorded");
  return { remaining: LOGIN_MAX_FAILURES - failures, locked: lockedUntil !== null };
}

export async function clearLoginFailures(key: string) {
  const { error } = await attempts().delete().eq("key", key);
  fail(error, "login attempts could not be cleared");
}

// ─── Media ──────────────────────────────────────────────────────────────────

export type UploadTarget = { method: "signed"; uploadUrl: string; publicUrl: string } | { method: "local"; uploadUrl: string };

/**
 * One-time signed URL so the browser uploads straight to Supabase Storage. Videos can be tens of
 * megabytes — far more than a serverless function accepts in a request body.
 */
export async function createUpload(kind: MediaKind, type: string): Promise<UploadTarget> {
  const now = new Date();
  const path = `${kind}/${now.getUTCFullYear()}/${String(now.getUTCMonth() + 1).padStart(2, "0")}/${randomUUID()}.${EXTENSIONS[type] ?? "bin"}`;
  const bucket = supabaseAdmin().storage.from(BLOG_MEDIA_BUCKET);
  const { data, error } = await bucket.createSignedUploadUrl(path);
  fail(error, "upload URL could not be created");
  return { method: "signed", uploadUrl: data.signedUrl, publicUrl: bucket.getPublicUrl(path).data.publicUrl };
}

/** Not used with Supabase (uploads go straight to Storage); the demo store implements it. */
export async function saveLocalMedia(): Promise<string> {
  throw new Error("Local uploads are only available in demo mode.");
}

export async function readLocalMedia(): Promise<{ type: string; data: Buffer } | null> {
  return null;
}
