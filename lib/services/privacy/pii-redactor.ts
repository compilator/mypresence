import type { CareerProfile } from "@/types/career-profile";
import type { ProfileLink } from "@/types/career-profile";
import {
  PII_PLACEHOLDERS,
  type PiiPlaceholder,
  type PiiVault,
  type ReplacementMap,
} from "@/types/pii-vault";

export interface RedactResumeResult {
  redactedText: string;
  piiVault: PiiVault;
  replacements: ReplacementMap;
}

interface DetectedMatch {
  value: string;
  placeholder: PiiPlaceholder;
  priority: number;
}

const EMAIL_PATTERN =
  /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

const PHONE_PATTERN =
  /(?:\+7|8)\s*(?:\(\d{3}\)|\d{3})[\s\-]*\d{3}[\s\-]*\d{2}[\s\-]*\d{2}|(?:\+7|8)\d{10}/g;

const LINKEDIN_PATTERN =
  /(?:https?:\/\/)?(?:www\.)?linkedin\.com\/(?:in|pub)\/[\w\-_%./]+/gi;

const GITHUB_PATTERN =
  /(?:https?:\/\/)?(?:www\.)?github\.com\/[\w\-]+/gi;

const TELEGRAM_URL_PATTERN =
  /(?:https?:\/\/)?(?:t\.me|telegram\.me)\/[\w]+/gi;

const TELEGRAM_HANDLE_PATTERN =
  /(?:telegram|телеграм|tg)[:\s]+@([\w]{4,32})/gi;

const WHATSAPP_PATTERN =
  /(?:https?:\/\/)?(?:wa\.me|api\.whatsapp\.com)\/[\d+]+/gi;

