import type { CareerProfile } from "@/types/career-profile";

/** URL-safe slug from a display name. */
export function slugifyName(name: string): string {
  return (
    name
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "") || "profile"
  );
}

/** Resolve canonical slug — explicit SEO slug wins, else derived from name. */
export function resolveCanonicalSlug(profile: CareerProfile): string {
  const explicit = profile.seo?.canonicalSlug?.trim();
  if (explicit) {
    return slugifyName(explicit);
  }
  return slugifyName(profile.basics.name);
}

export function portfolioPublicPath(slug: string): string {
  return `/p/${slug}`;
}

export function portfolioPublicUrl(slug: string, siteUrl: string): string {
  return `${siteUrl}${portfolioPublicPath(slug)}`;
}
