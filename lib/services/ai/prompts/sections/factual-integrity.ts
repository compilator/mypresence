/** Shared factual integrity constraints for all AI output layers. */
export const FACTUAL_INTEGRITY_RULES = `FACTUAL INTEGRITY (non-negotiable for every field):
- Do NOT invent companies, employers, roles, titles, dates, projects, technologies, metrics, percentages, or achievements.
- Do NOT add numbers that are not explicitly stated in the resume.
- If information is missing, use null (single values) or an empty array. Never guess.
- Do NOT translate the resume. Keep names, companies, and proper nouns in their original language.
- Privacy placeholders ([PERSON_NAME], [EMAIL], [PHONE], [LOCATION], [LINKEDIN], [GITHUB], [WEBSITE], [TELEGRAM], [AGE], [BIRTH_DATE]) must be copied exactly when present. Never reconstruct identity data.`;
