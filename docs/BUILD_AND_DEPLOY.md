# Build & Deploy

## Prerequisites

- Node **20 LTS** (pinned in `.nvmrc`). Newer Node will probably work but
  isn't tested.
- **pnpm 9** (pinned in `package.json` `packageManager`). Install via
  `corepack`: `corepack enable && corepack prepare pnpm@9 --activate`.

## Local development

```sh
pnpm install
pnpm dev
```

Open <http://localhost:3000>. Hot reload works for both pages and CSS.

## Scripts

| Script | Purpose |
|---|---|
| `pnpm dev` | Start dev server |
| `pnpm build` | Production build |
| `pnpm start` | Run the production build locally |
| `pnpm typecheck` | `tsc --noEmit` — strict, blocks on errors |
| `pnpm lint` | ESLint |
| `pnpm check:invariants` | Greps for analytics/webfonts/hardcoded keys |
| `pnpm format` | Prettier |

The pre-commit gate is all four of: `typecheck`, `lint`, `build`,
`check:invariants`. CI runs the same gate plus a link-checker.

## Environment variables

All optional. Configure in Vercel project settings (or `.env.local` for
dev). Never commit `.env*` with real values.

| Var | Default | Purpose |
|---|---|---|
| `NEXUS_RELEASES_REPO` | `jltps/MeetingTranscriber` | `owner/repo` of release artifacts |
| `GITHUB_TOKEN` | (unset) | Optional — raises GitHub API rate limit from 60 to 5000 req/h |
| `NEXT_PUBLIC_SITE_URL` | `https://nexus-web.vercel.app` | Used for metadata / sitemap |

## Deploying to Vercel

1. Push this repo to GitHub (`nexus-web` on the `jlts2010` org or your
   own user — public is fine; nothing here is secret).
2. In the Vercel dashboard, click **Import Project** and select the repo.
3. Accept the defaults (Vercel detects Next.js automatically).
4. Set environment variables under **Project Settings → Environment
   Variables** if you want to override the defaults.
5. The first deployment lands on `https://<project>-<hash>.vercel.app`. Set
   the production alias to `nexus-web.vercel.app` (free) or hook a custom
   domain later.

PR previews are automatic; each PR gets its own URL.

## Custom domain (deferred)

Phase 1 stays on the free `*.vercel.app` subdomain. When ready:

1. Add a domain in Vercel and follow the DNS instructions.
2. Update `NEXT_PUBLIC_SITE_URL` to the new origin.
3. Update `app-update.yml` in the desktop app to point at the new origin's
   `/api/updates/` endpoint.

## CI

`.github/workflows/ci.yml` runs on every push and PR:

1. `pnpm install --frozen-lockfile`
2. `pnpm typecheck`
3. `pnpm lint`
4. `pnpm build`
5. `pnpm check:invariants`
6. `lychee` link check across the built `out/` (extracts from .next/server).

Lighthouse CI runs as a separate workflow against the Vercel preview URL on
PRs and asserts all four categories ≥ 95.

## Caching strategy

- `/api/updates/latest`, `/api/updates/latest.yml`, and the `/download` page
  all use Next's data-cache via `fetch(..., { next: { revalidate: 300 }})`.
- The response headers also set `Cache-Control: public, s-maxage=300,
  stale-while-revalidate=3600` so the Vercel edge cache holds the response.
- electron-updater polls roughly hourly; 5 minutes of server cache is
  plenty.
- GitHub anonymous rate limit is 60 req/h; with a 5-minute cache we'll
  consume ~12 requests/hour worst case. No `GITHUB_TOKEN` required.

## Updating the user guide

Each `/docs/<topic>` is a single TSX page under `src/app/docs/<topic>/`.
Edit, save, push. The page revalidates instantly in dev and on next deploy
in prod.

To add a new topic:

1. Create `src/app/docs/<new-slug>/page.tsx` using `<Prose>` for body
   content.
2. Add `{ href: "/docs/<new-slug>", label: "..." }` to the relevant section
   in `src/components/docs/docs-nav.ts`.
3. The sidebar and sitemap pick it up automatically.

## Repointing the desktop app at this site

Once deployed, the desktop app needs a one-line update so `electron-updater`
fetches its feed from here. In the desktop repo, edit `scribe/app-update.yml`:

```yaml
provider: generic
url: https://nexus-web.vercel.app/api/updates/
```

That's the only change needed on the app side for Phase 1.
