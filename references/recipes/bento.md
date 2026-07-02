# Bento Grid — Component Code Library (ready to use)

Drop-in, production-ready bento-grid code. `../styles/bento.md` holds the *principles*; **this file
holds the exact code** so the right grid and tile variants already exist when a user asks for "a bento
layout / dashboard grid / feature section." Bento is a **layout system, not a surface skin** — it pairs
with any visual style, so these recipes use neutral tokens (`--surface`, `--border`, `--accent`) that
you fill from the chosen style (glass, aurora, flat, Material…). Every recipe bakes in the rules:

- **One idea per tile** — a tile shows exactly one thing. If it needs two, it's two tiles.
- **Deliberate size variation** — tiles span different row/column counts; size encodes priority.
- **Exactly one hero (2×2) per section**, carrying the key message with the most contrast.
- **One consistent gap and one radius** so the grid reads as a single object made of parts.
- **Reflows gracefully** — 4-col → 2-col → 1-col, never overflows; the hero stays first.
- **Clickable tiles lift; static tiles don't** — don't fake an affordance that isn't there.

```css
:root {
  /* Fill these from the chosen visual style */
  --surface:      #ffffff;
  --surface-2:    #f6f7fb;
  --border:       rgba(20,22,40,0.10);
  --ink:          #14162a;
  --ink-muted:    #5b6072;
  --accent:       #6d5efc;
  --accent-ink:   #ffffff;
  --bento-gap:    16px;
  --bento-radius: 20px;
  --ease: cubic-bezier(0.22, 1, 0.36, 1);
  --dur:  200ms;
}

.bento-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(180px, auto);
  gap: var(--bento-gap);
  padding: var(--bento-gap);
}
/* size encodes importance */
.t-hero   { grid-column: span 2; grid-row: span 2; }
.t-wide   { grid-column: span 2; }
.t-tall   { grid-row: span 2; }
.t-normal { grid-column: span 1; }

@media (max-width: 900px) {
  .bento-grid { grid-template-columns: repeat(2, 1fr); }
  .t-hero { grid-column: span 2; }
}
@media (max-width: 560px) {
  .bento-grid { grid-template-columns: 1fr; gap: 12px; }
  .t-hero, .t-wide, .t-tall { grid-column: span 1; grid-row: span 1; }
}
@media (prefers-reduced-motion: reduce) {
  * { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; }
}
```

---

## The tile (base — every variant extends this)

```css
.tile {
  border-radius: var(--bento-radius); padding: 24px; overflow: hidden; position: relative;
  background: var(--surface); border: 1px solid var(--border); color: var(--ink);
  display: flex; flex-direction: column; justify-content: space-between; gap: 12px;
}
/* clickable tiles lift; static tiles have no hover affordance */
a.tile, .tile[role="link"] { text-decoration: none; cursor: pointer;
  transition: transform var(--dur) var(--ease), box-shadow var(--dur) var(--ease); }
a.tile:hover, .tile[role="link"]:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(0,0,0,0.10); }
a.tile:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
```

---

## Full grid — a realistic dashboard section

```html
<section class="bento-grid">
  <!-- HERO (2×2): the single most important message -->
  <a class="tile t-hero tile-cta" href="#">
    <div><span class="tile-eyebrow">This month</span><h2>You're on track to hit every goal 🎯</h2></div>
    <span class="tile-link">View full report →</span>
  </a>

  <!-- STAT tiles: the number dominates -->
  <div class="tile t-normal tile-stat">
    <span class="tile-label">Revenue</span>
    <div class="tile-value">$48.2k</div>
    <span class="tile-delta up">▲ 12%</span>
  </div>
  <div class="tile t-normal tile-stat">
    <span class="tile-label">Active users</span>
    <div class="tile-value">3,910</div>
    <span class="tile-delta up">▲ 6%</span>
  </div>

  <!-- FEATURE tile: icon, short title, one line -->
  <div class="tile t-wide tile-feature">
    <div class="tile-ic">⚡</div>
    <div><h3>Instant sync</h3><p>Changes land on every device in under a second.</p></div>
  </div>

  <!-- MEDIA tile: image fills, text over a scrim -->
  <a class="tile t-tall tile-media" href="#" style="--img:url('/cover.jpg')">
    <div class="tile-scrim"><h3>Spring collection</h3><span class="tile-link">Shop →</span></div>
  </a>

  <!-- CHART tile: chart fills, minimal chrome -->
  <div class="tile t-wide tile-chart">
    <span class="tile-label">Weekly activity</span>
    <div class="spark"><i style="height:40%"></i><i style="height:70%"></i><i style="height:55%"></i><i style="height:90%"></i><i style="height:65%"></i><i style="height:80%"></i><i style="height:100%"></i></div>
  </div>
</section>
```

