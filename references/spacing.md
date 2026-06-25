# Spacing: The System That Reads as Senior

Spacing is the single most invisible-yet-loud signal of design maturity. You don't need a better
visual style to stop looking AI-generated — you need *consistent, systematic* spacing. It's what
makes a layout feel intentional before a user reads a word, and it's the thing AI-default and
junior work gets wrong most: gaps eyeballed, no scale, every screen a little different.

> Spacing is not decoration you add at the end to "make it breathe." **Spacing is hierarchy and
> grouping** — it tells the eye what's important and what belongs together, silently, before
> anything is read. A user can't say *why* a screen feels off; eight times out of ten it's the
> spacing.

This is the spacing system. `layout-grids.md` covers the page skeleton (columns, responsive
structure); this file is the **gap system** that runs inside and between everything. Read it on
every build — it's foundational, not optional.

---

## Rule 1 — The 4pt base unit

Every spacing value is a multiple of **4**. That's the atomic unit. Most screen densities divide
cleanly by 4, so a design built on it holds shape across iOS, Android, web, and print. (Every
serious design system — Material, iOS HIG, Polaris, Atlassian, Carbon — is built on a 4/8pt base.
Not a coincidence.)

- **Do:** 4, 8, 12, 16, 24, 32, 48, 64, 96.
- **Don't:** 7px, 13px, 22px. A value off the grid is a decision you can't repeat — and
  repeatability is the whole game. The trap is "I'll use 5px here, it looks better." The next
  person (or future you) needs to know *why*; they won't, and the system is broken.

---

## Rule 2 — A finite scale (9 tokens, each with a job)

Don't invent a value each time. Use a short, fixed list. **Nine tokens cover ~95% of everything
you'll design.** Constraints make you pick the right gap in two seconds instead of fiddling for
twenty minutes — and a 20+ token "flexible" scale is just permission to be inconsistent. Less is
more.

Each token has a **specific job**. Use it for that job, not at random.

| Token | px | What it's for |
|---|---|---|
| `space-1` | 4px | Inside tight components — icon-to-label, tag/badge padding |
| `space-2` | 8px | Inside buttons; between very-related elements; input padding |
| `space-3` | 12px | Between paired controls; dense list rows; pill padding |
| `space-4` | 16px | Between unrelated controls; card padding; the default "breathing room" |
| `space-5` | 24px | Between sections inside a card; between heading and its body |
| `space-6` | 32px | Between component groups on a page — the "new idea" gap |
| `space-7` | 48px | Between major page sections; above/below page dividers |
| `space-8` | 64px | Hero padding; top/bottom of landing-page blocks |
| `space-9` | 96px | Top of page; between completely unrelated full-width sections |

The scale roughly **doubles every ~1.5 steps** — a geometric (not linear) progression. That's not
arbitrary: the eye perceives spatial contrast geometrically. Linear scales (8, 16, 24, 32, 40…
spaced evenly) look subtly broken at the large end; geometric ones look right.

```css
:root {
  --space-1: 4px;  --space-2: 8px;  --space-3: 12px;
  --space-4: 16px; --space-5: 24px; --space-6: 32px;
  --space-7: 48px; --space-8: 64px; --space-9: 96px;
}
/* Every gap, margin, and padding is one of these. Never a raw px value. */
```

---

## Rule 3 — Rhythm: contrast in gaps = hierarchy

**Bigger gaps between groups, smaller gaps within them.** Spacing is how the eye decides what
belongs together — this is the rule most juniors miss. Equal spacing everywhere "for cleanliness"
actually *kills* hierarchy: the layout reads as one undifferentiated wall instead of a structure.

If the gap from a heading to its body equals the gap to the next section, there's no visible
structure. Make the between-section gap 2–3× the within-section gap. Hierarchy comes from
**contrast in gaps**, not from font size alone.

---

## The 5 spacing decisions (every gap is one of these)

Every spacing question you'll ever face is one of these five wearing a different costume.

