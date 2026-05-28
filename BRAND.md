# Nexus Brand Guidelines (web)

This document is the source of truth for **how Nexus presents itself on the
web**. Everything here is mirrored from the desktop app's design system —
when the app changes, update this and `globals.css` together.

---

## 1. Name & voice

- **Name**: Nexus. Always one word, capitalized. Never "Nexus AI", "Nexus
  App", "Nexus.app". The desktop app's directory is still named `scribe/` on
  disk for backwards compatibility — that's an implementation detail; we
  never surface "Scribe" externally.
- **Tagline**: *"Capture your full meeting. Never let a bot join the call."*
- **One-line pitch**: A bot-free, device-audio meeting notepad for Windows.
  Captures live, enhances with AI, keeps your notes on your machine.
- **Voice**: calm, concrete, anti-marketing. We don't say "AI-powered
  productivity revolution". We say what the product does and what it
  doesn't do. The privacy story sells itself when it's not breathless.
- **Tone words to use**: clear, direct, careful, local-first, private, calm.
- **Tone words to avoid**: AI-powered, enterprise-grade, supercharged,
  revolutionary, seamless, magical, intelligent, smart. (Save the word
  "intelligent" for cases where we mean it literally — model intelligence,
  not vibes.)

## 2. Logo & mark

### The mark

A monogram "N" formed from two vertical bars + a connecting diagonal,
white-on-gradient inside a rounded square. The geometry is identical to the
desktop app's icon and to `scribe/build/make-icons.mjs`.

- **Mark file**: `public/logo.svg` (256×256, SVG).
- **Inline component**: `<Logo>` from `src/components/logo.tsx`.
- **Inline color**: the gradient is `linear-gradient(135deg, #10b981 0%, #0f766e 100%)`.
  Don't substitute a solid color; the gradient is the recognition cue.
- **Clear space**: at least 25% of the mark's height on every side.
- **Min size**: 24px on screen (smaller than that and the diagonal breaks
  visually).

### The wordmark

The wordmark is just the name "Nexus" set in the system font stack,
semibold, slightly tight tracking (`tracking-tight`). No custom typeface.

### Don't

- Don't tilt, animate, or recolor the mark. Use it as-is.
- Don't wrap the mark in a circle, oval, or any decorative frame.
- Don't render the wordmark with a custom font — system stack only.
- Don't combine the mark with another brand mark in marketing materials.

## 3. Color palette

Tokens are CSS variables in `src/app/globals.css`. The web uses
`[data-theme="dark"]` as the dark-mode trigger (next-themes sets it).

### Light theme

| Token | Hex | Use |
|---|---|---|
| `--background` | `#fafafa` | Page background |
| `--foreground` | `#171717` | Body text |
| `--card` | `#ffffff` | Card / panel surfaces |
| `--muted` | `#f0f0f0` | Subtle backgrounds |
| `--muted-foreground` | `#525252` | Secondary text |
| `--border` | `#e5e5e5` | Dividers |
| `--primary` | `#0f766e` | **Brand accent (teal-700)** |
| `--primary-foreground` | `#ffffff` | Text on primary |
| `--ring` | `#0f766e` | Keyboard focus |
| `--destructive` | `#b91c1c` | Errors, destructive actions |
| `--info` | `#0369a1` | Informational accents |

### Dark theme

| Token | Hex | Use |
|---|---|---|
| `--background` | `#0a0a0a` | Page background |
| `--foreground` | `#e5e5e5` | Body text |
| `--card` | `#171717` | Card surfaces |
| `--muted` | `#262626` | Subtle backgrounds |
| `--muted-foreground` | `#a3a3a3` | Secondary text |
| `--border` | `#262626` | Dividers |
| `--primary` | `#2dd4bf` | **Brand accent (cyan-400, brighter for dark)** |
| `--primary-foreground` | `#0a0a0a` | Text on primary |
| `--ring` | `#2dd4bf` | Keyboard focus |

### Rules

