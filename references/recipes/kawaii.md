# Kawaii / Pastel — Component Code Library (ready to use)

Drop-in, production-ready kawaii code for each common component. `../styles/kawaii.md` holds the
*principles*; **this file holds the exact code** so the right cute version already exists when a user
asks for "a kawaii / cute / pastel UI." Every recipe bakes in the traits — and the one hard rule that
keeps it usable:

- **Soft pastel surfaces/accents** (low saturation, high lightness) — pink, lavender, mint, butter.
- **Very rounded, pillowy shapes** — big radii, no sharp corners.
- **Friendly faces & a mascot** — a smiley, a blush, a little character with personality.
- **Gentle depth** — soft low-contrast shadows + a subtle border, never harsh.
- **Rounded warm type** + kind microcopy.
- **The hard rule:** body text is **near-solid warm charcoal, never pastel** — pastel-on-pastel fails
  contrast. Pastels are for surfaces and accents only.
- **Accessible by default** — 4.5:1 text, `:focus-visible`, reduced-motion softens the bounce.

```css
:root{
  --bg:#fff5fb;--surface:#fff;--pink:#ffb7d5;--lav:#c9b6ff;--mint:#a7ecd0;--butter:#ffe08a;
  --accent:#ff8fc0;--accent-ink:#7a2e52;--ink:#4a3b46;--ink-soft:#8a7a84;--border:#ffd9ea;
  --shadow:0 8px 20px rgba(255,150,195,.28);--radius:22px;--bounce:cubic-bezier(.34,1.56,.64,1);
  --font:'Baloo 2','Quicksand','Nunito',system-ui,sans-serif;
}
body{background:var(--bg);color:var(--ink);font-family:var(--font)}
@media (prefers-reduced-motion: reduce){*{animation:none!important;transition-duration:.01ms!important}}
```

---

## 1. Card

```html
<article class="kw-card">
  <span class="kw-mascot"><span class="face">◕‿◕</span> Hi there!</span>
  <h3>Cozy little card</h3>
  <p>Pillowy corners, a soft shadow, and a friendly face. Warm charcoal text keeps it readable.</p>
</article>
```
```css
.kw-card{background:var(--surface);border:2px solid var(--border);border-radius:var(--radius);box-shadow:var(--shadow);padding:22px;color:var(--ink);display:flex;flex-direction:column;gap:10px}
.kw-card h3{font-weight:800}.kw-card p{color:var(--ink-soft);line-height:1.55}
.kw-mascot{align-self:flex-start;display:inline-flex;align-items:center;gap:8px;background:var(--mint);color:var(--ink);border-radius:999px;padding:6px 14px 6px 8px;font-weight:700}
.kw-mascot .face{width:26px;height:26px;border-radius:50%;background:#fff;display:grid;place-items:center;font-size:.8rem}
```

---

## 2. Button (bouncy)

```html
<button class="kw-btn">Yay! ✿</button>
<button class="kw-btn kw-btn-soft">Maybe later</button>
```
```css
.kw-btn{background:var(--accent);color:var(--accent-ink);border:none;border-radius:999px;cursor:pointer;min-height:48px;padding:0 26px;font-family:var(--font);font-weight:800;box-shadow:0 6px 0 rgba(255,120,175,.55);transition:transform 160ms var(--bounce),box-shadow 160ms var(--bounce)}
.kw-btn:hover{transform:translateY(-2px);box-shadow:0 9px 0 rgba(255,120,175,.55)}
.kw-btn:active{transform:translateY(3px);box-shadow:0 3px 0 rgba(255,120,175,.55)}
.kw-btn:focus-visible{outline:3px solid var(--accent-ink);outline-offset:3px}
.kw-btn-soft{background:var(--lav);color:#4a2e6e;box-shadow:0 6px 0 rgba(150,120,220,.45)}
```

---

## 3. Input

```html
<label class="field"><span class="field-label">Your name 🌸</span>
  <input class="kw-input" placeholder="type something sweet…"></label>
```
```css
.field{display:flex;flex-direction:column;gap:6px}
.field-label{font-weight:700;color:var(--ink-soft)}
.kw-input{background:var(--surface);border:2px solid var(--border);border-radius:16px;min-height:48px;padding:0 16px;font-family:var(--font);color:var(--ink)}
.kw-input::placeholder{color:var(--ink-soft)}
.kw-input:focus{outline:none;border-color:var(--accent);box-shadow:0 0 0 4px rgba(255,143,192,.25)}
```

---

## 4. Toggle (soft pill)

