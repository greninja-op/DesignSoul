# Style: Retro / Y2K / Vaporwave

The loud, nostalgic look that's surged back in 2026 — early-2000s web energy, pixel fonts,
chrome gradients, holographic sheens, scanlines, and saturated gradient skies.
Energetic and expressive. Use for music, gaming, fashion, events, creative portfolios.

> This is an expressive style. It still obeys structure and accessibility — loud is not
> the same as unusable.

---

## Core Principles

1. **Saturated gradient atmospheres** — sunset/cyber gradients, purple→pink→cyan
2. **Chrome & holographic surfaces** — metallic gradients, iridescent sheens
3. **Pixel / display type for accents** — not for body copy
4. **Glow and bloom** — neon glows, soft outer light on accents
5. **Retro motifs** — grids, scanlines, stars, sparkles — used as accents, not wallpaper

---

## Token System

```css
:root {
  --y2k-bg-1:   #2a0a4a;          /* deep purple */
  --y2k-bg-2:   #7b2ff7;          /* electric violet */
  --y2k-pink:   #ff5db1;
  --y2k-cyan:   #2de2e6;
  --y2k-lime:   #b6ff3c;
  --y2k-chrome-1: #f0f0ff;
  --y2k-chrome-2: #9aa7d8;
  --y2k-ink:    #1a0533;
  --y2k-text:   #f5f0ff;

  --y2k-glow-pink: 0 0 16px rgba(255,93,177,0.7);
  --y2k-glow-cyan: 0 0 16px rgba(45,226,230,0.7);
}
```

---

## Atmosphere Background

```css
.y2k-bg {
  background:
    radial-gradient(60% 50% at 50% 0%, var(--y2k-pink) 0%, transparent 55%),
    linear-gradient(180deg, var(--y2k-bg-2), var(--y2k-bg-1));
  position: relative;
  color: var(--y2k-text);
  overflow: hidden;
}

/* Optional perspective grid floor */
.y2k-bg::after {
  content: '';
  position: absolute; left: 0; right: 0; bottom: 0; height: 40%;
  background-image:
    linear-gradient(var(--y2k-cyan) 1px, transparent 1px),
    linear-gradient(90deg, var(--y2k-cyan) 1px, transparent 1px);
  background-size: 40px 40px;
  transform: perspective(300px) rotateX(60deg);
  transform-origin: bottom;
  opacity: 0.25;
  pointer-events: none;
}
```

---

## Chrome / Holographic Text

```css
.y2k-chrome {
  font-weight: 800;
  background: linear-gradient(180deg, #fff 0%, var(--y2k-chrome-1) 40%, var(--y2k-chrome-2) 60%, #fff 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 2px 0 rgba(0,0,0,0.2);
  letter-spacing: -0.02em;
}

.y2k-holo {
  background: linear-gradient(120deg, var(--y2k-pink), var(--y2k-cyan), var(--y2k-lime), var(--y2k-pink));
  background-size: 300% 300%;
  -webkit-background-clip: text; background-clip: text; color: transparent;
  animation: holoShift 6s linear infinite;
}
@keyframes holoShift { to { background-position: 300% 0; } }
```

---

## Button (glowing)

```css
.y2k-btn {
  background: linear-gradient(135deg, var(--y2k-pink), var(--y2k-cyan));
  color: var(--y2k-ink);
  border: 2px solid rgba(255,255,255,0.7);
  border-radius: 999px;
  padding: 12px 28px;
  font-weight: 700;
  box-shadow: var(--y2k-glow-pink);
  transition: all var(--duration-fast) var(--ease-out);
}
.y2k-btn:hover {
  box-shadow: var(--y2k-glow-cyan), 0 0 32px rgba(45,226,230,0.5);
  transform: translateY(-2px);
}
```

---

## Card (holographic sheen)

```css
.y2k-card {
  background: rgba(255,255,255,0.08);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.25);
  border-radius: 18px;
  padding: 24px;
  position: relative;
  overflow: hidden;
}
.y2k-card::before {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%);
  pointer-events: none;
}
```

---

## Typography

```css
/* Display/accent only — pixel or retro display faces:
   "Press Start 2P", "VT323", "Major Mono Display", "Orbitron".
   BODY text must stay a clean readable sans — never pixel font for paragraphs. */
.y2k-display { font-family: 'Orbitron', sans-serif; letter-spacing: 0.02em; }
.y2k-body    { font-family: 'Inter', sans-serif; line-height: 1.6; }
```

---

## Retro / Y2K Checklist

- [ ] Saturated gradient atmosphere (sunset/cyber), not flat color
- [ ] Chrome/holographic treatment on key display text
- [ ] Glow/bloom on accent elements (neon shadows)
- [ ] Pixel/retro display fonts for accents ONLY — body stays clean sans
- [ ] Retro motifs (grid floor, scanlines, sparkles) used as accents, not wallpaper
- [ ] Despite the loudness, body text still passes contrast (4.5:1)
- [ ] Animations respect `prefers-reduced-motion` (holo shimmer disabled)
- [ ] Effects are GPU-friendly (transform/opacity), not janky
