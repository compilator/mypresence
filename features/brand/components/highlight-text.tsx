"use client";

import { brandColors } from "@/lib/config/brand";

interface HighlightTextProps {
  text: string;
  highlight: string;
  className?: string;
}

/** Renders text with one highlighted word in brand green. */
export function HighlightText({
  text,
  highlight,
  className,
}: HighlightTextProps) {
  const index = text.toLowerCase().indexOf(highlight.toLowerCase());
  if (index === -1) {
    return <span className={className}>{text}</span>;
  }

  const before = text.slice(0, index);
  const word = text.slice(index, index + highlight.length);
  const after = text.slice(index + highlight.length);

  return (
    <span className={className}>
      {before}
      <span style={{ color: brandColors.green }}>{word}</span>
      {after}
    </span>
  );
}

interface BrandLangToggleProps {
  locale: "ru" | "en";
  onChange: (locale: "ru" | "en") => void;
}

export function BrandLangToggle({ locale, onChange }: BrandLangToggleProps) {
  return (
    <div className="fixed top-6 right-6 z-50 flex gap-1 rounded-full border border-brand-graphite/10 bg-white/80 p-1 text-xs font-medium backdrop-blur-sm">
      {(["ru", "en"] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => onChange(code)}
          className={
            locale === code
              ? "rounded-full bg-brand-graphite px-3 py-1.5 text-white"
              : "rounded-full px-3 py-1.5 text-brand-gray hover:text-brand-graphite"
          }
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
