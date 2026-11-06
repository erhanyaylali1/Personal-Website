import Link from "next/link";
import { notFound } from "next/navigation";
import { PostEditor } from "@/components/admin/post-editor";
import { requireAdmin } from "@/lib/auth/dal";
import { findPostById } from "@/lib/blog/store";

export const metadata = { title: "Yazıyı düzenle" };

export default async function EditPostPage({ params }: PageProps<"/admin/blog/[id]">) {
  await requireAdmin();
  const post = await findPostById((await params).id);
  if (!post) notFound();
  return (
    <>
      <Link href="/admin/blog" className="inline-flex min-h-10 items-center gap-1.5 text-sm text-fg-muted transition-colors duration-150 hover:text-fg">
        <span aria-hidden="true">←</span> Yazılar
      </Link>
      <div className="mt-4">
        <PostEditor key={post.updatedAt} post={post} />
      </div>
    </>
  );
}
