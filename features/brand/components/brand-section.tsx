"use client";

import { cn } from "@/lib/utils";

interface BrandSectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
  /** Pin section content while scrolling through tall inner track. */
  sticky?: boolean;
}

export function BrandSection({
  id,
  children,
  className,
  dark = false,
  sticky = false,
}: BrandSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative min-h-dvh w-full",
        dark ? "bg-brand-graphite text-white" : "bg-brand-bg text-brand-graphite",
        className,
      )}
    >
      <div
        className={cn(
          "mx-auto flex min-h-dvh w-full max-w-6xl flex-col justify-center px-6 py-20 sm:px-10",
          sticky && "lg:sticky lg:top-0",
        )}
      >
        {children}
      </div>
    </section>
  );
}

interface BrandSectionLabelProps {
  children: React.ReactNode;
  className?: string;
  inverse?: boolean;
}

export function BrandSectionLabel({
  children,
  className,
  inverse = false,
}: BrandSectionLabelProps) {
  return (
    <p
      className={cn(
        "mb-8 text-sm font-medium tracking-[0.2em] uppercase",
        inverse ? "text-white/50" : "text-brand-gray",
        className,
      )}
    >
      {children}
    </p>
  );
}
