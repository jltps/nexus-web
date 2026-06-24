# ADR 0001: Mirror the app's iris→cyan brand palette on the web

- Status: Accepted
- Date: 2026-06-24
- Deciders: José Luís Sousa (with Claude)

## Context

The desktop app shipped **v0.11.0 "ultra-moderno"** — a dark-first redesign whose
signature change is a new duotone brand accent, **iris → cyan**, replacing the
old emerald/teal. The web's design tokens are explicitly *mirrored* from the
app's `scribe/src/renderer/app/index.css` (see `BRAND.md`, `CLAUDE.md §2`), so
the web was visibly stale: emerald/teal `#10b981 → #0f766e`, `--primary
#0f766e` (light) / `#2dd4bf` (dark).

The app's new token set is large (depth shadows, glass, glow, per-speaker /
entity / sentiment / label / sidebar colors). Most of those have no surface on a
marketing + docs site.

## Decision

Mirror the **brand-relevant subset** of the app's new tokens into
`src/app/globals.css`:

- Light: `--primary #5b3df0`, `--ring #5b3df0`, `--accent-iris #5b3df0`,
  `--accent-cyan #0e7490`, `--gradient-brand` (135° iris→cyan), plus the
  refreshed neutrals (`--background #f7f7fb`, `--foreground #16161d`, `--card`,
  `--muted`, `--border`, `--input`, `--destructive`, `--warning`, `--info`).
- Dark: `--primary #8b7bff`, `--accent-iris #8b7bff`, `--accent-cyan #2ad4ee`,
  refreshed neutrals (`--background #0a0a0f`, `--foreground #e7e7ee`, …).

Expose `--accent-iris`, `--accent-cyan` as Tailwind color utilities in
`@theme inline`. The logo/icon gradient uses the brighter **`#5b3df0 → #22d3ee`**
pair from the app's `make-icons.mjs` (the icon gradient runs brighter than the
UI `--accent-cyan` token, which is deepened for AA on light surfaces).

**Not mirrored** (no web surface): speaker, entity, sentiment, label, sidebar,
rail, and the depth/glass/glow tokens (see [ADR 0004](0004-measured-ultra-moderno.md)).

## Consequences

- The web matches the app's identity again. One source of truth stays the app;
  `BRAND.md §3` and `docs/DESIGN_SYSTEM.md` are updated to the new values.
- All component classNames already use semantic tokens (`bg-primary`,
  `text-primary`, …), so the recolor is automatic — no per-component edits for
  color. Hardcoded `#10b981`/`#0f766e`/`#2dd4bf` hex only existed in the logo,
  favicon, and OG image routes, handled in [ADR 0003](0003-orbit-node-mark.md).
- WCAG AA must hold for every fg/bg pairing in both themes; the mirrored values
  are AA-tuned in the app and preserved verbatim.

## Alternatives considered

- **Mirror the full app token set.** Rejected: dead tokens on a site with no
  transcript/insights UI; more to keep in sync for zero benefit.