const WEBSITE_PATTERN =
  /https?:\/\/(?!(?:www\.)?(?:linkedin|github|t\.me|telegram|wa\.me)\.)[\w.-]+\.[a-z]{2,}(?:\/[\w\-./?#&=%+]*)?/gi;

const BIRTH_DATE_LABELED_PATTERN =
  /(?:дата\s+рождения|род\.?|date\s+of\s+birth|born|birthday)[:\s]+(\d{1,2}[./]\d{1,2}[./]\d{2,4}|\d{4}[./-]\d{1,2}[./-]\d{1,2})/gi;

const BIRTH_DATE_STANDALONE_PATTERN =
  /\b(\d{1,2}[./]\d{1,2}[./](?:19|20)\d{2})\b/g;

const AGE_LABELED_PATTERN =
  /(?:возраст|age)[:\s]+(\d{1,2})\s*(?:лет|years?)?/gi;

const ADDRESS_PATTERN =
  /(?:г\.?\s*)?(?:Москва|Санкт[-\s]?Петербург|СПб|Новосибирск|Екатеринбург|Казань)[^\n,;]{0,80}|(?:ул\.|улица|пр\.|проспект|пер\.|переулок|б-р|бульвар|ш\.|шоссе)\.?\s+[А-Яа-яA-Za-z0-9\s.\-/]{2,40}(?:,\s*(?:д\.|дом|стр\.|корп\.|кв\.)\.?\s*\d+[\w/]*)?/gi;

const NAME_LINE_PATTERN =
  /^([А-ЯЁ][а-яё]+(?:-[А-ЯЁ][а-яё]+)?(?:\s+[А-ЯЁ][а-яё]+(?:-[А-ЯЁ][а-яё]+)?){1,3}|[A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,3}|[А-ЯЁA-Z]{2,}(?:\s+[А-ЯЁA-Z]{2,}){1,3})$/;

const CITY_ONLY_PATTERN =
  /^(?:г\.?\s*)?(?:Москва|Санкт[-\s]?Петербург|СПб)$/i;

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function firstMatch(text: string, pattern: RegExp): string | undefined {
  const flags = pattern.flags.includes("g") ? pattern.flags : `${pattern.flags}g`;
  const re = new RegExp(pattern.source, flags);
  const match = re.exec(text);
  return match?.[0]?.trim();
}

function allMatches(text: string, pattern: RegExp): string[] {
  const flags = pattern.flags.includes("g") ? pattern.flags : `${pattern.flags}g`;
  const re = new RegExp(pattern.source, flags);
  const results: string[] = [];
  let match: RegExpExecArray | null;
  while ((match = re.exec(text)) !== null) {
    results.push(match[0].trim());
  }
  return results;
}

function detectPersonName(text: string): string | undefined {
  const header = text.split("\n").slice(0, 8);
  for (const rawLine of header) {
    const line = rawLine.trim();
    if (!line || line.length > 80) continue;
    if (/@|https?:\/\//i.test(line)) continue;
    if (/\+?\d[\d\s\-()]{8,}/.test(line)) continue;
    if (NAME_LINE_PATTERN.test(line)) {
      return line;
    }
  }
  return undefined;
}

function detectContactCity(text: string): string | undefined {
  for (const rawLine of text.split("\n").slice(0, 15)) {
    const line = rawLine.trim();
    if (!line || line.length > 120) continue;
    if (/(?:г\.?\s*)?(?:Москва|Санкт[-\s]?Петербург|СПб)/i.test(line)) {
      return line;
    }
  }

  const header = text.split("\n").slice(0, 15).join("\n");
  const addresses = allMatches(header, ADDRESS_PATTERN);
  if (addresses.length > 0) {
    const withCity = addresses.find((a) => /Москва|Санкт|Петербург/i.test(a));
    return withCity ?? addresses.sort((a, b) => b.length - a.length)[0];
  }

  for (const rawLine of text.split("\n").slice(0, 12)) {
    const line = rawLine.trim();
    if (CITY_ONLY_PATTERN.test(line)) {
      return line.replace(/^г\.?\s*/i, "г. ").trim();
    }
  }

  return undefined;
}

function detectTelegram(text: string): string | undefined {
  const url = firstMatch(text, TELEGRAM_URL_PATTERN);
  if (url) return url;

  const labeled = [...text.matchAll(TELEGRAM_HANDLE_PATTERN)][0];
  if (labeled?.[0]) {
    return labeled[0].replace(/^(?:telegram|телеграм|tg)[:\s]+/i, "").trim();
  }

  for (const line of text.split("\n").slice(0, 20)) {
    if (/telegram|телеграм|\btg\b/i.test(line)) {
      const at = line.match(/@([\w]{4,32})/);
      if (at) return `@${at[1]}`;
    }
  }

  return undefined;
}

function buildReplacementMap(vault: PiiVault): ReplacementMap {
  const map: ReplacementMap = {};
  if (vault.personName) map[PII_PLACEHOLDERS.PERSON_NAME] = vault.personName;
  if (vault.email) map[PII_PLACEHOLDERS.EMAIL] = vault.email;
  if (vault.phone) map[PII_PLACEHOLDERS.PHONE] = vault.phone;
  if (vault.location) map[PII_PLACEHOLDERS.LOCATION] = vault.location;
  if (vault.linkedIn) map[PII_PLACEHOLDERS.LINKEDIN] = vault.linkedIn;
  if (vault.github) map[PII_PLACEHOLDERS.GITHUB] = vault.github;
  if (vault.website) map[PII_PLACEHOLDERS.WEBSITE] = vault.website;
  if (vault.telegram) map[PII_PLACEHOLDERS.TELEGRAM] = vault.telegram;
  if (vault.whatsApp) map[PII_PLACEHOLDERS.WHATSAPP] = vault.whatsApp;
  if (vault.age) map[PII_PLACEHOLDERS.AGE] = vault.age;
  if (vault.birthDate) map[PII_PLACEHOLDERS.BIRTH_DATE] = vault.birthDate;
  return map;
}

function collectDetectedValues(text: string): DetectedMatch[] {
  const matches: DetectedMatch[] = [];

  const push = (value: string | undefined, placeholder: PiiPlaceholder, priority: number) => {
    const trimmed = value?.trim();
    if (!trimmed || trimmed.length < 2) return;
    matches.push({ value: trimmed, placeholder, priority });
  };

  push(firstMatch(text, EMAIL_PATTERN), PII_PLACEHOLDERS.EMAIL, 90);
  push(firstMatch(text, PHONE_PATTERN), PII_PLACEHOLDERS.PHONE, 85);
  push(firstMatch(text, LINKEDIN_PATTERN), PII_PLACEHOLDERS.LINKEDIN, 80);
  push(firstMatch(text, GITHUB_PATTERN), PII_PLACEHOLDERS.GITHUB, 80);
  push(detectTelegram(text), PII_PLACEHOLDERS.TELEGRAM, 75);
  push(firstMatch(text, WHATSAPP_PATTERN), PII_PLACEHOLDERS.WHATSAPP, 75);
  push(firstMatch(text, WEBSITE_PATTERN), PII_PLACEHOLDERS.WEBSITE, 70);

  const birthLabeled = text.match(BIRTH_DATE_LABELED_PATTERN);
  if (birthLabeled?.[0]) {
    push(birthLabeled[0], PII_PLACEHOLDERS.BIRTH_DATE, 65);
  } else {
    const header = text.split("\n").slice(0, 12).join("\n");
    push(firstMatch(header, BIRTH_DATE_STANDALONE_PATTERN), PII_PLACEHOLDERS.BIRTH_DATE, 60);
  }

  const ageLabeled = text.match(AGE_LABELED_PATTERN);
  if (ageLabeled?.[0]) {
    push(ageLabeled[0], PII_PLACEHOLDERS.AGE, 55);
  }

  push(detectContactCity(text), PII_PLACEHOLDERS.LOCATION, 45);
  push(detectPersonName(text), PII_PLACEHOLDERS.PERSON_NAME, 40);

  return matches.sort((a, b) => b.priority - a.priority || b.value.length - a.value.length);
}

function populateVault(matches: DetectedMatch[]): PiiVault {
  const vault: PiiVault = {};

  for (const { value, placeholder } of matches) {
    switch (placeholder) {
      case PII_PLACEHOLDERS.PERSON_NAME:
        vault.personName ??= value;
        break;
      case PII_PLACEHOLDERS.EMAIL:
        vault.email ??= value;
        break;
      case PII_PLACEHOLDERS.PHONE:
        vault.phone ??= value;
        break;
      case PII_PLACEHOLDERS.LOCATION:
        vault.location ??= value;
        break;
      case PII_PLACEHOLDERS.LINKEDIN:
        vault.linkedIn ??= value;
        break;
      case PII_PLACEHOLDERS.GITHUB:
        vault.github ??= value;
        break;
      case PII_PLACEHOLDERS.WEBSITE:
        vault.website ??= value;
        break;
      case PII_PLACEHOLDERS.TELEGRAM:
        vault.telegram ??= value;
        break;
      case PII_PLACEHOLDERS.WHATSAPP:
        vault.whatsApp ??= value;
        break;
      case PII_PLACEHOLDERS.AGE:
        vault.age ??= value;
        break;
      case PII_PLACEHOLDERS.BIRTH_DATE:
        vault.birthDate ??= value;
        break;
    }
  }

  return vault;
}

function applyRedactions(text: string, matches: DetectedMatch[]): string {
  let redacted = text;
  const seen = new Set<string>();

  for (const { value, placeholder } of matches) {
    const key = `${placeholder}:${value.toLowerCase()}`;
    if (seen.has(key)) continue;
    seen.add(key);

    redacted = redacted.replace(new RegExp(escapeRegExp(value), "gi"), placeholder);
  }

  return redacted;
}

/** Remove PII from resume text before sending to OpenAI. */
export function redactResumeText(text: string): RedactResumeResult {
  const matches = collectDetectedValues(text);
  const piiVault = populateVault(matches);
  const replacements = buildReplacementMap(piiVault);
  const redactedText = applyRedactions(text, matches);

  return { redactedText, piiVault, replacements };
}

function normalizeUrl(url: string): string {
  return url.startsWith("http") ? url : `https://${url}`;
}

function buildLinksFromVault(vault: PiiVault, existing: ProfileLink[]): ProfileLink[] {
  const links = [...existing];
  const seen = new Set(links.map((l) => l.url.toLowerCase()));

  const addLink = (label: string, url: string | undefined) => {
    if (!url) return;
    const normalized = normalizeUrl(url);
    if (seen.has(normalized.toLowerCase())) return;
    seen.add(normalized.toLowerCase());
    links.push({ label, url: normalized });
  };

  addLink("LinkedIn", vault.linkedIn);
  addLink("GitHub", vault.github);
  addLink("Website", vault.website);
  if (vault.telegram) {
    const tgUrl = vault.telegram.startsWith("@")
      ? `https://t.me/${vault.telegram.slice(1)}`
      : normalizeUrl(vault.telegram);
    addLink("Telegram", tgUrl);
  }
  addLink("WhatsApp", vault.whatsApp);

  if (vault.personalLinks) {
    for (const link of vault.personalLinks) {
      if (!seen.has(link.url.toLowerCase())) {
        seen.add(link.url.toLowerCase());
        links.push(link);
      }
    }
  }

  return links;
}

function replacePlaceholdersInString(value: string, vault: PiiVault): string {
  let result = value;
  const entries: Array<[PiiPlaceholder, string | undefined]> = [
    [PII_PLACEHOLDERS.PERSON_NAME, vault.personName],
    [PII_PLACEHOLDERS.EMAIL, vault.email],
    [PII_PLACEHOLDERS.PHONE, vault.phone],
    [PII_PLACEHOLDERS.LOCATION, vault.location],
    [PII_PLACEHOLDERS.LINKEDIN, vault.linkedIn],
    [PII_PLACEHOLDERS.GITHUB, vault.github],
    [PII_PLACEHOLDERS.WEBSITE, vault.website],
    [PII_PLACEHOLDERS.TELEGRAM, vault.telegram],
    [PII_PLACEHOLDERS.WHATSAPP, vault.whatsApp],
    [PII_PLACEHOLDERS.AGE, vault.age],
    [PII_PLACEHOLDERS.BIRTH_DATE, vault.birthDate],
  ];

  for (const [placeholder, original] of entries) {
    if (original && result.includes(placeholder)) {
      result = result.split(placeholder).join(original);
    }
  }

  return result;
}

function deepRestorePlaceholders<T>(value: T, vault: PiiVault): T {
  if (typeof value === "string") {
    return replacePlaceholdersInString(value, vault) as T;
  }
  if (Array.isArray(value)) {
    return value.map((item) => deepRestorePlaceholders(item, vault)) as T;
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, nested]) => [
        key,
        deepRestorePlaceholders(nested, vault),
      ]),
    ) as T;
  }
  return value;
}

