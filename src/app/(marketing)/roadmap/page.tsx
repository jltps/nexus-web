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
    title: "Gladia transcription + post-call insights",
    body: "Live cloud transcription with a post-call pass for speaker diarization, named entities, and sentiment. Gladia is now the recommended provider.",
  },
  {
    title: "Speaker separation everywhere",
    body: "Deepgram diarizes remote speakers directly; Gladia and Whisper get an on-device voice model that runs in memory. Your voice ('Me') is recovered from a mic-energy signal.",
  },
  {
    title: "Per-meeting language",
    body: "Pick a meeting's language up front for sharper accuracy, or leave it on auto-detect. The enhanced notes follow that language.",
  },
  {
    title: "In-app auto-update",
    body: "Nexus checks GitHub on launch and every six hours, downloads in the background, and never interrupts a recording.",
  },
  {
    title: "Mono transcription mode",
    body: "Default capture is a single mono channel, which roughly halves Deepgram's per-channel bill with no quality loss for most calls.",
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
    title: "OpenAI-compatible AI provider",
    body: "Use OpenAI, OpenRouter, Ollama, vLLM, or LiteLLM for the AI layer. Anthropic stays the default and recommended.",
  },
  {
    title: "macOS (Apple Silicon)",
    body: "Native build for Apple Silicon Macs (M1–M4), with loopback audio capture working on macOS. Grab the .dmg on the download page.",
  },
  {
    title: "Marketing site + docs (this!)",
    body: "Phase 1 of the web property: landing, download, full user guide, privacy, and a live /api/updates/latest feed for the app.",
  },
];

const next: Item[] = [
  {
    title: "Accounts & opt-in cloud sync",
    body: "Email magic-link or Google/Microsoft OAuth. Last-write-wins sync of meetings, notes, transcripts, templates, folders, and tags. Audio stays out. Keys stay out. Local-first stays default.",
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
    body: "Two or more people contributing notes to the same meeting in real time. Builds on accounts and sync.",
  },
  {
    title: "Intel Mac build",
    body: "Today's macOS build is Apple Silicon only. An Intel (x64) build may follow if there's demand.",
  },
  {
    title: "Mobile companion",
    body: "Read-only on phones first: review notes, ask questions across meetings, and see the upcoming agenda.",
  },
  {
    title: "Transcript quality eval loop",
    body: "Continuous regression harness for diarization and multilingual transcription.",
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
