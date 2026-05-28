import type { Metadata } from "next";
import Link from "next/link";
import { Prose } from "@/components/docs/prose";
import { getRecentReleases, tagToVersion } from "@/lib/github-releases";
import { STATIC_CHANGELOG } from "@/lib/static-changelog";

export const metadata: Metadata = {
  title: "Changelog",
  description:
    "Release notes for Nexus, pulled live from GitHub Releases.",
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

/** Render markdown headings/lists from release notes as a tiny safe subset.
 *  No remote MDX, no client-side parser — we ship strings only. */
function renderNotes(md: string): React.ReactNode {
  const lines = md.split(/\r?\n/);
  return (
    <>
      {lines.map((line, i) => {
        const trim = line.trim();
        if (!trim) return <br key={i} />;
        if (trim.startsWith("### ")) return <h4 key={i}>{trim.slice(4)}</h4>;
        if (trim.startsWith("## ")) return <h3 key={i}>{trim.slice(3)}</h3>;
        if (trim.startsWith("# ")) return <h3 key={i}>{trim.slice(2)}</h3>;
        if (trim.startsWith("- ") || trim.startsWith("* "))
          return <li key={i}>{trim.slice(2)}</li>;
        return <p key={i}>{trim}</p>;
      })}
    </>
  );
}

type Entry = {
  tag: string;
  publishedAt: string | null;
  body: string;
  htmlUrl: string | null;
};

export default async function ChangelogPage() {
  const live = await getRecentReleases(20);

  const entries: Entry[] =
    live.length > 0
      ? live.map((r) => ({
          tag: r.tag_name,
          publishedAt: r.published_at,
          body: r.body ?? "",
          htmlUrl: r.html_url,
        }))
      : STATIC_CHANGELOG.map((r) => ({
          tag: r.tag,
          publishedAt: r.date,
          body: r.body,
          htmlUrl: null,
        }));

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Prose>
        <h1>Changelog</h1>
        <p>
          Stable releases of the Nexus desktop app. For installers visit the{" "}
          <Link href="/download">Download page</Link>.
        </p>
        {entries.map((e) => (
          <article
            key={e.tag}
            className="rounded-lg border bg-card p-6 shadow-xs"
          >
            <header className="!mb-4 flex flex-wrap items-baseline gap-3 border-b pb-3">
              <h2 className="!mt-0 !mb-0">v{tagToVersion(e.tag)}</h2>
              <span className="text-sm text-muted-foreground">
                {formatDate(e.publishedAt)}
              </span>
              {e.htmlUrl ? (
                <a
                  href={e.htmlUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto text-sm"
                >
                  GitHub →
                </a>
              ) : null}
            </header>
            <div>{renderNotes(e.body)}</div>
          </article>
        ))}
      </Prose>
    </section>
  );
}
