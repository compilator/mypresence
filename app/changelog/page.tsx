import type { Metadata } from "next";

import { LegalLayout } from "@/components/legal/legal-layout";
import { LegalList } from "@/components/legal/legal-list";
import { LegalSection } from "@/components/legal/legal-section";
import { dict } from "@/lib/i18n";

const t = dict.legal.changelog;

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
};

export default function ChangelogPage() {
  return (
    <LegalLayout title={t.title} intro={t.intro}>
      {t.entries.map((entry) => (
        <article
          key={entry.version}
          className="rounded-2xl border border-border/40 px-5 py-6 sm:px-6"
        >
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
            {entry.version}
          </p>
          <h2 className="mt-2 text-xl font-semibold tracking-tight">{entry.title}</h2>

          <div className="mt-6 space-y-6">
            <LegalSection title="Added">
              <LegalList items={entry.added} />
            </LegalSection>
            <LegalSection title="Privacy decisions">
              <LegalList items={entry.privacy} />
            </LegalSection>
          </div>
        </article>
      ))}
    </LegalLayout>
  );
}
