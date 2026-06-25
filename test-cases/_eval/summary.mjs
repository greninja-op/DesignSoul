// Roll up all eval cases into SUMMARY.md — slop deltas + craft-score deltas + averages.
//   node summary.mjs
import { existsSync, readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const CASES = join(HERE, "cases");
if (!existsSync(CASES)) {
  console.error("No cases/ folder yet. Run new-case.mjs first.");
  process.exit(1);
}

// parse the SCORES block in case.md:
//   <!-- SCORES
//   control: style=, hierarchy=, craft=, functionality=, originality=
//   designsoul: style=, hierarchy=, craft=, functionality=, originality=
//   -->
function parseScores(md) {
  const block = md.match(/<!--\s*SCORES([\s\S]*?)-->/);
  if (!block) return {};
  const out = {};
  for (const line of block[1].split("\n")) {
    const m = line.match(/^\s*(control|designsoul)\s*:\s*(.+)$/i);
    if (!m) continue;
    const who = m[1].toLowerCase();
    const dims = {};
    for (const pair of m[2].split(",")) {
      const kv = pair.match(/([a-z]+)\s*=\s*(\d+(?:\.\d+)?)/i);
      if (kv) dims[kv[1].toLowerCase()] = parseFloat(kv[2]);
    }
    const vals = Object.values(dims);
    if (vals.length) dims._avg = +(vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(2);
    out[who] = dims;
  }
  return out;
}

const rows = [];
for (const id of readdirSync(CASES)) {
  const dir = join(CASES, id);
  if (!statSync(dir).isDirectory()) continue;
  const mPath = join(dir, "metrics.json");
  const cPath = join(dir, "case.md");
  if (!existsSync(mPath)) continue;
  const m = JSON.parse(readFileSync(mPath, "utf8"));
  const scores = existsSync(cPath) ? parseScores(readFileSync(cPath, "utf8")) : {};
  const meta = existsSync(join(dir, "meta.json")) ? JSON.parse(readFileSync(join(dir, "meta.json"), "utf8")) : {};
  rows.push({
    id,
    stack: meta.stack || "",
    style: meta.style || "",
    negBefore: m.before?.negatives._total ?? null,
    negAfter: m.after?.negatives._total ?? null,
    posBefore: m.before?.positives._total ?? null,
    posAfter: m.after?.positives._total ?? null,
    craftControl: scores.control?.craft ?? scores.control?._avg ?? null,
    craftDS: scores.designsoul?.craft ?? scores.designsoul?._avg ?? null,
  });
}

const dash = (v) => (v === null || v === undefined ? "—" : v);
const delta = (a, b) => (a === null || b === null ? "—" : (b - a >= 0 ? `+${b - a}` : `${b - a}`));

let md = `# DesignSoul — Eval Summary\n\n`;
md += `Generated ${new Date().toISOString()} · ${rows.length} case(s).\n\n`;
md += `Each case compares before → after (and a no-skill control where present). "AI-default signals"\n`;
md += `come from the slop scanner; craft scores are your 1–10 ratings from each case's SCORES block.\n\n`;
md += `| Case | Stack | Style | AI-default (before→after) | Δ | Craft (control vs DesignSoul) |\n`;
md += `|---|---|---|---|---|---|\n`;
for (const r of rows) {
  md += `| ${r.id} | ${r.stack} | ${r.style} | ${dash(r.negBefore)} → ${dash(r.negAfter)} | ${delta(r.negBefore, r.negAfter)} | ${dash(r.craftControl)} vs ${dash(r.craftDS)} |\n`;
}

// averages
const nums = (xs) => xs.filter((x) => typeof x === "number");
const avg = (xs) => (nums(xs).length ? +(nums(xs).reduce((a, b) => a + b, 0) / nums(xs).length).toFixed(2) : null);
const negB = avg(rows.map((r) => r.negBefore));
const negA = avg(rows.map((r) => r.negAfter));
const cC = avg(rows.map((r) => r.craftControl));
const cD = avg(rows.map((r) => r.craftDS));

md += `\n## Averages\n\n`;
md += `- AI-default signals: **${dash(negB)} → ${dash(negA)}** per case` +
  (negB !== null && negA !== null ? ` (${delta(negB, negA)})` : "") + `\n`;
md += `- Craft score: control **${dash(cC)}** vs DesignSoul **${dash(cD)}**` +
  (cC !== null && cD !== null ? ` (${delta(cC, cD)})` : "") + `\n`;
md += `\n> A valid claim needs the control column filled (same prompt, same model, no skill) on enough cases (~8–12).\n`;

writeFileSync(join(HERE, "SUMMARY.md"), md);
console.log(`Wrote SUMMARY.md (${rows.length} case(s)).`);
if (cC === null || cD === null) console.log("Tip: fill the SCORES blocks (and run control cases) for a valid craft comparison.");
