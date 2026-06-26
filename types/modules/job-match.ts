/** Stage 3 — Vacancy Analysis. Architecture only; not implemented. */
export interface JobMatch {
  matchScore: number | null;
  matchingSkills: string[];
  missingSkills: string[];
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  atsKeywords: string[];
}

export interface JobMatchInput {
  profileId?: string;
  jobDescription: string;
}
