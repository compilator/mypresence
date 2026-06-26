import type { CareerProfile } from "@/types/career-profile";

export type { AnalysisSnapshot, GenerationConfig } from "@/types/career-flow-session";

/**
 * Intelligence data: neutral, derived insight (never invented facts). Stored
 * for future modules (Presence Score, Job Match, etc.) but not rendered today.
 */
export interface IntelligenceData {
  yearsOfExperience: number | null;
  seniority: string | null;
  strengths: string[];
  focusAreas: string[];
  keywords: string[];
  /** Tools and technologies inferred from stated experience and skills. */
  technologies: string[];
  /** Industries inferred from stated employers and projects. */
  industries: string[];
}

/** @deprecated Use AnalysisSnapshot for persisted analysis results. */
export interface CareerAnalysis {
  profile: CareerProfile;
  intelligence: IntelligenceData;
}
