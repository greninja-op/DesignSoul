# Style: Warm Editorial

Cream paper backgrounds, a warm terracotta accent, and a serif/sans pairing that reads like a
well-set book or a thoughtful product essay. Calm, trustworthy, human, premium-without-shouting.
A favorite for AI products, long-form reading, brand sites, and documentation that wants warmth.

> The natural antidote to cold AI-default UI: instead of white + blue + Inter, it's warm
> paper + terracotta + a real type pairing. Nearly 100% achievable in pure HTML/CSS, no assets.

---

## Core Principles

1. **Warm paper, not white** — the page is a soft cream, never `#fff`
2. **One earthy accent** — terracotta / clay, used sparingly
3. **Serif + sans pairing** — serif display for character, clean sans for body
4. **Book-like reading rhythm** — controlled measure, generous line-height, restrained rules
5. **Restraint over decoration** — warmth comes from color temperature and type, not effects

---

## Token System

```css
:root {
  /* Warm paper neutrals */
  --bg:            #F5F0E8;   /* cream paper */
  --surface:       #FBF8F2;   /* slightly lighter card */
  --surface-sunk:  #EFE8DC;
  --border:        #E4DBCC;
  --text-primary:  #191919;   /* near-black, warm */
  --text-secondary:#5C564C;
  --text-muted:    #8A8273;

  /* The single earthy accent */
  --accent:        #CC785C;   /* terracotta */
  --accent-hover:  #B5664C;
  --accent-muted:  #F0E0D8;

  /* type */
  --font-display: 'Fraunces', 'Newsreader', Georgia, serif;
  --font-body:    'Inter', system-ui, sans-serif;

  --radius: 10px;
  --measure: 68ch;
}
```

Open-source pairing: **Fraunces** or **Newsreader** (display serif) + **Inter** (body).
Avoid paid faces; substitute the above for Tiempos/Styrene-type looks.

---

## Reading Surface

```css
body { background: var(--bg); color: var(--text-primary); font-family: var(--font-body); }

.prose {
  max-width: var(--measure);
  margin-inline: auto;
  line-height: 1.7;          /* book-like breathing */
  font-size: 1.0625rem;
}
.prose h1, .prose h2 {
  font-family: var(--font-display);
  font-weight: 600;
  letter-spacing: -0.01em;
  text-wrap: balance;
}
.prose p { text-wrap: pretty; margin: 0 0 1.2em; }
hr { border: none; border-top: 1px solid var(--border); margin: 2.5rem 0; }
```

---

## Card

```css
.we-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 24px 28px;
  box-shadow: 0 1px 2px rgba(60, 40, 20, 0.04);
}
```

---

## Buttons & Links

```css
.we-btn {
  background: var(--accent);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 11px 20px;
  font-weight: 600;
  transition: background var(--duration-fast) var(--ease-out);
}
.we-btn:hover { background: var(--accent-hover); }

.we-btn-secondary {
  background: transparent;
  color: var(--text-primary);
  border: 1px solid var(--border);
}

.we-link {
  color: var(--accent);
  text-underline-offset: 3px;
  text-decoration-thickness: 1px;
}
```

---

## Eyebrow / Label

```css
.we-eyebrow {
  font-size: 0.75rem; font-weight: 600; letter-spacing: 0.08em;
  text-transform: uppercase; color: var(--accent);
}
```

---

## Warm Editorial Checklist

- [ ] Background is warm cream, never pure white
- [ ] Exactly one earthy accent (terracotta/clay), used sparingly
- [ ] Serif display + clean sans body pairing (open-source fonts)
- [ ] Body has a controlled measure (~65–70ch) and generous line-height (~1.7)
- [ ] Rules/dividers are hairline and restrained; no heavy decoration
- [ ] Near-black text is warm, not pure `#000`
- [ ] `text-wrap: balance` on headings, `pretty` on paragraphs
