// DesignSoul slop scanner.
// Scans a directory of frontend code and counts AI-default "slop" signals (fewer = better)
// and craft signals (more = better). Used by the eval harness (analyze.mjs) to record
// objective before/after metrics automatically — and usable standalone as a slop detector:
//   node slop-scan.mjs <dir>
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const CODE_EXT = new Set([
  ".css", ".scss", ".sass", ".less",
  ".html", ".htm", ".jsx", ".tsx", ".js", ".ts", ".vue", ".svelte", ".astro",
]);
// Style-context files: where a primary-color hex is a real styling tell (vs a data/chart value in JS).
const STYLE_EXT = new Set([".css", ".scss", ".sass", ".less", ".html", ".htm", ".vue", ".svelte", ".astro"]);
const SKIP_DIR = new Set([
  "node_modules", ".git", "dist", "build", ".next", "out",
  ".svelte-kit", ".nuxt", "coverage", ".turbo", ".cache",
]);
// Non-app files: debug/test/story/minified/mock — exclude so they don't pollute the signal.
const SKIP_FILE = /(?:^|[.\-_/])(?:debug|mock)|\.(?:min|test|spec|stories)\./i;

// Negative = AI-default tells. Lower is better. 3rd entry "style" = only count in style-context files.
const NEGATIVE = [
  ["default_blue_3B82F6", /#3b82f6\b/gi, "style"],
  ["uniform_radius_8px", /border-radius:\s*8px\b/gi],
  ["default_card_shadow", /box-shadow:\s*0(?:px)?\s+2px\s+4px\s+rgba\(\s*0\s*,\s*0\s*,\s*0\s*,\s*0?\.1\s*\)/gi],
  ["transition_all", /transition:\s*all\b/gi],
  ["inter_font_only", /font-family[^;{}]*\bInter\b/gi],
  ["outline_none", /outline:\s*none\b/gi],
  ["scale_hover_1_05", /scale\(\s*1\.0?5\s*\)/gi],
];
// Positive = craft signals. Higher is better.
const POSITIVE = [
  ["css_tokens_var", /var\(\s*--/g],
  ["focus_visible", /:focus-visible/gi],
  ["reduced_motion", /prefers-reduced-motion/gi],
  ["aria_attrs", /\baria-[a-z-]+/gi],
  ["modern_css", /\b(?:clamp|minmax|container-type|color-mix)\s*\(|:has\(/gi],
];
// Neutral = context counts (not scored, but informative).
const NEUTRAL = [
  ["hardcoded_hex_colors", /#[0-9a-fA-F]{3,8}\b/g],
  ["media_queries", /@media\b/gi],
];

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    if (SKIP_DIR.has(name)) continue;
    const p = join(dir, name);
    let s;
    try { s = statSync(p); } catch { continue; }
    if (s.isDirectory()) walk(p, files);
    else if (CODE_EXT.has(extname(name).toLowerCase()) && !SKIP_FILE.test(p.split(sep).join("/"))) {
      files.push(p);
    }
  }
  return files;
}

function countGroups(items, groups) {
  const out = {};
  for (const [label] of groups) out[label] = 0;
  for (const { ext, text } of items) {
    for (const [label, re, scope] of groups) {
      if (scope === "style" && !STYLE_EXT.has(ext)) continue; // skip data-context files for style-only tells
      const m = text.match(re);
      if (m) out[label] += m.length;
    }
  }
  out._total = Object.values(out).reduce((a, b) => a + b, 0);
  return out;
}

export function scanDir(dir) {
  if (!dir || !existsSync(dir)) return null;
  const files = walk(dir);
  const items = files.map((f) => {
    let text = "";
    try { text = readFileSync(f, "utf8"); } catch { /* ignore */ }
    return { ext: extname(f).toLowerCase(), text };
  });
  return {
    dir,
    fileCount: files.length,
    negatives: countGroups(items, NEGATIVE),
    positives: countGroups(items, POSITIVE),
    neutral: countGroups(items, NEUTRAL),
  };
}

// CLI
const isCLI =
  process.argv[1] && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url));
if (isCLI) {
  const target = process.argv[2] || ".";
  const r = scanDir(target);
  if (!r) {
    console.error(`No such directory: ${target}`);
    process.exit(1);
  }
  console.log(`Scanned ${r.fileCount} code files in ${r.dir} (debug/test/mock/min files excluded)`);
  console.log(`\nAI-default signals (lower = better): ${r.negatives._total}`);
  for (const [k, v] of Object.entries(r.negatives)) if (k !== "_total") console.log(`  ${k}: ${v}`);
  console.log(`\nCraft signals (higher = better): ${r.positives._total}`);
  for (const [k, v] of Object.entries(r.positives)) if (k !== "_total") console.log(`  ${k}: ${v}`);
  console.log(`\nContext: ${r.neutral.hardcoded_hex_colors} hardcoded hex, ${r.neutral.media_queries} @media`);
  console.log(`\nNote: heuristic. 'default_blue' counts hex only in CSS/markup (not JS data/chart arrays);`);
  console.log(`'inter_font_only' flags Inter usage — fine if it's a deliberate pairing. Triage before judging.`);
}
