import { AppShell } from "@/components/layout/app-shell";
import { Container } from "@/components/layout/container";
import { dict } from "@/lib/i18n";

interface LegalLayoutProps {
  title: string;
  intro: string;
  children: React.ReactNode;
  updated?: string;
}

/** Editorial legal page shell — calm typography, narrow measure. */
export function LegalLayout({ title, intro, children, updated }: LegalLayoutProps) {
  return (
    <AppShell>
      <Container size="narrow" className="py-16 sm:py-20 lg:py-24">
        <header className="mb-14 max-w-2xl lg:mb-16">
          <p className="text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-muted-foreground/80">
            {dict.legal.eyebrow}
          </p>
          <h1 className="mt-4 text-[2rem] font-semibold leading-[1.12] tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
            {title}
          </h1>
          <p className="mt-6 text-lg leading-[1.7] text-muted-foreground">{intro}</p>
          {updated && (
            <p className="mt-4 text-sm text-muted-foreground/70">
              {dict.legal.updatedLabel}: {updated}
            </p>
          )}
        </header>
        <article className="max-w-2xl space-y-12">{children}</article>
      </Container>
    </AppShell>
  );
}
