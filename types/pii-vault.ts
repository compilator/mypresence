import type { ProfileLink } from "@/types/career-profile";

/** Stable placeholders sent to OpenAI instead of real PII. */
export const PII_PLACEHOLDERS = {
  PERSON_NAME: "[PERSON_NAME]",
  EMAIL: "[EMAIL]",
  PHONE: "[PHONE]",
  LOCATION: "[LOCATION]",
  LINKEDIN: "[LINKEDIN]",
  GITHUB: "[GITHUB]",
  WEBSITE: "[WEBSITE]",
  TELEGRAM: "[TELEGRAM]",
  WHATSAPP: "[WHATSAPP]",
  AGE: "[AGE]",
  BIRTH_DATE: "[BIRTH_DATE]",
} as const;

export type PiiPlaceholder =
  (typeof PII_PLACEHOLDERS)[keyof typeof PII_PLACEHOLDERS];

/** Server-side vault — never sent to OpenAI. MVP: in-memory during analysis. */
export interface PiiVault {
  personName?: string;
  email?: string;
  phone?: string;
  /** Contact / residence location (city or address), not employer locations. */
  location?: string;
  linkedIn?: string;
  github?: string;
  website?: string;
  telegram?: string;
  whatsApp?: string;
  age?: string;
  birthDate?: string;
  /** Additional personal links discovered in the resume header. */
  personalLinks?: ProfileLink[];
}

/** Maps each placeholder token to the original value extracted from the resume. */
export type ReplacementMap = Partial<Record<PiiPlaceholder, string>>;
