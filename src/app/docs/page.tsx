import Link from "next/link";
import type { Metadata } from "next";
import { Prose } from "@/components/docs/prose";
import { docsSections } from "@/components/docs/docs-nav";

export const metadata: Metadata = {
  title: "User guide",
  description:
    "Everything you need to know to install Nexus, connect API keys, capture meetings, and organize your notes.",
};

export default function DocsIndex() {
  return (
    <Prose>
      <h1>User guide</h1>
      <p>
        Welcome to the Nexus user guide. Start with{" "}
        <Link href="/docs/getting-started">Getting started</Link> if this is
        your first time, or jump to a topic below.
      </p>
      {docsSections.map((s) => (
        <section key={s.title}>
          <h2>{s.title}</h2>
          <ul>
            {s.links.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </Prose>
  );
}
