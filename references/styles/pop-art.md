# Style: Pop Art / Comic Book

Vintage Western comic + retro manga energy: thick black ink outlines, Ben-Day halftone dots,
speech-bubble callouts, and loud primary colors. Instantly readable, narrative, fun. Done right:
bold and joyful with real hierarchy. Done wrong: clip-art chaos where everything shouts at once.

> Distinct from `manga-panel.md` (asymmetrical page layout + screentone) and `neo-brutalism.md`
> (flat blocks). Pop art is about **ink outlines + halftone dots + comic callouts**.

> **Ready-to-use code:** drop-in comic components (card, button, speech bubble, burst, input, navbar,
> toggle, modal) live in `../recipes/pop-art.md`. Use this file for the *why*; use the recipe for code.

---

## Core Principles

1. **Thick black ink outlines** on everything — 3–4px solid black, the defining trait.
2. **Halftone (Ben-Day) dots** as texture/shading — radial-gradient dot fields, not flat fills alone.
3. **Loud primary palette** — comic red, yellow, blue, plus black + paper white. Bold, not pastel.
4. **Speech bubbles & bursts** — callouts, "POW!" starbursts, and captions as real UI elements.
5. **Dramatic type** — heavy condensed display, often uppercase, sometimes outlined/3D.
6. **Hard offset shadows** — comic panels drop a solid black shadow, no blur.

---

## Token System

```css
:root {
  --pop-ink:     #111111;                   /* the ink outline / text */
  --pop-paper:   #fff8e7;                    /* aged comic paper */
  --pop-red:     #ff2b56;
  --pop-yellow:  #ffd000;
  --pop-blue:    #2b8cff;
  --pop-border:  3px solid #111111;
  --pop-shadow:  5px 5px 0 #111111;
  --pop-radius:  10px;
  --pop-dot:     rgba(17,17,17,0.28);        /* halftone dot color */
  --pop-display: 'Bangers','Anton',Impact,system-ui,sans-serif;
  --pop-body:    'Inter',system-ui,sans-serif;
}
```

---

## Halftone dot field (the signature texture)

```css
.pop-halftone {
  background-color: var(--pop-yellow);
  background-image: radial-gradient(var(--pop-dot) 28%, transparent 29%);
  background-size: 12px 12px;               /* smaller = finer dots */
}
```

## Card / panel

```css
.pop-card {
  background: var(--pop-paper);
  border: var(--pop-border);
  border-radius: var(--pop-radius);
  box-shadow: var(--pop-shadow);
  padding: 22px;
  color: var(--pop-ink);
}
```

## Button

```css
.pop-btn {
  background: var(--pop-red); color: #fff;
  border: var(--pop-border); border-radius: 999px;
  box-shadow: var(--pop-shadow); cursor: pointer;
  padding: 12px 26px; font-family: var(--pop-display); font-size: 1.1rem; letter-spacing: 0.02em;
  -webkit-text-stroke: 1px var(--pop-ink);   /* inked letters */
  transition: transform 100ms ease, box-shadow 100ms ease;
}
.pop-btn:hover  { transform: translate(-2px,-2px); box-shadow: 7px 7px 0 var(--pop-ink); }
.pop-btn:active { transform: translate(3px,3px);  box-shadow: 2px 2px 0 var(--pop-ink); }
```

## Speech bubble

```css
.pop-bubble {
  position: relative; background: #fff; border: var(--pop-border); border-radius: 18px;
  padding: 14px 18px; font-family: var(--pop-body); font-weight: 600; color: var(--pop-ink);
}
.pop-bubble::after {                          /* the tail */
  content: ""; position: absolute; left: 28px; bottom: -16px;
  border: 9px solid transparent; border-top-color: var(--pop-ink);
}
```

## Input

```css
.pop-input {
  background: #fff; border: var(--pop-border); border-radius: 10px;
  padding: 12px 14px; font-family: var(--pop-body); font-weight: 600; color: var(--pop-ink);
}
.pop-input:focus { outline: none; box-shadow: var(--pop-shadow); }
```

## Typography

```css
/* Display: comic faces (Bangers, Anton, Luckiest Guy). Body: clean sans.
   Never set body copy in the display face. */
.pop-title { font-family: var(--pop-display); font-size: clamp(2.4rem, 7vw, 5rem); line-height: 0.95;
  letter-spacing: 0.01em; text-transform: uppercase; -webkit-text-stroke: 2px var(--pop-ink); color: var(--pop-yellow); }
```

---

## Pop Art / Comic Checklist

- [ ] Thick black ink outlines (3–4px) on cards, buttons, callouts
- [ ] Halftone/Ben-Day dot texture present (not only flat fills)
- [ ] Loud primary palette (red/yellow/blue + black + paper), not pastel
- [ ] Speech bubbles / bursts used as real UI elements
- [ ] Heavy comic display type for headings; clean sans for body
- [ ] Hard offset shadows (no blur)
- [ ] Despite the loudness, text passes 4.5:1 and one clear focal point leads
- [ ] `:focus-visible` present; `prefers-reduced-motion` respected
