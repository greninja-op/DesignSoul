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

## Privacy / git
By default the raw case material — `before/`, `after/`, `control/`, `screenshots/`, and `diff.patch`
— is **gitignored** (it's your throwaway code, possibly large or private). The lightweight evidence
(`meta.json`, `case.md`, `metrics.json`, `SUMMARY.md`) is tracked so the benchmark accrues in the
repo. Un-ignore the raw folders in the root `.gitignore` if you want to publish full cases.
