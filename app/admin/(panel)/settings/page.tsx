import { ChangePasswordForm } from "@/components/admin/change-password-form";
import { requireAdmin } from "@/lib/auth/dal";

export const metadata = { title: "Ayarlar" };

export default async function SettingsPage() {
  await requireAdmin();
  return (
    <>
      <h1 className="text-h2 font-semibold text-fg">Ayarlar</h1>
      <section className="mt-8 max-w-xl rounded-2xl border border-border bg-surface p-6 sm:p-8">
        <h2 className="text-xl font-semibold tracking-tight text-fg">Giriş şifresi</h2>
        <p className="mt-1 text-sm leading-relaxed text-fg-muted">
          Yönetim paneline girişte kullanılan şifre (en az 4 karakter). Veritabanında şifrelenmiş (hash) olarak saklanır.
          Değiştirdiğinizde diğer cihazlardaki oturumlar kapanır.
        </p>
        <div className="mt-6">
          <ChangePasswordForm />
        </div>
      </section>
    </>
  );
}
