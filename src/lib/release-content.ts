/**
 * Read side of the build/CI-time release-translation cache.
 *
 * GitHub release notes are authored in mixed languages; the public site always
 * shows them in English. `scripts/translate-releases.ts` populates
 * `release-translations.json` (a committed tag → {hash, title_en, body_en} map);
 * the pages below read it and fall back to the original GitHub text for any
 * release not yet translated. No model is ever called at request time.
 *
 * See docs/adr/0006-build-time-release-translation.md.
 */

import translationsJson from "./release-translations.json";
import { STATIC_CHANGELOG, type StaticRelease } from "./static-changelog";

export type ReleaseTranslation = {
  /** sha256 of the source `title + "\n" + body`, so the script knows when to
   *  re-translate. */
  hash: string;
  title_en: string;
  body_en: string;
};

type TranslationMap = Record<string, ReleaseTranslation>;

const translations = translationsJson as TranslationMap;

/** Strip a leading "v" so "v0.13.0" and "0.13.0" compare equal. (Local copy to
 *  keep this pure read-layer module free of the server-only github-releases
 *  import; mirrors its `tagToVersion`.) */
function normalizeVersion(tag: string): string {
  return tag.replace(/^v/, "");
}

/** The curated changelog entry for a tag, if one exists (matched by version,
 *  leading "v" ignored).
 *
 *  Curated entries in `static-changelog.ts` are **authoritative**: the site
 *  prefers them over the auto-generated GitHub release body. The desktop
 *  release pipeline fills each release body from Conventional-Commit subjects,
 *  which is reliable but thin/redundant; a hand-written entry, when present,
 *  wins on both the changelog and the homepage highlight. Releases without a
 *  curated entry fall back to the (translated) live GitHub body. The
 *  translation cache never stores curated tags — see
 *  `scripts/translate-releases.ts`. (ADR 0005 / 0006, CLAUDE.md §6.) */
export function curatedRelease(tag: string): StaticRelease | undefined {
  const v = normalizeVersion(tag);
  return STATIC_CHANGELOG.find((s) => normalizeVersion(s.tag) === v);
}

/** English release title: cached translation by tag, else the original GitHub
 *  release name, else the tag itself. */
export function englishTitle(
  tag: string,
  original: string | null | undefined,
): string {
  const cached = translations[tag];
  if (cached?.title_en) return cached.title_en;
  const trimmed = (original ?? "").trim();
  return trimmed || tag;
}

/** English release body: cached translation by tag, else the original GitHub
 *  body (which may be empty — callers handle their own empty fallback). */
export function englishBody(
  tag: string,
  original: string | null | undefined,
): string {
  const cached = translations[tag];
  if (cached?.body_en) return cached.body_en;
  return original ?? "";
}

/** Static fallback for the homepage highlight when no release headline exists. */
export const FALLBACK_HIGHLIGHT =
  "A privacy-first meeting notepad for Windows & macOS";

/** Extract a one-line highlight from a release title shaped
 *  `vX.Y.Z — <headline>` (em-dash, en-dash, or " - "). Returns null when there
 *  is no separator, so callers can fall back. Wrapping quotes are stripped; an
 *  inner quoted term (e.g. "ultra-moderno") is left intact. */
export function extractHighlight(title: string): string | null {
  const m = /[—–]\s*(.+)$|\s-\s+(.+)$/.exec(title);
  const captured = m?.[1] ?? m?.[2];
  if (!captured) return null;
  let headline = captured.trim();
  const wrapped = /^["“'](.+)["”']$/.exec(headline);
  if (wrapped?.[1]) headline = wrapped[1].trim();
  return headline || null;
}
