# Style: Glitch Art / Cyber-Vapor

A "hacked terminal" aesthetic: broken CRT scanlines, RGB channel separation (anaglyph offset),
static-fuzz textures, and monospace terminal type. Conveys an underground, compromised-system vibe.
Done right: legible content with glitch as accent/atmosphere. Done wrong: everything vibrating with
RGB split so nothing can be read.

> Distinct from `cyber-hud.md` (clean functional HUD) and `acid-graphics.md` (glossy chrome). Glitch
> is **broken, noisy, terminal** — artifacts and errors as the aesthetic.

> **Ready-to-use code:** drop-in glitch components (RGB-split text, terminal panel, button, input,
> readout, navbar, alert) live in `../recipes/glitch.md`. Use this file for the *why*; use the recipe
> for code.

---

## Core Principles

1. **RGB channel split** — a red + cyan offset shadow on key text/edges (anaglyph), used sparingly.
2. **CRT scanlines** — a faint repeating horizontal line overlay across the screen.
3. **Static / noise texture** — subtle fuzz on panels; occasional flicker.
4. **Terminal monospace** — mono type, green/amber phosphor or magenta/cyan on near-black.
5. **Glitch as accent** — displacement/slice bursts on hover or key moments, not constant.
6. **Legibility first** — the base content stays readable; glitch decorates edges and moments.

---

## Token System

```css
:root {
  --gl-bg:     #060608;
  --gl-panel:  #0d0f14;
  --gl-ink:    #d6f7e6;
  --gl-green:  #39ff8a;                       /* phosphor green */
  --gl-magenta:#ff2d75;
  --gl-cyan:   #21e6ff;
  --gl-dim:    #5f6b6a;
  --gl-mono:   'JetBrains Mono','Share Tech Mono',ui-monospace,monospace;
  --gl-split:  2px;                           /* channel-separation distance */
}
/* Scanline overlay — put on a full-screen ::before */
.gl-scan::before {
  content: ""; position: fixed; inset: 0; z-index: 9; pointer-events: none;
  background: repeating-linear-gradient(rgba(255,255,255,0.04) 0 1px, transparent 1px 3px);
}
```

---

## Glitch text (RGB split)

```css
.gl-text { position: relative; color: var(--gl-ink); font-family: var(--gl-mono);
  text-shadow: calc(var(--gl-split)*-1) 0 var(--gl-magenta), var(--gl-split) 0 var(--gl-cyan); }
/* stronger, animated slice on hover (respect reduced-motion) */
.gl-glitch:hover { animation: gl-shift 0.4s steps(2) infinite; }
@keyframes gl-shift {
  0% { clip-path: inset(0 0 70% 0); transform: translateX(-2px); }
  50%{ clip-path: inset(60% 0 0 0);  transform: translateX(2px); }
  100%{clip-path: inset(0 0 0 0);    transform: none; }
}
```

## Panel (noise + terminal frame)

```css
.gl-panel {
  background: var(--gl-panel); border: 1px solid rgba(57,255,138,0.35);
  color: var(--gl-ink); font-family: var(--gl-mono); padding: 16px; position: relative;
  box-shadow: inset 0 0 0 1px rgba(33,230,255,0.08);
}
.gl-panel::after {   /* faint static */
  content: ""; position: absolute; inset: 0; pointer-events: none; opacity: 0.05;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}
```

## Button

```css
.gl-btn {
  background: transparent; color: var(--gl-green); font-family: var(--gl-mono);
  border: 1px solid var(--gl-green); border-radius: 0; cursor: pointer; padding: 10px 20px;
  text-transform: uppercase; letter-spacing: 0.1em;
}
.gl-btn::before { content: "> "; }
.gl-btn:hover { color: var(--gl-bg); background: var(--gl-green); text-shadow: -2px 0 var(--gl-magenta), 2px 0 var(--gl-cyan); }
.gl-btn:focus-visible { outline: 2px solid var(--gl-cyan); outline-offset: 2px; }
```

## Input (terminal prompt)

```css
.gl-input {
  background: #000; color: var(--gl-green); font-family: var(--gl-mono);
  border: 1px solid rgba(57,255,138,0.4); border-radius: 0; padding: 10px 12px; caret-color: var(--gl-green);
}
.gl-input:focus { outline: none; border-color: var(--gl-green); box-shadow: 0 0 12px rgba(57,255,138,0.4); }
```

---

## Glitch Art Checklist

- [ ] RGB channel split on key text/edges, used sparingly (not everywhere)
- [ ] CRT scanline overlay present but faint
- [ ] Subtle static/noise texture on panels
- [ ] Terminal monospace type; phosphor/anaglyph palette on near-black
- [ ] Glitch bursts are accents/hover moments, not constant motion
- [ ] Base content stays readable; body text passes 4.5:1
- [ ] `:focus-visible` visible; all glitch/flicker animation respects `prefers-reduced-motion`
- [ ] No seizure-risk rapid flashing (keep flicker slow/subtle)
