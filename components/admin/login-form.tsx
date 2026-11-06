"use client";

import { useActionState } from "react";
import { login, type FormState } from "@/app/admin/actions";

export function LoginForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(login, undefined);
  return (
    <form action={action} className="mt-8 space-y-4 text-left">
      <div>
        <label htmlFor="password" className="block text-sm text-fg">
          Şifre
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoFocus
          autoComplete="current-password"
          aria-invalid={Boolean(state?.error)}
          aria-describedby="login-status"
          className="mt-1.5 h-12 w-full rounded-xl border border-border-strong bg-bg px-4 text-lg text-fg transition-colors duration-150 focus-visible:border-accent aria-invalid:border-[#d33a2c]"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-12 w-full items-center justify-center rounded-full bg-fg font-medium text-bg transition-colors duration-150 hover:bg-fg/85 disabled:opacity-60"
      >
        {pending ? "Kontrol ediliyor…" : "Giriş yap"}
      </button>
      <p id="login-status" aria-live="polite" className="min-h-5 text-center text-sm text-[#d33a2c]">
        {state?.error}
      </p>
    </form>
  );
}
