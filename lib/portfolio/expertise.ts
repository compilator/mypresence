/** One-line expertise descriptions derived from skill groups (no JSON change). */
export function expertiseDescription(
  category: string,
  skills: string[],
): string {
  const sample = skills.slice(0, 4).join(", ");
  if (!sample) return "";
  return `Практический опыт в области ${category.toLowerCase()}: ${sample}.`;
}
