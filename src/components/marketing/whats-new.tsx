import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

/** Slim, static announcement band. Curated copy that tracks the current app,
 *  with no network dependency, so it can never fail the homepage render and
 *  never desyncs a live version number from the curated highlight. Fully
 *  static markup, works with JavaScript disabled. Update the highlight when a
 *  release ships a new headline feature. */
export function WhatsNew() {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-8 sm:px-6">
      <Link
        href="/changelog"
        className="group flex flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-full border bg-card px-4 py-1.5 text-center text-sm shadow-xs transition-colors hover:border-primary/40"
      >
        <Sparkles className="size-3.5 text-primary" />
        <span className="font-medium">New in Nexus</span>
        <span className="text-muted-foreground">
          Gladia transcription and post-call insights
        </span>
        <ArrowRight className="size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}
