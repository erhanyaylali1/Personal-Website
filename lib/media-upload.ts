import { prepareUpload } from "@/app/admin/actions";
import { baseType, checkMedia, type MediaKind } from "@/lib/blog/media";

/**
 * Uploads a file from the admin editor and returns its public URL.
 * Photos are shrunk in the browser first (a 6 MB phone photo → ~300 KB JPEG); GIFs stay untouched to keep animation.
 * With Supabase the file goes straight to Storage via a one-time signed URL; in demo mode to /api/media.
 */
export async function uploadMedia(
  file: File,
  kind: MediaKind,
  { maxImageSize = 1600, onProgress }: { maxImageSize?: number; onProgress?: (fraction: number) => void } = {},
): Promise<string> {
  const type = baseType(file.type);
  const upload = kind === "image" && type !== "image/gif" ? await downscale(file, maxImageSize) : file;
  const uploadType = baseType(upload.type);
  const problem = checkMedia(kind, uploadType, upload.size);
  if (problem) throw new Error(problem);

  const target = await prepareUpload(kind, uploadType, upload.size);
  if ("error" in target) throw new Error(target.error);

  if (target.method === "signed") {
    const apikey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
    await send(
      "PUT",
      target.uploadUrl,
      upload,
      { "content-type": uploadType, "cache-control": "max-age=31536000", "x-upsert": "false", ...(apikey && { apikey }) },
      onProgress,
    );
    return target.publicUrl;
  }
  const form = new FormData();
  form.append("file", upload);
  form.append("kind", kind);
  const res = JSON.parse(await send("POST", target.uploadUrl, form, {}, onProgress)) as { url?: string; error?: string };
  if (!res.url) throw new Error(res.error ?? "Yükleme başarısız.");
  return res.url;
}

/** XMLHttpRequest rather than fetch: it reports upload progress, which matters for large videos. */
function send(method: string, url: string, body: Blob | FormData, headers: Record<string, string>, onProgress?: (f: number) => void) {
  return new Promise<string>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    for (const [k, v] of Object.entries(headers)) xhr.setRequestHeader(k, v);
    xhr.upload.onprogress = (e) => e.lengthComputable && onProgress?.(e.loaded / e.total);
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) return resolve(xhr.responseText);
      let message = "Yükleme başarısız. Lütfen tekrar deneyin.";
      try {
        message = (JSON.parse(xhr.responseText) as { error?: string; message?: string }).error ?? message;
      } catch {}
      reject(new Error(message));
    };
    xhr.onerror = () => reject(new Error("Bağlantı hatası. İnternet bağlantınızı kontrol edin."));
    xhr.send(body);
  });
}

async function downscale(file: File, maxSize: number, quality = 0.82): Promise<File> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxSize / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Görsel işlenemedi.");
  ctx.fillStyle = "#ffffff"; // flatten transparency for JPEG
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, "image/jpeg", quality));
  if (!blob) throw new Error("Görsel işlenemedi.");
  return new File([blob], file.name.replace(/\.\w+$/, "") + ".jpg", { type: "image/jpeg" });
}
