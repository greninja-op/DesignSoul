# Dark Mode — Component Code Library (ready to use)

Drop-in, production-ready dark-mode code that layers onto **any** style. `../styles/dark-mode.md` holds
the *principles* (the seven rules); **this file holds the exact code** — a tuned dark token set, a
working theme toggle, the dark elevation pattern, and per-style dark overrides ready to paste. Dark
mode is *not* "invert the colors"; it's a separate, deliberately tuned token layer:

- **Never pure-black surfaces** — tinted dark neutrals so shadows and depth still read.
- **Elevation goes lighter, not darker** — higher surfaces get a lighter tone; shadows barely show.
- **Desaturate + lift accents** — full-saturation colors vibrate on dark.
- **Soften text** — off-white body, never `#fff` (pure white halates on dark).
- **Re-verify ALL contrast** — ratios change completely in dark.
- **Borders become subtle light overlays**, not dark lines.
- **Respect system preference + offer a manual toggle** — never trap the user in one theme.

```css
/* Dark token layer — applied when :root has [data-theme="dark"] */
:root[data-theme="dark"] {
  /* surfaces — tinted toward the brand hue, LIGHTER as elevation increases */
  --bg:         hsl(225 16% 8%);
  --surface:    hsl(225 15% 11%);
  --surface-1:  hsl(225 14% 14%);      /* card */
  --surface-2:  hsl(225 13% 17%);      /* dropdown */
  --surface-3:  hsl(225 12% 21%);      /* modal */
  --border:        rgba(255,255,255,0.10);
  --border-strong: rgba(255,255,255,0.16);
  --text-primary:   hsl(225 10% 92%);  /* not pure white */
  --text-secondary: hsl(225 8% 68%);
  --text-muted:     hsl(225 7% 50%);
  /* accent — desaturated + lifted vs light mode */
  --primary:       hsl(255 60% 68%);
  --primary-hover: hsl(255 60% 74%);
  --primary-muted: hsla(255 60% 68% / 0.16);
  --success: hsl(150 45% 55%);
  --warning: hsl(38 80% 60%);
  --error:   hsl(2 65% 62%);
}
```

---

## 1. The theme toggle (system default + manual override, no flash)

Put this **before** your stylesheets so the theme is set before first paint (avoids a flash):

```html
<script>
  // resolve theme before paint: saved choice > system preference
  (function () {
    const saved = localStorage.getItem('theme');
    const sysDark = matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.dataset.theme = saved || (sysDark ? 'dark' : 'light');
  })();
</script>
```
```html
<button id="theme-toggle" class="theme-toggle" aria-label="Toggle dark mode" aria-pressed="false">
  <span class="sun">☀️</span><span class="moon">🌙</span>
</button>
```
```js
const btn = document.getElementById('theme-toggle');
function sync() {
  const dark = document.documentElement.dataset.theme === 'dark';
  btn.setAttribute('aria-pressed', String(dark));
}
btn.addEventListener('click', () => {
  const dark = document.documentElement.dataset.theme === 'dark';
  document.documentElement.dataset.theme = dark ? 'light' : 'dark';
  localStorage.setItem('theme', document.documentElement.dataset.theme);
  sync();
});
// follow the system if the user hasn't chosen manually
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  if (!localStorage.getItem('theme')) { document.documentElement.dataset.theme = e.matches ? 'dark' : 'light'; sync(); }
});
sync();
```
```css
.theme-toggle { width: 44px; height: 44px; border-radius: 12px; cursor: pointer;
  background: var(--surface-1); border: 1px solid var(--border); color: var(--text-primary);
  display: grid; place-items: center; }
.theme-toggle:focus-visible { outline: 2px solid var(--primary); outline-offset: 2px; }
:root[data-theme="dark"] .theme-toggle .sun,
:root[data-theme="light"] .theme-toggle .moon { display: none; }
```

---

## 2. Dark elevation (lighter tone = higher; shadow is faint)

```css
/* Light mode: elevation = bigger shadow. Dark mode: elevation = lighter surface + faint shadow. */
:root[data-theme="dark"] .card     { background: var(--surface-1); box-shadow: 0 1px 2px rgba(0,0,0,0.4); }
:root[data-theme="dark"] .dropdown { background: var(--surface-2); box-shadow: 0 4px 12px rgba(0,0,0,0.5); }
:root[data-theme="dark"] .modal    { background: var(--surface-3); box-shadow: 0 16px 48px rgba(0,0,0,0.6); }
```

---

## 3. Base surfaces + text (works in both themes off the same tokens)

