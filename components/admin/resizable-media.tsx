"use client";

/* eslint-disable @next/next/no-img-element -- editor preview of arbitrary URLs */

import Image from "@tiptap/extension-image";
import { Node, mergeAttributes } from "@tiptap/core";
import { NodeViewWrapper, ReactNodeViewRenderer, type ReactNodeViewProps } from "@tiptap/react";
import { useId, useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import { Icon } from "./icons";

// Media width is stored as a PERCENTAGE of the text column (not pixels), so a half-width image is
// half-width on a laptop and on a phone alike.
//   HTML: <img|video|audio src="…" data-width="50" data-align="left" style="width: 50%">

type Align = "left" | "center" | "right";
const MIN = 15;

const PRESETS = [
  { label: "Küçük", value: 33 },
  { label: "Orta", value: 50 },
  { label: "Geniş", value: 75 },
  { label: "Tam", value: 100 },
];

const sizeAttributes = {
  width: {
    default: null as number | null,
    parseHTML: (el: HTMLElement) => {
      const n = Number(el.getAttribute("data-width") ?? el.style.width.match(/^(\d+)%$/)?.[1]);
      return n >= MIN && n < 100 ? Math.round(n) : null;
    },
    renderHTML: (attrs: { width: number | null }) => (attrs.width ? { "data-width": attrs.width, style: `width: ${attrs.width}%` } : {}),
  },
  align: {
    default: "center" as Align,
    parseHTML: (el: HTMLElement) => {
      const a = el.getAttribute("data-align");
      return a === "left" || a === "right" ? a : "center";
    },
    renderHTML: (attrs: { align: Align }) => (attrs.align === "center" ? {} : { "data-align": attrs.align }),
  },
};

// ─── Nodes ──────────────────────────────────────────────────────────────────

export const ResizableImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      ...sizeAttributes,
      // Pixel height would distort percentage widths — never store it.
      height: { default: null, parseHTML: () => null, renderHTML: () => ({}) },
    };
  },
  addNodeView() {
    return ReactNodeViewRenderer(ImageView);
  },
}).configure({ allowBase64: false, resize: false });

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    media: {
      setVideo: (attrs: { src: string }) => ReturnType;
      setAudio: (attrs: { src: string }) => ReturnType;
    };
  }
}

const mediaNode = (name: "video" | "audio", extra: Record<string, string>) =>
  Node.create({
    name,
    group: "block",
    atom: true,
    // Not draggable: native drag would hijack the player's seek bar.
    draggable: false,
    addAttributes() {
      return { src: { default: null as string | null }, ...sizeAttributes };
    },
    parseHTML() {
      return [{ tag: `${name}[src]` }];
    },
    renderHTML({ HTMLAttributes }) {
      return [name, mergeAttributes({ controls: "", preload: "metadata", ...extra }, HTMLAttributes)];
    },
    addNodeView() {
      return ReactNodeViewRenderer(name === "video" ? VideoView : AudioView);
    },
  });

export const VideoNode = mediaNode("video", { playsinline: "" }).extend({
  addCommands() {
    return { setVideo: (attrs) => ({ commands }) => commands.insertContent({ type: "video", attrs }) };
  },
});

export const AudioNode = mediaNode("audio", {}).extend({
  addCommands() {
    return { setAudio: (attrs) => ({ commands }) => commands.insertContent({ type: "audio", attrs }) };
  },
});

// ─── Views ──────────────────────────────────────────────────────────────────

