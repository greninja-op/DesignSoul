# Style: 8-Bit / Pixel Art

Retro-gaming UI: chunky pixel fonts, tiled grid backgrounds, rigid block borders, dithered gradients,
and a small high-contrast palette. Reads instantly as "classic game." Lightweight and nostalgic.
Done right: crisp, readable, deliberately low-res. Done wrong: a pixel font slapped on smooth
rounded modern components.

> Distinct from `cyber-retro.md` (Windows-OS chrome) and `retro-y2k.md` (vaporwave). This is the
> **NES / Game Boy** game aesthetic: stepped edges, no curves, no smooth transitions.

> **Ready-to-use code:** drop-in pixel components (RPG card, button, input, RPG menu, health bar,
> navbar, toggle) live in `../recipes/pixel-art.md`. Use this file for the *why*; use the recipe for code.

---

## Core Principles

1. **No curves, no smooth transitions** — everything is stepped/rigid; state changes are *instant*.
2. **Chunky pixel type** — Press Start 2P / VT323 for headers; keep it large enough to read.
3. **Rigid block borders** — thick borders drawn with layered box-shadows so edges look pixel-stepped.
4. **Tiled grid / dithered backgrounds** — repeating pixel tiles; dithering instead of smooth gradients.
5. **Small high-contrast palette** — a handful of colors, like a real 8-bit console.
6. **Game feedback** — buttons look raised (light top/left inner edge) and press *into* the screen;
   a blinking block cursor; an RPG-style pointer arrow marks the active menu item.

---

## Token System

```css
:root {
  --px-bg:     #0f0f1b;                      /* deep console blue-black */
  --px-panel:  #26254a;
  --px-ink:    #e8e6ff;
  --px-accent: #ffe14d;                      /* coin yellow */
  --px-green:  #46e86a;
  --px-red:    #ff5a5a;
  --px-hi:     rgba(255,255,255,0.85);       /* raised top/left inner edge */
  --px-lo:     rgba(0,0,0,0.55);             /* recessed bottom/right */
  --px-font:   'Press Start 2P', monospace;
  --px-unit:   4px;                          /* the pixel unit for stepped borders */
}
* { image-rendering: pixelated; }
```

---

## Pixel border (stepped, via box-shadow)

```css
/* A blocky border with no anti-aliasing, plus a raised inner bevel. */
.px-raised {
  background: var(--px-panel); border: none;
  box-shadow:
    0 0 0 var(--px-unit) #000,                       /* hard outer outline */
    inset var(--px-unit) var(--px-unit) 0 var(--px-hi),   /* top-left highlight */
    inset calc(var(--px-unit)*-1) calc(var(--px-unit)*-1) 0 var(--px-lo); /* bottom-right shade */
}
```

## Button

```css
.px-btn {
  font-family: var(--px-font); font-size: 0.7rem; line-height: 1.4; color: #000;
  background: var(--px-accent); border: none; cursor: pointer; padding: 12px 18px;
  box-shadow: 0 0 0 4px #000, inset 4px 4px 0 var(--px-hi), inset -4px -4px 0 var(--px-lo);
  transition: none;                          /* instant, no easing */
}
.px-btn:hover  { background: #fff; }          /* instant color swap */
.px-btn:active { box-shadow: 0 0 0 4px #000, inset -4px -4px 0 var(--px-hi), inset 4px 4px 0 var(--px-lo); } /* pressed: bevel swaps */
.px-btn:focus-visible { outline: 4px solid var(--px-green); outline-offset: 4px; }
```

## Input (recessed, block cursor)

```css
.px-input {
  font-family: var(--px-font); font-size: 0.7rem; color: var(--px-ink); background: #000;
  border: none; padding: 12px; caret-color: var(--px-accent);
  box-shadow: inset 4px 4px 0 var(--px-lo), 0 0 0 4px #000;
}
/* a thick blinking block cursor when empty/focused (decorative helper) */
.px-caret::after { content: "▮"; color: var(--px-accent); animation: px-blink 1s steps(1) infinite; }
@keyframes px-blink { 50% { opacity: 0; } }
```

## RPG dialog / menu (double border + pointer)

```css
.px-dialog { background: var(--px-panel); color: var(--px-ink); font-family: var(--px-font); padding: 16px;
  box-shadow: 0 0 0 4px #000, 0 0 0 8px var(--px-ink), 0 0 0 12px #000; }  /* double outline */
.px-menu li { list-style: none; padding: 8px 8px 8px 28px; position: relative; cursor: pointer; }
.px-menu li[aria-current="true"]::before { content: "▶"; position: absolute; left: 6px; color: var(--px-accent);
  animation: px-blink 0.8s steps(1) infinite; }
```

## Tiled background

```css
.px-bg { background-color: var(--px-bg);
  background-image: linear-gradient(rgba(255,255,255,0.04) 2px, transparent 2px),
                    linear-gradient(90deg, rgba(255,255,255,0.04) 2px, transparent 2px);
  background-size: 16px 16px; }
```

---

## 8-Bit / Pixel Checklist

- [ ] No curves; state changes instant (no eased transitions)
- [ ] Chunky pixel font for headers, large enough to read
- [ ] Rigid block borders (stepped via box-shadow), raised/pressed bevels
- [ ] Tiled/dithered background, small high-contrast palette
- [ ] Blinking block cursor and/or RPG pointer arrow on active items
- [ ] `image-rendering: pixelated` on scaled pixel assets
- [ ] Text passes 4.5:1; `:focus-visible` present
- [ ] Any looping blink respects `prefers-reduced-motion`
