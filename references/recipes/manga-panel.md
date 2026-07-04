# Manga Panel Grid — Component Code Library (ready to use)

Drop-in, production-ready manga-panel code. `../styles/manga-panel.md` holds the *principles*; **this
file holds the exact code** so the right comic-page version already exists when a user asks for "a
manga / comic-panel layout." Every recipe bakes in the traits described for this style:

- **Asymmetrical, skewed panels** with thick uneven ink gutters — not tidy rectangles.
- **Screentone (halftone) shading** for greys instead of flat fill.
- **Action / speed lines** behind focal elements.
- **Skewed parallelogram buttons** with an action-line burst on hover.
- **Speech-bubble / callout inputs** whose border thickens dramatically on focus.
- **Ink comic display** for headings; clean sans for body; mostly black-and-white + one spot color.
- **Accessible by default** — un-skew contents, 4.5:1 text (avoid text over dense tone), `:focus-visible`.

```css
:root{
  --ink:#111;--paper:#f7f5ef;--grey:#d8d5cc;--accent:#e5322d;
  --border:3px solid #111;--tone:rgba(17,17,17,.9);
  --display:'Bangers','Anton',Impact,system-ui,sans-serif;--body:'Inter',system-ui,sans-serif;
}
body{background:var(--paper);color:var(--ink);font-family:var(--body)}
.tone{background-image:radial-gradient(var(--tone) 30%,transparent 31%);background-size:8px 8px}
@media (prefers-reduced-motion: reduce){*{animation:none!important;transition-duration:.01ms!important}}
```

---

## 1. Panel (skewed, inked; contents un-skewed)

```html
<section class="mg-panel"><div class="mg-inner">
  <h3>CHAPTER ONE</h3>
  <p>Slanted inked panel with a hard shadow. Contents are un-skewed so the text stays straight.</p>
</div></section>
```
```css
.mg-panel{background:var(--paper);border:var(--border);padding:22px;color:var(--ink);transform:skewX(-3deg);box-shadow:6px 6px 0 var(--ink)}
.mg-inner{transform:skewX(3deg);display:flex;flex-direction:column;gap:8px}
.mg-panel h3{font-family:var(--display);font-size:1.6rem;letter-spacing:.02em}
.mg-panel p{font-weight:500;line-height:1.5}
```

---

## 2. Button (skewed parallelogram, action-line burst on hover)

```html
<button class="mg-btn"><span>NEXT PAGE ▶</span></button>
<button class="mg-btn mg-btn-ghost"><span>BACK</span></button>
```
```css
.mg-btn{position:relative;background:var(--ink);color:#fff;border:var(--border);font-family:var(--display);font-size:1.1rem;letter-spacing:.02em;cursor:pointer;padding:12px 26px;transform:skewX(-8deg);overflow:hidden;min-height:48px}
.mg-btn>span{display:inline-block;transform:skewX(8deg)}
.mg-btn:hover{background:var(--accent)}
.mg-btn::before{content:"";position:absolute;inset:-50%;opacity:0;background:repeating-conic-gradient(from 0deg,transparent 0 6deg,rgba(255,255,255,.25) 6deg 8deg);transition:opacity 120ms linear}
.mg-btn:hover::before{opacity:1}
.mg-btn:focus-visible{outline:3px solid var(--accent);outline-offset:3px}
.mg-btn-ghost{background:#fff;color:var(--ink)}
```

---

## 3. Input (speech-bubble border, thickens on focus)

```html
<label class="field"><span class="lbl">WRITE HERE</span>
  <input class="mg-input" placeholder="Say something dramatic…"></label>
```
```css
.field{display:flex;flex-direction:column;gap:6px}
.lbl{font-family:var(--display);letter-spacing:.03em}
.mg-input{background:#fff;border:var(--border);border-radius:20px 20px 20px 4px;min-height:46px;padding:0 16px;font-weight:600;color:var(--ink)}
.mg-input::placeholder{color:#8a8578}
.mg-input:focus{outline:none;border-width:5px}
```

---

## 4. Focal callout (speed-line burst behind a title)

