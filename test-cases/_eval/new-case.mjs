// Scaffold a new eval case folder.
//   node new-case.mjs <case-id>
// Creates cases/<id>/ with before/ after/ control/ screenshots/ + meta.json + case.md
import { existsSync, mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const id = process.argv[2];
if (!id || !/^[a-z0-9][a-z0-9-_]*$/i.test(id)) {
  console.error('usage: node new-case.mjs <case-id>   (letters, numbers, - and _ only)');
  process.exit(1);
}
const caseDir = join(HERE, "cases", id);
if (existsSync(caseDir)) {
  console.error(`Case already exists: ${caseDir}`);
  process.exit(1);
}
for (const sub of ["before", "after", "control", "screenshots"]) {
  mkdirSync(join(caseDir, sub), { recursive: true });
  writeFileSync(join(caseDir, sub, ".gitkeep"), "");
}

const meta = {
  id,
  createdAt: new Date().toISOString(),
  editor: "",            // e.g. cursor / kiro / claude-code
  model: "",             // e.g. claude-opus-4.x  (keep SAME for control + treatment)
  stack: "",             // e.g. html-css / react-next / tailwind / vue
  style: "",             // named style requested, or "make it not look AI-generated"
  prompt: "",            // the exact prompt you gave the agent
  mentionedSkill: false, // false = test auto-trigger; true = you named DesignSoul
  agentConsultedSkill: null, // fill true/false: did it open SKILL.md/references before editing?
  notes: "",
};
writeFileSync(join(caseDir, "meta.json"), JSON.stringify(meta, null, 2) + "\n");

const template = readFileSync(join(HERE, "template", "case.md"), "utf8")
  .replaceAll("{{ID}}", id)
  .replaceAll("{{DATE}}", new Date().toISOString().slice(0, 10));
writeFileSync(join(caseDir, "case.md"), template);

console.log(`Created case: ${caseDir}`);
console.log(`Next:
  1. Put the ORIGINAL code in     cases/${id}/before/   (+ before screenshots in screenshots/)
  2. Put the DesignSoul result in cases/${id}/after/    (+ after screenshots)
  3. (optional, for a fair A/B)   cases/${id}/control/  = same prompt WITHOUT the skill
  4. Fill prompt/model/stack in   cases/${id}/meta.json
  5. Run:  node analyze.mjs ${id}    (records diff + slop metrics into case.md)
  6. Score craft 1-10 in           cases/${id}/case.md  (the SCORES block)
  7. Roll up everything:  node summary.mjs`);
