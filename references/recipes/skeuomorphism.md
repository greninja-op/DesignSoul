# Skeuomorphism (Modern) — Component Code Library (ready to use)

Drop-in, production-ready modern-skeuomorphic code. `../styles/skeuomorphism.md` holds the
*principles*; **this file holds the exact code** so the right tactile components already exist when a
user asks for "a realistic button / physical toggle / material panel." This is the *restrained* 2026
version — subtle realism, real material cues, no stitched-leather excess:

- **One consistent light source** (top) — every highlight and shadow agrees with it.
- **Layered depth** — bevels, inner shadows, and gradients build physical layers.
- **Material texture** — a whisper of grain/noise so surfaces aren't flat plastic.
- **Tactile controls** — buttons look pressable; switches look throwable; screens look recessed.
- **Pressed = the shadow flips inward** — the control visibly pushes in.
- **Restraint** — suggest the material, don't photo-render it. Use it where physical metaphor helps
  (audio, instruments, calculators, watches).
- **Accessible by default** — `:focus-visible`, reduced-motion, and contrast on textured surfaces.

```css
:root {
  --sk-bg:          #e8e6e1;                 /* warm neutral surface */
  --sk-metal-1:     #f5f5f7;
  --sk-metal-2:     #c8c8cc;
  --sk-highlight:   rgba(255,255,255,0.85);
  --sk-shadow:      rgba(0,0,0,0.25);
  --sk-shadow-deep: rgba(0,0,0,0.40);
  --sk-text:        #2b2b2e;
  --sk-text-muted:  #6a6a70;
  --sk-accent:      #2f7de1;
  --ease: cubic-bezier(0.22, 1, 0.36, 1);
  --spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --dur: 140ms;
}

body { background: var(--sk-bg); color: var(--sk-text); }
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition-duration: 0.01ms !important; }
}
```

---

## 1. Material panel / card (subtle noise, top light catch)

```html
<section class="sk-surface sk-card">
  <h3>Now Playing</h3>
  <p>Restrained realism — a hint of grain, a soft top highlight, a grounded shadow.</p>
</section>
```
```css
.sk-surface {
  background-color: var(--sk-bg);
  /* very subtle fractal noise so it isn't flat plastic */
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
  border-radius: 18px;
  box-shadow: inset 0 1px 0 var(--sk-highlight), 0 8px 24px rgba(0,0,0,0.12);
}
.sk-card { padding: 24px; display: flex; flex-direction: column; gap: 8px; }
.sk-card h3 { font-weight: 700; }
.sk-card p  { color: var(--sk-text-muted); line-height: 1.55; }
```

---

## 2. Raised physical button (presses in on click)

```html
<button class="sk-button">Play</button>
<button class="sk-button sk-button-accent">Record</button>
```
```css
.sk-button {
  background: linear-gradient(180deg, var(--sk-metal-1), var(--sk-metal-2));
  border: 1px solid rgba(0,0,0,0.15); border-radius: 14px; cursor: pointer;
  min-height: 46px; padding: 0 26px; color: var(--sk-text); font-weight: 600;
  box-shadow:
    inset 0 1px 0 var(--sk-highlight),        /* top edge catches light */
    inset 0 -2px 4px rgba(0,0,0,0.10),        /* inner bottom shade */
    0 2px 3px var(--sk-shadow),               /* contact shadow */
    0 6px 12px rgba(0,0,0,0.12);              /* ambient */
  transition: box-shadow var(--dur) var(--ease), transform var(--dur) var(--ease), background var(--dur) var(--ease);
}
.sk-button:active {
  background: linear-gradient(180deg, var(--sk-metal-2), var(--sk-metal-1));
  transform: translateY(1px);
  box-shadow: inset 0 2px 4px var(--sk-shadow-deep), 0 1px 1px var(--sk-shadow);   /* pressed in */
}
.sk-button:focus-visible { outline: 2px solid var(--sk-accent); outline-offset: 3px; }
.sk-button-accent { color: #fff; background: linear-gradient(180deg, #5aa0f0, #2f7de1);
  border-color: rgba(0,0,0,0.2); box-shadow: inset 0 1px 0 rgba(255,255,255,0.5),
    inset 0 -2px 4px rgba(0,0,0,0.2), 0 2px 3px var(--sk-shadow), 0 6px 12px rgba(47,125,225,0.3); }
```

---

## 3. Toggle switch (physical, recessed track)

```html
<button class="sk-switch" role="switch" aria-checked="true"><span class="knob"></span></button>
```
```css
.sk-switch { width: 58px; height: 32px; border: none; cursor: pointer; border-radius: 999px; position: relative;
  background: linear-gradient(180deg, #c4c4c8, #e0e0e4);
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.30), inset 0 -1px 0 var(--sk-highlight);
  transition: background var(--dur) var(--ease); }
.sk-switch .knob { position: absolute; top: 2px; left: 2px; width: 28px; height: 28px; border-radius: 50%;
  background: linear-gradient(180deg, #ffffff, #d8d8dc);
  box-shadow: 0 2px 3px rgba(0,0,0,0.35), inset 0 1px 0 #fff;
  transition: transform var(--dur) var(--spring); }
.sk-switch[aria-checked="true"] { background: linear-gradient(180deg, #2f7de1, #5aa0f0); }
.sk-switch[aria-checked="true"] .knob { transform: translateX(26px); }
.sk-switch:focus-visible { outline: 2px solid var(--sk-accent); outline-offset: 3px; }
```

---

## 4. Inset display / screen (recessed readout)

