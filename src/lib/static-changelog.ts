/**
 * Curated release history for the changelog page.
 *
 * The public release host (jltps/nexus-releases) intentionally carries only
 * recent builds, so the changelog renders the live feed and then appends these
 * entries for every earlier version the feed doesn't include (deduped by
 * version, live wins — see app/(marketing)/changelog/page.tsx). This keeps the
 * full history on the site without bloating the release repo.
 *
 * Notes mirror what shipped in the desktop app. Keep newest-first; the page
 * sorts by `date`, so use a full ISO timestamp where same-day ordering matters.
 */

export type StaticRelease = {
  tag: string;
  date: string;
  title: string;
  body: string;
};

export const STATIC_CHANGELOG: StaticRelease[] = [
  {
    tag: "v0.13.1",
    date: "2026-06-28T23:59:40Z",
    title: "CAM++ model UI & embedder selector",
    body: [
      "- **CAM++ model manager.** Download, delete, and monitor the lighter CAM++ speaker-embedding model (~27 MB) alongside ERes2NetV2, directly from Transcription settings.",
      "- **Embedder model toggle.** Choose between ERes2NetV2 (default, ~71 MB, more accurate) and CAM++ (light, ~27 MB, faster inference) with a ToggleGroup.",
      "- **Persistent setting.** Your model choice is saved across sessions and loaded on the next recording.",
      "- **Factory routing.** LocalDiarizer reads the setting and instantiates the correct embedder; active model is logged for diagnostics.",
    ].join("\n"),
  },
  {
    tag: "v0.13.0",
    date: "2026-06-28T22:11:15Z",
    title: "Smart diarization & Me voiceprint",
    body: [
      "- **Deferred-spawn buffer.** Short utterances (<1.5 s) from a new speaker accumulate until validated — no more permanent mislabel of first-encountered speakers.",
      "- **SNR-aware centroid weighting.** Each embedding's contribution weighted by signal-to-noise ratio; noisy windows can't pull centroids off-centre.",
      "- **Adaptive noise-floor calibration.** Silence gate calibrated from the session's first seconds of audio instead of a hardcoded threshold.",
      "- **Peak-normalized voiced-mean Me ratio.** Filters inter-syllable energy valleys by considering only frames above 30% of peak RMS.",
      "- **Me voiceprint enrollment.** ERes2NetV2 voiceprint cosine-compares against per-segment embeddings; close match halves dominance bar, poor match doubles it.",
      "- **PCM bleed subtraction.** Single-tap least-squares echo cancellation generates a bleed-suppressed PCM stream for cleaner diarization embeddings.",
      "- **95 unit tests**, all passing.",
    ].join("\n"),
  },
  {
    tag: "v0.12.0",
    date: "2026-06-28T21:06:25Z",
    title: "Diarization quality & dual-model A/B",
    body: [
      "- **Log-domain 'Me' dominance ratio.** Mic-vs-system dominance decided in log space, steadier across recording levels.",
      "- **Lagged bleed cross-correlation.** Catches speaker→mic acoustic echo that arrives a few ms late.",
      "- **ERLE-proxy echo detection.** Echo-return-loss estimate tightens or relaxes the dominance bar.",
      "- **Frame-level VAD gating.** Clean single-channel patterns settled before energy-ratio check.",
      "- **Deepgram end-of-call global re-cluster.** Threshold-free NME-SC re-cluster renumbers speakers across long calls.",
      "- **Dual CAM++/ERes2NetV2 embedder.** Selectable via Settings toggle for A/B benchmarking.",
      "- **Per-window embedding voting**, adaptive PCM ring buffer, and more.",
    ].join("\n"),
  },
  // These recent releases were published with an EMPTY GitHub body (the release
  // pipeline didn't write notes). They live here so effectiveBody() surfaces the
  // notes on the changelog until the pipeline backfills the GitHub releases
  // themselves; once a release carries its own body, that body wins. (newest first)
  {
    tag: "v0.11.3",
    date: "2026-06-24T21:32:27Z",
    title: "Embedded window controls",
    body: "- **Embedded window controls.** Window controls now live in a shared canvas header, for a cleaner, more consistent layout across views.",
  },
  {
    tag: "v0.11.2",
    date: "2026-06-24T20:26:07Z",
    title: "Title-bar window controls",
    body: "- **Title-bar window controls.** Moved the window controls (minimize / maximize / close) into a dedicated top-right title-bar strip.",
  },
  {
    tag: "v0.11.1",
    date: "2026-06-24T20:01:00Z",
    title: "Shell cleanup",
    body: "- **Shell cleanup.** Removed the top navigation bar; window controls and notes access now live in the side rail.",
  },
  {
    tag: "v0.9.1",
    date: "2026-06-21T12:26:21Z",
    title: "Reliable auto-updates",
    body: [
      "- Improves how Nexus delivers updates so future versions install automatically.",
      "- Updating from a version before 0.9.1 is a one-time manual step: download and run the latest installer once from the Download page (your meetings, notes, and settings are kept), and Nexus keeps itself updated from then on.",
    ].join("\n"),
  },
  {
    tag: "v0.9.0",
    date: "2026-06-17T15:31:38Z",
    title: "Startup resilience",
    body: [
      "- The splash screen can never trap the app on launch.",
      "- Added renderer startup diagnostics to make any launch issue easier to pin down.",
    ].join("\n"),
  },
  {
    tag: "v0.8.81",
    date: "2026-06-17T14:49:06Z",
    title: "Diarization over-segmentation fix",
    body: "- Tunes the local diarization clustering so a single speaker is no longer split into several.",
  },
  {
    tag: "v0.8.8",
    date: "2026-06-17T10:39:54Z",
    title: "Diarization packaging fix + auto-update",
    body: [
      "- **Local diarization now loads in the packaged app** (it previously ran only in development), with added logging and diagnostics.",
      "- **Install-on-quit** so an update applies cleanly when you close Nexus.",
    ].join("\n"),
  },
  {
    tag: "v0.8.7",
    date: "2026-06-16T12:47:59Z",
    title: "Decoupled diarization",
    body: "- Local speaker diarization is decoupled from the live transcript, so it no longer interferes with live captioning.",
  },
  {
    tag: "v0.8.6",
    date: "2026-06-15T16:57:25Z",
    title: "Gladia speaker diarization fix",
    body: [
      "- Gladia and Whisper now always capture **mono**, so the on-device diarization engine runs regardless of a leftover 'Best quality' setting.",
      "- Recalibrated the speaker-clustering thresholds so remote speakers split into Speaker 1 / 2 / 3 instead of collapsing into one.",
    ].join("\n"),
  },
  {
    tag: "v0.8.5",
    date: "2026-06-15T13:33:44Z",
    title: "Speaker diarization for Gladia",
    body: [
      "### Speaker separation",
      "- On-by-default, in-memory diarization engine (WavLM voice embeddings + online clustering) separates remote speakers for Gladia. It runs on the captured audio and is never written to disk.",
      "- Deepgram stays on its own diarization; 'Me' stays on the mic-energy heuristic.",
      "### Model management",
      "- Settings → Transcription gains a manager for the speaker-embedding model: pre-download it, see its state, or delete it to reclaim disk.",
    ].join("\n"),
  },
  {
    tag: "v0.8.3",
    date: "2026-06-03T11:28:59Z",
    title: "First macOS build (test)",
    body: [
      "- First macOS build (Apple Silicon), as an **unsigned** test artifact. macOS Gatekeeper blocks it until you bypass it manually (right-click, then Open).",
      "- No user-facing Windows changes since 0.8.2.",
    ].join("\n"),
  },
  {
    tag: "v0.8.2",
    date: "2026-06-03T10:16:37Z",
    title: "Gladia diarization quality + per-meeting language",
    body: [
      "- **Per-word 'Me' attribution** in mono mode, so your voice coalesces into one clean stream while remote speakers stay separated.",
      "- A **language selector** in the live-transcript panel: set the meeting's language up front (more accurate than auto-detect); it is remembered per meeting.",
    ].join("\n"),
  },
  {
    tag: "v0.8.1",
    date: "2026-05-29T14:53:33Z",
    title: "Gladia recommended + richer insights",
    body: [
      "### Transcription & onboarding",
      "- Gladia is now the recommended provider; onboarding offers a Gladia key and auto-selects it.",
      "- Settings gains a dedicated API Keys tab.",
      "### Recording",
      "- Recording into a note that already has a transcript now appends a new session instead of overwriting it.",
      "### Insights",
      "- Captures all 5 sentiments and 25 emotions, in a dashboard of speaking time, sentiment, and top entities, with timestamps that jump into the transcript.",
    ].join("\n"),
  },
  {
    tag: "v0.8.0",
    date: "2026-05-29T12:51:26Z",
    title: "Gladia live transcription + post-call insights",
    body: [
      "### What's new",
      "- New Gladia transcription provider alongside Deepgram and offline Whisper. Audio uses the same local pipeline and never touches disk.",
      "- Post-call Insights: speaker diarization, named-entity recognition, and sentiment, in a dedicated Insights view and inline in the transcript.",
      "- A continuous ~2.5h session handoff keeps long calls in one transcript; Markdown export and backup bundles carry insights.",
    ].join("\n"),
  },
  {
    tag: "v0.7.6",
    date: "2026-05-29T10:19:37Z",
    title: "Mic-priority 'Me' attribution",
    body: "- Refines 'Me' attribution with a bleed-aware, mic-priority heuristic, so your own voice stays one clean stream even when it bleeds into the system audio.",
  },
  {
    tag: "v0.7.5",
    date: "2026-05-29T09:23:23Z",
    title: "Diarization & transcript fidelity",
    body: [
      "- **Paragraph-aware transcripts.** Words carry paragraph data, and grouping merges fragmented remote speech into cleaner paragraphs.",
      "- **Filler words** are captured and shown subtly.",
      "- **Stereo capture** is available as an opt-in 'Best quality' mode.",
    ].join("\n"),
  },
  {
    tag: "v0.7.4",
    date: "2026-05-28T17:43:41Z",
    title: "UI polish",
    body: "- Refinements across the sidebar, Settings, the AI button, the About dialog, and the data-wipe flow.",
  },
  {
    tag: "v0.7.3",
    date: "2026-05-28T15:55:25Z",
    title: "Transcription quality + sturdier capture",
    body: [
      "- **Bleed-aware 'Me' attribution** for cleaner separation of your voice from remote speakers.",
      "- **Bullet-proof Windows capture** to make recording more reliable.",
    ].join("\n"),
  },
  {
    tag: "v0.7.2",
    date: "2026-05-28T15:13:14Z",
    title: "Experience tweaks",
    body: [
      "- **Tags in the sidebar** with a create-tag button.",
      "- **Splash screen** on app launch.",
      "- **Sticky note header** unifying the note-window controls.",
      "- **Cross-meeting chat** moved into the sidebar.",
      "- **Agenda rows** show the date alongside the time.",
      "- **Meeting cards** gain compact/extended density, drag-and-drop reordering, and move-to-folder.",
    ].join("\n"),
  },
  {
    tag: "v0.7.1",
    date: "2026-05-28T12:48:41Z",
    title: "Production calendar OAuth",
    body: "- **Calendar OAuth** now uses production Google and Microsoft credentials, so connecting a calendar works without any developer setup.",
  },
  {
    tag: "v0.7.0",
    date: "2026-05-28T12:19:51Z",
    title: "In-app auto-update",
    body: [
      "### New",
      "- Auto-update from GitHub Releases: Nexus checks on launch and every 6 hours, downloads in the background, and offers a one-click restart, never during a recording.",
      "- A Settings → Updates panel and an About dialog.",
      "### Changed",
      "- Windows installs are now silent and one-click, like Slack or VS Code.",
    ].join("\n"),
  },
  {
    tag: "v0.6.2",
    date: "2026-05-28T11:23:13Z",
    title: "Per-word 'Me' attribution",
    body: [
      "- 'Me' attribution now decides **per word** against the mic-vs-system energy timeline, so consecutive Me-words coalesce into one stream even when Deepgram tagged them as different speakers.",
      "- Remote speakers still split by Deepgram exactly as before. Mono finals only.",
    ].join("\n"),
  },
  {
    tag: "v0.6.1",
    date: "2026-05-28T10:10:25Z",
    title: "Auto-update plumbing",
    body: [
      "- Generic auto-update feed and `latest.yaml` manifest so installed clients can see new releases.",
      "- Release manifests are tracked in the build so the update feed serves consistent metadata.",
    ].join("\n"),
  },
  {
    tag: "v0.6.0",
    date: "2026-05-28T09:45:32Z",
    title: "Templates & AI capabilities",
    body: [
      "### Templates",
      "- Built-in JSON-contract scaffolding is always-on; `instructions` is now a guidance slot.",
      "- Reseeded the six built-in templates from the user-facing guidance.",
      "- Bigger template editor with a starter example and an 'Optimize with AI' action.",
      "### Summaries",
      "- One enhancement call returns both **key-points** and **extended** notes; the UI toggles between them.",
      "### AI cost & quality",
      "- Task-to-model routing (Haiku for cheap tasks, Sonnet for enhancement), prompt caching, and an Economy / Quality toggle.",
      "### Multi-provider",
      "- Generic OpenAI-compatible provider behind the enhancer / chat seam; Anthropic stays the default.",
    ].join("\n"),
  },
  {
    tag: "v0.5.0",
    date: "2026-05-27",
    title: "Transcription quality & cost",
    body: [
      "### Quality",
      "- Speaker diarization on Deepgram so remote speakers no longer merge into one.",
      "- Single-language meetings use the dedicated language model, with fewer foreign-word leaks.",
      "### Cost",
      "- Single-channel mono capture cuts the per-channel Deepgram bill roughly in half.",
      "- 'Me' is derived from the local mic-energy signal instead of a second billed channel.",
    ].join("\n"),
  },
  {
    tag: "v0.4.0",
    date: "2026-05-27",
    title: "UI/UX overhaul + rebrand to Nexus",
    body: [
      "### Rebrand",
      "- Renamed from Scribe to **Nexus** end-to-end.",
      "### Design system",
      "- Adopted shadcn/ui + lucide-react with a fresh component system and design tokens.",
      "- New app shell, sidebar, and window-state handling.",
      "### Organization & navigation",
      "- Note organization with folders + tags, plus a command palette for fast navigation.",
      "### Onboarding & a11y",
      "- New onboarding flow, empty states, and an accessibility pass on focus order, contrast, and keyboard reach.",
    ].join("\n"),
  },
  {
    tag: "v0.3.0",
    date: "2026-05-27",
    title: "Reliability, data, calendar, chat",
    body: [
      "### Reliability",
      "- Transcription resilience: virtual transcript, reconnection handling, and per-meeting usage & cost.",
      "### Speakers",
      "- Rename speakers, merge by same name, and reassign segments.",
      "### Data",
      "- Per-meeting export, full backup/restore, and local Whisper transcription for offline use.",
      "### Calendar",
      "- Google Calendar integration with auto-start, plus Microsoft Calendar support.",
      "### Chat",
      "- Cross-meeting chat intelligence over the meeting corpus.",
    ].join("\n"),
  },
];
