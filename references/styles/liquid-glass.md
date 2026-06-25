# Style: Liquid Glass (Apple iOS 26 / visionOS)

Apple's 2025 design language. Not the frosted glass of iOS 7.
This is glass that reacts, refracts, and feels physically present.
The difference: specular highlights, chromatic refraction, dynamic blur, and materials that respond to content behind them.

---

## What Makes This Different From Glassmorphism

| Glassmorphism | Liquid Glass |
|---|---|
| Static blur | Dynamic blur that responds to content |
| White border only | Specular highlight + chromatic edge |
| Flat glass surface | Curved surface — light bends at edges |
| Single blur value | Multiple blur layers at different depths |
| Background gradient | Background content shows through naturally |

---

## The Core Visual Properties

### Specular Highlight
The top edge of liquid glass catches light as if it's a curved surface:
```css
/* The light hits the top curved edge first */
box-shadow:
  inset 0 1.5px 0 rgba(255, 255, 255, 0.75),     /* top specular */
  inset 0 -0.5px 0 rgba(255, 255, 255, 0.20),    /* bottom edge */
  inset 1px 0 0 rgba(255, 255, 255, 0.25),        /* left edge */
  inset -1px 0 0 rgba(255, 255, 255, 0.15),       /* right edge */
  0 8px 32px rgba(0, 0, 0, 0.12),
  0 2px 8px rgba(0, 0, 0, 0.08);
```

### Chromatic Refraction (Subtle)
At the edges, glass bends light slightly — a barely perceptible rainbow:
```css
/* Applied as a pseudo-element at the edge */
.liquid-glass::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(
    135deg,
    rgba(255, 100, 100, 0.04) 0%,
    rgba(100, 255, 100, 0.02) 50%,
    rgba(100, 100, 255, 0.04) 100%
  );
  pointer-events: none;
}
```

---

## Token System

```css
:root {
  /* Material fill */
  --liquid-bg:           rgba(255, 255, 255, 0.12);
  --liquid-bg-hover:     rgba(255, 255, 255, 0.18);
  --liquid-bg-active:    rgba(255, 255, 255, 0.08);
  --liquid-bg-elevated:  rgba(255, 255, 255, 0.22);  /* modals, overlays */

  /* Blur layers */
  --liquid-blur-base:    blur(20px);          /* standard surface */
  --liquid-blur-heavy:   blur(40px);          /* modals, overlays */
  --liquid-blur-light:   blur(12px);          /* subtle backgrounds */
  --liquid-blur-ultra:   saturate(180%) blur(24px); /* with color saturation */

  /* Border */
  --liquid-border:       rgba(255, 255, 255, 0.22);

  /* Text */
  --liquid-text:         rgba(255, 255, 255, 0.92);
  --liquid-text-muted:   rgba(255, 255, 255, 0.55);
  --liquid-text-subtle:  rgba(255, 255, 255, 0.35);

  /* Radius — Apple uses very round corners */
  --liquid-radius-sm:    12px;
  --liquid-radius-md:    18px;
  --liquid-radius-lg:    24px;
  --liquid-radius-pill:  9999px;
}
```

---

## The Liquid Glass Surface

```css
.liquid-glass {
  position: relative;
  background: var(--liquid-bg);
  backdrop-filter: var(--liquid-blur-ultra);
  -webkit-backdrop-filter: var(--liquid-blur-ultra);
  border-radius: var(--liquid-radius-lg);
  border: 1px solid var(--liquid-border);
  box-shadow:
    inset 0 1.5px 0 rgba(255, 255, 255, 0.70),
    inset 0 -0.5px 0 rgba(255, 255, 255, 0.15),
    inset 1px 0 0 rgba(255, 255, 255, 0.20),
    inset -1px 0 0 rgba(255, 255, 255, 0.10),
    0 8px 32px rgba(0, 0, 0, 0.10),
    0 2px 8px rgba(0, 0, 0, 0.06);
  overflow: hidden; /* clip the pseudo elements */
}

/* Chromatic fringe */
.liquid-glass::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(
    145deg,
    rgba(255, 80, 80, 0.03) 0%,
    transparent 40%,
    rgba(80, 80, 255, 0.03) 100%
  );
  pointer-events: none;
  z-index: 1;
}

/* Inner glow */
.liquid-glass::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 50%;
  border-radius: inherit;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.08),
    transparent
  );
  pointer-events: none;
  z-index: 1;
}
```

---

## Liquid Glass Navbar (Apple-Style)

```css
.liquid-nav {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: saturate(200%) blur(24px);
  -webkit-backdrop-filter: saturate(200%) blur(24px);
  border-bottom: 0.5px solid rgba(255, 255, 255, 0.20);

  box-shadow:
    inset 0 -0.5px 0 rgba(255, 255, 255, 0.10),
    0 0.5px 0 rgba(255, 255, 255, 0.25),
    0 4px 20px rgba(0, 0, 0, 0.08);
}
```

---

## Liquid Glass Pills (Navigation, Tabs, Tags)

Apple's UI uses pill-shaped floating elements extensively:

