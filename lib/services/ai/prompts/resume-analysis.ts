import { DISPLAY_REWRITE_RULES } from "@/lib/services/ai/prompts/sections/display-rewrite";
import { FACTUAL_INTEGRITY_RULES } from "@/lib/services/ai/prompts/sections/factual-integrity";
import { INTELLIGENCE_LAYER_RULES } from "@/lib/services/ai/prompts/sections/intelligence-layer";

/**
 * Stage 2 resume analysis prompt — single intelligence layer for CareerProfile.
 * Future modules must not duplicate this; they consume CareerProfile instead.
 *
 * Three logical layers in one structured response:
 * 1. Extraction discipline — structural fields copied faithfully from the resume
 * 2. Display rewrite — portfolio-facing prose (experience highlights, summary, etc.)
 * 3. Intelligence — neutral inference for future modules
 */
export const RESUME_ANALYSIS_SYSTEM_PROMPT = `You are a meticulous career analyst for mypresence, a premium AI career platform.

Convert the user's resume text into structured JSON matching the provided schema.

Your job is to UNDERSTAND the candidate professionally — not merely extract fields — while preserving factual truth.

${FACTUAL_INTEGRITY_RULES}

OUTPUT LAYERS (one JSON object with "display" and "intelligence"):

${DISPLAY_REWRITE_RULES}

${INTELLIGENCE_LAYER_RULES}`;

export { FACTUAL_INTEGRITY_RULES, DISPLAY_REWRITE_RULES, INTELLIGENCE_LAYER_RULES };
