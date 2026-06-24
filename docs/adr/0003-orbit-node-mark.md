# ADR 0003: Replace the monogram "N" with the orbit-node mark

- Status: Accepted
- Date: 2026-06-24
- Deciders: José Luís Sousa (with Claude)

## Context

The web brand mark was a monogram **"N"** (two bars + a diagonal) on an
emerald→teal gradient, mirrored from the app's old icon. In v0.11.0 the app
replaced it with an **"orbit node"** symbol (app commits `4d00922`, `289e1de`,
`2367dc0`): a central node, a tilted elliptical orbit ring, and a satellite
riding the ring. Geometry is the source of truth in the app's
`build/make-icons.mjs` and `src/renderer/assets/logo.svg`.

## Decision

Adopt the orbit-node mark across every web surface that drew the "N":

- Geometry (viewBox `0 0 256 256`): rounded square `rx 56` filled with the brand
  gradient **`#5b3df0 → #22d3ee`**; white orbit `ellipse cx128 cy128 rx80 ry44
  rotate(-25°) stroke 10 fill none`; white central `circle r22 @128,128`; white
  satellite `circle r15 @160.36,75.72`.
- `src/components/logo.tsx` — orbit-node JSX (sizable via the `size` prop;
  unique gradient id to avoid collisions).
- `public/logo.svg` — copied verbatim from the app.
- `src/lib/brand-mark.ts` — single string copy of the SVG for the runtime
  image routes (kept in sync with `logo.tsx`).
- `src/app/icon.tsx`, `apple-icon.tsx`, `opengraph-image.tsx`,
  `twitter-image.tsx` — render the mark as an `<img>` of an inline SVG data URI
  (resvg/Satori rasterizes gradients + transforms reliably), replacing the
  text-"N" boxes; OG/twitter accent recolored to dark-theme iris `#8b7bff`.

## Consequences

- The site's favicon, social cards, and inline logo match the app's new icon.
- The mark uses a fixed gradient (not `currentColor`) — the recognition cue —
  so it does not invert with theme; this matches `BRAND.md`'s "don't recolor the
  mark" rule, now updated to describe the orbit node.
- Two representations of the geometry exist (JSX in `logo.tsx`, string in
  `brand-mark.ts`); both carry a cross-reference comment. Acceptable given they
  serve different runtimes (React vs. Satori).

## Alternatives considered

- **Single source via `dangerouslySetInnerHTML`.** Rejected: ugly for a trivially
  small mark and offers no real benefit over a cross-referenced comment.
