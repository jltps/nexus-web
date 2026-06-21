# Design System

This is the implementation-level reference for design tokens, components,
and patterns. For the brand identity / voice, see `BRAND.md`. For
governing rules, see `CLAUDE.md`.

---

## Tokens

All tokens are CSS variables defined in `src/app/globals.css`. The values
mirror the desktop app's `scribe/src/renderer/app/index.css` (lines
16–110). The web swaps the dark-mode trigger from
`@media (prefers-color-scheme: dark)` to `[data-theme="dark"]` so
`next-themes` can control it.

| Concern | Token | Notes |
|---|---|---|
| Surface | `--background`, `--card`, `--popover`, `--muted` | Layered backgrounds |
| Text | `--foreground`, `--muted-foreground`, `--card-foreground` | All semantic |
| Brand | `--primary` (`#0f766e` light / `#2dd4bf` dark) | Single brand accent |
| Edge | `--border`, `--input`, `--ring` | `--ring` matches `--primary` |
| Status | `--destructive`, `--warning`, `--info` | Avoid solo decorative use |
| Shape | `--radius: 0.5rem` | Scale derived: `sm` 4px, `md` 6px, `lg` 8px, `xl` 12px |
| Type | `--font-sans`, `--font-mono` | System stacks; no webfont |

Use semantic Tailwind utilities: `bg-card`, `text-muted-foreground`,
`text-primary`, `border` (defaults to `var(--border)` per `@layer base`).

## Theme switching

- Provider: `<ThemeProvider>` in `src/components/theme-provider.tsx`.
- Defaults: `attribute="data-theme"`, `defaultTheme="system"`,
  `enableSystem`, `disableTransitionOnChange`.
- Toggle: `<ThemeToggle>` cycles light → dark → system. Renders nothing
  meaningful pre-mount to avoid hydration warnings (next-themes pattern).
- The root `<html>` carries `suppressHydrationWarning` because next-themes
  writes to it post-render.

## Components

shadcn copy-ins live in `src/components/ui/`. We only ship what we use:

| Component | Variants | Notes |
|---|---|---|
| `Button` | default / secondary / outline / ghost / link / destructive; sizes xs/sm/default/lg/xl/icon | `asChild` supported via Radix Slot for `<Link>` integration |
| `Card` + `CardHeader/Title/Description/Content/Footer` | — | Border + `shadow-xs` |
| `Badge` | default / secondary / outline / muted | Small chip |
| `Accordion` | from Radix | FAQ uses `type="single" collapsible` |
| `Separator` | from Radix | h-px / w-px |

Marketing-specific components live in `src/components/marketing/`:

- `Hero`, `ProductVisual`, `WhatsNew`, `Differentiators`, `FeatureGrid`,
  `InsightsShowcase`, `PrivacyCallout`, `FAQ`, `CTA`, `CopyButton`,
  `DownloadOsHint`.
- `ProductVisual` and `InsightsShowcase` render token-only CSS/SVG
  placeholders (no fake screenshots); swap for real `/screenshots/*.png`
  when captures exist.
- `DownloadOsHint` is a client component and additive only: it renders
  nothing without JS, for unrecognized platforms, or when the detected OS
  has no build.

Docs components live in `src/components/docs/`:

- `Prose` — hand-rolled typography styles. Don't depend on the
  `@tailwindcss/typography` plugin; we want exact control over heading
  weight, line-height, code styling, and link color.
- `DocsSidebar` — reads `docsSections` from `docs-nav.ts`.
- `docs-nav.ts` — single source of truth for sidebar + sitemap.

## Patterns

### Sections rhythm

```tsx
<section className="py-20">
  <div className="mx-auto max-w-6xl px-4 sm:px-6">
    {/* content */}
  </div>
</section>
```

`py-20` for marketing sections, `py-16` for utility pages. Container max
is `max-w-6xl` for grids, `max-w-3xl` for prose.

### Card grid

```tsx
<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
  <div className="rounded-lg border bg-card p-5">
    {/* card */}
  </div>
</div>
```

### Icon + label

```tsx
<div className="inline-flex size-9 items-center justify-center rounded-md bg-primary/10 text-primary">
  <Icon className="size-4" />
</div>
```

This little teal-tinted square is the visual workhorse — it shows up in
the differentiators row, the feature grid, the privacy callout, and the
download page reqs box. Keep it consistent.

### Buttons with icons

```tsx
<Button asChild size="xl">
  <Link href="/download">
    <Download className="mr-2 size-4" />
    Download
  </Link>
</Button>
```

The Button base style includes `[&_svg]:size-4` so icons sized to 4 by
default get pinned correctly. Override per-instance only when you really
need to.

### Prose pages

```tsx
import { Prose } from "@/components/docs/prose";

<Prose>
  <h1>Title</h1>
  <p>Body...</p>
</Prose>
```

`<Prose>` handles heading sizes, link color, code styling, list bullets.
It does NOT need MDX — plain JSX with semantic HTML inside works
identically.

## A11y

- All interactive elements are reachable by keyboard.
- Focus ring is visible: 3px primary at 50% opacity (set in `globals.css`).
- Skip links are not (yet) added — Phase 2 if real demand surfaces.
- Color contrast verified at AA (4.5:1) for body text in both themes via
  the chosen tokens.
- Reduced-motion respected via `prefers-reduced-motion: reduce` CSS reset.
- Icons that carry meaning have an `aria-label` or accompanying text;
  decorative icons inherit.

## What to NOT add

- Decorative gradients on text or buttons. The logo gradient is the only
  gradient on the site.
- Custom shadow scales. Use `shadow-xs`, `shadow-md`, `shadow-lg`.
- Custom radius values. Use `rounded-sm/md/lg/xl/2xl/full`.
- More than one weight family. Body is normal, emphasis is semibold. No
  light, no extra-bold.
- Animation libraries (Framer Motion, GSAP). Radix + CSS handles
  everything we need.
