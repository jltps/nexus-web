/**
 * GET /api/updates/<asset-filename>
 *
 * Proxies a release asset from the (private) GitHub Releases repo. Used by:
 *   - the website's /download "Download .exe" button
 *   - electron-updater, which resolves the `path` field in latest.yml
 *     relative to its feed URL (so `path: Nexus.Setup.0.6.0.exe` plus the
 *     app's app-update.yml `url: …/api/updates/` → /api/updates/Nexus.Setup.0.6.0.exe).
 *
 * We DON'T stream bytes through this function. Instead we call GitHub's
 * asset API with our server-side token, take the short-lived presigned S3
 * redirect URL it returns, and 302 the client to it. That means:
 *   - serverless function exits in ~200ms regardless of file size
 *   - no Vercel bandwidth consumed for the actual download
 *   - the token never leaves the server
 *   - the URL the client sees is a temporary signed URL that GitHub
 *     revokes after a few minutes
 *
 * The static routes /api/updates/latest and /api/updates/latest.yml take
 * precedence over this dynamic route by Next.js routing rules, so this
 * handler only fires for real filenames.
 */

import { NextResponse } from "next/server";
import { getLatestRelease } from "@/lib/github-releases";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ asset: string }> },
) {
  const { asset } = await params;
  const decoded = decodeURIComponent(asset);

  if (decoded.includes("/") || decoded.includes("..") || decoded === "") {
    return NextResponse.json(
      { error: "invalid_asset", message: "Bad asset name." },
      { status: 400 },
    );
  }

  let release;
  try {
    release = await getLatestRelease();
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { error: "upstream_error", message },
      { status: 502 },
    );
  }
  if (!release) {
    return NextResponse.json(
      { error: "no_release", message: "No stable release published yet." },
      { status: 404 },
    );
  }

  const hit = release.assets.find(
    (a) => a.name.toLowerCase() === decoded.toLowerCase(),
  );
  if (!hit) {
    return NextResponse.json(
      {
        error: "asset_not_found",
        message: `Asset "${decoded}" not found in release ${release.tag_name}.`,
      },
      { status: 404 },
    );
  }

  // `hit.url` is the GitHub API endpoint for the asset
  // (https://api.github.com/repos/<owner>/<repo>/releases/assets/<id>).
  // Combined with Accept: application/octet-stream + token, GitHub returns
  // a 302 to a presigned S3 URL we can hand straight to the client.
  const headers: Record<string, string> = {
    Accept: "application/octet-stream",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "nexus-web/1.0",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  let upstream: Response;
  try {
    upstream = await fetch(hit.url, { headers, redirect: "manual" });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { error: "upstream_error", message },
      { status: 502 },
    );
  }

  // Public repos can return 200 with the bytes directly. Stream through.
  if (upstream.status === 200 && upstream.body) {
    return new NextResponse(upstream.body, {
      status: 200,
      headers: {
        "Content-Type":
          upstream.headers.get("content-type") ?? "application/octet-stream",
        "Content-Disposition": `attachment; filename="${decoded}"`,
        "Cache-Control": "no-store",
      },
    });
  }

  const location = upstream.headers.get("location");
  if (!location) {
    const detail = await upstream.text().catch(() => "");
    return NextResponse.json(
      {
        error: "no_redirect",
        status: upstream.status,
        detail: detail.slice(0, 400),
      },
      { status: 502 },
    );
  }

  // Signed URL — single-use, short-lived. Never cache it.
  return new NextResponse(null, {
    status: 302,
    headers: {
      Location: location,
      "Cache-Control": "no-store",
    },
  });
}