```css
.liquid-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 18px;
  border-radius: var(--liquid-radius-pill);
  background: rgba(255, 255, 255, 0.14);
  backdrop-filter: blur(16px) saturate(160%);
  -webkit-backdrop-filter: blur(16px) saturate(160%);
  border: 0.5px solid rgba(255, 255, 255, 0.28);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.55),
    0 4px 12px rgba(0, 0, 0, 0.08);
  color: var(--liquid-text);
  font-weight: 500;
  font-size: 0.875rem;
  transition: all var(--duration-fast) var(--ease-out);
}

.liquid-pill:hover {
  background: rgba(255, 255, 255, 0.20);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.65),
    0 6px 16px rgba(0, 0, 0, 0.12);
  transform: scale(1.02);
}

.liquid-pill.active {
  background: rgba(255, 255, 255, 0.85);
  color: rgba(0, 0, 0, 0.80);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 1),
    0 4px 12px rgba(0, 0, 0, 0.15);
}
```

---

## Liquid Glass Buttons

```css
.liquid-btn {
  position: relative;
  padding: 12px 28px;
  border-radius: var(--liquid-radius-pill); /* Apple uses full pill for buttons */
  background: rgba(255, 255, 255, 0.16);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border: 0.5px solid rgba(255, 255, 255, 0.30);
  box-shadow:
    inset 0 1.5px 0 rgba(255, 255, 255, 0.70),
    inset 0 -0.5px 0 rgba(255, 255, 255, 0.15),
    0 6px 20px rgba(0, 0, 0, 0.10);
  color: white;
  font-weight: 600;
  font-size: 0.9375rem;
  letter-spacing: -0.01em;
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-out);
  overflow: hidden;
}

.liquid-btn:hover {
  background: rgba(255, 255, 255, 0.22);
  box-shadow:
    inset 0 1.5px 0 rgba(255, 255, 255, 0.80),
    inset 0 -0.5px 0 rgba(255, 255, 255, 0.20),
    0 10px 28px rgba(0, 0, 0, 0.14);
  transform: translateY(-1px) scale(1.01);
}

.liquid-btn:active {
  transform: translateY(0) scale(0.99);
  background: rgba(255, 255, 255, 0.10);
  transition-duration: var(--duration-instant);
}

/* Primary — Apple-style solid white */
.liquid-btn-primary {
  background: rgba(255, 255, 255, 0.88);
  color: rgba(0, 0, 0, 0.80);
  backdrop-filter: none;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 1),
    0 6px 20px rgba(0, 0, 0, 0.15);
}

.liquid-btn-primary:hover {
  background: rgba(255, 255, 255, 0.96);
}
```

---

## Liquid Motion (Apple Physics)

Liquid glass elements should feel physical — they don't just fade, they settle:

```css
:root {
  /* Apple uses spring-like curves */
  --liquid-spring:    cubic-bezier(0.34, 1.56, 0.64, 1);
  --liquid-ease:      cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --liquid-duration:  280ms;
}

/* Scale in with spring (menus, popovers) */
@keyframes liquidScaleIn {
  from {
    opacity: 0;
    transform: scale(0.88) translateY(4px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* The card "lifting" on hover */
.liquid-glass-card:hover {
  transform: translateY(-6px) scale(1.01);
  box-shadow:
    inset 0 1.5px 0 rgba(255, 255, 255, 0.80),
    inset 0 -0.5px 0 rgba(255, 255, 255, 0.20),
    0 20px 48px rgba(0, 0, 0, 0.16),
    0 8px 16px rgba(0, 0, 0, 0.08);
  transition: all var(--liquid-duration) var(--liquid-spring);
}
```

---

## Typography for Liquid Glass

Apple uses SF Pro — use these web equivalents:

```css
/* Primary font stack (closest to SF Pro) */
--font-display: -apple-system, 'SF Pro Display', 'Inter', system-ui, sans-serif;
--font-body: -apple-system, 'SF Pro Text', 'Inter', system-ui, sans-serif;

/* Key typographic choices */
/* Slightly tighter tracking than usual */
/* Slightly heavier weights than standard */
```

```css
h1, h2 { letter-spacing: -0.03em; font-weight: 700; }
h3, h4 { letter-spacing: -0.02em; font-weight: 600; }
body    { letter-spacing: -0.01em; font-weight: 400; }
.label  { letter-spacing: 0em;    font-weight: 500; }
```

---

## Dark Background Colors for Liquid Glass

```css
/* These work as backgrounds that liquid glass floats on */

/* Deep space (visionOS-inspired) */
--bg-space: linear-gradient(
  135deg,
  hsl(240, 30%, 8%) 0%,
  hsl(260, 25%, 12%) 50%,
  hsl(220, 30%, 8%) 100%
);

/* Warm dark (iPhone wallpaper-inspired) */
--bg-warm-dark: linear-gradient(
  135deg,
  hsl(20, 40%, 8%) 0%,
  hsl(340, 35%, 12%) 100%
);

/* Cool glass (iMac-inspired) */
--bg-cool: linear-gradient(
  135deg,
  hsl(210, 50%, 10%) 0%,
  hsl(180, 40%, 12%) 100%
);
```

---

## Liquid Glass Checklist

- [ ] `saturate()` included in `backdrop-filter` — not just `blur()`
- [ ] Multi-layered `box-shadow` for specular highlights (not just outer shadow)
- [ ] `inset 0 1.5px 0` top highlight present on all glass surfaces
- [ ] Pseudo-elements for chromatic fringe and inner glow
- [ ] `overflow: hidden` on parent to clip pseudo-elements
- [ ] Button radius is pill (full round), not just rounded
- [ ] Hover uses spring easing, not linear or ease
- [ ] Primary CTA is opaque white over glass, not more glass
- [ ] Typography uses tight letter-spacing (`-0.02em` to `-0.03em`)
- [ ] `@supports` fallback for browsers without backdrop-filter
- [ ] `-webkit-backdrop-filter` present for Safari
