import { ShieldCheck, MicOff, KeyRound, WifiOff } from "lucide-react";

const items = [
  {
    icon: MicOff,
    title: "No bot joins the call",
    body: "Nexus listens to your machine's audio at the OS level. Nothing announces itself in the meeting. Works on every platform that makes sound.",
  },
  {
    icon: ShieldCheck,
    title: "No audio is ever stored",
    body: "Audio is captured, streamed for transcription, and dropped. Only the transcript text and your notes are persisted — and they stay on your device.",
  },
  {
    icon: KeyRound,
    title: "Bring your own keys",
    body: "Anthropic, Deepgram, or an OpenAI-compatible provider — your choice. Keys are encrypted with Windows DPAPI and never leave the main process.",
  },
  {
    icon: WifiOff,
    title: "Offline option built in",
    body: "Prefer fully local? Switch to on-device Whisper transcription. No cloud calls, no usage cost, no API key required.",
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
