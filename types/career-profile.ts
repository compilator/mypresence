/**
 * Central data contract for the whole product.
 *
 * The AI analysis Server Action returns exactly this shape, and every
 * downstream screen (profile preview, portfolio) renders from it. Keep this
 * the single source of truth.
 */

import type { CareerMedia } from "@/types/career-media";
import type { ProfileSeo } from "@/types/profile-seo";

export type { CareerMedia } from "@/types/career-media";
export type { ProfileSeo } from "@/types/profile-seo";
export type { CropData, ProfessionalPhoto, ProfessionalPhotoSource } from "@/types/professional-photo";
export { EMPTY_CAREER_MEDIA } from "@/types/career-media";

export interface ProfileLink {
  label: string;
  url: string;
}

export interface ProfileBasics {
  name: string;
  /** Formal job title as stated on the resume. */
  title: string;
  /** Professional positioning line — derived from stated facts, not invented. */
  headline?: string;
  location?: string;
  email?: string;
  summary: string;
  links: ProfileLink[];
}

export interface ExperienceItem {
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  location?: string;
  highlights: string[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  startDate?: string;
  endDate?: string;
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export interface ProjectItem {
  name: string;
  description: string;
  url?: string;
  tags?: string[];
}

/** AI-derived expertise areas — only from stated resume facts. */
export interface CoreExpertiseItem {
  title: string;
  description: string;
  technologies: string[];
}

export interface CareerProfile {
  basics: ProfileBasics;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillGroup[];
  projects: ProjectItem[];
  /** Visual identity and future resume media. Single source of truth for photos. */
  media: CareerMedia;
  /** Top career highlights with measurable impact when stated. */
  highlights?: string[];
  /** Structured expertise — preferred over skill-group derivation when present. */
  coreExpertise?: CoreExpertiseItem[];
  /** Discoverability overrides for published portfolios. */
  seo?: ProfileSeo;
}
