/** Stage 4 — Resume Optimization. Architecture only; not implemented. */
export interface OptimizedResume {
  sections: {
    summary: string;
    experience: Array<{
      company: string;
      role: string;
      highlights: string[];
    }>;
    skills: string[];
  };
  atsNotes: string[];
}
