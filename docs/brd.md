# BRD summary — NK Client Intelligence System ("Your Own Groupon")

Condensed reference for agents (v1.0 draft, 2026-11-04). The full signed BRD is owned by the salon owner; if this file and the signed BRD differ, the signed BRD wins and this file must be fixed.

**Purpose:** client site + portal + owner dashboard on top of Vagaro, to attract/keep/grow clients with owned data.
**Out of scope (stays in Vagaro):** booking calendar, payments/refunds, selling & redeeming gift cards/packages/memberships, payroll.

## Objectives
BO-1 25–40 new clients/mo · BO-2 2nd visit ≤60d ≥30% · BO-3 ad cost/new client ≤ $25 · BO-4 bundle share ≥20% · BO-5 ≥60% active clients verified+consented · BO-6 weekly dashboard use · BO-7 promo+loyalty cost ≤10% of revenue.

## Roles
Owner (all) · Marketing strategist (all but delete; exports logged) · Front desk (client lookup/redeem only, no reports/exports) · Client (own portal only) · Vagaro (read integration).

## Business rules
**Loyalty** BR-L1 1 stamp/completed visit (Vagaro-confirmed) · L2 6th = free threading or $10, 10th = $20 off, reset · L3 1 pt/$1, 200 pts = $10, expire 12 mo · L4 birthday reward ≤ $15 · L5 pre-book +25 pts after completion · L6 refunds/no-shows reverse · L7 one account per verified phone.
**Offers** BR-O1 new client 10% first visit, once per phone · O2 profile completion 5% off haircut once · O3 bundles 10–15% below sum · O4 NO public discount on eyebrow threading alone · O5 one offer/visit, no stacking · O6 ≤2 personal offers/client/month · O7 no discounts when >85% booked · O8 end date + unique code redeemed in Vagaro · O9 promo+loyalty cost ≤10% of monthly revenue (alert).
**Gift cards** BR-G1 $50→+$10, $100→+$25, custom from $25 no bonus · G2 bonus cards separate, valid Jan 2–Feb 28, expiry printed · G3 purchased value doesn't expire (verify Texas rules).
**Data** BR-D1 salon owns data, full export · D2 marketing only with recorded consent (imports not opted in) · D3 ZIP-level location only · D4 family details optional/minimal · D5 download/delete data.

## Requirements (M = must)
**Web** W1 catalog M · W2 bundles M · W3 gift card/membership/loyalty pages M · W4 Book→Vagaro M · W5 UTM/offer-code capture M · W6 mobile-first <2.5s M · W7 find-us S.
**Portal** P1 passwordless login M · P2 match Vagaro record M · P3 stepwise profile + reward M · P4 separate email/SMS consent M · P5 stamps/points/rewards M · P6 personal offers M · P7 balances S · P8 family C · P9 download/delete M.
**Vagaro** V1 webhooks+signature M · V2 daily report imports M · V3 re-runnable M · V4 retry+alert M · V5 sync status M · V6 CSV backup S.
**Loyalty/Offers** L1 full history M · L2 admin-editable rules M · O1 segments M · O2 offers+guardrails M · O3 redemption tracking M · O4 bundle recs C.
**Messaging** M1 automated emails M · M2 SMS S · M3 unsubscribe/STOP/quiet hours M · M4 log+link to bookings S.
**Dashboard** A1 overview M · A2 funnel M · A3 channel CAC M · A4 segment drill-down M · A5 cohorts S · A6 profit S · A7 ZIP map S · A8 owed rewards/gift balances M · A9 roles M · A10 exports+audit M · A11 AI assistant C.

## Non-functional
Public pages <2.5s; portal/admin p95 <0.7s · 10× peak (200 browsing, 500 webhooks/min) · 99.5% uptime, site works if sync fails · dashboard within 1–2% of Vagaro · encryption, no card data, OWASP Top 10 · no PII in logs, export/delete ≤30 days · CAN-SPAM, TCPA, carrier registration · daily backups, restore tested · rules/offers editable without code.

## Success (60-day)
≥30% 2nd-visit · CAC ≤ $25 · within 2% of Vagaro · ≥150 consented sign-ups · owner makes ≥1 data-driven decision · cost per returning client < Groupon estimate.
