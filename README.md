# SportsActionTV Subscribe PWA

This repository captures the upfront planning work for the SportsActionTV subscribe initiative. The goal is to ship a standalone, Vercel-hosted PWA that replaces the current Lightcast subscribe experience and automates the full customer lifecycle—from purchase through retention campaigns.

## Objectives

- Deliver a Stripe-backed subscribe flow that issues single-use access codes per purchase and stores entitlement metadata for later auditing.
- Replace manual customer data collection with a unified profile store (contact info, purchase history, churn signals).
- Automate onboarding and win-back communications (email + potential SMS) triggered by lifecycle events.
- Preserve parity with the existing Wix marketing site via CNAME routing while allowing the subscribe PWA to evolve independently.

## Repository Layout

- `docs/` — product requirements, architecture decisions, integration notes.
- `data/site-crawl-initial/` — raw Screaming Frog exports used to understand the current Wix content footprint.
- `src/` — Next.js 15 PWA leveraging the DiFiore starter (Tailwind 4, shadcn-style UI primitives, Reveal animations).
  - `/` homepage: racing hero, event showcase, subscribe flow, lifecycle automation, pricing CTAs.
  - `/watch`: Lightcast player embed with live/on-demand context cards.
  - `/subscribe`: members area mock showing code redemption, pricing tiles, and entitlement cards.

## Getting Started

```
npm install
npm run dev
```

The app ships with a marketing homepage, subscribe preview route (`/subscribe`), and reusable layout/CTA components. It reuses utilities/components lifted from the DiFiore project (button, card, Reveal) to accelerate delivery.

## Current Data Drop

The Screaming Frog crawl (see `data/site-crawl-initial`) covers page titles, metadata, structured data, performance hints, and more for `sportsactiontv.com`. Use it to:

1. Inventory event-detail URLs that must keep working once the subscribe experience is moved.
2. Spot metadata or image issues that can inform content fixes before the PWA launch.
3. Prioritize performance optimizations—`pagespeed_all.csv` is a quick win list.

## Immediate Next Steps

1. Finalize the feature cut for v1 (see `docs/project-overview.md`).
2. Stand up a Next.js/Vercel scaffold with Stripe + Clerk/Supabase wiring.
3. Map the data model for access codes + CRM handoff.
4. Define automation flows (welcome, reminder, churn win-back) and select tooling.

Once the tech stack is locked, we will extend this repo with application code, infrastructure as code, and CI automation.
