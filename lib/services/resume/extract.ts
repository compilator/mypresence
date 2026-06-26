"use server";

import { parseResume, type ParseResumeErrorCode } from "@/lib/services/resume/resume-parser";
import type { ParsedResume } from "@/types/resume";

export type ExtractErrorCode = ParseResumeErrorCode;

export type ExtractResumeResult =
  | { ok: true; data: ParsedResume }
  | { ok: false; code: ExtractErrorCode };

/**
 * Server Action: parse an uploaded resume (PDF, DOCX, or DOC).
 * Format detection is internal — callers receive plain extracted text.
 */
export async function extractResumeText(
  formData: FormData,
): Promise<ExtractResumeResult> {
  const file = formData.get("file");
  if (!(file instanceof File)) {
    return { ok: false, code: "NO_FILE" };
  }

  return parseResume(file);
}
