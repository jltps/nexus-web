"use client";

import { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";

type Os = "windows" | "mac" | "other";

function detectOs(): Os {
  if (typeof navigator === "undefined") return "other";
  const ua = `${navigator.userAgent} ${navigator.platform}`.toLowerCase();
  if (ua.includes("win")) return "windows";
  // iPadOS reports "macintosh" / "macintel" but is a touch device that can't
  // run a desktop .dmg — exclude it so we don't steer tablets at the Mac build.
  const isTouch = navigator.maxTouchPoints > 1;
  if (ua.includes("mac") && !isTouch) return "mac";
  return "other";
}

/** Additive enhancement: points visitors at the build for their OS. Renders
 *  nothing on the server, for unrecognized platforms, or when the detected
 *  platform has no downloadable build yet, so the download page is fully
 *  usable with JavaScript disabled and never links to a disabled card. */
export function DownloadOsHint({
  hasWindows,
  hasMac,
}: {
  hasWindows: boolean;
  hasMac: boolean;
}) {
  const [os, setOs] = useState<Os | null>(null);

  useEffect(() => {
    setOs(detectOs());
  }, []);

  const available =
    (os === "windows" && hasWindows) || (os === "mac" && hasMac);
  if (!available) return null;

  const label = os === "windows" ? "Windows" : "macOS";
  const anchor = os === "windows" ? "#windows" : "#macos";

  return (
    <div className="mt-6 flex justify-center">
      <a
        href={anchor}
        className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-1.5 text-sm shadow-xs transition-colors hover:border-primary/40"
      >
        <ArrowDown className="size-3.5 text-primary" />
        <span>
          Your <span className="font-medium">{label}</span> build is below
        </span>
      </a>
    </div>
  );
}
