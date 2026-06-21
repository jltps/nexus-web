import type { Metadata } from "next";
import { Prose } from "@/components/docs/prose";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Short, plain-language terms covering the Nexus website and downloadable installer.",
};

export default function TermsPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Prose>
        <h1>Terms of Use</h1>
        <p>
          These terms cover this website (<code>nexus-web.vercel.app</code>)
          and the Nexus desktop installer you download from it. They are
          intentionally short.
        </p>

        <h2>The software</h2>
        <p>
          Nexus is provided <strong>&ldquo;as is&rdquo;</strong>, without
          warranty of any kind. You install it at your own risk and use it at
          your own discretion. We make no guarantees about uptime,
          transcription accuracy, AI enhancement quality, or fitness for any
          particular purpose.
        </p>

        <h2>Your responsibilities</h2>
        <ul>
          <li>
            <strong>Recording laws.</strong> Recording or transcribing
            meetings without the participants&rsquo; knowledge may be illegal
            in your jurisdiction. You are responsible for complying with the
            laws that apply to you. Nexus does not announce itself in the
            call, so disclose its use to the other participants if your law
            requires it.
          </li>
          <li>
            <strong>Provider terms.</strong> Nexus uses third-party providers
            (Anthropic, Gladia, Deepgram, Google, Microsoft) under your own
            accounts and keys. You are responsible for complying with those
            providers&rsquo; terms and for the costs incurred.
          </li>
          <li>
            <strong>Content.</strong> You are responsible for the content of
            your meetings, transcripts, and notes. We have no access to them.
          </li>
        </ul>

        <h2>Updates</h2>
        <p>
          We may update Nexus at any time. Updates are downloaded over HTTPS
          from our update feed. You can decline to update; older versions
          continue to work but may not receive security fixes.
        </p>

        <h2>This website</h2>
        <p>
          The marketing site and documentation are provided for informational
          purposes. We may update or remove pages without notice. No content
          on this site constitutes legal, financial, or professional advice.
        </p>

        <h2>Cloud services (when applicable)</h2>
        <p>
          When optional cloud features (sync, sharing, backup) ship later,
          using them will require accepting an updated set of terms. Until
          then, this section is a placeholder and no cloud service is
          provided.
        </p>

        <h2>Liability</h2>
        <p>
          To the maximum extent permitted by law, we are not liable for any
          damages arising from your use of Nexus or this site.
        </p>

        <h2>Changes to these terms</h2>
        <p>
          When these terms change materially, we&rsquo;ll bump the version
          here and link the previous version. The current version is{" "}
          <strong>Phase 1 / v0.1</strong>, last updated 2026-06-21.
        </p>
      </Prose>
    </section>
  );
}
