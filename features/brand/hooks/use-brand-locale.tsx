"use client";

import * as React from "react";

import type { BrandLocale } from "@/lib/config/brand";

const BrandLocaleContext = React.createContext<{
  locale: BrandLocale;
  setLocale: (locale: BrandLocale) => void;
} | null>(null);

export function BrandLocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = React.useState<BrandLocale>("ru");

  return (
    <BrandLocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </BrandLocaleContext.Provider>
  );
}

export function useBrandLocale() {
  const ctx = React.useContext(BrandLocaleContext);
  if (!ctx) {
    throw new Error("useBrandLocale must be used within BrandLocaleProvider");
  }
  return ctx;
}
