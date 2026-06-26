"use server";

import type { AppearanceConfig } from "@/types/appearance";
import type { CareerProfile } from "@/types/career-profile";
import type { IntelligenceData } from "@/types/intelligence";
import type { PublishedPortfolio } from "@/types/published-portfolio";
import { getSiteUrl } from "@/lib/config/site";
import {
  allocateUniqueSlug,
  savePublishedPortfolio,
} from "@/lib/portfolio/publish/store";
import { portfolioPublicUrl } from "@/lib/portfolio/seo/slug";

export type PublishPortfolioResult =
  | { ok: true; slug: string; url: string }
  | { ok: false; code: "NO_PROFILE" };

/**
 * Persist a published portfolio (CareerProfile only — no resume text).
 * Returns the public URL path for redirect.
 */
export async function publishPortfolio(input: {
  profile: CareerProfile;
  intelligence: IntelligenceData | null;
  appearance: AppearanceConfig;
}): Promise<PublishPortfolioResult> {
  if (!input.profile?.basics?.name) {
    return { ok: false, code: "NO_PROFILE" };
  }

  const slug = await allocateUniqueSlug(input.profile);
  const siteUrl = getSiteUrl();

  const record: PublishedPortfolio = {
    slug,
    profile: {
      ...input.profile,
      seo: {
        ...input.profile.seo,
        canonicalSlug: slug,
      },
    },
    intelligence: input.intelligence,
    appearance: input.appearance,
    publishedAt: new Date().toISOString(),
  };

  await savePublishedPortfolio(record);

  return {
    ok: true,
    slug,
    url: portfolioPublicUrl(slug, siteUrl),
  };
}
