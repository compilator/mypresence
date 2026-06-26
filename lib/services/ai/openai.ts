import OpenAI from "openai";

/** Model used for resume analysis. Cheap + fast, good JSON adherence. */
export const ANALYSIS_MODEL = "gpt-4o-mini";

export function hasOpenAIKey(): boolean {
  return Boolean(process.env.OPENAI_API_KEY);
}

let client: OpenAI | null = null;

/** Lazily construct a singleton OpenAI client. Server-only. */
export function getOpenAIClient(): OpenAI {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not set.");
  }
  client ??= new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  return client;
}
