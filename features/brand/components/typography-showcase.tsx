"use client";

import type { BrandLocale } from "@/lib/config/brand";
import { brandContent, t } from "@/lib/config/brand";

interface TypographyShowcaseProps {
  locale: BrandLocale;
}

export function TypographyShowcase({ locale }: TypographyShowcaseProps) {
  const { typography } = brandContent;

  return (
    <div className="space-y-10">
      <p className="text-sm font-medium text-brand-gray">
        {typography.family}
      </p>
      {typography.scales.map((scale) => (
        <div
          key={scale.name.en}
          className="border-b border-brand-graphite/8 pb-10 last:border-0"
        >
          <p className="mb-4 text-xs font-medium tracking-[0.15em] text-brand-gray uppercase">
            {t(scale.name, locale)}
          </p>
          <p className={`text-brand-graphite ${scale.className}`}>
            {t(typography.sample, locale)}
          </p>
        </div>
      ))}
    </div>
  );
}