- Body text must hit WCAG AA contrast (≥ 4.5:1) in both themes. The tokens
  above are picked to satisfy this; verify if you ever override a pairing.
- Use **semantic tokens**, never literal hex values, in component classNames.
- The only decorative gradient is the logo mark. Don't add accent gradients
  to buttons, hero text, etc.

## 4. Typography

- **Stack**: `var(--font-sans)` which resolves to: `ui-sans-serif,
  system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, …`
  — **no web font, ever**.
- **Mono stack**: `var(--font-mono)` → `ui-monospace, SFMono-Regular, …`.
- **Hierarchy**:
  - Hero h1: ~48–60px (`text-5xl sm:text-6xl`), semibold, tracking-tight.
  - Section h2: ~30–36px, semibold.
  - Card h3: 14–16px, semibold.
  - Body: 14–16px, normal weight.
  - Captions: 12px, muted-foreground.
- **Line length**: cap at ~64ch for body copy. Use `max-w-2xl` / `max-w-3xl`
  for prose containers.

## 5. Spacing, radii, shadows

- **Radius scale**: base `0.5rem` (8px). `radius-sm` 4px, `radius-md` 6px,
  `radius-lg` 8px, `radius-xl` 12px. Cards and dialogs are `rounded-lg` to
  `rounded-2xl`.
- **Shadows**: `shadow-xs` for buttons/cards, `shadow-md` for dropdowns,
  `shadow-lg` for dialogs. Don't introduce custom shadow tokens.
- **Section rhythm**: 80–96px (`py-20`/`py-24`) between marketing sections.
  Inside sections, 32–48px (`mt-8`/`mt-12`) between blocks.

## 6. Motion

- `tw-animate-css` powers Radix open/close transitions (carried over from
  the desktop app). Stick to subtle 150–250ms fades + small slides.
- **Respect `prefers-reduced-motion`**. The base CSS already cancels
  durations to 0.01ms under it — don't override with hard-coded durations.
- No parallax. No hero video. No autoplay anything.

## 7. Iconography

- **Library**: `lucide-react` only. Mix only with literal SVGs we author
  (e.g. the Nexus mark).
- **Size**: default 16px (`size-4`) inside text, 20–24px in larger UI
  contexts, 56px for the hero mark.
- **Color**: inherits via `text-*` utilities. Use `text-primary` for the
  small accent chip in card headers; `text-muted-foreground` for inline
  utility icons.

## 8. Photography & illustration

- **Screenshots**: real product, both themes, captured at the same
  resolution. Store under `public/screenshots/` and reference as
  `/screenshots/<name>.png`.
- **No stock photos.** No people in suits looking at laptops. No
  AI-generated illustrations.
- **No diagrams of "how it works"** unless they're genuinely informative —
  the privacy story works better in plain language than in shapes.

## 9. Voice patterns (writing on the site)

- **Lead with the noun, not the qualifier.** "Nexus captures your meeting" —
  not "Capture your meeting with Nexus's AI-powered intelligence engine."
- **Show the limitation honestly.** If something is Windows-only, say so on
  the first screen, not as an asterisk on the fourth.
- **Quote the invariants verbatim** when they appear. The §1 rules are
  copy-pasted into `/privacy` from `CLAUDE.md §1` of the desktop repo
  on purpose. They are factual statements about the codebase, not
  marketing.
- **Avoid superlatives.** "fastest", "easiest", "most secure" — skip them.
- **Number when you can.** "Captures from your machine" beats "Captures
  natively"; "No bytes of audio written to disk" beats "Privacy-first".

## 10. Don't list (anti-patterns)

- Don't add Google Fonts. Don't add any other web font.
- Don't add Google Analytics, Plausible script tag, Mixpanel, Hotjar,
  Intercom, or any chat widget.
- Don't add a cookie banner (we don't set tracking cookies).
- Don't use `next/image` with a remote URL.
- Don't render the Nexus name as "NEXUS" (all caps) or "nexus" (lowercase).
- Don't say "AI-powered". Say what the AI actually does.
