/**
 * i18n configuration.
 *
 * Russian is the primary (and only active) language today. The architecture is
 * multilingual-ready: add a dictionary under `dictionaries/` and register the
 * locale here. UI text must always come from a dictionary, never hardcoded.
 */
export const LOCALES = ["ru"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "ru";
