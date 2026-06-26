import type { Metadata } from "next";

import { LegalLayout } from "@/components/legal/legal-layout";
import { LegalList } from "@/components/legal/legal-list";
import { LegalSection } from "@/components/legal/legal-section";
import { dict } from "@/lib/i18n";

const t = dict.legal.cookies;

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
};

export default function CookiesPage() {
  const s = t.sections;

  return (
    <LegalLayout title={t.title} intro={t.intro} updated={t.updated}>
      <LegalSection title={s.what.title}>
        <LegalList items={s.what.body} />
      </LegalSection>
      <LegalSection title={s.why.title}>
        <LegalList items={s.why.body} />
      </LegalSection>
      <LegalSection title={s.disable.title}>
        <LegalList items={s.disable.body} />
      </LegalSection>
    </LegalLayout>
  );
}
