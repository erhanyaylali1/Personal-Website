import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ArrowLeft } from "@/components/ui/icons";
import { ui } from "@/content/ui";
import { localePath } from "@/lib/i18n";
import { getLocale } from "@/lib/locale";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return { title: ui[locale].notFound.title, robots: { index: false } };
}

export default async function NotFound() {
  const locale = await getLocale();
  const t = ui[locale].notFound;
  return (
    <Container className="flex min-h-[70dvh] flex-col justify-center py-24">
      <p className="font-mono text-xs tracking-[0.16em] text-fg-subtle uppercase">404</p>
      <h1 className="mt-4 text-h2 font-semibold text-fg">{t.heading}</h1>
      <p className="mt-4 max-w-[48ch] text-lede text-fg-muted">{t.body}</p>
      <div className="mt-10">
        <ButtonLink href={localePath(locale, "/")} variant="secondary" icon={<ArrowLeft />}>
          {t.back}
        </ButtonLink>
      </div>
    </Container>
  );
}
