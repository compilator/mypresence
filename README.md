# Career Landing AI

AI-powered Career Landing Platform — turn a resume into a premium online career
portfolio. Resume to AI Career Intelligence to Career Website.

See [PROJECT_PLAN.md](PROJECT_PLAN.md) for the full architecture and milestone
plan. The current state is Milestone 0 (foundation only).

## Tech stack

Next.js (App Router) · TypeScript · TailwindCSS v4 · shadcn/ui-style primitives ·
Framer Motion · Lucide · next-themes · Zustand · OpenAI (M3) · Vercel.

## Getting started

```bash
npm install
cp .env.example .env.local   # add OPENAI_API_KEY before Milestone 3
npm run dev
```

Open http://localhost:3000. Use the theme toggle in the header to preview light
and dark.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — lint

## Project structure

```text
app/         routes + global styles (design tokens)
components/  ui primitives, layout shell, shared pieces
features/    per-feature UI + career-flow store
hooks/       reusable hooks
lib/         config, theme registry, motion presets, service seams
types/       CareerProfile and related contracts
```

## Design systems

Two independent token namespaces live in `app/globals.css`:

- Workspace (the SaaS app): soft, card-on-canvas, green accent, large radii.
- Portfolio (public showcase): editorial, hairline, beautiful light/dark.

Light and dark only in the MVP; the theme registry (`lib/theme/themes.ts`) is
structured to add more portfolio styles later.
