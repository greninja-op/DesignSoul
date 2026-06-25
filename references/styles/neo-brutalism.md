# Style: Neo-Brutalism (Neubrutalism)

The colorful, friendly cousin of pure brutalism. Keeps the raw structure — thick black
borders, hard offset shadows, zero blur, flat fills — but adds bold saturated color and
playful energy. Hugely popular in 2026 for SaaS, indie products, and portfolios.

> Distinct from `brutalism.md`: brutalism is austere (mostly black/white, one accent).
> Neo-brutalism is loud and multi-color, but keeps the same structural rules.

---

## Core Principles

1. **Hard offset shadows, no blur** — `box-shadow: 4px 4px 0 #000`
2. **Thick black borders on everything** — usually 2–3px solid black
3. **Flat saturated color blocks** — no gradients, no soft shadows
4. **Bold, chunky typography** — heavy weights, often tight
5. **Playful but structured** — color is loud, but layout stays disciplined
6. **Press = shadow collapses** — interactions feel physical and clicky

---

## Token System

```css
:root {
  --nb-bg:        #FFFEF2;          /* warm off-white paper */
  --nb-ink:       #111111;          /* near-black for borders/text */
  --nb-border:    2px solid #111111;
  --nb-shadow:    4px 4px 0 #111111;
  --nb-shadow-lg: 6px 6px 0 #111111;

  /* A loud, saturated multi-color palette — pick 3-5 */
  --nb-yellow: #FFD23F;
  --nb-pink:   #FF5DA2;
  --nb-blue:   #4D9DE0;
  --nb-green:  #6BCB77;
  --nb-purple: #9B5DE5;
  --nb-orange: #FF7A00;

  --nb-radius: 6px;                 /* small, NOT zero — keeps it friendly not austere */
}
```

---

## Card

```css
.nb-card {
  background: var(--nb-pink);       /* use a different palette color per card */
  border: var(--nb-border);
  border-radius: var(--nb-radius);
  box-shadow: var(--nb-shadow);
  padding: 24px;
  color: var(--nb-ink);
  transition: transform var(--duration-fast) var(--ease-out),
              box-shadow var(--duration-fast) var(--ease-out);
}
.nb-card:hover {
  transform: translate(-2px, -2px);
  box-shadow: var(--nb-shadow-lg);
}
```

---

## Button

```css
.nb-btn {
  background: var(--nb-yellow);
  border: var(--nb-border);
  border-radius: var(--nb-radius);
  box-shadow: var(--nb-shadow);
  padding: 12px 24px;
  font-weight: 800;
  color: var(--nb-ink);
  cursor: pointer;
  transition: transform var(--duration-instant) var(--ease-out),
              box-shadow var(--duration-instant) var(--ease-out);
}
.nb-btn:hover  { transform: translate(-2px, -2px); box-shadow: var(--nb-shadow-lg); }
.nb-btn:active { transform: translate(4px, 4px);  box-shadow: 0 0 0 #111; } /* shadow collapses = "pressed in" */
```

---

## Input

```css
.nb-input {
  background: #fff;
  border: var(--nb-border);
  border-radius: var(--nb-radius);
  padding: 12px 16px;
  font-weight: 500;
  color: var(--nb-ink);
  box-shadow: inset 2px 2px 0 rgba(0,0,0,0.06);
}
.nb-input:focus {
  outline: none;
  box-shadow: var(--nb-shadow);   /* gains the hard shadow on focus */
}
```

---

## Badge / Tag

```css
.nb-badge {
  display: inline-block;
  background: var(--nb-green);
  border: var(--nb-border);
  border-radius: 4px;
  padding: 2px 10px;
  font-weight: 700;
  font-size: 0.75rem;
  box-shadow: 2px 2px 0 #111;
}
```

---

## Typography

```css
.nb-display {
  font-weight: 800;
  font-size: clamp(2.5rem, 6vw, 5rem);
  line-height: 1.0;
  letter-spacing: -0.02em;
  color: var(--nb-ink);
}
/* Good font choices: Archivo, Space Grotesk, Inter (heavy), Satoshi */
```

---

## Neo-Brutalism Checklist

- [ ] Hard offset shadows with zero blur (`Xpx Ypx 0 #111`)
- [ ] Thick black (or near-black) borders on cards, buttons, inputs
- [ ] Flat saturated color fills — no gradients, no soft shadows
- [ ] Small radius (4–8px), not zero (that's austere brutalism) and not pill
- [ ] Press state collapses the shadow (physical click feedback)
- [ ] 3–5 loud palette colors used across components
- [ ] Heavy display typography (700–800 weight)
- [ ] Text passes contrast against every colored fill it sits on
