/**
 * AI module registry — documents how future modules extend CareerProfile.
 *
 * Each module consumes CareerProfile (+ optional context) and returns structured
 * data. Never parse the resume twice. Implementations live in
 * lib/services/ai/modules/<name>.ts when ready.
 */
import type { CareerProfile } from "@/types/career-profile";

export type AIModuleId =
  | "resume-analysis" // Stage 1–2 (implemented)
  | "job-match" // Stage 3
  | "resume-optimization" // Stage 4
  | "portfolio-optimization" // Stage 5
  | "cover-letter" // Stage 6
  | "professional-pitch" // Stage 7
  | "career-insights"; // Stage 8

export interface AIModuleMeta {
  id: AIModuleId;
  stage: number;
  status: "implemented" | "planned";
  /** What the module reads. */
  inputs: string[];
  /** TypeScript type name for output. */
  outputType: string;
}

export const AI_MODULES: AIModuleMeta[] = [
  {
    id: "resume-analysis",
    stage: 2,
    status: "implemented",
    inputs: ["resumeText"],
    outputType: "CareerAnalysis",
  },
  {
    id: "job-match",
    stage: 3,
    status: "planned",
    inputs: ["CareerProfile", "jobDescription"],
    outputType: "JobMatch",
  },
  {
    id: "resume-optimization",
    stage: 4,
    status: "planned",
    inputs: ["CareerProfile", "jobDescription"],
    outputType: "OptimizedResume",
  },
  {
    id: "portfolio-optimization",
    stage: 5,
    status: "planned",
    inputs: ["CareerProfile", "jobDescription"],
    outputType: "PortfolioOptimization",
  },
  {
    id: "cover-letter",
    stage: 6,
    status: "planned",
    inputs: ["CareerProfile", "jobDescription"],
    outputType: "CoverLetter",
  },
  {
    id: "professional-pitch",
    stage: 7,
    status: "planned",
    inputs: ["CareerProfile"],
    outputType: "ProfessionalPitch",
  },
  {
    id: "career-insights",
    stage: 8,
    status: "planned",
    inputs: ["CareerProfile"],
    outputType: "CareerInsights",
  },
];

/** Shared input contract — every module starts from CareerProfile. */
export type ModuleContext = {
  profile: CareerProfile;
  jobDescription?: string;
};
