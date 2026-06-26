import type {
  CareerProfile,
  ExperienceItem,
  SkillGroup,
} from "@/types/career-profile";
import type { IntelligenceData } from "@/types/intelligence";

export interface SnapshotMetric {
  label: string;
  value: string;
}

export interface ExpertiseArea {
  title: string;
  description: string;
  technologies: string[];
}

const ACHIEVEMENT_PATTERN =
  /\d|%|\$|€|₽|×|x\s*\d|млн|тыс|million|percent|рост|увелич|сократ|запуст|внедр|launch|introduc|built|led|increase|decrease|saved|revenue|users|клиент|пользов/i;

export function isAchievementLine(text: string): boolean {
  return ACHIEVEMENT_PATTERN.test(text);
}

export function splitExperienceHighlights(highlights: string[]): {
  achievements: string[];
  responsibilities: string[];
} {
  if (highlights.length === 0) {
    return { achievements: [], responsibilities: [] };
  }

  const achievements = highlights.filter(isAchievementLine);
  const responsibilities = highlights.filter((h) => !isAchievementLine(h));

  if (achievements.length === 0) {
    return { achievements: highlights, responsibilities: [] };
  }

  return { achievements, responsibilities };
}

/** Top metric-bearing lines for 15-second scannability. */
export function collectTopAchievements(
  profile: CareerProfile,
  limit = 5,
): string[] {
  const fromProfile = profile.highlights ?? [];
  const fromExperience = profile.experience.flatMap((e) =>
    e.highlights.filter(isAchievementLine),
  );
  const seen = new Set<string>();
  const combined: string[] = [];

  for (const line of [...fromProfile, ...fromExperience]) {
    const trimmed = line.trim();
    if (!trimmed || seen.has(trimmed)) continue;
    seen.add(trimmed);
    combined.push(trimmed);
    if (combined.length >= limit) break;
  }

  return combined;
}

export function buildSnapshotMetrics(
  profile: CareerProfile,
  intelligence: IntelligenceData | null,
  labels: {
    years: string;
    level: string;
    specialization: string;
    technologies: string;
    projects: string;
    companies: string;
  },
): SnapshotMetric[] {
  const metrics: SnapshotMetric[] = [];

  if (intelligence?.yearsOfExperience != null) {
    metrics.push({
      label: labels.years,
      value: `${intelligence.yearsOfExperience}+`,
    });
  }

  if (intelligence?.seniority) {
    metrics.push({ label: labels.level, value: intelligence.seniority });
  }

  if (profile.basics.title) {
    metrics.push({
      label: labels.specialization,
      value: profile.basics.title,
    });
  }

  const tech =
    intelligence?.technologies.slice(0, 3).join(", ") ||
    intelligence?.keywords.slice(0, 3).join(", ") ||
    profile.skills
      .flatMap((g) => g.skills)
      .slice(0, 3)
      .join(", ");

  if (tech) {
    metrics.push({ label: labels.technologies, value: tech });
  }

  if (profile.projects.length > 0) {
    metrics.push({
      label: labels.projects,
      value: String(profile.projects.length),
    });
  }

  const companies = new Set(profile.experience.map((e) => e.company)).size;
  if (companies > 0 && metrics.length < 6) {
    metrics.push({ label: labels.companies, value: String(companies) });
  }

  return metrics.slice(0, 4);
}

export function buildExpertiseAreas(
  groups: SkillGroup[],
  describe: (category: string, skills: string[]) => string,
): ExpertiseArea[] {
  return groups.map((group) => ({
    title: group.category,
    description: describe(group.category, group.skills),
    technologies: group.skills,
  }));
}

/** Prefer AI-generated coreExpertise; fall back to skill-group derivation. */
export function resolveExpertiseAreas(
  profile: CareerProfile,
  describe: (category: string, skills: string[]) => string,
): ExpertiseArea[] {
  if (profile.coreExpertise && profile.coreExpertise.length > 0) {
    return profile.coreExpertise;
  }
  return buildExpertiseAreas(profile.skills, describe);
}

export function flattenSkillTags(groups: SkillGroup[]): SkillGroup[] {
  return groups.filter((g) => g.skills.length > 0);
}

export function latestExperience(experience: ExperienceItem[]): ExperienceItem | null {
  return experience[0] ?? null;
}

function normalizeLabel(text: string): string {
  return text.trim().toLowerCase().replace(/\s+/g, " ");
}

function splitSentences(text: string): string[] {
  const trimmed = text.trim();
  if (!trimmed) return [];
  return trimmed
    .split(/(?<=[.!?…])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

/** Brief 2–3 line positioning for the hero identity column — distinct from executive summary when possible. */
export function resolveShortPositioning(profile: CareerProfile): string | null {
  const { title, headline, summary } = profile.basics;
  const primaryHeadline = headline ?? title;

  if (headline && title && normalizeLabel(title) !== normalizeLabel(headline)) {
    return title.trim();
  }

  const sentences = splitSentences(summary);
  if (sentences.length >= 2) {
    return sentences.slice(0, 2).join(" ");
  }

  if (sentences.length === 1 && primaryHeadline) {
    if (normalizeLabel(sentences[0]!) !== normalizeLabel(primaryHeadline)) {
      return sentences[0]!;
    }
  }

  return null;
}
