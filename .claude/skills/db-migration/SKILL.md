---
name: db-migration
description: Safe Prisma schema changes and migrations. Use whenever prisma/schema.prisma or prisma/migrations change.
---
# DB migration

1. Edit `prisma/schema.prisma` only. Run `npm run db:validate`.
2. `npm run db:migrate:create -- --name <what>` against the LOCAL database (creates SQL without applying). Show the generated SQL diff to the human. Never hand-write migration SQL, except hand-added CHECK constraints appended to a generated file and called out explicitly (existing pattern: discount ranges).
3. Prefer **expand → migrate → contract**: add nullable/new first; backfill; switch code; drop in a LATER release. Never drop/rename a column in the same release that stops using it.
4. New NOT NULL columns need a default or a backfill step in the same migration.
5. Rehearse on a copy of staging data (anonymized) before staging deploy; verify row counts before/after.
6. Production: backup taken immediately before; migration applied by the release process (`prisma migrate deploy`) — never by the agent. Agents do not run `migrate deploy`, `migrate reset` or `db push`.
7. Ledger tables (`LoyaltyEntry`, audit logs, consent records) are append-only: no UPDATE/DELETE grants for the app role where feasible.
8. Add indexes for dashboard filters (clientId, createdAt, source/channel) and check with `EXPLAIN` on staging-size data.
