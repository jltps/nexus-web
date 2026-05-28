import type { Metadata } from "next";
import { Prose } from "@/components/docs/prose";

export const metadata: Metadata = {
  title: "Meeting chat",
  description:
    "Ask questions about a single meeting or across many. Answers are scoped, cited, and rendered as Markdown.",
};

export default function Page() {
  return (
    <Prose>
      <h1>Meeting chat</h1>
      <p>
        Open the chat panel from any meeting (or from the global cross-meeting
        view) and ask a question in plain language. Answers cite the
        transcript so you can verify everything.
      </p>

      <h2>Per-meeting chat</h2>
      <p>
        Inside an open meeting, click the chat icon. The conversation is
        scoped to that meeting&rsquo;s transcript and notes — Nexus will
        politely decline questions that aren&rsquo;t about it.
      </p>
      <p>Example questions that work well:</p>
      <ul>
        <li>&ldquo;What did Maria commit to by Friday?&rdquo;</li>
        <li>&ldquo;Summarize the pricing discussion.&rdquo;</li>
        <li>
          &ldquo;Was there agreement on the API rate-limit number? What was it?&rdquo;
        </li>
      </ul>

      <h2>Cross-meeting chat</h2>
      <p>
        Click the cross-meeting icon in the title bar to query across many
        meetings at once. You can scope by folder, tag, or date range. This is
        where a project history really pays off.
      </p>
      <p>Example questions:</p>
      <ul>
        <li>
          &ldquo;What does Acme&rsquo;s CTO actually care about? (All Acme
          calls from this quarter.)&rdquo;
        </li>
        <li>
          &ldquo;Every time we discussed the dashboard redesign, what was the
          objection?&rdquo;
        </li>
      </ul>

      <h2>Citations &amp; verification</h2>
      <p>
        Answers come back as Markdown. When the model references something,
        Nexus shows a citation chip you can click to jump straight to that
        transcript moment.
      </p>

      <h2>Hide transcript option</h2>
      <p>
        Some questions are better answered from your own notes only (e.g. you
        wrote the conclusion you want to revisit). Toggle{" "}
        <em>Hide transcript</em> in the chat header to scope the model to your
        notes alone.
      </p>
    </Prose>
  );
}
