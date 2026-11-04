---
name: test-first
description: Test-first workflow for any new feature or bug fix. Use at the start of every implementation slice.
---
# Test first

1. Read the spec's edge cases and "done when". Turn each into a test name BEFORE writing code.
2. Write failing tests; run them and **show they fail for the right reason**.
3. Implement the minimum to pass. Run `npm run check`; paste the output tail.
4. Never weaken, skip (`it.skip`) or delete a test to go green. If a test is wrong, say so and explain.

## Tools & locations
- Vitest (`npm test`). Unit: `tests/unit/**` (pure `src/lib`). Integration: `tests/integration/**` (route handlers + a throwaway Postgres; never the dev/prod DB). E2E (later): Playwright in `tests/e2e/**`.
- Existing flat tests (`tests/*.test.ts`) stay; new tests go in the folders above.
- Vagaro: MSW handlers in `tests/mocks/vagaro/` + fixtures in `tests/fixtures/` (anonymized only).
- Time: inject a clock; never depend on `Date.now()` in logic. Money: assert integer cents.
- Target ≈ 80% line coverage on `src/lib/`; money, loyalty and pricing logic should be ~100% branch-covered.

## Route handler checklist
401/403 without/with wrong role · 400 on bad/unknown fields · happy path · idempotent replay · rate-limit path where applicable.
