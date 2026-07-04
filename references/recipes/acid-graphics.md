# Acid Graphics / Psychedelic Tech — Component Code Library (ready to use)

Drop-in, production-ready acid-graphics code. `../styles/acid-graphics.md` holds the *principles*;
**this file holds the exact code** so the right liquid-metal-rave version already exists when a user
asks for "an acid / psychedelic / rave / chrome-blob UI." Every recipe bakes in the traits:

- **Molten chrome & metallic blobs** — glossy conic/radial gradients on gooey organic shapes.
- **Toxic neon palette** — harsh purple + acid green + hot magenta on near-black.
- **Distorted display type** for accents only; body stays a clean readable sans.
- **Spiky starbursts** as accents and badges; **gooey blob** shapes, not tidy rectangles.
- **One clear focal point** anchors the chaos.
- **Accessible by default** — body ≥ 4.5:1, visible `:focus-visible`, reduced-motion freezes morphs.

```css
:root{
  --bg:#0a0410;--purple:#a020ff;--green:#b6ff1a;--magenta:#ff1fa2;--cyan:#23f0ff;--ink:#f3e9ff;
  --chrome:conic-gradient(from 210deg,#e9e9ff,#9aa7d8,#f0f0ff,#6b7bb0,#e9e9ff);
  --blob:42% 58% 63% 37% / 41% 44% 56% 59%;
  --display:'Anton','Archivo Black',Impact,system-ui,sans-serif;--body:'Inter',system-ui,sans-serif;
}
body{background:var(--bg);color:var(--ink);font-family:var(--body)}
@media (prefers-reduced-motion: reduce){*{animation:none!important;transition-duration:.01ms!important}}
```

---

## 1. Chrome blob (decorative signature)

```html
<div class="ac-blob"></div>
```
```css
.ac-blob{width:120px;height:120px;background:var(--chrome);border-radius:var(--blob);filter:drop-shadow(0 0 24px rgba(160,32,255,.55));animation:ac-morph 12s ease-in-out infinite}
@keyframes ac-morph{0%,100%{border-radius:42% 58% 63% 37% / 41% 44% 56% 59%}50%{border-radius:60% 40% 38% 62% / 57% 36% 64% 43%}}
```

---

## 2. Card (glossy, gooey corner)

```html
<article class="ac-card">
  <span class="ac-burst">HOT</span>
  <h3>Liquid metal card</h3>
  <p>Toxic neon on near-black, a gooey corner, and a chrome starburst badge.</p>
</article>
```
```css
.ac-card{position:relative;background:rgba(160,32,255,.10);color:var(--ink);border:1px solid rgba(182,255,26,.45);border-radius:26px 26px 26px 4px;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);padding:22px;box-shadow:0 0 30px rgba(160,32,255,.3);display:flex;flex-direction:column;gap:10px}
.ac-card h3{font-family:var(--display);text-transform:uppercase;letter-spacing:.02em;color:var(--green)}
.ac-card p{color:rgba(243,233,255,.85);line-height:1.55}
.ac-card .ac-burst{position:absolute;top:-18px;right:-10px}
```

---

## 3. Button (chrome fill, neon glow)

```html
<button class="ac-btn">RSVP</button>
<button class="ac-btn ac-btn-ghost">Info</button>
```
```css
.ac-btn{background:var(--chrome);color:#12061f;cursor:pointer;border:2px solid var(--green);border-radius:999px;min-height:48px;padding:0 26px;font-family:var(--display);text-transform:uppercase;letter-spacing:.04em;box-shadow:0 0 18px rgba(182,255,26,.6);transition:transform 140ms ease,box-shadow 140ms ease}
.ac-btn:hover{transform:scale(1.04) rotate(-1deg);box-shadow:0 0 28px rgba(255,31,162,.7)}
.ac-btn:active{transform:scale(.98)}
.ac-btn:focus-visible{outline:3px solid var(--cyan);outline-offset:3px}
.ac-btn-ghost{background:transparent;color:var(--green);box-shadow:none}
```

