# Doodle / Sketch — Component Code Library (ready to use)

Drop-in, production-ready doodle/sketch code. `../styles/doodle-sketch.md` holds the *principles*;
**this file holds the exact code** so the right hand-drawn version already exists when a user asks for
"a doodle / sketch / hand-drawn / notebook UI." Every recipe bakes in the traits:

- **Wobbly, uneven borders** — the asymmetric `border-radius` trick (or a rough SVG stroke).
- **Handwritten type** for headings; a legible hand (or clean sans) for body.
- **Paper/cardboard texture** — ruled/grid lines or kraft.
- **Sketchy marks** — hand-drawn underlines, arrows, hatch fills.
- **Slight imperfection** — tiny rotations/offsets; a soft inked shadow, not a crisp one.
- **Accessible by default** — text ≥ 4.5:1, never long/small body in a hard script, `:focus-visible`.

```css
:root{
  --paper:#fbf7ee;--kraft:#e7d9bd;--ink:#2b2b2b;--accent:#ef6f52;--blue:#3f7cac;
  --shadow:3px 4px 0 rgba(43,43,43,.18);
  --wobble:255px 15px 225px 15px / 15px 225px 15px 255px;
  --hand:'Caveat','Patrick Hand',ui-rounded,cursive;--body:'Comic Neue','Segoe Print',system-ui,sans-serif;
}
body{background:var(--paper);color:var(--ink);font-family:var(--body);
  background-image:linear-gradient(var(--kraft) 1px,transparent 1px);background-size:100% 28px}
@media (prefers-reduced-motion: reduce){*{animation:none!important;transition-duration:.01ms!important}}
```

---

## 1. Card (hand-drawn box, barely crooked)

```html
<article class="dd-card">
  <h3 class="dd-title">My little note</h3>
  <p>Wobbly borders, ruled paper, a soft inked shadow, and a tiny tilt so it feels drawn by hand.</p>
</article>
```
```css
.dd-card{background:var(--paper);color:var(--ink);border:2.5px solid var(--ink);border-radius:var(--wobble);box-shadow:var(--shadow);padding:22px;transform:rotate(-.6deg);display:flex;flex-direction:column;gap:8px}
.dd-title{font-family:var(--hand);font-size:2rem;line-height:1.05}
.dd-card p{line-height:1.55}
```

---

## 2. Button (marker outline, wobbly)

```html
<button class="dd-btn">Let's go! ✎</button>
<button class="dd-btn dd-btn-ghost">Nah</button>
```
```css
.dd-btn{background:var(--accent);color:#fff;cursor:pointer;border:2.5px solid var(--ink);border-radius:225px 15px 255px 15px / 15px 255px 15px 225px;box-shadow:var(--shadow);min-height:48px;padding:0 24px;font-family:var(--hand);font-size:1.3rem;transition:transform 120ms ease}
.dd-btn:hover{transform:rotate(-1deg) translateY(-2px)}
.dd-btn:active{transform:rotate(0) translateY(1px)}
.dd-btn:focus-visible{outline:2px dashed var(--ink);outline-offset:3px}
.dd-btn-ghost{background:transparent;color:var(--ink)}
```

---

## 3. Input (fill-in-the-blank underline + wobbly box)

```html
<label class="field"><span class="lbl">Your name</span>
  <input class="dd-input" placeholder="scribble here…"></label>
<input class="dd-input box" placeholder="…or a boxed one">
```
```css
.field{display:flex;flex-direction:column;gap:6px}.lbl{font-family:var(--hand);font-size:1.2rem}
.dd-input{background:transparent;color:var(--ink);font-family:var(--body);font-size:1rem;border:none;border-bottom:2.5px dashed var(--ink);padding:8px 4px}
.dd-input::placeholder{color:#9a917f}
.dd-input:focus{outline:none;border-bottom-style:solid}
.dd-input.box{border:2.5px solid var(--ink);border-radius:var(--wobble);padding:10px 14px}
```

---

## 4. Hand-drawn underline / highlight

```html
<h2>The <span class="dd-underline">important</span> bit</h2>
```
```css
.dd-underline{position:relative}
.dd-underline::after{content:"";position:absolute;left:0;right:0;bottom:-2px;height:6px;background:var(--accent);opacity:.5;border-radius:40% 60% 50% 45%}
```

---

## 5. Checkbox (hand-checked box)

