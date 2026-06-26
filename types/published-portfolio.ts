import type { AppearanceConfig } from "@/types/appearance";
import type { CareerProfile } from "@/types/career-profile";
import type { IntelligenceData } from "@/types/intelligence";

/** Published portfolio artifact — CareerProfile only, no raw resume. */
export interface PublishedPortfolio {
  slug: string;
  profile: CareerProfile;
  intelligence: IntelligenceData | null;
  appearance: AppearanceConfig;
  publishedAt: string;
}
