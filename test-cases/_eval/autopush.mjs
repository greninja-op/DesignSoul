// autopush.mjs — COPY THIS INTO YOUR TEST PROJECT'S ROOT, then run:  node autopush.mjs
//
// Auto-commits + pushes whenever >= THRESHOLD files have changed, so the DesignSoul eval
// can just `git pull` your before/after. Zero dependencies (Node + git only).
// (This file lives in DesignSoul only so it's versioned — it runs in your TEST project.)
//
// ── One-time setup in your test project ──────────────────────────────────────
//   git init
//   git add -A && git commit -m "before: original AI-generated UI"   <- this is your "before"
//   git branch -M main
//   git remote add origin <your-test-repo-url>
//   git push -u origin main
// Then run this watcher and start the DesignSoul conversion. Every batch of changes gets pushed.
//
// ── Optional config (env vars) ───────────────────────────────────────────────
//   DS_THRESHOLD  min changed files before a push   (default 1)
//   DS_INTERVAL   poll interval in ms               (default 8000)
//   e.g. (PowerShell):  $env:DS_THRESHOLD=3; node autopush.mjs
import { spawnSync } from "node:child_process";

const THRESHOLD = Number(process.env.DS_THRESHOLD || 1);
const INTERVAL = Number(process.env.DS_INTERVAL || 8000);

const git = (args) => spawnSync("git", args, { encoding: "utf8" });
const changedCount = () => {
  const r = git(["status", "--porcelain"]);
  return r.status !== 0 ? -1 : r.stdout.split("\n").filter((l) => l.trim()).length;
};

if (git(["rev-parse", "--is-inside-work-tree"]).status !== 0) {
  console.error("Not a git repo here. Do the one-time setup at the top of this file first.");
  process.exit(1);
}
if (!git(["remote"]).stdout.trim()) {
  console.error("No git remote set. Run: git remote add origin <your-test-repo-url>");
  process.exit(1);
}

console.log(
  `autopush: watching this repo. Pushes when >= ${THRESHOLD} file(s) change ` +
    `(checked every ${INTERVAL / 1000}s). Press Ctrl+C to stop.`
);

let busy = false;
setInterval(() => {
  if (busy) return;
  const n = changedCount();
  if (n < THRESHOLD) return;
  busy = true;
  const stamp = new Date().toISOString();
  git(["add", "-A"]);
  const c = git(["commit", "-m", `eval snapshot ${stamp} (${n} file(s))`]);
  if (c.status === 0) {
    const p = git(["push"]);
    console.log(
      p.status === 0
        ? `✓ pushed ${n} file(s) @ ${stamp}`
        : `commit ok but push failed:\n${p.stderr}`
    );
  }
  busy = false;
}, INTERVAL);
