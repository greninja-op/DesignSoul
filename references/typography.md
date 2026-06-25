# Typography: Font Pairing and Type Scale Logic

Typography is the personality of the page before the user reads a word.
The wrong font pair makes even a beautiful layout feel generic.
The right pair makes even a simple layout feel intentional.

---

## The Core Rule

> Never pick a font because it's safe. Pick it because it's right for this product.

Inter is safe. Roboto is safe. System font is safe.
Safe is not the goal. Right is the goal.

---

## How to Choose Fonts for a Product

Before picking any font, answer these three questions:

1. **What is the product's emotional register?**
   - Serious / institutional → serif display, clean sans body
   - Modern / technical → geometric sans display, neutral sans body
   - Warm / human → humanist sans display, serif body
   - Playful / consumer → rounded sans display, simple sans body
   - Editorial / media → slab serif or condensed display, clean body

2. **Who is the user?**
   - Professional tools → legibility over personality (but still make a choice)
   - Consumer apps → personality matters as much as legibility
   - Developer tools → monospace accents, minimal type, high contrast

3. **What is the primary content type?**
   - Dense data/tables → compact, tabular figures, tight leading
   - Long-form reading → generous leading, humanist serif or sans
   - Marketing/landing → display size, impact over readability at scale
   - Interface/UI → label-optimised, clear at small sizes

---

## Font Pairing Patterns

### Pattern 1: Serif Display + Sans Body (Classic Authority)
Best for: fintech, legal, healthcare, editorial, luxury
```
Display: Playfair Display, Cormorant, DM Serif Display, Libre Baskerville
Body:    Inter, DM Sans, Plus Jakarta Sans, Lato
```
Character: trustworthy, established, considered

### Pattern 2: Geometric Sans Display + Neutral Sans Body (Modern Clarity)
Best for: SaaS, productivity, developer tools, B2B
```
Display: Outfit, Sora, Space Grotesk, Manrope
Body:    Inter, IBM Plex Sans, Source Sans 3
```
Character: precise, efficient, capable

### Pattern 3: Humanist Sans Display + Serif Body (Warm Intelligence)
Best for: education, wellness, journaling, lifestyle
```
Display: Nunito, Figtree, Jost, Raleway
Body:    Lora, Merriweather, Source Serif 4
```
Character: approachable, thoughtful, trustworthy

### Pattern 4: Rounded Sans + Rounded Sans (Friendly Consumer)
Best for: food delivery, social apps, games, children's products
```
Display: Nunito, Poppins, Fredoka, Quicksand
Body:    Nunito (lighter weight), DM Sans, Rubik
```
Character: playful, accessible, energetic

### Pattern 5: Condensed Display + Regular Body (Editorial Impact)
Best for: news, sports, fashion, entertainment
```
Display: Barlow Condensed, Oswald, Anton, Bebas Neue
Body:    Barlow, Roboto, Open Sans
```
Character: bold, confident, high-information

### Pattern 6: Monospace Accent + Clean Sans (Technical)
Best for: developer tools, data products, terminals, code editors
```
Display: JetBrains Mono (for headings), Fira Code
Body:    Inter, IBM Plex Sans
```
Character: precise, no-nonsense, technical

---

## The Type Scale

Never use ad-hoc font sizes. Define a scale and use only those values.

```css
:root {
  /* Base: 16px */
  --text-xs:    0.75rem;   /* 12px — captions, legal, timestamps */
  --text-sm:    0.875rem;  /* 14px — labels, secondary info, table data */
  --text-base:  1rem;      /* 16px — body text, descriptions */
  --text-md:    1.125rem;  /* 18px — large body, featured text */
  --text-lg:    1.25rem;   /* 20px — subheadings, card titles */
  --text-xl:    1.5rem;    /* 24px — section headings */
  --text-2xl:   1.875rem;  /* 30px — page headings */
  --text-3xl:   2.25rem;   /* 36px — hero subheadings */
  --text-4xl:   3rem;      /* 48px — hero headings */
  --text-5xl:   3.75rem;   /* 60px — display/impact */
  --text-6xl:   4.5rem;    /* 72px — maximum display */
}
```

**Rule:** Jump at least one step between hierarchy levels. Never use adjacent sizes for different hierarchy roles.

---

## Font Weight System

```css
:root {
  --weight-light:    300;  /* decorative, large display only */
  --weight-regular:  400;  /* body text, descriptions */
  --weight-medium:   500;  /* labels, navigation, secondary emphasis */
  --weight-semibold: 600;  /* card titles, subheadings, UI labels */
  --weight-bold:     700;  /* headings, important callouts */
  --weight-black:    900;  /* hero display, maximum impact only */
}
```

