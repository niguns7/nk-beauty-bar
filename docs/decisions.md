# Decisions log

Append-only. Agents must read this before proposing architecture changes and must not undo a decision without a new entry that supersedes it.

| ID | Date | Decision | Status |
|---|---|---|---|
| D-001 | 2026-11-04 | Build inside the existing `nk-beauty-bar` repo (Next 16 App Router, TS strict), not a new `nk-intelligence` repo. | Accepted |
| D-002 | 2026-11-04 | ORM stays **Prisma** (already in use, migrations exist) — not Drizzle. Migrations are Prisma-generated only. | Accepted |
| D-003 | 2026-11-04 | Hosting: repo has a Dockerfile/compose; blueprint assumes Vercel. **Open** — owner to choose before Phase A ends. Background jobs/cron strategy depends on it (Vercel Cron+queue vs container worker/Inngest). | Open |
| D-004 | 2026-11-04 | Package manager: both `package-lock.json` and `pnpm-lock.yaml` exist (pnpm lock newer; `pnpm-workspace.yaml` allows prisma builds). CI uses **pnpm**. Delete `package-lock.json` after owner confirms. Scripts are invoked as `npm run` locally and work with either. | Proposed |
| D-005 | 2026-11-04 | Vagaro is read-only; booking via handoff link; payments/gift-card redemption stay in Vagaro (BRD §4). | Accepted |
| D-006 | 2026-11-04 | Launch target **Jan 5, 2027** (not Dec 1): 8-week plan + 2-week shadow mode + Dec 18–24 freeze. | Proposed (owner sign-off) |
| D-007 | 2026-11-04 | Agent sees anonymized data only; real exports processed by a human on staging/prod. | Accepted |
| D-008 | 2026-11-04 | Existing single `ADMIN_TOKEN` is interim; replaced by role-based auth (OWNER/STRATEGIST/FRONT_DESK) in Phase B before any dashboard ships. | Accepted |
