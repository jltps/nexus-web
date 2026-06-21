import Link from "next/link";
import type { Metadata } from "next";
import { Prose } from "@/components/docs/prose";

export const metadata: Metadata = {
  title: "API keys",
  description:
    "How Nexus stores your API keys (encrypted via the OS keychain in the main process), where to paste them, and how to use OpenAI-compatible providers.",
};

export default function Page() {
  return (
    <Prose>
      <h1>API keys</h1>
      <p>
        Nexus is &ldquo;bring your own keys.&rdquo; You pay your providers
        directly, and your keys never leave your machine in plaintext.
      </p>

      <h2>Where keys live</h2>
      <p>
        Keys are encrypted via Electron&rsquo;s <code>safeStorage</code>{" "}
        (Windows DPAPI on Windows, the macOS Keychain on Mac), decrypted only
        inside the main process, and never exposed to the renderer (UI) layer.
        They are never logged and never sent to any analytics endpoint.
      </p>

      <h2>Anthropic (recommended for AI)</h2>
      <ol>
        <li>
          Create a key at{" "}
          <a
            href="https://console.anthropic.com/settings/keys"
            target="_blank"
            rel="noopener noreferrer"
          >
            console.anthropic.com
          </a>
          .
        </li>
        <li>
          Open <em>Settings → AI</em> in Nexus, select Anthropic, paste the
          key, click Save. A green <em>Connected</em> indicator confirms it.
        </li>
      </ol>
      <p>
        Nexus uses Claude Sonnet for enhancement and chat by default, and
        Claude Haiku for titles, summaries, and template optimization. You can
        flip to Economy mode (Haiku for everything) in the same screen.
      </p>

      <h2>Gladia (recommended for transcription)</h2>
      <ol>
        <li>
          Create a key at{" "}
          <a
            href="https://app.gladia.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            app.gladia.io
          </a>
          .
        </li>
        <li>
          Open <em>Settings → API Keys</em> in Nexus, paste the Gladia key, and
          save. Onboarding offers a Gladia key and selects it automatically.
        </li>
      </ol>
      <p>
        Gladia gives you live transcription plus a post-call{" "}
        <Link href="/docs/insights">insights</Link> pass. See{" "}
        <Link href="/docs/providers">Transcription providers</Link> to compare
        all three engines.
      </p>

      <h2>Deepgram (cloud transcription)</h2>
      <ol>
        <li>
          Create a key at{" "}
          <a
            href="https://console.deepgram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            console.deepgram.com
          </a>
          .
        </li>
        <li>
          Open <em>Settings → API Keys</em>, paste the Deepgram key, then
          select Deepgram in <em>Settings → Transcription</em>.
        </li>
      </ol>

      <h2>OpenAI-compatible providers</h2>
      <p>
        You can point the AI layer at any OpenAI-compatible API: OpenAI itself,
        OpenRouter, a local Ollama server, vLLM, LiteLLM, etc. Nexus uses the
        official <code>openai</code> SDK against your base URL.
      </p>
      <ol>
        <li>
          In <em>Settings → AI</em>, switch the provider to{" "}
          <em>OpenAI-compatible</em>.
        </li>
        <li>
          Paste your <code>API base URL</code> (e.g.{" "}
          <code>https://api.openai.com/v1</code> or{" "}
          <code>http://localhost:11434/v1</code> for Ollama).
        </li>
        <li>Paste your API key (or leave blank if your server doesn't need one).</li>
        <li>Set the model names for chat and for routine tasks (title/summarize).</li>
      </ol>
      <p>
        Output validation is provider-independent: Nexus always validates the
        enhancement JSON against the same schema and falls back to plain
        Markdown if a provider misbehaves.
      </p>

      <h2>Revoking and rotating</h2>
      <p>
        Open the relevant tab (<em>Settings → API Keys</em> for a transcription
        provider, <em>Settings → AI</em> for your model provider), clear the
        key, and paste a new one. The encrypted copy is overwritten immediately.
        Nexus will not re-use the old key for any further calls.
      </p>
    </Prose>
  );
}
