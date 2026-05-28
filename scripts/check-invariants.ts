/**
 * check-invariants — CI guard against Nexus-web's §1 invariants.
 *
 * Greps the source tree for:
 *   - third-party analytics / chat-widget hosts
 *   - Google Fonts / external font CDNs
 *   - hardcoded API-key-shaped tokens
 *   - imports of disallowed analytics packages
 *
 * Exits with code 1 if any hit is found.
 */

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const SCAN_DIRS = ["src", "public", "scripts", "docs"];
const SKIP_DIR = new Set([
  "node_modules",
  ".next",
  ".vercel",
  "out",
  "build",
  "dist",
  ".git",
]);
const SCAN_EXT = /\.(ts|tsx|mts|mjs|js|jsx|json|md|mdx|css|html|svg|ya?ml)$/i;

interface Rule {
  name: string;
  /** Regex applied per-line. */
  pattern: RegExp;
  /** Files whose relative path matches are exempt (e.g. this script itself,
   *  documentation that LISTS the forbidden hosts). */
  exemptPath?: RegExp;
}

const rules: Rule[] = [
  {
    name: "Google Analytics / GTAG",
    pattern: /\b(googletagmanager\.com|google-analytics\.com|gtag\()/,
  },
  {
    name: "Plausible (script form)",
    pattern: /plausible\.io\/js\//,
  },
  {
    name: "Mixpanel",
    pattern: /\b(api\.mixpanel\.com|mixpanel-browser|mixpanel\.init)\b/,
  },
  {
    name: "Segment",
    pattern: /\b(cdn\.segment\.com|analytics\.js|window\.analytics\.load)\b/,
  },
  {
    name: "Hotjar",
    pattern: /\b(hotjar\.com|hjbootstrap|_hjSettings)\b/,
  },
  {
    name: "Intercom",
    pattern: /\b(intercom-cdn\.com|widget\.intercom\.io|window\.Intercom)\b/,
  },
  {
    name: "Crisp",
    pattern: /\b(client\.crisp\.chat|\$crisp)\b/,
  },
  {
    name: "Google Fonts",
    pattern: /fonts\.(googleapis|gstatic)\.com/,
  },
  {
    name: "next/font/google import",
    pattern: /from\s+["']next\/font\/google["']/,
  },
  {
    name: "Vercel Analytics client component",
    pattern: /from\s+["']@vercel\/analytics\/react["']/,
  },
  {
    name: "Hardcoded Anthropic key",
    pattern: /sk-ant-[A-Za-z0-9_-]{20,}/,
  },
  {
    name: "Hardcoded OpenAI key",
    pattern: /\bsk-[A-Za-z0-9]{40,}\b/,
  },
  {
    name: "Hardcoded Deepgram key",
    pattern: /\b(dg|deepgram)_[A-Za-z0-9]{30,}\b/i,
  },
];

interface Hit {
  rule: string;
  file: string;
  line: number;
  excerpt: string;
}

function* walk(dir: string): Generator<string> {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (SKIP_DIR.has(entry)) continue;
    const s = statSync(full);
    if (s.isDirectory()) {
      yield* walk(full);
    } else if (SCAN_EXT.test(full)) {
      yield full;
    }
  }
}

const SELF_PATH = relative(ROOT, __filename).replace(/\\/g, "/");

function shouldExempt(rule: Rule, relPath: string): boolean {
  if (relPath === SELF_PATH) return true; // This file lists the forbidden strings.
  if (rule.exemptPath && rule.exemptPath.test(relPath)) return true;
  return false;
}

const hits: Hit[] = [];

for (const dir of SCAN_DIRS) {
  const abs = join(ROOT, dir);
  try {
    statSync(abs);
  } catch {
    continue; // dir may not exist (public/ etc.)
  }
  for (const file of walk(abs)) {
    const rel = relative(ROOT, file).replace(/\\/g, "/");
    const text = readFileSync(file, "utf8");
    const lines = text.split(/\r?\n/);
    for (const rule of rules) {
      if (shouldExempt(rule, rel)) continue;
      for (let i = 0; i < lines.length; i++) {
        const ln = lines[i] ?? "";
        if (rule.pattern.test(ln)) {
          hits.push({
            rule: rule.name,
            file: rel,
            line: i + 1,
            excerpt: ln.trim().slice(0, 120),
          });
        }
      }
    }
  }
}

if (hits.length === 0) {
  console.log("✓ check-invariants: 0 hits across", SCAN_DIRS.join(", "));
  process.exit(0);
}

console.error("✗ check-invariants: forbidden pattern(s) found:\n");
for (const h of hits) {
  console.error(`  [${h.rule}]`);
  console.error(`    ${h.file}:${h.line}`);
  console.error(`    ${h.excerpt}`);
}
console.error(
  `\n${hits.length} violation${hits.length === 1 ? "" : "s"}. See CLAUDE.md §1.`,
);
process.exit(1);
