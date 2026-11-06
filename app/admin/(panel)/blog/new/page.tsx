import Link from "next/link";
import { PostEditor } from "@/components/admin/post-editor";
import { requireAdmin } from "@/lib/auth/dal";

export const metadata = { title: "Yeni yazı" };

export default async function NewPostPage() {
  await requireAdmin();
  return (
    <>
      <Link href="/admin/blog" className="inline-flex min-h-10 items-center gap-1.5 text-sm text-fg-muted transition-colors duration-150 hover:text-fg">
        <span aria-hidden="true">←</span> Yazılar
      </Link>
      <div className="mt-4">
        <PostEditor />
      </div>
    </>
  );
}