```html
<button class="kw-switch" role="switch" aria-checked="true"><span class="k"></span></button>
```
```css
.kw-switch{width:58px;height:32px;padding:3px;cursor:pointer;border:none;border-radius:999px;background:var(--border);display:flex;transition:background 160ms var(--bounce)}
.kw-switch .k{width:26px;height:26px;border-radius:50%;background:#fff;box-shadow:0 2px 4px rgba(255,150,195,.5);transition:transform 160ms var(--bounce)}
.kw-switch[aria-checked=true]{background:var(--accent)}.kw-switch[aria-checked=true] .k{transform:translateX(26px)}
.kw-switch:focus-visible{outline:3px solid var(--accent);outline-offset:3px}
```

---

## 5. Stat / progress bubble

```html
<div class="kw-card kw-stat"><span class="l">Water today 💧</span><div class="v">6 / 8</div>
  <div class="bar"><i style="width:75%"></i></div></div>
```
```css
.kw-stat{gap:8px}.kw-stat .l{font-weight:700;color:var(--ink-soft)}.kw-stat .v{font-size:2rem;font-weight:800}
.bar{height:14px;border-radius:999px;background:var(--border);overflow:hidden}.bar i{display:block;height:100%;border-radius:999px;background:linear-gradient(90deg,var(--pink),var(--accent))}
```

---

## 6. Navbar

```html
<header class="kw-nav">
  <a class="brand" href="#">🍡 Mochi</a>
  <nav class="links"><a class="active" href="#">Home</a><a href="#">Garden</a><a href="#">Shop</a></nav>
  <button class="kw-btn">Log in</button>
</header>
```
```css
.kw-nav{display:flex;align-items:center;gap:16px;padding:12px 18px;background:var(--surface);border:2px solid var(--border);border-radius:999px;box-shadow:var(--shadow)}
.kw-nav .brand{font-weight:800;font-size:1.15rem;margin-right:auto;text-decoration:none;color:var(--ink)}
.links{display:flex;gap:4px}
.links a{font-weight:700;text-decoration:none;color:var(--ink-soft);padding:8px 14px;border-radius:999px}
.links a:hover{background:var(--bg);color:var(--ink)}.links a.active{background:var(--pink);color:var(--accent-ink)}
.links a:focus-visible{outline:3px solid var(--accent);outline-offset:2px}
```

---

## 7. Modal

```html
<div class="kw-overlay" role="dialog" aria-modal="true" aria-labelledby="m">
  <div class="kw-card kw-modal"><span class="kw-mascot"><span class="face">•ᴗ•</span> Wait!</span>
    <h2 id="m">Delete this pet?</h2><p>Your little friend will miss you… are you sure?</p>
    <div class="actions"><button class="kw-btn kw-btn-soft">Keep</button><button class="kw-btn">Delete</button></div></div>
</div>
```
```css
.kw-overlay{position:fixed;inset:0;z-index:100;display:grid;place-items:center;padding:20px;background:rgba(122,46,82,.3)}
.kw-modal{width:min(420px,100%);gap:12px;animation:kw-pop 200ms var(--bounce)}.kw-modal h2{font-weight:800}
.actions{display:flex;justify-content:flex-end;gap:10px;margin-top:8px}
@keyframes kw-pop{from{transform:scale(.9);opacity:0}to{transform:scale(1);opacity:1}}
/* JS: trap focus, Esc closes, return focus to trigger on close (see ../accessibility.md) */
```

---

## Using this library (for the skill)

When a user wants kawaii / cute / pastel: **start from the matching recipe here**, then pick the
pastel palette. Always:
1. Use pastels for **surfaces and accents**; keep **body text a warm charcoal** (the hard rule).
2. Keep shapes **very rounded and pillowy**; no sharp corners.
3. Add a **face / mascot / blush** for personality.
4. Keep depth **gentle** — soft shadows, subtle border.
5. Use a **rounded warm typeface** and kind microcopy.
6. Bouncy-but-soft motion; verify contrast and a visible focus ring.

## Quick checklist
- [ ] Pastel surfaces/accents; body text near-solid warm charcoal (≥ 4.5:1)
- [ ] Very rounded pillowy shapes, no sharp corners
- [ ] A friendly face / mascot / blush present
- [ ] Gentle low-contrast shadows + soft border
- [ ] Rounded warm typeface; kind microcopy
- [ ] Bouncy-but-soft motion; `prefers-reduced-motion` respected
- [ ] `:focus-visible` clearly visible on pastel surfaces

Pairs with: `../styles/kawaii.md` (principles), `claymorphism.md` (the puffier 3D cousin + recipe),
`personality.md` (voice/mascot), `microcopy.md` (kind copy), `accessibility.md` (the contrast rule).
