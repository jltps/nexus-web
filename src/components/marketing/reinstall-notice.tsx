import { RefreshCw } from "lucide-react";

/**
 * One-time migration notice (2026-06). The app's auto-update host moved to a
 * dedicated public releases repo; installs older than 0.9.1 are pinned to the
 * previous (now-private) feed and will NOT show an in-app update prompt, so they
 * must re-download once. After installing 0.9.1+, auto-update resumes on its own.
 * Safe to remove once older installs have aged out.
 */
export function ReinstallNotice() {
  return (
    <div className="mx-auto mt-8 max-w-2xl rounded-xl border border-primary/30 bg-primary/5 p-4 text-left">
      <div className="flex gap-3">
        <RefreshCw className="mt-0.5 size-4 shrink-0 text-primary" />
        <div>
          <p className="text-sm font-semibold">Already running an older Nexus?</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Versions before{" "}
            <span className="font-medium text-foreground">0.9.1</span> won&rsquo;t
            prompt you to update. Download and run the latest installer once &mdash;
            your meetings, notes, and settings are kept &mdash; and Nexus will keep
            itself updated automatically from then on.
          </p>
        </div>
      </div>
    </div>
  );
}
