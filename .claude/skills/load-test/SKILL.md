---
name: load-test
description: k6 load testing against staging with mocked Vagaro. Use before each phase launch and after major data-model changes.
---
# Load test (k6, `tests/load/`)

**Only against staging with the fake Vagaro.** Never load-test production or the live Vagaro API (rate limits; webhooks cost ≈ $10 / 5,000 calls). Use a test SMS provider, never real Twilio sends.

| Scenario | Load | Pass |
|---|---|---|
| Browse (home, services, bundles) | 200 VUs × 10 min | p95 < 500 ms, errors < 1% |
| Login burst after email blast | 50 code requests / min | rate limits trigger; zero real SMS |
| Portal (stamps, offers) | 100 logged-in VUs | p95 < 700 ms |
| Webhook burst | 500 events / min incl. duplicates | all queued, **0 duplicate stamps**, done < 5 min |
| Daily import | 50,000 sales rows | < 10 min, re-run is a no-op |
| Admin dashboard | 5 users, heavy filters | p95 < 2 s (else add indexes / summary tables) |

Watch DB connections (use a pooler on serverless; size Prisma pool explicitly). Save results to `docs/load-tests/YYYY-MM-DD.md` and compare to the previous run.
