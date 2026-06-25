# Style: Glassmorphism

Frosted glass surfaces. Depth through blur. Light through translucency.
Done wrong: blurry grey boxes on a gradient. Done right: a UI that feels like it exists in physical space.

---

## The Core Principles

1. **Background matters as much as the glass** — glass only works if there's something interesting behind it to blur
2. **Layering creates depth** — foreground glass, midground content, background gradient/image
3. **Light edges, not dark** — the frosted edge of glass catches light, it doesn't cast shadow
4. **Restraint** — not every element is glass. Ground elements exist to contrast with floating glass elements

---

## Required Background

Glass without a background is invisible. Before any glass component, define the background:

```css
.glass-background {
  /* Option 1: Gradient (most common) */
  background: linear-gradient(
    135deg,
    hsl(220, 80%, 60%) 0%,
    hsl(280, 70%, 50%) 50%,
    hsl(320, 80%, 55%) 100%
  );

  /* Option 2: Mesh gradient (more sophisticated) */
  background:
    radial-gradient(at 20% 20%, hsl(220, 80%, 65%) 0%, transparent 50%),
    radial-gradient(at 80% 10%, hsl(280, 70%, 60%) 0%, transparent 50%),
    radial-gradient(at 50% 80%, hsl(320, 75%, 60%) 0%, transparent 50%),
    hsl(240, 60%, 30%);

  /* Option 3: Image with overlay (product context) */
  background: url('...') center/cover no-repeat;
}
```

---

## The Glass Token System

```css
:root {
  /* Light Glass (default — for light backgrounds) */
  --glass-bg:           rgba(255, 255, 255, 0.15);
  --glass-bg-hover:     rgba(255, 255, 255, 0.22);
  --glass-bg-strong:    rgba(255, 255, 255, 0.30);
  --glass-border:       rgba(255, 255, 255, 0.30);
  --glass-border-inner: rgba(255, 255, 255, 0.60); /* top/left highlight edge */
  --glass-blur:         blur(16px);
  --glass-blur-heavy:   blur(32px);
  --glass-shadow:       0 8px 32px rgba(0, 0, 0, 0.15);
  --glass-text:         rgba(255, 255, 255, 0.95);
  --glass-text-muted:   rgba(255, 255, 255, 0.65);

  /* Dark Glass (for dark-themed glass) */
  --glass-dark-bg:      rgba(0, 0, 0, 0.25);
  --glass-dark-border:  rgba(255, 255, 255, 0.12);
  --glass-dark-text:    rgba(255, 255, 255, 0.90);
}
```

---

## The Glass Card Component

```css
.glass-card {
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur); /* Safari */
  border-radius: 16px;
  border: 1px solid var(--glass-border);

  /* Light edge on top and left — simulates light source from top-left */
  box-shadow:
    0 8px 32px var(--glass-shadow),
    inset 0 1px 0 var(--glass-border-inner),   /* top inner highlight */
    inset 1px 0 0 rgba(255,255,255,0.15);       /* left inner highlight */

  /* Text on glass needs to be light and readable */
  color: var(--glass-text);
}

.glass-card:hover {
  background: var(--glass-bg-hover);
  box-shadow:
    0 16px 48px rgba(0, 0, 0, 0.20),
    inset 0 1px 0 var(--glass-border-inner),
    inset 1px 0 0 rgba(255,255,255,0.15);
  transform: translateY(-4px);
  transition: all var(--duration-normal) var(--ease-out);
}
```

---

## Glassmorphism Navbar

```css
.glass-nav {
  background: rgba(255, 255, 255, 0.10);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.20);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.10);

  /* Solidify on scroll */
  transition: background var(--duration-normal) var(--ease-out);
}

.glass-nav.scrolled {
  background: rgba(255, 255, 255, 0.18);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
}
```

---

## Glassmorphism Buttons

