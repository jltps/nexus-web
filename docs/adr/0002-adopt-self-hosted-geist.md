# ADR 0002: Adopt self-hosted Geist (supersedes the "no web fonts" invariant)

- Status: Accepted
- Date: 2026-06-24
- Deciders: José Luís Sousa (with Claude)

## Context

`CLAUDE.md §1.2` and `BRAND.md §4` declared a **non-negotiable** rule: *no web
fonts, system font stack only.* Its stated rationale was *"matches the app's CSP
posture."*

That rationale no longer holds. As of v0.11.0 the app itself ships **self-hosted
Geist** (`Geist-Variable.woff2` + `GeistMono-Variable.woff2`, OFL) bundled by
Vite, with `font-display: swap` and a system fallback stack — all under the
app's `script-src 'self'` CSP. A self-hosted, same-origin font file is not
third-party JavaScript, sets no cookie, and makes no external request. The
original invariant conflated "web font" (a typeface delivered as a file) with
"third-party / tracking resource" (the thing we actually forbid).

This is the one decision in the v0.11.0 web refresh that requires editing a §1
invariant, so it was surfaced explicitly and approved before proceeding.

## Decision

Adopt **self-hosted Geist** on the web to match the app:

- Copy `Geist-Variable.woff2`, `GeistMono-Variable.woff2`, and `LICENSE.txt`
  from the app into `src/app/fonts/`.
- Load them with **`next/font/local`** (self-hosting + automatic preload +
  `display: swap` + size-adjust to minimize CLS). `next/font/google` stays
  banned by `check-invariants`.
- `--font-sans` resolves to `Geist, <system stack>`; `--font-mono` to
  `Geist Mono, <mono stack>`. The system stack remains the fallback during swap
  and where the woff2 fails to load.

Rewrite `CLAUDE.md §1.2` from *"no web fonts"* to the actual invariant:
**no third-party / remotely-hosted fonts (no Google Fonts, no font CDN); a
self-hosted, same-origin font bundled with the site is allowed.**

## Consequences

- The site is typographically identical to the app.
- Adds ~140 KB of woff2 (two variable fonts) served same-origin. `next/font`
  preloads and swaps, so first paint uses the system fallback — JS-disabled
  rendering and Lighthouse are unaffected in practice; verify the perf budget
  (≥95) on the preview after the change.
- `check-invariants` is unchanged: it never banned self-hosted woff2, only the
  Google Fonts hosts and the `next/font/google` import. Both remain forbidden.
- `BRAND.md §4` updated; the "no web font, ever" lines removed.

## Alternatives considered

- **Keep the system stack.** Honors the letter of the old invariant but leaves
  the web visibly off-brand from the app. Rejected per the user's call.
- **Raw `@font-face` in `globals.css`** (as the app does). Works, but
  `next/font/local` gives preload + CLS handling for free and is the App Router
  idiom; chosen for that.
