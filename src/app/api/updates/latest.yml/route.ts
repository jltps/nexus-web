/**
 * GET /api/updates/latest.yml
 *
 * Proxies the canonical electron-updater YAML feed from the latest stable
 * GitHub Release. Returns it verbatim so electron-updater's strict parser
 * sees a byte-for-byte copy of what `electron-builder` published — same
 * `sha512` (base64 of SHA-512), same `path`, same `releaseDate`.
 *
 * If you ever want to *rewrite* the feed (e.g. to point `path` at a CDN
 * mirror), do it here — but be conservative: electron-updater is strict.
 */

import { NextResponse } from "next/server";
import { downloadAssetText, getLatestRelease } from "@/lib/github-releases";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const release = await getLatestRelease();
    if (!release) {
      return new NextResponse("# No stable release published yet.\n", {
        status: 404,
        headers: { "Content-Type": "application/x-yaml; charset=utf-8" },
      });
    }
    const yml = release.assets.find((a) => a.name === "latest.yml");
    if (!yml) {
      return new NextResponse(
        "# Latest release has no latest.yml asset.\n",
        {
          status: 502,
          headers: { "Content-Type": "application/x-yaml; charset=utf-8" },
        },
      );
    }
    // Fetch through the authenticated API path so this works for private
    // releases repos too.
    const body = await downloadAssetText(yml);
    if (body === null) {
      return new NextResponse(
        "# Upstream latest.yml fetch failed.\n",
        {
          status: 502,
          headers: { "Content-Type": "application/x-yaml; charset=utf-8" },
        },
      );
    }
    return new NextResponse(body, {
      status: 200,
      headers: {
        "Content-Type": "application/x-yaml; charset=utf-8",
        "Cache-Control":
          "public, s-maxage=300, stale-while-revalidate=3600",
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return new NextResponse(`# ${message}\n`, {
      status: 502,
      headers: { "Content-Type": "application/x-yaml; charset=utf-8" },
    });
  }
}
