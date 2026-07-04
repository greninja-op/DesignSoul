# Style: Manga Panel Grid

A page that reads like a manga spread: asymmetrical slanted panels, thick uneven ink gutters,
screentone (dot) shading, and action/speed lines. Navigating down the page feels like reading a
comic. Done right: dynamic flow that breaks the block grid while staying legible. Done wrong: chaos
where slanted panels collide and text is unreadable over screentone.

> Distinct from `bento.md` (tidy rectangular tiles) and `pop-art.md` (colorful halftone). Manga is
> **black-and-white ink**, asymmetrical/skewed panels, and comic reading flow.

> **Ready-to-use code:** drop-in manga components (skewed panel, button, bubble input, focal burst,
> screentone tag, navbar, modal) live in `../recipes/manga-panel.md`. Use this file for the *why*;
> use the recipe for code.

---

## Core Principles

1. **Asymmetrical, skewed panels** — parallelograms and angled cuts, not tidy rectangles.
2. **Thick uneven ink gutters** — heavy black borders separate panels like a comic page.
3. **Screentone shading** — halftone dot / line patterns for greys instead of flat fill.
4. **Action / speed lines** — radiating or streaking lines behind focal elements for energy.
5. **Ink-drawn type** — bold comic display for headings; clean sans for body.
6. **Reading flow** — the eye moves panel to panel; the largest/most-skewed panel leads.

---

## Token System

```css
:root {
  --mg-ink:    #111111;
  --mg-paper:  #f7f5ef;
  --mg-grey:   #d8d5cc;
  --mg-accent: #e5322d;                      /* a single spot red, sparingly */
  --mg-border: 3px solid #111111;
  --mg-tone:   rgba(17,17,17,0.9);           /* screentone dot color */
  --mg-display:'Bangers','Anton',Impact,system-ui,sans-serif;
  --mg-body:   'Inter',system-ui,sans-serif;
}
/* Screentone (halftone) fill */
.mg-tone { background-image: radial-gradient(var(--mg-tone) 30%, transparent 31%); background-size: 8px 8px; }
```

---

## Panel (skewed, inked)

```css
.mg-panel {
  background: var(--mg-paper); border: var(--mg-border); padding: 22px; color: var(--mg-ink);
  transform: skewX(-3deg);                    /* slight slant */
  box-shadow: 6px 6px 0 var(--mg-ink);
}
.mg-panel > * { transform: skewX(3deg); }     /* un-skew the contents so text stays straight */
```

## Button (skewed parallelogram, action lines on hover)

```css
.mg-btn {
  position: relative; background: var(--mg-ink); color: #fff; border: var(--mg-border);
  font-family: var(--mg-display); font-size: 1.1rem; letter-spacing: 0.02em; cursor: pointer;
  padding: 12px 26px; transform: skewX(-8deg); overflow: hidden;
}
.mg-btn > span { display: inline-block; transform: skewX(8deg); }
.mg-btn:hover { background: var(--mg-accent); }
/* action-line burst behind the label on hover */
.mg-btn::before {
  content: ""; position: absolute; inset: -50%; opacity: 0;
  background: repeating-conic-gradient(from 0deg, transparent 0 6deg, rgba(255,255,255,0.25) 6deg 8deg);
  transition: opacity 120ms linear;
}
.mg-btn:hover::before { opacity: 1; }
```

## Input (speech-bubble / callout border, thickens on focus)

```css
.mg-input {
  background: #fff; border: var(--mg-border); border-radius: 20px 20px 20px 4px;   /* bubble-ish */
  padding: 12px 16px; font-family: var(--mg-body); font-weight: 600; color: var(--mg-ink);
}
.mg-input:focus { outline: none; border-width: 5px; }   /* dramatic thickening on focus */
```

## Speed-line burst (focal background)

```css
.mg-burst {
  background: var(--mg-paper);
  background-image: repeating-conic-gradient(from 0deg at 50% 50%, var(--mg-ink) 0 1.5deg, transparent 1.5deg 5deg);
}
```

## Typography

```css
/* Display: inked comic faces (Bangers, Anton). Body: clean sans. Never body copy in the display face. */
.mg-title { font-family: var(--mg-display); font-size: clamp(2.2rem, 6vw, 4.5rem); line-height: 0.95;
  text-transform: uppercase; -webkit-text-stroke: 1.5px var(--mg-ink); }
```

---

## Manga Panel Checklist

- [ ] Panels are asymmetrical/skewed with thick uneven ink gutters (not a tidy grid)
- [ ] Screentone (dot/line) shading used for greys, not flat fill
- [ ] Action/speed lines behind at least one focal element
- [ ] Contents un-skewed so text stays straight and readable
- [ ] Ink comic display for headings; clean sans for body
- [ ] One spot color (if any) used sparingly; mostly black-and-white
- [ ] Text passes 4.5:1 (avoid text directly over dense screentone); `:focus-visible` present
- [ ] Panel/page transitions respect `prefers-reduced-motion`
