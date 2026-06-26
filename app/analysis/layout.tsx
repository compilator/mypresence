import type { Metadata } from "next";

import { buildPreviewRobotsMetadata } from "@/lib/portfolio/seo";

export const metadata: Metadata = buildPreviewRobotsMetadata();

export default function AnalysisLayout({ children }: { children: React.ReactNode }) {
  return children;
}
