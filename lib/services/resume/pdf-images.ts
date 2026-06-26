import { getDocumentProxy, getResolvedPDFJS } from "unpdf";
import sharp from "sharp";

export interface PdfImageCandidate {
  width: number;
  height: number;
  page: number;
  key: string;
}

interface PdfJsImageObject {
  width?: number;
  height?: number;
  data?: Uint8Array | Uint8ClampedArray;
  bitmap?: { width: number; height: number; data?: Uint8ClampedArray };
}

type PdfDocument = Awaited<ReturnType<typeof getDocumentProxy>>;
type PdfPage = Awaited<ReturnType<PdfDocument["getPage"]>>;

function isJpeg(bytes: Uint8Array | Uint8ClampedArray): boolean {
  return bytes.length > 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
}

function isPng(bytes: Uint8Array | Uint8ClampedArray): boolean {
  return (
    bytes.length > 4 &&
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47
  );
}

/** Convert PDF.js image object (raw RGBA or encoded JPEG/PNG) to a JPEG buffer. */
export async function normalizePdfImageToJpeg(
  image: PdfJsImageObject,
): Promise<Buffer | null> {
  const width = image.width ?? image.bitmap?.width;
  const height = image.height ?? image.bitmap?.height;
  if (!width || !height || width < 1 || height < 1) return null;

  const rawData = image.data ?? image.bitmap?.data;
  if (!rawData || rawData.length === 0) return null;

  const bytes = Buffer.from(rawData);

  try {
    if (isJpeg(rawData) || isPng(rawData)) {
      return sharp(bytes).jpeg({ quality: 92 }).toBuffer();
    }

    const channels = rawData.length / (width * height);
    if (channels === 1 || channels === 2 || channels === 3 || channels === 4) {
      return sharp(bytes, {
        raw: {
          width,
          height,
          channels: channels as 1 | 2 | 3 | 4,
        },
      })
        .jpeg({ quality: 92 })
        .toBuffer();
    }

    return sharp(bytes).jpeg({ quality: 92 }).toBuffer();
  } catch {
    return null;
  }
}

async function resolvePdfImage(
  page: PdfPage,
  imageKey: string,
): Promise<PdfJsImageObject | null> {
  const store = imageKey.startsWith("g_") ? page.commonObjs : page.objs;
  const image = await new Promise<PdfJsImageObject | null>((resolve) => {
    store.get(imageKey, (value: PdfJsImageObject | null) => resolve(value ?? null));
  });
  return image;
}

/**
 * Extract all normalised image buffers from the first pages of a PDF.
 * Uses a single document session to avoid PDF.js worker clone errors.
 */
export async function extractAllPdfImages(
  bytes: Uint8Array,
  maxPages = 2,
  existingPdf?: PdfDocument,
): Promise<Array<{ buffer: Buffer; width: number; height: number; page: number }>> {
  const pdf = existingPdf ?? (await getDocumentProxy(bytes));
  const { OPS } = await getResolvedPDFJS();
  const results: Array<{ buffer: Buffer; width: number; height: number; page: number }> = [];
  const seen = new Set<string>();

  const pagesToScan = Math.min(pdf.numPages, maxPages);
  for (let pageNumber = 1; pageNumber <= pagesToScan; pageNumber++) {
    const page = await pdf.getPage(pageNumber);
    const operatorList = await page.getOperatorList();

    for (let i = 0; i < operatorList.fnArray.length; i++) {
      const op = operatorList.fnArray[i];
      const isXObject = op === OPS.paintImageXObject;
      const isInline = op === OPS.paintInlineImageXObject;
      if (!isXObject && !isInline) continue;

      const args = operatorList.argsArray[i] as unknown[];
      if (!args?.length) continue;

      let image: PdfJsImageObject | null = null;
      let dedupeKey = "";

      if (isXObject) {
        const imageKey = String(args[0]);
        dedupeKey = `${pageNumber}:${imageKey}`;
        if (seen.has(dedupeKey)) continue;
        image = await resolvePdfImage(page, imageKey);
      } else {
        image = (args[0] as PdfJsImageObject | undefined) ?? null;
        if (!image?.width || !image?.height) continue;
        dedupeKey = `${pageNumber}:inline:${i}:${image.width}x${image.height}`;
        if (seen.has(dedupeKey)) continue;
      }

      if (!image?.width || !image?.height) continue;
      seen.add(dedupeKey);

      const buffer = await normalizePdfImageToJpeg(image);
      if (!buffer) continue;

      const meta = await sharp(buffer).metadata();
      results.push({
        buffer,
        width: meta.width ?? image.width,
        height: meta.height ?? image.height,
        page: pageNumber,
      });
    }
  }

  return results;
}

/** @deprecated Use extractAllPdfImages — kept for diagnostics. */
export async function listPdfEmbeddedImages(
  bytes: Uint8Array,
  maxPages = 2,
): Promise<PdfImageCandidate[]> {
  const images = await extractAllPdfImages(bytes, maxPages);
  return images.map((img, index) => ({
    width: img.width,
    height: img.height,
    page: img.page,
    key: `extracted_${index}`,
  }));
}
