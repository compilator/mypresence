import type { Metadata } from "next";

import { buildPreviewRobotsMetadata } from "@/lib/portfolio/seo";

/** Private preview — never index session-based portfolio preview. */
export const metadata: Metadata = buildPreviewRobotsMetadata();

export default function PortfolioPreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
