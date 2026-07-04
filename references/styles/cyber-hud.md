# Style: Cyberpunk / Mech-HUD

A high-tech heads-up display, like the interface layer of a sci-fi anime or a mech cockpit.
Angular framing, thin neon lines, data grids, monospaced glowing readouts, and corner brackets
that make every panel feel like a targeting reticle. Done right: immersive, premium, "in the machine."
Done wrong: a pile of random glows and unreadable text on pure black.

> Distinct from `glitch.md` (broken/hacked artifacts) and `retro-y2k.md` (vaporwave). This is the
> *clean, functional* future-HUD: sharp, legible, deliberate.

> **Ready-to-use code:** drop-in HUD components (panel, button, input, readout/gauge, navbar, toggle,
> modal) live in `../recipes/cyber-hud.md`. Use this file for the *why*; use the recipe for the code.

---

## Core Principles

1. **Angular, not round** — clipped corners, notched panels, corner brackets. Radius is near-zero.
2. **The line is the material** — thin 1px neon strokes, grids, and rules do the drawing; fills stay dark and flat.
3. **One or two neon accents on a deep base** — cyan + magenta (or amber) over near-black tinted blue, not rainbow.
4. **Monospaced data voice** — labels in uppercase mono with wide tracking; numbers are tabular readouts.
5. **Glow is restraint** — a soft outer glow on key lines/text only; the bulk stays crisp and legible.
6. **HUD chrome** — corner ticks, scan bars, status dots, and coordinate labels frame content like instrumentation.

---

## Token System

```css
:root {
  --hud-bg:        #05080f;                 /* deep blue-black, not pure #000 */
  --hud-panel:     rgba(10,20,32,0.72);
  --hud-line:      rgba(0,229,255,0.55);    /* primary neon = cyan */
  --hud-line-soft: rgba(0,229,255,0.18);
  --hud-accent:    #00e5ff;                 /* cyan */
  --hud-accent-2:  #ff3d81;                 /* magenta secondary */
  --hud-warn:      #ffcf3a;
  --hud-text:      #cdeef5;
  --hud-text-dim:  #6f8a95;
  --hud-glow:      0 0 8px rgba(0,229,255,0.6);
  --hud-mono:      'Share Tech Mono','JetBrains Mono',ui-monospace,monospace;
  --hud-radius:    2px;                      /* essentially sharp */
}
```

---

## Panel (with corner brackets + clipped corner)

```css
.hud-panel {
  position: relative;
  background: var(--hud-panel);
  border: 1px solid var(--hud-line);
  border-radius: var(--hud-radius);
  padding: 18px;
  color: var(--hud-text);
  /* clip one corner so it reads as machined, not a plain box */
  clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%);
}
/* glowing corner ticks */
.hud-panel::before, .hud-panel::after {
  content: ""; position: absolute; width: 12px; height: 12px; border: 2px solid var(--hud-accent);
  filter: drop-shadow(var(--hud-glow));
}
.hud-panel::before { top: -1px; left: -1px; border-right: 0; border-bottom: 0; }
.hud-panel::after  { bottom: -1px; right: -1px; border-left: 0; border-top: 0; }
```

## Button

```css
.hud-btn {
  background: transparent; color: var(--hud-accent); cursor: pointer;
  border: 1px solid var(--hud-line); border-radius: var(--hud-radius);
  padding: 10px 20px; font-family: var(--hud-mono); text-transform: uppercase; letter-spacing: 0.12em;
  clip-path: polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px);
  transition: background 120ms linear, box-shadow 120ms linear, color 120ms linear;
}
.hud-btn:hover { background: rgba(0,229,255,0.12); box-shadow: var(--hud-glow), inset 0 0 12px rgba(0,229,255,0.2); }
.hud-btn:active { background: rgba(0,229,255,0.22); }
.hud-btn:focus-visible { outline: 2px solid var(--hud-accent); outline-offset: 2px; }
```

## Input

```css
.hud-input {
  background: rgba(0,0,0,0.4); color: var(--hud-text); font-family: var(--hud-mono);
  border: 1px solid var(--hud-line-soft); border-left: 2px solid var(--hud-accent);
  border-radius: 0; padding: 10px 12px; caret-color: var(--hud-accent);
}
.hud-input:focus { outline: none; border-color: var(--hud-accent); box-shadow: var(--hud-glow); }
.hud-input::placeholder { color: var(--hud-text-dim); }
```

## Data grid background

```css
.hud-grid {
  background-color: var(--hud-bg);
  background-image:
    linear-gradient(var(--hud-line-soft) 1px, transparent 1px),
    linear-gradient(90deg, var(--hud-line-soft) 1px, transparent 1px);
  background-size: 32px 32px;
}
```

## Typography

```css
/* Mono for labels/readouts (Share Tech Mono, JetBrains Mono, Orbitron for display).
   Body copy can be a clean sans; keep the HUD voice for labels and numbers. */
.hud-label { font-family: var(--hud-mono); font-size: 0.7rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--hud-text-dim); }
.hud-readout { font-family: var(--hud-mono); font-variant-numeric: tabular-nums; color: var(--hud-accent); text-shadow: var(--hud-glow); }
```

---

## Cyber-HUD Checklist

- [ ] Angular framing — clipped corners / brackets, radius ≈ 0
- [ ] Thin neon lines + a data grid do the drawing; fills stay dark and flat
- [ ] One or two neon accents on a deep tinted base (not pure black, not rainbow)
- [ ] Monospaced uppercase labels + tabular numeric readouts
- [ ] Glow reserved for key lines/text; body stays crisp and legible
- [ ] Text passes 4.5:1 on the dark base; `:focus-visible` visible against the grid
- [ ] `prefers-reduced-motion` respected (no constant scanline/flicker); effects GPU-friendly
