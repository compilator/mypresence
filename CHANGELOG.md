# Changelog

## Unreleased

### Added

- Development workflow rule — `docs/DEVELOPMENT_WORKFLOW.md`, Cursor rule `.cursor/rules/development-workflow.mdc`
- No-hallucination guard now detects invented technologies and skills in display output (`validateDisplayFacts`), surfaced as non-critical warnings
- Tests covering invented technologies, invented coreExpertise technologies, and three-layer prompt separation

### Changed

- Resume analysis prompt restructured into three strictly separated layers — factual extraction, display text, intelligence (`lib/services/ai/prompts/*`)
- Factual integrity rules now explicitly forbid inventing technologies, tools, and skills, and state that rewriting changes wording, never facts
- Bumped `ANALYSIS_PROMPT_VERSION` to `2026.06.2` (prompt semantics changed)
- Portfolio polish: footer "Создано в" now pairs with the official wordmark asset (visible in portfolio dark scope), body text +15%, section headings +25%, content blocks tightened by 5px vertically
- Homepage hero headline updated to "Ваша карьера достойно представлена."

## Alpha 0.1 — Privacy-first AI Analysis

### Added

- PII Redaction Layer before OpenAI requests
- Server-side PII vault during analysis
- Restore flow after AI response
- Russian resume PII tests

### Privacy decisions

- Original PDF is not sent to OpenAI
- Professional photo is not sent to OpenAI
- Full name, contacts, links, age and birth date are redacted
- Professional experience remains available for analysis
