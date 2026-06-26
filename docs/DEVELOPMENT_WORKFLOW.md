# Development Workflow

## Purpose

All code changes in this project must follow a controlled engineering workflow.

Do not make random edits.

Do not leave unreviewed changes.

Do not skip verification.

Every implementation must go through:

1. Plan
2. Implement
3. Review
4. Verify
5. Commit
6. Merge
7. Push

---

## 1. Plan

Before editing code:

- read relevant documentation
- understand the requested change
- identify affected files
- explain the intended approach briefly
- confirm that the change matches the current product direction

Always check:

- `docs/PRODUCT.md`
- `docs/ARCHITECTURE.md`
- `docs/AI_PIPELINE.md`
- `CHANGELOG.md`
- `AGENTS.md`

For UI changes also check:

- design philosophy
- portfolio hierarchy
- product voice

For AI changes also check:

- privacy-first pipeline
- PII redaction
- JSON structured outputs
- Zod validation

---

## 2. Implement

Make the smallest safe change that satisfies the task.

Rules:

- do not rewrite unrelated code
- do not refactor without a reason
- do not introduce new architecture unless requested
- preserve existing conventions
- keep components reusable
- keep CareerProfile as the single source of truth
- never bypass privacy-first AI rules

---

## 3. Review Code

After implementation, review the changed files yourself.

Check:

- readability
- type safety
- naming
- unused imports
- duplicated logic
- broken abstractions
- privacy leaks
- UI regressions
- accessibility regressions

If the change affects AI:

- verify no raw PII is sent to OpenAI
- verify schema validation remains active
- verify no raw AI text is rendered directly

If the change affects portfolio:

- verify layout still follows executive profile hierarchy
- verify typography remains Apple-inspired and editorial
- verify mobile layout is not broken

---

## 4. Verify

Run required checks before committing.

Minimum:

```bash
npm run lint
npm run build
```

If tests exist or the change affects logic:

```bash
npm run test
```

If the change affects one specific module, run the relevant targeted tests when possible.

Do not commit if build or lint fails.

If a check fails:

- fix the issue
- rerun the check
- only proceed after passing verification

---

## 5. Commit

Before committing:

```bash
git status
git diff
```

Review the diff.

Commit only related files.

Use clear commit messages.

Format:

```text
type(scope): short description
```

Examples:

```text
feat(portfolio): refine executive hero layout
fix(privacy): keep PII redacted before OpenAI request
docs(product): add trust center legal pages
chore(workflow): add development workflow rule
```

Allowed types:

- feat
- fix
- docs
- refactor
- style
- test
- chore
- perf

---

## 6. Merge

If working on a feature branch:

- keep changes isolated
- merge only after build, lint and tests pass
- avoid mixing multiple unrelated tasks in one branch
- do not merge unfinished work into main

Preferred branch naming:

```text
feature/portfolio-hero-refinement
fix/pii-redaction-phone
docs/trust-center
chore/dev-workflow
```

---

## 7. Push

After commit or merge:

```bash
git push
```

Then provide a short summary:

- what changed
- files affected
- checks run
- commit hash
- any risks or follow-up tasks

---

## Non-negotiable Rules

Never commit secrets.

Never commit `.env.local`.

Never commit API keys.

Never send original resume files to OpenAI.

Never send photos to OpenAI.

Never bypass PII redaction.

Never render unvalidated AI output.

Never skip build verification.

Never make unrelated changes.

---

## Output Format After Every Task

After completing a task, report:

```text
Implemented:
- ...

Reviewed:
- ...

Verified:
- npm run lint
- npm run build
- npm run test

Git:
- branch:
- commit:
- pushed: yes/no

Notes:
- ...
```

---

## Final Principle

Presence is a product, not an experiment.

Every change must leave the project safer, cleaner and closer to launch.
