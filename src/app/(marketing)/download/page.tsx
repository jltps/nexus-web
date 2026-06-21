import Link from "next/link";
import { Download, ShieldCheck, Cpu, Monitor, Laptop } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DownloadOsHint } from "@/components/marketing/download-os-hint";
import {
  findInstallerAsset,
  findMacInstallerAssets,
  getLatestRelease,
  getRecentReleases,
  tagToVersion,
} from "@/lib/github-releases";

export const metadata: Metadata = {
  title: "Download",
  description:
    "Free Nexus download for Windows 10/11 (64-bit) and macOS 13+ (Apple Silicon). Native installers, no account.",
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

type DownloadRow = { name: string; size: number; label: string };

/** One platform's download card. Renders a row per installer (e.g. one .dmg
 *  per macOS arch), or a disabled "Coming soon" state when `rows` is empty.
 *  Fully server-rendered — works with JavaScript disabled. */
function PlatformCard({
  platform,
  icon: Icon,
  rows,
  releasedISO,
  emptyTitle,
  emptySubtitle,
  anchorId,
}: {
  platform: string;
  icon: LucideIcon;
  rows: DownloadRow[];
  releasedISO: string | null;
  emptyTitle: string;
  emptySubtitle: string;
  anchorId?: string;
}) {
  return (
    <div
      id={anchorId}
      className="scroll-mt-24 rounded-2xl border bg-card p-6 shadow-xs sm:p-8"
    >
      <div className="mb-4 flex items-center gap-2">
        <Icon className="size-5 text-primary" />
        <h2 className="text-base font-semibold">{platform}</h2>
      </div>
      {rows.length > 0 ? (
        <ul className="space-y-4">
          {rows.map((row) => (
            <li
              key={row.name}
              className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="text-sm font-semibold">{row.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {bytesToMB(row.size)} · {row.label} · Released{" "}
                  {formatDate(releasedISO)}
                </p>
              </div>
              <Button asChild size="lg">
                {/* Always link through /api/updates/<name>. For a private
                 *  releases repo the upstream URL would 404 — the proxy
                 *  handles auth server-side and 302s to a presigned,
                 *  short-lived URL. Works equally for public repos. */}
                <a
                  href={`/api/updates/${encodeURIComponent(row.name)}`}
                  rel="noopener"
                >
                  <Download className="mr-2 size-4" />
                  Download
                </a>
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold">{emptyTitle}</p>
            <p className="mt-1 text-sm text-muted-foreground">{emptySubtitle}</p>
          </div>
          <Button disabled size="lg">
            <Download className="mr-2 size-4" />
            Coming soon
          </Button>
        </div>
      )}
    </div>
  );
}

export default async function DownloadPage() {
  const [latest, recent] = await Promise.all([
    getLatestRelease(),
    getRecentReleases(5),
  ]);

  const installer = latest ? findInstallerAsset(latest) : null;
  const macInstallers = latest ? findMacInstallerAssets(latest) : [];
  const version = latest ? tagToVersion(latest.tag_name) : null;
  const releasedISO = latest?.published_at ?? null;

  const windowsRows: DownloadRow[] = installer
    ? [{ name: installer.name, size: installer.size, label: "Windows 10/11 · 64-bit" }]
    : [];
  const macRows: DownloadRow[] = macInstallers.map((m) => ({
    name: m.asset.name,
    size: m.asset.size,
    label: m.archLabel,
  }));

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <div className="text-center">
        <Badge variant="muted" className="mb-4 rounded-full px-3 py-1">
          {version ? `Latest release · v${version}` : "Coming soon"}
        </Badge>
        <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
          Download Nexus
        </h1>
        <p className="mt-4 text-muted-foreground">
          {version
            ? "Free. Native installers for Windows and macOS. No account, no signup, no bots."
            : "The first stable build is on the way. Check back soon."}
        </p>
        <DownloadOsHint
          hasWindows={windowsRows.length > 0}
          hasMac={macRows.length > 0}
        />
      </div>

      <div className="mt-10 space-y-4">
        <PlatformCard
          platform="Windows"
          icon={Monitor}
          rows={windowsRows}
          releasedISO={releasedISO}
          emptyTitle="Nexus-Setup.exe"
          emptySubtitle="Native NSIS installer · Windows 10/11 (64-bit)"
          anchorId="windows"
        />
        <PlatformCard
          platform="macOS"
          icon={Laptop}
          rows={macRows}
          releasedISO={releasedISO}
          emptyTitle="Nexus.dmg"
          emptySubtitle="Apple Silicon · macOS 13 Ventura or later"
          anchorId="macos"
        />
        <p className="px-1 text-xs text-muted-foreground">
          The macOS build isn&rsquo;t notarized yet. On first launch, right-click
          Nexus and choose Open (see{" "}
          <Link href="/docs/getting-started" className="text-primary hover:underline">
            Getting started
          </Link>
          ).
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border bg-card p-5">
          <Cpu className="mb-2 size-4 text-primary" />
          <h3 className="text-sm font-semibold">System requirements</h3>
          <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
            <li className="font-medium text-foreground">Windows</li>
            <li>· Windows 10 or 11, 64-bit</li>
            <li className="mt-2 font-medium text-foreground">macOS</li>
            <li>· macOS 13 Ventura or later, Apple Silicon (M1–M4)</li>
            <li className="mt-2 font-medium text-foreground">Both</li>
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
            <li>· Keys stored via OS keychain (Windows DPAPI / macOS Keychain)</li>
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