```html
<div class="mg-focal"><div class="mg-burst"></div><h2 class="mg-title">BOOM!</h2></div>
```
```css
.mg-focal{position:relative;display:grid;place-items:center;padding:40px;border:var(--border);overflow:hidden}
.mg-burst{position:absolute;inset:-20%;background:var(--paper);background-image:repeating-conic-gradient(from 0deg at 50% 50%,var(--ink) 0 1.5deg,transparent 1.5deg 5deg)}
.mg-title{position:relative;font-family:var(--display);font-size:clamp(2.2rem,6vw,4rem);text-transform:uppercase;-webkit-text-stroke:1.5px var(--ink);color:#fff}
```

---

## 5. Screentone tag / caption box

```html
<span class="mg-tag tone">SIDE STORY</span>
<div class="mg-caption">Narration box — the little rectangular text panel in a corner.</div>
```
```css
.mg-tag{display:inline-block;padding:4px 12px;border:var(--border);font-family:var(--display);letter-spacing:.04em;color:#fff;mix-blend-mode:normal}
.mg-caption{background:#fff;border:var(--border);padding:10px 14px;font-weight:600;max-width:40ch;box-shadow:4px 4px 0 var(--ink)}
```

---

## 6. Navbar (panel strip)

```html
<header class="mg-nav">
  <a class="brand" href="#">INK &amp; TONE</a>
  <nav class="links"><a class="active" href="#">Read</a><a href="#">Series</a><a href="#">About</a></nav>
  <button class="mg-btn"><span>Subscribe</span></button>
</header>
```
```css
.mg-nav{display:flex;align-items:center;gap:16px;padding:12px 18px;background:var(--paper);border:var(--border);box-shadow:5px 5px 0 var(--ink)}
.mg-nav .brand{font-family:var(--display);font-size:1.4rem;-webkit-text-stroke:.5px var(--ink);margin-right:auto;text-decoration:none;color:var(--ink)}
.links{display:flex;gap:6px}
.links a{font-weight:700;text-decoration:none;color:var(--ink);padding:8px 12px;border:2px solid transparent}
.links a:hover{border-color:var(--ink)}.links a.active{background:var(--ink);color:#fff}
.links a:focus-visible{outline:3px solid var(--accent);outline-offset:2px}
```

---

## 7. Modal (panel slides in)

```html
<div class="mg-overlay" role="dialog" aria-modal="true" aria-labelledby="m">
  <div class="mg-panel mg-modal"><div class="mg-inner">
    <h2 id="m">END THIS CHAPTER?</h2><p>Your progress will be saved to the archive.</p>
    <div class="actions"><button class="mg-btn mg-btn-ghost"><span>Stay</span></button><button class="mg-btn"><span>End</span></button></div>
  </div></div>
</div>
```
```css
.mg-overlay{position:fixed;inset:0;z-index:100;display:grid;place-items:center;padding:20px;background:rgba(17,17,17,.5)}
.mg-modal{width:min(440px,100%)}.mg-modal .mg-inner{gap:12px}.mg-modal h2{font-family:var(--display);font-size:1.8rem}
.actions{display:flex;justify-content:flex-end;gap:10px;margin-top:8px}
/* JS: trap focus, Esc closes, return focus to trigger on close (see ../accessibility.md) */
```

---

## Using this library (for the skill)

When a user wants a manga / comic-panel layout: **start from the panel + button here**, then keep it
inked. Always:
1. Make panels **asymmetrical/skewed** with thick ink gutters; **un-skew the contents**.
2. Use **screentone** for greys; keep it mostly **black-and-white** + one spot color.
3. Put **action/speed lines** behind at least one focal element.
4. Use **skewed buttons** and **bubble/callout inputs** (border thickens on focus).
5. Ink comic display for headings; clean sans for body.
6. Keep text off dense tone; verify contrast and a visible focus ring.

## Quick checklist
- [ ] Asymmetrical/skewed panels + thick uneven ink gutters; contents un-skewed
- [ ] Screentone shading for greys (not flat fill)
- [ ] Action/speed lines behind a focal element
- [ ] Skewed buttons; bubble/callout inputs thicken on focus
- [ ] Ink comic display for headings; clean sans body; mostly B/W + one spot color
- [ ] Text ≥ 4.5:1 (not over dense tone); `:focus-visible` present
- [ ] Transitions respect `prefers-reduced-motion`

Pairs with: `../styles/manga-panel.md` (principles), `pop-art.md` (colorful comic + recipe),
`layout-grids.md` (breaking the grid), `personality.md`, `accessibility.md`.
