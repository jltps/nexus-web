"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const items = [
  {
    q: "Does Nexus join my Zoom or Teams call as a bot?",
    a: "No. Nexus never joins your call. It captures audio at the operating-system level — what your speakers play and your microphone hears — so it works with every conferencing tool without integrating with any of them.",
  },
  {
    q: "Is my meeting audio sent to a server?",
    a: "Only as a live stream to the transcription provider you choose (Deepgram or local Whisper). Audio is never written to disk and never persisted on our side. If you use Whisper, audio never leaves your machine at all.",
  },
  {
    q: "Do I need accounts or a subscription?",
    a: "No. Nexus runs fully local. You bring your own API keys for any cloud provider you want to use (Anthropic for AI, Deepgram for transcription), or you use offline Whisper and pay nothing. The Nexus app itself is free.",
  },
  {
    q: "Which platforms are supported?",
    a: "Windows 10 (64-bit) and Windows 11, plus macOS 13 Ventura or later on Apple Silicon (M1–M4). The app uses Electron's loopback audio capture, which needs Electron 31+; we ship with 33.",
  },
  {
    q: "What about Linux?",
    a: "macOS (Apple Silicon) is here — grab it on the download page. Linux isn't supported yet; the loopback audio-capture path would need native work there.",
  },
  {
    q: "Will my notes sync across devices?",
    a: "Not in this release. Local-first stays the default. Opt-in cloud sync and read-only sharing are planned for the next phase — see the roadmap. Audio never syncs.",
  },
  {
    q: "Is Nexus open source?",
    a: "The downloadable installer is free. Source-code licensing details are documented separately.",
  },
];

export function FAQ() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="mb-8 text-center text-3xl font-semibold tracking-tight sm:text-4xl">
          Frequently asked
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {items.map(({ q, a }, i) => (
            <AccordionItem key={q} value={`item-${i}`}>
              <AccordionTrigger>{q}</AccordionTrigger>
              <AccordionContent>{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
