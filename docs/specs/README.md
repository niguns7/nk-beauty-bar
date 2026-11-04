# Spec backlog (one spec = one branch = one PR)

Copy `_template.md` to `NNN-slug.md`, fill it in (10–20 lines), then ask the agent for a **plan only**. Phases refer to `../production-plan.md`.

| # | Slice | Phase | BRD refs |
|---|---|---|---|
| 000 | Agent setup: rules, hooks, skills, CI (this PR) | A | — |
| 001 | Test infra: dirs, MSW fake Vagaro, anonymized fixtures, integration DB helper | A | NFR-4 |
| 002 | Schema foundation: Client, Consent, Visit, Sale, SyncRun, ImportRun, AuditLog | A | §10 |
| 003 | Feature flags (table + helper, default off, allow-list) | A | §7 plan |
| 004 | Staging env + Sentry/PostHog with PII scrubbing | A | NFR-6 |
| 005 | Cleaning functions (phone/email/name/dates/money) + anonymizer | B | §9 |
| 006 | Raw→clean→load import pipeline + ImportRun report | B | FR-V2,V3,V6 |
| 007 | Reconciliation report vs Vagaro totals (≤1%) | B | NFR-4 |
| 008 | Role-based admin auth, server-side authz, replace ADMIN_TOKEN | B | FR-A9 |
| 009 | Admin overview KPIs | B | FR-A1 |
| 010 | UTM/offer-code capture | B | FR-W5, BO-3 |
| 011 | Client auth (phone code + magic link), rate limits | C | FR-P1 |
| 012 | Vagaro client matching (verified phone/email) | C | FR-P2, BR-L7 |
| 013 | Profile steps + one-time reward | C | FR-P3 |
| 014 | Consent (email/SMS, timestamped) | C | FR-P4, BR-D2 |
| 015 | Vagaro webhooks: signature, idempotent events, retry/alert | C | FR-V1,V4 |
| 016 | Daily report import job + sync status in admin | C | FR-V2,V5 |
| 017 | Loyalty ledger + pure rules engine + settings | D | FR-L1,L2, BR-L* |
| 018 | Portal: stamp card, points, rewards | D | FR-P5 |
| 019 | Email automations (welcome … gift-card reminder) + unsubscribe | D | FR-M1,M3 |
| 020 | Production shadow-mode daily reconciliation job + alerts | D | NFR-4 |
| 021 | Segments (new/developing/loyal/VIP/at-risk/lapsed) | E | FR-O1 |
| 022 | Offers engine + guardrails (BR-O4..O9) + unique codes + redemption tracking | E | FR-O2,O3 |
| 023 | Funnels + channel report + ad spend entry | E | FR-A2,A3 |
| 024 | Cohorts, profit, ZIP heatmap | E | FR-A5..A7 |
| 025 | Exports + audit log; data download/delete | E | FR-A10, FR-P9 |
| 026 | k6 load tests + fixes | E | NFR-1,2 |
| 027 | Security review pass + headers/CSP/rate limits | E | NFR-5 |
| 028 | SMS (after 10DLC approval) + STOP/quiet hours | G | FR-M2,M3 |
| 029 | Private beta allow-list + launch checklist | F | — |
