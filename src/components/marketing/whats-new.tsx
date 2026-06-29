import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { getLatestRelease } from "@/lib/github-releases";
import {
  curatedRelease,
  englishBody,
  englishTitle,
  extractHighlight,
  FALLBACK_HIGHLIGHT,
} from "@/lib/release-content";

/** Slim announcement band. Reads the latest release and shows its English
 *  headline (the text after the em-dash in a `vX.Y.Z — <headline>` title),
 *  falling back to a static string if there is no release, no headline, or the
 *  fetch fails — so it can never break the homepage render. Server-rendered via
 *  the same 5-min ISR fetch the download/changelog pages use; works with
 *  JavaScript disabled. See docs/adr/0005-automatic-release-surfacing.md. */
async function resolveHighlight(): Promise<string> {
  try {
    const latest = await getLatestRelease();
    if (!latest) return FALLBACK_HIGHLIGHT;
    // A curated entry's title IS the headline — use it verbatim when we have
    // one (curated wins; see curatedRelease / CLAUDE.md §6).
    const curated = curatedRelease(latest.tag_name);
    if (curated) return curated.title;
    // Otherwise prefer the headline in the release title (`vX.Y.Z — <headline>`).
    // If the title is just a bare version, fall back to the first heading line
    // of the body (releases whose notes open with their own `## … — <headline>`).
    const fromTitle = extractHighlight(englishTitle(latest.tag_name, latest.name));
    if (fromTitle) return fromTitle;
    const firstLine = englishBody(latest.tag_name, latest.body)
      .split(/\r?\n/)
      .map((l) => l.trim())
      .find(Boolean);
    const fromBody = firstLine
      ? extractHighlight(firstLine.replace(/^#+\s*/, ""))
      : null;
    return fromBody ?? FALLBACK_HIGHLIGHT;
  } catch {
    return FALLBACK_HIGHLIGHT;
  }
}

export async function WhatsNew() {
  const highlight = await resolveHighlight();
  return (
    <div className="mx-auto max-w-5xl px-4 pt-8 sm:px-6">
      <Link
        href="/changelog"
        className="group flex flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-full border bg-card px-4 py-1.5 text-center text-sm shadow-xs transition-colors hover:border-primary/40"
      >
        <Sparkles className="size-3.5 text-primary" />
        <span className="font-medium">New in Nexus</span>
        <span className="text-muted-foreground">{highlight}</span>
        <ArrowRight className="size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}
