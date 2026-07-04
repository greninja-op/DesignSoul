# Pop Art / Comic Book — Component Code Library (ready to use)

Drop-in, production-ready pop-art code for each common component. `../styles/pop-art.md` holds the
*principles*; **this file holds the exact code** so the right comic version already exists when a user
asks for "a pop-art / comic-book UI." Every recipe bakes in the traits:

- **Thick black ink outlines** (3–4px) on everything — the defining trait.
- **Halftone (Ben-Day) dots** as texture/shading via radial-gradient dot fields.
- **Loud primary palette** — comic red / yellow / blue + black + paper white; bold, not pastel.
- **Speech bubbles & bursts** as real UI elements.
- **Heavy comic display type** for headings; clean sans for body.
- **Hard offset shadows** (no blur); one clear focal point leads.
- **Accessible by default** — 4.5:1 text, `:focus-visible`, reduced-motion.

```css
:root{
  --ink:#111;--paper:#fff8e7;--red:#ff2b56;--yellow:#ffd000;--blue:#2b8cff;
  --border:3px solid #111;--shadow:5px 5px 0 #111;--radius:10px;--dot:rgba(17,17,17,.28);
  --display:'Bangers','Anton',Impact,system-ui,sans-serif;--body:'Inter',system-ui,sans-serif;
}
body{background:var(--paper);color:var(--ink);font-family:var(--body)}
.halftone{background-color:var(--yellow);background-image:radial-gradient(var(--dot) 28%,transparent 29%);background-size:12px 12px}
@media (prefers-reduced-motion: reduce){*{animation:none!important;transition-duration:.01ms!important}}
```

---

## 1. Card / panel (optional halftone header)

```html
<article class="pop-card">
  <div class="pop-flag">ISSUE #1</div>
  <h3>Comic panel card</h3>
  <p>Inked outline, hard shadow, aged-paper fill. Add a halftone strip for punch.</p>
</article>
```
```css
.pop-card{background:var(--paper);border:var(--border);border-radius:var(--radius);box-shadow:var(--shadow);padding:22px;color:var(--ink);display:flex;flex-direction:column;gap:8px}
.pop-card h3{font-family:var(--display);font-size:1.6rem;letter-spacing:.02em}
.pop-card p{font-weight:500;line-height:1.5}
.pop-flag{align-self:flex-start;background:var(--red);color:#fff;border:var(--border);border-radius:6px;padding:2px 10px;font-family:var(--display);letter-spacing:.04em;transform:rotate(-3deg)}
```

---

## 2. Button (inked, pill, clunks on press)

```html
<button class="pop-btn">POW!</button>
<button class="pop-btn pop-btn-blue">Read on</button>
```
```css
.pop-btn{background:var(--red);color:#fff;border:var(--border);border-radius:999px;box-shadow:var(--shadow);cursor:pointer;min-height:48px;padding:0 26px;font-family:var(--display);font-size:1.1rem;-webkit-text-stroke:1px var(--ink);transition:transform 100ms ease,box-shadow 100ms ease}
.pop-btn:hover{transform:translate(-2px,-2px);box-shadow:7px 7px 0 var(--ink)}
.pop-btn:active{transform:translate(3px,3px);box-shadow:2px 2px 0 var(--ink)}
.pop-btn:focus-visible{outline:3px solid var(--ink);outline-offset:3px}
.pop-btn-blue{background:var(--blue)}
```

---

## 3. Speech bubble

```html
<div class="pop-bubble">This is a callout — perfect for tooltips, toasts, and hints!</div>
```
```css
.pop-bubble{position:relative;background:#fff;border:var(--border);border-radius:18px;padding:14px 18px;font-weight:600;color:var(--ink);max-width:36ch}
.pop-bubble::after{content:"";position:absolute;left:28px;bottom:-16px;border:9px solid transparent;border-top-color:var(--ink)}
.pop-bubble::before{content:"";position:absolute;left:29px;bottom:-11px;border:8px solid transparent;border-top-color:#fff;z-index:1}
```

---

## 4. Burst / badge ("POW!" starburst)

```html
<span class="pop-burst">NEW!</span>
```
```css
.pop-burst{display:inline-grid;place-items:center;width:74px;height:74px;background:var(--yellow);color:var(--ink);
  border:var(--border);font-family:var(--display);font-size:1.1rem;transform:rotate(-8deg);
  clip-path:polygon(50% 0,61% 22%,86% 12%,79% 38%,100% 50%,79% 62%,86% 88%,61% 78%,50% 100%,39% 78%,14% 88%,21% 62%,0 50%,21% 38%,14% 12%,39% 22%)}
```

---

## 5. Input (inked)

