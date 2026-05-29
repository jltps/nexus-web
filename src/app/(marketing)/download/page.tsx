import Link from "next/link";
import { Download, ShieldCheck, Cpu } from "lucide-react";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  findInstallerAsset,
  getLatestRelease,
  getRecentReleases,
  tagToVersion,
} from "@/lib/github-releases";

export const metadata: Metadata = {
  title: "Download for Windows",
  description:
    "Free Nexus installer for Windows 10/11 (64-bit). Native NSIS installer, signed by tag.",
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

export default async function DownloadPage() {
  const [latest, recent] = await Promise.all([
    getLatestRelease(),
    getRecentReleases(5),
  ]);

  if (!latest) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <div className="text-center">
          <Badge variant="muted" className="mb-4 rounded-full px-3 py-1">
            Coming soon
          </Badge>
          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            Download Nexus for Windows
          </h1>
          <p className="mt-4 text-muted-foreground">
            The first stable build is on the way. Check back soon.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border bg-card p-6 shadow-xs sm:p-8">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-base font-semibold">Nexus-Setup.exe</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Native NSIS installer · Windows 10/11 (64-bit)
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button disabled size="lg">
                <Download className="mr-2 size-4" />
                Coming soon
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border bg-card p-5">
            <Cpu className="mb-2 size-4 text-primary" />
            <h3 className="text-sm font-semibold">System requirements</h3>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              <li>· Windows 10 or 11, 64-bit</li>
              <li>· 500 MB free space</li>
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
      </section>
    );
  }

  const installer = findInstallerAsset(latest);
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
                {/* Always link through /api/updates/<name>. For a private
                 *  releases repo, the upstream URL would 404 — the proxy
                 *  handles auth server-side and 302s to a presigned
                 *  short-lived URL. Works equally for public repos. */}
                <a
                  href={`/api/updates/${encodeURIComponent(installer.name)}`}
                  rel="noopener"
                >
                  <Download className="mr-2 size-4" />
                  Download
                </a>
              </Button>
            ) : (
              <Button disabled size="lg">
                No installer in this release
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border bg-card p-5">
          <Cpu className="mb-2 size-4 text-primary" />
          <h3 className="text-sm font-semibold">System requirements</h3>
          <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
            <li>· Windows 10 or 11, 64-bit</li>
            <li>· 500 MB free space</li>
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
                  href={`/changelog#v${tagToVersion(r.tag_name)}`}
                  className="text-sm text-primary hover:underline"
                >
                  Notes →
                </Link>
              </li>
            ))}
          </ol>
        </div>
      ) : null}
    </section>
  );
}
