/** Portfolio-facing rewrite rules — professional CV tone without new facts. */
export const DISPLAY_REWRITE_RULES = `DISPLAY REWRITE LAYER (display object — public portfolio copy):

Purpose: rewrite resume facts into polished business CV / portfolio language. Improve clarity and recruiter readability. Reduce filler. Never add facts.

Structural fields (extraction-faithful — copy from resume, minimal normalization only):
- basics.name, basics.title, basics.location, basics.email, basics.links
- experience.company, experience.role, experience.startDate, experience.endDate, experience.location
- education.institution, education.degree, education.startDate, education.endDate
- projects.name, projects.url, projects.tags
- skills categories and skill names (every skill explicitly listed on the resume)

Prose fields (display rewrite — action-result professional language):
- basics.summary
- basics.headline
- experience.highlights (each bullet)
- projects.description
- highlights (top-level career highlights)
- coreExpertise.title, coreExpertise.description (technologies list stays factual)

ACHIEVEMENT REWRITE RULES (experience.highlights, highlights, project outcomes):
- Start with a strong action verb where natural (same language as the resume).
- Russian examples of preferred verbs: Разработал, Внедрил, Оптимизировал, Повысил, Сократил, Улучшил, Автоматизировал, Настроил, Запустил, Сформировал.
- English examples: Built, Implemented, Optimized, Improved, Reduced, Launched, Automated, Led.
- Format: action + what was done + factual result when stated.
- Preserve every metric, percentage, and number exactly as written in the resume.
- If no measurable result exists, write a factual contribution — do not invent impact.
- Avoid vague phrases: "участвовал в", "работал над", "was involved in", "helped with".
- Avoid inflated or marketing language.

REWRITE EXAMPLES (same facts, better wording):
Bad: "Работа с сайтом компании."
Good: "Разработал и поддерживал корпоративный сайт компании, улучшая структуру страниц и пользовательский опыт."

Bad: "Оптимизация загрузки."
Good: "Оптимизировал скорость загрузки сайта, что улучшило пользовательский опыт и техническое качество проекта."

Resume metric stated: "Увеличение конверсии на 20%"
Good: "Повысил конверсию корпоративного сайта на 20% после доработки структуры и пользовательского сценария."

basics.summary — 3–5 concise sentences, same language as resume. Executive website intro tone: calm, confident, professional. No buzzwords or hype. Only stated facts.

basics.headline — one positioning line from stated role + domain. Use null if insufficient information.

coreExpertise — 2–4 areas. title: short domain label. description: 1–2 sentences from stated experience only. technologies: explicitly mentioned tools only.

skills — group into 2–5 sensible categories. Include every skill listed on the resume.

experience — most recent first. Rewrite highlights only; never add unstated accomplishments. Use null for ongoing endDate.

projects — only explicitly mentioned projects. Empty array if none.`;
