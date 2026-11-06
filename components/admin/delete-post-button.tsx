"use client";

import { useState, useTransition } from "react";
import { deletePost } from "@/app/admin/actions";
import { Icon } from "./icons";

export function DeletePostButton({ id, title }: { id: string; title: string }) {
  const [confirming, setConfirming] = useState(false);
  const [pending, start] = useTransition();

  if (confirming) {
    return (
      <span className="flex items-center gap-1" role="group" aria-label={`“${title}” silinsin mi?`}>
        <span className="px-1 text-sm text-fg-muted">Silinsin mi?</span>
        <button
          type="button"
          autoFocus
          disabled={pending}
          onClick={() => start(() => deletePost(id))}
          className="inline-flex h-9 items-center rounded-lg bg-[#b42318] px-3 text-sm font-medium text-white transition-colors duration-150 hover:bg-[#912018] disabled:opacity-60"
        >
          {pending ? "Siliniyor…" : "Sil"}
        </button>
        <button
          type="button"
          disabled={pending}
          onClick={() => setConfirming(false)}
          className="inline-flex h-9 items-center rounded-lg px-3 text-sm text-fg-muted transition-colors duration-150 hover:bg-surface hover:text-fg"
        >
          Vazgeç
        </button>
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setConfirming(true)}
      title="Sil"
      aria-label={`“${title}” yazısını sil`}
      className="inline-flex size-9 items-center justify-center rounded-lg text-fg-muted transition-colors duration-150 hover:bg-[#d33a2c]/10 hover:text-[#d33a2c]"
    >
      <Icon name="trash" />
    </button>
  );
}
