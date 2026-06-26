import type { Metadata } from "next";

import { LegalLayout } from "@/components/legal/legal-layout";
import { LegalSection } from "@/components/legal/legal-section";
import { dict } from "@/lib/i18n";

const t = dict.legal.contact;

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
};

function ContactRow({ label, value }: { label: string; value: string }) {
  return (
    <p>
      <span className="text-foreground">{label}: </span>
      {value}
    </p>
  );
}

export default function ContactPage() {
  return (
    <LegalLayout title={t.title} intro={t.intro}>
      <LegalSection title={t.support.title}>
        <div className="space-y-2">
          <ContactRow label="Email" value={t.support.email} />
          <ContactRow label="Часы" value={t.support.hours} />
          <ContactRow label="Telegram" value={t.support.telegram} />
        </div>
      </LegalSection>
      <LegalSection title={t.business.title}>
        <div className="space-y-2">
          <ContactRow label="Email" value={t.business.email} />
          <ContactRow label="Компания" value={t.business.entity} />
          <ContactRow label="ИНН" value={t.business.taxId} />
          <ContactRow label="Адрес" value={t.business.address} />
        </div>
      </LegalSection>
    </LegalLayout>
  );
}
