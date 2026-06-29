/** Shared factual integrity constraints for all AI output layers. */
export const FACTUAL_INTEGRITY_RULES = `FACTUAL INTEGRITY (non-negotiable for every field):
- Do NOT invent companies, employers, roles, titles, dates, projects, technologies, tools, skills, metrics, percentages, or achievements.
- Do NOT add numbers that are not explicitly stated in the resume. Every metric, percentage, count, or duration must appear verbatim in the source.
- Do NOT list a technology, tool, platform, or skill unless it is explicitly named in the resume. Rewriting must improve wording only — never the underlying skill set.
- Rewriting changes WORDING, never FACTS. You may rephrase a sentence; you may not add a capability, outcome, or number that the resume does not state.
- If information is missing, use null (single values) or an empty array. Never guess, never fill gaps, never round up.
- Do NOT translate the resume. Keep names, companies, and proper nouns in their original language.
- Privacy placeholders ([PERSON_NAME], [EMAIL], [PHONE], [LOCATION], [LINKEDIN], [GITHUB], [WEBSITE], [TELEGRAM], [AGE], [BIRTH_DATE]) must be copied exactly when present. Never reconstruct identity data.`;
