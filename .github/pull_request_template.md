## Spec
`docs/specs/NNN-….md` — <!-- required; no spec, no PR -->

## What changed (≤ ~400 lines)

## Evidence
- [ ] `npm run check` output pasted below
- [ ] New `src/lib/` code has unit tests; new routes have integration tests
- [ ] reviewer subagent + security-review skill run; blocking issues resolved
- [ ] Spec "done when" items each mapped to a test or a manual step
- [ ] Prisma migration generated (not hand-written) and reviewed; no same-release column drops
- [ ] No PII in logs; Zod on all new external input; server-side authz on new admin routes
- [ ] Feature behind a flag (default off) if user-visible

## Not tested / risks
