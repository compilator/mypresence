import { describe, expect, it } from "vitest";

import { EMPTY_CAREER_MEDIA } from "@/types/career-media";
import type { CareerProfile } from "@/types/career-profile";
import { PII_PLACEHOLDERS } from "@/types/pii-vault";
import {
  containsRawPii,
  redactResumeText,
  restoreCareerProfile,
} from "@/lib/services/privacy/pii-redactor";

const RUSSIAN_RESUME = `
Лим Александр Валерьевич
Fullstack веб-разработчик

Контакты
Email: lim.alexander@example.com
Телефон: +7 (916) 123-45-67
Telegram: @alexdev
LinkedIn: https://www.linkedin.com/in/alexlim
GitHub: https://github.com/alexlim
Сайт: https://alexlim.dev
г. Москва, ул. Тверская, д. 10
Возраст: 35 лет
Дата рождения: 15.03.1989

Опыт работы
ООО «ТехноСофт» — Senior Frontend Developer
2019 — наст. время
Разработка высоконагруженных веб-приложений на React и TypeScript.
`.trim();

describe("redactResumeText", () => {
  it("redacts Russian PII and uses stable placeholders", () => {
    const { redactedText, piiVault, replacements } = redactResumeText(RUSSIAN_RESUME);

    expect(piiVault.personName).toBe("Лим Александр Валерьевич");
    expect(piiVault.email).toBe("lim.alexander@example.com");
    expect(piiVault.phone).toContain("916");
    expect(piiVault.telegram).toBe("@alexdev");
    expect(piiVault.linkedIn).toContain("linkedin.com/in/alexlim");
    expect(piiVault.github).toContain("github.com/alexlim");
    expect(piiVault.website).toContain("alexlim.dev");
    expect(piiVault.location).toMatch(/Москва/i);
    expect(piiVault.age).toMatch(/35/);
    expect(piiVault.birthDate).toMatch(/15\.03\.1989/);

    expect(redactedText).toContain(PII_PLACEHOLDERS.PERSON_NAME);
    expect(redactedText).toContain(PII_PLACEHOLDERS.EMAIL);
    expect(redactedText).toContain(PII_PLACEHOLDERS.PHONE);
    expect(redactedText).toContain(PII_PLACEHOLDERS.TELEGRAM);
    expect(redactedText).toContain(PII_PLACEHOLDERS.LINKEDIN);
    expect(redactedText).toContain(PII_PLACEHOLDERS.GITHUB);

    expect(redactedText).not.toContain("lim.alexander@example.com");
    expect(redactedText).not.toContain("Лим Александр");
    expect(redactedText).not.toMatch(/\+7\s*\(?916/);
    expect(redactedText).not.toContain("linkedin.com/in/alexlim");
    expect(redactedText).not.toContain("@alexdev");

    expect(replacements[PII_PLACEHOLDERS.EMAIL]).toBe("lim.alexander@example.com");
    expect(containsRawPii(redactedText, piiVault)).toBe(false);
  });

  it("preserves professional experience in redacted text", () => {
    const { redactedText } = redactResumeText(RUSSIAN_RESUME);

    expect(redactedText).toContain("ООО «ТехноСофт»");
    expect(redactedText).toContain("Senior Frontend Developer");
    expect(redactedText).toContain("React");
  });
});

describe("restoreCareerProfile", () => {
  it("restores personal fields from vault after AI returns placeholders", () => {
    const { piiVault } = redactResumeText(RUSSIAN_RESUME);

    const aiProfile: CareerProfile = {
      basics: {
        name: PII_PLACEHOLDERS.PERSON_NAME,
        title: "Fullstack веб-разработчик",
        headline: "Fullstack веб-разработчик",
        location: PII_PLACEHOLDERS.LOCATION,
        email: PII_PLACEHOLDERS.EMAIL,
        summary: `Специалист ${PII_PLACEHOLDERS.PERSON_NAME} с опытом в веб-разработке.`,
        links: [],
      },
      experience: [
        {
          company: "ООО «ТехноСофт»",
          role: "Senior Frontend Developer",
          startDate: "2019",
          highlights: ["React", "TypeScript"],
        },
      ],
      education: [],
      skills: [],
      projects: [],
      media: EMPTY_CAREER_MEDIA,
    };

    const restored = restoreCareerProfile(aiProfile, piiVault);

    expect(restored.basics.name).toBe("Лим Александр Валерьевич");
    expect(restored.basics.email).toBe("lim.alexander@example.com");
    expect(restored.basics.location).toMatch(/Москва/i);
    expect(restored.basics.summary).toContain("Лим Александр");
    expect(restored.basics.summary).not.toContain(PII_PLACEHOLDERS.PERSON_NAME);

    const linkUrls = restored.basics.links.map((l) => l.url.toLowerCase());
    expect(linkUrls.some((u) => u.includes("linkedin.com"))).toBe(true);
    expect(linkUrls.some((u) => u.includes("github.com"))).toBe(true);
    expect(linkUrls.some((u) => u.includes("t.me"))).toBe(true);
  });
});
