# Cyber-Retro / Windows Desktop (Y2K OS) — Component Code Library (ready to use)

Drop-in, production-ready OS-chrome code. `../styles/cyber-retro.md` holds the *principles*; **this
file holds the exact code** so the right early-2000s-desktop version already exists when a user asks
for "a Windows 95/XP / retro-OS / dialog-box UI." Every recipe bakes in the traits:

- **Two-tone bevels** — raised = light top-left + dark bottom-right; inset inverts it. The whole look.
- **Window chrome** — title bars with a blue/teal gradient, min/max/close, thick frames.
- **System gray + one desktop accent**; optional metallic gradient.
- **Sharp corners** (radius 0) and **system/pixel type**.
- **Tactile press** — buttons flip their bevel inward on click.
- **Accessible by default** — dark ink on gray/white clears 4.5:1; `:focus-visible`; reduced-motion.

```css
:root{
  --face:#c0c0c0;--face2:#d9d9d9;--hi:#fff;--lo:#808080;--lo2:#404040;
  --title1:#1a52c9;--title2:#4b9bff;--title-tx:#fff;--desktop:#128a86;--ink:#0a0a0a;--accent:#1a52c9;
  --ui:'Tahoma','Segoe UI',system-ui,sans-serif;--pixel:'VT323',monospace;
}
body{background:var(--desktop);color:var(--ink);font-family:var(--ui)}
.raised{border:2px solid;border-color:var(--hi) var(--lo2) var(--lo2) var(--hi);box-shadow:inset 1px 1px 0 var(--face2),inset -1px -1px 0 var(--lo);background:var(--face)}
.inset{border:2px solid;border-color:var(--lo2) var(--hi) var(--hi) var(--lo2);box-shadow:inset 1px 1px 0 var(--lo);background:#fff}
@media (prefers-reduced-motion: reduce){*{animation:none!important;transition-duration:.01ms!important}}
```

---

## 1. Window (title bar + body)

```html
<div class="os-window">
  <div class="os-titlebar"><span>◆ readme.txt — Notepad</span>
    <span class="controls"><button class="os-btn sq">_</button><button class="os-btn sq">□</button><button class="os-btn sq">✕</button></span></div>
  <div class="body"><p>A real window: raised frame, gradient title bar, beveled controls.</p></div>
</div>
```
```css
.os-window{background:var(--face);border:2px solid;border-color:var(--hi) var(--lo2) var(--lo2) var(--hi);box-shadow:inset 1px 1px 0 var(--face2),inset -1px -1px 0 var(--lo)}
.os-titlebar{display:flex;align-items:center;gap:8px;padding:4px 6px;background:linear-gradient(90deg,var(--title1),var(--title2));color:var(--title-tx);font-weight:700}
.os-titlebar .controls{margin-left:auto;display:flex;gap:3px}
.os-window .body{padding:14px;color:var(--ink);line-height:1.5}
.os-btn.sq{width:22px;height:20px;padding:0;font-size:.7rem;display:grid;place-items:center}
```

---

## 2. Button (beveled, presses in)

```html
<button class="os-btn">OK</button>
<button class="os-btn">Cancel</button>
```
```css
.os-btn{font-family:var(--ui);font-size:.9rem;color:var(--ink);cursor:pointer;background:var(--face);padding:7px 18px;border-radius:0;
  border:2px solid;border-color:var(--hi) var(--lo2) var(--lo2) var(--hi);box-shadow:inset 1px 1px 0 var(--face2),inset -1px -1px 0 var(--lo)}
.os-btn:active{border-color:var(--lo2) var(--hi) var(--hi) var(--lo2);box-shadow:inset 1px 1px 0 var(--lo);padding:8px 17px 6px 19px}
.os-btn:focus-visible{outline:1px dotted var(--ink);outline-offset:-4px}
```

---

## 3. Input (inset field)

```html
<label class="field"><span>File name:</span><input class="os-input" value="untitled.doc"></label>
```
```css
.field{display:flex;align-items:center;gap:8px}
.os-input{font-family:var(--ui);color:var(--ink);background:#fff;border-radius:0;padding:6px 8px;flex:1;
  border:2px solid;border-color:var(--lo2) var(--hi) var(--hi) var(--lo2)}
.os-input:focus{outline:none}
```

