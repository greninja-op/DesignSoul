# Glitch Art / Cyber-Vapor — Component Code Library (ready to use)

Drop-in, production-ready glitch code. `../styles/glitch.md` holds the *principles*; **this file holds
the exact code** so the right hacked-terminal version already exists when a user asks for "a glitch /
CRT / cyber-vapor / terminal UI." Every recipe bakes in the traits — and the safety rules:

- **RGB channel split** (anaglyph) on key text/edges, used sparingly.
- **CRT scanlines** as a faint full-screen overlay; **static/noise** on panels.
- **Terminal monospace** type; phosphor/anaglyph palette on near-black.
- **Glitch as accent** — displacement bursts on hover/moments, not constant.
- **Legibility first** — base content stays readable; body text ≥ 4.5:1.
- **Safety** — `prefers-reduced-motion` disables all glitch/flicker; no rapid seizure-risk flashing.

```css
:root{
  --bg:#060608;--panel:#0d0f14;--ink:#d6f7e6;--green:#39ff8a;--magenta:#ff2d75;--cyan:#21e6ff;--dim:#5f6b6a;
  --mono:'JetBrains Mono','Share Tech Mono',ui-monospace,monospace;--split:2px;
}
body{background:var(--bg);color:var(--ink);font-family:var(--mono)}
/* faint CRT scanlines over everything */
body::before{content:"";position:fixed;inset:0;z-index:9;pointer-events:none;background:repeating-linear-gradient(rgba(255,255,255,.04) 0 1px,transparent 1px 3px)}
@media (prefers-reduced-motion: reduce){*{animation:none!important}}
```

---

## 1. Glitch text (RGB split; animated slice on hover)

```html
<h1 class="gl-text gl-glitch" data-text="SYSTEM://BREACH">SYSTEM://BREACH</h1>
```
```css
.gl-text{position:relative;color:var(--ink);font-family:var(--mono);text-shadow:calc(var(--split)*-1) 0 var(--magenta),var(--split) 0 var(--cyan)}
.gl-glitch:hover{animation:gl-shift .4s steps(2) infinite}
@keyframes gl-shift{0%{clip-path:inset(0 0 70% 0);transform:translateX(-2px)}50%{clip-path:inset(60% 0 0 0);transform:translateX(2px)}100%{clip-path:inset(0 0 0 0);transform:none}}
```

---

## 2. Panel (terminal frame + static)

```html
<section class="gl-panel">
  <div class="gl-bar">root@vapor:~$</div>
  <p>Compromised node. All content stays readable — glitch decorates the edges, not the body.</p>
</section>
```
```css
.gl-panel{position:relative;background:var(--panel);border:1px solid rgba(57,255,138,.35);color:var(--ink);font-family:var(--mono);padding:16px;display:flex;flex-direction:column;gap:10px;box-shadow:inset 0 0 0 1px rgba(33,230,255,.08)}
.gl-bar{color:var(--green);font-size:.8rem}
.gl-panel p{line-height:1.6;color:var(--ink)}
.gl-panel::after{content:"";position:absolute;inset:0;pointer-events:none;opacity:.05;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
```

---

## 3. Button (terminal prompt)

```html
<button class="gl-btn">EXECUTE</button>
<button class="gl-btn gl-btn-danger">PURGE</button>
```
```css
.gl-btn{background:transparent;color:var(--green);font-family:var(--mono);border:1px solid var(--green);border-radius:0;cursor:pointer;min-height:44px;padding:0 20px;text-transform:uppercase;letter-spacing:.1em}
.gl-btn::before{content:"> "}
.gl-btn:hover{color:var(--bg);background:var(--green);text-shadow:-2px 0 var(--magenta),2px 0 var(--cyan)}
.gl-btn:focus-visible{outline:2px solid var(--cyan);outline-offset:2px}
.gl-btn-danger{color:var(--magenta);border-color:var(--magenta)}
.gl-btn-danger:hover{background:var(--magenta);color:var(--bg)}
```

---

## 4. Input (terminal field)

