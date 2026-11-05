"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ProjectImage } from "@/content/project-images";
import { ChevronLeft, ChevronRight, Close } from "./ui/icons";

type Props = { images: ProjectImage[]; title: string; portrait: boolean };

export function Gallery({ images, title, portrait }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);

  const open = (i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
  };
  const step = useCallback(
    (d: number) => setIndex((i) => (i === null ? i : (i + d + images.length) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, step]);

  const current = index === null ? null : images[index];

  return (
    <>
      <ul className={`grid items-start gap-4 sm:gap-6 ${portrait ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4" : "sm:grid-cols-2"}`}>
        {images.map((img, i) => (
          <li key={img.src.src}>
            <figure>
              <button
                type="button"
                onClick={() => open(i)}
                className="group block w-full overflow-hidden rounded-xl border border-border bg-surface transition-[border-color,box-shadow] duration-300 hover:border-border-strong hover:shadow-(--shadow-lift)"
                aria-label={`Open screenshot ${i + 1} of ${images.length}: ${img.alt}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  placeholder="blur"
                  sizes={portrait ? "(min-width: 1024px) 260px, (min-width: 640px) 33vw, 50vw" : "(min-width: 1024px) 540px, (min-width: 640px) 50vw, 100vw"}
                  className={`h-auto w-full object-cover object-top transition-transform duration-500 ease-(--ease-out-quint) group-hover:scale-[1.02] ${portrait ? "aspect-[9/19]" : ""}`}
                />
              </button>
              <figcaption className="mt-2.5 text-sm text-fg-muted">{img.alt}</figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label={`${title} screenshots`}
        onClose={() => setIndex(null)}
        onClick={(e) => e.target === e.currentTarget && dialogRef.current?.close()}
        className="m-auto h-dvh max-h-none w-screen max-w-none bg-transparent p-0 backdrop:bg-black/85 backdrop:backdrop-blur-sm"
      >
        {current && (
          <div className="flex h-full flex-col items-center justify-center gap-4 p-4 sm:p-10" onClick={(e) => e.target === e.currentTarget && dialogRef.current?.close()}>
            <Image
              key={current.src.src}
              src={current.src}
              alt={current.alt}
              sizes="100vw"
              quality={75}
              className="max-h-[calc(100dvh-9rem)] w-auto max-w-full rounded-lg object-contain"
            />
            <div className="flex w-full max-w-3xl items-center justify-between gap-4 text-white">
              <button type="button" onClick={() => step(-1)} aria-label="Previous screenshot" className="inline-flex size-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20">
                <ChevronLeft width={20} height={20} />
              </button>
              <p className="text-center text-sm text-white/80" aria-live="polite">
                <span className="font-mono tabular-nums text-white">{index! + 1} / {images.length}</span>
                <span className="mx-2 text-white/40" aria-hidden="true">·</span>
                {current.alt}
              </p>
              <button type="button" onClick={() => step(1)} aria-label="Next screenshot" className="inline-flex size-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20">
                <ChevronRight width={20} height={20} />
              </button>
            </div>
            <button
              type="button"
              autoFocus
              onClick={() => dialogRef.current?.close()}
              aria-label="Close"
              className="absolute top-4 right-4 inline-flex size-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <Close width={20} height={20} />
            </button>
          </div>
        )}
      </dialog>
    </>
  );
}
