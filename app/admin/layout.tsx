import type { Metadata } from "next";
import { Providers } from "@/components/providers";
import { themeScript } from "@/components/theme-toggle";
import { fontVariables } from "@/lib/fonts";
import "../globals.css";

export const metadata: Metadata = {
  title: { default: "Yönetim Paneli", template: "%s · Yönetim Paneli" },
  robots: { index: false, follow: false },
};

/** Separate root layout: the admin is Turkish-only and has no site header, footer, analytics or cookie banner. */
export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return (
    <html lang="tr" suppressHydrationWarning className={fontVariables}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-dvh flex-col font-sans antialiased">
        <Providers locale="tr">{children}</Providers>
      </body>
    </html>
  );
}