---

## Tile content variants

```css
/* Shared bits */
.tile-eyebrow { font-size: 0.74rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ink-muted); }
.tile-label   { font-size: 0.74rem; letter-spacing: 0.06em; text-transform: uppercase; color: var(--ink-muted); }
.tile-link    { font-weight: 600; color: var(--accent); }

/* HERO / CTA — visually distinct: accent fill, most contrast in the grid */
.tile-cta { background: var(--accent); color: var(--accent-ink); border-color: transparent; }
.tile-cta .tile-eyebrow, .tile-cta .tile-link { color: color-mix(in oklab, var(--accent-ink) 85%, transparent); }
.tile-cta h2 { font-size: 1.6rem; line-height: 1.15; font-weight: 700; }

/* STAT — the number dominates */
.tile-stat { justify-content: flex-start; gap: 6px; }
.tile-value { font-size: 2.4rem; font-weight: 800; line-height: 1; font-variant-numeric: tabular-nums; }
.tile-delta { font-size: 0.82rem; font-weight: 600; }
.tile-delta.up { color: #15935e; } .tile-delta.down { color: #d64550; }

/* FEATURE — icon + short title + one line, no paragraphs */
.tile-feature { flex-direction: row; align-items: center; gap: 16px; justify-content: flex-start; }
.tile-ic { flex: none; width: 48px; height: 48px; border-radius: 14px; display: grid; place-items: center;
  font-size: 1.5rem; background: color-mix(in oklab, var(--accent) 14%, transparent); }
.tile-feature h3 { font-size: 1.05rem; font-weight: 700; margin-bottom: 2px; }
.tile-feature p  { font-size: 0.9rem; color: var(--ink-muted); line-height: 1.45; }

/* MEDIA — image fills, text on a scrim for legibility */
.tile-media { padding: 0; background-image: var(--img); background-size: cover; background-position: center; }
.tile-scrim { margin-top: auto; padding: 20px; width: 100%; color: #fff;
  background: linear-gradient(transparent, rgba(0,0,0,0.65)); }
.tile-media h3 { font-size: 1.15rem; font-weight: 700; }
.tile-media .tile-link { color: #fff; }

/* CHART — chart fills, minimal axis chrome */
.tile-chart { gap: 14px; }
.spark { display: flex; align-items: flex-end; gap: 6px; height: 90px; }
.spark i { flex: 1; background: var(--accent); border-radius: 6px 6px 0 0; opacity: 0.85; }
```

---

## Entrance stagger (reuse the global motion system, capped at 5)

```css
.tile { animation: fadeUp var(--dur) var(--ease) both; }
.tile:nth-child(1){animation-delay:0ms}   .tile:nth-child(2){animation-delay:50ms}
.tile:nth-child(3){animation-delay:100ms} .tile:nth-child(4){animation-delay:150ms}
.tile:nth-child(n+5){animation-delay:200ms}
@keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }
```

---

## Using this library (for the skill)

When a user wants a bento layout (or a dashboard/feature grid): **start from the grid + tile variants
here**, then fill the neutral tokens from the chosen visual style. Always:
1. Vary tile sizes **deliberately** — never ship a uniform grid (that defeats bento).
2. Use **exactly one hero (2×2)** per section, with the most contrast and the key message.
3. Keep **one idea per tile**; split anything that wants two.
4. Use **one gap + one radius** across all tiles.
5. Ensure it **reflows** 4→2→1 columns with no overflow; hero stays first.
6. Only **clickable tiles lift**; static tiles get no hover affordance.

## Quick checklist
- [ ] Tiles vary in size deliberately (not uniform)
- [ ] Exactly one hero/largest tile per section, carrying the key message
- [ ] One idea per tile, no cramming
- [ ] One consistent gap and one radius across all tiles
- [ ] Reflows to 2-col then 1-col without overflow
- [ ] Clickable tiles lift on hover; static tiles have none
- [ ] Entrance stagger reuses the global motion system (capped at 5)
- [ ] Outer silhouette stays a clean rectangle (no orphan gaps)

Pairs with: `../styles/bento.md` (principles), `layout-grids.md` (grid + responsive), `motion.md`
(stagger), `depth.md` (tile elevation from the chosen style), any `styles/*.md` for the surface skin.
