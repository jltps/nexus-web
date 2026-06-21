# Project Spec — nexus-web (Phase 1)

## Purpose

Three jobs:

1. **Promote** Nexus and explain what it is, who it's for, how it works,
   and what it costs (nothing).
2. **Distribute** the Windows and macOS installers (link to GitHub Releases;
   surface version, system requirements, recent versions).
3. **Host one live cloud endpoint** that the desktop app consumes:
   `GET /api/updates/latest(.yml)` for `electron-updater`. Everything else
   on the API surface is a typed stub that returns 501 — the contract is
   the deliverable in Phase 1.

## Non-goals (Phase 1)

- No accounts. No login. No databases. No user storage of any kind.
- No analytics, telemetry, or trackers.
- No payments.
- No custom domain.
- No search across docs (12 pages — sidebar + Ctrl+F suffices).
- No internationalization of the site (the *app* supports many languages;
  the site is English-only Phase 1).

## Audience

- Existing Nexus users coming for the user guide or update info.
- New users discovering Nexus via word of mouth, blog posts, or search.
- The desktop app itself, calling `/api/updates/latest(.yml)`.

## Information architecture

| Route | Owner | Content |
|---|---|---|
| `/` | marketing | Hero → What's-new → Differentiators → Features → Insights → Privacy → FAQ → CTA |
| `/download` | marketing | Latest version from GitHub (Windows + macOS) + system reqs + recent releases |
| `/docs` | docs | Overview + sidebar to 12 topic pages |
| `/docs/<topic>` | docs | Getting started, API keys, calendar, templates, chat, transcription providers, insights, offline Whisper, folders+tags, cost & usage, keyboard shortcuts, troubleshooting |
| `/privacy` | marketing | The five §1 invariants in user-facing language |
| `/terms` | marketing | Short Terms of Use |
| `/about` | marketing | Who built Nexus + contact |
| `/changelog` | marketing | Recent releases (live from GitHub) |
| `/roadmap` | marketing | Now / Next / Later |
| `/api/updates/latest` | API | electron-updater JSON, 5-min cache |
| `/api/updates/latest.yml` | API | electron-updater YAML, 5-min cache |
| `/api/{auth,sync,backups,shares,telemetry}` | API | 501 stubs with Zod validation |
| `/.well-known/security.txt` | static | Security contact |
| `404`, `error` | shell | Branded error pages |

## Phase boundary

| Lives in Phase 1 | Moves to Phase 2 |
|---|---|
| Marketing pages | Auth (magic link, Google, Microsoft) |
| Docs (12 pages) | Cloud sync (delta pull/push, tombstones) |
| Download (link to GH Releases) | Cloud backup (`BackupBundle` upload) |
| `/api/updates/*` live | Read-only meeting sharing |
| Zod stubs for everything else | Telemetry (opt-in) |
|  | `/download/[version]` for older releases |
|  | Pagefind-powered docs search |
|  | Custom domain |

## Hard constraints

These are inherited from the Nexus desktop app's `CLAUDE.md §1`. Surface
violations; never silently break.

- No third-party JavaScript. Site must function with JS disabled (theme
  toggle and FAQ accordion are allowed exceptions that degrade).
- No web fonts. System font stack only.
- No remote `next/image` sources.
- No tracking cookies, no cookie banner.
- `BackupBundle` mirror schema must not contain `api_keys` or
  `oauth_tokens`.

## Success criteria for Phase 1

1. The site builds clean (`pnpm typecheck && pnpm lint && pnpm build`).
2. `check:invariants` script reports zero hits.
3. Every page renders with browser JS disabled.
4. Lighthouse on a Vercel preview reports perf/a11y/best/SEO all ≥ 95.
5. `/api/updates/latest` returns a valid JSON payload that matches the
   `UpdatesLatestResponseSchema`.
6. `/api/updates/latest.yml` returns a byte-for-byte copy of the upstream
   `latest.yml` that electron-updater accepts.
7. Phase-2 stubs return 400 on malformed JSON, 501 on well-formed.
8. `/privacy` quotes the five §1 invariants verbatim with plain-English
   explainers underneath.

## Open decisions

- **Which GitHub repo hosts releases**: documented in `API_CONTRACT.md`.
  Defaults to `jltps/MeetingTranscriber`; change via `NEXUS_RELEASES_REPO`.
- **Beta channel**: deferred. The current endpoint skips drafts and
  pre-releases. A `?channel=beta` query parameter is a Phase-2 addition.
- **Repointing the desktop app**: a small follow-up commit in the Electron
  repo updates `app-update.yml` to point at the production deployment URL.
  That commit is *not* part of this repo.
