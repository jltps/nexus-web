import type { Metadata } from "next";
import { Prose } from "@/components/docs/prose";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "Nexus's five non-negotiable privacy invariants, in plain English.",
};

const invariants: { num: string; rule: string; explainer: React.ReactNode }[] = [
  {
    num: "01",
    rule: "No audio is ever written to disk.",
    explainer: (
      <p>
        Audio frames live in memory only long enough to be transcribed, then
        are dropped. There is no audio file, no full-session buffer, no temp
        .wav, no save path. There is no audio table in the database. The
        codebase has no &ldquo;save audio&rdquo; feature, hidden or otherwise.
        Breaking this would break the build.
      </p>
    ),
  },
  {
    num: "02",
    rule: "API keys never reach the renderer in plaintext and never get logged.",
    explainer: (
      <p>
        Keys are encrypted with Windows DPAPI via Electron&rsquo;s{" "}
        <code>safeStorage</code>. Anthropic and Deepgram calls happen inside
        the main process; the UI (the &ldquo;renderer&rdquo; in Electron
        terms) never sees a key. The logger explicitly strips any key-shaped
        token. No analytics or telemetry endpoint ever sees them.
      </p>
    ),
  },
  {
    num: "03",
    rule: "No bot, no meeting-platform integration.",
    explainer: (
      <p>
        Nexus does not join your meeting. It only listens to your operating
        system&rsquo;s audio — what your speakers are playing and what your
        microphone is hearing. So it works with any conferencing tool
        (Zoom, Teams, Meet, Slack huddles, plain VoIP) and is never
        visible to the other participants.
      </p>
    ),
  },
  {
    num: "04",
    rule: "The user's notes are sacred.",
    explainer: (
      <p>
        AI enhancement <em>expands</em> your notes — adding structured key
        points, decisions, action items — but it never deletes or silently
        rewrites your text. Any AI text you edit becomes user-owned and is
        visually distinct from the rest.
      </p>
    ),
  },
  {
    num: "05",
    rule: "The renderer is sandboxed.",
    explainer: (
      <p>
        Strict <code>contextIsolation</code>, <code>nodeIntegration: false</code>
        , and (where feasible) <code>sandbox: true</code>. The UI cannot reach
        the filesystem, the network, or your API keys directly. Everything
        crosses a typed IPC bridge that validates every message.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Prose>
        <h1>Privacy</h1>
        <p>
          Nexus is built around five non-negotiable rules. They&rsquo;re not
          marketing claims — they&rsquo;re invariants enforced by the
          codebase. If a feature would violate one, it doesn&rsquo;t ship.
        </p>
        {invariants.map((i) => (
          <section key={i.num} className="rounded-lg border bg-card p-5">
            <div className="mb-2 flex items-center gap-3">
              <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-full bg-primary/10 px-2 text-xs font-semibold text-primary">
                {i.num}
              </span>
              <h2 className="!mt-0 text-base">{i.rule}</h2>
            </div>
            {i.explainer}
          </section>
        ))}

        <h2>What we collect on this website</h2>
        <p>
          Nothing identifiable. This site ships zero third-party JavaScript.
          We do not use Google Analytics, Plausible-with-script, Mixpanel,
          Segment, or any chat widget. We don&rsquo;t set tracking cookies,
          so we don&rsquo;t need a cookie banner.
        </p>
        <p>
          The one network call you may notice is from our server to a
          third-party release host, to fetch the latest Nexus installer for
          the download page. Your browser does not contact that host directly.
        </p>

        <h2>What happens if cloud features ship later</h2>
        <p>
          Phase 2 will introduce opt-in sync, backup, and read-only sharing
          (see the <a href="/roadmap">roadmap</a>). All of these will be
          off by default. None of them will change the invariants above. In
          particular, audio will still never leave your device beyond the
          transcription call you already make, and API keys will still never
          sync.
        </p>

        <h2>Contact</h2>
        <p>
          Security or privacy concerns:{" "}
          <a href="mailto:jlts2010@gmail.com">jlts2010@gmail.com</a>. See{" "}
          <a href="/.well-known/security.txt">/.well-known/security.txt</a>{" "}
          for the canonical contact and disclosure timeline.
        </p>
      </Prose>
    </section>
  );
}
