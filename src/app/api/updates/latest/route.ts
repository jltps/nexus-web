/**
 * GET /api/updates/latest
 *
 * Returns the latest stable Nexus release as JSON for the website
 * (download page) and any custom electron-updater integrations.
 *
 * The strict electron-updater YAML feed is served from /api/updates/latest.yml.
 * This route exists separately so the web UI can consume the same data
 * without parsing YAML.
 *
 * Cache: 5 min server-side, 1h stale-while-revalidate at the edge.
 */

import { NextResponse } from "next/server";
import {
  findInstallerAsset,
  getLatestRelease,
  tagToVersion,
} from "@/lib/github-releases";
import { UpdatesLatestResponseSchema } from "@shared/api-contract";

export const runtime = "nodejs";
export const dynamic = "force-dynamic"; // headers vary per request; data itself is cached via fetch revalidate

const SHA512_LINE_RE = /^([A-Za-z0-9+/=]{80,})$/m;

/** electron-updater publishes the .exe sha512 inside `latest.yml`; rather
 *  than parsing YAML twice, we extract the line cheaply here. The YAML route
 *  does proper parsing. */
function extractSha512FromLatestYml(yml: string): string | null {
  for (const line of yml.split(/\r?\n/)) {
    const m = line.match(/^\s*sha512:\s*(.+)\s*$/);
    if (m && m[1]) return m[1].trim();
  }
  // Fallback: any base64-looking long token on its own line.
  const m = yml.match(SHA512_LINE_RE);
  return m ? (m[1] ?? null) : null;
}

export async function GET() {
  try {
    const release = await getLatestRelease();
    if (!release) {
      return NextResponse.json(
        { error: "no_release", message: "No stable release published yet." },
        { status: 404 },
      );
    }
    const installer = findInstallerAsset(release);
    if (!installer) {
      return NextResponse.json(
        {
          error: "no_installer_asset",
          message:
            "Latest release does not contain a Windows .exe installer asset.",
        },
        { status: 502 },
      );
    }
    const latestYmlAsset = release.assets.find((a) => a.name === "latest.yml");
    let sha512 = "";
    if (latestYmlAsset) {
      const ymlRes = await fetch(latestYmlAsset.browser_download_url, {
        next: { revalidate: 300 },
      });
      if (ymlRes.ok) {
        const yml = await ymlRes.text();
        sha512 = extractSha512FromLatestYml(yml) ?? "";
      }
    }
    const payload = UpdatesLatestResponseSchema.parse({
      version: tagToVersion(release.tag_name),
      releaseDate: new Date(release.published_at ?? Date.now()).toISOString(),
      url: installer.browser_download_url,
      sha512,
      path: installer.name,
      notes: release.body ?? "",
    });
    return NextResponse.json(payload, {
      headers: {
        "Cache-Control":
          "public, s-maxage=300, stale-while-revalidate=3600",
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { error: "upstream_error", message },
      { status: 502 },
    );
  }
}
