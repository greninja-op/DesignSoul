# Style: Doodle / Sketch

Hand-drawn UI: wobbly uneven borders, sketchy fill lines, handwritten fonts, and an imitation
paper/cardboard texture. Feels personal, authentic, and approachable — the opposite of machine
perfection. Done right: charming and warm while still legible and usable. Done wrong: an illegible
scribble where the "hand-drawn" gimmick fights the content.

> Distinct from `warm-editorial.md` (polished paper + serif). Doodle is **imperfect on purpose** —
> crooked lines, marker fills, notebook paper.

> **Ready-to-use code:** drop-in doodle components (hand-drawn card, button, input, underline,
> checkbox, sticky note, navbar, modal) live in `../recipes/doodle-sketch.md`. Use this file for the
> *why*; use the recipe for code.

---

## Core Principles

1. **Wobbly, uneven borders** — the classic asymmetric `border-radius` trick (or a rough SVG stroke).
2. **Handwritten type** — a marker/handwriting face for headings; a clean, legible hand for body.
3. **Paper / cardboard texture** — soft off-white or kraft background, faint grid/ruled lines.
4. **Sketchy fills & marks** — hatch/scribble fills, hand-drawn underlines, little arrows and stars.
5. **Slight imperfection** — tiny rotations and offsets so nothing is perfectly aligned.
6. **Ink shadow** — a soft hand-inked drop shadow, not a crisp geometric one.

---

## Token System

```css
:root {
  --dd-paper:  #fbf7ee;                       /* notebook cream */
  --dd-kraft:  #e7d9bd;
  --dd-ink:    #2b2b2b;                        /* pencil/pen ink */
  --dd-accent: #ef6f52;                        /* marker orange */
  --dd-blue:   #3f7cac;                        /* pen blue */
  --dd-line:   rgba(43,43,43,0.9);
  --dd-shadow: 3px 4px 0 rgba(43,43,43,0.18);
  /* the hand-drawn box: uneven corner radii */
  --dd-wobble: 255px 15px 225px 15px / 15px 225px 15px 255px;
  --dd-hand:   'Caveat','Patrick Hand',ui-rounded,cursive;
  --dd-body:   'Comic Neue','Segoe Print',system-ui,sans-serif;
}
```

---

## Notebook background

```css
.dd-paper {
  background-color: var(--dd-paper);
  background-image: linear-gradient(var(--dd-kraft) 1px, transparent 1px);   /* ruled lines */
  background-size: 100% 28px;
}
```

## Card (hand-drawn box)

```css
.dd-card {
  background: var(--dd-paper); color: var(--dd-ink);
  border: 2.5px solid var(--dd-ink); border-radius: var(--dd-wobble);
  box-shadow: var(--dd-shadow); padding: 22px; transform: rotate(-0.6deg);   /* barely crooked */
}
```

## Button (marker outline, wobbly)

```css
.dd-btn {
  background: var(--dd-accent); color: #fff; cursor: pointer;
  border: 2.5px solid var(--dd-ink); border-radius: 225px 15px 255px 15px / 15px 255px 15px 225px;
  box-shadow: var(--dd-shadow); padding: 10px 22px; font-family: var(--dd-hand); font-size: 1.25rem;
  transition: transform 120ms ease;
}
.dd-btn:hover  { transform: rotate(-1deg) translateY(-2px); }
.dd-btn:active { transform: rotate(0deg) translateY(1px); }
.dd-btn:focus-visible { outline: 2px dashed var(--dd-ink); outline-offset: 3px; }
```

## Input (underline like a fill-in blank, or wobbly box)

```css
.dd-input {
  background: transparent; color: var(--dd-ink); font-family: var(--dd-body); font-size: 1rem;
  border: none; border-bottom: 2.5px dashed var(--dd-ink); padding: 8px 4px;
}
.dd-input:focus { outline: none; border-bottom-style: solid; }
.dd-input.box { border: 2.5px solid var(--dd-ink); border-radius: var(--dd-wobble); padding: 10px 14px; }
```

## Hand-drawn underline / highlight

```css
.dd-underline { position: relative; }
.dd-underline::after {
  content: ""; position: absolute; left: 0; right: 0; bottom: -2px; height: 6px;
  background: var(--dd-accent); opacity: 0.5; border-radius: 40% 60% 50% 45%;   /* uneven marker swipe */
}
```

## Typography

```css
/* Headings in a marker/handwriting face (Caveat, Patrick Hand). Body in a legible hand
   (Comic Neue) — or a clean sans if the handwriting hurts readability at small sizes. */
.dd-title { font-family: var(--dd-hand); font-size: clamp(2rem, 6vw, 3.5rem); line-height: 1.05; color: var(--dd-ink); }
```

---

## Doodle / Sketch Checklist

- [ ] Wobbly/uneven borders (asymmetric radius or rough stroke)
- [ ] Handwritten heading face; legible body (hand or clean sans)
- [ ] Paper/cardboard texture (ruled/grid lines or kraft)
- [ ] Sketchy marks — hand-drawn underline, arrows, hatch fills
- [ ] Slight imperfection (tiny rotations/offsets), soft inked shadow
- [ ] Text still passes 4.5:1; don't set long/small body copy in a hard-to-read script
- [ ] `:focus-visible` present (a dashed outline fits the style)
- [ ] Any wobble animation respects `prefers-reduced-motion`
