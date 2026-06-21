import { BarChart3, Tag, Smile } from "lucide-react";

/** Speaking-time rows use the app's real label scheme (Me / Speaker N); the
 *  bar widths are illustrative. All token-colored, no fake transcript text. */
const speakers = [
  { label: "Me", width: "58%", tone: "bg-primary/50" },
  { label: "Speaker 1", width: "27%", tone: "bg-info/50" },
  { label: "Speaker 2", width: "15%", tone: "bg-muted-foreground/40" },
];

export function InsightsShowcase() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold text-primary">
              Post-call insights
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              When the call ends, the meeting explains itself.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Choose Gladia for transcription and Nexus runs an insights pass
              once you stop: who spoke and for how long, the entities that came
              up, and how the conversation felt. It works from the transcript,
              after the meeting. Audio is still never written to disk.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <BarChart3 className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>
                  Speaker diarization and a speaking-time split per person.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Tag className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>
                  Named entities pulled from the discussion, tagged inline.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Smile className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>
                  Sentiment and emotion across each speaker turn.
                </span>
              </li>
            </ul>
            <p className="mt-6 text-xs text-muted-foreground">
              Gladia only. Deepgram and offline Whisper skip the insights pass.
            </p>
          </div>

          {/* Illustrative dashboard — token-colored placeholders, no real data */}
          <div
            aria-hidden="true"
            className="rounded-xl border bg-card p-5 shadow-md sm:p-6"
          >
            <div className="mb-3 text-xs font-semibold text-muted-foreground">
              Speaking time
            </div>
            <div className="space-y-2.5">
              {speakers.map((s) => (
                <div key={s.label} className="flex items-center gap-3">
                  <span className="w-20 shrink-0 text-xs text-muted-foreground">
                    {s.label}
                  </span>
                  <span className="h-2.5 flex-1 overflow-hidden rounded-full bg-muted">
                    <span
                      className={`block h-full rounded-full ${s.tone}`}
                      style={{ width: s.width }}
                    />
                  </span>
                  <span className="w-9 shrink-0 text-right text-xs tabular-nums text-muted-foreground">
                    {s.width}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div>
                <div className="mb-2 text-xs font-semibold text-muted-foreground">
                  Sentiment
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {["Positive", "Neutral", "Mixed"].map((s) => (
                    <span
                      key={s}
                      className="rounded-full border bg-muted/60 px-2 py-0.5 text-xs text-muted-foreground"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <div className="mb-2 text-xs font-semibold text-muted-foreground">
                  Top entities
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <span className="h-5 w-14 rounded-full bg-primary/15" />
                  <span className="h-5 w-10 rounded-full bg-primary/15" />
                  <span className="h-5 w-16 rounded-full bg-primary/15" />
                  <span className="h-5 w-12 rounded-full bg-primary/15" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
