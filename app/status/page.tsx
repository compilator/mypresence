import type { Metadata } from "next";

import { AppShell } from "@/components/layout/app-shell";
import { Container } from "@/components/layout/container";
import { dict } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const t = dict.legal.status;

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
};

const COMPONENTS = [
  { key: "website", label: t.components.website },
  { key: "ai", label: t.components.ai },
  { key: "portfolio", label: t.components.portfolio },
  { key: "publishing", label: t.components.publishing },
  { key: "api", label: t.components.api },
] as const;

export default function StatusPage() {
  return (
    <AppShell>
      <Container size="narrow" className="py-16 sm:py-20 lg:py-24">
        <header className="mb-12 max-w-2xl">
          <p className="text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-muted-foreground/80">
            {dict.legal.eyebrow}
          </p>
          <h1 className="mt-4 text-[2rem] font-semibold leading-[1.12] tracking-tight sm:text-4xl">
            {t.title}
          </h1>
          <p className="mt-6 text-lg leading-[1.7] text-muted-foreground">{t.intro}</p>
        </header>

        <div className="max-w-2xl rounded-2xl border border-border/40 bg-card p-6 sm:p-8">
          <div className="flex items-center gap-3 border-b border-border/40 pb-6">
            <span
              className="size-2.5 shrink-0 rounded-full bg-primary shadow-[0_0_8px] shadow-primary/50"
              aria-hidden
            />
            <p className="text-base font-medium text-foreground">{t.operational}</p>
          </div>

          <ul className="mt-6 space-y-4">
            {COMPONENTS.map((component) => (
              <li
                key={component.key}
                className="flex items-center justify-between gap-4 text-sm sm:text-base"
              >
                <span className="text-muted-foreground">{component.label}</span>
                <span
                  className={cn(
                    "inline-flex items-center gap-2 text-sm font-medium text-primary",
                  )}
                >
                  <span className="size-2 rounded-full bg-primary" aria-hidden />
                  {t.operational}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </AppShell>
  );
}
