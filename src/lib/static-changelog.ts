/**
 * Static fallback for the changelog when GitHub Releases hasn't been
 * populated yet (the repo is still private / unpublished). Mirrors what
 * actually shipped in the desktop app at scribe/ — keep entries in sync
 * with scribe/package.json + the roadmap/V0x docs.
 *
 * Once the GitHub Releases feed has entries, it takes precedence and this
 * list is no longer rendered (see app/(marketing)/changelog/page.tsx).
 */

export type StaticRelease = {
  tag: string;
  date: string;
  title: string;
  body: string;
};

export const STATIC_CHANGELOG: StaticRelease[] = [
  {
    tag: "v0.6.1",
    date: "2026-05-28",
    title: "Auto-update plumbing",
    body: [
      "### Fixed",
      "- Wire the generic auto-update feed and `latest.yaml` manifest so installed clients see new releases.",
      "- Track release manifests in the build so the update feed serves consistent metadata.",
    ].join("\n"),
  },
  {
    tag: "v0.6.0",
    date: "2026-05-27",
    title: "V06 — Templates & AI capabilities",
    body: [
      "### Templates",
      "- Split the template model: built-in JSON-contract scaffolding is always-on, `instructions` is now a guidance slot.",
      "- Reseeded the six built-in templates from the user-facing guidance — no more leaking LLM mechanics text.",
      "- Bigger scrollable template editor with a starter example and canned snippet buttons.",
      "- New \"Optimize with AI\" action to rewrite a draft template's guidance.",
      "### Summaries",
      "- One enhancement call now returns both **key-points** and **extended** notes; the UI toggles between them.",
      "### AI cost & quality",
      "- Task→model routing: Haiku for cheap tasks, Sonnet for enhancement.",
      "- Prompt caching on the enhance path.",
      "- Economy / Quality toggle in Settings.",
      "- Anti-AI-tell style directive (no em-dashes, fewer stock phrases); shorter AI-generated titles.",
      "### Multi-provider",
      "- Generic OpenAI-compatible provider behind the `Enhancer` / chat seam; Anthropic stays the default.",
      "### UI polish",
      "- Removed the per-meeting cost chip from the header.",
      "- Enlarged the Settings dialog.",
    ].join("\n"),
  },
  {
    tag: "v0.5.0",
    date: "2026-05-27",
    title: "V05 — Transcription quality & cost",
    body: [
      "### Quality",
      "- Speaker diarization enabled on Deepgram so remote speakers no longer merge into one.",
      "- Single-language meetings now use the dedicated language model — fewer foreign-word leaks.",
      "### Cost",
      "- Single-channel mono capture cuts the per-channel Deepgram bill roughly in half.",
      "- \"Me\" is derived from the local mic-energy signal instead of a second billed channel.",
      "### Fixed",
      "- Nova-3 streaming no longer rejects requests that included `detect_language`.",
    ].join("\n"),
  },
  {
    tag: "v0.4.0",
    date: "2026-05-27",
    title: "V04 — UI/UX overhaul + rebrand to Nexus",
    body: [
      "### Rebrand",
      "- Renamed from Scribe to **Nexus** end-to-end.",
      "### Design system",
      "- Adopted shadcn/ui + lucide-react with a fresh component system and design tokens.",
      "- New app shell, sidebar, and window-state handling.",
      "### Organization & navigation",
      "- Note organization with folders + tags.",
      "- Command palette for fast navigation across meetings and actions.",
      "### Onboarding & a11y",
      "- New onboarding flow and empty states throughout the app.",
      "- Accessibility pass on focus order, contrast, and keyboard reachability.",
      "### Fixed",
      "- Enhancer no longer degrades the whole note on a single bad block; notes scrolling is correct again.",
    ].join("\n"),
  },
  {
    tag: "v0.3.0",
    date: "2026-05-27",
    title: "V03 — Reliability, data, calendar, chat",
    body: [
      "### Reliability",
      "- Transcription resilience: virtual transcript, reconnection handling, and per-meeting usage & cost.",
      "### Speakers",
      "- Rename speakers, merge by same name, and reassign segments.",
      "### Data",
      "- Per-meeting export and full backup/restore.",
      "- Local Whisper transcription via `@xenova/transformers` for offline use.",
      "### Calendar",
      "- Google Calendar integration with auto-start; Microsoft Calendar support.",
      "- Switched to Google `freebusy` so the app no longer needs `events.readonly`.",
      "### Chat",
      "- Cross-meeting chat intelligence over the meeting corpus.",
    ].join("\n"),
  },
];
