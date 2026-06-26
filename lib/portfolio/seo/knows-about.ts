import type { CareerProfile } from "@/types/career-profile";
import type { IntelligenceData } from "@/types/intelligence";

/** Skills and technologies visible on the page — for JSON-LD knowsAbout. */
export function collectKnowsAbout(
  profile: CareerProfile,
  intelligence: IntelligenceData | null = null,
): string[] {
  const seen = new Set<string>();
  const add = (value: string | undefined | null) => {
    const trimmed = value?.trim();
    if (!trimmed || seen.has(trimmed)) return;
    seen.add(trimmed);
  };

  for (const group of profile.skills) {
    for (const skill of group.skills) add(skill);
  }

  for (const area of profile.coreExpertise ?? []) {
    add(area.title);
    for (const tech of area.technologies) add(tech);
  }

  for (const tech of intelligence?.technologies ?? []) add(tech);
  for (const keyword of intelligence?.keywords ?? []) add(keyword);

  return [...seen];
}
