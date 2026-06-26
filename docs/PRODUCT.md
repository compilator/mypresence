# Presence — Master Product Prompt

Canonical product vision and decision framework. When implementation choices are
unclear, start here. Technical details: [ARCHITECTURE.md](./ARCHITECTURE.md),
[AI_PIPELINE.md](./AI_PIPELINE.md).

---

## Product Vision

Presence is not a resume builder.

Presence is not a portfolio generator.

Presence is not an AI demo.

Presence is a **Professional Identity Platform**.

Its mission is to help professionals present themselves in the best possible way while maintaining complete trust and privacy.

Every implementation decision must support this vision.

---

## Core Product Philosophy

Presence builds professional presence.

Not websites.

Not resumes.

Not landing pages.

The generated portfolio is simply the first visible representation of a person's Digital Professional Identity.

Everything else grows from that identity.

---

## Product Principles

Whenever there is uncertainty:

- Choose the solution that **increases trust**.

Whenever there is a choice between complexity and elegance:

- Choose **elegance**.

Whenever there is a choice between visual effects and typography:

- Choose **typography**.

Whenever there is a choice between adding features and improving quality:

- **Improve quality**.

---

## The Ten Laws

Non-negotiable rules for architecture, AI, and product decisions.

1. **Resume is temporary. CareerProfile is permanent.**
2. **Parse once. Reuse forever.**
3. **Every AI response must become structured data.**
4. **Never render raw AI output.**
5. **Trust over intelligence.**
6. **Privacy before convenience.**
7. **Typography over decoration.**
8. **Quality before features.**
9. **One source of truth.** (`CareerProfile`)
10. **Every feature should improve someone's chance of receiving an interview invitation.**

---

## Design Language

Apple-inspired. Minimal. Editorial. Timeless. Calm. Elegant.

- Large whitespace
- Soft hierarchy
- Typography first
- Content before UI
- Motion only where it improves clarity

**Avoid:**

- Gradients
- Visual noise
- Heavy glassmorphism
- Startup aesthetics
- Decorative illustrations
- Oversized borders
- Unnecessary animations

Presence should feel expensive because of **restraint**.

---

## Layout Principles

The portfolio should resemble a premium executive website — never a generated resume.

Every page should have:

- Clear hierarchy
- Comfortable reading width
- Editorial rhythm
- Full-width section dividers
- Strong typography

The desktop experience is primary.

---

## Hero Principles

The Hero must answer three questions within five seconds:

1. **WHO** is this person?
2. **WHAT** do they do?
3. **WHY** should I trust them?

### Layout

**LEFT**

- Professional photo
- Full name
- Professional headline
- Short positioning statement
- Location
- Contact buttons

**RIGHT**

- About
- Executive Summary
- Key achievements

Statistics and expertise belong **below** the Hero. Identity always comes before metrics.

---

## Portfolio Hierarchy

```
Hero
  ↓
Snapshot Metrics
  ↓
Core Expertise
  ↓
Experience
  ↓
Projects
  ↓
Skills
  ↓
Education
  ↓
Footer
```

Each section should feel like its own chapter.

---

## Typography

Typography is the interface. Whitespace is decoration. Use hierarchy instead of visual effects.

- Name should always be the strongest element
- Professional headline is secondary
- Positioning paragraph is tertiary
- Reduce unnecessary bold text
- Increase line-height
- Improve readability

---

## CareerProfile

CareerProfile is the heart of Presence.

- Resume is temporary. CareerProfile is permanent.
- Every module must consume CareerProfile.
- No future module may parse the resume again.
- CareerProfile grows over time.

---

## AI Philosophy

OpenAI is not a text generator. It is a **structured intelligence engine**.

- Always request structured JSON
- Always validate using Zod
- Never render raw AI responses
- Never trust free-form output
- Every response becomes structured product data

---

## Truthfulness

AI must **never**:

- Invent companies
- Invent experience
- Invent achievements
- Invent metrics
- Invent education
- Invent projects

If information is missing: return `null` or empty arrays — **never hallucinate**.

Trust is more important than completeness.

---

## Privacy-first

Privacy is a competitive advantage.

**OpenAI never receives:**

- Original PDF (or any resume file bytes)
- Professional photo
- Full name
- Phone
- Email
- Age
- Birth date
- Personal links

The AI analyzes professional experience only. PII is restored on the server after analysis.

**Never compromise this architecture.**

Implementation: `lib/services/privacy/pii-redactor.ts`.

---

## Resume Processing

**Supported formats:** PDF, DOCX, DOC.

The user uploads a **resume** — not a file format.

```
Resume
  ↓
Resume Parser
  ↓
PII Redaction
  ↓
OpenAI
  ↓
CareerProfile
  ↓
Portfolio
```

---

## Digital Professional Identity

CareerProfile should evolve into a complete Digital Professional Identity. Future modules extend this identity — never duplicate information.

Future modules include:

- Job Match
- Resume Optimization
- Portfolio Optimization
- ATS Optimization
- Interview Coach
- Career Score
- Professional Pitch
- Cover Letter
- Company Intelligence
- Salary Negotiation
- Professional Portrait AI
- Learning Roadmap
- Career Timeline
- Dashboard

Registry: `lib/services/ai/modules/registry.ts`.

---

## AI Pipeline

| Stage | Focus |
|-------|--------|
| 1 | Resume → CareerProfile |
| 2 | Improve CareerProfile quality |
| 3 | Vacancy Analysis |
| 4 | Resume Optimization |
| 5 | Portfolio Optimization |
| 6 | Cover Letter |
| 7 | Professional Pitch |
| 8 | Career Intelligence |

Every stage consumes CareerProfile. Nothing parses the resume again.

Details: [AI_PIPELINE.md](./AI_PIPELINE.md).

---

## SEO Philosophy

Portfolio pages are not only beautiful — they must also be **machine-readable**.

Use:

- Semantic HTML
- SSR
- Metadata
- JSON-LD (ProfilePage, Person)
- OpenGraph
- Twitter Cards

Search engines should understand the professional identity. AI agents should understand it even better.

---

## Legal & Trust

Presence should immediately feel trustworthy. Prepare (not all shipped in MVP):

- Privacy Policy
- Terms of Service
- Personal Data Processing Policy
- Cookie Policy
- Security page
- Status page
- Contact page
- Roadmap
- Changelog

Legal pages should not be hidden. Trust should become part of the brand.

---

## Product Voice

Professional. Calm. Confident.

Never hype. Never overpromise. Never use marketing clichés.

Presence speaks like an experienced career advisor.

---

## Final Product Rule

Whenever implementation decisions are unclear, ask:

> **Does this make Presence a better Professional Identity Platform?**

If not — do not implement it.

Presence is not building websites. Presence is building professional identities.