1. **Hierarchy — what gap shows importance.** Put a **bigger gap *above* a heading than below
   it.** A heading belongs to the content *under* it, not above it — the tighter gap below binds
   them, the larger gap above separates them from what came before. This one rule fixes more
   layouts than any other.
2. **Grouping — what belongs together.** Elements close together read as one unit; far apart, as
   separate. A label 4px from its input reads as *one thing*; at 16px it reads as *two*. Choose
   the gap deliberately to say what you mean (this is proximity — see `visual-hierarchy.md`).
3. **Optical — what looks right vs what *is* right.** Mathematically equal spacing sometimes
   looks wrong; a glyph without a terminal stroke may need a hair more padding on one side. Trust
   your eye over the ruler — but only *after* you know the ruler. Optical tweaks are the exception,
   not the starting point. (More optical-alignment cases in `polish.md`.)
4. **Containers — padding ≠ margin.** Padding *inside* a container says "this is one thing";
   margin *outside* it says "this is separate." Confusing the two is the **#1 reason cards look
   amateur** — content jammed against a card's edge, or a card with internal air but no separation
   from its neighbours. Pad the inside from the scale; margin the outside from the scale; keep them
   distinct decisions.
5. **Vertical rhythm — one scale ties it together.** Line-heights and spacing belong to the same
   system. If body text is 16/24 but your gaps are 22, the rhythm is broken. Snap line-heights and
   gaps to multiples of the base so everything sits on one invisible grid. (Type side in
   `typography.md`; baseline alignment in `layout-grids.md`.)

---

## Junior spacing vs senior spacing (the honest tell)

| Question | Junior | Senior |
|---|---|---|
| Unique spacing values in your last screen? | 15+, "whatever felt right" | Under 9, all from the scale |
| Why this gap here? | "It looked good" (a gut answer) | "It's `space-3` — the gap for paired controls" |
| Heading-to-body vs heading-to-next-section? | Same gap, both "feel clean" | Section gap 2–3× bigger; hierarchy visible |
| Could a dev rebuild it from the spec? | No — every screen has unique values | Yes — tokens are documented and reused |
| Spacing on a redesign? | Re-eyeballed from scratch | Same scale, same rules, faster each time |

Senior spacing isn't taste or talent — it's deliberate constraints repeated until they're just how
you work. The constraint a senior **refuses to break** is the one that produces "polish." It isn't
polish; it's discipline.

---

## How to apply it (in this skill)

- It **is** the `SPACING SCALE` in the design-system tokens (`SKILL.md` Step 2) — define the nine
  `space-*` values up front and treat them as law.
- During layout and per-component work, every gap/margin/padding is a `space-*` token — never a
  one-off pixel value. If you reach for a number not on the scale, stop and pick the nearest one
  that is.
- Apply the **hierarchy gap rule** (bigger above a heading than below; bigger between sections than
  within) on every screen — it's the fastest single upgrade to maturity.
- Keep **padding (inside) and margin (outside)** as distinct, deliberate choices.

## Checklist

- [ ] All spacing is a multiple of 4 — no off-grid values (7/13/22px)
- [ ] Every gap/margin/padding comes from the 9-token scale; <9 unique values per screen
- [ ] Scale is geometric (4·8·12·16·24·32·48·64·96), not evenly linear
- [ ] Bigger gap above a heading than below it; within-group gaps tighter than between-group
- [ ] Section gaps are 2–3× the within-section gaps (hierarchy is visible)
- [ ] Padding (inside container) and margin (outside) are distinct, deliberate decisions
- [ ] Line-heights and spacing snap to the same base (vertical rhythm intact)
- [ ] A developer could rebuild the screen from the documented tokens

Pairs with: `layout-grids.md` (page grid + responsive), `visual-hierarchy.md` (proximity/grouping),
`typography.md` (line-height rhythm), `polish.md` (optical alignment), `design-system-doc.md` (record the tokens).
