import type { Metadata } from "next";
import {
  CheckCircle2,
  Circle,
  CircleDashed,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Roadmap",
  description:
    "What's shipped, what's next, and what's later. A snapshot of where Nexus is going.",
};

interface Item {
  title: string;
  body: string;
}
const now: Item[] = [
  {
    title: "Diarization + 'Me' attribution",
    body: "Multiple remote speakers are now split into separate labeled streams. Your voice is auto-identified using a mic-energy heuristic.",
  },
  {
    title: "Mono transcription mode",
    body: "Default capture is a single mono channel — roughly halves Deepgram's per-channel bill with no quality loss for most calls.",
  },
  {
    title: "Templates with 'Optimize with AI'",
    body: "Built-in and custom templates fill a guidance slot inside the always-on enhancement scaffold.",
  },
  {
    title: "Cross-meeting chat",
    body: "Query across many meetings, scoped by folder or tag. Answers cite the transcript moments they come from.",
  },
  {
    title: "OpenAI-compatible provider",
    body: "Use OpenAI, OpenRouter, Ollama, vLLM, LiteLLM — anything that speaks the OpenAI API. Anthropic stays default and recommended.",
  },
  {
    title: "Marketing site + docs (this!)",
    body: "Phase 1 of the web property: landing, download, full user guide, privacy, and a live /api/updates/latest feed for the app.",
  },
  {
    title: "macOS (Apple Silicon)",
    body: "Native build for Apple Silicon Macs (M1–M4), with loopback audio capture working on macOS. Grab the .dmg on the download page.",
  },
];

const next: Item[] = [
  {
    title: "Auto-update in the app",
    body: "Wiring electron-updater against the live /api/updates/latest endpoint. One-click upgrade from inside Nexus.",
  },
  {
    title: "Accounts & opt-in cloud sync",
    body: "Email magic-link or Google/Microsoft OAuth. Last-write-wins sync of meetings, notes, transcripts, templates, folders, tags. Audio stays out. Keys stay out. Local-first stays default.",
  },
  {
    title: "Read-only sharing",
    body: "Share a meeting with a teammate by email or anonymous link. Commenting and co-editing come after.",
  },
  {
    title: "Backup / restore via cloud",
    body: "Bundle export now exists locally. Phase 2 adds an opt-in cloud backup for the same bundle shape.",
  },
];

const later: Item[] = [
  {
    title: "Collaborative meetings",
    body: "Two or more people contributing notes to the same meeting in real time. Builds on accounts + sync.",
  },
  {
    title: "Intel Mac build",
    body: "Today's macOS build is Apple Silicon only. An Intel (x64) build may follow if there's demand.",
  },
  {
    title: "Mobile companion",
    body: "Read-only on phones first — review notes, ask questions across meetings, see upcoming agenda.",
  },
  {
    title: "Transcript quality eval loop",
    body: "Continuous regression harness for diarization + multilingual transcription.",
  },
];

function Column({
  heading,
  items,
  Icon,
  tone,
}: {
  heading: string;
  items: Item[];
  Icon: typeof CheckCircle2;
  tone: "done" | "next" | "later";
}) {
  const ring =
    tone === "done"
      ? "text-primary"
      : tone === "next"
        ? "text-info"
        : "text-muted-foreground";
  return (
    <div>
      <h2 className="mb-4 flex items-center gap-2 text-base font-semibold">
        <Icon className={`size-4 ${ring}`} />
        {heading}
      </h2>
      <ul className="space-y-3">
        {items.map((it) => (
          <li key={it.title} className="rounded-lg border bg-card p-4 shadow-xs">
            <p className="text-sm font-medium">{it.title}</p>
            <p className="mt-1 text-sm text-muted-foreground">{it.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function RoadmapPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <header className="mx-auto mb-12 max-w-2xl text-center">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Roadmap
        </h1>
        <p className="mt-3 text-muted-foreground">
          Snapshot of where Nexus is. Things move; check{" "}
          <a href="/changelog" className="underline">
            the changelog
          </a>{" "}
          for what just shipped.
        </p>
      </header>
      <div className="grid gap-8 md:grid-cols-3">
        <Column heading="Now (shipped)" items={now} Icon={CheckCircle2} tone="done" />
        <Column heading="Next" items={next} Icon={Circle} tone="next" />
        <Column heading="Later" items={later} Icon={CircleDashed} tone="later" />
      </div>
    </section>
  );
}