**Rule:** Bold (`700`) should be the exception. Medium (`500`) is the workhorse.

---

## Line Height System

```css
:root {
  --leading-none:    1;     /* display text, single-line labels */
  --leading-tight:   1.2;   /* large headings, hero text */
  --leading-snug:    1.35;  /* subheadings, card titles */
  --leading-normal:  1.5;   /* default, UI text */
  --leading-relaxed: 1.65;  /* body reading text */
  --leading-loose:   1.8;   /* small text, captions (improves legibility) */
}
```

**Rule:** The larger the text, the tighter the line height. The smaller, the looser.

---

## Letter Spacing System

```css
:root {
  --tracking-tighter: -0.04em;  /* large display text (>48px) */
  --tracking-tight:   -0.02em;  /* headings (24-48px) */
  --tracking-normal:   0em;     /* body text */
  --tracking-wide:     0.05em;  /* labels, captions, uppercase small text */
  --tracking-wider:    0.1em;   /* ALL CAPS elements only */
}
```

**Rule:** Large text tracks tighter. Small uppercase text tracks wider.

---

## Typographic Roles

Define each role clearly. Use only role names in CSS — never raw values.

```css
/* Display — hero impact text */
.type-display {
  font-family: var(--font-display);
  font-size: var(--text-5xl);
  font-weight: var(--weight-bold);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tighter);
}

/* Heading 1 — page/section primary */
.type-h1 {
  font-family: var(--font-display);
  font-size: var(--text-3xl);
  font-weight: var(--weight-bold);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
}

/* Heading 2 — section secondary */
.type-h2 {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: var(--weight-semibold);
  line-height: var(--leading-snug);
  letter-spacing: var(--tracking-tight);
}

/* Body — primary reading text */
.type-body {
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: var(--weight-regular);
  line-height: var(--leading-relaxed);
  letter-spacing: var(--tracking-normal);
}

/* Label — UI labels, navigation, form labels */
.type-label {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  line-height: var(--leading-normal);
  letter-spacing: var(--tracking-wide);
}

/* Caption — secondary, timestamps, footnotes */
.type-caption {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: var(--weight-regular);
  line-height: var(--leading-loose);
  letter-spacing: var(--tracking-wide);
}

/* Code — technical content */
.type-code {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  font-weight: var(--weight-regular);
  line-height: var(--leading-relaxed);
  letter-spacing: var(--tracking-normal);
}
```

---

## Google Fonts Loading

Load only what you use. Max 2 font families + optionally 1 mono.

```html
<!-- Example: Outfit (display) + Inter (body) -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@600;700;900&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
```

```css
:root {
  --font-display: 'Outfit', sans-serif;
  --font-body: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace; /* only if needed */
}
```

**Rules:**
- Load maximum 3 weights per family
- Always include `display=swap` for performance
- Never load the full variable font range unless you're using >4 weights

---

## Typography Quick Reference by Product Type

| Product Type | Display Font | Body Font | Character |
|---|---|---|---|
| Food delivery | Nunito 800 | DM Sans 400 | Warm, urgent |
| Fintech / Banking | Playfair Display 700 | Inter 400 | Trustworthy |
| SaaS dashboard | Space Grotesk 700 | Inter 400 | Efficient |
| E-commerce | Sora 700 | Plus Jakarta Sans 400 | Modern |
| Healthcare | DM Serif Display | Source Sans 3 | Clear, calm |
| Developer tool | Inter 700 (or mono) | Inter 400 | Precise |
| Portfolio | Cormorant 600 | Lato 400 | Refined |
| News / Media | Barlow Condensed 800 | Barlow 400 | Editorial |
| Wellness / Lifestyle | Jost 600 | Lora 400 | Balanced |
| Gaming / Entertainment | Oswald 700 | Roboto 400 | Bold |

---

## Typography Checklist

Before finishing:
- [ ] Two font families defined with clear roles (display, body)
- [ ] Font sizes only use the type scale — no arbitrary values
- [ ] Line height follows the size-based rules (large = tight, small = loose)
- [ ] Letter spacing follows the rules (large = tighter, small caps = wider)
- [ ] Bold weight used sparingly — max 2-3 elements per section
- [ ] Font is loaded efficiently — only needed weights
- [ ] No font is used outside its defined role
