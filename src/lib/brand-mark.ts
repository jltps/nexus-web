/**
 * The Nexus "orbit-node" brand mark (since v0.11.0) as a standalone SVG string.
 *
 * This is the single source for the runtime image routes — icon, apple-icon,
 * opengraph-image, twitter-image — which rasterize it through next/og (resvg).
 * The inline React form lives in `src/components/logo.tsx` and must stay
 * geometrically in sync with this string. Geometry is mirrored from the app's
 * `build/make-icons.mjs`. See docs/adr/0003-orbit-node-mark.md.
 *
 * Intrinsic width/height are kept on the <svg> so Satori can size the <img>.
 * The gradient is the recognition cue (icon pair runs brighter than the UI
 * --accent-cyan token) and is fixed, not theme-driven.
 */
export const BRAND_MARK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256" role="img" aria-label="Nexus"><defs><linearGradient id="nexus-mark-grad" x1="0" y1="0" x2="256" y2="256" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#5b3df0"/><stop offset="1" stop-color="#22d3ee"/></linearGradient></defs><rect x="0" y="0" width="256" height="256" rx="56" ry="56" fill="url(#nexus-mark-grad)"/><ellipse cx="128" cy="128" rx="80" ry="44" transform="rotate(-25 128 128)" fill="none" stroke="#ffffff" stroke-width="10"/><circle cx="128" cy="128" r="22" fill="#ffffff"/><circle cx="160.36" cy="75.72" r="15" fill="#ffffff"/></svg>`;

/** The mark as a data URI, for an `<img src>` inside next/og ImageResponse. */
export const BRAND_MARK_DATA_URI = `data:image/svg+xml,${encodeURIComponent(
  BRAND_MARK_SVG,
)}`;
