import Link from "next/link";

export const metadata = { title: "Bulunamadı" };

/** Admin 404: e.g. editing a post that was deleted, or a mistyped /admin/… address. */
export default function AdminNotFound() {
  return (
    <main className="flex flex-1 items-center justify-center px-5 py-16">
      <div className="w-full max-w-md rounded-3xl border border-border bg-surface px-6 py-10 text-center sm:px-10">
        <p className="font-mono text-xs tracking-[0.16em] text-fg-subtle uppercase">404</p>
        <h1 className="mt-4 text-[1.75rem] leading-tight font-semibold tracking-tight text-fg">Bulunamadı</h1>
        <p className="mt-2 text-[0.9375rem] text-fg-muted">Aradığınız sayfa ya da yazı mevcut değil. Silinmiş olabilir.</p>
        <Link
          href="/admin/blog"
          className="mt-8 inline-flex h-11 items-center justify-center gap-1.5 rounded-full bg-fg px-5 font-medium text-bg transition-colors duration-150 hover:bg-fg/85"
        >
          <span aria-hidden="true">←</span> Yazılara dön
        </Link>
      </div>
    </main>
  );
}
