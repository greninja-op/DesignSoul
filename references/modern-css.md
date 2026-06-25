# Modern CSS Toolkit: The Details That Read as "Hand-Crafted"

A senior front-end designer reaches for modern CSS that the AI default never uses. These small
touches are a big part of why output stops looking machine-generated. Use them deliberately.

---

## Typography polish

```css
/* Headings never end with a lonely single word on the last line */
h1, h2, h3 { text-wrap: balance; }

/* Body text avoids widows/orphans */
p { text-wrap: pretty; }

/* Control reading measure — never let body run full-width */
.prose { max-width: 65ch; }
```

For CJK and mixed scripts:
```css
p {
  text-spacing-trim: space-all;   /* punctuation kerning */
  hanging-punctuation: first;     /* hang opening quotes into the margin */
  line-height: 1.75;              /* CJK wants looser leading */
}
```

---

## Color with oklch and color-mix

Define color in `oklch` so lightness changes don't shift the hue (unlike hsl):

```css
:root {
  --primary:       oklch(0.65 0.18 25);   /* warm terracotta */
  --primary-light: oklch(0.85 0.08 25);
  --primary-dark:  oklch(0.45 0.20 25);
}

/* Derive hover/active without inventing new hex values */
.button:hover  { background: color-mix(in oklch, var(--primary) 88%, black); }
.button:active { background: color-mix(in oklch, var(--primary) 80%, black); }

/* Translucent tints that stay in-gamut */
.tint { background: color-mix(in oklch, var(--primary) 12%, transparent); }
```

---

## Layout

```css
/* Named grid areas — readable, intentional layouts */
.app {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 240px 1fr;
  grid-template-rows: auto 1fr auto;
}
.app > header { grid-area: header; }

/* Subgrid so card internals align across a row */
.card { display: grid; grid-template-rows: subgrid; grid-row: span 3; }

/* Container queries — components respond to THEIR space, not the viewport */
.card-host { container-type: inline-size; }
@container (min-width: 480px) { .card { grid-template-columns: 1fr 1fr; } }
```

---

## Conditional styling with :has()

```css
/* A card with an image gets no top padding */
.card:has(img) { padding-top: 0; }

/* A form field with an error styles its whole row */
.field:has(:invalid) { border-color: var(--error); }

/* A nav that contains an open menu dims the page */
body:has(.menu[open]) { --page-dim: 0.5; }
```

---

## Motion & transitions

```css
/* Smooth same-document or cross-document page transitions */
@view-transition { navigation: auto; }

/* Animate to height:auto (long-unsolved) */
.panel { interpolate-size: allow-keywords; transition: height var(--duration-normal) var(--ease-out); }
.panel { height: 0; }
.panel[open] { height: auto; }

/* Scroll-driven reveal without JS, where supported */
@supports (animation-timeline: view()) {
  .reveal { animation: fadeUp linear both; animation-timeline: view(); animation-range: entry 0% cover 30%; }
}
```

Always pair scroll/motion features with `@media (prefers-reduced-motion: reduce)` fallbacks
(see `motion.md`).

---

## Detail touches

```css
/* Styled scrollbars that match the design */
* { scrollbar-width: thin; scrollbar-color: var(--border) transparent; }

/* Restrained glassmorphism (don't overuse) */
.glass {
  backdrop-filter: blur(20px) saturate(150%);
  background: color-mix(in oklch, white 70%, transparent);
}

/* Accent-driven form controls */
:root { accent-color: var(--primary); }

/* Respect the user's contrast/scheme preferences */
@media (prefers-contrast: more) { :root { --border: oklch(0.4 0 0); } }
```

---

## Rules

- Use these to add craft, not novelty for its own sake. Each should serve the design.
- Gate newer features (`@view-transition`, `interpolate-size`, scroll-driven animation) behind
  `@supports` so older browsers degrade gracefully.
- `text-wrap: balance/pretty`, `:has()`, container queries, and `oklch`/`color-mix` are
  well-supported in 2026 and should be close to default for new work.
