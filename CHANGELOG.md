# Changelog

## Unreleased

### Added

- Development workflow rule — `docs/DEVELOPMENT_WORKFLOW.md`, Cursor rule `.cursor/rules/development-workflow.mdc`

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
