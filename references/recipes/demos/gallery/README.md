# DesignSoul — Style Gallery

Live, self-contained sampler pages built straight from the component recipe libraries in
`references/recipes/`. Each page is a real HTML/CSS document (no build step) showing a style's
navbar, card, buttons, input, toggle, and a stat/feature — so you can *see* how the components
behave, not just read the code.

## Run it

From the repository root:

```bash
py -m http.server 8099
# then open:
# http://localhost:8099/references/recipes/demos/gallery/index.html
```

`index.html` renders every sampler below in a scrollable grid of live previews, each with an
**open ↗** link to view it full-screen. (Frames are lazy-loaded, so scroll down to load the lower
rows.) Web fonts load from Google Fonts, so the type matches each style when you're online; offline,
they fall back to system fonts.

## What's here

| Style | File | What the sampler shows |
|---|---|---|
| Glassmorphism | `glassmorphism.html` | Frosted cards + nav over a rich gradient background |
| Liquid Glass (WebGL) | `../liquid-glass-components.html` | Interactive refraction — drag the components |
| Aurora / Mesh | `aurora.html` | Calm surfaces over a soft glowing blob field |
| Material You (M3) | `material-you.html` | Tonal elevation, state-layer buttons, FAB |
| Bento Grid | `bento.html` | Modular tile grid with one hero tile |
| Claymorphism | `claymorphism.html` | Puffed clay surfaces + colorful icon tiles |
| Neumorphism | `neumorphism.html` | Single-surface soft-UI, raised vs inset |
| Neo-Brutalism | `neo-brutalism.html` | Flat fills, thick borders, hard offset shadows |
| Brutalism | `brutalism.html` | Zero-radius, one bright accent, heavy type |
| Minimal / Swiss | `minimal-swiss.html` | Strict grid, hairline rules, type-driven hierarchy |
| Warm Editorial | `warm-editorial.html` | Cream paper, terracotta accent, serif + sans |
| Skeuomorphism | `skeuomorphism.html` | Brushed-metal buttons, inset screen, physical toggle |
| Retro / Y2K | `retro-y2k.html` | Cyber-sunset gradient, chrome/holographic text |
| Cyberpunk / Mech-HUD | `cyber-hud.html` | Angular neon panels, telemetry readouts on a grid |
| Pop Art / Comic | `pop-art.html` | Halftone dots, ink outlines, burst callouts |
| Kawaii / Pastel | `kawaii.html` | Soft pastels, rounded shapes, friendly mascot |
| Cyber-Retro / Win Desktop | `cyber-retro.html` | Windows-95-style beveled chrome + title bars |
| 8-Bit / Pixel Art | `pixel-art.html` | Pixel type, hard 4px bevels, sprite-style UI |
| Manga Panel Grid | `manga-panel.html` | Skewed ink panels, speed lines, focal burst |
| Acid Graphics | `acid-graphics.html` | Chrome blobs, warped display type, acid palette |
| Glitch / Cyber-Vapor | `glitch.html` | RGB-split, scanlines, datamosh accents |
| Doodle / Sketch | `doodle-sketch.html` | Hand-drawn wobble borders, marker accents |
| Dark Mode | `dark-mode.html` | Tuned dark token layer with a working theme toggle |

## Notes

- These are **demos**, not the source of truth — the exact, documented code lives in the matching
  `references/recipes/<style>.md`, and the principles in `references/styles/<style>.md`.
- A few styles are light-only by design (claymorphism, kawaii); a couple are dark-only (cyber-hud,
  glitch). Motion-heavy samplers respect `prefers-reduced-motion`.
- The three liquid-glass demos (`../liquid-glass.html`, `../liquid-glass-components.html`,
  `../liquid-glass-webgl.html`) are interactive WebGL — drag the components or scroll to see the
  refraction track the background.
