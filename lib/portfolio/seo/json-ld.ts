import { getSiteUrl, siteConfig } from "@/lib/config/site";
import { collectKnowsAbout } from "@/lib/portfolio/seo/knows-about";
import { portfolioPublicUrl, resolveCanonicalSlug } from "@/lib/portfolio/seo/slug";
import type { CareerProfile } from "@/types/career-profile";
import type { IntelligenceData } from "@/types/intelligence";

export interface JsonLdOptions {
  intelligence?: IntelligenceData | null;
  canonicalUrl?: string;
}

function parseLocality(location: string): string {
  return location.split(",")[0]?.trim() || location.trim();
}

function sameAsLinks(profile: CareerProfile): string[] {
  return profile.basics.links
    .map((link) => link.url.trim())
    .filter((url) => url.startsWith("http"));
}

function jobTitle(profile: CareerProfile): string {
  return profile.basics.title || profile.basics.headline || "";
}

/** schema.org Person — only fields visible on the published page. */
export function buildPersonJsonLd(
  profile: CareerProfile,
  options: JsonLdOptions = {},
): Record<string, unknown> {
  const siteUrl = getSiteUrl();
  const slug = resolveCanonicalSlug(profile);
  const url = options.canonicalUrl ?? portfolioPublicUrl(slug, siteUrl);
  const { basics } = profile;
  const knowsAbout = collectKnowsAbout(profile, options.intelligence ?? null);

  const person: Record<string, unknown> = {
    "@type": "Person",
    "@id": `${url}#person`,
    name: basics.name,
    url,
    description: basics.summary,
  };

  const title = jobTitle(profile);
  if (title) person.jobTitle = title;

  const locality = basics.location ? parseLocality(basics.location) : null;
  if (locality) {
    person.address = {
      "@type": "PostalAddress",
      addressLocality: locality,
    };
  }

  const links = sameAsLinks(profile);
  if (links.length > 0) person.sameAs = links;

  if (knowsAbout.length > 0) person.knowsAbout = knowsAbout;

  return person;
}

/** schema.org ProfilePage wrapping the Person entity. */
export function buildProfilePageJsonLd(
  profile: CareerProfile,
  options: JsonLdOptions = {},
): Record<string, unknown> {
  const siteUrl = getSiteUrl();
  const slug = resolveCanonicalSlug(profile);
  const url = options.canonicalUrl ?? portfolioPublicUrl(slug, siteUrl);
  const person = buildPersonJsonLd(profile, options);

  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": url,
    url,
    name: profile.seo?.title?.trim() || `${profile.basics.name} — ${siteConfig.name}`,
    description:
      profile.seo?.description?.trim() || profile.basics.summary.slice(0, 160),
    mainEntity: person,
  };
}

/** Combined JSON-LD for a published portfolio (ProfilePage + Person). */
export function buildPortfolioJsonLd(
  profile: CareerProfile,
  options: JsonLdOptions = {},
): Record<string, unknown> {
  return buildProfilePageJsonLd(profile, options);
}
