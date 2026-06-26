# Career Landing AI — Project Plan

AI-powered Career Landing Platform. Transforms a resume into a premium online
career portfolio with AI assistance.

> Vision: Resume to AI Career Intelligence to Career Website.

**Product north star:** [docs/PRODUCT.md](./docs/PRODUCT.md)

This document is the source of truth for architecture and milestones. It is
built incrementally; each milestone leaves the app in a working state and is
approved before the next begins.

## Confirmed decisions

- AI: Real OpenAI via a Server Action that turns resume text into a structured
  `CareerProfile`. PDF to text is mocked behind a service seam (swappable later).
- State: Client-side store (Zustand) holds the profile across the flow; resets on
  refresh.
- Out of scope for MVP: auth, database, payments, dashboard, editing,
  subscriptions. Light/Dark only, with theming architected for future styles.

## Two independent design systems

Workspace UI and Portfolio UI are separate token namespaces — related but not
identical (see `app/globals.css`).

- Workspace (SaaS app): card-on-canvas, large radii (20–28px), soft diffuse
  shadows, green accent, near-borderless. Used by landing, upload, analysis,
  profile, appearance.
- Portfolio (public showcase): editorial, large display type, hairline
  structure, beautiful light and dark ("engineered glass at dusk"). Rendered
  outside the workspace shell.

Both extracted from the provided visual references and tuned for Apple/Linear/Arc
calm minimalism over admin-dashboard density.

## Tech stack

- Next.js (App Router) + TypeScript + TailwindCSS v4
- shadcn/ui (manual, CVA-based primitives), Framer Motion, Lucide
- Backend: Next.js Server Actions
- AI: OpenAI API (M3)
- Future: Supabase (auth/storage/db), Vercel deploy

## Folder structure

```text
app/            # routes (App Router) + global styles
components/
  ui/           # primitives (Button, ...)
  layout/       # AppShell, SiteHeader, SiteFooter
  shared/       # Logo, ThemeToggle, Reveal, ...
features/       # per-feature UI (landing, resume-upload, analysis, ...)
  career-flow/  # cross-screen Zustand store
hooks/          # reusable hooks (use-career-flow)
lib/
  config/       # site config
  theme/        # theme registry seam (future design styles)
  motion/       # Framer Motion presets
  services/     # seams: resume-parser (mock), ai/career-analyzer (OpenAI)
types/          # CareerProfile, ParsedResume, AppearanceConfig
```

## Core data model

`types/career-profile.ts` `CareerProfile` is the single contract: `basics`,
`experience[]`, `education[]`, `skills[]`, `projects[]`, optional `highlights`.
The AI Server Action returns this shape; profile and portfolio screens render
from it.

## Flow

```
Landing -> Upload -> Analysis -> Profile -> Appearance -> Portfolio -> Publish
```

State persists in the Zustand store (`features/career-flow/store.ts`).
`parseResume()` (mock) produces resume text; `analyzeResume()` (OpenAI) produces
the `CareerProfile`.

## Milestones

Each milestone: Goal / Scope / Files / New components / Risks / Acceptance.

### M0 — Scaffold & Foundation (this milestone)

- Goal: runnable, styled app shell with the dual design-token system and theming.
- Scope: Next.js+TS+Tailwind init; install shadcn deps, Framer Motion, Lucide,
  next-themes, zustand; folder structure; tokens; theme provider + toggle; base
  layout/shell; service + store seams; docs.
- Acceptance: `npm run dev` renders a styled foundation page; light/dark toggle
  works; `npm run build` and lint pass; no feature screens implemented.

### M1 — Landing Page

- Goal: premium marketing page, one primary CTA to `/upload`.
- Scope: hero, value props, how-it-works, footer; subtle motion; mobile-first.
- Files: `app/(marketing)/page.tsx`, `features/landing/*`.
- Acceptance: responsive landing, CTA routes to upload, calm animations.

### M2 — Resume Upload

- Goal: drag-and-drop PDF upload + validation; mocked `parseResume()`.
- Files: `app/upload/page.tsx`, `features/resume-upload/*`,
  `lib/services/resume-parser.ts`, store writes.
- Acceptance: valid PDF accepted, invalid rejected; resume saved to store;
  navigates to analysis.

### M3 — AI Analysis (real OpenAI)

- Goal: `analyzeResume` Server Action returns typed `CareerProfile`.
- Files: `app/analysis/page.tsx`, `features/analysis/*`,
  `lib/services/ai/career-analyzer.ts`, `lib/services/ai/openai.ts`.
- Risks: key/quota, JSON reliability, latency. Requires `OPENAI_API_KEY`.
- Acceptance: populated profile on success; graceful error + retry.

### M4 — Career Profile Preview

- Goal: render structured profile from store (read-only).
- Files: `app/profile/page.tsx`, `features/career-profile/*`.
- Acceptance: renders from store, handles sparse data, routes to appearance.

### M5 — Appearance Selection

- Goal: choose light/dark + portfolio style via theme registry.
- Files: `app/appearance/page.tsx`, `features/appearance/*`, `lib/theme/*`.
- Acceptance: selection persists in store and affects portfolio preview.

### M6 — Portfolio Preview & Publish

- Goal: theme-driven portfolio from profile + appearance; mock publish.
- Files: `app/portfolio/page.tsx`, `features/portfolio/*`.
- Acceptance: polished portfolio reflecting appearance; publish success state;
  end-to-end flow works.

## Future modules (architected for, not built)

Career Score, Resume Review, Job Match, Cover Letter, LinkedIn Generator, AI
Career Assistant, multiple design styles, premium subscription. Each gets a
`features/*` folder and a service seam when implemented.
