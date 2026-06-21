import { MicOff, AudioLines, Sparkles, WifiOff } from "lucide-react";

const items = [
  {
    icon: MicOff,
    title: "No bot joins the call",
    body: "Nexus listens to your machine's audio at the OS level. Nothing announces itself in the meeting, so it works with Zoom, Teams, Meet, Slack huddles, and plain VoIP alike.",
  },
  {
    icon: AudioLines,
    title: "Pick your transcription engine",
    body: "Gladia (recommended) for live transcription plus post-call insights, Deepgram for fast diarized cloud, or Whisper fully offline. Bring your own key, or run local for free.",
  },
  {
    icon: Sparkles,
    title: "Claude structures your notes",
    body: "Your rough notes become key points, decisions, and action items, each linked to the transcript. Claude expands what you wrote and never overwrites it.",
  },
  {
    icon: WifiOff,
    title: "Offline and on-device",
    body: "Run Whisper locally and separate speakers with an on-device voice model. No cloud calls, no per-minute cost, no API key, and audio never leaves your machine.",
  },
];

export function Differentiators() {
  return (
    <section className="border-y border-border/60 bg-muted/30 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="sr-only">Why Nexus is different</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="rounded-lg border bg-card p-5 shadow-xs"
            >
              <div className="mb-3 inline-flex size-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                <Icon className="size-4" />
              </div>
              <h3 className="text-sm font-semibold">{title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
