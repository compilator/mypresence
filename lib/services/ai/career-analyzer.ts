"use server";

import { zodResponseFormat } from "openai/helpers/zod";

import { EMPTY_CAREER_MEDIA } from "@/types/career-media";
import type { CareerProfile } from "@/types/career-profile";
import type { CareerAnalysis } from "@/types/intelligence";
import {
  ANALYSIS_MODEL,
  getOpenAIClient,
  hasOpenAIKey,
} from "@/lib/services/ai/openai";
import { RESUME_ANALYSIS_SYSTEM_PROMPT } from "@/lib/services/ai/prompts/resume-analysis";
import { careerAnalysisSchema, type AICareerAnalysis } from "@/lib/services/ai/schema";
import { SAMPLE_INTELLIGENCE, SAMPLE_PROFILE } from "@/lib/services/mock/sample-profile";
import { redactResumeText, restoreCareerProfile } from "@/lib/services/privacy/pii-redactor";

function nullToUndef<T>(value: T | null): T | undefined {
  return value === null ? undefined : value;
}

/** Map the validated AI shape (nullable) to the app's display types (optional). */
function toCareerProfile(ai: AICareerAnalysis["display"]): CareerProfile {
  return {
    basics: {
      name: ai.basics.name,
      title: ai.basics.title,
      headline: nullToUndef(ai.basics.headline),
      location: nullToUndef(ai.basics.location),
      email: nullToUndef(ai.basics.email),
      summary: ai.basics.summary,
      links: ai.basics.links,
    },
    experience: ai.experience.map((e) => ({
      company: e.company,
      role: e.role,
      startDate: e.startDate,
      endDate: nullToUndef(e.endDate),
      location: nullToUndef(e.location),
      highlights: e.highlights,
    })),
    education: ai.education.map((e) => ({
      institution: e.institution,
      degree: e.degree,
      startDate: nullToUndef(e.startDate),
      endDate: nullToUndef(e.endDate),
    })),
    skills: ai.skills,
    projects: ai.projects.map((p) => ({
      name: p.name,
      description: p.description,
      url: nullToUndef(p.url),
      tags: p.tags,
    })),
    highlights: ai.highlights.length > 0 ? ai.highlights : undefined,
    coreExpertise: ai.coreExpertise.length > 0 ? ai.coreExpertise : undefined,
    media: EMPTY_CAREER_MEDIA,
  };
}

/**
 * AI analysis seam (Server Action).
 *
 * Calls OpenAI with strict structured outputs and validates the response with
 * Zod. Returns Display data (profile) + Intelligence data. When OPENAI_API_KEY
 * is not configured, falls back to a deterministic sample so the flow stays
 * demoable. Any real failure is thrown so the UI can retry.
 */
export async function analyzeResume(resumeText: string): Promise<CareerAnalysis> {
  if (!hasOpenAIKey()) {
    await new Promise((resolve) => setTimeout(resolve, 1400));
    return { profile: SAMPLE_PROFILE, intelligence: SAMPLE_INTELLIGENCE };
  }

  const { redactedText, piiVault } = redactResumeText(resumeText);

  const client = getOpenAIClient();
  const completion = await client.chat.completions.parse({
    model: ANALYSIS_MODEL,
    temperature: 0.2,
    messages: [
      { role: "system", content: RESUME_ANALYSIS_SYSTEM_PROMPT },
      { role: "user", content: redactedText.slice(0, 12000) },
    ],
    response_format: zodResponseFormat(careerAnalysisSchema, "career_analysis"),
  });

  const parsed = completion.choices[0]?.message?.parsed;
  if (!parsed) {
    throw new Error("The analysis could not be completed.");
  }

  const profile = restoreCareerProfile(toCareerProfile(parsed.display), piiVault);

  return {
    profile,
    intelligence: parsed.intelligence,
  };
}
