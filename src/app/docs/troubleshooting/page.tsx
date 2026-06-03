import type { Metadata } from "next";
import { Prose } from "@/components/docs/prose";

export const metadata: Metadata = {
  title: "Troubleshooting",
  description:
    "Fixes for the most common issues: no system audio captured, transcription quality, calendar reconnects, log locations.",
};

export default function Page() {
  return (
    <Prose>
      <h1>Troubleshooting</h1>

      <h2>No system audio is being captured</h2>
      <ul>
        <li>
          Check that something is actually playing. Nexus only captures audio
          that&rsquo;s being routed through your default playback device.
        </li>
        <li>
          If you use a virtual cable or a routing app (VoiceMeeter, Loopback,
          etc.), make sure Nexus is reading from the same device the calls
          play out of.
        </li>
        <li>
          Restart Nexus after changing the default playback device — the OS
          loopback handles tie to whatever was current at launch.
        </li>
      </ul>

      <h2>The mic indicator stays on after stopping</h2>
      <p>
        This is a bug — please report it. As a workaround, fully quit and
        relaunch Nexus. The stop path closes the AudioContext and every
        MediaStreamTrack; if you ever see the OS mic light remain on after
        Stop, treat it as critical.
      </p>

      <h2>Transcription quality is poor</h2>
      <ul>
        <li>
          Check the speaker volume — Nexus picks up exactly what your
          computer is playing. Very low volumes degrade transcription.
        </li>
        <li>
          For multi-person Deepgram calls, make sure diarization is on
          (Settings → Transcription).
        </li>
        <li>
          If many remote speakers are merging into one, run a short test call
          with a different microphone arrangement — the mic-energy heuristic
          works best with a clear separation between &ldquo;Me&rdquo; and
          the speakers.
        </li>
      </ul>

      <h2>Enhancement returns plain Markdown instead of structured notes</h2>
      <p>
        That&rsquo;s the graceful fallback when the LLM emits invalid JSON.
        Nexus retries once, then drops to plain Markdown and marks the
        result as degraded. Re-enhancing usually succeeds on the next try.
        If it keeps failing, your provider may be down or rate-limited.
      </p>

      <h2>Calendar disconnected unexpectedly</h2>
      <p>
        OAuth refresh tokens can be revoked by the provider. Open{" "}
        <em>Settings → Calendar</em> and reconnect. Nexus will fetch a fresh
        token and resume.
      </p>

      <h2>Where are the logs?</h2>
      <p>
        Logs live in <code>%APPDATA%/com.scribe.app/logs/</code> on Windows, or{" "}
        <code>~/Library/Logs/Nexus/</code> on macOS. They are scrubbed of audio
        bytes and API keys before write. You can share them when filing a bug —
        they&rsquo;re plain text.
      </p>

      <h2>Where is my data stored?</h2>
      <p>
        SQLite database at{" "}
        <code>%APPDATA%/com.scribe.app/scribe.sqlite</code> on Windows, or{" "}
        <code>~/Library/Application Support/com.scribe.app/scribe.sqlite</code>{" "}
        on macOS. (The legacy &ldquo;scribe&rdquo; name is kept on purpose so
        existing user data is not orphaned.) Encrypted secrets are stored
        separately via the OS keychain (Windows DPAPI / macOS Keychain); they
        never appear in the SQLite file.
      </p>

      <h2>Still stuck?</h2>
      <p>
        Email <a href="mailto:jlts2010@gmail.com">jlts2010@gmail.com</a> with
        your Nexus version (Settings → About), the log excerpt, and the steps
        to reproduce.
      </p>
    </Prose>
  );
}
