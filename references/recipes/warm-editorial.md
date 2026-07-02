# Warm Editorial — Component Code Library (ready to use)

Drop-in, production-ready warm-editorial code. `../styles/warm-editorial.md` holds the *principles*;
**this file holds the exact code** so the right warm, book-like components already exist when a user
asks for "a warm / cream / editorial / Anthropic-style layout." It's the natural antidote to cold
AI-default UI (white + blue + Inter) — every recipe leans on warmth from color temperature and type,
not effects:

- **Warm paper, never white** — the page is a soft cream; surfaces are a hair lighter.
- **One earthy accent** — terracotta / clay, used sparingly.
- **Serif + sans pairing** — a display serif for character, a clean sans for body.
- **Book-like reading rhythm** — controlled measure (~68ch), generous line-height (~1.7).
- **Restraint over decoration** — hairline rules, tiny shadows; warmth does the work.
- **Open-source fonts only** — no paid faces; near-black text is warm, not `#000`.
- **Accessible by default** — real contrast, `:focus-visible`, `text-wrap` niceties.

```css
:root {
  /* warm paper neutrals */
  --bg:            #f5f0e8;                 /* cream paper — never #fff */
  --surface:       #fbf8f2;
  --surface-sunk:  #efe8dc;
  --border:        #e4dbcc;
  --text-primary:  #191919;                 /* warm near-black */
  --text-secondary:#5c564c;
  --text-muted:    #8a8273;
  /* the single earthy accent */
  --accent:        #cc785c;                 /* terracotta */
  --accent-hover:  #b5664c;
  --accent-muted:  #f0e0d8;
  /* open-source pairing: Fraunces/Newsreader (display serif) + Inter (body) */
  --font-display: 'Fraunces', 'Newsreader', Georgia, serif;
  --font-body:    'Inter', system-ui, sans-serif;
  --radius: 10px;
  --measure: 68ch;
  --ease: cubic-bezier(0.22, 1, 0.36, 1);
  --dur: 200ms;
}

body { background: var(--bg); color: var(--text-primary); font-family: var(--font-body); }
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition-duration: 0.01ms !important; }
}
```

---

## 1. Reading surface (the core of the style)

```html
<article class="prose">
  <span class="we-eyebrow">Essay</span>
  <h1>Designing with warmth</h1>
  <p>Warmth comes from color temperature and type, not from effects. A cream page and a real serif
     already read as human.</p>
  <hr />
  <h2>Rhythm</h2>
  <p>Controlled measure and generous line-height give text a book-like cadence.</p>
</article>
```
```css
.prose { max-width: var(--measure); margin-inline: auto; line-height: 1.7; font-size: 1.0625rem; }
.prose h1, .prose h2 { font-family: var(--font-display); font-weight: 600; letter-spacing: -0.01em; text-wrap: balance; }
.prose h1 { font-size: clamp(2.2rem, 5vw, 3.4rem); line-height: 1.1; margin-bottom: 0.4em; }
.prose h2 { font-size: 1.6rem; margin: 1.6em 0 0.4em; }
.prose p  { text-wrap: pretty; margin: 0 0 1.2em; color: var(--text-primary); }
.prose hr { border: none; border-top: 1px solid var(--border); margin: 2.5rem 0; }
```

---

## 2. Card

```html
<article class="we-card">
  <span class="we-eyebrow">Feature</span>
  <h3>Thoughtful by default</h3>
  <p>Calm, trustworthy, premium-without-shouting.</p>
</article>
```
```css
.we-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius);
  padding: 24px 28px; box-shadow: 0 1px 2px rgba(60,40,20,0.04);
  display: flex; flex-direction: column; gap: 8px; }
.we-card h3 { font-family: var(--font-display); font-weight: 600; font-size: 1.25rem; }
.we-card p  { color: var(--text-secondary); line-height: 1.6; }
.we-card.interactive { cursor: pointer; transition: transform var(--dur) var(--ease), box-shadow var(--dur) var(--ease); }
.we-card.interactive:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(60,40,20,0.08); }
```

---

## 3. Buttons & links

```html
<button class="we-btn">Start reading</button>
<button class="we-btn we-btn-secondary">Browse</button>
<a class="we-link" href="#">See all essays</a>
```
```css
.we-btn { background: var(--accent); color: #fff; border: none; border-radius: 8px; cursor: pointer;
  min-height: 44px; padding: 0 20px; font-weight: 600; transition: background var(--dur) var(--ease); }
.we-btn:hover { background: var(--accent-hover); }
.we-btn:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
.we-btn-secondary { background: transparent; color: var(--text-primary); border: 1px solid var(--border); }
.we-btn-secondary:hover { background: var(--surface-sunk); }

.we-link { color: var(--accent); text-decoration: underline; text-underline-offset: 3px; text-decoration-thickness: 1px; }
.we-link:hover { color: var(--accent-hover); }
.we-link:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
```

