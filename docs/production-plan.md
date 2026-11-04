# NK Client Intelligence — Phased Production Plan

Status date: 2026-11-04. Owner: NK Beauty Bar. Companion docs: `brd.md`, `decisions.md`, `specs/README.md` (slice backlog).

## 0. Where the repo is today (so we plan from reality)

| Already built (main) | Not built yet |
|---|---|
| Next 16 site, Prisma/Postgres catalog (services, bundles, offers), pure pricing engine, server `Quote` + Vagaro handoff, admin routes (token), reconcile cron, gift-card + Glow Club pages, catalog import script, Dockerfile/compose, 5 test files | Client auth + portal, consent, Client/Visit/Sale tables, Vagaro webhooks + report imports, loyalty ledger, segments/funnels/dashboard, messaging, feature flags, roles, CI, observability, test infra (MSW/integration DB/k6) |

## 1. Timeline decision (needs owner sign-off)

The BRD offers **launch Dec 1 or Jan 5**. Dec 1 is ~4 weeks away; the 8-week plan ends ~Dec 30, and shadow mode needs 2 weeks of reconciled data plus Vagaro API approval (up to ~7 business days). **Recommendation: public launch Jan 5, 2027.** Pre-holiday we only ship *non-checkout, read-only* improvements (already-built gift-card/bonus content, UTM tracking). Freeze: **no production changes to booking/checkout Dec 18–24**; shadow mode keeps running safely.

## 2. Operating model (agent-enforced)

One slice = one spec (`docs/specs/NNN-*.md`) = one branch = one PR (< ~400 lines). Loop: spec → plan-only → failing tests → implement → `npm run check` → `reviewer` + `security-review` → human reads diff → staging preview → merge. Guardrails are in code, not memory: `CLAUDE.md`, `.claude/settings.json` permissions, `.claude/hooks/guard.mjs` (blocks secrets/prod/destructive; tested in `tests/guard.test.ts`), post-edit typecheck+lint hook, CI (typecheck, lint, tests, prisma validate, gitleaks, audit, Semgrep), PR template.

## 3. Phases, gates and exit criteria

### Phase A — Foundation (Week 1: Nov 4–10) · env: local
Agent setup (this PR) → CI green on `main` → test infra: `tests/{unit,integration,e2e,mocks/vagaro,fixtures,load}`, MSW fake Vagaro, throwaway-Postgres integration helper → schema foundation (Client, Consent, Visit, Sale, SyncRun, ImportRun, AuditLog, FeatureFlag) → feature-flag helper (settings table, default OFF) → staging environment + Sentry (PII-scrubbed).
**Gate:** CI green; a trivial slice completed end-to-end through the full loop; staging deploys a preview; guard hook test passes. *Owner checkpoint:* agent setup works.
**Also this week (long-lead, owner action):** apply for Vagaro API access; start Twilio/10DLC business registration; draft privacy policy + terms; decide hosting (see D-003) .

### Phase B — Data & admin (Week 2: Nov 11–17) · env: local → staging
Cleaning pipeline (`scripts/import`, `src/lib/import`) + anonymizer; historical import 12–24 mo into staging; reconcile report; admin roles (OWNER/STRATEGIST/FRONT_DESK) with server-side authz replacing the single `ADMIN_TOKEN`; admin overview (FR-A1); UTM/offer-code capture (FR-W5).
**Gate (Phase 0 → 1 in BRD terms):** all flows work on fake data; imported data reconciles to Vagaro **within 1%** for clients, visits, monthly revenue; front-desk login cannot open reports (manual test).

### Phase C — Client journey + Vagaro sandbox (Weeks 3–4: Nov 18–Dec 1) · env: staging
Client auth (phone code + magic link, rate-limited), profile step-by-step + one-time reward, separate email/SMS consent with timestamps, Vagaro webhooks (signature, idempotent), daily report import, sync status in admin, retry + alerting.
**Gate (BRD Phase 1):** webhooks received and verified in staging with staging keys; daily import re-runnable; matches Vagaro within 1–2%; owner walks the client journey. If API approval is late, run on report/CSV imports (A-3) — plan does not block.

### Phase D — Loyalty + shadow mode (Weeks 5–6: Dec 2–15) · env: staging → production (admin only)
Loyalty ledger + rules engine (spec-first, exhaustive table tests), admin-editable settings, automated emails (welcome, 2nd-visit, due-back, miss-you, win-back, birthday, review, gift-card bonus) behind flags, **production shadow mode**: live sync, clients see nothing, daily reconciliation job.
**Gate (BRD Phase 2):** 1–2 weeks reconciled daily, zero duplicate stamps in audit query, owner trusts dashboard numbers. Release checklist run for the first production deploy (backup, rollback rehearsal, monitoring on).

### Phase E — Intelligence + hardening (Week 7: Dec 16–22) · env: staging (prod stays shadow)
Segments, funnels/channels, cohorts, ZIP heatmap, offers engine with guardrails BR-O4..O9, export + audit log, data export/delete. Load tests (k6, staging + fake Vagaro) at 10× peak; fix indexes/summary tables.
**Gate:** all load targets in `skills/load-test` met; no high-severity findings (OWASP Top 10 review + Semgrep + gitleaks); backup **restore** tested. *Holiday freeze Dec 18–24 for production changes.*

### Phase F — Private beta (Week 8: Dec 26–Jan 2) · env: production, flag allow-list
Staff + ~20 loyal clients enabled via allow-list flag; feedback fixed; no data errors; SMS registration status confirmed (SMS stays off until approved).
**Gate (go/no-go with owner):** release-checklist fully ticked with evidence; beta issues closed; success metrics instrumented.

### Phase G — Public launch (target Jan 5, 2027) · env: production
Flags on in order, ≥ 2 business days apart, watching error rate/sync health between steps: **sign-up → loyalty → offers → email → SMS (only if registered)**. Rollback order: flag off → previous image → DB restore.

### Phase H — 60-day review (to ~Mar 5, 2027)
Measure BRD §12 criteria: 2nd-visit ≥ 30%, CAC ≤ $25, dashboard within 2%, ≥ 150 consented sign-ups, ≥ 1 owner decision from weekly report, cost per returning client vs Groupon estimate.

## 4. Feature flags (all default OFF; table `FeatureFlag`, optional allow-list by clientId)
`portal_signup` · `portal_loyalty` · `portal_offers` · `email_automation` · `sms_automation` · `admin_funnels` · `admin_map` · `utm_capture` · `vagaro_webhooks_live`. Kill switches must work without redeploy.

## 5. Risk & dependency tracker

| Item | Owner | Needed by | Fallback |
|---|---|---|---|
| Vagaro API approval | Owner | Phase C start (Nov 18) | CSV/report imports (FR-V6) |
| SMS 10DLC registration | Owner | Phase G SMS step | Email-only launch |
| Hosting decision (Docker vs Vercel) | Owner + Lead | Phase A end | Keep Dockerfile path |
| Texas gift-card expiry rule check (BR-G3) | Owner/legal | Phase E | Keep purchased value non-expiring |
| Privacy policy/terms | Owner/legal | Phase C | Block sign-up flag until live |
| Real data handling | Owner | Phase B | Agent only ever sees anonymized data |

## 6. Definition of done (every slice)
Spec "done when" mapped to tests · `npm run check` output shown · reviewer: no blocking issues · security-review pass · migration generated + reviewed · flag-guarded if user-visible · `docs/decisions.md` updated when architecture changes.
