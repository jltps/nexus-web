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

export type ReleaseTranslation = {
  /** sha256 of the source `title + "\n" + body`, so the script knows when to
   *  re-translate. */
  hash: string;
  title_en: string;
  body_en: string;
};

type TranslationMap = Record<string, ReleaseTranslation>;

const translations = translationsJson as TranslationMap;

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
