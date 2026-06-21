import Link from "next/link";
import type { Metadata } from "next";
import { Prose } from "@/components/docs/prose";

export const metadata: Metadata = {
  title: "Transcription providers",
  description:
    "Choose between Gladia (recommended), Deepgram, and offline Whisper. How speaker separation works on each, and how to switch.",
};

export default function Page() {
  return (
    <Prose>
      <h1>Transcription providers</h1>
      <p>
        Nexus transcribes with one of three engines. Switch at any time in{" "}
        <em>Settings → Transcription</em>; new meetings use the engine you pick,
        and existing transcripts are left untouched.
      </p>

      <h2>Gladia (recommended)</h2>
      <p>
        Live cloud transcription with a post-call insights pass:{" "}
        <Link href="/docs/insights">speaker diarization, named entities, and
        sentiment</Link>. Add a Gladia key in <em>Settings → API Keys</em> and
        Nexus selects it automatically. Audio streams live for transcription and
        is never written to disk.
      </p>

      <h2>Deepgram</h2>
      <p>
        A fast cloud alternative with built-in speaker diarization and strong
        multilingual support. Add a Deepgram key in{" "}
        <em>Settings → API Keys</em>, then select it in{" "}
        <em>Settings → Transcription</em>.
      </p>

      <h2>Whisper (offline)</h2>
      <p>
        Runs fully on your machine. No key, no per-minute cost, and audio never
        leaves your computer. It has no insights pass, but it still separates
        speakers with the on-device model below. See{" "}
        <Link href="/docs/offline-whisper">Offline Whisper</Link> for setup and
        trade-offs.
      </p>

      <h2>Speaker separation</h2>
      <p>
        Deepgram diarizes remote speakers itself. For Gladia and Whisper, Nexus
        runs an on-device voice model (WavLM embeddings with online clustering)
        that splits speakers entirely in memory. Only the model weights are
        cached locally; your audio is never stored. Pre-download or remove the
        model in <em>Settings → Transcription</em>. Your own voice (
        <strong>Me</strong>) is recovered from a mic-energy signal, so it stays
        one clean stream.
      </p>

      <h2>Which should I use?</h2>
      <ul>
        <li>
          <strong>Want insights and the best default:</strong> Gladia.
        </li>
        <li>
          <strong>Want fast diarized cloud without insights:</strong> Deepgram.
        </li>
        <li>
          <strong>Want zero cost and nothing leaving your machine:</strong>{" "}
          Whisper.
        </li>
      </ul>
    </Prose>
  );
}
