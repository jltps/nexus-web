import type { Metadata } from "next";
import { Prose } from "@/components/docs/prose";

export const metadata: Metadata = {
  title: "Templates",
  description:
    "Shape the enhancement output with built-in or custom templates. Plus 'Optimize with AI' for refining your own template prompts.",
};

export default function Page() {
  return (
    <Prose>
      <h1>Templates</h1>
      <p>
        A template tells the AI how to <em>shape</em> the enhanced notes —
        what kind of meeting it&rsquo;s for, what to call out, what tone to
        use. The underlying mechanics (JSON schema, source linking, block
        types, anti-AI-tell style) are always-on app scaffolding — your
        template only fills the &ldquo;guidance&rdquo; slot.
      </p>

      <h2>Built-ins</h2>
      <p>Nexus ships with templates tuned for common meeting types:</p>
      <ul>
        <li>
          <strong>Stand-up</strong> — surfaces blockers, ownership, and next
          steps per person.
        </li>
        <li>
          <strong>Interview</strong> — captures candidate signal, strengths,
          concerns, and follow-up questions.
        </li>
        <li>
          <strong>Sales / client call</strong> — picks out needs, objections,
          commitments, and next actions.
        </li>
        <li>
          <strong>One-on-one</strong> — tracks topics raised, decisions, and
          open items per side.
        </li>
        <li>
          <strong>General meeting</strong> — the default when no template
          fits.
        </li>
      </ul>

      <h2>Picking a template</h2>
      <p>
        Pick a template <em>before</em> the meeting if you know its kind
        (often the calendar auto-start can guess), or after — re-enhancement
        is one click and only re-runs the AI step.
      </p>

      <h2>Writing your own</h2>
      <ol>
        <li>
          <em>Settings → Templates → New template</em>.
        </li>
        <li>
          Give it a name (e.g. &ldquo;Investor update&rdquo;).
        </li>
        <li>
          In the <em>Instructions</em> box, describe what should be
          highlighted, the desired tone, anything specific to this kind of
          meeting. A starter example is pre-filled.
        </li>
        <li>
          Optionally pin a language (e.g. always English regardless of the
          spoken language) or leave it as &ldquo;auto&rdquo; to follow the
          transcript.
        </li>
        <li>Save. The template is now in your dropdown for any meeting.</li>
      </ol>

      <h2>Optimize with AI</h2>
      <p>
        The template editor has an <em>Optimize with AI</em> button.
        It rewrites your instructions for clarity and specificity using a
        cheap Haiku call. The output is shown side-by-side so you can accept
        or reject; nothing is overwritten without your confirmation.
      </p>

      <h2>Why guidance, not a full prompt</h2>
      <p>
        Earlier versions of Nexus accepted entire prompts, but that broke
        invariants (the JSON schema and source-link contract). Templates are
        now a constrained slot inside an always-on scaffold — so user text
        can <em>never</em> remove the structure that makes notes navigable.
        See <a href="/privacy">Privacy</a> §6 for the rule.
      </p>
    </Prose>
  );
}
