# ADR 0006: Translate release content to English via a build/CI-time cache

- Status: Accepted
- Date: 2026-06-24
- Deciders: José Luís Sousa (with Claude)

## Context

Release notes are authored in **mixed languages** (Portuguese, English, or a
mix — e.g. the v0.11.0 title "ultra-moderno"). The public site must always show
release content (the changelog and the homepage highlight) in **English**.

The repo's ethos (`CLAUDE.md §1`, §4) avoids third-party client JS, tracking,
and unnecessary runtime dependencies — "the simple path is sufficient." A
translation step is the one piece that strains this, so the mechanism matters.
Release notes are public on GitHub, so sending them to a translation model is
not a privacy concern; the concern is *runtime fragility and cost*.

## Decision

Translate at **build/CI time into a committed cache**, not at render time.

- `src/lib/release-translations.json` — a committed map keyed by tag:
  `{ "<tag>": { "hash": "<sha of source title+body>", "title_en", "body_en" } }`.
- `scripts/translate-releases.ts` — fetches releases from the public release
  repo, and for each whose source-content hash is **not already cached**, calls
  the Anthropic Messages API (plain `fetch`, no new dependency) with
  `claude-haiku-4-5` (the script's `MODEL` default is a pinned dated snapshot,
  overridable via `TRANSLATE_MODEL`) to translate to English (English passes
  through unchanged).
  Writes the updated cache. **Degrades gracefully:** with no
  `ANTHROPIC_API_KEY` it no-ops, leaving the cache intact, so local
  `build`/`typecheck` never require a key.
- `.github/workflows/translate-releases.yml` — runs the script on a schedule
  (every 6h) + manual `workflow_dispatch` + `repository_dispatch` (so the
  releases repo can trigger it on publish), and commits the cache if it changed
  (which redeploys the site).
- Pages (`/changelog`, `WhatsNew`) read the cache and fall back to the **original
  GitHub text** for any release not yet translated.

## Consequences

- **Zero runtime dependency**: pages never call a model; they read a static JSON.
  No render can fail or slow down because of translation.
- The English text is **committed and reviewable** in PRs/diffs.
- A brand-new release shows its original text until the next scheduled (or
  dispatched) run translates it — an acceptable, bounded staleness with a clean
  fallback. Most content is already English, so most entries pass through.
- The Anthropic key lives **only** as a GitHub Actions secret — never committed,
  so `check-invariants` (which greps for `sk-ant-…`) stays green.
- New maintenance surface: a script + a workflow. Justified by the "automatic +
  reviewable + no runtime dependency" requirement.

## Alternatives considered

- **Runtime translation (Vercel AI Gateway + Claude, cached per release).**
  Simpler to build, but adds an external service the page leans on during
  revalidation and a per-render failure mode. Rejected for the runtime
  dependency.
- **Author release notes in English.** Simplest, zero infra — but manual, and
  the user wants it automatic for mixed-language notes. Rejected.

## Update (2026-06-29): curated notes win; cache excludes them; hourly cron

Two problems surfaced once the desktop pipeline started auto-populating GitHub
release bodies from commit subjects:

1. **The cron clobbered curated notes.** Hand-written entries that had been
   edited into `release-translations.json` were overwritten the next time the
   scheduled run re-translated the (now non-empty, but thin) GitHub body — the
   rich notes for v0.12.0/v0.13.0/v0.13.1 were silently reduced to a single
   "What's new" bullet.
2. **Curated `static-changelog.ts` entries were shadowed.** `effectiveBody` only
   fell back to a curated entry when the live body was *empty*; once the pipeline
   filled bodies, the thin auto-generated text always won, so the curated rich
   notes never rendered.

**Decision:** curated entries are **authoritative**. `curatedRelease`
(`lib/release-content.ts`) matches a tag to its `static-changelog.ts` entry;
both `/changelog` (`effectiveBody`) and the homepage highlight prefer it over the
live body. The translation cache therefore stores **only non-curated** live
releases: `translate-releases.ts` skips curated tags and prunes any that linger,
so a refresh can never clobber curation again. The cron is now **hourly** (was
6h) as a safety net behind the on-publish `repository_dispatch`. Pages still fall
back to the (translated) live body, then a neutral line, for any release without
a curated entry — so automation still covers everything by default; curation is
an opt-in upgrade per release.
