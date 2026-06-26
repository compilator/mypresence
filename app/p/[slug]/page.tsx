import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLdScript } from "@/components/seo/json-ld-script";
import { PortfolioTemplate } from "@/features/portfolio/portfolio-template";
import { getSiteUrl } from "@/lib/config/site";
import { getPublishedPortfolio } from "@/lib/portfolio/publish/store";
import {
  buildPortfolioJsonLd,
  buildPortfolioMetadata,
} from "@/lib/portfolio/seo";
import { portfolioPublicUrl } from "@/lib/portfolio/seo/slug";
import { resolveMode } from "@/lib/theme/portfolio";

interface PublicPortfolioPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PublicPortfolioPageProps): Promise<Metadata> {
  const { slug } = await params;
  const record = await getPublishedPortfolio(slug);
  if (!record) return { robots: { index: false, follow: false } };

  const siteUrl = getSiteUrl();
  return buildPortfolioMetadata(record.profile, {
    published: true,
    canonicalUrl: portfolioPublicUrl(slug, siteUrl),
  });
}

/** Server-rendered public portfolio — fully indexable HTML for crawlers. */
export default async function PublicPortfolioPage({ params }: PublicPortfolioPageProps) {
  const { slug } = await params;
  const record = await getPublishedPortfolio(slug);
  if (!record) notFound();

  const siteUrl = getSiteUrl();
  const canonicalUrl = portfolioPublicUrl(slug, siteUrl);
  const jsonLd = buildPortfolioJsonLd(record.profile, {
    intelligence: record.intelligence,
    canonicalUrl,
  });

  const mode = resolveMode(
    record.appearance.mode,
    "light",
  );

  return (
    <>
      <JsonLdScript data={jsonLd} />
      <PortfolioTemplate
        profile={record.profile}
        intelligence={record.intelligence}
        mode={mode}
        variant="public"
      />
    </>
  );
}

// Ensure static params aren't required; portfolios publish at runtime.
export const dynamic = "force-dynamic";
