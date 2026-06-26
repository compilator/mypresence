import type { CareerProfile } from "@/types/career-profile";
import { EMPTY_CAREER_MEDIA } from "@/types/career-media";
import type { CareerMedia } from "@/types/career-media";
import type { ProfessionalPhoto } from "@/types/professional-photo";

type ProfileWithMedia = Pick<CareerProfile, "media">;

/** Read professional photo from CareerProfile.media — never from local state. */
export function getProfessionalPhoto(
  profile: ProfileWithMedia | null | undefined,
): ProfessionalPhoto | null {
  return profile?.media.professionalPhoto ?? null;
}

/** URL shown in all UI surfaces — prefers active, then thumbnail, then original. */
export function getActivePhotoUrl(
  profile: ProfileWithMedia | null | undefined,
): string | null {
  const photo = getProfessionalPhoto(profile);
  if (!photo) return null;
  return photo.active ?? photo.thumbnail ?? photo.original;
}

/** Attach or replace professional photo on a profile (immutable). */
export function withProfessionalPhoto(
  profile: CareerProfile,
  photo: ProfessionalPhoto | null,
): CareerProfile {
  return {
    ...profile,
    media: { ...profile.media, professionalPhoto: photo },
  };
}

/** Merge extracted or uploaded media into a profile (immutable). */
export function withMedia(
  profile: CareerProfile,
  media: Partial<CareerMedia>,
): CareerProfile {
  return {
    ...profile,
    media: { ...profile.media, ...media },
  };
}

/** Build a photo record from PDF extraction (no retouching, original preserved). */
export function createPhotoFromPdf(
  original: string,
  thumbnail: string,
  active: string,
): ProfessionalPhoto {
  return { original, thumbnail, active, source: "pdf" };
}

export { EMPTY_CAREER_MEDIA };