---

## 4. Checkbox / radio (beveled inset box)

```html
<label class="os-check"><input type="checkbox" checked><span class="box"></span> Show hidden files</label>
```
```css
.os-check{display:inline-flex;align-items:center;gap:8px;cursor:pointer}
.os-check input{position:absolute;opacity:0;width:0;height:0}
.os-check .box{width:16px;height:16px;background:#fff;border:2px solid;border-color:var(--lo2) var(--hi) var(--hi) var(--lo2);display:grid;place-items:center;font-size:.8rem;font-weight:800}
.os-check input:checked + .box::after{content:"✓"}
.os-check input:focus-visible + .box{outline:1px dotted var(--ink);outline-offset:2px}
```

---

## 5. Taskbar / navbar (Start button + tabs + clock)

```html
<div class="os-taskbar">
  <button class="os-btn start">▦ Start</button>
  <button class="os-btn tab active">My Computer</button>
  <button class="os-btn tab">readme.txt</button>
  <span class="tray raised">12:00 PM</span>
</div>
```
```css
.os-taskbar{display:flex;align-items:center;gap:6px;padding:4px 6px;background:var(--face);
  border-top:2px solid var(--hi)}
.os-btn.start{font-weight:800}
.os-btn.tab{flex:0 1 160px;text-align:left}
.os-btn.tab.active{border-color:var(--lo2) var(--hi) var(--hi) var(--lo2);box-shadow:inset 1px 1px 0 var(--lo);font-weight:700}
.tray{margin-left:auto;padding:5px 10px;font-variant-numeric:tabular-nums}
```

---

## 6. Progress bar (segmented, classic)

```html
<div class="os-progress inset"><i style="width:64%"></i></div>
```
```css
.os-progress{height:22px;padding:2px;background:#fff}
.os-progress i{display:block;height:100%;background:linear-gradient(90deg,var(--title1),var(--title2));
  background-image:repeating-linear-gradient(90deg,var(--title1) 0 12px,transparent 12px 16px);background-color:var(--title1)}
```

---

## 7. Dialog (modal window)

```html
<div class="os-overlay" role="dialog" aria-modal="true" aria-labelledby="m">
  <div class="os-window os-dialog">
    <div class="os-titlebar"><span>⚠ Confirm</span><span class="controls"><button class="os-btn sq">✕</button></span></div>
    <div class="body"><p id="m">Are you sure you want to delete this file?</p>
      <div class="actions"><button class="os-btn">Yes</button><button class="os-btn">No</button></div></div>
  </div>
</div>
```
```css
.os-overlay{position:fixed;inset:0;z-index:100;display:grid;place-items:center;padding:20px;background:rgba(0,0,0,.35)}
.os-dialog{width:min(400px,100%)}
.os-dialog .actions{display:flex;justify-content:flex-end;gap:8px;margin-top:14px}
/* JS: trap focus, Esc closes, return focus to trigger on close (see ../accessibility.md) */
```

---

## Using this library (for the skill)

When a user wants a Windows 95/XP / retro-OS / Y2K-desktop look: **start from the window + button
here**, then set the desktop accent. Always:
1. Build every element from the **two-tone bevel** (raised = light TL + dark BR; inset inverts).
2. Frame content in **windows** with gradient title bars and control buttons.
3. Use **system gray + one desktop accent**; keep corners **sharp** (radius 0).
4. Make buttons **flip their bevel inward** on press.
5. Use **UI sans for body, a pixel face for titles** only.
6. Keep dark ink on gray/white for contrast; keep a visible focus indicator.

## Quick checklist
- [ ] Two-tone bevels (raised light-TL/dark-BR; inset inverted) on every element
- [ ] Window chrome: gradient title bar + min/max/close + thick frame
- [ ] System gray + one desktop accent; sharp corners (radius 0)
- [ ] Buttons flip bevel inward on `:active`
- [ ] Pixel type for titles only; UI sans for body
- [ ] Text ≥ 4.5:1; `:focus-visible` present; reduced-motion respected

Pairs with: `../styles/cyber-retro.md` (principles), `pixel-art.md` (8-bit game UI + recipe),
`retro-y2k.md` (vaporwave sibling + recipe), `skeuomorphism.md` (bevel/light logic), `accessibility.md`.