```html
<label class="field"><span class="lbl">$ enter passphrase</span>
  <input class="gl-input" placeholder="********"></label>
```
```css
.field{display:flex;flex-direction:column;gap:6px}.lbl{color:var(--green);font-size:.8rem}
.gl-input{background:#000;color:var(--green);font-family:var(--mono);border:1px solid rgba(57,255,138,.4);border-radius:0;min-height:44px;padding:0 12px;caret-color:var(--green)}
.gl-input:focus{outline:none;border-color:var(--green);box-shadow:0 0 12px rgba(57,255,138,.4)}
```

---

## 5. Stat / readout

```html
<div class="gl-panel gl-stat"><span class="lbl">PACKETS LOST</span><div class="v gl-text">37%</div></div>
```
```css
.gl-stat{gap:6px}.gl-stat .lbl{color:var(--dim);font-size:.72rem;letter-spacing:.1em}
.gl-stat .v{font-size:2.4rem;font-variant-numeric:tabular-nums}
```

---

## 6. Navbar

```html
<header class="gl-nav">
  <a class="brand gl-text" href="#">▚ VAPOR//NET</a>
  <nav class="links"><a class="active" href="#">NODES</a><a href="#">LOGS</a><a href="#">SHELL</a></nav>
  <span class="pulse">● LIVE</span>
</header>
```
```css
.gl-nav{display:flex;align-items:center;gap:18px;padding:10px 16px;background:var(--panel);border:1px solid rgba(57,255,138,.3)}
.gl-nav .brand{margin-right:auto;text-decoration:none}
.links{display:flex;gap:14px}.links a{font-family:var(--mono);font-size:.8rem;text-decoration:none;color:var(--dim)}
.links a:hover,.links a.active{color:var(--green)}
.links a:focus-visible{outline:2px solid var(--cyan);outline-offset:2px}
.pulse{color:var(--magenta);font-size:.72rem;letter-spacing:.1em}
```

---

## 7. Modal / alert

```html
<div class="gl-overlay" role="dialog" aria-modal="true" aria-labelledby="m">
  <div class="gl-panel gl-modal"><div class="gl-bar" style="color:var(--magenta)">! FATAL</div>
    <h2 id="m" class="gl-text">Wipe all logs?</h2><p>This overwrites the buffer with noise. Irreversible.</p>
    <div class="actions"><button class="gl-btn">Cancel</button><button class="gl-btn gl-btn-danger">Wipe</button></div></div>
</div>
```
```css
.gl-overlay{position:fixed;inset:0;z-index:100;display:grid;place-items:center;padding:20px;background:rgba(6,6,8,.75)}
.gl-modal{width:min(440px,100%)}.gl-modal h2{font-size:1.4rem}
.actions{display:flex;justify-content:flex-end;gap:10px;margin-top:8px}
/* JS: trap focus, Esc closes, return focus to trigger on close (see ../accessibility.md) */
```

---

## Using this library (for the skill)

When a user wants glitch / CRT / cyber-vapor: **start from the panel + glitch text here**, then keep
it legible. Always:
1. Use **RGB split** on key text/edges only — never on body copy.
2. Add **faint scanlines** and **subtle static**; keep them low-opacity.
3. Use **terminal monospace** and a phosphor/anaglyph palette on near-black.
4. Make **glitch bursts** hover/moment accents, not constant motion.
5. Keep base content **readable** (≥ 4.5:1) with a visible focus ring.
6. **Disable all glitch/flicker under `prefers-reduced-motion`**; avoid rapid flashing.

## Quick checklist
- [ ] RGB channel split on key text/edges, sparingly (never body copy)
- [ ] Faint CRT scanlines + subtle static/noise
- [ ] Terminal monospace; phosphor/anaglyph palette on near-black
- [ ] Glitch bursts are hover/moment accents, not constant
- [ ] Base content readable; body text ≥ 4.5:1; `:focus-visible` visible
- [ ] `prefers-reduced-motion` disables glitch/flicker; no rapid seizure-risk flashing

Pairs with: `../styles/glitch.md` (principles), `cyber-hud.md` (clean HUD sibling + recipe),
`acid-graphics.md` (rave cousin + recipe), `effects-performance.md`, `accessibility.md` (flashing safety).
