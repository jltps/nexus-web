# CLAUDE.md

Standing conventions and guardrails for **nexus-web** — the marketing site,
docs, and Phase-1 cloud-function host for the Nexus desktop app.

This repository is the public face of Nexus on the web. The app itself lives
in a separate repo (`scribe/` inside `GranolaClone`). Nothing here imports
from there at runtime; design tokens, brand assets, and the BackupBundle
schema are **mirrored**, not shared.

**Ground truth is the code.** Where this file or any spec disagrees with what
the repository actually does, the code wins — update the docs to match.

---

## 0. Orientation (read before writing code)

- Next.js (App Router), React 19, TypeScript strict, Tailwind v4, deployed on
  Vercel. Free hosting plan; no custom domain in Phase 1.
- The site has three jobs: (1) promote Nexus, (2) host the installer download
  + user guide, (3) expose `GET /api/updates/latest(.yml)` for
  electron-updater. Everything else is scaffolding for Phase 2.
- **The site must render with JavaScript disabled.** Marketing, docs,
  download, privacy — all pages work fully without JS. Client components are
  the exception: theme toggle, FAQ accordion, copy-button. That's it.

## 1. Non-negotiable rules (inherited from the Nexus app's §1)

These mirror the desktop app's invariants. Surface a conflict; never
silently violate.

1. **No third-party JavaScript.** No Google Analytics / GA4, Plausible-with-
   script, Mixpanel, Segment, Hotjar, Intercom, Crisp, or any chat widget.
   No Vercel `<Analytics />` client component. Server-side analytics only.
2. **No web fonts.** System font stack only (`var(--font-sans)` in
   `globals.css`). Matches the app's CSP posture.
3. **No `next/image` remote sources.** Self-host all screenshots in
   `public/screenshots/`. Saves a network round-trip and avoids a Vercel
   billing surprise.
4. **No tracking cookies, no cookie banner.** If a feature needs cookies,
   the cookie banner ships with it — not before.
5. **API keys never appear in code, env files, or logs.** The `check:
   invariants` script greps for `sk-…`, `dg_…`, vendor-analytics hosts, and
   `googleapis.com/fonts` in CI and fails the build on a hit.
6. **The `BackupBundle` mirror schema excludes `api_keys` and
   `oauth_tokens`** — these stay in the desktop app's `safeStorage` and
   never sync. Even when Phase 2 ships, this stays true.
7. **The `/api/updates/*` endpoints proxy GitHub Releases; they don't host
   binaries.** Bandwidth for ~100MB+ installers lives on GitHub Releases.

If a requested change would break one of these, stop and surface it.

## 2. Tech stack

Pinned versions live in `package.json`. Match them. Do not swap libraries
without surfacing the reason and the trade-off.

- **Framework**: Next.js 16+ App Router; React 19; React Server Components
  by default — opt into `"use client"` only when interactivity requires it.
- **Styling**: Tailwind v4 (CSS-first `@theme inline`). Design tokens live
  in `src/app/globals.css` and are **mirrored from** the desktop app's
  `scribe/src/renderer/app/index.css` (lines 16–110).
- **Components**: shadcn/ui copy-ins in `src/components/ui/` on Radix
  primitives; **lucide-react** icons.
- **Theming**: `next-themes` with `attribute="data-theme"` and
  `defaultTheme="system"`. The dark-mode CSS variant keys off
  `[data-theme="dark"]`.
- **Docs**: plain TSX pages with a shared sidebar + a `<Prose>` typography
  component. Fumadocs is installed but **not used in Phase 1** — when doc
  count grows past ~15 pages or search becomes a requirement, migrate.
- **Schema validation**: Zod 4 for every request body and the live updates
  response.
- **Node runtime** for every API route (the GitHub Releases call needs it).
- **Package manager**: pnpm 9. **Node**: 20 LTS, pinned via `.nvmrc` and
  `engines`.

## 3. Project structure (verify against the actual tree before assuming)

