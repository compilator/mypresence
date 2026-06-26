import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/lib/config/site";
import { listPublishedSlugs } from "@/lib/portfolio/publish/store";
import { portfolioPublicPath } from "@/lib/portfolio/seo/slug";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const slugs = await listPublishedSlugs();

  const published = slugs.map((slug) => ({
    url: `${siteUrl}${portfolioPublicPath(slug)}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: siteUrl,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...published,
  ];
}
