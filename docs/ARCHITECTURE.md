# Architecture Decisions

Concise record of the key decisions behind Presence. See
[PRODUCT.md](./PRODUCT.md) for the master product prompt,
[PROJECT_PLAN.md](../PROJECT_PLAN.md) for milestones and
[AI_PIPELINE.md](./AI_PIPELINE.md) for the Career Intelligence roadmap.

## 1. CareerProfile is the central contract

Everything renders from `CareerProfile` (`types/career-profile.ts`). UI never
renders raw AI text. The AI step produces a `CareerProfile`; every downstream
screen (profile, portfolio) is a pure function of it.

Visual identity lives in `CareerProfile.media` (`types/career-media.ts`).
`media.professionalPhoto` holds `original`, `thumbnail`, `active`, `source`, and
optional `crop` (`types/professional-photo.ts`). All surfaces consume
`ProfileAvatar`, which reads from `profile.media` via `getActivePhotoUrl()`.
Never store avatar state in components.

## 2. OpenAI is a structured data provider

- We never request free-form responses. The analyzer uses OpenAI **structured
  outputs** via `zodResponseFormat` and `client.chat.completions.parse`
  (`lib/services/ai/career-analyzer.ts`).
- The response is validated by **Zod** (`lib/services/ai/schema.ts`). Invalid
  responses throw and the UI offers retry.
- Optional fields are modeled as `nullable` (required by strict structured
  outputs) and mapped to `undefined` for the app's display types.
- The prompt enforces factual integrity: preserve facts; never invent
  companies, roles, dates, achievements, or numbers; use null/empty when
  unknown; do not translate resume content.

## 2b. Privacy-first analysis (Alpha 0.1)

Before any OpenAI request, resume text passes through the PII Redaction Layer
(`lib/services/privacy/pii-redactor.ts`):

1. **Redact** — detect name, email, phone, messengers, links, location, age,
   birth date; replace with stable placeholders (`[PERSON_NAME]`, `[EMAIL]`, …).
2. **Analyze** — only `redactedText` is sent to OpenAI. The original file bytes
   and `professionalPhoto` never leave the server for AI.
3. **Restore** — `restoreCareerProfile()` merges personal fields from an
   in-memory `PiiVault` after structured output validation. The published
   portfolio shows real identity data; OpenAI never receives it.

Professional experience (companies, roles, skills, projects) is not redacted.
Tests: `lib/services/privacy/pii-redactor.test.ts` (`npm run test`).

## 3. Display data vs Intelligence data

The analysis returns two separate parts (`types/intelligence.ts`):

- **Display data** -> `CareerProfile`, powers the public portfolio.
- **Intelligence data** -> neutral inference (years, seniority, strengths,
  focus areas, keywords, technologies, industries). Stored in the flow store
  but not rendered directly; reserved for future modules (Job Match, Career
  Insights, etc.).

## 3b. AI module registry

Future AI features are registered in `lib/services/ai/modules/registry.ts`.
Each module consumes `CareerProfile` (+ optional context) and returns structured
data. Stage 2 resume analysis is the only implemented module today. See
[AI_PIPELINE.md](./AI_PIPELINE.md).

## 4. Resume processing: files are transient

`Upload resume (PDF/DOCX/DOC) -> extract text + media -> redact PII -> analyze
-> restore identity -> CareerProfile JSON`. We keep only extracted text;
`media` from PDF is merged into CareerProfile after AI analysis (never sent to
OpenAI). File bytes are never stored. Parsing: `lib/services/resume/resume-parser.ts`.
Portrait extraction: `lib/services/resume/portrait.ts` (original preserved,
square thumbnail + active crop generated, no retouching). Future sources (upload,
LinkedIn, AI portrait) attach via the same `ProfessionalPhoto` shape under
`media`.

## 5. Internationalization

- Russian is the primary, active language. All UI text comes from a dictionary
  (`lib/i18n/dictionaries/ru.ts`); none is hardcoded in components.
- The dictionary shape is canonical (`lib/i18n/types.ts` = `typeof ru`), so any
  future locale must be complete to type-check.
- Components import the active `dict` directly (`lib/i18n`), which is
  SSR-friendly and swappable to per-request locale resolution later.

## 6. Two independent design systems

- **Workspace** (the SaaS app): soft, card-on-canvas, green accent, large radii.
- **Portfolio** (public showcase): editorial, hairline, beautiful light/dark via
  an explicit token scope (`.portfolio-light` / `.portfolio-dark`) so the
  portfolio renders in a chosen mode independent of the workspace theme.

They are intentionally decoupled and evolve separately.

## 7. State across the flow

A single client-side Zustand store (`features/career-flow/store.ts`) holds the
resume, profile, intelligence, appearance, and a `generationCount`. Resets on
refresh (acceptable for MVP; sessionStorage is an easy later add).

## 8. Generation limits (prepared, not enforced)

`lib/config/limits.ts` defines `FREE_GENERATION_LIMIT` and a pure
`canGenerate()` helper, and the store tracks `generationCount`. The
anonymous -> 1 free generation -> register gate can be switched on after auth
without rearchitecting. No registration today.
