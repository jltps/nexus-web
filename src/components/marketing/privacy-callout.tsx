import Link from "next/link";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

const invariants: { title: string; body: string }[] = [
  {
    title: "No audio is ever written to disk",
    body: "Frames live in memory only long enough to be transcribed, then dropped. There is no audio file, no recording, no save path.",
  },
  {
    title: "API keys never reach the renderer",
    body: "Keys are encrypted with the OS keychain (Windows DPAPI / macOS Keychain) and only used inside the main process. They are never logged, never sent to any analytics, never exposed to web code.",
  },
  {
    title: "No bot, no meeting-platform integration",
    body: "Nexus does not join your call. It listens to OS audio, so it works with any conferencing tool and never announces itself.",
  },
  {
    title: "Your notes are sacred",
    body: "AI enhancement expands your notes — never deletes or silently rewrites them. Anything you edit becomes yours.",
  },
  {
    title: "The renderer is sandboxed",
    body: "Strict contextIsolation, no Node APIs in the UI layer, and all privileged work crosses a typed IPC bridge. The UI can't leak what it can't reach.",
  },
];

export function PrivacyCallout() {
  return (
    <section className="border-y border-border/60 bg-muted/20 py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <div className="mb-4 inline-flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Lock className="size-5" />
          </div>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Five privacy promises, baked into the code.
          </h2>
          <p className="mt-4 text-muted-foreground">
            These aren't marketing claims — they're invariants the codebase
            enforces. Break one and the build breaks too.
          </p>
        </div>
        <ol className="grid gap-4 sm:grid-cols-2">
          {invariants.map(({ title, body }, i) => (
            <li
              key={title}
              className="rounded-lg border bg-card p-5 shadow-xs"
            >
              <div className="mb-2 inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-primary/10 px-1.5 text-xs font-semibold text-primary">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="text-sm font-semibold">{title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8 text-center">
          <Button asChild variant="outline">
            <Link href="/privacy">Read the full privacy policy</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
