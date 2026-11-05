import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ArrowLeft } from "@/components/ui/icons";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <Container className="flex min-h-[70dvh] flex-col justify-center py-24">
      <p className="font-mono text-xs tracking-[0.16em] text-fg-subtle uppercase">404</p>
      <h1 className="mt-4 text-h2 font-semibold text-fg">This page doesn&apos;t exist.</h1>
      <p className="mt-4 max-w-[48ch] text-lede text-fg-muted">The link may be broken or the page may have moved.</p>
      <div className="mt-10">
        <ButtonLink href="/" variant="secondary" icon={<ArrowLeft />}>Back home</ButtonLink>
      </div>
    </Container>
  );
}
