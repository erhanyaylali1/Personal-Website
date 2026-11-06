"use client";

/* eslint-disable @next/next/no-img-element -- previews of arbitrary URLs */

import Link from "next/link";
import { useActionState, useEffect, useMemo, useState } from "react";
import { savePost, type FormState } from "@/app/admin/actions";
import { MEDIA_RULES } from "@/lib/blog/media";
import { countImagesMissingAlt, countWords, htmlToText, readingMinutes, slugify } from "@/lib/blog/text";
import type { Post } from "@/lib/blog/types";
import { uploadMedia } from "@/lib/media-upload";
import { Icon } from "./icons";
import { RichTextEditor } from "./rich-text-editor";

const label = "font-mono text-xs uppercase tracking-[0.14em] text-fg-subtle";
const field =
  "w-full rounded-xl border border-border-strong bg-bg px-3.5 text-[0.9375rem] text-fg placeholder:text-fg-subtle transition-colors duration-150 focus-visible:border-accent";
const card = "rounded-2xl border border-border bg-surface p-5";

export function PostEditor({ post }: { post?: Post }) {
  const [state, action, pending] = useActionState<FormState, FormData>(savePost, undefined);

  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(post));
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [cover, setCover] = useState<string | null>(post?.coverImage ?? null);
  const [coverAlt, setCoverAlt] = useState(post?.coverAlt ?? "");
  const [coverUrl, setCoverUrl] = useState("");
  const [coverProgress, setCoverProgress] = useState<number | null>(null);
  const [coverError, setCoverError] = useState<string | null>(null);
  const [html, setHtml] = useState(post?.contentHtml ?? "");

  const effectiveSlug = slugTouched ? slug : slugify(title);
  const stats = useMemo(
    () => ({ words: countWords(htmlToText(html)), minutes: readingMinutes(html), missingAlt: countImagesMissingAlt(html) }),
    [html],
  );

  // Warn before leaving with unsaved changes.
  const [initial] = useState(() => ({ title, excerpt, cover, coverAlt, html, slug: effectiveSlug }));
  const dirty =
    title !== initial.title ||
    excerpt !== initial.excerpt ||
    cover !== initial.cover ||
    coverAlt !== initial.coverAlt ||
    html !== initial.html ||
    effectiveSlug !== initial.slug;
  useEffect(() => {
    if (!dirty || pending) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty, pending]);

  const isPublished = post?.status === "published";
  const coverBusy = coverProgress !== null;
  const pickCover = async (file: File | undefined) => {
    if (!file) return;
    setCoverProgress(0);
    setCoverError(null);
    try {
      setCover(await uploadMedia(file, "image", { onProgress: setCoverProgress }));
    } catch (err) {
      setCoverError(err instanceof Error ? err.message : "Görsel yüklenemedi.");
    } finally {
      setCoverProgress(null);
    }
  };
  const coverInput = (
    <input
      type="file"
      accept={MEDIA_RULES.image.accept}
      className="sr-only"
      disabled={coverBusy}
      onChange={(e) => {
        const file = e.target.files?.[0];
        e.target.value = "";
        void pickCover(file);
      }}
    />
  );

  return (
    <form action={action} className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-10">
      <input type="hidden" name="id" value={post?.id ?? ""} />
      <input type="hidden" name="contentHtml" value={html} />
      <input type="hidden" name="coverImage" value={cover ?? ""} />
      <input type="hidden" name="slug" value={effectiveSlug} />

      {/* ─── Main column ─── */}
      <div className="min-w-0">
        <label htmlFor="title" className="sr-only">
          Başlık
        </label>
        <textarea
          id="title"
          name="title"
          required
          maxLength={160}
          rows={1}
          value={title}
          onChange={(e) => setTitle(e.target.value.replace(/\n/g, " "))}
          placeholder="Yazının başlığı"
          className="field-sizing-content w-full resize-none bg-transparent text-[2.25rem] leading-[1.15] font-semibold tracking-[-0.025em] text-fg placeholder:text-fg-subtle/60 focus-visible:outline-none sm:text-[2.75rem]"
        />

        <div className="mt-6">
          <RichTextEditor initialHtml={post?.contentHtml ?? ""} onChange={setHtml} />
          <p className="mt-3 flex flex-wrap gap-3 text-sm text-fg-muted">
            <span>{stats.words.toLocaleString("tr-TR")} kelime</span>
            <span aria-hidden="true">·</span>
            <span>Ortalama {stats.minutes} dk okuma</span>
            {stats.missingAlt > 0 && (
              <>
                <span aria-hidden="true">·</span>
                <span className="font-medium text-[#d33a2c]">{stats.missingAlt} görselde alt metin eksik</span>
              </>
            )}
          </p>
        </div>
      </div>

      {/* ─── Sidebar ─── */}
      <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
        <section className={card}>
          <p className={label}>Yayın</p>
          <p className="mt-2 flex items-center gap-2 text-sm text-fg">
            <span aria-hidden="true" className={`size-2 rounded-full ${isPublished ? "bg-accent" : "bg-border-strong"}`} />
            {post ? (isPublished ? "Yayında" : "Taslak") : "Yeni yazı"}
          </p>

          {state?.error && (
            <p role="alert" className="mt-4 rounded-lg bg-[#d33a2c]/10 px-3 py-2.5 text-sm text-[#d33a2c]">
              {state.error}
            </p>
          )}

          <div className="mt-5 flex flex-col gap-2">
            <button
              type="submit"
              name="status"
              value="published"
              disabled={pending || coverBusy}
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-fg px-5 font-medium text-bg transition-colors duration-150 hover:bg-fg/85 disabled:opacity-60"
            >
              {pending ? "Kaydediliyor…" : isPublished ? "Güncelle" : "Yayınla"}
            </button>
            <button
              type="submit"
              name="status"
              value="draft"
              disabled={pending || coverBusy}
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-border-strong px-5 font-medium text-fg transition-colors duration-150 hover:border-fg/40 hover:bg-bg disabled:opacity-60"
            >
              {isPublished ? "Yayından kaldır, taslağa al" : "Taslak olarak kaydet"}
            </button>
            {isPublished && (
              <Link
                href={`/blog/${post.slug}`}
                target="_blank"
                className="mt-1 inline-flex items-center justify-center gap-1.5 text-sm text-fg-muted transition-colors duration-150 hover:text-fg"
              >
                Yazıyı sitede gör <Icon name="external" className="size-3.5" />
              </Link>
            )}
          </div>
        </section>


        <section className={card}>
          <p className={label}>Kapak görseli</p>
          {cover ? (
            <div className="mt-3">
              <img src={cover} alt="" className="aspect-[3/2] w-full rounded-xl bg-surface-2 object-cover" />
              <div className="mt-2 flex gap-2">
                <label className="inline-flex h-9 cursor-pointer items-center rounded-lg px-3 text-sm text-fg-muted transition-colors duration-150 hover:bg-bg hover:text-fg">
                  {coverBusy ? `Yükleniyor… %${Math.round((coverProgress ?? 0) * 100)}` : "Değiştir"}
                  {coverInput}
                </label>
                <button
                  type="button"
                  onClick={() => setCover(null)}
                  className="inline-flex h-9 items-center rounded-lg px-3 text-sm text-fg-muted transition-colors duration-150 hover:bg-[#d33a2c]/10 hover:text-[#d33a2c]"
                >
                  Kaldır
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-3">
              <label className="flex aspect-[3/2] cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-border-strong text-sm text-fg-muted transition-colors duration-150 hover:border-accent hover:text-fg">
                <Icon name="upload" className="size-5" />
                {coverBusy ? `Yükleniyor… %${Math.round((coverProgress ?? 0) * 100)}` : "Görsel yükle"}
                <span className="text-xs">{MEDIA_RULES.image.hint}</span>
                {coverInput}
              </label>
              <div className="mt-2 flex gap-2">
                <input
                  aria-label="Kapak görseli bağlantısı"
                  value={coverUrl}
                  onChange={(e) => setCoverUrl(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.preventDefault();
                  }}
                  placeholder="ya da görsel bağlantısı"
                  inputMode="url"
                  className={`${field} h-9 text-sm`}
                />
                <button
                  type="button"
                  disabled={!/^https?:\/\/\S+$/.test(coverUrl.trim())}
                  onClick={() => {
                    setCover(coverUrl.trim());
                    setCoverUrl("");
                  }}
                  className="inline-flex h-9 shrink-0 items-center rounded-lg bg-fg px-3 text-sm font-medium text-bg transition-colors duration-150 hover:bg-fg/85 disabled:opacity-40"
                >
                  Ekle
                </button>
              </div>
            </div>
          )}
          {coverError && <p className="mt-2 text-sm text-[#d33a2c]">{coverError}</p>}
          <label htmlFor="coverAlt" className="mt-4 block text-sm text-fg">
            Görsel açıklaması (alt metin)
            {cover && <span className="text-[#d33a2c]"> *</span>}
          </label>
          <input
            id="coverAlt"
            name="coverAlt"
            value={coverAlt}
            onChange={(e) => setCoverAlt(e.target.value)}
            placeholder="Örn. Ekranında kod açık bir dizüstü bilgisayar"
            aria-invalid={Boolean(cover) && !coverAlt.trim()}
            aria-describedby="coverAlt-hint"
            className={`${field} mt-1.5 h-10 text-sm aria-invalid:border-[#d33a2c]`}
          />
          <p id="coverAlt-hint" className="mt-1.5 text-xs leading-relaxed text-fg-muted">
            {cover && !coverAlt.trim() ? "Yayınlamak için zorunlu. Görselde ne olduğunu bir cümleyle anlatın." : "Görme engelli okurlar ve Google bu açıklamayı kullanır."}
          </p>
        </section>

        <section className={card}>
          <label htmlFor="excerpt" className={label}>
            Özet
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            rows={4}
            maxLength={260}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Boş bırakırsanız yazının ilk cümlelerinden oluşturulur. Google'da açıklama olarak görünür."
            className={`${field} mt-3 resize-y py-2.5 text-sm leading-relaxed`}
          />
          <p className="mt-1.5 text-right text-xs text-fg-muted tabular-nums">{excerpt.length}/260</p>

          <label htmlFor="slug-input" className={`${label} mt-4 block`}>
            Sayfa adresi
          </label>
          <div className="mt-3 flex items-center rounded-xl border border-border-strong bg-bg pl-3.5 text-sm focus-within:border-accent">
            <span className="shrink-0 text-fg-muted">/blog/</span>
            <input
              id="slug-input"
              value={effectiveSlug}
              onChange={(e) => {
                setSlugTouched(true);
                setSlug(slugify(e.target.value) + (e.target.value.endsWith("-") ? "-" : ""));
              }}
              className="h-10 min-w-0 flex-1 bg-transparent pr-3.5 text-fg focus-visible:outline-none"
              placeholder="yazi-adresi"
            />
          </div>
          {isPublished && effectiveSlug !== post.slug && (
            <p className="mt-1.5 text-xs text-[#d33a2c]">Adres değişirse eski bağlantılar çalışmaz.</p>
          )}
        </section>
      </aside>
    </form>
  );
}
