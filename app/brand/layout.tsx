import type { Metadata } from "next";

import { brandAssets, brandContent, brandDomains } from "@/lib/config/brand";
import { getSiteUrl } from "@/lib/config/site";

export const metadata: Metadata = {
  title: brandContent.meta.title.ru,
  description: brandContent.meta.description.ru,
  alternates: {
    canonical: `https://${brandDomains.brand}`,
  },
  openGraph: {
    title: brandContent.meta.title.en,
    description: brandContent.meta.description.en,
    url: `https://${brandDomains.brand}`,
    siteName: "mypresence",
    images: [
      {
        url: brandAssets.logoHorizontal,
        width: 644,
        height: 124,
        alt: "mypresence",
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: brandContent.meta.title.en,
    description: brandContent.meta.description.en,
    images: [brandAssets.logoHorizontal],
  },
  metadataBase: new URL(getSiteUrl()),
};

export default function BrandLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="brand-guidelines min-h-dvh bg-brand-bg text-brand-graphite antialiased">
      {children}
    </div>
  );
}
