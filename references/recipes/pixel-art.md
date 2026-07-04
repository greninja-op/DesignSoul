# 8-Bit / Pixel Art — Component Code Library (ready to use)

Drop-in, production-ready pixel-art code. `../styles/pixel-art.md` holds the *principles*; **this file
holds the exact code** so the right retro-game version already exists when a user asks for "an 8-bit /
pixel / NES / Game Boy UI." Every recipe bakes in the traits described for this style:

- **No curves, no smooth transitions** — everything stepped/rigid; state changes are *instant*.
- **Rigid block borders** drawn with layered box-shadows so edges read as pixel-stepped.
- **Raised → pressed bevel** — buttons have a light top/left inner edge + dark bottom/right; on click
  the bevel swaps so the button looks pushed into the screen.
- **Chunky pixel font**, tiled/dithered backgrounds, a small high-contrast palette.
- **Blinking block cursor** and an **RPG pointer arrow** on the active menu item.
- **Accessible by default** — 4.5:1 text, `:focus-visible`, reduced-motion stops the blink.

```css
:root{
  --bg:#0f0f1b;--panel:#26254a;--ink:#e8e6ff;--accent:#ffe14d;--green:#46e86a;--red:#ff5a5a;
  --hi:rgba(255,255,255,.85);--lo:rgba(0,0,0,.55);--font:'Press Start 2P',monospace;--u:4px;
}
*{image-rendering:pixelated}
body{background:var(--bg);color:var(--ink);font-family:var(--font);
  background-image:linear-gradient(rgba(255,255,255,.04) 2px,transparent 2px),linear-gradient(90deg,rgba(255,255,255,.04) 2px,transparent 2px);background-size:16px 16px}
@media (prefers-reduced-motion: reduce){*{animation:none!important}}
```

---

## 1. Panel / card (RPG box, double outline)

```html
<section class="px-card">
  <h3>PLAYER STATS</h3>
  <p>HP 24/24 · MP 12/12 · LVL 7</p>
</section>
```
```css
.px-card{background:var(--panel);color:var(--ink);padding:18px;display:flex;flex-direction:column;gap:12px;
  box-shadow:0 0 0 4px #000,0 0 0 8px var(--ink),0 0 0 12px #000}
.px-card h3{font-size:.8rem;color:var(--accent);line-height:1.4}
.px-card p{font-size:.62rem;line-height:1.8}
```

---

## 2. Button (raised → presses in, instant hover)

```html
<button class="px-btn">START</button>
<button class="px-btn px-btn-green">SAVE</button>
```
```css
.px-btn{font-family:var(--font);font-size:.7rem;line-height:1.4;color:#000;background:var(--accent);border:none;cursor:pointer;padding:14px 18px;transition:none;
  box-shadow:0 0 0 4px #000,inset 4px 4px 0 var(--hi),inset -4px -4px 0 var(--lo)}
.px-btn:hover{background:#fff}
.px-btn:active{box-shadow:0 0 0 4px #000,inset -4px -4px 0 var(--hi),inset 4px 4px 0 var(--lo)}
.px-btn:focus-visible{outline:4px solid var(--green);outline-offset:4px}
.px-btn-green{background:var(--green)}
```

---

## 3. Input (recessed, block caret)

```html
<label class="field"><span class="lbl">NAME</span>
  <input class="px-input" placeholder="AAA"></label>
```
```css
.field{display:flex;flex-direction:column;gap:8px}.lbl{font-size:.6rem;color:var(--accent)}
.px-input{font-family:var(--font);font-size:.7rem;color:var(--ink);background:#000;border:none;padding:12px;caret-color:var(--accent);
  box-shadow:inset 4px 4px 0 var(--lo),0 0 0 4px #000}
.px-input::placeholder{color:#5a5a80}
.px-input:focus{outline:none}
```

---

## 4. RPG menu (pointer arrow marks the active item)

