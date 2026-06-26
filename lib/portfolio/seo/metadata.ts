import type { Metadata } from "next";

import { getSiteUrl, siteConfig } from "@/lib/config/site";
import { portfolioPublicUrl, resolveCanonicalSlug } from "@/lib/portfolio/seo/slug";
import type { CareerProfile } from "@/types/career-profile";

export interface PortfolioMetadataOptions {
  /** When false, preview/private pages get noindex. */
  published?: boolean;
  canonicalUrl?: string;
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trim()}…`;
}

function defaultTitle(profile: CareerProfile): string {
  const { name, title, headline } = profile.basics;
  const role = headline ?? title;
  return role ? `${name} — ${role}` : name;
}

function defaultDescription(profile: CareerProfile): string {
  return truncate(profile.basics.summary.trim(), 160);
}

/** Next.js metadata for a portfolio page (published or preview). */
export function buildPortfolioMetadata(
  profile: CareerProfile,
  options: PortfolioMetadataOptions = {},
): Metadata {
  const published = options.published ?? false;
  const siteUrl = getSiteUrl();
  const slug = resolveCanonicalSlug(profile);
  const canonicalUrl =
    options.canonicalUrl ?? portfolioPublicUrl(slug, siteUrl);

  const title = profile.seo?.title?.trim() || defaultTitle(profile);
  const description =
    profile.seo?.description?.trim() || defaultDescription(profile);
  const keywords = profile.seo?.keywords;

  const ogImage = `${siteUrl}${siteConfig.ogImagePath}`;

  return {
    title,
    description,
    ...(keywords?.length ? { keywords } : {}),
    alternates: published ? { canonical: canonicalUrl } : undefined,
    robots: published
      ? { index: true, follow: true }
      : { index: false, follow: false },
    openGraph: {
      type: "profile",
      url: canonicalUrl,
      title,
      description,
      siteName: siteConfig.name,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

/** noindex metadata for private workspace preview routes. */
export function buildPreviewRobotsMetadata(): Metadata {
  return {
    robots: { index: false, follow: false },
  };
}
