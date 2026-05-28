import { cn } from "@/lib/utils";

/** Inline Nexus mark. Inline (not an <img>) so it inherits color contexts and
 *  ships zero extra requests. Wordmark optional. */
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
            <stop offset="0" stopColor="#10b981" />
            <stop offset="1" stopColor="#0f766e" />
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
        <g fill="#ffffff">
          <rect x="70" y="64" width="28" height="128" />
          <rect x="158" y="64" width="28" height="128" />
          <polygon points="70,64 98,64 186,192 158,192" />
        </g>
      </svg>
      {withWordmark ? (
        <span className="text-lg font-semibold tracking-tight">Nexus</span>
      ) : null}
    </span>
  );
}
