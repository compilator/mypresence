import { getDocumentProxy } from "unpdf";

import { extractPortraitFromPdf } from "@/lib/services/resume/portrait";
import type { CareerMedia } from "@/types/career-media";
import { EMPTY_CAREER_MEDIA } from "@/types/career-media";

type PdfDocument = Awaited<ReturnType<typeof getDocumentProxy>>;

/**
 * Extract structured media from a PDF resume.
 *
 * Reuses an open PDF document when provided to avoid PDF.js worker errors.
 */
export async function extractMediaFromPdf(
  bytes: Uint8Array,
  existingPdf?: PdfDocument,
): Promise<CareerMedia> {
  try {
    const professionalPhoto = await extractPortraitFromPdf(bytes, existingPdf);
    if (!professionalPhoto) return EMPTY_CAREER_MEDIA;
    return { professionalPhoto };
  } catch {
    return EMPTY_CAREER_MEDIA;
  }
}
