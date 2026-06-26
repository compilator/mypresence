import type { Metadata } from "next";

import { LegalLayout } from "@/components/legal/legal-layout";
import { LegalList } from "@/components/legal/legal-list";
import { LegalSection } from "@/components/legal/legal-section";
import { dict } from "@/lib/i18n";

const t = dict.legal.personalData;

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
};

export default function PersonalDataPage() {
  const s = t.sections;

  return (
    <LegalLayout title={t.title} intro={t.intro} updated={t.updated}>
      <LegalSection title={s.types.title}>
        <LegalList items={s.types.body} />
      </LegalSection>
      <LegalSection title={s.purpose.title}>
        <LegalList items={s.purpose.body} />
      </LegalSection>
      <LegalSection title={s.legal.title}>
        <LegalList items={s.legal.body} />
      </LegalSection>
      <LegalSection title={s.storage.title}>
        <LegalList items={s.storage.body} />
      </LegalSection>
      <LegalSection title={s.deletion.title}>
        <LegalList items={s.deletion.body} />
      </LegalSection>
      <LegalSection title={s.rights.title}>
        <LegalList items={s.rights.body} />
      </LegalSection>
      <LegalSection title={s.security.title}>
        <LegalList items={s.security.body} />
      </LegalSection>
      <LegalSection title={s.contact.title}>
        <LegalList items={s.contact.body} />
      </LegalSection>
    </LegalLayout>
  );
}
