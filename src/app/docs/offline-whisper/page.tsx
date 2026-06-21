import Link from "next/link";
import type { Metadata } from "next";
import { Prose } from "@/components/docs/prose";

export const metadata: Metadata = {
  title: "Offline Whisper",
  description:
    "Run transcription fully on-device with Whisper. No API key, no cloud calls, zero per-minute cost.",
};

export default function Page() {
  return (
    <Prose>
      <h1>Offline Whisper</h1>
      <p>
        Whisper runs locally on your computer. Audio never leaves your
        machine. No API key, no quota, no per-minute cost, and confidential
        meetings stay confidential.
      </p>

      <h2>How to enable it</h2>
      <ol>
        <li>
          Open <em>Settings → Transcription</em>.
        </li>
        <li>
          Pick <em>Whisper (offline)</em> as the engine.
        </li>
        <li>
          On first use, Nexus downloads a small Whisper model
          (a few hundred MB). After that, transcription works completely
          offline.
        </li>
      </ol>

      <h2>What you trade off</h2>
      <ul>
        <li>
          <strong>Speed.</strong> Whisper is slower than Deepgram, especially
          on machines without a GPU. Live transcription will lag the call by
          a couple of seconds on average.
        </li>
        <li>
          <strong>Diarization.</strong> Whisper itself doesn&rsquo;t label
          speakers, but Nexus separates remote speakers with the same on-device
          voice model it uses for Gladia (it runs in memory on mono Whisper
          sessions; quality is still being tuned). Your own voice is recovered
          from the mic-energy signal, and you can rename labels after the fact.
        </li>
        <li>
          <strong>Multilingual quality.</strong> Whisper is solid in many
          languages; the cloud providers&rsquo; tuning may still be sharper for
          some accents and contexts.
        </li>
      </ul>

      <h2>When Whisper is the right choice</h2>
      <ul>
        <li>You handle sensitive content (legal, medical, internal HR).</li>
        <li>You&rsquo;re working without reliable internet.</li>
        <li>You don&rsquo;t want a per-minute bill at all.</li>
      </ul>

      <h2>Switching to a cloud engine</h2>
      <p>
        Anytime. In <em>Settings → Transcription</em>, pick Gladia (recommended,
        with post-call insights) or Deepgram. New meetings from that point
        onward use the cloud engine; existing transcripts are untouched. See{" "}
        <Link href="/docs/providers">Transcription providers</Link> for the
        comparison.
      </p>
    </Prose>
  );
}
