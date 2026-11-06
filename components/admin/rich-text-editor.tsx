"use client";

/* eslint-disable @next/next/no-img-element -- previews of freshly uploaded files */

import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import { Color, FontFamily, FontSize, TextStyle } from "@tiptap/extension-text-style";
import Youtube from "@tiptap/extension-youtube";
import { Placeholder } from "@tiptap/extensions";
import { NodeSelection } from "@tiptap/pm/state";
import { EditorContent, useEditor, useEditorState, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useId, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type ReactNode } from "react";
import { FONT_FAMILIES, FONT_SIZES, HIGHLIGHTS, TEXT_COLORS, normalizeFontFamily } from "@/lib/blog/editor-options";
import { MEDIA_RULES, type MediaKind } from "@/lib/blog/media";
import { uploadMedia } from "@/lib/media-upload";
import { Icon, type IconName } from "./icons";
import { AudioNode, ResizableImage, VideoNode } from "./resizable-media";

// ─── Editor ─────────────────────────────────────────────────────────────────

export function RichTextEditor({ initialHtml, onChange }: { initialHtml: string; onChange: (html: string) => void }) {
  const editor = useEditor({
    immediatelyRender: false, // avoid SSR hydration mismatch
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
        link: { openOnClick: false, autolink: true, defaultProtocol: "https" },
      }),
      TextStyle,
      Color,
      FontFamily,
      FontSize,
      Highlight.configure({ multicolor: true }),
      ResizableImage,
      VideoNode,
      AudioNode,
      Youtube.configure({ nocookie: true, width: 640, height: 360 }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({ placeholder: "Yazmaya başlayın…" }),
    ],
    content: initialHtml,
    editorProps: {
      attributes: {
        class: "prose-blog min-h-[28rem] px-5 py-8 sm:px-10 focus:outline-none",
        "aria-label": "Yazı içeriği",
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  return (
    <div className="rounded-2xl border border-border bg-bg">
      {editor ? <Toolbar editor={editor} /> : <div className="h-14 border-b border-border" />}
      <EditorContent editor={editor} />
    </div>
  );
}

// ─── Toolbar ────────────────────────────────────────────────────────────────

function Toolbar({ editor }: { editor: Editor }) {
  const s = useEditorState({
    editor,
    selector: ({ editor: e }) => {
      const style = e.getAttributes("textStyle") as { color?: string; fontFamily?: string; fontSize?: string };
      return {
        block: e.isActive("heading", { level: 2 }) ? "h2" : e.isActive("heading", { level: 3 }) ? "h3" : e.isActive("heading", { level: 4 }) ? "h4" : "p",
        bold: e.isActive("bold"),
        italic: e.isActive("italic"),
        underline: e.isActive("underline"),
        strike: e.isActive("strike"),
        code: e.isActive("code"),
        link: e.isActive("link"),
        linkHref: (e.getAttributes("link").href as string | undefined) ?? "",
        color: style.color ?? null,
        fontFamily: normalizeFontFamily(style.fontFamily),
        fontSize: style.fontSize ?? "",
        highlight: e.isActive("highlight"),
        highlightColor: (e.getAttributes("highlight").color as string | undefined) ?? null,
        bulletList: e.isActive("bulletList"),
        orderedList: e.isActive("orderedList"),
        blockquote: e.isActive("blockquote"),
        codeBlock: e.isActive("codeBlock"),
        align: e.isActive({ textAlign: "center" }) ? "center" : e.isActive({ textAlign: "right" }) ? "right" : e.isActive({ textAlign: "justify" }) ? "justify" : "left",
        canUndo: e.can().undo(),
        canRedo: e.can().redo(),
      };
    },
  });

  const chain = () => editor.chain().focus();
  const familyValue = FONT_FAMILIES.find((f) => normalizeFontFamily(f.value) === s.fontFamily)?.value ?? (s.fontFamily ? "custom" : "");
  const sizeOptions = FONT_SIZES.includes(s.fontSize as (typeof FONT_SIZES)[number]) || !s.fontSize ? FONT_SIZES : [...FONT_SIZES, s.fontSize];

  return (
    <div
      role="toolbar"
      aria-label="Biçimlendirme"
      className="sticky top-16 z-20 flex flex-wrap items-center gap-0.5 rounded-t-2xl border-b border-border bg-bg/95 px-2 py-2 backdrop-blur"
    >
      <Btn label="Geri al (⌘Z)" icon="undo" disabled={!s.canUndo} onClick={() => chain().undo().run()} />
      <Btn label="Yinele (⌘⇧Z)" icon="redo" disabled={!s.canRedo} onClick={() => chain().redo().run()} />
      <Sep />

      <Select
        label="Paragraf biçimi"
        value={s.block}
        width="w-32"
        onChange={(v) => (v === "p" ? chain().setParagraph().run() : chain().toggleHeading({ level: Number(v[1]) as 2 | 3 | 4 }).run())}
        options={[
          { value: "p", label: "Paragraf" },
          { value: "h2", label: "Başlık" },
          { value: "h3", label: "Alt başlık" },
          { value: "h4", label: "Küçük başlık" },
        ]}
      />
      <Select
        label="Yazı tipi"
        value={familyValue}
        width="w-36"
        onChange={(v) => (v ? chain().setFontFamily(v).run() : chain().unsetFontFamily().run())}
        options={[
          ...FONT_FAMILIES.map((f) => ({ value: f.value, label: f.label, style: f.value ? { fontFamily: f.value } : undefined })),
          ...(familyValue === "custom" ? [{ value: "custom", label: "Özel", disabled: true }] : []),
        ]}
      />
      <Select
        label="Yazı boyutu"
        value={s.fontSize}
        width="w-24"
        onChange={(v) => (v ? chain().setFontSize(v).run() : chain().unsetFontSize().run())}
        options={[{ value: "", label: "Boyut" }, ...sizeOptions.map((v) => ({ value: v, label: v.replace("px", "") }))]}
      />
      <Sep />

      <Btn label="Kalın (⌘B)" active={s.bold} onClick={() => chain().toggleBold().run()}>
        <span className="text-[15px] font-bold">B</span>
      </Btn>
      <Btn label="İtalik (⌘I)" active={s.italic} onClick={() => chain().toggleItalic().run()}>
        <span className="font-serif text-[17px] italic">I</span>
      </Btn>
      <Btn label="Altı çizili (⌘U)" active={s.underline} onClick={() => chain().toggleUnderline().run()}>
        <span className="text-[15px] underline underline-offset-2">U</span>
      </Btn>
      <Btn label="Üstü çizili" active={s.strike} onClick={() => chain().toggleStrike().run()}>
        <span className="text-[15px] line-through">S</span>
      </Btn>
      <Btn label="Satır içi kod" icon="code" active={s.code} onClick={() => chain().toggleCode().run()} />

      <Popover
        label="Yazı rengi"
        trigger={
          <span className="flex flex-col items-center leading-none">
            <span className="text-[15px] font-medium">A</span>
            <span className="mt-0.5 h-[3px] w-4 rounded-full" style={{ backgroundColor: s.color ?? "var(--fg)" }} />
          </span>
        }
      >
        {(close) => (
          <Swatches
            items={TEXT_COLORS}
            current={s.color}
            kind="text"
            onPick={(v) => {
              chain().setColor(v).run();
              close();
            }}
            onClear={() => {
              chain().unsetColor().run();
              close();
            }}
            clearLabel="Varsayılan renk"
          />
        )}
      </Popover>

      <Popover
        label="Vurgula (arka plan rengi)"
        active={s.highlight}
        trigger={
          <span className="flex flex-col items-center leading-none">
            <Icon name="highlight" className="size-4" />
            <span className="mt-0.5 h-[3px] w-4 rounded-full" style={{ backgroundColor: s.highlightColor ?? "#fde68a" }} />
          </span>
        }
      >
        {(close) => (
          <Swatches
            items={HIGHLIGHTS}
            current={s.highlightColor}
            kind="highlight"
            onPick={(v) => {
              chain().setHighlight({ color: v }).run();
              close();
            }}
            onClear={() => {
              chain().unsetHighlight().run();
              close();
            }}
            clearLabel="Vurguyu kaldır"
          />
        )}
      </Popover>
      <Sep />

      <Popover label="Bağlantı" active={s.link} trigger={<Icon name="link" />}>
        {(close) => <LinkForm editor={editor} initial={s.linkHref} close={close} />}
      </Popover>
      <Popover label="Görsel ekle" trigger={<Icon name="image" />} wide>
        {(close) => <ImageForm editor={editor} close={close} />}
      </Popover>
      <Popover label="Video ekle" trigger={<Icon name="video" />} wide>
        {(close) => <VideoForm editor={editor} close={close} />}
      </Popover>
      <Popover label="Ses ekle veya kaydet" trigger={<Icon name="audio" />} wide>
        {(close) => <AudioForm editor={editor} close={close} />}
      </Popover>
      <Sep />

      <Btn label="Madde işaretli liste" icon="bulletList" active={s.bulletList} onClick={() => chain().toggleBulletList().run()} />
      <Btn label="Numaralı liste" icon="orderedList" active={s.orderedList} onClick={() => chain().toggleOrderedList().run()} />
      <Btn label="Alıntı" icon="quote" active={s.blockquote} onClick={() => chain().toggleBlockquote().run()} />
      <Btn label="Kod bloğu" active={s.codeBlock} onClick={() => chain().toggleCodeBlock().run()}>
        <span className="font-mono text-[11px] font-semibold">{"{}"}</span>
      </Btn>
      <Btn label="Ayırıcı çizgi" icon="rule" onClick={() => chain().setHorizontalRule().run()} />
      <Sep />

      <Btn label="Sola hizala" icon="alignLeft" active={s.align === "left"} onClick={() => chain().setTextAlign("left").run()} />
      <Btn label="Ortala" icon="alignCenter" active={s.align === "center"} onClick={() => chain().setTextAlign("center").run()} />
      <Btn label="Sağa hizala" icon="alignRight" active={s.align === "right"} onClick={() => chain().setTextAlign("right").run()} />
      <Btn label="İki yana yasla" icon="alignJustify" active={s.align === "justify"} onClick={() => chain().setTextAlign("justify").run()} />
      <Sep />

      <Btn label="Biçimlendirmeyi temizle" icon="clear" onClick={() => chain().unsetAllMarks().clearNodes().run()} />
    </div>
  );
}

// ─── Toolbar primitives ─────────────────────────────────────────────────────

const btnClass = (active?: boolean) =>
  `inline-flex size-8 items-center justify-center rounded-lg transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-35 ${
    active ? "bg-accent-soft text-fg" : "text-fg-muted hover:bg-surface hover:text-fg"
  }`;

function Btn({
  label,
  icon,
  active,
  disabled,
  onClick,
  children,
}: {
  label: string;
  icon?: IconName;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children?: ReactNode;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active}
      disabled={disabled}
      onMouseDown={(e) => e.preventDefault()} // keep the editor selection
      onClick={onClick}
      className={btnClass(active)}
    >
      {icon ? <Icon name={icon} /> : children}
    </button>
  );
}

function Sep() {
  return <span aria-hidden="true" className="mx-0.5 h-5 w-px bg-border" />;
}

function Select({
  label,
  value,
  options,
  onChange,
  width,
}: {
  label: string;
  value: string;
  options: { value: string; label: string; style?: React.CSSProperties; disabled?: boolean }[];
  onChange: (v: string) => void;
  width: string;
}) {
  const id = useId();
  return (
    <>
      <label className="sr-only" htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        title={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`h-8 ${width} cursor-pointer truncate rounded-lg border border-transparent bg-transparent pr-6 pl-2 text-sm text-fg transition-colors duration-150 hover:bg-surface focus-visible:border-border-strong`}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} style={o.style} disabled={o.disabled}>
            {o.label}
          </option>
        ))}
      </select>
    </>
  );
}

