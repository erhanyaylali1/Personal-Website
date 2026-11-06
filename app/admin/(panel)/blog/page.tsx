/* eslint-disable @next/next/no-img-element -- thumbnails of arbitrary URLs */
import Link from "next/link";
import { DeletePostButton } from "@/components/admin/delete-post-button";
import { Icon } from "@/components/admin/icons";
import { requireAdmin } from "@/lib/auth/dal";
import { listPosts } from "@/lib/blog/store";
import { countImagesMissingAlt, formatNumber, formatPostDate } from "@/lib/blog/text";

export const metadata = { title: "Yazılar" };

const iconLink =
  "inline-flex size-9 items-center justify-center rounded-lg text-fg-muted transition-colors duration-150 hover:bg-surface hover:text-fg";

export default async function AdminPostsPage({ searchParams }: PageProps<"/admin/blog">) {
  await requireAdmin();
  const posts = await listPosts({ includeDrafts: true });
  const saved = (await searchParams).saved;

  const published = posts.filter((p) => p.status === "published");
  const stats = [
    { label: "Toplam yazı", value: posts.length },
    { label: "Yayında", value: published.length },
    { label: "Taslak", value: posts.length - published.length },
    { label: "Toplam görüntülenme", value: posts.reduce((n, p) => n + p.views, 0) },
  ];

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-h2 font-semibold text-fg">Yazılar</h1>
          <p className="mt-1 text-fg-muted">Blog yazılarını oluşturun, düzenleyin ve yayınlayın.</p>
        </div>
        <Link
          href="/admin/blog/new"
          className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-fg pr-5 pl-4 font-medium text-bg transition-colors duration-150 hover:bg-fg/85"
        >
          <Icon name="plus" className="size-4" />
          Yeni yazı
        </Link>
      </div>

      {typeof saved === "string" && (
        <p role="status" className="mt-6 rounded-xl bg-accent-soft px-4 py-3 text-sm text-fg">
          “{saved}” kaydedildi.
        </p>
      )}

      <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-surface px-5 py-4">
            <dt className="text-sm text-fg-muted">{s.label}</dt>
            <dd className="mt-1 text-[1.75rem] font-semibold text-fg tabular-nums">{formatNumber(s.value)}</dd>
          </div>
        ))}
      </dl>

      {posts.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-border-strong px-6 py-16 text-center">
          <p className="text-xl font-semibold text-fg">Henüz yazı yok</p>
          <p className="mt-1 text-fg-muted">İlk yazınızı oluşturarak başlayın.</p>
        </div>
      ) : (
        <ul className="mt-8 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface">
          {posts.map((p) => {
            const missingAlt = countImagesMissingAlt(p.contentHtml) + (p.coverImage && !p.coverAlt.trim() ? 1 : 0);
            return (
              <li key={p.id} className="flex items-center gap-4 px-4 py-4 sm:px-5">
                {p.coverImage ? (
                  <img src={p.coverImage} alt="" className="hidden h-14 w-20 shrink-0 rounded-lg bg-surface-2 object-cover sm:block" />
                ) : (
                  <span aria-hidden="true" className="hidden h-14 w-20 shrink-0 items-end rounded-lg bg-accent-soft p-2 text-2xl leading-none font-semibold text-accent sm:flex">
                    {p.title.charAt(0)}
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  <Link href={`/admin/blog/${p.id}`} className="block truncate font-medium text-fg decoration-border-strong underline-offset-4 hover:underline">
                    {p.title}
                  </Link>
                  <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-fg-muted">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                        p.status === "published" ? "bg-accent-soft text-fg" : "bg-surface-2 text-fg-muted"
                      }`}
                    >
                      {p.status === "published" ? "Yayında" : "Taslak"}
                    </span>
                    <span>{formatPostDate(p.publishedAt ?? p.updatedAt)}</span>
                    <span aria-hidden="true">·</span>
                    <span>{p.readingMinutes} dk okuma</span>
                    <span aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1 tabular-nums">
                      <Icon name="eye" className="size-3.5" />
                      {formatNumber(p.views)}
                      <span className="sr-only">görüntülenme</span>
                    </span>
                    {missingAlt > 0 && (
                      <Link
                        href={`/admin/blog/${p.id}`}
                        className="inline-flex items-center rounded-full bg-[#d33a2c]/10 px-2 py-0.5 text-xs font-medium text-[#d33a2c]"
                      >
                        {missingAlt} görselde alt metin eksik
                      </Link>
                    )}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-0.5">
                  {p.status === "published" && (
                    <Link
                      href={`/blog/${p.slug}`}
                      target="_blank"
                      title="Sitede gör"
                      aria-label={`“${p.title}” yazısını sitede gör`}
                      className={iconLink}
                    >
                      <Icon name="external" />
                    </Link>
                  )}
                  <Link href={`/admin/blog/${p.id}`} title="Düzenle" aria-label={`“${p.title}” yazısını düzenle`} className={iconLink}>
                    <Icon name="edit" />
                  </Link>
                  <DeletePostButton id={p.id} title={p.title} />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
