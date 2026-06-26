"use client";

import { LogoHorizontal } from "@/components/brand/logo-horizontal";
import { LogoMark } from "@/components/brand/logo-mark";
import { LogoWordmark } from "@/components/brand/logo-wordmark";
import { BrandSection, BrandSectionLabel } from "@/features/brand/components/brand-section";
import { ColorGrid } from "@/features/brand/components/color-grid";
import {
  BrandLangToggle,
  HighlightText,
} from "@/features/brand/components/highlight-text";
import { LogoMotion } from "@/features/brand/components/logo-motion";
import { MarkReveal } from "@/features/brand/components/mark-reveal";
import { MeaningGrid } from "@/features/brand/components/meaning-grid";
import { TypographyShowcase } from "@/features/brand/components/typography-showcase";
import { UsageMockups } from "@/features/brand/components/usage-mockups";
import {
  BrandLocaleProvider,
  useBrandLocale,
} from "@/features/brand/hooks/use-brand-locale";
import { brandContent, t } from "@/lib/config/brand";

function BrandPageContent() {
  const { locale, setLocale } = useBrandLocale();
  const c = brandContent;

  return (
    <main className="bg-brand-bg text-brand-graphite">
      <BrandLangToggle locale={locale} onChange={setLocale} />

      {/* 01 Cover */}
      <BrandSection id="cover">
        <div className="flex flex-col items-center text-center">
          <LogoHorizontal height={96} priority />
          <p className="mt-10 text-lg text-brand-gray sm:text-xl">
            {t(c.cover.subtitle, locale)}
          </p>
          <p className="mt-3 text-sm text-brand-gray/80">
            {t(c.cover.version, locale)}
          </p>
        </div>
      </BrandSection>

      {/* 02 Brand Promise */}
      <BrandSection id="promise">
        <h2 className="max-w-4xl text-4xl leading-[1.1] font-semibold tracking-tight sm:text-6xl lg:text-7xl">
          <HighlightText
            text={t(c.promise.text, locale)}
            highlight={t(c.promise.highlight, locale)}
          />
        </h2>
      </BrandSection>

      {/* 03 The Mark */}
      <section id="mark" className="bg-brand-bg">
        <MarkReveal title={t(c.mark.title, locale)} />
      </section>

      {/* 04 Meaning */}
      <BrandSection id="meaning">
        <BrandSectionLabel>{t(c.meaning.title, locale)}</BrandSectionLabel>
        <MeaningGrid items={[...c.meaning.items]} locale={locale} />
      </BrandSection>

      {/* 05 Logos */}
      <BrandSection id="logos">
        <BrandSectionLabel>{t(c.logos.title, locale)}</BrandSectionLabel>
        <div className="grid gap-8 lg:grid-cols-2">
          <LogoVariantCard label="Primary">
            <LogoHorizontal height={80} />
          </LogoVariantCard>
          <LogoVariantCard label="Wordmark">
            <LogoWordmark height={64} />
          </LogoVariantCard>
          <LogoVariantCard label="Mark">
            <LogoMark size={160} />
          </LogoVariantCard>
          <LogoVariantCard label="App icon">
            <LogoMark size={160} />
          </LogoVariantCard>
        </div>
        <ul className="mt-12 max-w-2xl space-y-3 text-brand-gray">
          {c.logos.rules.map((rule) => (
            <li key={rule.en} className="text-base leading-relaxed">
              {t(rule, locale)}
            </li>
          ))}
        </ul>
      </BrandSection>

      {/* 06 Colors */}
      <BrandSection id="colors">
        <BrandSectionLabel>{t(c.colors.title, locale)}</BrandSectionLabel>
        <ColorGrid tiles={[...c.colors.tiles]} locale={locale} />
      </BrandSection>

      {/* 07 Typography */}
      <BrandSection id="typography">
        <BrandSectionLabel>{t(c.typography.title, locale)}</BrandSectionLabel>
        <TypographyShowcase locale={locale} />
      </BrandSection>

      {/* 08 Brand Voice */}
      <BrandSection id="voice" dark>
        <BrandSectionLabel inverse>{t(c.voice.title, locale)}</BrandSectionLabel>
        <div className="max-w-3xl space-y-2">
          {c.voice.lines.map((line) => {
            const text = t(line, locale);
            const isAccent = text === t(c.voice.accent, locale);
            return (
              <p
                key={line.en}
                className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
                style={isAccent ? { color: "#34c759" } : undefined}
              >
                {text}
              </p>
            );
          })}
        </div>
      </BrandSection>

      {/* 09 Motion */}
      <section id="motion" className="bg-brand-graphite text-white">
        <LogoMotion locale={locale} />
      </section>

      {/* 10 Privacy */}
      <BrandSection id="privacy">
        <BrandSectionLabel>{t(c.privacy.title, locale)}</BrandSectionLabel>
        <h2 className="max-w-4xl text-3xl leading-tight font-semibold tracking-tight sm:text-5xl">
          <HighlightText
            text={t(c.privacy.headline, locale)}
            highlight={t(c.privacy.highlight, locale)}
          />
        </h2>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-brand-gray">
          {t(c.privacy.detail, locale)}
        </p>
      </BrandSection>

      {/* 11 Usage */}
      <BrandSection id="usage">
        <BrandSectionLabel>{t(c.usage.title, locale)}</BrandSectionLabel>
        <UsageMockups />
      </BrandSection>

      {/* 12 Final */}
      <BrandSection id="final" dark>
        <div className="flex flex-col items-center text-center">
          <LogoMark size={160} />
          <h2 className="mt-12 max-w-3xl text-4xl leading-tight font-semibold tracking-tight sm:text-6xl">
            <HighlightText
              text={t(c.final.headline, locale)}
              highlight={t(c.final.highlight, locale)}
            />
          </h2>
          <p className="mt-8 text-lg text-white/50">{c.final.subtext}</p>
        </div>
      </BrandSection>
    </main>
  );
}

function LogoVariantCard({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-40 flex-col justify-between rounded-3xl border border-brand-graphite/8 bg-white p-8">
      <p className="text-xs font-medium tracking-wide text-brand-gray uppercase">
        {label}
      </p>
      <div className="mt-8 flex items-center">{children}</div>
    </div>
  );
}

export function BrandPage() {
  return (
    <BrandLocaleProvider>
      <BrandPageContent />
    </BrandLocaleProvider>
  );
}
