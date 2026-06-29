import type { GenerationConfig } from "@/types/career-flow-session";
import { ANALYSIS_MODEL } from "@/lib/services/ai/openai";

/** Bump when resume-analysis prompt semantics change materially. */
export const ANALYSIS_PROMPT_VERSION = "2026.06.2";

export const ANALYSIS_PRIVACY_MODE = "privacy-first" as const;

export function buildGenerationConfig(): GenerationConfig {
  return {
    promptVersion: ANALYSIS_PROMPT_VERSION,
    model: ANALYSIS_MODEL,
    privacyMode: ANALYSIS_PRIVACY_MODE,
  };
}
