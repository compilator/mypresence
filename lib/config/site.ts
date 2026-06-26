import { dict } from "@/lib/i18n";

/** Public site origin for canonical URLs, OpenGraph, and JSON-LD. */
export function getSiteUrl(): string {
  const fromEnv =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    process.env.SITE_URL?.trim() ||
    "http://localhost:3000";
  return fromEnv.replace(/\/$/, "");
}

export const siteConfig = {
  name: dict.brand.name,
  shortName: dict.brand.name,
  description: dict.meta.description,
  /** Default Open Graph image for portfolio pages (placeholder). */
  ogImagePath: "/og-portfolio.svg",
} as const;

export type SiteConfig = typeof siteConfig;