```html
<ul class="px-menu">
  <li aria-current="true">▸ NEW GAME</li>
  <li>CONTINUE</li>
  <li>OPTIONS</li>
</ul>
```
```css
.px-menu{list-style:none;background:var(--panel);padding:14px;font-size:.72rem;line-height:2.2;
  box-shadow:0 0 0 4px #000,0 0 0 8px var(--ink),0 0 0 12px #000}
.px-menu li{padding-left:26px;position:relative;cursor:pointer;color:var(--ink)}
.px-menu li:hover{color:#fff}
.px-menu li[aria-current=true]{color:var(--accent)}
.px-menu li[aria-current=true]::before{content:"▶";position:absolute;left:4px;animation:px-blink .8s steps(1) infinite}
@keyframes px-blink{50%{opacity:0}}
```

---

## 5. Health / progress bar (segmented)

```html
<div class="px-bar"><i style="width:70%"></i></div>
```
```css
.px-bar{height:20px;background:#000;padding:4px;box-shadow:0 0 0 4px #000}
.px-bar i{display:block;height:100%;background:var(--green);
  background-image:repeating-linear-gradient(90deg,transparent 0 10px,rgba(0,0,0,.4) 10px 12px)}
```

---

## 6. Navbar (score bar)

```html
<header class="px-nav">
  <span class="brand">◆ PIXEL QUEST</span>
  <nav class="links"><a class="active" href="#">MAP</a><a href="#">BAG</a><a href="#">SHOP</a></nav>
  <span class="score">×08</span>
</header>
```
```css
.px-nav{display:flex;align-items:center;gap:16px;padding:14px;font-size:.68rem;background:var(--panel);
  box-shadow:0 0 0 4px #000,inset 4px 4px 0 var(--hi),inset -4px -4px 0 var(--lo)}
.px-nav .brand{color:var(--accent);margin-right:auto}
.links{display:flex;gap:14px}.links a{text-decoration:none;color:var(--ink)}
.links a:hover,.links a.active{color:var(--accent)}
.links a:focus-visible{outline:4px solid var(--green);outline-offset:2px}
.score{color:var(--accent)}
```

---

## 7. Toggle (chunky slide)

```html
<button class="px-switch" role="switch" aria-checked="true"><span class="k"></span></button>
```
```css
.px-switch{width:60px;height:28px;padding:4px;cursor:pointer;background:#000;border:none;display:flex;box-shadow:0 0 0 4px #000}
.px-switch .k{width:24px;height:20px;background:#5a5a80;transition:none}
.px-switch[aria-checked=true] .k{transform:translateX(28px);background:var(--green)}
.px-switch:focus-visible{outline:4px solid var(--green);outline-offset:4px}
```

---

## Using this library (for the skill)

When a user wants 8-bit / pixel art: **start from the matching recipe here**, then keep it crisp.
Always:
1. Kill smooth transitions — state changes are **instant** (`transition: none`).
2. Draw **rigid block borders** with box-shadow; give buttons a raised bevel that **swaps on press**.
3. Use a **chunky pixel font** for headers, large enough to read.
4. Use **tiled/dithered** backgrounds and a **small high-contrast palette**.
5. Add the **block cursor** and **RPG pointer arrow** for game feel.
6. Verify contrast; stop the blink under `prefers-reduced-motion`.

## Quick checklist
- [ ] No curves; instant state changes (no easing)
- [ ] Rigid block borders (box-shadow); raised bevel swaps to pressed on `:active`
- [ ] Chunky pixel font for headers, readable size
- [ ] Tiled/dithered background; small high-contrast palette
- [ ] Block cursor and/or RPG pointer on active items
- [ ] Text ≥ 4.5:1; `:focus-visible` present
- [ ] Looping blink respects `prefers-reduced-motion`

Pairs with: `../styles/pixel-art.md` (principles), `cyber-retro.md` (Win-OS bevels + recipe),
`retro-y2k.md` (neon sibling), `motion.md` (stepped animation), `accessibility.md`.
