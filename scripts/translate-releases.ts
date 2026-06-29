/**
 * translate-releases — build/CI-time population of the release-translation cache.
 *
 * Fetches releases from the public release host, and for every release whose
 * source content (title + body) is not already in the cache with a matching
 * hash, translates the title + body to English (Markdown preserved; text already
 * in English is returned verbatim) via the Anthropic Messages API, then writes
 * `src/lib/release-translations.json`.
 *
 * Degrades gracefully: with no ANTHROPIC_API_KEY it logs and exits 0 without
 * changing the cache, so local `pnpm build` / `typecheck` never need a key. The
 * key is supplied only as a GitHub Actions secret — never committed.
 *
 * See docs/adr/0006-build-time-release-translation.md.
 */

import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

import { STATIC_CHANGELOG } from "../src/lib/static-changelog";

const RELEASES_REPO = process.env.NEXUS_RELEASES_REPO ?? "jltps/nexus-releases";

/** Versions (leading "v" stripped) that have a curated entry in
 *  static-changelog.ts. Those are authoritative on the site (curatedRelease in
 *  release-content.ts), so the cache must never store — let alone re-translate
 *  and clobber — them. Mirrors `curatedRelease`'s normalization. */
const CURATED_VERSIONS = new Set(
  STATIC_CHANGELOG.map((s) => s.tag.replace(/^v/, "")),
);
function isCurated(tag: string): boolean {
  return CURATED_VERSIONS.has(tag.replace(/^v/, ""));
}
const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY;
const MODEL = process.env.TRANSLATE_MODEL ?? "claude-haiku-4-5-20251001";
const CACHE_PATH = join(process.cwd(), "src", "lib", "release-translations.json");

type Entry = { hash: string; title_en: string; body_en: string };
type Cache = Record<string, Entry>;

type GhRelease = {
  tag_name: string;
  name: string | null;
  body: string | null;
  draft: boolean;
};

function sourceHash(title: string, body: string): string {
  return createHash("sha256").update(`${title}\n${body}`).digest("hex");
}

function readCache(): Cache {
  try {
    return JSON.parse(readFileSync(CACHE_PATH, "utf8")) as Cache;
  } catch {
    return {};
  }
}

function writeCache(cache: Cache): void {
  // Stable, newest-tag-first ordering for clean diffs.
  const sorted: Cache = {};
  for (const key of Object.keys(cache).sort((a, b) => b.localeCompare(a, undefined, { numeric: true }))) {
    sorted[key] = cache[key]!;
  }
  writeFileSync(CACHE_PATH, `${JSON.stringify(sorted, null, 2)}\n`, "utf8");
}

async function fetchReleases(): Promise<GhRelease[]> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "nexus-web-translate/1.0",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  const res = await fetch(
    `https://api.github.com/repos/${RELEASES_REPO}/releases?per_page=100`,
    { headers },
  );
  if (!res.ok) {
    throw new Error(`GitHub Releases API ${res.status}: ${await res.text()}`);
  }
  return (await res.json()) as GhRelease[];
}

/** Ask Claude to translate a release's title + body to English, preserving
 *  Markdown and returning strict JSON. Returns null on any failure so the
 *  caller can leave that release's cache entry untouched. */
async function translate(
  title: string,
  body: string,
): Promise<{ title_en: string; body_en: string } | null> {
  const prompt = [
    "Translate the following software release notes to English.",
    "Rules:",
    "- If the text is already English, return it verbatim.",
    "- Preserve all Markdown formatting, headings, lists, links, and code spans.",
    "- Do not summarize, add, or remove content. Translate only.",
    "- Keep product names, version numbers, and proper nouns unchanged.",
    'Respond with ONLY a JSON object: {"title_en": "...", "body_en": "..."}.',
    "",
    `TITLE:\n${title}`,
    "",
    `BODY:\n${body}`,
  ].join("\n");

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": ANTHROPIC_KEY as string,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 4096,
        messages: [{ role: "user", content: prompt }],
      }),
    });
    if (!res.ok) {
      console.warn(`  ! Anthropic API ${res.status}: ${await res.text()}`);
      return null;
    }
    const data = (await res.json()) as {
      content?: Array<{ type: string; text?: string }>;
    };
    const text = data.content?.find((c) => c.type === "text")?.text ?? "";
    const json = text.slice(text.indexOf("{"), text.lastIndexOf("}") + 1);
    const parsed = JSON.parse(json) as { title_en?: string; body_en?: string };
    if (typeof parsed.title_en !== "string" || typeof parsed.body_en !== "string") {
      console.warn("  ! Unexpected translation shape; skipping.");
      return null;
    }
    return { title_en: parsed.title_en, body_en: parsed.body_en };
  } catch (err) {
    console.warn(`  ! Translation failed: ${(err as Error).message}`);
    return null;
  }
}

async function main(): Promise<void> {
  const cache = readCache();

  // Curated tags are authoritative on the site; evict any that linger in the
  // cache so a prior run's stale (or clobbered) entry can never resurface.
  let pruned = 0;
  for (const tag of Object.keys(cache)) {
    if (isCurated(tag)) {
      delete cache[tag];
      pruned++;
    }
  }

  const releases = (await fetchReleases()).filter((r) => !r.draft);
  console.log(`Found ${releases.length} releases in ${RELEASES_REPO}.`);

  let translated = 0;
  let upToDate = 0;
  let skipped = 0;

  for (const r of releases) {
    // Never translate a curated release — its hand-written notes win.
    if (isCurated(r.tag_name)) continue;
    const title = (r.name ?? r.tag_name).trim();
    const body = r.body ?? "";
    const hash = sourceHash(title, body);
    if (cache[r.tag_name]?.hash === hash) {
      upToDate++;
      continue;
    }
    if (!ANTHROPIC_KEY) {
      skipped++;
      continue;
    }
    console.log(`Translating ${r.tag_name} …`);
    const out = await translate(title, body);
    if (!out) {
      skipped++;
      continue;
    }
    cache[r.tag_name] = { hash, title_en: out.title_en, body_en: out.body_en };
    translated++;
  }

  if (!ANTHROPIC_KEY && skipped > 0) {
    console.log(
      `No ANTHROPIC_API_KEY set — left ${skipped} untranslated release(s) to ` +
        `fall back to their original text. Cache unchanged.`,
    );
  }

  if (translated > 0 || pruned > 0) {
    writeCache(cache);
    console.log(
      `✓ Wrote ${translated} translation(s); pruned ${pruned} curated entr` +
        `${pruned === 1 ? "y" : "ies"}. Up to date: ${upToDate}.`,
    );
  } else {
    console.log(`✓ Nothing to translate. Up to date: ${upToDate}.`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
