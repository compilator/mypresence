# Presence AI Pipeline — Career Intelligence Roadmap

Presence is not a portfolio generator. It is an AI Career Platform. The
portfolio is the first visible result.

**CareerProfile is the single source of truth.** Every AI module consumes
`CareerProfile` and produces additional structured data. Never rebuild knowledge
from scratch — always extend it.

See also: [ARCHITECTURE.md](./ARCHITECTURE.md) for implementation details.

---

## Design philosophy

- Presence is not an AI prompt collection — it is a professional assistant.
- The user never sees prompts; they only experience outcomes.
- AI is invisible. Trust is visible.
- Every new feature must answer: *Will this increase the user's chance of
  receiving an interview invitation?*

---

## Stage 1 — MVP (shipped)

```
Resume (PDF/DOCX/DOC) → Extract Text + Media → Redact PII → Analyze → Restore → CareerProfile → Portfolio
```

Implemented: multi-format resume parsing, PDF media extraction (profile photo),
PII redaction before OpenAI, server-side restore after analysis, OpenAI structured
outputs, Zustand flow, executive portfolio rendering.

---

## Stage 2 — CareerProfile quality (in progress)

The AI must **understand** the candidate professionally, not only extract fields.

Generate:

- Executive Summary (`basics.summary`)
- Professional Headline (`basics.headline`)
- Core Expertise (`coreExpertise[]`)
- Skills by category (`skills[]`)
- Technologies & industries (`intelligence.technologies`, `intelligence.industries`)
- Projects, experience timeline

**Rules:** Never invent facts, companies, metrics, or achievements. Missing
information → `null` or empty arrays.

Implementation: `lib/services/ai/career-analyzer.ts`, `lib/services/ai/schema.ts`.

---

## Stage 3 — Vacancy Analysis (next milestone)

```
CareerProfile + Job Description → AI Comparison → JobMatch
```

Output type: `types/modules/job-match.ts` (defined, not implemented).

Fields: `matchScore`, `matchingSkills`, `missingSkills`, `recommendations`,
`atsKeywords`.

Foundation for all career tools.

---

## Stage 4 — Resume Optimization

```
CareerProfile + Job Description → Optimized Resume
```

Never invent experience. Improve presentation only (ATS, clarity, action verbs,
measurable impact).

Type seam: `types/modules/resume-optimization.ts`.

---

## Stage 5 — Portfolio Optimization

Adapt portfolio **hierarchy** to a selected vacancy (e.g. frontend projects
higher for a frontend role). Truthful content; only reordering/emphasis.

Type seam: `types/modules/portfolio-optimization.ts`.

---

## Stage 6 — Cover Letter

```
CareerProfile + Job Description → Cover Letter
```

Natural, professional, one real achievement, confident CTA.

Type seam: `types/modules/cover-letter.ts`.

---

## Stage 7 — Professional Pitch

Generate from CareerProfile (single intelligence layer, no duplicated prompts):

- LinkedIn About
- HH About
- Professional / Short / Speaker Bio

Type seam: `types/modules/professional-pitch.ts`.

---

## Stage 8 — Professional Insights

Career Intelligence (not shown directly in portfolio):

- Hidden strengths, positioning, career themes
- Competitive advantages, specializations
- Industry fit, growth recommendations

Stored in `IntelligenceData` extensions. Type seam: `types/modules/career-insights.ts`.

---

## Future modules (architecture only)

| Module | Consumes | Produces |
|--------|----------|----------|
| Job Match | CareerProfile + JD | JobMatch |
| ATS Optimization | CareerProfile + JD | ATSReport |
| Resume Optimization | CareerProfile + JD | OptimizedResume |
| Portfolio Optimization | CareerProfile + JD | PortfolioLayout |
| Cover Letter | CareerProfile + JD | CoverLetter |
| Professional Pitch | CareerProfile | PitchBundle |
| Company Research | CareerProfile + Company | CompanyIntel |
| Interview Prep | CareerProfile + JD | InterviewGuide |
| Salary Negotiation | CareerProfile + Offer | NegotiationBrief |
| Learning Roadmap | CareerProfile + Goal | LearningPlan |
| Career Score | CareerProfile | CareerScore |
| Professional Portrait AI | CareerProfile | ProfessionalPhoto |

Registry: `lib/services/ai/modules/registry.ts`.

**Rule:** Never parse the resume twice. All modules read `CareerProfile`.
