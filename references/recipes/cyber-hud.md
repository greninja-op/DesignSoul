# Cyberpunk / Mech-HUD — Component Code Library (ready to use)

Drop-in, production-ready HUD code for each common component. `../styles/cyber-hud.md` holds the
*principles*; **this file holds the exact code** so the right sci-fi-HUD version already exists when a
user asks for "a cyberpunk / mech-HUD / sci-fi dashboard." Every recipe bakes in what makes it read as
instrumentation, not a dark theme with glows:

- **Angular framing** — clipped corners, corner brackets, notches; radius ≈ 0.
- **The line is the material** — thin neon strokes, grids, rules; fills stay dark and flat.
- **One or two neon accents on a deep tinted base** — cyan + magenta, not rainbow, not pure black.
- **Monospaced data voice** — uppercase mono labels with wide tracking; tabular numeric readouts.
- **Glow is restraint** — soft outer glow on key lines/text only; body stays crisp and legible.
- **Accessible by default** — 4.5:1 text on the dark base, visible `:focus-visible`, reduced-motion
  freezes any scan/flicker.

```css
:root {
  --hud-bg:#05080f; --hud-panel:rgba(10,20,32,.72);
  --hud-line:rgba(0,229,255,.55); --hud-line-soft:rgba(0,229,255,.18);
  --hud-accent:#00e5ff; --hud-accent-2:#ff3d81; --hud-warn:#ffcf3a;
  --hud-text:#cdeef5; --hud-text-dim:#6f8a95;
  --hud-glow:0 0 8px rgba(0,229,255,.6);
  --hud-mono:'Share Tech Mono','JetBrains Mono',ui-monospace,monospace;
  --hud-radius:2px;
}
body{background:var(--hud-bg);color:var(--hud-text);font-family:Inter,system-ui,sans-serif}
.hud-grid{background-color:var(--hud-bg);background-image:linear-gradient(var(--hud-line-soft) 1px,transparent 1px),linear-gradient(90deg,var(--hud-line-soft) 1px,transparent 1px);background-size:32px 32px}
.hud-label{font-family:var(--hud-mono);font-size:.7rem;letter-spacing:.18em;text-transform:uppercase;color:var(--hud-text-dim)}
.hud-readout{font-family:var(--hud-mono);font-variant-numeric:tabular-nums;color:var(--hud-accent);text-shadow:var(--hud-glow)}
@media (prefers-reduced-motion: reduce){*{animation:none!important;transition-duration:.01ms!important}}
```

---

## 1. Panel / card (corner brackets + clipped corner)

```html
<section class="hud-panel">
  <span class="hud-label">SYS · CORE</span>
  <h3>Reactor status</h3>
  <p>Angular machined panel with glowing corner ticks and a notched corner.</p>
</section>
```
```css
.hud-panel{position:relative;background:var(--hud-panel);border:1px solid var(--hud-line);border-radius:var(--hud-radius);
  padding:18px;display:flex;flex-direction:column;gap:8px;color:var(--hud-text);
  clip-path:polygon(0 0,calc(100% - 14px) 0,100% 14px,100% 100%,0 100%)}
.hud-panel h3{font-weight:700}.hud-panel p{color:var(--hud-text-dim);line-height:1.5}
.hud-panel::before,.hud-panel::after{content:"";position:absolute;width:12px;height:12px;border:2px solid var(--hud-accent);filter:drop-shadow(var(--hud-glow))}
.hud-panel::before{top:-1px;left:-1px;border-right:0;border-bottom:0}
.hud-panel::after{bottom:-1px;right:-1px;border-left:0;border-top:0}
```

---

## 2. Button (notched, glows on hover)

```html
<button class="hud-btn">ENGAGE</button>
<button class="hud-btn hud-btn-2">ABORT</button>
```
```css
.hud-btn{background:transparent;color:var(--hud-accent);cursor:pointer;border:1px solid var(--hud-line);border-radius:var(--hud-radius);
  min-height:44px;padding:0 22px;font-family:var(--hud-mono);text-transform:uppercase;letter-spacing:.12em;
  clip-path:polygon(8px 0,100% 0,100% calc(100% - 8px),calc(100% - 8px) 100%,0 100%,0 8px);
  transition:background 120ms linear,box-shadow 120ms linear}
.hud-btn:hover{background:rgba(0,229,255,.12);box-shadow:var(--hud-glow),inset 0 0 12px rgba(0,229,255,.2)}
.hud-btn:active{background:rgba(0,229,255,.22)}
.hud-btn:focus-visible{outline:2px solid var(--hud-accent);outline-offset:2px}
.hud-btn-2{color:var(--hud-accent-2);border-color:rgba(255,61,129,.55)}
.hud-btn-2:hover{background:rgba(255,61,129,.12);box-shadow:0 0 8px rgba(255,61,129,.6)}
```

---

## 3. Input (left accent bar, block caret)

```html
<label class="field"><span class="hud-label">CALLSIGN</span>
  <input class="hud-input" placeholder="ENTER ID"></label>
```
```css
.field{display:flex;flex-direction:column;gap:6px}
.hud-input{background:rgba(0,0,0,.4);color:var(--hud-text);font-family:var(--hud-mono);border:1px solid var(--hud-line-soft);
  border-left:2px solid var(--hud-accent);border-radius:0;min-height:44px;padding:0 12px;caret-color:var(--hud-accent)}
.hud-input:focus{outline:none;border-color:var(--hud-accent);box-shadow:var(--hud-glow)}
.hud-input::placeholder{color:var(--hud-text-dim)}
```

