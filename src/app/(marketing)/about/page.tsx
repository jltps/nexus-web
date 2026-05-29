import type { Metadata } from "next";
import { Prose } from "@/components/docs/prose";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Nexus — a privacy-first, bot-free meeting notepad for Windows, built by José Luís Sousa.",
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Prose>
        <h1>About Nexus</h1>
        <p>
          Nexus is a privacy-first meeting notepad for Windows. It captures
          what your computer hears, transcribes it live, and turns your rough
          notes into structured key points — without a bot ever joining the
          call and without storing a single second of audio.
        </p>
        <p>
          It runs local-first. Cloud features are opt-in, and the few network
          calls that exist are documented on the{" "}
          <a href="/privacy">Privacy</a> page.
        </p>

        <h2>Who built it</h2>
        <p>
          Nexus is designed and developed by{" "}
          <a
            href="https://www.linkedin.com/in/jltps/"
            target="_blank"
            rel="noopener noreferrer"
          >
            José Luís Sousa
          </a>
          . Feedback, bug reports, and security concerns are welcome at{" "}
          <a href="mailto:jlts2010@gmail.com">jlts2010@gmail.com</a>.
        </p>
      </Prose>
    </section>
  );
}
