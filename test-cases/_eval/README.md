# DesignSoul Eval Harness

Prove the skill actually works — with recorded before/after evidence instead of vibes. You drop in
the code and screenshots; the scripts auto-capture the **code diff** and **slop/craft metrics**, and
roll everything into a summary. Zero dependencies (Node + git only).

## The one rule for a valid test
Run each case **twice on the same starting code, same prompt, same model**: once **without**
DesignSoul (the *control*) and once **with** it (the *after*). The gap between them is your evidence.
A single nice result proves nothing; a consistent delta across ~8–12 cases does.

## Workflow

```bash
cd test-cases/_eval

# 1. Scaffold a case
node new-case.mjs my-landing-page          # or: npm run new -- my-landing-page

# 2. Fill the folders it created (cases/my-landing-page/):
#    before/    = the original AI-generated code   (+ before screenshots in screenshots/)
#    after/     = the DesignSoul-converted code     (+ after screenshots)
#    control/   = same prompt WITHOUT the skill     (+ control screenshots)   [optional but recommended]
#    meta.json  = prompt, model, stack, style, whether you mentioned DesignSoul

# 3. Auto-record diff + metrics into case.md
node analyze.mjs my-landing-page           # or: npm run analyze -- my-landing-page

# 4. Open cases/my-landing-page/case.md, add screenshots + craft scores (1-10) in the SCORES block

# 5. Roll up every case
node summary.mjs                            # writes SUMMARY.md
```

## What's automated vs manual
| Automated (scripts) | Manual (you) |
|---|---|
| before→after code diff (`diff.patch`) | grab screenshots (before/control/after) |
| AI-default "slop" signal counts | the 1–10 craft scores (SCORES block) |
| craft-signal counts (tokens, focus-visible, aria…) | tick the anti-pattern / method checklists |
| per-case table + cross-case averages (`SUMMARY.md`) | failure notes (the gold for improving the skill) |

## Standalone slop detector
`slop-scan.mjs` works on any folder, no case needed:
```bash
node slop-scan.mjs ../../some-project/src
```
It counts AI-default tells (default blue, uniform 8px radius, `0 2px 4px` shadow, `transition: all`,
Inter-only, `outline:none`, `scale(1.05)` hover) and craft signals (CSS tokens, `:focus-visible`,
reduced-motion, aria, modern CSS). Heuristic, not a verdict — but a fast objective signal.

## Auto-push your test project (so the eval can just pull it)
Want the test project's changes to land on GitHub automatically so you only hand over a repo link?
Copy `autopush.mjs` into your **test project's** root and run it there:

```bash
# one-time, in your test project:
git init
git add -A && git commit -m "before: original AI-generated UI"   # this commit = your "before"
git branch -M main
git remote add origin <your-test-repo-url>
git push -u origin main

# then leave this running while the agent converts the UI:
node autopush.mjs                 # pushes whenever >= 1 file changed
# or batch it:  (PowerShell)  $env:DS_THRESHOLD=3; node autopush.mjs
```

Now every batch of changes is committed + pushed. Hand over the **repo URL + the first ("before")
commit and the latest ("after") commit** — the eval clones it, diffs `before..after`, and ingests
both into a case automatically. (Editor-hook alternative: a `fileEdited` hook that runs
`git add -A; git commit -m wip; git push` does the same thing without a running process.)

## Version every iteration (so you can always return to the best one)
Design iteration is **not monotonic** — a later pass can be worse. Commit (or auto-commit) **each
iteration as its own commit**, ideally with a label, so you can always go back to the one you liked:
```
git add -A && git commit -m "iter2: clean dashboard (the good one)"
```
To resume from a previous iteration, **restore its code first** (the agent edits the current working
tree, not a screenshot): `git checkout <iter-commit> -- <path>`. Tip: layout and background usually
live in different files (page component vs `index.css`), so you can mix "iter-2 layout + iter-4
background" by checking out only the page file and keeping the current global styles. If iterations
weren't committed separately, an overwritten version is gone — only the screenshots survive.

## Continuous re-testing (one command, on demand)
Once a case has a `meta.json` with `repoUrl` / `branch` / `subdir` / `beforeCommit` / `afterRef`,
re-pull the live repo and re-score with a single command:

```bash
node sync-case.mjs portal-glass     # clones/fetches the repo, re-extracts before+after, re-runs analyze
```

It clones into a gitignored `_tmp_eval_<id>/`, resets to the latest branch tip, copies the `subdir`
at `beforeCommit` → `before/` and at `afterRef` → `after/`, then runs `analyze.mjs`. So whenever the
test repo changes, one command brings the eval up to date — no manual copying.

**Prompt to keep the test repo auto-pushing** (paste in the *test project's* agent, once):
> Set up continuous auto-push: create a hook (or run autopush.mjs) that, on every save / at the end
> of each change, stages all changes, commits with a timestamped message, and `git push` to the
> current branch's remote. Don't touch git config or force-push. Confirm it's active.

With that running on their side and `sync-case.mjs` on ours, the loop is: they edit → it auto-pushes
→ I run `sync-case.mjs <id>` → fresh metrics + diff + scorecard.

## Privacy / git
By default the raw case material — `before/`, `after/`, `control/`, `screenshots/`, and `diff.patch`
— is **gitignored** (it's your throwaway code, possibly large or private). The lightweight evidence
(`meta.json`, `case.md`, `metrics.json`, `SUMMARY.md`) is tracked so the benchmark accrues in the
repo. Un-ignore the raw folders in the root `.gitignore` if you want to publish full cases.
