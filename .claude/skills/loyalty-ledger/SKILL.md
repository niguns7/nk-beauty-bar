---
name: loyalty-ledger
description: Rules and patterns for NK loyalty stamps, points and rewards. Use when changing anything in src/lib/loyalty or loyalty UI (glow club).
---
# Loyalty ledger

## Model (Prisma)
`LoyaltyEntry(id, clientId, type, stamps, points, sourceVisitId, idempotencyKey @unique, reason, createdAt)`
`type ∈ EARN_VISIT | EARN_BONUS | REDEEM | EXPIRE | REVERSE`. Balance = SUM of entries.
**No mutable balance column. No UPDATE/DELETE on entries** — corrections are new `REVERSE` entries. Idempotency key = `visit:<vagaroAppointmentId>:<type>`.

## Rules (BRD BR-L1..L7; values live in admin-editable `loyalty_settings`, never hard-coded)
- 1 stamp per COMPLETED visit, confirmed by Vagaro data (appointment completed AND sale imported).
- 6th stamp → "free eyebrow threading or $10"; 10th → "$20 off"; then the count resets.
- Points: 1 per $1 paid (floor(cents/100)); 200 pts = $10; expire 12 months after earning (FIFO consumption).
- Birthday month: one reward ≤ $15 (cap enforced in the engine). Pre-book bonus +25 pts only after that visit completes.
- Refund / no-show → `REVERSE` entries (also reverse any reward unlocked solely by that stamp if unredeemed; if redeemed, flag for owner review).
- One loyalty account per verified phone (BR-L7). Merge flows are human-approved.

## Engine shape
Pure function `computeEntries(visit, state, settings) -> LoyaltyEntryInput[]` (no I/O) + thin persistence layer that inserts in a transaction with the unique idempotency key. Pure core = easy exhaustive tests.

## Must-have tests (table-driven)
10 visits → 2 rewards, counter 0 · refund after stamp → reversed · duplicate webhook same visit → 1 stamp · points earned 13 months ago → expired · concurrent inserts same key → 1 row · birthday cap · pre-book bonus not granted on cancel/no-show · settings change doesn't rewrite history.
