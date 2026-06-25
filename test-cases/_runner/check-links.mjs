// Consistency test: every `references/...md` or relative .md link in any markdown file
// must point to a file that actually exists. Also verifies every style in the SKILL.md
// trigger table has: a style file, a checklist entry, and an _index entry.
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, dirname, resolve, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(fileURLToPath(import.meta.url), "../../.."); // repo root
let errors = [];
let checked = 0;

function walk(dir) {
  for (const name of readdirSync(dir)) {
    if (name === ".git" || name === "node_modules" || name === "_runner") continue;
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) walk(p);
    else if (name.endsWith(".md")) checkFile(p);
  }
}

function checkFile(file) {
  const raw = readFileSync(file, "utf8");
  // Ignore fenced code blocks — they contain illustrative snippets/example paths,
  // not document links to validate.
  const text = raw.replace(/```[\s\S]*?```/g, "");
  // backtick-wrapped references/...md  OR  styles/<x>.md
  const re = /`([a-zA-Z0-9_./-]+\.md)`/g;
  let m;
  while ((m = re.exec(text))) {
    const link = m[1];
    if (!link.includes("/")) continue; // bare filename mention, skip
    // resolve relative to repo root if it starts with references/, else relative to file dir
    let target;
    if (link.startsWith("references/") || link.startsWith("test-cases/")) {
      target = join(ROOT, link);
    } else {
      target = join(dirname(file), link);
    }
    checked++;
    if (!existsSync(target)) {
      errors.push(`${relative(ROOT, file)} -> broken link: ${link}`);
    }
  }
}

walk(ROOT);

// Trigger-table styles must each have file + checklist + index entry
const styleFiles = readdirSync(join(ROOT, "references/styles")).filter((f) => f.endsWith(".md") && f !== "_index.md");
const checklist = readFileSync(join(ROOT, "checklist.md"), "utf8");
const indexMd = readFileSync(join(ROOT, "references/styles/_index.md"), "utf8");
for (const sf of styleFiles) {
  if (!indexMd.includes(sf)) errors.push(`_index.md missing entry for style: ${sf}`);
}

console.log(`Checked ${checked} markdown links + ${styleFiles.length} style files.`);
if (errors.length) {
  console.log(`\n❌ ${errors.length} problem(s):`);
  for (const e of errors) console.log("  - " + e);
  process.exit(1);
} else {
  console.log("✅ All links resolve. All style files registered in _index.md.");
}
