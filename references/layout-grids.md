# Layout, Grids & Spacing

Structure is invisible when it's right and glaring when it's wrong. A grid is the skeleton that
makes elements line up, spacing feel rhythmic, and a layout read as "designed" rather than
"placed." AI-default UI tends to use arbitrary margins and one-off paddings, which is a quiet but
constant tell — nothing quite lines up, gaps feel random.

This file is the system for *where things go* and *how much space sits between them*. Read it when
laying out a page or building any multi-element component.

> The spacing token scale in `SKILL.md` Step 2 is the vocabulary; this file is the grammar — how
> to apply it so a layout has structure, alignment, and rhythm.

---

## Column Grids (the page-level skeleton)

A grid divides the canvas into **columns** separated by **gutters**, with **margins** on the
outer edges. (The cell where a column meets a row is a **module**.) Content snaps to columns, so
everything aligns and responsive behavior becomes predictable.

- **Use 12 columns by default** for web. 12 divides cleanly into 2, 3, 4, and 6 — maximum layout
  flexibility. 8 columns is fine for simpler pages. **Avoid 5, 7, 11** (prime — won't split evenly).
- **Gutters:** ~16–24px on web is a safe range. Smaller gutters = denser; larger = airier.
- **Margins:** the outer breathing room. Too-small margins are a common reason a layout "looks
  cheap." Be generous on large screens.

**Fluid vs fixed — pick by content:**
- **Fluid grid** — column widths grow/shrink with the viewport; gutters and margins stay fixed.
  The default for responsive marketing pages and dashboards where content should fill the space.
- **Fixed grid** — columns stay a set width; margins absorb the extra space. Use for **forms and
  long-form articles** — a login form or paragraph stretched across a 1440px monitor is unusable.
  Cap the content width and center it. (Optimal reading measure is ~50–75 characters per line.)

> Rule of thumb: content people *read or fill in* (articles, forms) wants a fixed max width;
> content people *scan or browse* (galleries, dashboards) can go fluid.

---

## The 8pt System (the component-level skeleton)

Within and between components, space everything in multiples of a base unit. (The full spacing
system — the 4pt base, the 9-token scale with a job for each token, the gap/rhythm rules, and the
junior-vs-senior tells — lives in `spacing.md`; this section is the layout-level summary.) Most screens and
device sizes are divisible by 8, so an **8pt system** (8, 16, 24, 32, 40, 48…) keeps spacing
consistent and snaps cleanly to pixels. For dense mobile UI, a **4pt** base gives finer control.

- **Hard grid:** every dimension *and* gap snaps to the unit. Rigid, precise, harder to work in.
- **Soft grid (recommended):** element sizes are free, but every *gap, margin, and padding* comes
  from the scale. You get consistent rhythm without fighting the grid. This is what most teams use.

Build the scale once and treat it as law (it's the spacing tokens from `SKILL.md` Step 2):

```
4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96
```

Every gap in the UI is a value from this scale — never a one-off `13px` or `27px`. If you keep
needing a value *between* two steps, your base unit is wrong; don't just sprinkle odd numbers.

---

## Alignment & Rhythm

- **Align everything to the grid.** Aligned edges read as intentional; stray ones read as bugs
  (see `visual-hierarchy.md` → alignment).
- **Align text by its baseline, not its bounding box.** When two text elements of different sizes
  sit on one line (e.g. a section title next to an "Add" link), align their first-line baselines —
  centering them looks subtly off. Most layout tools and CSS (`align-items: baseline`) support this.
- **Proximity encodes grouping.** Intra-group spacing tighter than inter-group spacing. A field
  label sits closer to its own input than to the field above it, or it reads as belonging to the
  wrong one. This single habit fixes a huge share of "messy" forms.
- **Symmetry reads as calmer/cleaner; asymmetry as more dynamic.** Break alignment only on
  purpose, for emphasis.

---

## Mobile Layout

Column grids are overkill on phones. Two steps cover most mobile layout:

1. **Set safe margins** — 16–24px on each edge, kept clear of content (the "safe space").
   **Never let text or controls touch the screen edge** — it looks broken and is hard to read.
   (System edges/notches/home-indicator areas need clearance too.)
2. **Space with a 4pt soft grid** — every gap from the scale, nothing arbitrary.

If you need columns on mobile, use 2 (occasionally 4), not 12.

---

## Optimal Line Length & Density

- **Body text: ~50–75 characters per line** (~45–75). Wider tires the eye on the return sweep;
  narrower fragments reading. On wide screens, cap text-block width — don't let paragraphs run the
  full viewport. (`text-wrap`, `max-width: 65ch` — see `modern-css.md`.)
- **Don't shrink type to cram content.** 16px is the practical floor for body/inputs. Cramming is
  a hierarchy and friction problem, not a space win (see `ux-laws.md`).

---

## Responsive Behavior

- Design **mobile-first**: start at the smallest screen (forces ruthless prioritization), then
  add columns and space as the viewport grows — not the reverse.
- Use **more than one breakpoint.** `@media (max-width: 768px)` as the *only* breakpoint is an
  anti-pattern (see `anti-patterns.md`). Let the grid reflow (e.g. 4→2→1 columns) at natural
  content break points, not arbitrary device widths.
- Prefer intrinsic/fluid sizing (`minmax()`, `clamp()`, container queries) so layout adapts to
  *content and container*, not just viewport (see `modern-css.md`).

---

## Checklist

- [ ] Page sits on a real grid (12-col web default; 8/2-col where simpler), not eyeballed placement
- [ ] Forms and long-form text use a capped/fixed width, not full-viewport stretch
- [ ] Every gap, margin, and padding comes from the spacing scale — no one-off pixel values
- [ ] Generous outer margins; nothing touches the screen edge on mobile (safe space respected)
- [ ] Related elements grouped by proximity; intra-group spacing tighter than inter-group
- [ ] Text aligned by baseline where mixed sizes share a line; everything aligns to the grid
- [ ] Body line length ~50–75 characters; type never shrunk below ~16px to fit content
- [ ] Mobile-first with multiple breakpoints; grid reflows at content break points

Pairs with: `spacing.md` (the gap system in depth), `visual-hierarchy.md` (what the structure ranks),
`modern-css.md` (grid/clamp/container queries), `typography.md` (measure, baseline), `components.md`
(per-component spacing).
