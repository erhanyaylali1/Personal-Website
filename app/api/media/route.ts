import { NextResponse } from "next/server";
import { hasAdminSession } from "@/lib/auth/dal";
import { baseType, checkMedia, type MediaKind } from "@/lib/blog/media";
import { saveLocalMedia, usingDemoStore } from "@/lib/blog/store";

/**
 * Demo mode only (no Supabase): keeps uploaded media in server memory. With Supabase the browser
 * uploads straight to Storage through a signed URL and never calls this.
 */
export async function POST(request: Request) {
  if (!usingDemoStore) return NextResponse.json({ error: "Not available." }, { status: 404 });
  if (!(await hasAdminSession())) return NextResponse.json({ error: "Oturum gerekli." }, { status: 401 });

  const form = await request.formData();
  const file = form.get("file");
  const kind = String(form.get("kind")) as MediaKind;
  if (!(file instanceof File) || !["image", "video", "audio"].includes(kind)) {
    return NextResponse.json({ error: "Dosya bulunamadı." }, { status: 400 });
  }
  const problem = checkMedia(kind, file.type, file.size);
  if (problem) return NextResponse.json({ error: problem }, { status: 400 });

  const url = await saveLocalMedia(baseType(file.type), Buffer.from(await file.arrayBuffer()));
  return NextResponse.json({ url });
}
