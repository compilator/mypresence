/**
 * Professional identity photo — stored under CareerProfile.media.
 *
 * `original` preserves extracted resolution (never modified).
 * `thumbnail` is a square crop for fast loading (~120px).
 * `active` is the display URL (defaults to thumbnail; future crop/AI may change it).
 * Future sources: upload, linkedin, ai — attach via the same shape.
 */

export type ProfessionalPhotoSource = "pdf" | "upload" | "linkedin" | "ai";

/** Normalised crop relative to original dimensions. Used by future crop editor / AI. */
export interface CropData {
  x: number;
  y: number;
  width: number;
  height: number;
  sourceWidth: number;
  sourceHeight: number;
}

export interface ProfessionalPhoto {
  /** Highest-fidelity image (extracted or uploaded). Never altered. */
  original: string | null;
  /** Square thumbnail for previews and fast loads. */
  thumbnail: string | null;
  /** URL shown in UI — prefers smart crop when set. */
  active: string | null;
  source: ProfessionalPhotoSource;
  /** Optional crop metadata when active differs from centred thumbnail. */
  crop?: CropData;
}