```css
/* Light defaults */
:root {
  --bg: hsl(225 30% 99%); --surface: #fff; --surface-1: #fff; --surface-2: #fff; --surface-3: #fff;
  --border: rgba(15,23,42,0.10); --border-strong: rgba(15,23,42,0.16);
  --text-primary: hsl(225 25% 12%); --text-secondary: hsl(225 12% 40%); --text-muted: hsl(225 10% 55%);
  --primary: hsl(255 70% 56%); --primary-hover: hsl(255 70% 50%); --primary-muted: hsla(255 70% 56% / 0.12);
}
body { background: var(--bg); color: var(--text-primary); }
.card { background: var(--surface-1); border: 1px solid var(--border); border-radius: 14px; padding: 20px; }
.card p { color: var(--text-secondary); }
```

---

## 4. Accent button (auto-tunes because it reads the token)

```html
<button class="btn-primary">Continue</button>
```
```css
.btn-primary { background: var(--primary); color: #fff; border: none; border-radius: 12px;
  min-height: 44px; padding: 0 20px; font-weight: 600; cursor: pointer;
  transition: background 180ms ease, transform 180ms ease; }
.btn-primary:hover { background: var(--primary-hover); transform: translateY(-1px); }
.btn-primary:focus-visible { outline: 2px solid var(--primary); outline-offset: 3px; }
/* Because it uses --primary, the desaturated dark accent applies automatically in dark mode. */
```

---

## 5. Per-style dark overrides (paste alongside the chosen style)

```css
/* GLASS / LIQUID GLASS — naturally suited to dark: dark fills, light borders, deep bg */
:root[data-theme="dark"] .glass { background: rgba(0,0,0,0.25); border-color: rgba(255,255,255,0.12); }

/* AURORA — deep base, blobs may glow a touch stronger */
:root[data-theme="dark"] .aurora-bg { background-color: hsl(240 30% 7%); }
:root[data-theme="dark"] .aurora-bg::before { opacity: 0.7; }

/* NEO-BRUTALISM — dark paper, same loud fills, borders/shadows go light */
:root[data-theme="dark"] .nb { --nb-bg:#15140f; --nb-ink:#f7f5ec;
  border-color: var(--nb-ink); box-shadow: 4px 4px 0 var(--nb-ink); }

/* MINIMAL / SWISS — near-black bg, off-white ink, accent brightened */
:root[data-theme="dark"] .sw-scope { --sw-bg:#0a0a0a; --sw-ink:#f2f2f2; --sw-gray-2:#333; --sw-accent:#6b6bff; }

/* SKEUOMORPHISM — graphite/brushed-metal materials; keep the top light source */
:root[data-theme="dark"] .sk-surface { background-color:#26262a;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.12), 0 8px 24px rgba(0,0,0,0.5); }

/* ⚠️ NEUMORPHISM — needs a mid-tone; if forced, use a dark mid-gray, expect a weaker effect */
:root[data-theme="dark"] .neu-scope { --neu-bg:#2a2d34;
  --neu-light: rgba(255,255,255,0.06); --neu-dark: rgba(0,0,0,0.5); }

/* ⚠️ CLAYMORPHISM — designed for light/friendly space; prefer to skip dark (loses character). */
```

---

## Using this library (for the skill)

When a user wants dark mode (alone or with a named style): **apply this token layer**, then:
1. Set the theme **before first paint** with the inline script (no flash), honoring system preference.
2. Provide a **manual toggle** with `aria-pressed`; persist the choice.
3. Use **tinted dark surfaces**, never pure black; make higher elevation **lighter**.
4. **Desaturate + lift** accents; soften body text to off-white.
5. Make borders **subtle light overlays**.
6. **Re-verify every contrast** in the dark palette, and apply the style-specific caveats
   (neumorphism/claymorphism warnings).

## Quick checklist
- [ ] No pure-black surfaces — tinted dark neutrals only
- [ ] Higher elevation = lighter surface (not just bigger shadow)
- [ ] Accents desaturated/lifted vs light mode
- [ ] Body text off-white, not pure `#fff`
- [ ] Borders are subtle light overlays, not dark lines
- [ ] Theme set before first paint (no flash); system preference respected + manual toggle
- [ ] ALL contrast re-verified for the dark palette
- [ ] Style-specific caveats handled (neumorphism/claymorphism warnings)

Pairs with: `../styles/dark-mode.md` (the seven rules + per-style notes), `depth.md` (dark elevation),
`color-theory.md` (desaturating accents), `accessibility.md` (re-verifying contrast).