```css
.glass-btn {
  background: rgba(255, 255, 255, 0.20);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 12px;
  color: white;
  font-weight: 600;
  padding: 12px 24px;
  box-shadow:
    0 4px 16px rgba(0, 0, 0, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.40);
  transition: all var(--duration-fast) var(--ease-out);
  cursor: pointer;
}

.glass-btn:hover {
  background: rgba(255, 255, 255, 0.28);
  box-shadow:
    0 8px 24px rgba(0, 0, 0, 0.18),
    inset 0 1px 0 rgba(255, 255, 255, 0.50);
  transform: translateY(-2px);
}

.glass-btn:active {
  transform: translateY(0);
  background: rgba(255, 255, 255, 0.15);
}

/* Primary action button — more opaque */
.glass-btn-primary {
  background: rgba(255, 255, 255, 0.90);
  color: hsl(240, 60%, 30%); /* dark color from background palette */
  border: none;
}

.glass-btn-primary:hover {
  background: rgba(255, 255, 255, 1);
}
```

---

## Glassmorphism Form Inputs

```css
.glass-input {
  background: rgba(255, 255, 255, 0.10);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 12px;
  color: white;
  padding: 12px 16px;
  outline: none;
  transition: all var(--duration-fast) var(--ease-out);
  width: 100%;
}

.glass-input::placeholder {
  color: rgba(255, 255, 255, 0.45);
}

.glass-input:focus {
  background: rgba(255, 255, 255, 0.18);
  border-color: rgba(255, 255, 255, 0.55);
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.15);
}
```

---

## Glassmorphism Modal

```css
.glass-modal {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 24px;
  box-shadow:
    0 24px 64px rgba(0, 0, 0, 0.25),
    inset 0 1px 0 rgba(255, 255, 255, 0.40);
  padding: 32px;
  max-width: 480px;
  width: 100%;
}

.glass-modal-backdrop {
  background: rgba(0, 0, 0, 0.30);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}
```

---

## Typography on Glass

Text on glass needs to be readable despite the dynamic background behind it.

```css
/* Primary text on glass */
.glass-text {
  color: rgba(255, 255, 255, 0.95);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.15); /* subtle shadow for legibility */
}

/* Secondary text on glass */
.glass-text-muted {
  color: rgba(255, 255, 255, 0.65);
}

/* Dark text on light glass (when glass-bg-strong is used) */
.glass-text-dark {
  color: rgba(0, 0, 0, 0.80);
}
```

---

## Animated Background (Optional but Powerful)

Moving the background behind glass elements creates a dynamic, living feel:

```css
@keyframes gradientShift {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animated-glass-bg {
  background: linear-gradient(
    -45deg,
    hsl(220, 80%, 55%),
    hsl(280, 70%, 50%),
    hsl(320, 80%, 55%),
    hsl(200, 75%, 50%)
  );
  background-size: 400% 400%;
  animation: gradientShift 12s ease infinite;
}
```

**Rule:** Keep animation duration at 10-15s. Faster feels anxious, slower feels static.

---

## Glassmorphism Checklist

Before finishing a glassmorphism conversion:

- [ ] Background has depth (gradient, mesh, or image) — not plain color
- [ ] All glass surfaces use `backdrop-filter` with appropriate blur values
- [ ] `-webkit-backdrop-filter` present for Safari support
- [ ] Glass border uses rgba white, not solid color
- [ ] Inner highlight on top/left edges of glass cards
- [ ] Text readable on glass (test against multiple background areas)
- [ ] Buttons have hierarchy — primary is opaque, secondary is glass
- [ ] Forms have glass treatment with visible focus states
- [ ] No non-glass element looks out of place (consistent visual language)
- [ ] Background animation (if present) is 10-15s, not jarring
- [ ] `@supports (backdrop-filter: blur(0))` fallback for unsupported browsers:

```css
@supports not (backdrop-filter: blur(0)) {
  .glass-card {
    background: rgba(30, 30, 60, 0.85); /* dark fallback */
  }
}
```
