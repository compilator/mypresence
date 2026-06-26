import { z } from "zod";

/**
 * AI contract (structured outputs).
 *
 * OpenAI is treated strictly as a structured data provider: it must return JSON
 * matching this schema, which is validated with Zod. Optional fields are modeled
 * as nullable (required by structured outputs strict mode); they are mapped to
 * `undefined` when converted to the app's display types.
 *
 * Display data powers the portfolio. Intelligence data is neutral inference that
 * powers future recommendations and is never rendered today.
 */

const linkSchema = z.object({
  label: z.string(),
  url: z.string(),
});

const experienceSchema = z.object({
  company: z.string(),
  role: z.string(),
  startDate: z.string(),
  endDate: z.string().nullable(),
  location: z.string().nullable(),
  highlights: z.array(z.string()),
});

const educationSchema = z.object({
  institution: z.string(),
  degree: z.string(),
  startDate: z.string().nullable(),
  endDate: z.string().nullable(),
});

const skillGroupSchema = z.object({
  category: z.string(),
  skills: z.array(z.string()),
});

const projectSchema = z.object({
  name: z.string(),
  description: z.string(),
  url: z.string().nullable(),
  tags: z.array(z.string()),
});

const basicsSchema = z.object({
  name: z.string(),
  title: z.string(),
  headline: z.string().nullable(),
  location: z.string().nullable(),
  email: z.string().nullable(),
  summary: z.string(),
  links: z.array(linkSchema),
});

const coreExpertiseSchema = z.object({
  title: z.string(),
  description: z.string(),
  technologies: z.array(z.string()),
});

/** Display rewrite layer: portfolio-ready language. Structural fields stay factual; prose is rewritten. */
export const displaySchema = z.object({
  basics: basicsSchema,
  experience: z.array(experienceSchema),
  education: z.array(educationSchema),
  skills: z.array(skillGroupSchema),
  projects: z.array(projectSchema),
  highlights: z.array(z.string()),
  coreExpertise: z.array(coreExpertiseSchema),
});

/** Intelligence data: neutral inference derived only from stated facts. */
export const intelligenceSchema = z.object({
  yearsOfExperience: z.number().nullable(),
  seniority: z.string().nullable(),
  strengths: z.array(z.string()),
  focusAreas: z.array(z.string()),
  keywords: z.array(z.string()),
  technologies: z.array(z.string()),
  industries: z.array(z.string()),
});

export const careerAnalysisSchema = z.object({
  /** Portfolio-facing rewrite — professional CV copy grounded in resume facts. */
  display: displaySchema,
  /** Neutral inference for future modules — never rendered directly today. */
  intelligence: intelligenceSchema,
});

export type AICareerAnalysis = z.infer<typeof careerAnalysisSchema>;
