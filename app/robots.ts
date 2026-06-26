import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/lib/config/site";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const siteUrl = getSiteUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/p/"],
        disallow: [
          "/portfolio",
          "/upload",
          "/analysis",
          "/profile",
          "/appearance",
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