---

## 4. Readout / stat (the HUD's signature — a labelled gauge)

```html
<div class="hud-panel hud-stat">
  <span class="hud-label">HULL INTEGRITY</span>
  <div class="hud-readout big">87<span class="u">%</span></div>
  <div class="gauge"><i style="width:87%"></i></div>
</div>
```
```css
.hud-stat{gap:10px}
.hud-readout.big{font-size:2.6rem;line-height:1}.hud-readout .u{font-size:1rem;margin-left:4px}
.gauge{height:8px;background:rgba(0,229,255,.1);border:1px solid var(--hud-line-soft);overflow:hidden}
.gauge i{display:block;height:100%;background:var(--hud-accent);box-shadow:var(--hud-glow)}
```

---

## 5. Navbar (status bar with brackets + live dot)

```html
<header class="hud-nav">
  <span class="brand hud-label">◤ NEXUS-OS</span>
  <nav class="links"><a class="active" href="#">DASH</a><a href="#">MAP</a><a href="#">LOGS</a></nav>
  <span class="status"><i></i> ONLINE</span>
</header>
```
```css
.hud-nav{display:flex;align-items:center;gap:20px;padding:10px 16px;background:var(--hud-panel);border:1px solid var(--hud-line-soft);border-top:2px solid var(--hud-accent)}
.hud-nav .brand{margin-right:auto;color:var(--hud-accent)}
.links{display:flex;gap:4px}
.links a{font-family:var(--hud-mono);font-size:.78rem;letter-spacing:.1em;padding:8px 12px;text-decoration:none;color:var(--hud-text-dim);border:1px solid transparent}
.links a:hover{color:var(--hud-text)}.links a.active{color:var(--hud-accent);border-color:var(--hud-line);box-shadow:inset 0 0 8px rgba(0,229,255,.2)}
.links a:focus-visible{outline:2px solid var(--hud-accent);outline-offset:2px}
.status{font-family:var(--hud-mono);font-size:.72rem;letter-spacing:.1em;color:var(--hud-text-dim);display:inline-flex;align-items:center;gap:6px}
.status i{width:8px;height:8px;border-radius:50%;background:#39ff8a;box-shadow:0 0 8px #39ff8a}
```

---

## 6. Toggle (angular)

```html
<button class="hud-switch" role="switch" aria-checked="true"><span class="k"></span></button>
```
```css
.hud-switch{width:58px;height:28px;padding:2px;cursor:pointer;background:rgba(0,0,0,.5);border:1px solid var(--hud-line-soft);display:flex}
.hud-switch .k{width:24px;height:22px;background:var(--hud-text-dim);transition:transform 120ms linear,background 120ms linear}
.hud-switch[aria-checked=true]{border-color:var(--hud-accent);box-shadow:inset 0 0 10px rgba(0,229,255,.25)}
.hud-switch[aria-checked=true] .k{transform:translateX(30px);background:var(--hud-accent);box-shadow:var(--hud-glow)}
.hud-switch:focus-visible{outline:2px solid var(--hud-accent);outline-offset:2px}
```

---

## 7. Modal / alert

```html
<div class="hud-overlay" role="dialog" aria-modal="true" aria-labelledby="m">
  <div class="hud-panel hud-modal"><span class="hud-label" style="color:var(--hud-warn)">⚠ WARNING</span>
    <h2 id="m">Purge cache?</h2><p>This wipes the local buffer. Action is irreversible.</p>
    <div class="actions"><button class="hud-btn hud-btn-2">ABORT</button><button class="hud-btn">CONFIRM</button></div></div>
</div>
```
```css
.hud-overlay{position:fixed;inset:0;z-index:100;display:grid;place-items:center;padding:20px;background:rgba(2,6,14,.7)}
.hud-modal{width:min(440px,100%);gap:12px;border-color:var(--hud-warn)}
.hud-modal::before,.hud-modal::after{border-color:var(--hud-warn);filter:drop-shadow(0 0 8px rgba(255,207,58,.6))}
.actions{display:flex;justify-content:flex-end;gap:10px;margin-top:8px}
/* JS: trap focus, Esc closes, return focus to trigger on close (see ../accessibility.md) */
```

---

## Using this library (for the skill)

When a user wants cyberpunk / mech-HUD: **start from the panel + button here**, then set one or two
neon accents. Always:
1. Keep framing **angular** (clip-path corners, brackets); radius ≈ 0.
2. Let **thin neon lines + a grid** carry the design; keep fills dark and flat.
3. Use **mono uppercase labels + tabular readouts** for the data voice.
4. Reserve **glow** for key lines/text; keep body copy crisp and legible.
5. Verify **4.5:1** on the dark base and a visible focus ring over the grid.
6. Freeze any scan/flicker under `prefers-reduced-motion`.

## Quick checklist
- [ ] Angular framing (clip-path/brackets), radius ≈ 0
- [ ] Thin neon lines + grid do the drawing; fills dark and flat
- [ ] One or two neon accents on a deep tinted base (not pure black/rainbow)
- [ ] Mono uppercase labels + tabular numeric readouts
- [ ] Glow only on key lines/text; body crisp and legible
- [ ] Text ≥ 4.5:1 on the base; `:focus-visible` visible on the grid
- [ ] `prefers-reduced-motion` freezes scan/flicker; effects GPU-friendly

Pairs with: `../styles/cyber-hud.md` (principles), `glitch.md` (the broken/hacked cousin + recipe),
`effects-performance.md` (glow budget), `motion.md`, `accessibility.md`.
