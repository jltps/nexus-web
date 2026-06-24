# ADR 0004: "Measured" adoption of the ultra-moderno look on marketing

- Status: Accepted
- Date: 2026-06-24
- Deciders: José Luís Sousa (with Claude)

## Context

The app's "ultra-moderno" system layers depth shadows (`--shadow-1/2/3`),
frosted-glass surfaces (`--glass-bg/border/blur`), a signature brand glow
(`--glow-brand`), and iris→cyan gradients on top of the new palette. The
question: how much of that visual intensity should the marketing + docs site
take on?

Constraints that pull the other way: the site **must render with JavaScript
disabled** and must hold **Lighthouse ≥ 95** for performance, a11y, best
practices, and SEO (`CLAUDE.md §6`). `BRAND.md` was deliberately calm — *"the
only decorative gradient is the logo mark"*, *"don't introduce custom shadow
tokens."*

## Decision

**Measured**, not full. Adopt:

- the new iris→cyan palette ([ADR 0001](0001-mirror-iris-cyan-brand.md)),
- the orbit-node mark ([ADR 0003](0003-orbit-node-mark.md)),
- the Geist type ([ADR 0002](0002-adopt-self-hosted-geist.md)),
- the brand **gradient** on the logo/icon and a single tasteful hero accent.

**Do not** import the depth-shadow, glass, or glow token sets, and keep the flat,
fast, calm marketing layout (existing `shadow-xs`/`shadow-md` usage stays).
`BRAND.md`'s "calm, flat" guidance is retained, amended only to allow the brand
gradient on the mark/hero.

## Consequences

- The site reads as the same brand without risking the perf/JS-disabled budget
  that glass blur + heavy shadows + glow would threaten.
- If a future pass wants more of the app's depth, it's an additive token import,
  not a rework — the palette and mark groundwork is already in place.

## Alternatives considered

- **Full ultra-moderno** (glass/shadow/glow). Rejected for now: heaviest, most
  contrast/perf risk, least aligned with a JS-disabled marketing site.
- **Minimal** (palette + mark only, no gradient). Rejected: the gradient *is*
  the recognition cue; dropping it understates the rebrand.
