"use server";

import { updateTag } from "next/cache";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/dal";
import { SESSION_COOKIE, SESSION_TTL_MS, createSessionToken, isSessionSecretConfigured } from "@/lib/auth/session";
import { baseType, checkMedia, type MediaKind } from "@/lib/blog/media";
import { PASSWORD_MAX, PASSWORD_MIN } from "@/lib/blog/prepare";
import { POSTS_TAG } from "@/lib/blog/queries";
import {
  checkPassword,
  clearLoginFailures,
  createUpload,
  getLoginLock,
  getSessionVersion,
  insertPost,
  recordFailedLogin,
  removePost,
  setPassword,
  updatePost,
} from "@/lib/blog/store";
import { countImagesMissingAlt, hasContent } from "@/lib/blog/text";
import type { PostStatus } from "@/lib/blog/types";

export type FormState = { error?: string; ok?: string } | undefined;

// ─── Session ────────────────────────────────────────────────────────────────
// Failed attempts are counted per IP in the database; the IP is locked for 15 minutes after 5 misses.

async function clientKey() {
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "local";
}

async function setSessionCookie(version: number) {
  (await cookies()).set(SESSION_COOKIE, await createSessionToken(version), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_MS / 1000,
  });
}

const isPassword = (v: unknown): v is string => typeof v === "string" && v.length >= PASSWORD_MIN && v.length <= PASSWORD_MAX;

export async function login(_: FormState, formData: FormData): Promise<FormState> {
  if (!isSessionSecretConfigured()) {
    return { error: "Sunucuda ADMIN_SESSION_SECRET ayarlanmamış (en az 32 karakter). Ayarlayıp yeniden dağıtın." };
  }
  const key = await clientKey();
  const lockedUntil = await getLoginLock(key);
  if (lockedUntil) {
    const min = Math.ceil((lockedUntil.getTime() - Date.now()) / 60000);
    return { error: `Çok fazla hatalı deneme. ${min} dakika sonra tekrar deneyin.` };
  }

  const password = formData.get("password");
  if (!isPassword(password) || !(await checkPassword(password))) {
    const { remaining, locked } = await recordFailedLogin(key);
    return {
      error: locked ? "Çok fazla hatalı deneme. 15 dakika sonra tekrar deneyin." : `Şifre hatalı. ${remaining} deneme hakkınız kaldı.`,
    };
  }

  await clearLoginFailures(key);
  await setSessionCookie(await getSessionVersion());
  redirect("/admin/blog");
}

export async function logout() {
  (await cookies()).delete(SESSION_COOKIE);
  redirect("/admin");
}

// ─── Posts ──────────────────────────────────────────────────────────────────

export async function savePost(_: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();

  const str = (k: string) => String(formData.get(k) ?? "");
  const id = str("id");
  const title = str("title").trim();
  const contentHtml = str("contentHtml");
  const status: PostStatus = str("status") === "published" ? "published" : "draft";

  if (!title) return { error: "Başlık boş olamaz." };
  if (title.length > 160) return { error: "Başlık en fazla 160 karakter olabilir." };
  if (status === "published" && !hasContent(contentHtml)) {
    return { error: "Boş bir yazı yayınlanamaz. İçerik ekleyin ya da taslak olarak kaydedin." };
  }

  // Alt text is mandatory for anything that goes public (accessibility + image SEO). Drafts may be incomplete.
  if (status === "published") {
    if (str("coverImage") && !str("coverAlt").trim()) {
      return { error: "Kapak görseli için açıklama (alt metin) girin. Yayınlamak için zorunludur." };
    }
    const missing = countImagesMissingAlt(contentHtml);
    if (missing > 0) {
      return {
        error: `Yazıdaki ${missing} görselin açıklaması (alt metin) eksik. Görsele tıklayıp “Alt metin” alanını doldurun ya da taslak olarak kaydedin.`,
      };
    }
  }

  const input = {
    title,
    slug: str("slug"),
    excerpt: str("excerpt"),
    coverImage: str("coverImage") || null,
    coverAlt: str("coverAlt"),
    contentHtml,
    status,
  };

  const post = id ? await updatePost(id, input) : await insertPost(input);
  if (!post) return { error: "Yazı bulunamadı. Silinmiş olabilir." };

  updateTag(POSTS_TAG);
  redirect(`/admin/blog?saved=${encodeURIComponent(post.title)}`);
}

export async function deletePost(id: string) {
  await requireAdmin();
  await removePost(id);
  updateTag(POSTS_TAG);
}

// ─── Media ──────────────────────────────────────────────────────────────────

/** Validates the file and returns where the browser should upload it (Supabase signed URL or the demo endpoint). */
export async function prepareUpload(kind: MediaKind, type: string, size: number) {
  await requireAdmin();
  if (!["image", "video", "audio"].includes(kind)) return { error: "Geçersiz dosya türü." };
  const problem = checkMedia(kind, type, size);
  if (problem) return { error: problem };
  try {
    return await createUpload(kind, baseType(type));
  } catch (err) {
    console.error(err);
    return { error: "Yükleme başlatılamadı. Lütfen tekrar deneyin." };
  }
}

// ─── Settings ───────────────────────────────────────────────────────────────

export async function changePassword(_: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const current = formData.get("current");
  const next = formData.get("next");
  const confirm = formData.get("confirm");

  if (!isPassword(current) || !(await checkPassword(current))) return { error: "Mevcut şifre hatalı." };
  if (!isPassword(next)) return { error: `Yeni şifre ${PASSWORD_MIN}–${PASSWORD_MAX} karakter olmalı.` };
  if (next !== confirm) return { error: "Yeni şifre ile tekrarı eşleşmiyor." };
  if (next === current) return { error: "Yeni şifre eskisiyle aynı olamaz." };

  // Re-issue this device's cookie; every other device is signed out.
  await setSessionCookie(await setPassword(next));
  return { ok: "Şifre güncellendi. Diğer cihazlardaki oturumlar kapatıldı." };
}