```html
<div class="sk-display"><span class="sk-readout">128.50</span></div>
```
```css
.sk-display { background: #1c1f1a; border-radius: 10px; padding: 16px; color: #b6ff6b;
  box-shadow: inset 0 2px 6px rgba(0,0,0,0.70), inset 0 -1px 0 rgba(255,255,255,0.06); }
.sk-readout { font-family: 'DSEG7', 'Courier New', monospace; font-size: 2rem; letter-spacing: 0.06em; }
```

---

## 5. Input / form field (recessed groove)

```html
<label class="field">
  <span class="field-label">Track name</span>
  <input class="sk-input" type="text" placeholder="Untitled" />
</label>
```
```css
.field { display: flex; flex-direction: column; gap: 6px; }
.field-label { font-size: 0.82rem; font-weight: 600; color: var(--sk-text-muted); }
.sk-input { min-height: 46px; padding: 0 14px; border: 1px solid rgba(0,0,0,0.12); border-radius: 10px;
  background: #fbfbfd; color: var(--sk-text); font-size: 1rem;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.14), inset 0 -1px 0 var(--sk-highlight);
  transition: box-shadow var(--dur) var(--ease); }
.sk-input::placeholder { color: var(--sk-text-muted); }
.sk-input:focus-visible { outline: none;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.14), 0 0 0 3px color-mix(in oklab, var(--sk-accent) 30%, transparent); }
```

---

## 6. Slider (grooved rail, raised thumb)

```html
<div class="sk-slider"><div class="rail"><i class="fill" style="width:60%"></i><span class="thumb" style="left:60%"></span></div></div>
```
```css
.sk-slider { padding: 12px 0; }
.sk-slider .rail { position: relative; height: 8px; border-radius: 999px; background: #d3d3d8;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.30), inset 0 -1px 0 var(--sk-highlight); }
.sk-slider .fill { position: absolute; left: 0; top: 0; height: 100%; border-radius: 999px;
  background: linear-gradient(180deg, #5aa0f0, #2f7de1); }
.sk-slider .thumb { position: absolute; top: 50%; width: 22px; height: 22px; border-radius: 50%; transform: translate(-50%,-50%);
  background: linear-gradient(180deg, #fff, #d8d8dc); box-shadow: 0 2px 4px rgba(0,0,0,0.4), inset 0 1px 0 #fff; cursor: grab; }
```

---

## 7. Knob / dial (turnable)

```html
<div class="sk-knob" style="--deg:120deg"><span class="indicator"></span></div>
```
```css
.sk-knob { width: 72px; height: 72px; border-radius: 50%; position: relative;
  background: radial-gradient(circle at 50% 35%, var(--sk-metal-1), var(--sk-metal-2));
  box-shadow: inset 0 2px 3px var(--sk-highlight), inset 0 -3px 6px rgba(0,0,0,0.25),
    0 4px 10px rgba(0,0,0,0.25); transform: rotate(var(--deg, 0deg)); }
.sk-knob .indicator { position: absolute; top: 8px; left: 50%; width: 4px; height: 16px; border-radius: 2px;
  background: var(--sk-accent); transform: translateX(-50%); }
```

---

## 8. Navbar (brushed metal strip)

```html
<header class="sk-nav">
  <a class="brand" href="#">Studio</a>
  <nav class="nav-links"><a href="#" class="active">Mix</a><a href="#">Library</a><a href="#">Settings</a></nav>
</header>
```
```css
.sk-nav { display: flex; align-items: center; gap: 18px; padding: 12px 18px;
  background: linear-gradient(180deg, #f2f2f4, #d6d6da); border-bottom: 1px solid rgba(0,0,0,0.2);
  box-shadow: inset 0 1px 0 var(--sk-highlight), 0 2px 4px rgba(0,0,0,0.15); }
.sk-nav .brand { font-weight: 700; margin-right: auto; text-decoration: none; color: var(--sk-text);
  text-shadow: 0 1px 0 var(--sk-highlight); }
.nav-links { display: flex; gap: 4px; }
.nav-links a { padding: 8px 14px; border-radius: 10px; text-decoration: none; color: var(--sk-text); font-weight: 600;
  text-shadow: 0 1px 0 var(--sk-highlight); transition: box-shadow var(--dur) var(--ease); }
.nav-links a.active { box-shadow: inset 0 2px 4px rgba(0,0,0,0.25), inset 0 -1px 0 var(--sk-highlight); color: var(--sk-accent); }
.nav-links a:focus-visible { outline: 2px solid var(--sk-accent); outline-offset: 2px; }
```

---

## Using this library (for the skill)

When a user wants (modern) skeuomorphism: **start from the matching recipe here**, then keep it
restrained. Always:
1. Commit to **one top light source** — every highlight/shadow must agree with it.
2. Build controls from **layered shadows** (top highlight + inner shade + contact + ambient).
3. On `:active`, **flip the shadow inward** so the control looks pushed in.
4. Add a **whisper of texture** so surfaces aren't flat plastic; recess screens/inputs with inset shadow.
5. Use it **intentionally** for products with a physical metaphor — not everywhere.
6. Keep contrast honest on textured/material surfaces; keep `:focus-visible`.

## Quick checklist
- [ ] Single consistent top light source; highlights/shadows agree
- [ ] Raised controls: top highlight + inner bottom shade + contact + ambient shadow
- [ ] `:active` flips to an inset shadow (pushed in)
- [ ] Subtle texture/noise, not flat plastic
- [ ] Recessed elements (screens, inputs, tracks) use inset shadows
- [ ] Used intentionally for a physical-metaphor product; restrained, not over-rendered
- [ ] `:focus-visible` on controls; `prefers-reduced-motion` respected
- [ ] Text on material surfaces still meets 4.5:1

Pairs with: `../styles/skeuomorphism.md` (principles), `depth.md` (layered light/shadow),
`motion.md` (spring on tactile controls), `accessibility.md` (contrast, focus).