---

## 4. Starburst badge

```html
<span class="ac-burst">NEW</span>
```
```css
.ac-burst{display:inline-grid;place-items:center;width:72px;height:72px;background:var(--green);color:#0a0410;font-family:var(--display);transform:rotate(-6deg);
  clip-path:polygon(50% 0,60% 26%,90% 12%,76% 42%,100% 50%,76% 58%,90% 88%,60% 74%,50% 100%,40% 74%,10% 88%,24% 58%,0 50%,24% 42%,10% 12%,40% 26%)}
```

---

## 5. Input (neon focus ring)

```html
<label class="field"><span class="lbl">EMAIL</span>
  <input class="ac-input" placeholder="raver@night.club"></label>
```
```css
.field{display:flex;flex-direction:column;gap:6px}.lbl{font-family:var(--display);letter-spacing:.06em;color:var(--green)}
.ac-input{background:rgba(255,255,255,.04);border:2px solid rgba(160,32,255,.5);border-radius:14px;min-height:46px;padding:0 14px;color:var(--ink);font-size:1rem;flex:1}
.ac-input::placeholder{color:rgba(243,233,255,.45)}
.ac-input:focus{outline:none;border-color:var(--green);box-shadow:0 0 18px rgba(182,255,26,.5)}
```

---

## 6. Distorted display title

```html
<h1 class="ac-title">ACID<br>RAVE</h1>
```
```css
.ac-title{font-family:var(--display);font-size:clamp(2.6rem,8vw,6rem);line-height:.9;text-transform:uppercase;color:var(--green);transform:scaleY(1.25) skewX(-6deg);transform-origin:left;text-shadow:0 0 18px rgba(182,255,26,.6)}
```

---

## 7. Navbar

```html
<header class="ac-nav">
  <a class="brand" href="#">◑ ACID</a>
  <nav class="links"><a class="active" href="#">Events</a><a href="#">Drops</a><a href="#">Crew</a></nav>
  <button class="ac-btn">Tickets</button>
</header>
```
```css
.ac-nav{display:flex;align-items:center;gap:16px;padding:12px 18px;background:rgba(160,32,255,.1);border:1px solid rgba(182,255,26,.4);border-radius:18px;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}
.ac-nav .brand{font-family:var(--display);font-size:1.3rem;color:var(--green);margin-right:auto;text-decoration:none}
.links{display:flex;gap:6px}
.links a{font-weight:700;text-decoration:none;color:rgba(243,233,255,.8);padding:8px 12px;border-radius:999px}
.links a:hover{color:var(--green)}.links a.active{background:var(--magenta);color:#0a0410}
.links a:focus-visible{outline:3px solid var(--cyan);outline-offset:2px}
```

---

## Using this library (for the skill)

When a user wants acid / psychedelic / rave: **start from the blob + card here**, then keep it
anchored. Always:
1. Use **chrome/metallic gradients** on **gooey blob** shapes.
2. Keep the palette **toxic neon on near-black** (purple/acid-green/magenta).
3. **Distort display type** for accents only; keep body a clean readable sans.
4. Add **spiky starbursts** as accents/badges.
5. Give the chaos **one clear focal point**.
6. Verify body contrast and a visible focus ring; freeze morphs under reduced-motion.

## Quick checklist
- [ ] Molten chrome/metallic gradient on gooey blob shapes
- [ ] Toxic neon palette (purple/acid-green/magenta) on near-black
- [ ] Distorted display for accents only; clean sans body
- [ ] Spiky starbursts as accents/badges; one clear focal point
- [ ] Body text ≥ 4.5:1; `:focus-visible` visible against the neon
- [ ] Morph/rotate respects `prefers-reduced-motion`; effects GPU-friendly

Pairs with: `../styles/acid-graphics.md` (principles), `retro-y2k.md` (softer sibling + recipe),
`glitch.md` (broken cousin + recipe), `effects-performance.md` (glow/blur budget), `accessibility.md`.
