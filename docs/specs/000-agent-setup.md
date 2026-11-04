# 000 — Agent-enforced development setup

- **Phase:** A · **Branch:** `worktree-agent-enforced-dev`

## Goal
Make the repo safe and repeatable for AI-agent development: rules, guard hooks, skills, subagents, CI, PR template.

## Done when
- [x] `CLAUDE.md` rules + `.claude/settings.json` permissions/hooks
- [x] `guard.mjs` blocks secret env reads, prod/non-local DB URLs, rm -rf, force/main push, destructive prisma; covered by `tests/guard.test.ts` (21 cases)
- [x] 8 skills + `reviewer` + `test-runner` subagents
- [x] CI workflow (typecheck, lint, tests, prisma validate, gitleaks, audit, Semgrep), dependabot, PR template
- [x] `docs/production-plan.md`, `decisions.md`, spec template + backlog
- [ ] Human: enable branch protection requiring CI + 1 review; confirm `.claude/settings.json` hooks load (`/hooks`)
