# Upgrade Plan — Next 15 → 16 & next-auth v4 → v5

**Status:** proposed, not executed. Do each as its **own isolated PR** with
`npx tsc --noEmit` + `next build` green before merge. These are prerequisites
for platform unification parity (the rest of the Revvit suite targets Next 16 +
`next-auth v5`).

**Current stack (verified from `package.json`):** `next ^15.5.9`,
`react 19.1.0`, `next-auth ^4.24.11`, `stripe ^17.6.0`, Tailwind v4,
build/dev on **Turbopack**.

> ⚠️ Repo hygiene precondition: a large amount of backend work under
> `src/app/api/*`, `src/lib/*`, `prisma/`, `src/workers/`, `supabase/` is
> currently **uncommitted and does not type-check** (missing deps: `@prisma/client`,
> `argon2`, `bullmq`, `ioredis`, `jsonwebtoken`, `pino`, `libsodium-wrappers-sumo`,
> `cookie`). Land or shelve that work **before** either upgrade, so the build is
> green and regressions are attributable.

---

## PR 1 — Next 15 → 16

**Why:** platform parity; React 19 is already in place (removes the biggest
blocker). Next 16 finalizes async request APIs and Turbopack as the default.

**Risk:** medium. App Router is already the architecture, so most churn is in
request-API signatures and config.

### Steps
1. **Branch** `chore/next-16`. Bump `next`, `eslint-config-next` to `^16`.
   Keep `react`/`react-dom` at 19.x (supported).
2. **Async request APIs** — Next 16 requires `await` on dynamic APIs. Audit and
   fix:
   - `cookies()`, `headers()`, `draftMode()` → now async.
   - Route handler / page `params` and `searchParams` are Promises; `await` them
     (server components) and keep `useSearchParams()` for client components
     (already used in `EmbedPlayer.tsx` / `pip-player`).
   - Grep: `params`, `searchParams`, `cookies(`, `headers(` across `src/app`.
3. **`next.config.ts`** — re-validate `experimental.serverActions` (now stable;
   the empty-object shim can likely be removed) and confirm `output: "standalone"`
   still applies.
4. **Middleware** — verify `middleware.ts` matcher/behavior under 16 (the
   redirect gate + the new `/embed` allowances).
5. **Turbopack** — already used for `dev`/`build`; confirm production `next build
   --turbopack` passes on 16.
6. **Run:** `npx tsc --noEmit`, `next build`, `npm test`, manual smoke of
   `/`, `/embed`, `/subscribe`, `/watch`.

### Acceptance
- Build + typecheck + tests green; no console errors on the smoke routes;
  `/embed` still renders full-bleed.

---

## PR 2 — next-auth v4 → v5 (Auth.js)

**Why:** v5 is the platform standard (`@revvitapps/auth` wraps it) and unlocks
the shared identity/session model. **Do this after PR 1** — v5 targets the
App Router + async APIs cleanly.

**Risk:** high — this is an API-shape change, not a version bump. Auth touches
login, sessions, route protection, and the Stripe/entitlement gate.

### Key differences to handle
- **Single config + universal `auth()`** — replace `getServerSession(authOptions)`
  with the `auth()` helper exported from a root `auth.ts` (`NextAuth({...})`
  returns `{ handlers, auth, signIn, signOut }`).
- **Route handler** — `app/api/auth/[...nextauth]/route.ts` now re-exports
  `handlers.GET/POST` instead of a v4 default export.
- **Env vars** — `NEXTAUTH_SECRET` → `AUTH_SECRET`; provider vars adopt the
  `AUTH_<PROVIDER>_*` convention. Update `.env.example` and deploy envs.
- **Middleware auth** — v5 favors `auth` as middleware; reconcile with the
  existing redirect middleware.
- **Session/JWT callbacks** — signatures are compatible in spirit but re-verify
  custom claims (roles/entitlements) survive the migration.

### Steps
1. Branch `chore/next-auth-v5`. `npm i next-auth@beta`.
2. Create root `auth.ts` with the single `NextAuth({...})` config; port
   providers + callbacks from the current v4 setup (note: the repo's current
   auth lives in the **uncommitted** `src/lib/auth.ts`, which is a *custom*
   JWT/cookie implementation, **not** next-auth v4 wiring — decide whether to
   adopt Auth.js or keep the bespoke layer before migrating).
3. Swap `getServerSession` call sites → `auth()`.
4. Add `app/api/auth/[...nextauth]/route.ts` re-exporting `handlers`.
5. Rename env vars; update `.env.example`.
6. **Run:** `npx tsc --noEmit`, `next build`, `npm test`, plus an auth e2e
   (login → protected route → logout).

### Acceptance
- Login/session/logout work; protected routes enforce server-side; entitlement
  gating on streams still holds; isolation tests (once they exist) stay green.

---

## Decision needed from Matthew (go/no-go)

- **Adopt Auth.js v5, or keep the bespoke JWT/cookie auth** in the uncommitted
  `src/lib/auth.ts`? Platform unification assumes Auth.js (`@revvitapps/auth`).
  This choice gates PR 2's shape.
- **Sequence:** land/shelve the uncommitted backend first (recommended) → PR 1
  (Next 16) → PR 2 (next-auth v5). Each isolated, each green.
