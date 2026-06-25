# Static Design Audit: Catching Slop in the Source

`verification.md` looks at rendered pixels (needs a browser). `critique.md` scores aesthetic
quality (needs judgment). This is the third lens: a **mechanical scan of the source code** for
design problems you can detect without rendering anything. It's fast, works with no browser, and
is ideal for reviewing a diff or auditing an existing frontend.

> Calibrate everything against the project's `DESIGN.md` (see `design-system-doc.md`). A pattern
> the design system documents as intentional is **not** a finding. With no `DESIGN.md`, fall back
> to universal principles.

---

## Scope gate

Only run this when frontend files changed (`.css`, `.scss`, `.tsx/.jsx/.vue/.svelte`, HTML,
`tailwind.config`). If the diff has no frontend, skip silently — don't manufacture findings.

---

## Confidence tiers

Tag every finding so the user knows how much to trust it:

- **[HIGH]** — reliably detectable by grep/pattern. Definitive.
- **[MEDIUM]** — detectable by aggregation/heuristic. Real, but expect some noise.
- **[LOW]** — needs visual intent to confirm. Present as "Possible — verify visually / render it."

---

## Classification: auto-fix vs ask

**AUTO-FIX** — mechanical, no design judgment, HIGH confidence only:
- `outline: none` / `outline: 0` with no replacement → add `:focus-visible { outline: 2px solid currentColor }`
- `!important` in new CSS → remove and fix the specificity properly
- body/`p` `font-size` < 16px → raise to 16px

**ASK** — everything requiring taste or trade-offs: AI-slop findings, type structure, spacing
choices, missing interaction states, `DESIGN.md` violations. Recommend a fix; let the user decide.

**LOW-confidence items are never auto-fixed** — always presented as "possible, verify."

---

## What to scan for

### AI-slop signals (highest priority)
- **[MEDIUM]** Purple/violet/indigo gradient backgrounds or blue→purple schemes — `linear-gradient` with hexes in the `#6366f1`–`#8b5cf6` range, or tokens resolving to violet.
- **[LOW]** The symmetric 3-up feature grid: a container with exactly 3 children each = circle-icon + bold title + 2-line description.
- **[LOW]** Icons inside colored circles (`border-radius: 50%` + bg) used as decoration.
- **[HIGH]** Centered-everything — if >60% of text containers use `text-align: center`, flag it.
- **[MEDIUM]** Uniform bubbly radius — if >80% of elements share the same radius ≥16px, flag it.
- **[MEDIUM]** Generic hero copy — "Welcome to…", "Unlock the power of…", "Your all-in-one solution…", "Revolutionize…", "Streamline your workflow."

### Typography
- **[HIGH]** Body `font-size` < 16px.
- **[HIGH]** More than 3 `font-family` families introduced.
- **[HIGH]** Heading levels skipped (`h1` → `h3` with no `h2`).
- **[HIGH]** Blacklisted display fonts used as primary (Papyrus, Comic Sans, Impact, etc.).

### Spacing & layout
- **[MEDIUM]** Spacing values off the project's scale (only when `DESIGN.md` defines one).
- **[MEDIUM]** Fixed `width: NNNpx` on containers with no `max-width`/breakpoint → mobile overflow risk.
- **[MEDIUM]** Text containers with no `max-width` → lines run past ~75 characters.
- **[HIGH]** `!important` in new CSS.

### Interaction states
- **[MEDIUM]** Interactive elements (button/link/input) with no `:hover` and no `:focus-visible`.
- **[HIGH]** `outline: none`/`0` with no replacement focus indicator (keyboard a11y break).
- **[LOW]** Touch targets under 44px (hard to confirm from code alone).

### DESIGN.md violations (only if it exists)
- **[MEDIUM]** Colors not in the documented palette.
- **[MEDIUM]** Fonts not in the documented type list.
- **[MEDIUM]** Spacing off the documented scale.

---

## Don't flag (suppressions)

- Patterns documented as intentional in `DESIGN.md`
- Third-party/vendor CSS (node_modules, vendor dirs)
- CSS resets / normalize
- Test fixtures
- Generated/minified CSS

---

## Output format

```
Design Audit: N issues (X auto-fixable, Y need input, Z possible)

AUTO-FIXED
- [file:line] problem → fix applied

NEEDS INPUT
- [file:line] problem
  Recommended: <fix>

POSSIBLE (verify visually)
- [file:line] possible issue — confirm by rendering / running the visual loop
```

If nothing frontend changed: produce no output. If frontend changed but is clean:
`Design Audit: no issues found.`

---

## How this fits the three review lenses

| Lens | File | Needs | Catches |
|---|---|---|---|
| Static audit | `code-audit.md` | nothing (reads source) | mechanical slop, a11y breaks, DESIGN.md drift |
| Visual verification | `verification.md` | a browser | overflow, contrast, real rendered layout |
| Scored critique | `critique.md` | judgment | hierarchy, craft, originality — "does it look AI-made" |

Run the static audit first (cheap, no setup), then verify visually, then critique. Together they
cover code, pixels, and taste.