---

## 4. Eyebrow / label

```html
<span class="we-eyebrow">Interview</span>
```
```css
.we-eyebrow { font-size: 0.75rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: var(--accent); }
```

---

## 5. Input / form field

```html
<label class="field">
  <span class="field-label">Your email</span>
  <input class="we-input" type="email" placeholder="you@example.com" />
</label>
```
```css
.field { display: flex; flex-direction: column; gap: 6px; }
.field-label { font-size: 0.84rem; font-weight: 600; color: var(--text-secondary); }
.we-input { min-height: 46px; padding: 0 14px; border: 1px solid var(--border); border-radius: 8px;
  background: var(--surface); color: var(--text-primary); font-size: 1rem; font-family: var(--font-body);
  transition: border-color var(--dur) var(--ease), box-shadow var(--dur) var(--ease); }
.we-input::placeholder { color: var(--text-muted); }
.we-input:focus-visible { outline: none; border-color: var(--accent);
  box-shadow: 0 0 0 3px color-mix(in oklab, var(--accent) 25%, transparent); }
```

---

## 6. Pull quote (blockquote — editorial signature)

```html
<blockquote class="we-quote">
  <p>The warmth isn't decoration. It's the difference between a document and a place.</p>
  <cite>— Field notes</cite>
</blockquote>
```
```css
.we-quote { max-width: var(--measure); margin: 2rem auto; padding-left: 20px; border-left: 3px solid var(--accent); }
.we-quote p { font-family: var(--font-display); font-size: 1.5rem; line-height: 1.4; font-style: italic; color: var(--text-primary); }
.we-quote cite { display: block; margin-top: 10px; font-style: normal; font-size: 0.9rem; color: var(--text-muted); }
```

---

## 7. Tag / pill

```html
<span class="we-tag">Design</span>
<span class="we-tag we-tag-accent">New</span>
```
```css
.we-tag { display: inline-flex; align-items: center; height: 26px; padding: 0 12px; border-radius: 999px;
  font-size: 0.78rem; font-weight: 600; background: var(--surface-sunk); color: var(--text-secondary); border: 1px solid var(--border); }
.we-tag-accent { background: var(--accent-muted); color: var(--accent-hover); border-color: transparent; }
```

---

## 8. Navbar

```html
<header class="we-nav">
  <a class="brand" href="#">Paper &amp; Ink</a>
  <nav class="nav-links"><a href="#" class="active">Essays</a><a href="#">Notes</a><a href="#">About</a></nav>
  <button class="we-btn">Subscribe</button>
</header>
```
```css
.we-nav { display: flex; align-items: center; gap: 20px; padding: 16px 24px; border-bottom: 1px solid var(--border);
  max-width: 1100px; margin-inline: auto; }
.we-nav .brand { font-family: var(--font-display); font-weight: 600; font-size: 1.15rem; margin-right: auto; text-decoration: none; color: var(--text-primary); }
.nav-links { display: flex; gap: 20px; }
.nav-links a { text-decoration: none; color: var(--text-secondary); font-size: 0.95rem; transition: color var(--dur) var(--ease); }
.nav-links a:hover, .nav-links a.active { color: var(--accent); }
.nav-links a:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
```

---

## 9. Footnote / aside

```html
<aside class="we-aside">A small warm aside — for a definition, a citation, or a gentle note.</aside>
```
```css
.we-aside { max-width: var(--measure); margin: 1.5rem auto; padding: 14px 18px; border-radius: var(--radius);
  background: var(--surface-sunk); color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6; }
```

---

## Using this library (for the skill)

When a user wants a warm / editorial / cream / Anthropic-style look: **start from the reading surface
here**, then set the one earthy accent. Always:
1. Use a **warm cream background**, never `#fff`; surfaces a hair lighter.
2. Pair a **display serif + clean sans** (open-source); keep near-black text warm.
3. Use **one earthy accent** (terracotta/clay), sparingly.
4. Give body copy a **controlled measure (~68ch)** and generous line-height (~1.7).
5. Structure with **hairline rules**; keep shadows tiny.
6. Add `text-wrap: balance` on headings, `pretty` on paragraphs.

## Quick checklist
- [ ] Background is warm cream, never pure white
- [ ] Exactly one earthy accent, used sparingly
- [ ] Serif display + clean sans pairing (open-source fonts)
- [ ] Body measure ~65–70ch; line-height ~1.7
- [ ] Rules/dividers hairline and restrained; no heavy decoration
- [ ] Near-black text is warm, not pure `#000`
- [ ] `text-wrap: balance` on headings, `pretty` on paragraphs
- [ ] `:focus-visible` on controls; contrast ≥ 4.5:1 verified

Pairs with: `../styles/warm-editorial.md` (principles), `imagery.md` (warm photography treatment),
`microcopy.md` (thoughtful voice), `spacing.md` (reading rhythm), `accessibility.md`.
