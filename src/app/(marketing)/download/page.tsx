import Link from "next/link";
import { Download, ExternalLink, ShieldCheck, Cpu } from "lucide-react";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CopyButton } from "@/components/marketing/copy-button";
import {
  findInstallerAsset,
  getLatestRelease,
  getRecentReleases,
  tagToVersion,
} from "@/lib/github-releases";

export const metadata: Metadata = {
  title: "Download for Windows",
  description:
    "Free Nexus installer for Windows 10/11 (64-bit). Native NSIS installer, signed by tag, served from GitHub Releases.",
};

// ISR-friendly — page is fully cached for 5 minutes via the underlying fetch().
export const revalidate = 300;

function formatDate(iso: string | null): string {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

function bytesToMB(b: number): string {
  return `${(b / (1024 * 1024)).toFixed(1)} MB`;
}

async function fetchLatestSha512(latestYmlUrl: string): Promise<string | null> {
  try {
    const res = await fetch(latestYmlUrl, { next: { revalidate: 300 } });
    if (!res.ok) return null;
    const yml = await res.text();
    for (const line of yml.split(/\r?\n/)) {
      const m = line.match(/^\s*sha512:\s*(.+)\s*$/);
      if (m && m[1]) return m[1].trim();
    }
  } catch {
    /* network/abort — silent */
  }
  return null;
}

export default async function DownloadPage() {
  const [latest, recent] = await Promise.all([
    getLatestRelease(),
    getRecentReleases(5),
  ]);

  if (!latest) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <h1 className="text-3xl font-semibold tracking-tight">
          Download Nexus
        </h1>
        <p className="mt-4 text-muted-foreground">
          The first stable release hasn't been published yet. Check back soon
          — or follow the GitHub repository for updates.
        </p>
      </section>
    );
  }

  const installer = findInstallerAsset(latest);
  const latestYml = latest.assets.find((a) => a.name === "latest.yml");
  const sha512 = latestYml ? await fetchLatestSha512(latestYml.browser_download_url) : null;
  const version = tagToVersion(latest.tag_name);

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <div className="text-center">
        <Badge variant="muted" className="mb-4 rounded-full px-3 py-1">
          Latest release · v{version}
        </Badge>
        <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
          Download Nexus for Windows
        </h1>
        <p className="mt-4 text-muted-foreground">
          Free. Native NSIS installer. No account, no signup, no bots.
        </p>
      </div>

      <div className="mt-10 rounded-2xl border bg-card p-6 shadow-xs sm:p-8">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-semibold">
              {installer?.name ?? "Nexus-Setup.exe"}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {installer ? bytesToMB(installer.size) : "—"} · Released{" "}
              {formatDate(latest.published_at)}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {installer ? (
              <Button asChild size="lg">
                <a
                  href={installer.browser_download_url}
                  rel="noopener"
                >
                  <Download className="mr-2 size-4" />
                  Download .exe
                </a>
              </Button>
            ) : (
              <Button disabled size="lg">
                No installer in this release
              </Button>
            )}
            <Button asChild variant="outline" size="lg">
              <a
                href={latest.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-2 size-4" />
                GitHub Release
              </a>
            </Button>
          </div>
        </div>

        {sha512 ? (
          <div className="mt-6 rounded-md border bg-muted/40 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              SHA-512 checksum
            </p>
            <div className="mt-2 flex items-start gap-3">
              <code className="break-all font-mono text-xs leading-relaxed">
                {sha512}
              </code>
              <CopyButton value={sha512} label="Copy SHA-512" />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Verify with PowerShell:{" "}
              <code className="font-mono">
                Get-FileHash -Algorithm SHA512 .\Nexus-Setup-{version}.exe
              </code>
            </p>
          </div>
        ) : null}
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border bg-card p-5">
          <Cpu className="mb-2 size-4 text-primary" />
          <h3 className="text-sm font-semibold">System requirements</h3>
          <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
            <li>· Windows 10 or 11, 64-bit</li>
            <li>· ~250 MB free disk space</li>
            <li>· Microphone + speakers (or headphones)</li>
            <li>· Internet for cloud LLM / transcription (optional)</li>
          </ul>
        </div>
        <div className="rounded-lg border bg-card p-5">
          <ShieldCheck className="mb-2 size-4 text-primary" />
          <h3 className="text-sm font-semibold">Safe by default</h3>
          <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
            <li>· Audio never written to disk</li>
            <li>· Keys stored via Windows DPAPI</li>
            <li>· No bot, no meeting-platform integration</li>
            <li>· No analytics or trackers in the app</li>
          </ul>
        </div>
      </div>

      {recent.length > 1 ? (
        <div className="mt-12">
          <h2 className="mb-3 text-base font-semibold">Recent releases</h2>
          <ol className="divide-y rounded-lg border bg-card text-sm">
            {recent.map((r) => (
              <li
                key={r.tag_name}
                className="flex items-center justify-between px-4 py-3"
              >
                <div>
                  <span className="font-medium">v{tagToVersion(r.tag_name)}</span>
                  <span className="ml-3 text-muted-foreground">
                    {formatDate(r.published_at)}
                  </span>
                </div>
                <Link
                  href={r.html_url}
                  className="text-sm text-primary hover:underline"
                >
                  Notes →
                </Link>
              </li>
            ))}
          </ol>
        </div>
      ) : null}

      <p className="mt-10 text-center text-xs text-muted-foreground">
        Looking for older releases or other formats? Visit the{" "}
        <a
          href={`https://github.com/${process.env.NEXUS_RELEASES_REPO ?? "jlts2010/nexus-releases"}/releases`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          GitHub Releases page
        </a>
        .
      </p>
    </section>
  );
}
