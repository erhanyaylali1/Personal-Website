import Link from "next/link";
import { Suspense } from "react";
import { logout } from "@/app/admin/actions";
import { Icon } from "@/components/admin/icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { requireAdmin } from "@/lib/auth/dal";
import { usingDemoStore } from "@/lib/blog/store";

async function Guard({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  return children;
}

const navItem =
  "inline-flex min-h-10 items-center rounded-full px-3.5 text-[0.9375rem] text-fg-muted transition-colors duration-150 hover:bg-surface hover:text-fg";

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-2 px-4 sm:px-6">
          <Link href="/admin/blog" className="mr-3 flex items-center gap-2.5">
            <span aria-hidden="true" className="flex size-8 items-center justify-center rounded-lg bg-fg text-sm font-semibold text-bg">
              EY
            </span>
            <span className="hidden font-semibold tracking-tight text-fg sm:inline">Yönetim</span>
          </Link>
          <nav aria-label="Yönetim menüsü" className="flex items-center gap-1">
            <Link href="/admin/blog" className={navItem}>
              Yazılar
            </Link>
            <Link href="/admin/settings" className={navItem}>
              Ayarlar
            </Link>
          </nav>
          <div className="ml-auto flex items-center gap-1">
            <Link href="/tr/blog" target="_blank" className={`${navItem} gap-1.5`}>
              <span className="hidden sm:inline">Bloğu gör</span>
              <Icon name="external" className="size-4" />
            </Link>
            <ThemeToggle />
            <form action={logout}>
              <button type="submit" className={`${navItem} cursor-pointer gap-1.5`} title="Çıkış yap">
                <span className="hidden sm:inline">Çıkış</span>
                <Icon name="logout" className="size-4" />
              </button>
            </form>
          </div>
        </div>
      </header>
      {usingDemoStore && (
        <p role="note" className="border-b border-[#d9730d]/30 bg-[#d9730d]/10 px-4 py-2 text-center text-sm text-fg">
          Demo modu: Supabase ayarlanmadığı için yazılar ve yüklenen dosyalar sunucu belleğinde tutuluyor ve yeniden başlatınca silinir.
        </p>
      )}
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 md:py-12">
        <Suspense fallback={<p className="text-fg-muted">Yükleniyor…</p>}>
          <Guard>{children}</Guard>
        </Suspense>
      </main>
    </>
  );
}
