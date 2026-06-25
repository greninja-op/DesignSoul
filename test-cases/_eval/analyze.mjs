// Analyze one eval case: capture the before->after code diff and scan slop/craft signals,
// then write metrics.json and inject the auto sections into case.md.
//   node analyze.mjs <case-id>
import { existsSync, writeFileSync, readFileSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import { scanDir } from "./slop-scan.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const id = process.argv[2];
if (!id) {
  console.error("usage: node analyze.mjs <case-id>");
  process.exit(1);
}
const caseDir = join(HERE, "cases", id);
if (!existsSync(caseDir)) {
  console.error(`No such case: ${caseDir}`);
  process.exit(1);
}
const before = join(caseDir, "before");
const after = join(caseDir, "after");
const control = join(caseDir, "control");

// --- metrics ---
const metrics = {
  id,
  generatedAt: new Date().toISOString(),
  before: scanDir(before),
  after: scanDir(after),
  control: scanDir(control),
};
writeFileSync(join(caseDir, "metrics.json"), JSON.stringify(metrics, null, 2) + "\n");

// --- diff (git --no-index works without a repo; exit code 1 just means "differs") ---
function gitDiff(a, b, extraArgs = []) {
  if (!existsSync(a) || !existsSync(b)) return null;
  const r = spawnSync("git", ["diff", "--no-index", ...extraArgs, a, b], {
    encoding: "utf8",
    maxBuffer: 1024 * 1024 * 128,
  });
  return r.stdout ?? "";
}
const patch = gitDiff(before, after);
if (patch !== null) writeFileSync(join(caseDir, "diff.patch"), patch);
const stat = gitDiff(before, after, ["--stat"]) || "(no before/after to diff yet)";

// --- render helpers ---
function fmtSignals(scan) {
  if (!scan) return "_(folder empty)_";
  const neg = scan.negatives, pos = scan.positives, neu = scan.neutral;
  const negLines = Object.entries(neg)
    .filter(([k, v]) => k !== "_total" && v > 0)
    .map(([k, v]) => `${k} ×${v}`)
    .join(", ") || "none";
  const posLines = Object.entries(pos)
    .filter(([k, v]) => k !== "_total" && v > 0)
    .map(([k, v]) => `${k} ×${v}`)
    .join(", ") || "none";
  return `**${scan.fileCount} files** · AI-default signals **${neg._total}** (${negLines}) · craft signals **${pos._total}** (${posLines}) · ${neu.hardcoded_hex_colors} hardcoded hex, ${neu.media_queries} @media`;
}
const negOf = (s) => (s ? s.negatives._total : "—");
const posOf = (s) => (s ? s.positives._total : "—");

const metricsMd = `| Version | Files | AI-default signals (↓ better) | Craft signals (↑ better) | Hardcoded hex |
|---|---|---|---|---|
| before | ${metrics.before?.fileCount ?? "—"} | ${negOf(metrics.before)} | ${posOf(metrics.before)} | ${metrics.before?.neutral.hardcoded_hex_colors ?? "—"} |
| control (no skill) | ${metrics.control?.fileCount ?? "—"} | ${negOf(metrics.control)} | ${posOf(metrics.control)} | ${metrics.control?.neutral.hardcoded_hex_colors ?? "—"} |
| **after (DesignSoul)** | ${metrics.after?.fileCount ?? "—"} | ${negOf(metrics.after)} | ${posOf(metrics.after)} | ${metrics.after?.neutral.hardcoded_hex_colors ?? "—"} |

- before: ${fmtSignals(metrics.before)}
- control: ${fmtSignals(metrics.control)}
- after: ${fmtSignals(metrics.after)}

_Generated ${metrics.generatedAt}. Signals are heuristic proxies, not a verdict — pair with the screenshots and the craft scores below._`;

const diffMd = "```\n" + stat.trim() + "\n```\n_Full patch: `diff.patch` (gitignored by default)._";

// --- inject into case.md between markers ---
const caseMdPath = join(caseDir, "case.md");
let md = readFileSync(caseMdPath, "utf8");
function inject(text, name, body) {
  const re = new RegExp(`(<!-- AUTO:${name} -->)[\\s\\S]*?(<!-- /AUTO:${name} -->)`, "g");
  if (!re.test(text)) {
    console.warn(`(case.md missing AUTO:${name} markers — skipping injection)`);
    return text;
  }
  return text.replace(re, `$1\n${body}\n$2`);
}
md = inject(md, "METRICS", metricsMd);
md = inject(md, "DIFFSTAT", diffMd);
writeFileSync(caseMdPath, md);

console.log(`Analyzed ${id}:`);
console.log(`  before  → ${negOf(metrics.before)} AI-default / ${posOf(metrics.before)} craft signals`);
if (metrics.control) console.log(`  control → ${negOf(metrics.control)} AI-default / ${posOf(metrics.control)} craft signals`);
console.log(`  after   → ${negOf(metrics.after)} AI-default / ${posOf(metrics.after)} craft signals`);
console.log(`Wrote metrics.json, diff.patch, and updated case.md. Now fill the craft SCORES in case.md.`);
