# Technical Architecture (Draft)

## High-Level

```
Wix Marketing Site --CNAME--> subscribe.sportsactiontv.com (Vercel)
                                     |
                                     v
                          Next.js PWA (App Router)
                                     |
      -------------------------------------------------------------
      | Stripe | Supabase (Auth + DB) | Edge Functions | ESP/Klaviyo |
      -------------------------------------------------------------
```

## Components

- **Frontend (Next.js 14 PWA)**
  - App Router with server actions for checkout/session creation.
  - Tailwind + shadcn/ui for rapid UI.
  - Stripe Elements + custom access-code redemption UI.
  - Offline-ready surfaces for event schedules + personal access codes.

- **Backend/Data**
  - Supabase Postgres for viewers, purchases, access codes, audit logs.
  - Row Level Security ensures viewers can only fetch their entitlements.
  - Edge Functions (or Vercel Serverless) handle Stripe webhooks and email triggers.

- **Payments**
  - Stripe Payment Links for MVP, moving to Elements for custom UX.
  - Products map to events; price metadata stores stream URL + DRM tokens.
  - Webhook pipeline:
    1. Payment `checkout.session.completed`
    2. Generate unique code + store entitlement
    3. Send transactional email via Resend/Customer.io

- **Automation Stack**
  - Event bus (Supabase Realtime or Segment) publishes lifecycle events.
  - ESP automation orchestrates welcome/reminder/win-back journeys.
  - Optional SMS via Twilio/Postscript for high-value segments.

- **Analytics/Observability**
  - Vercel Analytics + Supabase logs for behavior.
  - Optional Axiom/Logtail for structured logs and alerting.

## Security & Compliance

- PCI handled by Stripe; no card data stored on our side.
- Encrypt PII at rest (Postgres column-level or KMS).
- Audit trails for code generation, redemptions, admin overrides.
- Rate limiting on access-code validation endpoints.

## Deployment

- Vercel preview deployments per PR.
- Production protected behind required checks (lint/tests/E2E smoke).
- Environment secrets managed via Vercel + Supabase.

Update this document as architecture decisions are ratified (consider capturing key ADRs).
