# ADR 0005: Make the homepage highlight track the latest release automatically

- Status: Accepted
- Date: 2026-06-24
- Deciders: José Luís Sousa (with Claude)

## Context

"The website is not reflecting the latest releases, and this should be
automatic." Audit of every release-bearing surface:

| Surface | Source | State |
|---|---|---|
| `/download` | `getLatestRelease` / `getRecentReleases` (live, 5-min ISR) | **already automatic** |
| `/changelog` | `getRecentReleasesIncludingPrereleases` + `STATIC_CHANGELOG` backfill | **already automatic** for new releases |
| Homepage `WhatsNew` band | hardcoded string ("Gladia transcription and post-call insights", a v0.8 feature) | **stale / manual** |

So only the homepage "New in Nexus" band was actually manual. Its original
design note made a deliberate trade-off: *static so it can never fail the
homepage render and never desyncs a version number from the highlight.* Any fix
must preserve that fail-safe property.

## Decision

Make `WhatsNew` derive its highlight from the **latest GitHub release**, with a
layered fallback so it can never break the homepage:

1. Read the latest release (reusing `getLatestRelease`, already cached).
2. Take the **English title** (see [ADR 0006](0006-build-time-release-translation.md))
   and extract the headline as the text **after the em-dash** in
   `vX.Y.Z — <headline>` (e.g. v0.11.0 → *"ultra-moderno UI overhaul + new brand
   mark"*). Strip surrounding quotes.
3. If there is no release, no dash, or anything throws → fall back to a static
   constant highlight. The band always renders.

`WhatsNew` becomes an async Server Component (still SSR, still works with JS
disabled). The `STATIC_CHANGELOG` is retained unchanged as historical backfill
for versions the public release host no longer carries.

## Consequences

- Shipping a release named `vX.Y.Z — <headline>` updates the homepage with no
  code change.
- New dependency on the release-naming convention; the static fallback covers
  any release that doesn't follow it, so a bad name degrades gracefully rather
  than breaking.
- The version number and highlight can no longer desync (both come from the same
  release), removing a class of the manual errors the static band risked.

## Alternatives considered

- **First line of the release body.** Rejected: the first line is often a
  paragraph, not a headline.
- **Auto version + hand-written highlight.** Rejected: still manual per release,
  which is the thing being fixed.
