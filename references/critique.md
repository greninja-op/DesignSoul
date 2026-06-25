# Design Critique: Reviewing Like a Senior Designer

The completion checklist proves things are *present*. This is different — it scores whether
they're *good*. Run a critique pass before handing work back, the way a design lead reviews a
junior's work: specific, scored, and focused on the few changes that matter most.

> The bar isn't "it works." It's: would a senior designer at a top product team look at this
> and say "an AI made this"? Critique is how you find the exact things triggering that reaction.

---

## The five dimensions (score each 1–10)

### 1. System / Style Fidelity
Does it faithfully express the chosen design system or named style?
- 9–10: every detail traces to the system; the style is unmistakable
- 7–8: right direction, core traits present, a few details drift
- 5–6: intent visible but mixed with other styles; not pure
- 3–4: surface mimicry, the essence is missed
- 1–2: barely related to the intended system
Check: are the style's signature moves actually used? Any self-contradicting elements
(e.g. a minimal style stuffed with content)?

### 2. Visual Hierarchy
Does the eye flow where you intend, with zero friction finding the key thing?
- 9–10: natural flow, instant read
- 7–8: clear primary/secondary, 1–2 muddy spots
- 5–6: title vs body clear, middle levels confused
- 3–4: everything flat, no entry point
- 1–2: chaotic — user doesn't know where to look
Check: title-to-body size ratio ≥ ~2.5×? 3–4 clear levels via size/weight/color? **The squint
test** — blur your eyes; is the hierarchy still readable?

### 3. Craft Quality
- 9–10: pixel-precise alignment, spacing, color — no flaws
- 7–8: polished, 1–2 tiny alignment/spacing issues
- 5–6: roughly aligned, inconsistent spacing, unsystematic color
- 3–4: visible misalignment, messy spacing, too many colors
- 1–2: looks like a draft
Check: one spacing system (e.g. 4/8px grid)? equal gaps between like elements? ≤3–4 colors?
≤2 font families? edges truly aligned?

### 4. Functionality / UX
- 9–10: every element serves the goal, zero redundancy
- 7–8: clearly purposeful, minor removable decoration
- 5–6: usable but decoration distracts
- 3–4: form over function, user works to find info
- 1–2: drowned in decoration
Check: would removing any element make it worse? (if not, remove it.) Is the key action/info
in the most prominent spot? Anything added "because it looked nice"?

### 5. Originality
- 9–10: fresh, finds a distinct voice within the style
- 7–8: has its own ideas, not template-filling
- 5–6: competent but template-like
- 3–4: leans on clichés
- 1–2: pure template/stock assembly
Check: avoids the common clichés below? personal expression within the system? any
"unexpected but right" decisions?

---

## Weight by output type

Different work prioritizes different dimensions:

| Output | Most important | Then | Can relax |
|---|---|---|---|
| Landing page / marketing site | Functionality, Hierarchy | Originality | — (all matter) |
| App / product UI | Functionality, Craft | Hierarchy | Style fidelity (usability first) |
| Dashboard / data | Functionality, Hierarchy | Craft | Originality (accuracy first) |
| Portfolio / editorial | Originality, Hierarchy | Style fidelity | — |
| Docs / knowledge base | Functionality, Craft | Hierarchy | Originality |

---

## Top 10 problems to hunt for

1. **AI-tech cliché** — gradient orbs, circuit boards, robot faces. Fix: abstract metaphor over literal symbol.
2. **Weak type hierarchy** — title/body < 2.5×. Fix: title ≈ 3× body.
3. **Too many colors** — 5+ with no lead. Fix: 1 primary + 1 secondary + 1 accent + grays.
4. **Inconsistent spacing** — random gaps. Fix: an 8pt grid, gaps only from the scale.
5. **Not enough whitespace** — every space filled. Fix: ≥40% whitespace (60%+ for minimal).
6. **Too many fonts** — 3+. Fix: max 2 (display + body); vary by weight/size.
7. **Inconsistent alignment** — mixed left/center/right. Fix: pick one (usually left), apply globally.
8. **Decoration over content** — background/gradient/shadow steals focus. Fix: "if I delete this, does it get worse?" If no, delete.
9. **Neon-on-dark overuse** — #0D1117 + generic neon glow. Fix: a more distinctive palette (this is a forbidden default — see anti-patterns).
10. **Density mismatched to medium** — a wall of text on a slide, 10 elements in a cover. Fix: match density to the medium.

---

## Critique output template

```
## Design Critique — <score>/10  [excellent 8+ / good 6–7.9 / needs work 4–5.9 / fail <4]

Scores
- Style fidelity   X/10  — one line
- Visual hierarchy X/10  — one line
- Craft            X/10  — one line
- Functionality    X/10  — one line
- Originality      X/10  — one line

Keep (what's working)
- <specific, in design language>

Fix (ordered by severity)
1. <name> — ⚠️ critical / ⚡ important / 💡 polish
   Now: <current state>
   Why: <why it's a problem>
   Fix: <specific action, with values>

Quick wins (if you only have 5 minutes)
- [ ] <highest-impact fix>
- [ ] <second>
- [ ] <third>
```

Be specific and actionable. "Improve the hierarchy" is useless; "bump the H1 from 28px to
48px and drop the body to 16px/secondary gray" is a critique.
