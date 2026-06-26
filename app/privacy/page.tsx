import type { Metadata } from "next";

import { LegalLayout } from "@/components/legal/legal-layout";
import { LegalList } from "@/components/legal/legal-list";
import { LegalSection } from "@/components/legal/legal-section";
import { dict } from "@/lib/i18n";

const t = dict.legal.privacy;

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
};

export default function PrivacyPage() {
  const s = t.sections;

  return (
    <LegalLayout title={t.title} intro={t.intro} updated={t.updated}>
      <LegalSection title={s.collect.title}>
        <LegalList items={s.collect.body} />
      </LegalSection>
      <LegalSection title={s.neverSent.title}>
        <LegalList items={s.neverSent.body} />
      </LegalSection>
      <LegalSection title={s.ai.title}>
        <LegalList items={s.ai.body} />
      </LegalSection>
      <LegalSection title={s.storage.title}>
        <LegalList items={s.storage.body} />
      </LegalSection>
      <LegalSection title={s.rights.title}>
        <LegalList items={s.rights.body} />
      </LegalSection>
      <LegalSection title={s.contact.title}>
        <LegalList items={s.contact.body} />
      </LegalSection>
    </LegalLayout>
  );
}
