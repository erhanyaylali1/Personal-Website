"use client";

import { useActionState } from "react";
import { changePassword, type FormState } from "@/app/admin/actions";

const fields = [
  { name: "current", label: "Mevcut şifre", autoComplete: "current-password" },
  { name: "next", label: "Yeni şifre", autoComplete: "new-password" },
  { name: "confirm", label: "Yeni şifre (tekrar)", autoComplete: "new-password" },
] as const;

export function ChangePasswordForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(changePassword, undefined);
  return (
    // key: a successful change remounts the form, clearing the fields.
    <form action={action} key={state?.ok} className="space-y-4">
      {fields.map((f) => (
        <div key={f.name}>
          <label htmlFor={f.name} className="block text-sm text-fg">
            {f.label}
          </label>
          <input
            id={f.name}
            name={f.name}
            type="password"
            minLength={4}
            maxLength={128}
            required
            autoComplete={f.autoComplete}
            className="mt-1.5 h-11 w-full max-w-xs rounded-xl border border-border-strong bg-bg px-3.5 text-fg transition-colors duration-150 focus-visible:border-accent"
          />
        </div>
      ))}
      <p aria-live="polite" className="min-h-5 text-sm">
        {state?.error && <span className="text-[#d33a2c]">{state.error}</span>}
        {state?.ok && <span className="text-accent">{state.ok}</span>}
      </p>
      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-11 items-center rounded-full bg-fg px-6 font-medium text-bg transition-colors duration-150 hover:bg-fg/85 disabled:opacity-60"
      >
        {pending ? "Kaydediliyor…" : "Şifreyi güncelle"}
      </button>
    </form>
  );
}
