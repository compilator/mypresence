import { parseDoc } from "@/lib/services/resume/parsers/doc";
import { parseDocx } from "@/lib/services/resume/parsers/docx";
import { parsePdf } from "@/lib/services/resume/parsers/pdf";
import {
  validateResumeFile,
  type ResumeValidationCode,
} from "@/lib/services/resume/validation";
import type { ParsedResume } from "@/types/resume";
import { EMPTY_CAREER_MEDIA } from "@/types/career-media";

/** Minimum characters for a resume to be considered readable. */
const MIN_TEXT_LENGTH = 40;

export type ResumeFormat = "pdf" | "docx" | "doc";

export type ParseResumeErrorCode =
  | "NO_FILE"
  | "UNSUPPORTED_FORMAT"
  | "TOO_LARGE"
  | "EMPTY"
  | "NO_TEXT"
  | "PARSE_FAILED";

export type ParseResumeResult =
  | { ok: true; data: ParsedResume }
  | { ok: false; code: ParseResumeErrorCode };

function detectResumeFormat(fileName: string, mimeType: string): ResumeFormat | null {
  const lower = fileName.toLowerCase();

  if (mimeType === "application/pdf" || lower.endsWith(".pdf")) {
    return "pdf";
  }
  if (
    mimeType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    lower.endsWith(".docx")
  ) {
    return "docx";
  }
  if (mimeType === "application/msword" || lower.endsWith(".doc")) {
    return "doc";
  }

  return null;
}

function validationCodeToParseError(
  code: ResumeValidationCode,
): ParseResumeErrorCode {
  switch (code) {
    case "unsupportedFormat":
      return "UNSUPPORTED_FORMAT";
    case "tooLarge":
      return "TOO_LARGE";
    case "empty":
      return "EMPTY";
  }
}

/**
 * Parse any supported resume format into plain text (+ optional media for PDF).
 * Callers must not branch on file type — only on extracted text.
 */
export async function parseResume(file: File): Promise<ParseResumeResult> {
  const validation = validateResumeFile(file);
  if (!validation.ok) {
    return {
      ok: false,
      code: validationCodeToParseError(validation.code!),
    };
  }

  const format = detectResumeFormat(file.name, file.type);
  if (!format) {
    return { ok: false, code: "UNSUPPORTED_FORMAT" };
  }

  try {
    const bytes = new Uint8Array(await file.arrayBuffer());
    let text = "";
    let media = EMPTY_CAREER_MEDIA;

    switch (format) {
      case "pdf": {
        const parsed = await parsePdf(bytes);
        text = parsed.text;
        media = parsed.media;
        break;
      }
      case "docx":
        text = await parseDocx(bytes);
        break;
      case "doc":
        text = await parseDoc(bytes);
        break;
    }

    const clean = text.trim();
    if (clean.length < MIN_TEXT_LENGTH) {
      return { ok: false, code: "NO_TEXT" };
    }

    return {
      ok: true,
      data: {
        text: clean,
        fileName: file.name,
        media,
      },
    };
  } catch {
    return { ok: false, code: "PARSE_FAILED" };
  }
}
