// Upload rules shared by the editor (client) and the server (validation before issuing an upload URL).
// The Supabase bucket enforces the same types and the 50 MB ceiling (see supabase/schema.sql).

export type MediaKind = "image" | "video" | "audio";

const MB = 1024 * 1024;

export const MEDIA_RULES: Record<MediaKind, { types: string[]; maxBytes: number; accept: string; hint: string }> = {
  image: {
    types: ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"],
    maxBytes: 5 * MB,
    accept: "image/*",
    hint: "JPG, PNG, WebP, GIF · en fazla 5 MB",
  },
  video: {
    types: ["video/mp4", "video/webm", "video/quicktime"],
    maxBytes: 50 * MB,
    accept: "video/mp4,video/webm,video/quicktime",
    hint: "MP4, WebM, MOV · en fazla 50 MB",
  },
  audio: {
    types: ["audio/mpeg", "audio/mp4", "audio/x-m4a", "audio/aac", "audio/ogg", "audio/wav", "audio/x-wav", "audio/webm"],
    maxBytes: 20 * MB,
    accept: "audio/*",
    hint: "MP3, M4A, WAV, OGG, WebM · en fazla 20 MB",
  },
};

export const ALL_MEDIA_TYPES = Object.values(MEDIA_RULES).flatMap((r) => r.types);

/** "audio/webm;codecs=opus" → "audio/webm" */
export const baseType = (type: string) => type.split(";")[0].trim().toLowerCase();

export const EXTENSIONS: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/avif": "avif",
  "video/mp4": "mp4",
  "video/webm": "webm",
  "video/quicktime": "mov",
  "audio/mpeg": "mp3",
  "audio/mp4": "m4a",
  "audio/x-m4a": "m4a",
  "audio/aac": "aac",
  "audio/ogg": "ogg",
  "audio/wav": "wav",
  "audio/x-wav": "wav",
  "audio/webm": "webm",
};

/** Turkish error message, or null when the file is acceptable. */
export function checkMedia(kind: MediaKind, type: string, size: number): string | null {
  const rule = MEDIA_RULES[kind];
  if (!rule.types.includes(baseType(type))) return `Bu dosya türü desteklenmiyor (${rule.hint}).`;
  if (size <= 0) return "Dosya boş görünüyor.";
  if (size > rule.maxBytes) return `Dosya çok büyük (${rule.hint}).`;
  return null;
}