```
nexus-web/
├─ src/
│  ├─ app/
│  │  ├─ (marketing)/         # /, /download, /privacy, /terms, /changelog, /roadmap, /about
│  │  ├─ docs/                # /docs and /docs/<topic> pages with a shared layout
│  │  ├─ api/
│  │  │  ├─ updates/latest/route.ts        # LIVE
│  │  │  ├─ updates/latest.yml/route.ts    # LIVE
│  │  │  ├─ auth/[...route]/route.ts       # 501
│  │  │  ├─ sync/[...route]/route.ts       # 501
│  │  │  ├─ backups/route.ts               # 501
│  │  │  ├─ shares/[[...route]]/route.ts   # 501
│  │  │  └─ telemetry/route.ts             # 501
│  │  ├─ layout.tsx, globals.css
│  │  ├─ icon.tsx, apple-icon.tsx
│  │  ├─ opengraph-image.tsx, twitter-image.tsx
│  │  ├─ sitemap.ts, robots.ts
│  │  ├─ not-found.tsx, error.tsx
│  ├─ components/
│  │  ├─ ui/                  # shadcn copy-ins (button, card, badge, accordion, separator)
│  │  ├─ marketing/           # Hero, ProductVisual, WhatsNew, Differentiators, FeatureGrid, InsightsShowcase, PrivacyCallout, FAQ, CTA, CopyButton, DownloadOsHint
│  │  ├─ docs/                # Prose, DocsSidebar, docs-nav (sidebar source of truth)
│  │  ├─ nav/, footer/, theme-toggle, theme-provider, logo
│  ├─ lib/
│  │  ├─ github-releases.ts   # typed GH Releases wrapper, 5-min ISR cache
│  │  ├─ stub-response.ts     # 501-with-Zod-validation helper
│  │  └─ utils.ts             # cn()
│  └─ shared/
│     └─ api-contract.ts      # Zod schemas (live + Phase-2 stubs)
├─ scripts/check-invariants.ts
├─ docs/                      # spec docs (PROJECT_SPEC, BUILD_AND_DEPLOY, API_CONTRACT, DESIGN_SYSTEM)
├─ BRAND.md, README.md, CLAUDE.md
├─ next.config.ts, vercel.json
├─ tailwind.config.ts, postcss.config.mjs (auto-generated by create-next-app — Tailwind v4 needs no JS config)
└─ tsconfig.json
```

Structural rules:
- `src/shared/` imports **nothing** from `next`, `react`, or `node:*`
  runtime-specific APIs. Pure types + Zod. Safe to import from any route
  handler, RSC, or external consumer.
- `src/components/marketing/*` MUST NOT import `src/components/docs/*` and
  vice versa. (Enforce via `eslint-plugin-import`.)
- One route group `(marketing)/` for everything that shares the marketing
  nav+footer layout. Docs and API live at the top level with their own
  layout / no layout.

## 4. API discipline

- Every API route declares a Zod schema in `src/shared/api-contract.ts`.
- Stub routes call `phase2Stub(req, { name, schema, docsAnchor })` from
  `lib/stub-response.ts` — that helper validates the body against the
  schema before returning 501. The 501 with Zod validation IS the deliverable
  in Phase 1.
- The live `/api/updates/latest` and `/api/updates/latest.yml` routes set
  `runtime = "nodejs"` and use Next's `fetch(..., { next: { revalidate: 300 }})`
  for caching. Don't reach for Edge runtime or KV — the simple path is
  sufficient and survives Next major bumps.
- The `latest.yml` response is **proxied verbatim** from the GitHub Release
  asset. electron-updater is strict about format; don't rewrite the YAML.

## 5. Coding conventions

- TypeScript `strict` + `noUncheckedIndexedAccess`. No `any` (use `unknown`
  + narrowing). No non-null `!` unless provably safe with a comment.
- Functional React. RSC by default; `"use client"` only when the file uses
  React hooks, browser APIs, or event handlers.
- Naming: components `PascalCase`, hooks `useCamelCase`, component files
  `kebab-case.tsx` (matches the surrounding repo, NOT the desktop app's
  mixed convention).
- Tailwind classes get composed with `cn()` from `@/lib/utils`. Use
  semantic tokens (`bg-card`, `text-muted-foreground`, `text-primary`), not
  literal colors.
- No `console.log` in committed code. Use `console.error` only for the
  Error boundary; the runtime never logs request bodies.
- Targeted edits over wholesale rewrites. When you touch a file, keep the
  surrounding style intact.

## 6. Testing & verification

- `pnpm typecheck && pnpm lint && pnpm build && pnpm check:invariants` is
  the local gate. All four MUST be green before commit.
- CI runs the same four plus a lychee link-check.
- Lighthouse CI on the Vercel preview URL asserts performance/a11y/best/SEO
  all ≥ 95.
- Manual smoke: load every page with browser JS disabled — every page must
  render and navigate. Theme toggle and FAQ accordion are the only things
  that may degrade.
- For the updates endpoint: hit `/api/updates/latest` and `/api/updates/latest.yml`,
  diff against the actual GitHub Release.

## 7. Git & workflow

- Conventional Commits (`feat:`, `fix:`, `refactor:`, `chore:`, `docs:`).
- Commit directly to `main` — match the desktop app's workflow.
- Each commit message states: what it changes, how it was verified, any new
  dependency + why, and confirmation the §1 invariants still hold.
- Never commit `.env*` with real values or any secret. The `.env.example`
  in this repo is the canonical reference; no values, only key names.

## 8. When you're unsure

- Read the existing code first.
- If a task is ambiguous or fights the structure, ask before writing.
- If something seems to require violating a §1 invariant, stop and surface it.
- For the brand / design / voice / token decisions, `BRAND.md` is the
  source of truth.
- For the API contract (live + Phase-2 stubs), `docs/API_CONTRACT.md` is
  the source of truth.
