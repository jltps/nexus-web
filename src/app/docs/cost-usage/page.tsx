import type { Metadata } from "next";
import { Prose } from "@/components/docs/prose";

export const metadata: Metadata = {
  title: "Cost & usage",
  description:
    "How Nexus tracks transcription minutes and LLM tokens per meeting, and how to keep your bill low.",
};

export default function Page() {
  return (
    <Prose>
      <h1>Cost &amp; usage</h1>
      <p>
        Every meeting tracks two cost lines: <strong>transcription</strong>{" "}
        (Deepgram minutes, free for offline Whisper) and{" "}
        <strong>AI</strong> (Anthropic input + output tokens, or your
        OpenAI-compatible equivalent). Nexus shows both per meeting and in
        aggregate in <em>Settings → Usage &amp; cost</em>.
      </p>

      <h2>Cost per meeting</h2>
      <p>
        Open any meeting and the cost is displayed near the title. Hover for
        a breakdown:
      </p>
      <ul>
        <li>Transcription: minutes × billed channels.</li>
        <li>AI: input tokens × model + output tokens × model.</li>
      </ul>

      <h2>Cutting transcription cost</h2>
      <ul>
        <li>
          <strong>Mono mode (default).</strong> Nexus downmixes microphone and
          system audio into a single channel before transcription. This{" "}
          ~halves Deepgram&rsquo;s per-channel bill. &ldquo;Me&rdquo; is
          recovered via a mic-energy heuristic so speaker separation still
          works.
        </li>
        <li>
          <strong>Whisper for sensitive calls.</strong> Free, local, no cost
          line at all.
        </li>
      </ul>

      <h2>Cutting AI cost — Economy mode</h2>
      <p>
        In <em>Settings → AI</em> you&rsquo;ll find a Quality / Economy
        toggle.
      </p>
      <ul>
        <li>
          <strong>Quality</strong> (default): Sonnet for enhancement and
          chat; Haiku for titles, summaries, and template optimization.
        </li>
        <li>
          <strong>Economy</strong>: Haiku for everything, including
          enhancement and chat. Roughly an order of magnitude cheaper.
          Output is still validated against the same schema.
        </li>
      </ul>

      <h2>Provider-specific notes</h2>
      <p>
        Costs are computed using the per-million-token pricing baked into the
        app. If you switch to an OpenAI-compatible provider, set the price
        for your chosen models in <em>Settings → AI</em> so the readout
        reflects your real bill. If you don&rsquo;t, the readout shows zero
        for that meeting (we&rsquo;d rather show nothing than guess wrong).
      </p>
    </Prose>
  );
}
