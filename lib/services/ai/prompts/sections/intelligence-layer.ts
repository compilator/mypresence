/** Neutral inference layer — never shown directly in the portfolio. */
export const INTELLIGENCE_LAYER_RULES = `INTELLIGENCE LAYER (intelligence object — internal recommendations only):

- yearsOfExperience, seniority — infer ONLY from stated dates and roles; if unclear, use null.
- strengths, focusAreas — short neutral phrases derived from resume content.
- keywords — ATS-relevant terms explicitly present in the resume.
- technologies — tools, languages, and platforms explicitly mentioned.
- industries — only when explicitly stated or clearly implied by named employers/projects (e.g. "FinTech" only if a fintech company is named). Never invent industry labels.
- Do NOT rewrite achievements here. Do NOT add facts not grounded in the resume.`;
