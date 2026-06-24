import { cn } from "@/lib/utils";

/** Inline Nexus "orbit-node" mark (a central node, a tilted orbit ring, and a
 *  satellite on the ring). Inline SVG — not an <img> — so it ships zero extra
 *  requests and scales crisply. The gradient is fixed (the recognition cue), so
 *  the mark does not invert with theme. Wordmark optional. Geometry mirrors the
 *  app's logo.svg / make-icons.mjs and src/lib/brand-mark.ts — keep in sync.
 *  See docs/adr/0003-orbit-node-mark.md. */
export function Logo({
  className,
  withWordmark = false,
  size = 32,
}: {
  className?: string;
  withWordmark?: boolean;
  size?: number;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 256"
        width={size}
        height={size}
        role="img"
        aria-label="Nexus"
      >
        <defs>
          <linearGradient
            id="nexus-mark-grad"
            x1="0"
            y1="0"
            x2="256"
            y2="256"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#5b3df0" />
            <stop offset="1" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
        <rect
          x="0"
          y="0"
          width="256"
          height="256"
          rx="56"
          ry="56"
          fill="url(#nexus-mark-grad)"
        />
        <ellipse
          cx="128"
          cy="128"
          rx="80"
          ry="44"
          transform="rotate(-25 128 128)"
          fill="none"
          stroke="#ffffff"
          strokeWidth="10"
        />
        <g fill="#ffffff">
          <circle cx="128" cy="128" r="22" />
          <circle cx="160.36" cy="75.72" r="15" />
        </g>
      </svg>
      {withWordmark ? (
        <span className="text-lg font-semibold tracking-tight">Nexus</span>
      ) : null}
    </span>
  );
}
