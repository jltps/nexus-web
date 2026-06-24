import type { Metadata } from "next";
import Link from "next/link";
import { Prose } from "@/components/docs/prose";
import {
  getRecentReleasesIncludingPrereleases,
  tagToVersion,
} from "@/lib/github-releases";
import { englishBody } from "@/lib/release-content";
import { STATIC_CHANGELOG } from "@/lib/static-changelog";

export const metadata: Metadata = {
  title: "Changelog",
  description: "Release notes for Nexus.",
};

export const revalidate = 300;

function formatDate(iso: string | null): string {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

/** Inline markdown: **bold**, `code`, and [text](url). Built into React nodes
 *  directly — no `innerHTML`, consistent with the "ship strings only" posture. */
function renderInline(text: string, keyPrefix: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const re = /(`[^`]+`)|(\*\*[^*]+\*\*)|(\[[^\]]+\]\([^)]+\))/g;
  let last = 0;
  let n = 0;
  for (let m = re.exec(text); m !== null; m = re.exec(text)) {
    const tok = m[0];
    if (tok === undefined) break;
    if (m.index > last) nodes.push(text.slice(last, m.index));
    const key = `${keyPrefix}-${n++}`;
    if (tok.startsWith("`")) {
      nodes.push(<code key={key}>{tok.slice(1, -1)}</code>);
    } else if (tok.startsWith("**")) {
      nodes.push(<strong key={key}>{tok.slice(2, -2)}</strong>);
    } else {
      const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(tok);
      const label = link?.[1] ?? tok;
      const href = link?.[2] ?? "#";
      nodes.push(
        <a key={key} href={href} target="_blank" rel="noopener noreferrer">
          {label}
        </a>,
      );
    }
    last = m.index + tok.length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

/** Render release-note markdown as a tiny safe subset: headings, bullet lists,
 *  and inline **bold** / `code` / links. No remote MDX, no client-side parser,
 *  no `innerHTML` — we build React nodes from the string. */
function renderNotes(md: string): React.ReactNode {
  const lines = md.split(/\r?\n/);
  const blocks: React.ReactNode[] = [];
  let listItems: React.ReactNode[] = [];

  const flushList = (key: string) => {
    if (listItems.length > 0) {
      blocks.push(<ul key={key}>{listItems}</ul>);
      listItems = [];
    }
  };

  lines.forEach((line, i) => {
    const trim = line.trim();
    if (trim.startsWith("- ") || trim.startsWith("* ")) {
      listItems.push(<li key={i}>{renderInline(trim.slice(2), `li${i}`)}</li>);
      return;
    }
    flushList(`ul${i}`);
    if (!trim) {
      blocks.push(<br key={i} />);
    } else if (trim.startsWith("### ")) {
      blocks.push(<h4 key={i}>{renderInline(trim.slice(4), `h${i}`)}</h4>);
    } else if (trim.startsWith("## ")) {
      blocks.push(<h3 key={i}>{renderInline(trim.slice(3), `h${i}`)}</h3>);
    } else if (trim.startsWith("# ")) {
      blocks.push(<h3 key={i}>{renderInline(trim.slice(2), `h${i}`)}</h3>);
    } else {
      blocks.push(<p key={i}>{renderInline(trim, `p${i}`)}</p>);
    }
  });
  flushList("ul-end");

  return <>{blocks}</>;
}

type Entry = {
  tag: string;
  publishedAt: string | null;
  body: string;
};

/** Resolve an effective body for a live release: prefer the GitHub release
 *  body, fall back to a matching STATIC_CHANGELOG entry, then to a neutral
 *  placeholder. */
function effectiveBody(tag: string, body: string): string {
  if (body.trim()) return body;
  const fallback = STATIC_CHANGELOG.find((s) => s.tag === tag);
  if (fallback) return fallback.body;
  return "Release notes not provided.";
}

export default async function ChangelogPage() {
  const live = await getRecentReleasesIncludingPrereleases(20);

  // The public release host carries only recent builds, so render the live
  // feed and append the curated history for every earlier version it doesn't
  // include. Dedupe by normalized version (live wins) and sort newest-first.
  const liveVersions = new Set(live.map((r) => tagToVersion(r.tag_name)));
  const liveEntries: Entry[] = live.map((r) => ({
    tag: r.tag_name,
    publishedAt: r.published_at,
    // English from the translation cache when available, else the original body;
    // effectiveBody then handles the empty-body fallback. (ADR 0006)
    body: effectiveBody(r.tag_name, englishBody(r.tag_name, r.body ?? "")),
  }));
  const historyEntries: Entry[] = STATIC_CHANGELOG.filter(
    (r) => !liveVersions.has(tagToVersion(r.tag)),
  ).map((r) => ({
    tag: r.tag,
    publishedAt: r.date,
    // Lead with the title as a heading so history entries read like the live
    // releases, whose bodies open with their own "## …" title line.
    body: `## ${r.title}\n\n${r.body}`,
  }));
  const entries: Entry[] = [...liveEntries, ...historyEntries].sort((a, b) =>
    (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""),
  );

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Prose>
        <h1>Changelog</h1>
        <p>
          Stable releases of the Nexus desktop app. For installers visit the{" "}
          <Link href="/download">Download page</Link>.
        </p>
        {entries.map((e) => {
          const version = tagToVersion(e.tag);
          return (
            <article
              key={e.tag}
              id={`v${version}`}
              className="rounded-lg border bg-card p-6 shadow-xs scroll-mt-24"
            >
              <header className="!mb-4 flex flex-wrap items-baseline gap-3 border-b pb-3">
                <h2 className="!mt-0 !mb-0">v{version}</h2>
                <span className="text-sm text-muted-foreground">
                  {formatDate(e.publishedAt)}
                </span>
              </header>
              <div>{renderNotes(e.body)}</div>
            </article>
          );
        })}
      </Prose>
    </section>
  );
}