function isPlaceholderOrEmpty(value: string | undefined, placeholder: PiiPlaceholder): boolean {
  if (!value) return true;
  return value.trim() === placeholder || value.includes(placeholder);
}

/** Restore personal identity fields from the vault after AI analysis. */
export function restoreCareerProfile(
  profile: CareerProfile,
  piiVault: PiiVault,
): CareerProfile {
  const restored = deepRestorePlaceholders(structuredClone(profile), piiVault);

  if (piiVault.personName) {
    restored.basics.name = piiVault.personName;
  }
  if (piiVault.email && isPlaceholderOrEmpty(restored.basics.email, PII_PLACEHOLDERS.EMAIL)) {
    restored.basics.email = piiVault.email;
  }
  if (
    piiVault.location &&
    isPlaceholderOrEmpty(restored.basics.location, PII_PLACEHOLDERS.LOCATION)
  ) {
    restored.basics.location = piiVault.location;
  }

  restored.basics.links = buildLinksFromVault(piiVault, restored.basics.links);

  return restored;
}

/** Test helper — verify no raw PII values remain in outbound text. */
export function containsRawPii(text: string, vault: PiiVault): boolean {
  const values = [
    vault.personName,
    vault.email,
    vault.phone,
    vault.location,
    vault.linkedIn,
    vault.github,
    vault.website,
    vault.telegram,
    vault.whatsApp,
    vault.age,
    vault.birthDate,
  ].filter(Boolean) as string[];

  const lower = text.toLowerCase();
  return values.some((value) => lower.includes(value.toLowerCase()));
}
