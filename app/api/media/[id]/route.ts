import { connection } from "next/server";
import { readLocalMedia } from "@/lib/blog/store";

/** Demo mode only: serves media uploaded to /api/media, with Range support so audio and video can seek. */
export async function GET(request: Request, { params }: RouteContext<"/api/media/[id]">) {
  await connection();
  const media = await readLocalMedia((await params).id);
  if (!media) return new Response("Not found", { status: 404 });

  const size = media.data.length;
  const headers = { "Content-Type": media.type, "Accept-Ranges": "bytes", "Cache-Control": "private, max-age=3600" };
  const range = request.headers.get("range")?.match(/^bytes=(\d*)-(\d*)$/);
  if (!range) return new Response(new Uint8Array(media.data), { headers: { ...headers, "Content-Length": String(size) } });

  const start = range[1] ? Number(range[1]) : Math.max(0, size - Number(range[2]));
  const end = range[1] && range[2] ? Math.min(Number(range[2]), size - 1) : size - 1;
  if (start > end || start >= size) {
    return new Response(null, { status: 416, headers: { ...headers, "Content-Range": `bytes */${size}` } });
  }
  return new Response(new Uint8Array(media.data.subarray(start, end + 1)), {
    status: 206,
    headers: { ...headers, "Content-Range": `bytes ${start}-${end}/${size}`, "Content-Length": String(end - start + 1) },
  });
}
