import type { Metadata } from "next";

import { LegalLayout } from "@/components/legal/legal-layout";
import { LegalList } from "@/components/legal/legal-list";
import { LegalSection } from "@/components/legal/legal-section";
import { dict } from "@/lib/i18n";

const t = dict.legal.terms;

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
};

export default function TermsPage() {
  const s = t.sections;

  return (
    <LegalLayout title={t.title} intro={t.intro} updated={t.updated}>
      <LegalSection title={s.service.title}>
        <LegalList items={s.service.body} />
      </LegalSection>
      <LegalSection title={s.responsibilities.title}>
        <LegalList items={s.responsibilities.body} />
      </LegalSection>
      <LegalSection title={s.availability.title}>
        <LegalList items={s.availability.body} />
      </LegalSection>
      <LegalSection title={s.aiLimits.title}>
        <LegalList items={s.aiLimits.body} />
      </LegalSection>
      <LegalSection title={s.noGuarantee.title}>
        <LegalList items={s.noGuarantee.body} />
      </LegalSection>
      <LegalSection title={s.ip.title}>
        <LegalList items={s.ip.body} />
      </LegalSection>
      <LegalSection title={s.liability.title}>
        <LegalList items={s.liability.body} />
      </LegalSection>
      <LegalSection title={s.termination.title}>
        <LegalList items={s.termination.body} />
      </LegalSection>
      <LegalSection title={s.changes.title}>
        <LegalList items={s.changes.body} />
      </LegalSection>
      <LegalSection title={s.contact.title}>
        <LegalList items={s.contact.body} />
      </LegalSection>
    </LegalLayout>
  );
}
