import { redirect } from "next/navigation";
import { Suspense } from "react";
import { LoginForm } from "@/components/admin/login-form";
import { hasAdminSession } from "@/lib/auth/dal";

export const metadata = { title: "Giriş" };

async function RedirectIfSignedIn() {
  if (await hasAdminSession()) redirect("/admin/blog");
  return null;
}

export default function AdminLoginPage() {
  return (
    <main className="flex flex-1 items-center justify-center px-5 py-16">
      <Suspense>
        <RedirectIfSignedIn />
      </Suspense>
      <div className="w-full max-w-sm rounded-3xl border border-border bg-surface px-6 py-10 text-center sm:px-10">
        <span aria-hidden="true" className="mx-auto flex size-12 items-center justify-center rounded-xl bg-fg text-xl font-semibold text-bg">
          EY
        </span>
        <h1 className="mt-6 text-[1.75rem] leading-tight font-semibold tracking-tight text-fg">Yönetim Paneli</h1>
        <p className="mt-2 text-[0.9375rem] text-fg-muted">Devam etmek için şifrenizi girin.</p>
        <LoginForm />
      </div>
    </main>
  );
}