```html
<label class="dd-check"><input type="checkbox" checked><span class="box"></span> Buy more sticky notes</label>
```
```css
.dd-check{display:inline-flex;align-items:center;gap:10px;cursor:pointer;font-size:1.05rem}
.dd-check input{position:absolute;opacity:0;width:0;height:0}
.dd-check .box{width:26px;height:26px;border:2.5px solid var(--ink);border-radius:60% 40% 55% 45% / 45% 55% 45% 55%;display:grid;place-items:center}
.dd-check input:checked + .box::after{content:"✓";font-family:var(--hand);font-size:1.4rem;color:var(--accent)}
.dd-check input:focus-visible + .box{outline:2px dashed var(--ink);outline-offset:3px}
```

---

## 6. Sticky note / tag

```html
<div class="dd-sticky">Remember to water<br>the plants 🪴</div>
```
```css
.dd-sticky{background:#fff3a8;color:var(--ink);font-family:var(--hand);font-size:1.25rem;line-height:1.2;
  padding:16px;width:150px;transform:rotate(2deg);box-shadow:var(--shadow);border-radius:2px}
```

---

## 7. Navbar

```html
<header class="dd-nav">
  <a class="brand" href="#">✐ Sketchbook</a>
  <nav class="links"><a class="active" href="#">Notes</a><a href="#">Boards</a><a href="#">Bin</a></nav>
  <button class="dd-btn">New</button>
</header>
```
```css
.dd-nav{display:flex;align-items:center;gap:16px;padding:12px 18px;background:var(--paper);border:2.5px solid var(--ink);border-radius:var(--wobble);box-shadow:var(--shadow)}
.dd-nav .brand{font-family:var(--hand);font-size:1.5rem;margin-right:auto;text-decoration:none;color:var(--ink)}
.links{display:flex;gap:6px}
.links a{font-family:var(--hand);font-size:1.2rem;text-decoration:none;color:var(--ink);padding:4px 12px}
.links a.active{color:var(--accent);text-decoration:underline;text-decoration-style:wavy}
.links a:focus-visible{outline:2px dashed var(--ink);outline-offset:2px}
```

---

## 8. Modal

```html
<div class="dd-overlay" role="dialog" aria-modal="true" aria-labelledby="m">
  <div class="dd-card dd-modal"><h2 id="m" class="dd-title">Toss this note?</h2>
    <p>It'll go in the bin — you can't get it back.</p>
    <div class="actions"><button class="dd-btn dd-btn-ghost">Keep</button><button class="dd-btn">Toss</button></div></div>
</div>
```
```css
.dd-overlay{position:fixed;inset:0;z-index:100;display:grid;place-items:center;padding:20px;background:rgba(43,43,43,.35)}
.dd-modal{width:min(420px,100%);transform:rotate(-.4deg)}
.dd-modal .actions{display:flex;justify-content:flex-end;gap:10px;margin-top:12px}
/* JS: trap focus, Esc closes, return focus to trigger on close (see ../accessibility.md) */
```

---

## Using this library (for the skill)

When a user wants a doodle / sketch / hand-drawn look: **start from the card + button here**, then set
the paper + one marker accent. Always:
1. Use **wobbly uneven borders** (the asymmetric radius) on surfaces and controls.
2. Use a **handwritten face** for headings; keep **body legible** (hand or clean sans).
3. Add **paper/cardboard texture** and **sketchy marks** (underline, check, arrows).
4. Add **slight imperfection** (tiny rotations) and a **soft inked shadow**.
5. Never set long/small body copy in a hard-to-read script.
6. Keep contrast ≥ 4.5:1; a **dashed** focus ring suits the style.

## Quick checklist
- [ ] Wobbly/uneven borders (asymmetric radius or rough stroke)
- [ ] Handwritten headings; legible body (hand or clean sans)
- [ ] Paper/cardboard texture; sketchy marks (underline/arrows/hatch)
- [ ] Slight imperfection (tiny rotations/offsets); soft inked shadow
- [ ] Text ≥ 4.5:1; no long/small body in a hard script
- [ ] `:focus-visible` present (dashed fits); wobble respects `prefers-reduced-motion`

Pairs with: `../styles/doodle-sketch.md` (principles), `warm-editorial.md` (polished-paper sibling),
`personality.md` (playful voice), `imagery.md` (hand-drawn illustration), `accessibility.md`.
