# Glossary

Shared vocabulary for **nexus-web**. Terms are grounded in the code; where this
disagrees with the repository, the code wins (`CLAUDE.md`).

## Brand & design

- **Nexus** — the product. Always one word, capitalized. Never "Nexus AI",
  "Nexus App", "Scribe". `scribe/` is the app's on-disk directory name only.
- **Orbit-node mark** — the brand symbol since v0.11.0: a central node, a tilted
  elliptical orbit ring, and a satellite riding the ring, white-on-gradient in a
  rounded square. Replaced the **monogram "N"**. Geometry source of truth: the
  app's `build/make-icons.mjs`. See [ADR 0003](adr/0003-orbit-node-mark.md).
- **Monogram "N"** *(retired)* — the pre-v0.11.0 mark (two bars + a diagonal).
  Removed from the web in this refresh.
- **Iris** — the primary brand accent, a violet-blue. `#5b3df0` (light) /
  `#8b7bff` (dark). Token: `--accent-iris`, also `--primary`/`--ring`.
- **Cyan** — the second half of the duotone accent. UI token `--accent-cyan`
  `#0e7490` (light) / `#2ad4ee` (dark); the **icon gradient** uses a brighter
  `#22d3ee`. The two differ on purpose (icon runs brighter; UI token deepened
  for WCAG AA on light surfaces).
- **Brand gradient** — `linear-gradient(135deg, iris, cyan)`. Token
  `--gradient-brand`. The only decorative gradient on the site; used on the mark
  and a single hero accent. See [ADR 0004](adr/0004-measured-ultra-moderno.md).
- **ultra-moderno** — the app's v0.11.0 dark-first redesign (depth shadows,
  glass, glow, iris→cyan). The web adopts it **"measured"**: palette + mark +
  type + gradient, but not the depth/glass/glow tokens.
- **Geist / Geist Mono** — the self-hosted variable fonts (OFL) adopted in
  v0.11.0. Sans for UI/body, Mono for numerics/code. See
  [ADR 0002](adr/0002-adopt-self-hosted-geist.md).
- **Semantic token** — a CSS variable named by role (`--primary`, `--card`,
  `--muted-foreground`), not by color. Component classNames reference only these.
- **Mirroring** — the web's tokens/assets are *copied from* the app
  (`scribe/src/renderer/app/index.css`), not imported at runtime. When the app's
  design changes, the web is updated to match.

## Releases & content

- **Release host** — `jltps/nexus-releases`, the **public** repo that carries
  compiled installers + `latest.yml` + the auto-update feed. Overridable via
  `NEXUS_RELEASES_REPO`. The app source `jltps/MeetingTranscriber` is private.
- **Live feed** — releases fetched from the release host at request time
  (Next `fetch` + 5-min ISR) via `src/lib/github-releases.ts`. Powers
  `/download` and `/changelog` automatically.
- **`STATIC_CHANGELOG`** — `src/lib/static-changelog.ts`, a curated, English,
  historical backfill for old versions the release host no longer carries. The
  changelog renders the live feed and appends these (deduped by version, live
  wins).
- **Highlight** — the one-line "New in Nexus" headline on the homepage, derived
  from the latest release title's text after the em-dash, with a static
  fallback. See [ADR 0005](adr/0005-automatic-release-surfacing.md).
- **Translation cache** — `src/lib/release-translations.json`, a committed
  tag→{hash,title_en,body_en} map produced by `scripts/translate-releases.ts`
  at build/CI time. Pages read it and fall back to the original GitHub text.
  See [ADR 0006](adr/0006-build-time-release-translation.md).
- **Pass-through** — translation behavior for text already in English: returned
  unchanged. Most release notes are already English.

## Platform & invariants

- **§1 invariants** — the non-negotiable rules in `CLAUDE.md §1` (no third-party
  JS, no tracking, no remote fonts, keys never committed, etc.), enforced by
  `scripts/check-invariants.ts`. Amended in this refresh: the font rule now
  forbids *remote/third-party* fonts but **allows a self-hosted, same-origin
  font** ([ADR 0002](adr/0002-adopt-self-hosted-geist.md)).
- **`check-invariants`** — the CI grep that fails the build on forbidden hosts,
  the `next/font/google` import, analytics packages, or hardcoded API keys.
- **JS-disabled rendering** — the hard requirement that every page works without
  client JavaScript. Theme toggle, FAQ accordion, copy button are the only
  components allowed to degrade.
