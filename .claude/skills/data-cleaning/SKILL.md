---
name: data-cleaning
description: Vagaro export import and cleaning pipeline (raw → clean → review → load) and anonymized dev data. Use for scripts/import and any CSV/report ingestion.
---
# Data cleaning pipeline: `export → raw_* → clean → review → load`

**Agent safety:** the agent only ever sees **anonymized** fixtures (`tests/fixtures/`, produced by `scripts/import/anonymize.ts`: fake names/phones/emails, same structure and distributions). Real exports are processed only by the human on staging/prod machines.

| Step | Rule |
|---|---|
| 1 Raw | Load CSV unchanged into `raw_*` tables; keep source files read-only; store file hash to detect re-uploads |
| 2 Phones | E.164 `+1XXXXXXXXXX`; flag invalid |
| 3 Emails | trim + lowercase; validate; flag disposable/fake |
| 4 Names | trim, fix case, split first/last |
| 5 Duplicates | match phone → email → fuzzy name; **proposed merges go to a human review queue, never auto-merge** |
| 6 Dates | to UTC; flag future/impossible dates |
| 7 Services | map to catalog (`Service.vagaroServiceId`); list unmatched |
| 8 Money | integer cents; tax, tip, discount separate |
| 9 Test/staff | drop test clients, staff accounts, $0 test sales |
| 10 Consent | imported clients are **NOT** opted in unless Vagaro shows recorded consent |
| 11 Reconcile | counts, visits, revenue by month vs Vagaro reports — within 1% or STOP and investigate |
| 12 Dev data | anonymized copy for local work |

Every run emits a report (rows in / cleaned / flagged / duplicates proposed / merged) saved to `ImportRun`. Loads are idempotent upserts. Pure cleaning functions live in `src/lib/import/` with table-driven unit tests (phone formats, unicode names, DST edges, refunds).
