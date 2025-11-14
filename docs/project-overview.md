# Project Overview

## Background

SportsActionTV currently sells event streams through Lightcast, which requires manual post-purchase data collection and delivers a poor retention experience (60%+ churn). The new initiative delivers a dedicated, Stripe-backed subscribe experience and lifecycle automation while keeping the marketing site on Wix.

## Business Goals

1. **Reduce churn** by improving onboarding/retention messaging and providing easier self-service access management.
2. **Capture customer data at purchase time** to unlock remarketing and upsell campaigns.
3. **Own the subscribe experience** so pricing, bundles, and promotions can change quickly without third-party constraints.

## Success Metrics

- < 10% failed-access tickets within 30 days of launch.
- 25% lift in email capture rate relative to Lightcast flow.
- 15% increase in repeat purchases within 90 days driven by automated outreach.

## User Roles

- **Viewer**: purchases one-off access codes, manages profile, redeems access.
- **Admin**: configures events, pricing, discount codes, monitors analytics.
- **Marketing/CS**: launches campaigns, views churn cohorts, triggers manual outreach.

## Functional Requirements

1. **Checkout + Subscribe**
   - Stripe Checkout or Elements UX embedded in the PWA.
   - Single-use codes (UUID) linked to event and viewer profile; optional expiration.
   - Webhook listener to mark fulfillment, send confirmation email, and expose access link.
2. **Viewer Portal**
   - Sign-in via passwordless email or OAuth (Clerk, Supabase Auth, or Auth0).
   - Purchases + entitlements summary; ability to resend access links/codes.
3. **Admin Console**
   - CRUD for events, inventory, pricing, promo codes.
   - Dashboard for conversions, churn signals, top-performing campaigns.
4. **Lifecycle Automation**
   - Welcome series with event reminders.
   - Retry sequence for abandoned checkouts.
   - Win-back flow triggered 30 days post-event without another purchase.
5. **Data + Integrations**
   - Data warehouse or CRM (Supabase/Postgres + Segment/Customer.io) storing profiles, events, attribution.
   - Webhooks into marketing automation (Customer.io, Klaviyo, or Resend).

## Non-Functional Requirements

- Deployable on Vercel; CDN-cached marketing pages with ISR.
- Performance budget: LCP < 2.5s on 4G.
- Accessibility: WCAG 2.1 AA baseline.
- Observability: structured logging + analytics (Axiom, Logtail, or Vercel OG).

## Open Questions

1. Do we need recurring subscriptions in addition to one-off codes?
2. Should the subscribe experience live on a subdomain (e.g., `subscribe.sportsactiontv.com`) or path-based proxy?
3. Preferred CRM/ESP stack (HubSpot, Klaviyo, Customer.io)?
4. Does Lightcast need backward compatibility during migration?

Document outstanding answers here as stakeholders provide guidance.
