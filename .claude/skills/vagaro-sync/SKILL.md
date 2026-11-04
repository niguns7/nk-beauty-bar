---
name: vagaro-sync
description: Rules for anything touching Vagaro — src/lib/vagaro, webhooks, report imports, booking handoff, reconcile cron. Use before editing those areas.
---
# Vagaro sync

## Principles
- Vagaro is the source of truth. We are READ-ONLY: no booking creation, payments, refunds, gift-card redemption.
- Approved API scope is limited (customers, appointments, employees, locations; approval can take ~7 business days). Sales, gift cards, memberships, packages come from **daily report imports** (CSV/report) until proven otherwise. Record the confirmed scope in `docs/decisions.md`.
- Tests and local dev use MSW mocks in `tests/mocks/vagaro/` + anonymized fixtures. **Never call the live API in tests, load tests or from the agent.**

## Layout
`src/lib/vagaro/client.ts` (read-only HTTP, timeout, retry) · `mappers.ts` (Vagaro → domain, Zod-parsed) ·
`webhooks.ts` (signature check) · `import/` (report parsers). Mapping tables: Vagaro service → `Service.vagaroServiceId`.

## Webhooks
1. Verify signature over the RAW body with constant-time compare BEFORE parsing; reject on mismatch (401), log client/appointment IDs only.
2. Zod-parse (`.strict()` on our envelope; tolerate unknown vendor fields explicitly via `.passthrough()` only where needed, then strip).
3. Persist an event row keyed by Vagaro event/appointment id (idempotency) and enqueue processing; respond 2xx fast.
4. Processing is idempotent: same event twice → same final state. Out-of-order events must not regress state (compare Vagaro `updatedAt`).

## Imports
- Raw → clean → load (see `data-cleaning`). Upsert by Vagaro natural key; a re-run changes nothing.
- Retry with exponential backoff + jitter; after N consecutive failures write a `SyncRun` failure and alert admin (FR-V4). Show last-success time in admin (FR-V5).
- Every run writes a report: rows in / loaded / flagged / duplicates.

## Must-have tests
duplicate webhook → one effect · bad signature → rejected, nothing stored · malformed payload → 400 · re-run import → zero diff · Vagaro 429/5xx → retried, then alert.
