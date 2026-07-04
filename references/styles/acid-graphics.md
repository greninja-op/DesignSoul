# Style: Acid Graphics / Psychedelic Tech

Rave culture meets Y2K tech geometry: molten chrome blobs, harsh neon purples and greens,
ultra-distorted display type, and spiky vector starbursts. Chaotic, raw, rebellious. Done right:
controlled chaos with one clear focal point and readable body copy. Done wrong: an unreadable acid
soup where every element fights the others.

> Distinct from `retro-y2k.md` (soft vaporwave) and `glitch.md` (broken CRT). Acid is **glossy
> chrome + gooey blobs + spiky bursts + toxic neon** — liquid-metal rave flyer energy.

> **Ready-to-use code:** drop-in acid components (chrome blob, card, button, starburst, input,
> distorted title, navbar) live in `../recipes/acid-graphics.md`. Use this file for the *why*; use
> the recipe for code.

---

## Core Principles

1. **Molten chrome & metallic blobs** — glossy conic/radial gradients on gooey organic shapes.
2. **Toxic neon palette** — harsh purple + acid green + hot magenta on near-black.
3. **Distorted display type** — stretched/skewed/warped headlines (accent only, never body).
4. **Spiky starbursts** — sharp vector stars/sparkles as accents and badges.
5. **Gooey shapes** — asymmetric blob `border-radius`, not tidy rectangles.
6. **One focal point** — the chaos needs an anchor; everything else supports it.

---

## Token System

```css
:root {
  --ac-bg:     #0a0410;                      /* near-black purple */
  --ac-purple: #a020ff;
  --ac-green:  #b6ff1a;                       /* acid green */
  --ac-magenta:#ff1fa2;
  --ac-cyan:   #23f0ff;
  --ac-ink:    #f3e9ff;
  --ac-chrome: conic-gradient(from 210deg, #e9e9ff, #9aa7d8, #f0f0ff, #6b7bb0, #e9e9ff);
  --ac-blob:   42% 58% 63% 37% / 41% 44% 56% 59%;   /* organic blob radius */
  --ac-display:'Anton','Archivo Black',Impact,system-ui,sans-serif;
  --ac-body:   'Inter',system-ui,sans-serif;
}
```

---

## Chrome blob (the signature)

```css
.ac-blob {
  background: var(--ac-chrome); border-radius: var(--ac-blob);
  filter: drop-shadow(0 0 24px rgba(160,32,255,0.55));
  /* animate the morph slowly (respect reduced-motion) */
  animation: ac-morph 12s ease-in-out infinite;
}
@keyframes ac-morph {
  0%,100% { border-radius: 42% 58% 63% 37% / 41% 44% 56% 59%; }
  50%     { border-radius: 60% 40% 38% 62% / 57% 36% 64% 43%; }
}
```

## Card (glossy, gooey corner)

```css
.ac-card {
  background: rgba(160,32,255,0.10); color: var(--ac-ink);
  border: 1px solid rgba(182,255,26,0.45); border-radius: 26px 26px 26px 4px;
  -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px);
  padding: 22px; box-shadow: 0 0 30px rgba(160,32,255,0.3);
}
```

## Button (chrome fill, neon glow)

```css
.ac-btn {
  background: var(--ac-chrome); color: #12061f; cursor: pointer;
  border: 2px solid var(--ac-green); border-radius: 999px; padding: 12px 26px;
  font-family: var(--ac-display); text-transform: uppercase; letter-spacing: 0.04em;
  box-shadow: 0 0 18px rgba(182,255,26,0.6);
  transition: transform 140ms ease, box-shadow 140ms ease;
}
.ac-btn:hover  { transform: scale(1.04) rotate(-1deg); box-shadow: 0 0 28px rgba(255,31,162,0.7); }
.ac-btn:active { transform: scale(0.98); }
```

## Starburst badge

```css
.ac-burst {
  display: inline-grid; place-items: center; width: 72px; height: 72px;
  background: var(--ac-green); color: #0a0410; font-family: var(--ac-display); transform: rotate(-6deg);
  clip-path: polygon(50% 0,60% 26%,90% 12%,76% 42%,100% 50%,76% 58%,90% 88%,60% 74%,50% 100%,40% 74%,10% 88%,24% 58%,0 50%,24% 42%,10% 12%,40% 26%);
}
```

## Distorted title

```css
.ac-title {
  font-family: var(--ac-display); font-size: clamp(2.6rem, 8vw, 6rem); line-height: 0.9;
  text-transform: uppercase; color: var(--ac-green);
  transform: scaleY(1.25) skewX(-6deg); transform-origin: left;      /* warp the display */
  text-shadow: 0 0 18px rgba(182,255,26,0.6);
}
```

---

## Acid Graphics Checklist

- [ ] Molten chrome / metallic gradient present (conic/radial gloss)
- [ ] Toxic neon palette (purple/acid-green/magenta) on near-black
- [ ] Distorted display type for accents only; body stays a clean readable sans
- [ ] Spiky starbursts used as accents/badges
- [ ] Gooey/organic blob shapes, not tidy rectangles
- [ ] One clear focal point anchors the chaos
- [ ] Body text passes 4.5:1; `:focus-visible` visible against the neon
- [ ] Morph/rotate animations respect `prefers-reduced-motion`; effects GPU-friendly
