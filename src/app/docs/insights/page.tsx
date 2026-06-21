import Link from "next/link";
import type { Metadata } from "next";
import { Prose } from "@/components/docs/prose";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Post-call insights with Gladia: speaker diarization, named-entity recognition, and sentiment, computed from the transcript after the meeting ends.",
};

export default function Page() {
  return (
    <Prose>
      <h1>Insights</h1>
      <p>
        When you transcribe with{" "}
        <Link href="/docs/providers">Gladia</Link>, Nexus runs an insights pass
        over the transcript once a meeting ends. It works from the text, after
        the call. Audio is still never written to disk.
      </p>

      <h2>What you get</h2>
      <ul>
        <li>
          <strong>Speaking time.</strong> Each speaker&rsquo;s share of the
          conversation, with diarized turns.
        </li>
        <li>
          <strong>Named entities.</strong> People, organizations, and other
          terms pulled from the discussion, tagged inline in the transcript.
        </li>
        <li>
          <strong>Sentiment and emotion.</strong> Per speaker turn, with
          timestamps you can click to jump straight to that moment.
        </li>
      </ul>

      <h2>Where it shows up</h2>
      <p>
        A dedicated <em>Insights</em> view sits next to <em>Original</em> and{" "}
        <em>Enhanced</em>, with speaker colors, entity tags, per-utterance
        sentiment, and a summary card. The same signals appear inline in the
        live transcript as entity underlines and a per-line sentiment glyph.
      </p>

      <h2>Long meetings and export</h2>
      <p>
        Insights merge across the session handoffs that keep long calls
        continuous, so a multi-hour meeting reads as one. Markdown export and
        full-backup bundles carry the insights with the meeting.
      </p>

      <h2>Privacy</h2>
      <p>
        Insights are computed by Gladia from the transcript, not from stored
        audio, and only after the meeting ends. The on-device speaker model runs
        in memory and caches only its weights. Deepgram and offline Whisper skip
        the insights pass entirely. See the{" "}
        <Link href="/privacy">privacy page</Link> for the full picture.
      </p>
    </Prose>
  );
}
