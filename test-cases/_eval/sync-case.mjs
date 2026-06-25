// Re-pull a remote test repo and re-run the analysis for a case — one command.
//   node sync-case.mjs <case-id>
// Reads cases/<id>/meta.json for: repoUrl, branch, subdir, beforeCommit, afterRef.
// Clones/fetches into a gitignored temp, extracts before+after of <subdir>, runs analyze.mjs.
import { existsSync, rmSync, mkdirSync, readFileSync, cpSync } from "node:fs";
import { join, dirname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "../..");
const id = process.argv[2];
if (!id) { console.error("usage: node sync-case.mjs <case-id>"); process.exit(1); }

const caseDir = join(HERE, "cases", id);
const metaPath = join(caseDir, "meta.json");
if (!existsSync(metaPath)) { console.error(`No meta.json for case ${id}`); process.exit(1); }
const meta = JSON.parse(readFileSync(metaPath, "utf8"));

const repoUrl = meta.repoUrl;
const branch = meta.branch || "main";
const subdir = meta.subdir || ".";
const beforeRef = meta.beforeCommit;
const afterRef = meta.afterRef || `origin/${branch}`;
if (!repoUrl || !beforeRef) {
  console.error("meta.json needs repoUrl and beforeCommit (and optionally branch/subdir/afterRef).");
  process.exit(1);
}

const tmp = join(ROOT, `_tmp_eval_${id}`); // _tmp_* is gitignored at repo root
const git = (args, cwd = tmp) => spawnSync("git", args, { cwd, encoding: "utf8", maxBuffer: 1 << 26 });

// 1. clone or update
if (!existsSync(join(tmp, ".git"))) {
  console.log(`cloning ${repoUrl} (${branch})…`);
  const r = spawnSync("git", ["clone", "--branch", branch, repoUrl, tmp], { encoding: "utf8" });
  if (r.status !== 0) { console.error(r.stderr); process.exit(1); }
} else {
  console.log("fetching latest…");
  git(["fetch", "origin", branch]);
  git(["reset", "--hard", `origin/${branch}`]);
}

// 2. extract before + after of the subdir into the case folders
const noVendor = (s) => !s.split(sep).includes("node_modules") && !s.split(sep).includes(".git");
function extract(ref, destName) {
  const dest = join(caseDir, destName);
  rmSync(dest, { recursive: true, force: true });
  mkdirSync(dest, { recursive: true });
  const co = git(["checkout", ref, "--", subdir]);
  if (co.status !== 0) { console.error(`checkout ${ref} ${subdir} failed:\n${co.stderr}`); process.exit(1); }
  const src = subdir === "." ? tmp : join(tmp, subdir);
  cpSync(src, dest, { recursive: true, filter: noVendor });
}
extract(beforeRef, "before");
extract(afterRef, "after");

// 3. capture the current after commit for the record
const head = git(["rev-parse", "--short", afterRef]).stdout.trim();
console.log(`synced: before=${beforeRef}  after=${afterRef} (${head})`);

// 4. re-run analysis
const a = spawnSync("node", [join(HERE, "analyze.mjs"), id], { stdio: "inherit" });
process.exit(a.status ?? 0);
