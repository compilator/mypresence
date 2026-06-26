import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/config";
import { ru } from "@/lib/i18n/dictionaries/ru";
import type { Dictionary } from "@/lib/i18n/types";

const dictionaries: Record<Locale, Dictionary> = {
  ru,
};

export function getDictionary(locale: Locale = DEFAULT_LOCALE): Dictionary {
  return dictionaries[locale];
}

/**
 * Active dictionary. Components import this directly so text always comes from
 * the localization layer. Swappable to a per-request/locale lookup later
 * without touching call sites.
 */
export const dict: Dictionary = getDictionary();

export type { Dictionary };
