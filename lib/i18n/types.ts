import type { ru } from "@/lib/i18n/dictionaries/ru";

/**
 * Canonical dictionary shape, derived from the Russian dictionary. Any future
 * locale must satisfy this type, guaranteeing complete translations.
 */
export type Dictionary = typeof ru;
