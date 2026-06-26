import { renderPageAsImage } from "unpdf";
import sharp from "sharp";

/**
 * Fallback when no embedded portrait is found: render page 1 and crop the
 * top-left region where CIS/EU resume photos are typically placed.
 */
export async function extractPortraitFromRenderedPage(
  bytes: Uint8Array,
): Promise<Buffer | null> {
  try {
    const canvasImport = () => import("@napi-rs/canvas");
    const pageBuffer = await renderPageAsImage(bytes, 1, {
      canvasImport,
      width: 900,
    });

    const page = sharp(Buffer.from(pageBuffer));
    const meta = await page.metadata();
    const pageW = meta.width ?? 900;
    const pageH = meta.height ?? 1200;

    const cropSize = Math.round(Math.min(pageW * 0.32, pageH * 0.28, 320));
    if (cropSize < 80) return null;

    const cropped = await page
      .extract({ left: 0, top: 0, width: cropSize, height: cropSize })
      .jpeg({ quality: 90 })
      .toBuffer();

    const stats = await sharp(cropped).stats();
    const channels = stats.channels.slice(0, 3);
    if (channels.length < 3) return null;

    const mean = (channels[0].mean + channels[1].mean + channels[2].mean) / 3;
    const spread =
      Math.max(...channels.map((c) => c.max - c.min)) +
      Math.abs(channels[0].mean - channels[1].mean) +
      Math.abs(channels[1].mean - channels[2].mean);

    if (mean > 248 && spread < 30) return null;
    if (spread < 8) return null;

    return cropped;
  } catch {
    return null;
  }
}