function ImageView(props: ReactNodeViewProps) {
  const { src, alt } = props.node.attrs as { src: string; alt: string | null };
  const altId = useId();
  // Alt text is edited in a local draft and committed on blur/Enter, so typing doesn't dispatch a
  // transaction per keystroke (which could drop the node selection and unmount the field mid-word).
  const [altOpen, setAltOpen] = useState(false);
  const [altDraft, setAltDraft] = useState("");
  const missingAlt = !alt?.trim();
  const editable = props.editor.isEditable;
  const commitAlt = () => {
    if (altDraft.trim() !== (alt ?? "")) props.updateAttributes({ alt: altDraft.trim() });
    setAltOpen(false);
  };

  return (
    <MediaFrame {...props} keepToolbar={altOpen}>
      <img
        src={src}
        alt={alt ?? ""}
        draggable={false}
        className={`block w-full rounded-xl bg-surface-2 ${props.selected ? "outline-2 outline-offset-3 outline-accent" : ""}`}
      />
      {editable && (props.selected || altOpen) && (
        <div
          contentEditable={false}
          className="absolute inset-x-3 bottom-3 z-10 flex items-center gap-2 rounded-xl border border-border bg-bg py-1.5 pr-1.5 pl-3 font-sans shadow-(--shadow-lift)"
        >
          <label htmlFor={altId} className="shrink-0 text-xs font-medium text-fg-muted">
            Alt metin
          </label>
          <input
            id={altId}
            value={altOpen ? altDraft : (alt ?? "")}
            onFocus={() => {
              setAltDraft(alt ?? "");
              setAltOpen(true);
            }}
            onChange={(e) => setAltDraft(e.target.value)}
            onBlur={commitAlt}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                commitAlt();
                e.currentTarget.blur();
              }
            }}
            placeholder="Görselde ne var? (zorunlu)"
            aria-invalid={missingAlt && !altDraft.trim()}
            className="h-8 min-w-0 flex-1 rounded-lg border border-border-strong bg-bg px-2.5 text-sm text-fg placeholder:text-fg-subtle focus-visible:border-accent focus-visible:outline-none aria-invalid:border-[#d33a2c]"
          />
        </div>
      )}
      {editable && missingAlt && !props.selected && !altOpen && (
        <span
          contentEditable={false}
          className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-[#b42318] px-2.5 py-1 font-sans text-xs font-medium text-white"
        >
          Alt metin eksik
        </span>
      )}
    </MediaFrame>
  );
}

function VideoView(props: ReactNodeViewProps) {
  return (
    <MediaFrame {...props}>
      <video
        src={props.node.attrs.src as string}
        controls
        preload="metadata"
        playsInline
        className={`block w-full rounded-xl bg-black ${props.selected ? "outline-2 outline-offset-3 outline-accent" : ""}`}
      />
    </MediaFrame>
  );
}

function AudioView(props: ReactNodeViewProps) {
  return (
    <MediaFrame {...props} minWidth="min(100%, 16rem)">
      {/* Padding gives a grab area around the player so the node can be selected and resized. */}
      <div className={`rounded-xl border border-border bg-surface p-2 ${props.selected ? "outline-2 outline-offset-3 outline-accent" : ""}`}>
        <audio src={props.node.attrs.src as string} controls preload="metadata" className="block w-full" />
      </div>
    </MediaFrame>
  );
}

// ─── Shared frame: width handles + size/alignment toolbar ───────────────────

