# nexus-web

The marketing site, user guide, and Phase-1 cloud-function host for **Nexus** —
a bot-free, device-audio meeting notepad for Windows.

Live: `https://nexus-web.vercel.app` (Vercel free tier)
Desktop app source: separate repository (`scribe/` inside `GranolaClone`).
Release artifacts: `github.com/jlts2010/nexus-releases` (configurable via
`NEXUS_RELEASES_REPO`).

---

## What this repo is

- **Marketing landing** (`/`) — what Nexus is, why, who it's for.
- **Download page** (`/download`) — fetches the latest stable release from
  GitHub Releases, surfaces the .exe + SHA-512 checksum + system requirements.
- **User guide** (`/docs`) — getting started, API keys, calendar setup,
  templates, chat, folders+tags, offline Whisper, cost & usage, keyboard
  shortcuts, troubleshooting.
- **Privacy / Terms / Changelog / Roadmap** under `(marketing)/`.
- **Live `/api/updates/latest` and `/api/updates/latest.yml`** —
  electron-updater feed proxied from GitHub Releases with a 5-minute server
  cache.
- **Phase-2 API stubs** — `/api/auth`, `/api/sync`, `/api/backups`,
  `/api/shares`, `/api/telemetry` — typed Zod contracts that return 501
  while validating request bodies. See `docs/API_CONTRACT.md`.

## Tech

- Next.js 16 (App Router), React 19, TypeScript strict
- Tailwind v4 with semantic CSS-variable tokens
- shadcn/ui copy-ins on Radix + lucide-react
- `next-themes` for light/dark/system
- Zod for validation
- pnpm 9, Node 20

## Local development

```sh
pnpm install
pnpm dev      # http://localhost:3000
```

Other scripts:

```sh
pnpm typecheck         # tsc --noEmit
pnpm lint              # eslint
pnpm build             # next build
pnpm check:invariants  # CI guard: no analytics/webfonts/hardcoded keys
pnpm format            # prettier
```

All four (typecheck, lint, build, check:invariants) must pass before commit.

## Environment variables

See `.env.example`. None are required for Phase 1 — the live updates endpoint
runs against GitHub's anonymous rate limit (60 req/h, well above our 5-min
cache window). Optional:

- `GITHUB_TOKEN` — raises GitHub API rate limit to 5000 req/h.
- `NEXUS_RELEASES_REPO` — which `owner/repo` hosts the release artifacts
  (defaults to `jlts2010/nexus-releases`).
- `NEXT_PUBLIC_SITE_URL` — full URL of the deployment (used for metadata
  and the sitemap). Defaults to `https://nexus-web.vercel.app`.

## Deployment

Connect this repo to Vercel; defaults Just Work. Production branch is `main`.
Pull requests get a preview URL automatically. CI (GitHub Actions) runs
typecheck, lint, build, and the invariants script on every push.

See `docs/BUILD_AND_DEPLOY.md` for details.

## Documentation

- [`CLAUDE.md`](./CLAUDE.md) — standing conventions and guardrails.
- [`BRAND.md`](./BRAND.md) — brand identity, color tokens, voice.
- [`docs/PROJECT_SPEC.md`](./docs/PROJECT_SPEC.md) — what the site is and isn't.
- [`docs/BUILD_AND_DEPLOY.md`](./docs/BUILD_AND_DEPLOY.md) — local + Vercel.
- [`docs/API_CONTRACT.md`](./docs/API_CONTRACT.md) — live + Phase-2 endpoints.
- [`docs/DESIGN_SYSTEM.md`](./docs/DESIGN_SYSTEM.md) — tokens, components.

## License

The release artifacts and any code published here are subject to the licensing
of the Nexus desktop app — see that repository.
