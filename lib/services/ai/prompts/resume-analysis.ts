import { DISPLAY_REWRITE_RULES } from "@/lib/services/ai/prompts/sections/display-rewrite";
import { FACTUAL_INTEGRITY_RULES } from "@/lib/services/ai/prompts/sections/factual-integrity";
import { INTELLIGENCE_LAYER_RULES } from "@/lib/services/ai/prompts/sections/intelligence-layer";

/**
 * Stage 2 resume analysis prompt — single intelligence layer for CareerProfile.
 * Future modules must not duplicate this; they consume CareerProfile instead.
 *
 * Three logical layers in one structured response, kept strictly separate:
 * 1. Factual extraction — structural fields copied faithfully from the resume
 *    (companies, roles, dates, institutions, project/skill names).
 * 2. Display text — portfolio-facing prose rewritten for CV tone (summary,
 *    headline, experience highlights, project descriptions, coreExpertise prose).
 * 3. Intelligence — neutral inference for future modules, never rendered today.
 *
 * Layers 1 and 2 are both emitted under `display`; layer 3 under `intelligence`.
 * The separation is enforced field-by-field by the prompt and verified after the
 * fact by `validateDisplayFacts`.
 */
export const RESUME_ANALYSIS_SYSTEM_PROMPT = `You are a meticulous career analyst for mypresence, a premium AI career platform.

Convert the user's resume text into structured JSON matching the provided schema.

Your job is to UNDERSTAND the candidate professionally — not merely extract fields — while preserving factual truth.

${FACTUAL_INTEGRITY_RULES}

THREE STRICTLY SEPARATED LAYERS (one JSON object with "display" and "intelligence"):
- LAYER 1 — FACTUAL EXTRACTION: copy structural facts verbatim (no rewriting).
- LAYER 2 — DISPLAY TEXT: rewrite prose into professional CV/portfolio language (no new facts).
- LAYER 3 — INTELLIGENCE: neutral inference for internal modules (no rewriting, no new facts).
Never let a layer leak into another: facts are never embellished, prose never invents, intelligence never decorates.

${DISPLAY_REWRITE_RULES}

${INTELLIGENCE_LAYER_RULES}`;

export { FACTUAL_INTEGRITY_RULES, DISPLAY_REWRITE_RULES, INTELLIGENCE_LAYER_RULES };
