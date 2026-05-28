import type { Metadata } from "next";
import Link from "next/link";
import { Prose } from "@/components/docs/prose";
import { getRecentReleases, tagToVersion } from "@/lib/github-releases";

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

export default async function ChangelogPage() {
  const releases = await getRecentReleases(20);

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Prose>
        <h1>Changelog</h1>
        <p>
          Releases live on GitHub. This page reflects the latest 20 stable
          releases. For the full list visit the{" "}
          <Link href="/download">Download page</Link>.
        </p>
        {releases.length === 0 ? (
          <p>No releases published yet.</p>
        ) : (
          releases.map((r) => (
            <article
              key={r.tag_name}
              className="rounded-lg border bg-card p-6 shadow-xs"
            >
              <header className="!mb-4 flex flex-wrap items-baseline gap-3 border-b pb-3">
                <h2 className="!mt-0 !mb-0">v{tagToVersion(r.tag_name)}</h2>
                <span className="text-sm text-muted-foreground">
                  {formatDate(r.published_at)}
                </span>
                <a
                  href={r.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto text-sm"
                >
                  GitHub →
                </a>
              </header>
              <div>{renderNotes(r.body ?? "")}</div>
            </article>
          ))
        )}
      </Prose>
    </section>
  );
}
