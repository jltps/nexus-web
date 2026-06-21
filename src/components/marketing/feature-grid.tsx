import {
  Sparkles,
  MessagesSquare,
  Calendar,
  FolderTree,
  Languages,
  BarChart3,
  Command,
  ReceiptText,
  FileText,
  Users2,
  PaletteIcon,
  PenLine,
} from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI-enhanced notes",
    body: "Claude turns your rough notes into structured key points, decisions, and action items, each one source-linked back to the transcript.",
  },
  {
    icon: PenLine,
    title: "Your notes stay sacred",
    body: "AI expands what you wrote; it never silently rewrites or deletes it. Edit AI text and it becomes yours, visually distinct from the rest.",
  },
  {
    icon: MessagesSquare,
    title: "Chat with your meetings",
    body: "Ask questions about a single meeting or across many. Answers cite the transcript so you can verify every claim.",
  },
  {
    icon: Calendar,
    title: "Calendar auto-start",
    body: "Connect Google or Microsoft Calendar (read-only). Nexus offers to start recording right when your meeting begins.",
  },
  {
    icon: Languages,
    title: "Multilingual, your way",
    body: "Auto-detect the language, or lock it per meeting for sharper accuracy. Enhanced notes are written in that language, never silently switched to English.",
  },
  {
    icon: Users2,
    title: "Speaker separation",
    body: "Diarization splits each remote speaker into a labeled stream. With Gladia or Whisper it runs on an on-device voice model; your voice (\"Me\") is auto-attributed.",
  },
  {
    icon: BarChart3,
    title: "Post-call insights",
    body: "With Gladia, every meeting gets a speaking-time split, named entities, and sentiment once you stop. Computed from the transcript; audio is never stored.",
  },
  {
    icon: FolderTree,
    title: "Organize and find",
    body: "Nested folders, free-form tags, and instant full-text search across every transcript and note. SQLite keeps it fast across thousands of meetings.",
  },
  {
    icon: FileText,
    title: "Templates that fit you",
    body: "Built-ins for stand-ups, interviews, client calls. Or write your own, with an \"Optimize with AI\" button.",
  },
  {
    icon: Command,
    title: "Command palette",
    body: "Ctrl+K opens every action. Keyboard-first by design.",
  },
  {
    icon: ReceiptText,
    title: "Cost & quality control",
    body: "Per-meeting cost readout for transcription and AI. An Economy/Quality toggle routes routine work to Haiku and the heavy lifting to Sonnet.",
  },
  {
    icon: PaletteIcon,
    title: "Light, dark, system",
    body: "Theming follows your OS. AA contrast in both modes. Reduced-motion respected. Frameless and quiet.",
  },
];

export function FeatureGrid() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Everything you need from a meeting tool,
            <br className="hidden sm:block" />
            and nothing you don't.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Calm, minimal, keyboard-driven. Built for people who live in
            meetings.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="rounded-lg border bg-card p-5 transition-colors hover:border-primary/40"
            >
              <div className="mb-3 inline-flex size-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                <Icon className="size-4" />
              </div>
              <h3 className="text-base font-semibold">{title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
