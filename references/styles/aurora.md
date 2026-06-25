# Style: Aurora / Mesh Gradient

Soft, glowing, multi-color gradient fields — like the northern lights behind the UI.
Used by Stripe, Linear, Vercel, and most modern AI/SaaS landing pages.
Done wrong: a harsh rainbow. Done right: a calm, premium glow that gives depth without noise.

---

## Core Principles

1. **The gradient is the background, the UI is calm** — content sits on near-neutral surfaces; the aurora lives behind/around them
2. **Low saturation, high lightness** — aurora colors are soft and luminous, not neon
3. **Blurred blobs, not hard stops** — radial gradients with large soft falloff
4. **2–4 hues max** — usually analogous or a brand pair, never the full spectrum
5. **Subtle motion** — if it moves, it drifts slowly (20–40s), never pulses

---

## Token System

```css
:root {
  /* Aurora hues — pick 2-4 analogous or brand-aligned colors */
  --aurora-1: hsl(265, 80%, 65%);   /* violet */
  --aurora-2: hsl(220, 85%, 62%);   /* blue */
  --aurora-3: hsl(190, 80%, 60%);   /* cyan */
  --aurora-4: hsl(320, 70%, 65%);   /* pink accent */

  /* The UI sits on near-neutral surfaces */
  --surface:        rgba(255, 255, 255, 0.72);
  --surface-solid:  #ffffff;
  --border:         rgba(15, 23, 42, 0.08);
  --text-primary:   hsl(225, 25%, 12%);
  --text-secondary: hsl(225, 12%, 40%);

  /* Dark aurora variant */
  --aurora-bg-dark: hsl(240, 30%, 7%);
}
```

---

## The Aurora Background

```css
.aurora-bg {
  position: relative;
  background-color: #fafafe;
  overflow: hidden;
}

/* Soft glowing blobs */
.aurora-bg::before {
  content: '';
  position: absolute;
  inset: -20%;
  background:
    radial-gradient(40% 40% at 20% 25%, var(--aurora-1) 0%, transparent 60%),
    radial-gradient(35% 35% at 80% 15%, var(--aurora-2) 0%, transparent 60%),
    radial-gradient(45% 45% at 70% 80%, var(--aurora-3) 0%, transparent 60%),
    radial-gradient(30% 30% at 30% 75%, var(--aurora-4) 0%, transparent 60%);
  filter: blur(60px);
  opacity: 0.55;            /* keep it soft — never full strength */
  z-index: 0;
  pointer-events: none;
}

.aurora-bg > * { position: relative; z-index: 1; }
```

### Optional Slow Drift

```css
@keyframes auroraDrift {
  0%   { transform: translate(0, 0) scale(1); }
  50%  { transform: translate(-3%, 2%) scale(1.05); }
  100% { transform: translate(0, 0) scale(1); }
}

.aurora-bg::before {
  animation: auroraDrift 32s ease-in-out infinite; /* slow — 20-40s only */
}
```

---

## Cards / Surfaces on Aurora

Content surfaces stay calm and slightly translucent so the glow shows through faintly:

```css
.aurora-card {
  background: var(--surface);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--border);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(15, 23, 42, 0.06);
  color: var(--text-primary);
  padding: 24px;
}
```

---

## Buttons on Aurora

Primary buttons can use a subtle gradient fill drawn from the aurora hues:

```css
.aurora-btn-primary {
  background: linear-gradient(135deg, var(--aurora-1), var(--aurora-2));
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 12px 24px;
  font-weight: 600;
  box-shadow: 0 6px 20px hsla(255, 80%, 60%, 0.30);
  transition: all var(--duration-fast) var(--ease-out);
}
.aurora-btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 28px hsla(255, 80%, 60%, 0.40);
}
```

---

## Aurora Checklist

- [ ] Background uses soft blurred radial blobs, not hard linear stops
- [ ] Aurora opacity is restrained (0.4–0.65), never full strength
- [ ] 2–4 hues only, analogous or brand-aligned
- [ ] Content surfaces are calm/near-neutral — the glow is behind, not on, the text
- [ ] Text passes contrast over the lightest AND most saturated part of the background
- [ ] Any motion drifts slowly (20–40s), no fast pulsing
- [ ] `blur()` falloff is large (40–80px) so blobs read as glow, not shapes