function Popover({
  label,
  trigger,
  active,
  wide,
  children,
}: {
  label: string;
  trigger: ReactNode;
  active?: boolean;
  wide?: boolean;
  children: (close: () => void) => ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        title={label}
        aria-label={label}
        aria-expanded={open}
        aria-controls={id}
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => setOpen((v) => !v)}
        className={btnClass(active || open)}
      >
        {trigger}
      </button>
      {open && (
        <div
          id={id}
          role="dialog"
          aria-label={label}
          className={`absolute top-full left-0 z-30 mt-2 ${wide ? "w-80" : "w-72"} max-w-[calc(100vw-2rem)] rounded-xl border border-border bg-bg p-3 shadow-(--shadow-lift)`}
        >
          {children(() => setOpen(false))}
        </div>
      )}
    </div>
  );
}

function Swatches({
  items,
  current,
  kind,
  onPick,
  onClear,
  clearLabel,
}: {
  items: { name: string; value: string }[];
  current: string | null;
  kind: "text" | "highlight";
  onPick: (v: string) => void;
  onClear: () => void;
  clearLabel: string;
}) {
  const [custom, setCustom] = useState(current && /^#[0-9a-f]{6}$/i.test(current) ? current : kind === "text" ? "#0f8b80" : "#fde68a");
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {items.map((c) => (
          <button
            key={c.value}
            type="button"
            title={c.name}
            aria-label={c.name}
            aria-pressed={current?.toLowerCase() === c.value}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => onPick(c.value)}
            className="flex size-9 items-center justify-center rounded-lg border border-border transition-colors duration-150 hover:border-fg aria-pressed:border-fg aria-pressed:ring-1 aria-pressed:ring-fg"
            style={kind === "highlight" ? { backgroundColor: c.value } : undefined}
          >
            {kind === "text" ? (
              <span className="text-base font-semibold" style={{ color: c.value }}>
                A
              </span>
            ) : (
              <span className="text-sm text-[#1a1d23]">ab</span>
            )}
          </button>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2 border-t border-border pt-3">
        <label className="flex flex-1 items-center gap-2 text-sm text-fg-muted">
          <input
            type="color"
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            className="size-8 cursor-pointer rounded-md border border-border bg-transparent p-0.5"
          />
          Özel renk
        </label>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => onPick(custom)} className={smallPrimary}>
          Uygula
        </button>
      </div>
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={onClear}
        className="mt-2 w-full rounded-lg px-2 py-2 text-left text-sm text-fg-muted transition-colors duration-150 hover:bg-surface hover:text-fg"
      >
        {clearLabel}
      </button>
    </div>
  );
}

// ─── Insert forms ───────────────────────────────────────────────────────────

/**
 * Inserting replaces the selection, so with an image/video/audio selected (e.g. right after resizing it)
 * the new media would overwrite it. Put the cursor in a fresh paragraph after the selected node first.
 */
function moveOffSelectedNode(editor: Editor) {
  const { selection } = editor.state;
  if (!(selection instanceof NodeSelection)) return;
  const pos = selection.to;
  editor.chain().insertContentAt(pos, { type: "paragraph" }).setTextSelection(pos + 1).run();
}

const inputClass =
  "h-10 w-full rounded-lg border border-border-strong bg-bg px-3 text-sm text-fg placeholder:text-fg-subtle focus-visible:border-accent";
const smallPrimary =
  "inline-flex h-9 items-center rounded-lg bg-fg px-3.5 text-sm font-medium text-bg transition-colors duration-150 hover:bg-fg/85 disabled:opacity-40";
const smallGhost =
  "inline-flex h-9 items-center rounded-lg px-3 text-sm text-fg-muted transition-colors duration-150 hover:bg-surface hover:text-fg";
const errorText = "text-xs text-[#d33a2c]";

// These panels live inside the post <form>, so they can't be <form>s themselves;
// Enter in a text field applies instead of submitting the post.
const onEnter = (fn: () => void) => (e: ReactKeyboardEvent) => {
  if (e.key === "Enter" && e.target instanceof HTMLInputElement && e.target.type !== "file") {
    e.preventDefault();
    fn();
  }
};

function LinkForm({ editor, initial, close }: { editor: Editor; initial: string; close: () => void }) {
  const [href, setHref] = useState(initial);
  const apply = () => {
    const url = href.trim();
    const chain = editor.chain().focus().extendMarkRange("link");
    if (!url) chain.unsetLink().run();
    else chain.setLink({ href: /^(https?:|mailto:|tel:|\/|#)/.test(url) ? url : `https://${url}` }).run();
    close();
  };
  return (
    <div onKeyDown={onEnter(apply)}>
      <label className="text-xs font-medium text-fg-muted" htmlFor="link-url">
        Bağlantı adresi
      </label>
      <input id="link-url" autoFocus className={`${inputClass} mt-1.5`} value={href} onChange={(e) => setHref(e.target.value)} placeholder="https://…" inputMode="url" />
      <p className="mt-1.5 text-xs text-fg-muted">Önce bağlantı vermek istediğiniz metni seçin.</p>
      <div className="mt-3 flex justify-end gap-1.5">
        {initial && (
          <button
            type="button"
            className={smallGhost}
            onClick={() => {
              editor.chain().focus().extendMarkRange("link").unsetLink().run();
              close();
            }}
          >
            Kaldır
          </button>
        )}
        <button type="button" onClick={apply} className={smallPrimary}>
          Uygula
        </button>
      </div>
    </div>
  );
}

/** Upload drop zone with progress, shared by the image, video and audio panels. */
function UploadField({ kind, onUploaded, label }: { kind: MediaKind; onUploaded: (url: string) => void; label: string }) {
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const rule = MEDIA_RULES[kind];
  return (
    <div>
      <label className="flex h-20 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-border-strong text-sm text-fg-muted transition-colors duration-150 hover:border-accent hover:text-fg has-disabled:cursor-wait">
        <Icon name="upload" />
        {progress !== null ? `Yükleniyor… %${Math.round(progress * 100)}` : label}
        <span className="text-xs text-fg-subtle">{rule.hint}</span>
        <input
          type="file"
          accept={rule.accept}
          className="sr-only"
          disabled={progress !== null}
          onChange={async (e) => {
            const file = e.target.files?.[0];
            e.target.value = "";
            if (!file) return;
            setProgress(0);
            setError(null);
            try {
              onUploaded(await uploadMedia(file, kind, { maxImageSize: 1600, onProgress: setProgress }));
            } catch (err) {
              setError(err instanceof Error ? err.message : "Yükleme başarısız.");
            } finally {
              setProgress(null);
            }
          }}
        />
      </label>
      {progress !== null && (
        <div className="mt-2 h-1 overflow-hidden rounded-full bg-surface-2" aria-hidden="true">
          <div className="h-full bg-accent transition-[width] duration-200" style={{ width: `${progress * 100}%` }} />
        </div>
      )}
      {error && <p className={`mt-2 ${errorText}`}>{error}</p>}
    </div>
  );
}

function UrlField({ placeholder, label, valid, onSubmit, error }: { placeholder: string; label: string; valid: (v: string) => boolean; onSubmit: (v: string) => void; error?: string | null }) {
  const [url, setUrl] = useState("");
  const submit = () => valid(url.trim()) && onSubmit(url.trim());
  return (
    <div onKeyDown={onEnter(submit)} className="space-y-2">
      <input aria-label={label} className={inputClass} value={url} onChange={(e) => setUrl(e.target.value)} placeholder={placeholder} inputMode="url" />
      {error && <p className={errorText}>{error}</p>}
      <div className="flex justify-end">
        <button type="button" onClick={submit} className={smallPrimary} disabled={!valid(url.trim())}>
          Ekle
        </button>
      </div>
    </div>
  );
}

const isHttpUrl = (v: string) => /^https?:\/\/\S+$/.test(v);
const Divider = ({ children }: { children: ReactNode }) => <p className="my-2.5 text-center text-xs text-fg-subtle">{children}</p>;

function ImageForm({ editor, close }: { editor: Editor; close: () => void }) {
  // Two steps: pick the image (upload or link), then describe it. Alt text is required — screen readers
  // and Google rely on it — so "Ekle" stays disabled until it is filled in.
  const [src, setSrc] = useState("");
  const [alt, setAlt] = useState("");
  const insert = () => {
    if (!src || !alt.trim()) return;
    moveOffSelectedNode(editor);
    editor.chain().focus().setImage({ src, alt: alt.trim() }).run();
    close();
  };

  if (src) {
    return (
      <div onKeyDown={onEnter(insert)} className="space-y-2.5">
        <img src={src} alt="" className="max-h-36 w-full rounded-lg bg-surface object-contain" />
        <label htmlFor="image-alt" className="block text-xs font-medium text-fg-muted">
          Görsel açıklaması (alt metin) <span className="text-[#d33a2c]">*</span>
        </label>
        <input id="image-alt" autoFocus required className={inputClass} value={alt} onChange={(e) => setAlt(e.target.value)} placeholder="Örn. Gece yarısı kod yazılan bir masa" />
        <p className="text-xs leading-relaxed text-fg-muted">Görselde ne olduğunu bir cümleyle anlatın. Görme engelli okurlar ve Google bu metni kullanır.</p>
        <div className="flex justify-between gap-1.5">
          <button type="button" className={smallGhost} onClick={() => setSrc("")}>
            Geri
          </button>
          <button type="button" onClick={insert} className={smallPrimary} disabled={!alt.trim()}>
            Ekle
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <UploadField kind="image" label="Bilgisayardan görsel yükle" onUploaded={setSrc} />
      <Divider>ya da bağlantı ile</Divider>
      <UrlField label="Görsel adresi" placeholder="https://…/gorsel.jpg" valid={isHttpUrl} onSubmit={setSrc} />
    </div>
  );
}

function VideoForm({ editor, close }: { editor: Editor; close: () => void }) {
  const [error, setError] = useState<string | null>(null);
  return (
    <div>
      <UploadField
        kind="video"
        label="Bilgisayardan video yükle"
        onUploaded={(src) => {
          moveOffSelectedNode(editor);
          editor.chain().focus().setVideo({ src }).run();
          close();
        }}
      />
      <Divider>ya da YouTube bağlantısı</Divider>
      <UrlField
        label="YouTube bağlantısı"
        placeholder="https://www.youtube.com/watch?v=…"
        valid={(v) => v.length > 0}
        error={error}
        onSubmit={(url) => {
          moveOffSelectedNode(editor);
          if (editor.chain().focus().setYoutubeVideo({ src: url }).run()) close();
          else setError("Geçerli bir YouTube bağlantısı girin.");
        }}
      />
    </div>
  );
}

function AudioForm({ editor, close }: { editor: Editor; close: () => void }) {
  const insert = (src: string) => {
    moveOffSelectedNode(editor);
    editor.chain().focus().setAudio({ src }).run();
    close();
  };
  return (
    <div>
      <Recorder onUploaded={insert} />
      <Divider>ya da dosya</Divider>
      <UploadField kind="audio" label="Bilgisayardan ses dosyası yükle" onUploaded={insert} />
      <Divider>ya da bağlantı ile</Divider>
      <UrlField label="Ses dosyası adresi" placeholder="https://…/kayit.mp3" valid={isHttpUrl} onSubmit={insert} />
    </div>
  );
}

// ─── Voice recorder ─────────────────────────────────────────────────────────

/** Records from the microphone in the browser (MediaRecorder), lets you listen back, then uploads. */
function Recorder({ onUploaded }: { onUploaded: (url: string) => void }) {
  const [state, setState] = useState<"idle" | "recording" | "recorded" | "uploading">("idle");
  const [seconds, setSeconds] = useState(0);
  const [clip, setClip] = useState<{ file: File; url: string } | null>(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const recorder = useRef<MediaRecorder | null>(null);

  useEffect(() => {
    if (state !== "recording") return;
    const started = Date.now();
    const t = setInterval(() => setSeconds(Math.floor((Date.now() - started) / 1000)), 250);
    return () => clearInterval(t);
  }, [state]);

  // Release the microphone and the preview URL when the panel closes.
  useEffect(
    () => () => {
      recorder.current?.stream.getTracks().forEach((t) => t.stop());
    },
    [],
  );
  useEffect(() => () => void (clip && URL.revokeObjectURL(clip.url)), [clip]);

  const start = async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mime = ["audio/webm;codecs=opus", "audio/mp4", "audio/webm"].find((m) => MediaRecorder.isTypeSupported(m));
      const rec = new MediaRecorder(stream, mime ? { mimeType: mime } : undefined);
      const chunks: Blob[] = [];
      rec.ondataavailable = (e) => e.data.size && chunks.push(e.data);
      rec.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        const type = (rec.mimeType || "audio/webm").split(";")[0];
        const blob = new Blob(chunks, { type });
        const file = new File([blob], `ses-kaydi.${type === "audio/mp4" ? "m4a" : "webm"}`, { type });
        setClip({ file, url: URL.createObjectURL(blob) });
        setState("recorded");
      };
      recorder.current = rec;
      rec.start();
      setSeconds(0);
      setState("recording");
    } catch {
      setError("Mikrofona erişilemedi. Tarayıcıda mikrofon izni verin.");
    }
  };

  const upload = async () => {
    if (!clip) return;
    setState("uploading");
    setError(null);
    try {
      onUploaded(await uploadMedia(clip.file, "audio", { onProgress: setProgress }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Yükleme başarısız.");
      setState("recorded");
    }
  };

  const time = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;

  return (
    <div className="rounded-lg border border-border p-3">
      {state === "idle" && (
        <button type="button" onClick={start} className="flex w-full items-center justify-center gap-2 rounded-lg bg-surface py-2.5 text-sm font-medium text-fg transition-colors duration-150 hover:bg-surface-2">
          <Icon name="mic" className="size-4" /> Ses kaydet
        </button>
      )}
      {state === "recording" && (
        <div className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-2 text-sm text-fg" aria-live="polite">
            <span aria-hidden="true" className="size-2.5 animate-pulse rounded-full bg-[#d33a2c]" />
            Kaydediliyor <span className="font-mono tabular-nums">{time}</span>
          </span>
          <button type="button" onClick={() => recorder.current?.stop()} className={smallPrimary}>
            <Icon name="stop" className="mr-1.5 size-4" /> Durdur
          </button>
        </div>
      )}
      {(state === "recorded" || state === "uploading") && clip && (
        <div className="space-y-2.5">
          <audio src={clip.url} controls className="w-full" />
          <div className="flex justify-between gap-1.5">
            <button type="button" className={smallGhost} disabled={state === "uploading"} onClick={() => setState("idle")}>
              Yeniden kaydet
            </button>
            <button type="button" onClick={upload} className={smallPrimary} disabled={state === "uploading"}>
              {state === "uploading" ? `Yükleniyor… %${Math.round(progress * 100)}` : "Yazıya ekle"}
            </button>
          </div>
        </div>
      )}
      {error && <p className={`mt-2 ${errorText}`}>{error}</p>}
    </div>
  );
}
