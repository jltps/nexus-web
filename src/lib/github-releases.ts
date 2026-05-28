/**
 * Thin typed wrapper over the GitHub Releases REST API.
 *
 * Cache strategy: Next.js `fetch` with `revalidate: 300`. electron-updater
 * polls roughly hourly; 5 minutes is more than enough freshness and keeps
 * us well below GitHub's 60 req/h anonymous limit. If a `GITHUB_TOKEN`
 * env var is set, we pass it (raises the limit to 5000 req/h) — but it's
 * optional and the Phase-1 deployment runs fine without one.
 */

import { z } from "zod";

const RELEASES_REPO =
  process.env.NEXUS_RELEASES_REPO ?? "jlts2010/nexus-releases";

const GitHubAssetSchema = z.object({
  name: z.string(),
  browser_download_url: z.string().url(),
  size: z.number(),
  content_type: z.string(),
  updated_at: z.string(),
});

const GitHubReleaseSchema = z.object({
  tag_name: z.string(),
  name: z.string().nullish(),
  body: z.string().nullish(),
  draft: z.boolean(),
  prerelease: z.boolean(),
  published_at: z.string().nullable(),
  assets: z.array(GitHubAssetSchema),
  html_url: z.string().url(),
});
export type GitHubRelease = z.infer<typeof GitHubReleaseSchema>;

const GitHubReleasesListSchema = z.array(GitHubReleaseSchema);

const REVALIDATE_SECONDS = 300;

/** Fetch a single release endpoint with the standard cache/header set.
 *  Returns null on 404 (no releases yet — important for the empty-state path). */
async function gh(path: string): Promise<unknown | null> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  const res = await fetch(`https://api.github.com/repos/${RELEASES_REPO}${path}`, {
    headers,
    next: { revalidate: REVALIDATE_SECONDS },
  });
  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(
      `GitHub Releases API ${res.status} for ${path}: ${await res.text()}`,
    );
  }
  return res.json();
}

/** Latest non-draft, non-prerelease release. Skips drafts/prereleases entirely
 *  in Phase 1 — beta channel comes later (see docs/API_CONTRACT.md). */
export async function getLatestRelease(): Promise<GitHubRelease | null> {
  const data = await gh(`/releases`);
  if (data === null) return null;
  const all = GitHubReleasesListSchema.parse(data);
  const stable = all.find((r) => !r.draft && !r.prerelease);
  return stable ?? null;
}

/** Recent stable releases, most-recent first. */
export async function getRecentReleases(limit = 5): Promise<GitHubRelease[]> {
  const data = await gh(`/releases?per_page=${Math.min(30, limit * 3)}`);
  if (data === null) return [];
  const all = GitHubReleasesListSchema.parse(data);
  return all.filter((r) => !r.draft && !r.prerelease).slice(0, limit);
}

/** Strip a leading "v" and any pre-release suffix's leading dash from a tag. */
export function tagToVersion(tag: string): string {
  return tag.replace(/^v/, "");
}

/** Identify the canonical Windows installer asset within a release.
 *  Naming contract (see docs/API_CONTRACT.md): `Nexus-Setup-<x.y.z>.exe`. */
export function findInstallerAsset(
  release: GitHubRelease,
): GitHubRelease["assets"][number] | null {
  return (
    release.assets.find(
      (a) =>
        /^Nexus[- ]Setup[- ].*\.exe$/i.test(a.name) ||
        a.name.toLowerCase().endsWith(".exe"),
    ) ?? null
  );
}

/** Find the `latest.yml` asset (electron-updater publishes it next to the .exe). */
export function findLatestYmlAsset(
  release: GitHubRelease,
): GitHubRelease["assets"][number] | null {
  return release.assets.find((a) => a.name === "latest.yml") ?? null;
}
