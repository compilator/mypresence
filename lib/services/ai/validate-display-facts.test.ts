import { describe, expect, it } from "vitest";

import { ANALYSIS_PROMPT_VERSION } from "@/lib/config/analysis";
import {
  DISPLAY_REWRITE_RULES,
  FACTUAL_INTEGRITY_RULES,
  INTELLIGENCE_LAYER_RULES,
  RESUME_ANALYSIS_SYSTEM_PROMPT,
} from "@/lib/services/ai/prompts/resume-analysis";
import type { AICareerAnalysis } from "@/lib/services/ai/schema";
import {
  extractNumericTokens,
  hasCriticalFactViolations,
  validateDisplayFacts,
} from "@/lib/services/ai/validate-display-facts";

const SOURCE_RESUME = `
ООО «ТехноСофт» — Senior Frontend Developer
2019 — наст. время
Работа с сайтом компании.
Увеличение конверсии на 20%.
Стек: React, TypeScript.

Проект: Корпоративный портал
Описание: внутренний портал для сотрудников.

Образование: МГУ, бакалавр информатики
`.trim();

function buildDisplay(
  overrides: Partial<AICareerAnalysis["display"]> = {},
): AICareerAnalysis["display"] {
  return {
    basics: {
      name: "[PERSON_NAME]",
      title: "Senior Frontend Developer",
      headline: "Fullstack веб-разработчик",
      location: null,
      email: null,
      summary: "Разработчик с опытом создания корпоративных веб-приложений.",
      links: [],
    },
    experience: [
      {
        company: "ООО «ТехноСофт»",
        role: "Senior Frontend Developer",
        startDate: "2019",
        endDate: null,
        location: null,
        highlights: [
          "Разработал и поддерживал корпоративный сайт компании, улучшая структуру страниц и пользовательский опыт.",
          "Повысил конверсию корпоративного сайта на 20% после доработки структуры и пользовательского сценария.",
        ],
      },
    ],
    education: [
      {
        institution: "МГУ",
        degree: "бакалавр информатики",
        startDate: null,
        endDate: null,
      },
    ],
    skills: [{ category: "Frontend", skills: ["React", "TypeScript"] }],
    projects: [
      {
        name: "Корпоративный портал",
        description: "Поддерживал внутренний портал для сотрудников.",
        url: null,
        tags: [],
      },
    ],
    highlights: [],
    coreExpertise: [],
    ...overrides,
  };
}

describe("resume analysis prompt", () => {
  it("uses the updated prompt version", () => {
    expect(ANALYSIS_PROMPT_VERSION).toBe("2026.06.2");
  });

  it("separates factual extraction, display text, and intelligence layers", () => {
    expect(RESUME_ANALYSIS_SYSTEM_PROMPT).toContain("FACTUAL INTEGRITY");
    expect(RESUME_ANALYSIS_SYSTEM_PROMPT).toContain("LAYER 1 — FACTUAL EXTRACTION");
    expect(RESUME_ANALYSIS_SYSTEM_PROMPT).toContain("LAYER 2 — DISPLAY TEXT");
    expect(RESUME_ANALYSIS_SYSTEM_PROMPT).toContain("LAYER 3 — INTELLIGENCE");
    expect(DISPLAY_REWRITE_RULES).toContain("LAYER 1 — FACTUAL EXTRACTION");
    expect(DISPLAY_REWRITE_RULES).toContain("LAYER 2 — DISPLAY TEXT");
    expect(INTELLIGENCE_LAYER_RULES).toContain("INTELLIGENCE LAYER");
  });

  it("forbids inventing facts in the factual integrity rules", () => {
    expect(FACTUAL_INTEGRITY_RULES).toContain("Do NOT invent companies");
    expect(FACTUAL_INTEGRITY_RULES).toContain("skills");
    expect(FACTUAL_INTEGRITY_RULES).toContain("Rewriting changes WORDING, never FACTS");
  });

  it("keeps achievement rewrite rules with strong action verbs", () => {
    expect(DISPLAY_REWRITE_RULES).toContain("ACHIEVEMENT REWRITE RULES");
    expect(DISPLAY_REWRITE_RULES).toContain("Разработал");
    expect(INTELLIGENCE_LAYER_RULES).toContain("Never invent industry labels");
  });
});

describe("validateDisplayFacts", () => {
  it("accepts rewritten achievements when companies and metrics exist in source", () => {
    const result = validateDisplayFacts(buildDisplay(), SOURCE_RESUME);
    expect(result.valid).toBe(true);
    expect(hasCriticalFactViolations(result.violations)).toBe(false);
  });

  it("rejects invented company names", () => {
    const display = buildDisplay({
      experience: [
        {
          company: "Fake Global Corp",
          role: "Developer",
          startDate: "2020",
          endDate: null,
          location: null,
          highlights: ["Built internal tools."],
        },
      ],
    });

    const result = validateDisplayFacts(display, SOURCE_RESUME);
    expect(result.valid).toBe(false);
    expect(result.violations.some((v) => v.field.includes("company"))).toBe(true);
  });

  it("rejects invented metrics not present in source", () => {
    const display = buildDisplay({
      experience: [
        {
          company: "ООО «ТехноСофт»",
          role: "Senior Frontend Developer",
          startDate: "2019",
          endDate: null,
          location: null,
          highlights: ["Повысил конверсию на 50%."],
        },
      ],
    });

    const result = validateDisplayFacts(display, SOURCE_RESUME);
    expect(result.violations.some((v) => v.message.includes("50%"))).toBe(true);
  });

  it("accepts skills and technologies that exist in the source", () => {
    const result = validateDisplayFacts(buildDisplay(), SOURCE_RESUME);
    expect(
      result.violations.some((v) => v.field.startsWith("skills")),
    ).toBe(false);
  });

  it("flags invented technologies as a non-critical warning", () => {
    const display = buildDisplay({
      skills: [{ category: "Backend", skills: ["Kubernetes"] }],
    });

    const result = validateDisplayFacts(display, SOURCE_RESUME);
    const techViolation = result.violations.find((v) =>
      v.message.includes("Kubernetes"),
    );
    expect(techViolation).toBeDefined();
    expect(techViolation?.severity).toBe("warning");
    expect(hasCriticalFactViolations(result.violations)).toBe(false);
  });

  it("flags invented coreExpertise technologies", () => {
    const display = buildDisplay({
      coreExpertise: [
        {
          title: "Frontend Engineering",
          description: "Создание корпоративных веб-приложений.",
          technologies: ["GraphQL"],
        },
      ],
    });

    const result = validateDisplayFacts(display, SOURCE_RESUME);
    expect(result.violations.some((v) => v.message.includes("GraphQL"))).toBe(
      true,
    );
  });

  it("rejects invented project names", () => {
    const display = buildDisplay({
      projects: [
        {
          name: "Stealth AI Platform",
          description: "Confidential project.",
          url: null,
          tags: [],
        },
      ],
    });

    const result = validateDisplayFacts(display, SOURCE_RESUME);
    expect(result.valid).toBe(false);
  });

  it("extracts numeric tokens from prose", () => {
    expect(extractNumericTokens("Повысил конверсию на 20%")).toEqual(["20%"]);
    expect(extractNumericTokens("12+ лет опыта")).toEqual(["12+"]);
  });
});
