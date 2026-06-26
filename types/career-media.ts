import type { ProfessionalPhoto } from "@/types/professional-photo";

/**
 * Structured media on CareerProfile — not attachments, profile data.
 *
 * Future slots (architecture only, not implemented):
 * - certificates
 * - portfolioScreenshots
 * - logos
 * - attachments
 */
export interface CareerMedia {
  professionalPhoto: ProfessionalPhoto | null;
}

export const EMPTY_CAREER_MEDIA: CareerMedia = {
  professionalPhoto: null,
};
