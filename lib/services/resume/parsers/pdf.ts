import { extractText, getDocumentProxy } from "unpdf";

import { extractMediaFromPdf } from "@/lib/services/resume/media";
import type { CareerMedia } from "@/types/career-media";
import { EMPTY_CAREER_MEDIA } from "@/types/career-media";

export interface PdfParseResult {
  text: string;
  media: CareerMedia;
}

export async function parsePdf(bytes: Uint8Array): Promise<PdfParseResult> {
  const pdf = await getDocumentProxy(bytes);
  const { text } = await extractText(pdf, { mergePages: true });
  const clean = (text ?? "").replace(/\u0000/g, "").trim();

  let media = EMPTY_CAREER_MEDIA;
  try {
    media = await extractMediaFromPdf(bytes, pdf);
  } catch {
    // Portrait extraction is best-effort.
  }

  return { text: clean, media };
}