```html
<label class="field"><span class="field-label">YOUR NAME</span>
  <input class="pop-input" placeholder="Type here…"></label>
```
```css
.field{display:flex;flex-direction:column;gap:6px}
.field-label{font-family:var(--display);letter-spacing:.03em;font-size:1rem}
.pop-input{background:#fff;border:var(--border);border-radius:10px;min-height:46px;padding:0 14px;font-weight:600;color:var(--ink)}
.pop-input::placeholder{color:#8a8578}
.pop-input:focus{outline:none;box-shadow:var(--shadow)}
```

---

## 6. Navbar

```html
<header class="pop-nav">
  <a class="brand" href="#">KA-POW!</a>
  <nav class="links"><a class="active" href="#">Home</a><a href="#">Comics</a><a href="#">Shop</a></nav>
  <button class="pop-btn pop-btn-blue">Subscribe</button>
</header>
```
```css
.pop-nav{display:flex;align-items:center;gap:16px;padding:12px 18px;background:var(--yellow);border:var(--border);border-radius:var(--radius);box-shadow:var(--shadow)}
.pop-nav .brand{font-family:var(--display);font-size:1.5rem;-webkit-text-stroke:1px var(--ink);color:var(--red);margin-right:auto;text-decoration:none}
.links{display:flex;gap:4px}
.links a{font-weight:700;text-decoration:none;color:var(--ink);padding:8px 12px;border:2px solid transparent;border-radius:6px}
.links a:hover{border-color:var(--ink)}.links a.active{background:#fff;border-color:var(--ink)}
.links a:focus-visible{outline:3px solid var(--ink);outline-offset:2px}
```

---

## 7. Toggle

```html
<button class="pop-switch" role="switch" aria-checked="true"><span class="k"></span></button>
```
```css
.pop-switch{width:64px;height:34px;padding:3px;cursor:pointer;border:var(--border);border-radius:999px;background:#fff;display:flex;box-shadow:3px 3px 0 var(--ink)}
.pop-switch .k{width:26px;height:26px;border:var(--border);border-radius:50%;background:var(--yellow);transition:transform 100ms ease}
.pop-switch[aria-checked=true]{background:var(--blue)}.pop-switch[aria-checked=true] .k{transform:translateX(30px);background:var(--red)}
.pop-switch:focus-visible{outline:3px solid var(--ink);outline-offset:3px}
```

---

## 8. Modal (comic panel)

```html
<div class="pop-overlay" role="dialog" aria-modal="true" aria-labelledby="m">
  <div class="pop-card pop-modal"><span class="pop-burst">WAIT!</span>
    <h2 id="m">Delete this issue?</h2><p>Once it's gone, it's gone forever, hero.</p>
    <div class="actions"><button class="pop-btn pop-btn-blue">Keep</button><button class="pop-btn">Delete</button></div></div>
</div>
```
```css
.pop-overlay{position:fixed;inset:0;z-index:100;display:grid;place-items:center;padding:20px;background:rgba(17,17,17,.5)}
.pop-modal{width:min(440px,100%);gap:12px;position:relative}.pop-modal h2{font-family:var(--display);font-size:1.8rem}
.pop-modal .pop-burst{position:absolute;top:-24px;right:-14px}
.actions{display:flex;justify-content:flex-end;gap:10px;margin-top:8px}
/* JS: trap focus, Esc closes, return focus to trigger on close (see ../accessibility.md) */
```

---

## Using this library (for the skill)

When a user wants pop-art / comic: **start from the matching recipe here**, then set the primaries.
Always:
1. Put a **thick black ink outline** on every surface and control.
2. Add **halftone dots** somewhere for texture; don't rely on flat fills alone.
3. Use the **loud primaries** (red/yellow/blue + paper), not pastels.
4. Use **speech bubbles / bursts** as real components (callouts, badges).
5. **Heavy comic display** for headings; clean sans for body.
6. Keep **one clear focal point** and verify contrast despite the loudness.

## Quick checklist
- [ ] Thick black ink outlines (3–4px) everywhere
- [ ] Halftone/Ben-Day dot texture present
- [ ] Loud primaries (red/yellow/blue + paper), not pastel
- [ ] Speech bubbles / bursts used as real UI
- [ ] Comic display for headings; clean sans body
- [ ] Hard offset shadows (no blur); one clear focal point
- [ ] Text ≥ 4.5:1; `:focus-visible`; `prefers-reduced-motion` respected

Pairs with: `../styles/pop-art.md` (principles), `manga-panel.md` (asymmetric comic layout + recipe),
`personality.md` (loud voice), `microcopy.md` (punchy callouts), `accessibility.md`.
