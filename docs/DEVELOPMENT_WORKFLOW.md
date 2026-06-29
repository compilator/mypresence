# Development & Deployment Workflow

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
6. Push
7. Pull Request
8. Merge
9. Production Deployment & Sync

## Deployment target

- Production branch: `main`
- Vercel automatically deploys every commit pushed to `main`.
- `main` must always remain production-ready.
- Never push unfinished work to `main`. Never deploy directly from a feature branch.

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

### AI Changes Checklist

If AI prompts changed:

- bump prompt version (`ANALYSIS_PROMPT_VERSION`)
- update `CHANGELOG.md`
- run AI tests (`npm run test`)
- verify no hallucinated facts (companies, achievements, technologies, skills, metrics)
- verify PII protection (redaction before OpenAI, restore after)
- verify output schema (Zod structured output still valid)

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

### Branch discipline

Always work inside a feature branch. Never commit directly to `main`.

Preferred branch naming:

```text
feature/<feature-name>
fix/<bug-name>
docs/<doc-name>
chore/<task-name>
```

---

## 6. Push

After commit, push the feature branch:

```bash
git push -u origin <feature-branch>
```

---

## 7. Pull Request

If GitHub CLI (`gh`) is available:

- create the Pull Request automatically
- output the PR URL

If `gh` is unavailable, output:

- branch name
- compare URL
- target branch (`main`)

Then stop and wait for the user. Do not attempt to merge through Git commands.

---

## 8. Merge

Only after the user confirms the Pull Request is approved.

If GitHub CLI is available:

```bash
gh pr merge --merge --delete-branch
```

Otherwise, wait until the user merges via the GitHub UI.

Never force-push. Never merge locally unless explicitly requested.

---

## 9. Production Deployment & Sync

After the merge is confirmed, synchronize the local repository:

```bash
git checkout main
git pull origin main
```

Delete the local feature branch:

```bash
git branch -d <feature-branch>
```

If the remote branch still exists:

```bash
git push origin --delete <feature-branch>
```

Verify a clean working tree.

---

## 10. Verify Deployment

After `main` is updated, inform the user:

> Vercel will automatically deploy the new Production version because Production is connected to the `main` branch.

If a deployment URL is available, display it. Otherwise, remind the user that deployment can be monitored in the Vercel dashboard.

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

Never commit directly to `main`.

Never push unfinished work to `main`.

Never deploy directly from a feature branch.

Never force-push unless explicitly requested.

Never merge locally unless explicitly requested.

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

Deployment:
- merged to main: yes/no
- production deployment triggered: yes/no

Notes:
- ...
```

---

## Final Principle

Presence is a product, not an experiment.

Every change must leave the project safer, cleaner and closer to launch.
