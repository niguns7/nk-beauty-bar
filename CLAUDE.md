@AGENTS.md

# NK Client Intelligence — Agent Rules

## What this is
Customer intelligence layer ON TOP of Vagaro (client site, portal, loyalty, offers, owner dashboard).
Vagaro is the source of truth for bookings, payments, gift cards, memberships. We READ from Vagaro.
We never create bookings or take payments. Booking = handoff link to Vagaro (see `src/app/api/book`).
Requirements: `docs/brd.md`. Delivery plan: `docs/production-plan.md`. Decisions: `docs/decisions.md`.

## Stack (actual, not aspirational)
Next.js 16 App Router · TypeScript strict · PostgreSQL + **Prisma** · Zod · Vitest. Read
`node_modules/next/dist/docs/` before writing Next code (APIs differ from training data).

## Hard rules
- Never read or print `.env*` secrets (only `*.example` files are readable).
- Never run commands against production. Only local + staging. Never paste a non-local DB URL.
- Never hand-write SQL migrations. Edit `prisma/schema.prisma`, run `npm run db:migrate:create`, show the diff.
  Never `prisma migrate reset` / `db push --accept-data-loss`. Never drop a column in the same release that stops using it.
- Every new function in `src/lib/` ships with a unit test. Every API route ships with an integration test.
- Validate ALL external input with Zod (webhooks, imports, forms, query params). Reject unknown fields (`.strict()`).
- Authorization is checked on the server for every admin route and server action — never only in the UI.
- No PII in logs or error reports. Log client IDs, never names/phones/emails.
- Loyalty is an append-only ledger. Never update balances in place; reverse with a new entry.
- Money is integer cents. Time is UTC in storage, displayed in America/Chicago (`SALON_TZ`).
- Prices come only from the DB via the pricing engine. The browser never computes or sends prices.
- Imported clients are NOT opted in to marketing. Consent is stored per channel with a timestamp.
- Tests never call the live Vagaro API — use MSW mocks in `tests/mocks/vagaro/`.
- The agent works on anonymized data only. Never load real client exports into a dev machine session.
- No new dependency without asking. No `git push --force`, no `rm -rf`.

## Workflow (one slice = one spec = one branch = one PR, < ~400 changed lines)
1. Spec exists in `docs/specs/NNN-name.md` (copy `_template.md`). No spec → write/ask for one first.
2. Plan only → human approves → failing tests first → implement → green.
3. Run `reviewer` subagent + `security-review` skill, then summarize diff.
4. Fresh session per slice. If you repeat a mistake twice, propose a new rule here or in a skill.

## Commands
`npm run dev` · `npm test` · `npm run typecheck` · `npm run lint` · `npm run check` (all three) ·
`npm run db:migrate:create` · `npm run db:validate`

## Before saying "done"
`npm run check` passes — paste the actual output tail. State what changed, what is untested,
and which spec "done when" items are satisfied. "It should work" is not an answer.

## Skills (load when working in that area)
vagaro-sync · loyalty-ledger · test-first · security-review · db-migration · data-cleaning · load-test · release-checklist
