---
name: release-checklist
description: Production cutover and phase-gate checklist. Use when preparing any release to production or advancing a rollout phase.
---
# Release checklist (a human performs production steps; the agent prepares and verifies)

- [ ] Staging and production fully separate: database, keys, Vagaro credentials
- [ ] CI green on the release commit; gitleaks + audit + Semgrep clean; no open high-severity findings
- [ ] Migrations rehearsed on a staging copy; **backup taken immediately before**; restore tested at least once before first launch
- [ ] All secrets rotated for launch; no test keys in production
- [ ] Test data removed; cleaned real data loaded and reconciled (≤ 1%)
- [ ] Monitoring/alerts live: sync failures, webhook errors, import mismatches, error-rate spikes, SMS spend
- [ ] Feature flags exist and start OFF; turn on one at a time, watching dashboards between steps
- [ ] Rollback plan written and rehearsed: flag off → previous image → DB restore (in that order)
- [ ] Privacy policy, terms, consent screens live
- [ ] Owner signs off dashboard numbers vs Vagaro reports
- [ ] SMS carrier registration approved before any text is sent
- [ ] Date check: no public launch Dec 18–24; no checkout/booking-link changes during holiday gift-card season

Output a filled checklist with evidence links (CI run, report, screenshot) per line.
