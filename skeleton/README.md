# DesignSoul Skeletons

Loading skeletons that match your real UI — captured from the actual rendered layout, not
hand-guessed boxes. Part of the DesignSoul design system. Zero runtime dependencies.

When DesignSoul builds a design and a component loads async, this is how the skeleton is
generated. The skeleton's shape comes from a snapshot of your real component, so the loading
state lines up pixel-for-pixel with the content that replaces it.

---

## How it works

1. **Mark** the component you want a skeleton for with `data-skeleton="<name>"`.
2. **Capture** its layout with the generator — it opens your app in a headless browser, finds
   every marked element, and writes a `<name>.skeleton.json` spec at several breakpoints.
3. **Render** the skeleton at runtime with the `<ds-skeleton>` element (or `renderSkeleton()`),
   which draws animated blocks from the spec while `loading` is true.

Specs store each block as `{ x:%, y:px, w:%, h:px, r:px }` — `x`/`w` scale with container
width (responsive), `y`/`h` are fixed pixels. Cross-framework, just JSON.

---

## Files

| File | Purpose |
|---|---|
| `skeleton.css` | Runtime styles — pulse / shimmer / solid animation, dark mode, reduced-motion |
| `skeleton.js` | Zero-dependency runtime — `<ds-skeleton>` element + `renderSkeleton()`, registry |
| `skeleton-gen.mjs` | Generator — snapshots `data-skeleton` elements into `.skeleton.json` |
| `examples/` | A worked source component, its generated spec, and the test harness |

---

## Quick start

### 1. Add the runtime to your project
Copy `skeleton.css` and `skeleton.js` into your project and include them.

```html
<link rel="stylesheet" href="/skeleton.css" />
<script type="module">
  import './skeleton.js';        // defines <ds-skeleton>
  import './bones/registry.js';  // generated registry (registers your specs)
</script>
```

### 2. Mark your component and wrap it
```html
<!-- mark the real component once -->
<div class="profile-card" data-skeleton="profile-card"> ...real content... </div>

<!-- and wrap it where it loads -->
<ds-skeleton name="profile-card" loading="true" animate="shimmer" stagger="80" transition="300">
  <div class="profile-card"> ...real content... </div>
</ds-skeleton>
```
Set `loading="false"` (or remove the attribute) when data arrives — the skeleton fades out and
the real content shows.

### 3. Generate the spec
```bash
# requires Playwright once:  npm i -D playwright && npx playwright install chromium
node skeleton-gen.mjs http://localhost:3000 --out ./src/skeletons
# or against a static file:
node skeleton-gen.mjs ./component.html --out ./src/skeletons
```

This writes `profile-card.skeleton.json` + a `registry.js` you import once.

---

## Extraction controls

Put these attributes on elements inside a `data-skeleton` container:

| Attribute | Effect |
|---|---|
| `data-skeleton-leaf` | Treat this element as ONE atomic block (don't recurse into its children) |
| `data-skeleton-ignore` | Skip this element and everything inside it |

Use `data-skeleton-leaf` on things like a tag-pill row or a chart you want represented as a
single block instead of many tiny ones.

---

## Runtime API

```js
import { renderSkeleton, registerSkeletons, getSkeleton, configureSkeletons } from './skeleton.js';

configureSkeletons({ animate: 'shimmer', color: '#e6e8ec', darkColor: 'rgba(255,255,255,0.08)' });
registerSkeletons({ 'profile-card': spec });        // usually done by the generated registry
const node = renderSkeleton(getSkeleton('profile-card'), { width: 420, stagger: 80 });
container.appendChild(node);
```

### `<ds-skeleton>` attributes
| Attribute | Default | Description |
|---|---|---|
| `name` | — | Registered spec name |
| `loading` | — | `true`/empty shows skeleton; `false`/absent shows children |
| `animate` | `pulse` | `pulse` \| `shimmer` \| `solid` |
| `color` / `dark-color` | tokens | Block fill (light / dark) |
| `stagger` | off | ms between blocks (capped at 5 steps, per the DesignSoul motion rule) |
| `transition` | off | ms fade-out when loading ends |

---

## CLI flags

| Flag | Default | Description |
|---|---|---|
| `<url\|file>` | — | The page or HTML file to capture from |
| `--out` | `./` | Output directory for specs + registry |
| `--breakpoints` | `375,768,1280` | Viewport widths to capture |
| `--wait` | `500` | ms to wait after load before snapshotting |

---

## Reproduce the test

```bash
cd skeleton
npm run setup      # installs Playwright + Chromium (one time)
npm run gen -- ./examples/source.html --out ./examples
npm test           # renders the captured skeleton in a browser and asserts it
```

> Dark mode is controlled by a `.dark` class on `<html>` or any ancestor — never
> `prefers-color-scheme`, so the app stays in control. Animations respect `prefers-reduced-motion`.
