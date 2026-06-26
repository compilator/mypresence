import { createPhotoFromPdf } from "@/lib/profile-photo";
import type { ProfessionalPhoto } from "@/types/professional-photo";
import { extractAllPdfImages } from "@/lib/services/resume/pdf-images";
import { extractPortraitFromRenderedPage } from "@/lib/services/resume/portrait-fallback";
import { getDocumentProxy } from "unpdf";
import sharp from "sharp";

type PdfDocument = Awaited<ReturnType<typeof getDocumentProxy>>;

const MIN_SIDE = 40;
const MAX_SIDE = 1400;
const THUMBNAIL_SIZE = 120;
const ACTIVE_SIZE = 240;
const ORIGINAL_MAX = 1200;

interface ScoredImage {
  score: number;
  buffer: Buffer;
  width: number;
  height: number;
}

/**
 * Score embedded images for likelihood of being a candidate portrait.
 * Deprioritises logos, signatures, QR codes, and decorative banners.
 */
function scorePortraitCandidate(
  width: number,
  height: number,
  page: number,
): number {
  if (width < MIN_SIDE || height < MIN_SIDE) return 0;
  if (width > MAX_SIDE || height > MAX_SIDE) return 0;

  const aspect = width / height;

  if (aspect > 2.5 && height < 60) return 0;
  if (aspect > 1.9 || aspect < 0.5) return 0;
  if (page === 1 && aspect > 1.65 && width > 500) return 0;

  const area = width * height;
  const aspectScore = 1 - Math.min(Math.abs(1 - aspect) * 0.55, 0.5);
  const sizeScore =
    area >= 80 * 80 && area <= 650 * 650
      ? 1.35
      : area < 80 * 80
        ? 0.35
        : 0.9;
  const pageScore = page === 1 ? 1.4 : 1;

  let score = area * aspectScore * sizeScore * pageScore;

  // Tiny perfect squares are often QR codes — penalise, don't exclude.
  if (aspect > 0.92 && aspect < 1.08 && area < 120 * 120) {
    score *= 0.2;
  }

  return score;
}

async function buildProfessionalPhoto(sourceBuffer: Buffer): Promise<ProfessionalPhoto> {
  const originalBuffer = await sharp(sourceBuffer)
    .resize(ORIGINAL_MAX, ORIGINAL_MAX, {
      fit: "inside",
      withoutEnlargement: true,
    })
    .jpeg({ quality: 92 })
    .toBuffer();

  const thumbnailBuffer = await sharp(sourceBuffer)
    .resize(THUMBNAIL_SIZE, THUMBNAIL_SIZE, {
      fit: "cover",
      position: "centre",
    })
    .jpeg({ quality: 85 })
    .toBuffer();

  const activeBuffer = await sharp(sourceBuffer)
    .resize(ACTIVE_SIZE, ACTIVE_SIZE, {
      fit: "cover",
      position: "centre",
    })
    .jpeg({ quality: 88 })
    .toBuffer();

  const original = `data:image/jpeg;base64,${originalBuffer.toString("base64")}`;
  const thumbnail = `data:image/jpeg;base64,${thumbnailBuffer.toString("base64")}`;
  const active = `data:image/jpeg;base64,${activeBuffer.toString("base64")}`;

  return createPhotoFromPdf(original, thumbnail, active);
}

/**
 * Extract the most likely profile portrait from a PDF.
 *
 * Strategy:
 * 1. Scan embedded images (JPEG streams, inline images, raw RGBA).
 * 2. Fall back to rendering page 1 and cropping the top-left photo region.
 *
 * Never throws.
 */
export async function extractPortraitFromPdf(
  bytes: Uint8Array,
  existingPdf?: PdfDocument,
): Promise<ProfessionalPhoto | null> {
  try {
    let best: ScoredImage | null = null;

    const images = await extractAllPdfImages(bytes, 2, existingPdf);
    for (const img of images) {
      const score = scorePortraitCandidate(img.width, img.height, img.page);
      if (score <= 0) continue;
      if (best && score <= best.score) continue;
      best = { score, buffer: img.buffer, width: img.width, height: img.height };
    }

    if (!best) {
      const fallbackBuffer = await extractPortraitFromRenderedPage(bytes);
      if (!fallbackBuffer) return null;
      const meta = await sharp(fallbackBuffer).metadata();
      best = {
        score: 1,
        buffer: fallbackBuffer,
        width: meta.width ?? THUMBNAIL_SIZE,
        height: meta.height ?? THUMBNAIL_SIZE,
      };
    }

    return buildProfessionalPhoto(best.buffer);
  } catch {
    return null;
  }
}
