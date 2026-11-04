---
name: security-review
description: Security checklist to run as a review before every merge and before each phase launch. Use on any diff touching auth, admin, webhooks, imports, messaging or personal data.
---
# Security review (run against the diff; report PASS/FAIL/N-A per line with file:line evidence)

**Auth** — phone code / magic link only; codes expire in 10 min, single use, attempts rate-limited per phone+IP; sessions in Secure, HttpOnly, SameSite cookies.
**Access control** — roles (OWNER / STRATEGIST / FRONT_DESK / CLIENT) enforced SERVER-side in every admin route, route handler and server action; clients can only read their own rows; front desk cannot reach reports/exports. Use one data-access layer that filters by role.
**Input** — Zod on every external input (body, query, params, headers, CSV rows); `.strict()` to reject unknown fields; webhook signature verified on raw body.
**Secrets** — none in code/logs/client bundles; no `NEXT_PUBLIC_` for secrets; separate keys per environment; gitleaks clean. Admin/cron tokens compared in constant time.
**Web** — CSP + HSTS + `X-Content-Type-Options` + `frame-ancestors`; CSRF protection on cookie-authenticated mutations; rate limits on public APIs (quote, book, auth, offer-code lookup).
**Personal data** — no PII in logs/Sentry (scrub); exports and client views written to an audit log; backups encrypted; data download/delete implemented; ZIP-only location.
**Payments** — no card data ever stored or logged.
**Messaging** — consent checked per channel at send time; unsubscribe link + business address (CAN-SPAM); STOP/HELP + quiet hours (TCPA); never message imported-but-unconsented clients.
**Dependencies** — new packages justified; `pnpm audit` high+ clean.
**Injection/SSRF** — no string-built SQL (Prisma `$queryRaw` only with tagged templates); no user-controlled URLs fetched server-side; redirects (Vagaro handoff) built from allow-listed hosts only.

Output: **Blocking / Should-fix / Pass** lists. Any FAIL on Auth, Access control, Input or Personal data is blocking.
