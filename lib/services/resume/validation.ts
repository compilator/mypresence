export const MAX_RESUME_BYTES = 10 * 1024 * 1024; // 10 MB

export const ACCEPTED_RESUME_EXTENSIONS = [".pdf", ".docx", ".doc"] as const;

export const ACCEPTED_RESUME_MIME_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/msword",
] as const;

export type ResumeValidationCode = "unsupportedFormat" | "tooLarge" | "empty";

export interface ResumeValidationResult {
  ok: boolean;
  code?: ResumeValidationCode;
}

function hasAcceptedExtension(fileName: string): boolean {
  const lower = fileName.toLowerCase();
  return (
    lower.endsWith(".pdf") ||
    lower.endsWith(".docx") ||
    lower.endsWith(".doc")
  );
}

function hasAcceptedMimeType(mimeType: string): boolean {
  return (ACCEPTED_RESUME_MIME_TYPES as readonly string[]).includes(mimeType);
}

/** Client-safe resume file validation (PDF, DOCX, DOC). */
export function validateResumeFile(file: File): ResumeValidationResult {
  if (file.size === 0) {
    return { ok: false, code: "empty" };
  }
  if (file.size > MAX_RESUME_BYTES) {
    return { ok: false, code: "tooLarge" };
  }
  if (!hasAcceptedExtension(file.name) && !hasAcceptedMimeType(file.type)) {
    return { ok: false, code: "unsupportedFormat" };
  }
  return { ok: true };
}