function MediaFrame({
  node,
  updateAttributes,
  selected,
  editor,
  children,
  keepToolbar = false,
  minWidth = "min(100%, 9rem)",
}: ReactNodeViewProps & { children: ReactNode; keepToolbar?: boolean; minWidth?: string }) {
  const width = (node.attrs.width as number | null) ?? 100;
  const align = (node.attrs.align as Align) ?? "center";
  const columnRef = useRef<HTMLDivElement>(null);
  const [dragWidth, setDragWidth] = useState<number | null>(null);
  const shown = dragWidth ?? width;
  const editable = editor.isEditable;

  const setWidth = (pct: number) => updateAttributes({ width: pct >= 100 ? null : pct });

  const startDrag = (e: ReactPointerEvent<HTMLSpanElement>, side: 1 | -1) => {
    e.preventDefault();
    e.stopPropagation();
    const column = columnRef.current?.getBoundingClientRect().width;
    if (!column) return;
    const handle = e.currentTarget;
    handle.setPointerCapture(e.pointerId);
    const startX = e.clientX;
    const startPct = shown;
    // A centered item grows on both sides, so each pixel dragged counts twice.
    const factor = align === "center" ? 2 : 1;
    let latest = startPct;
    const move = (ev: PointerEvent) => {
      latest = Math.round(Math.min(100, Math.max(MIN, startPct + ((ev.clientX - startX) / column) * 100 * side * factor)));
      setDragWidth(latest);
    };
    const end = () => {
      handle.removeEventListener("pointermove", move);
      handle.removeEventListener("pointerup", end);
      handle.removeEventListener("pointercancel", end);
      setDragWidth(null);
      setWidth(latest);
    };
    handle.addEventListener("pointermove", move);
    handle.addEventListener("pointerup", end);
    handle.addEventListener("pointercancel", end);
  };

  const margin = align === "left" ? "mr-auto" : align === "right" ? "ml-auto" : "mx-auto";

  return (
    <NodeViewWrapper className="rt-media my-[1.25em]" data-align={align}>
      <div ref={columnRef} className="w-full">
        <div className={`group/media relative ${margin}`} style={{ width: `${shown}%`, minWidth }}>
          {children}

          {editable && align !== "left" && <Handle side="left" visible={selected} onPointerDown={(e) => startDrag(e, -1)} />}
          {editable && align !== "right" && <Handle side="right" visible={selected} onPointerDown={(e) => startDrag(e, 1)} />}

          {editable && (selected || dragWidth !== null || keepToolbar) && (
            <div
              contentEditable={false}
              className="absolute top-0 left-1/2 z-10 flex -translate-x-1/2 -translate-y-[calc(100%+0.5rem)] items-center gap-0.5 rounded-xl border border-border bg-bg p-1 font-sans text-sm shadow-(--shadow-lift)"
            >
              {PRESETS.map((p) => (
                <button
                  key={p.value}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => setWidth(p.value)}
                  aria-pressed={shown === p.value}
                  className="h-8 rounded-lg px-2.5 whitespace-nowrap text-fg-muted transition-colors duration-150 hover:bg-surface hover:text-fg aria-pressed:bg-accent-soft aria-pressed:text-fg"
                >
                  {p.label}
                </button>
              ))}
              <span aria-hidden="true" className="mx-0.5 h-5 w-px bg-border" />
              {(["left", "center", "right"] as const).map((a) => {
                const label = a === "left" ? "Sola yasla" : a === "right" ? "Sağa yasla" : "Ortala";
                return (
                  <button
                    key={a}
                    type="button"
                    title={label}
                    aria-label={label}
                    aria-pressed={align === a}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => updateAttributes({ align: a })}
                    className="inline-flex size-8 items-center justify-center rounded-lg text-fg-muted transition-colors duration-150 hover:bg-surface hover:text-fg aria-pressed:bg-accent-soft aria-pressed:text-fg"
                  >
                    <Icon name={a === "left" ? "alignLeft" : a === "right" ? "alignRight" : "alignCenter"} className="size-4" />
                  </button>
                );
              })}
              <span className="min-w-11 px-1.5 text-center text-fg-muted tabular-nums">%{shown}</span>
            </div>
          )}
        </div>
      </div>
    </NodeViewWrapper>
  );
}

function Handle({ side, visible, onPointerDown }: { side: "left" | "right"; visible: boolean; onPointerDown: (e: ReactPointerEvent<HTMLSpanElement>) => void }) {
  return (
    <span
      aria-hidden="true"
      contentEditable={false}
      onPointerDown={onPointerDown}
      className={`absolute top-1/2 z-10 flex h-14 w-4 -translate-y-1/2 cursor-ew-resize touch-none items-center justify-center transition-opacity duration-150 ${
        side === "left" ? "-left-2" : "-right-2"
      } ${visible ? "opacity-100" : "opacity-0 group-hover/media:opacity-100"}`}
    >
      <span className="h-10 w-1.5 rounded-full border border-bg bg-accent" />
    </span>
  );
}
