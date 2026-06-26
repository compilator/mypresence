/**
 * The uploaded file is transient: it is read to text and never persisted.
 * CareerProfile JSON is the permanent artifact. We keep only extracted text
 * and the file name — not the bytes — so there is nothing to store long-term.
 *
 * `media` is populated when the resume is a PDF with an extractable portrait;
 * merged into CareerProfile after AI analysis.
 */
import type { CareerMedia } from "@/types/career-media";

export interface ParsedResume {
  /** Plain text extracted from the uploaded resume. */
  text: string;
  fileName: string;
  /** Optional media extracted during parsing (PDF only). */
  media: CareerMedia;
}
