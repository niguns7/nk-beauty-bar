# NNN — <feature name>

- **Phase / BRD refs:** e.g. Phase D · FR-L1, BR-L1..L3
- **Branch:** `feat/nnn-<slug>`  · **Flag:** `<flag_name>` (default off) or n/a
- **Size budget:** ≤ ~400 changed lines (split if bigger)

## Goal
One sentence.

## User story
As a <role>, I want <x> so that <y>.

## Data touched
Tables/columns read and written; any migration (additive?); PII involved?

## Interfaces
Routes / server actions / lib functions (signatures), roles allowed, Zod schemas.

## Edge cases (each becomes a test)
- …

## Out of scope
- …

## Done when
- [ ] each edge case has a passing test
- [ ] `npm run check` green (output pasted in PR)
- [ ] reviewer: no blocking issues; security-review passed
- [ ] manual staging check: <steps>
