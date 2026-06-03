import Link from "next/link";
import type { Metadata } from "next";
import { Prose } from "@/components/docs/prose";

export const metadata: Metadata = {
  title: "Getting started",
  description:
    "Install Nexus, capture your first meeting, and let the AI structure your notes — in under five minutes.",
};

export default function Page() {
  return (
    <Prose>
      <h1>Getting started</h1>
      <p>
        Nexus is a desktop app for Windows and macOS. You'll be capturing your
        first meeting in under five minutes.
      </p>

      <h2>1. Install</h2>
      <ol>
        <li>
          Go to the <Link href="/download">Download</Link> page and pick the
          build for your OS — <em>.exe</em> for Windows, <em>.dmg</em> for macOS
          (Apple Silicon).
        </li>
        <li>
          Run the installer. On Windows, SmartScreen may warn the first time —
          click <em>More info → Run anyway</em>. On macOS, drag Nexus to
          Applications; if Gatekeeper blocks it, right-click the app and choose{" "}
          <em>Open</em>. Verify the SHA-512 on the download page if you want to
          be thorough.
        </li>
        <li>Launch Nexus from the Start menu or your Applications folder.</li>
      </ol>

      <h2>2. Pick your transcription path</h2>
      <p>
        Nexus supports two transcription engines. You can switch at any time
        in <em>Settings → Transcription</em>.
      </p>
      <ul>
        <li>
          <strong>Deepgram (cloud)</strong> — fastest, multi-speaker
          diarization, multilingual. Requires a Deepgram API key.
        </li>
        <li>
          <strong>Whisper (offline)</strong> — runs entirely on your machine.
          Slower, no diarization, but zero cloud calls and zero cost.
        </li>
      </ul>
      <p>
        New here? Start with Whisper to get a feel for things without any keys.
        See <Link href="/docs/offline-whisper">Offline Whisper</Link> for the
        details, or <Link href="/docs/api-keys">API keys</Link> if you want
        Deepgram.
      </p>

      <h2>3. Add an AI provider (optional)</h2>
      <p>
        AI enhancement, titles, and chat go through a separate provider. The
        defaults are tuned for Anthropic Claude, but you can use any
        OpenAI-compatible endpoint. Open <em>Settings → AI</em> and paste a
        key.
      </p>

      <h2>4. Capture a meeting</h2>
      <ol>
        <li>
          Click the big <strong>Record</strong> button. Nexus starts listening
          to your microphone and your computer's audio (whatever's playing,
          whichever app it comes from).
        </li>
        <li>
          Type your notes on the right. They're saved continuously.
        </li>
        <li>
          When the meeting ends, click <strong>Stop</strong>. Nexus
          enhances your notes — structured key points, decisions, action items
          — each one linked back to the transcript moment it came from.
        </li>
      </ol>

      <h2>5. (Optional) Connect your calendar</h2>
      <p>
        Open <em>Settings → Calendar</em> and connect Google or Microsoft.
        Nexus will offer to auto-start recording when a scheduled meeting
        begins. Calendar access is read-only; Nexus never modifies your
        events.
      </p>

      <h2>What now?</h2>
      <ul>
        <li>
          Learn about <Link href="/docs/templates">templates</Link> — to
          shape the enhancement output (stand-up, interview, sales call, …).
        </li>
        <li>
          Use <Link href="/docs/chat">meeting chat</Link> to ask questions
          about what was said.
        </li>
        <li>
          Organize with <Link href="/docs/folders-tags">folders & tags</Link>.
        </li>
      </ul>
    </Prose>
  );
}
