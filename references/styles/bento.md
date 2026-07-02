# Style: Bento Grid

Named after Japanese bento boxes — a modular layout of rectangular tiles of varying sizes,
each holding one piece of content (a stat, a chart, an image, a feature, a CTA).
Apple popularized it; by 2026 it's the default layout for SaaS landing pages, dashboards,
feature sections, and portfolios.

> Bento is a **layout system**, not a surface skin. It pairs with any visual style
> (glass, aurora, flat, etc.). This file governs the grid and tile behavior; pull
> colors/surfaces from the chosen visual style or the design tokens.

> **Ready-to-use code:** the grid + every tile variant (hero, stat, feature, media, chart, CTA) live
> in `../recipes/bento.md`. Use this file for the *why*; use the recipe library for the exact code.

---

## Core Principles

1. **One idea per tile** — a tile shows exactly one thing; never cram
2. **Deliberate size variation** — tiles span different row/column counts to create rhythm and hierarchy
3. **The biggest tile is the most important** — size encodes priority
4. **Consistent gap and radius** — the grid feels like one object made of parts
5. **Reflows gracefully** — collapses to fewer columns on smaller screens, never overflows

---

## The Grid

```css
.bento-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(180px, auto);
  gap: 16px;                 /* one consistent gap, from spacing scale */
  padding: 16px;
}

/* Span helpers — size encodes importance */
.bento-tile--hero   { grid-column: span 2; grid-row: span 2; } /* the headline tile */
.bento-tile--wide   { grid-column: span 2; }
.bento-tile--tall   { grid-row: span 2; }
.bento-tile--normal { grid-column: span 1; }

/* Tablet */
@media (max-width: 900px) {
  .bento-grid { grid-template-columns: repeat(2, 1fr); }
  .bento-tile--hero { grid-column: span 2; }
}

/* Mobile — single column, hero stays first */
@media (max-width: 560px) {
  .bento-grid { grid-template-columns: 1fr; gap: 12px; }
  .bento-tile--hero,
  .bento-tile--wide,
  .bento-tile--tall { grid-column: span 1; grid-row: span 1; }
}
```

---

## The Tile

```css
.bento-tile {
  border-radius: 20px;                 /* generous, consistent across all tiles */
  padding: 24px;
  background: var(--surface);          /* from chosen style/tokens */
  border: 1px solid var(--border);
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform var(--duration-fast) var(--ease-out),
              box-shadow var(--duration-fast) var(--ease-out);
}

/* Clickable tiles lift; static tiles don't */
.bento-tile[role="link"]:hover,
a.bento-tile:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 40px rgba(0,0,0,0.10);
}
```

---

## Tile Content Rules

- **Stat tile:** the number dominates; label muted below; optional sparkline
- **Feature tile:** icon top-left, short title, one-line description — no paragraphs
- **Image/media tile:** image fills, text overlaid with a scrim for legibility
- **CTA tile:** visually distinct (accent fill), one clear action
- **Chart tile:** chart fills the tile, minimal axis chrome
- Never put more than one primary element in a tile. If it needs two, it's two tiles.

---

## Hierarchy Within the Grid

- The **hero tile** (2×2) carries the single most important message — give it the most contrast.
- Use **at most one** hero per grid section.
- Vary tile sizes intentionally: a grid where every tile is identical defeats the purpose.
- Keep the outer silhouette a clean rectangle — avoid orphan gaps where possible.

---

## Entrance Motion

Stagger tiles in on scroll (reuse motion.md fadeUp + stagger, cap at 5):

```css
.bento-tile { animation: fadeUp var(--duration-slow) var(--ease-out) both; }
.bento-tile:nth-child(1) { animation-delay: 0ms; }
.bento-tile:nth-child(2) { animation-delay: 50ms; }
.bento-tile:nth-child(3) { animation-delay: 100ms; }
.bento-tile:nth-child(4) { animation-delay: 150ms; }
.bento-tile:nth-child(n+5) { animation-delay: 200ms; }
```

---

## Bento Checklist

- [ ] Tiles vary in size deliberately — not a uniform grid
- [ ] Exactly one hero/largest tile per section, carrying the key message
- [ ] One idea per tile, no cramming
- [ ] One consistent gap and one consistent radius across all tiles
- [ ] Grid reflows to 2-col then 1-col without overflow
- [ ] Clickable tiles lift on hover; static tiles have no hover affordance
- [ ] Entrance stagger reuses the global motion system (capped at 5)
- [ ] Outer silhouette stays a clean rectangle (no awkward orphan gaps)
