import type { DocSection } from "@/components/docs/docs-sidebar";

/** Single source of truth for the docs sidebar. Also drives the dynamic
 *  sitemap entry list — keep ordered, keep accurate. */
export const docsSections: DocSection[] = [
  {
    title: "Get started",
    links: [
      { href: "/docs", label: "Overview" },
      { href: "/docs/getting-started", label: "Getting started" },
      { href: "/docs/api-keys", label: "API keys" },
    ],
  },
  {
    title: "Capture & enhance",
    links: [
      { href: "/docs/calendar-setup", label: "Calendar setup" },
      { href: "/docs/templates", label: "Templates" },
      { href: "/docs/chat", label: "Meeting chat" },
      { href: "/docs/providers", label: "Transcription providers" },
      { href: "/docs/insights", label: "Insights" },
      { href: "/docs/offline-whisper", label: "Offline Whisper" },
    ],
  },
  {
    title: "Organize & operate",
    links: [
      { href: "/docs/folders-tags", label: "Folders & tags" },
      { href: "/docs/cost-usage", label: "Cost & usage" },
      { href: "/docs/keyboard-shortcuts", label: "Keyboard shortcuts" },
      { href: "/docs/troubleshooting", label: "Troubleshooting" },
    ],
  },
  {
    title: "About",
    links: [{ href: "/about", label: "About" }],
  },
];

/** Flat list of doc slugs (relative paths) for the sitemap. */
export const docsAllHrefs: string[] = docsSections.flatMap((s) =>
  s.links.map((l) => l.href),
);
