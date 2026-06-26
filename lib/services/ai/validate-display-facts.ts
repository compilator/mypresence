import type { AICareerAnalysis } from "@/lib/services/ai/schema";

export type FactViolationSeverity = "critical" | "warning";

export interface FactViolation {
  severity: FactViolationSeverity;
  field: string;
  message: string;
}

export interface FactIntegrityResult {
  valid: boolean;
  violations: FactViolation[];
}

function normalizeForMatch(value: string): string {
  return value
    .toLowerCase()
    .replace(/[«»""„"]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** Numeric tokens (digits with optional decimal/%/+) found in text. */
export function extractNumericTokens(text: string): string[] {
  const matches = text.match(/\d+(?:[.,]\d+)?(?:\s*(?:%|\+))?|\d+\+/g);
  return matches ?? [];
}

function digitCore(token: string): string {
  return token.replace(/[^\d.,]/g, "").replace(",", ".");
}

function collectDisplayText(display: AICareerAnalysis["display"]): string {
  const chunks: string[] = [
    display.basics.summary,
    display.basics.headline ?? "",
    ...display.highlights,
    ...display.experience.flatMap((item) => item.highlights),
    ...display.projects.map((p) => p.description),
    ...display.coreExpertise.map((item) => `${item.title} ${item.description}`),
  ];
  return chunks.filter(Boolean).join("\n");
}

function entityAppearsInSource(entity: string, sourceText: string): boolean {
  const normalizedEntity = normalizeForMatch(entity);
  if (normalizedEntity.length < 2) return true;
  const normalizedSource = normalizeForMatch(sourceText);
  return normalizedSource.includes(normalizedEntity);
}

function validateStructuralEntities(
  display: AICareerAnalysis["display"],
  sourceText: string,
): FactViolation[] {
  const violations: FactViolation[] = [];

  for (const [index, item] of display.experience.entries()) {
    if (!entityAppearsInSource(item.company, sourceText)) {
      violations.push({
        severity: "critical",
        field: `experience[${index}].company`,
        message: `Company "${item.company}" not found in source resume text.`,
      });
    }
  }

  for (const [index, item] of display.education.entries()) {
    if (!entityAppearsInSource(item.institution, sourceText)) {
      violations.push({
        severity: "critical",
        field: `education[${index}].institution`,
        message: `Institution "${item.institution}" not found in source resume text.`,
      });
    }
  }

  for (const [index, item] of display.projects.entries()) {
    if (!entityAppearsInSource(item.name, sourceText)) {
      violations.push({
        severity: "critical",
        field: `projects[${index}].name`,
        message: `Project "${item.name}" not found in source resume text.`,
      });
    }
  }

  return violations;
}

function validateNumericFacts(
  display: AICareerAnalysis["display"],
  sourceText: string,
): FactViolation[] {
  const sourceDigits = new Set(
    extractNumericTokens(sourceText).map(digitCore).filter(Boolean),
  );
  const displayText = collectDisplayText(display);
  const displayNumbers = extractNumericTokens(displayText);

  const violations: FactViolation[] = [];

  for (const token of displayNumbers) {
    const core = digitCore(token);
    if (!core) continue;
    if (!sourceDigits.has(core)) {
      violations.push({
        severity: "warning",
        field: "display prose",
        message: `Numeric value "${token}" appears in display text but not in source resume.`,
      });
    }
  }

  return violations;
}

/**
 * Validates that display-layer output does not introduce new companies,
 * institutions, projects, or unstated metrics relative to source resume text.
 */
export function validateDisplayFacts(
  display: AICareerAnalysis["display"],
  sourceText: string,
): FactIntegrityResult {
  const violations = [
    ...validateStructuralEntities(display, sourceText),
    ...validateNumericFacts(display, sourceText),
  ];

  return {
    valid: violations.every((v) => v.severity !== "critical"),
    violations,
  };
}

export function formatFactViolations(violations: FactViolation[]): string[] {
  return violations.map((v) => `${v.severity}: ${v.field} — ${v.message}`);
}

export function hasCriticalFactViolations(violations: FactViolation[]): boolean {
  return violations.some((v) => v.severity === "critical");
}
