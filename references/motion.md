# Motion System: Animation That Means Something

This is the law for all animation in any project using DesignSoul.
Every animation decision traces back to this file.
Nothing is added "because it looks cool."

---

## The Core Principle

> Animation communicates. If it doesn't tell the user something,
> it shouldn't exist.

What animation communicates:
- **Cause and effect** — this button caused that panel to open
- **Spatial relationships** — this drawer came from the right, so to dismiss it, go right
- **State change** — this item moved from pending to complete
- **Hierarchy** — the most important thing enters first
- **Continuity** — the user is in the same place, the content changed

---

## The Motion Token System

Define these ONCE. Use them everywhere. Never deviate.

```css
:root {
  /* Durations */
  --duration-instant:   100ms;   /* micro feedback: button press, checkbox tick */
  --duration-fast:      150ms;   /* hover states, small state changes */
  --duration-normal:    250ms;   /* most transitions: panels, dropdowns, modals */
  --duration-slow:      400ms;   /* large elements: page sections, full-screen modals */
  --duration-deliberate: 600ms;  /* onboarding, celebrations, emphasis moments */

  /* Easing */
  --ease-out:     cubic-bezier(0.0, 0.0, 0.2, 1);   /* things entering the screen */
  --ease-in:      cubic-bezier(0.4, 0.0, 1, 1);     /* things leaving the screen */
  --ease-in-out:  cubic-bezier(0.4, 0.0, 0.2, 1);   /* things moving within screen */
  --ease-spring:  cubic-bezier(0.34, 1.56, 0.64, 1); /* playful: toggles, selections */
  --ease-linear:  linear;                             /* spinners, progress bars only */
}
```

### Rules for Easing
- Elements **entering** the screen: `--ease-out` (fast start, gentle landing)
- Elements **leaving** the screen: `--ease-in` (gentle start, fast exit — gets out of the way)
- Elements **moving within** the screen: `--ease-in-out` (smooth arc)
- Playful interactions (toggles, selections, checkboxes): `--ease-spring` (slight overshoot)
- Continuous motion (spinners, progress, loaders): `--ease-linear` only

---

## What Gets What Duration

| Element | Duration | Easing | Notes |
|---|---|---|---|
| Button hover background | `--duration-fast` | `--ease-out` | |
| Button press (active) | `--duration-instant` | `--ease-out` | Snappy feedback |
| Checkbox check | `--duration-fast` | `--ease-spring` | Satisfying snap |
| Input focus ring | `--duration-fast` | `--ease-out` | |
| Dropdown open | `--duration-normal` | `--ease-out` | Scale + fade |
| Dropdown close | `--duration-fast` | `--ease-in` | Faster exit |
| Modal open | `--duration-normal` | `--ease-out` | Scale 0.95→1 + fade |
| Modal close | `--duration-fast` | `--ease-in` | |
| Toast enter | `--duration-normal` | `--ease-out` | Slide from right |
| Toast exit | `--duration-fast` | `--ease-in` | |
| Page section enter | `--duration-slow` | `--ease-out` | Scroll-triggered |
| Stagger children | +50ms per child | `--ease-out` | Max 5 items staggered |
| Skeleton shimmer | 1.5s | `--ease-linear` | Loop |
| Spinner | 0.8s | `--ease-linear` | Loop |
| Progress bar fill | `--duration-slow` | `--ease-out` | |
| Accordion open | `--duration-normal` | `--ease-out` | Height + opacity |
| Tab switch | `--duration-fast` | `--ease-in-out` | |
| Tooltip appear | `--duration-fast` | `--ease-out` | 300ms delay |
| Number counter | `--duration-slow` | `--ease-out` | Count up on enter |

---

## Entrance Patterns

Define ONE entrance pattern per element category and use it everywhere.

### Fade Up (primary entrance — most content)
```css
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```
Use for: cards, content sections, list items, form fields

### Fade In (flat entrance — overlays, backgrounds)
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```
Use for: backdrop overlays, tooltips, subtle reveals

### Scale In (modal/dialog entrance)
```css
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```
Use for: modals, dropdown panels, popovers

### Slide In from Right (drawer/panel entrance)
```css
@keyframes slideInRight {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}
```
Use for: side drawers, notification panels, off-canvas menus

### Slide In from Top (mobile menu, notification)
```css
@keyframes slideInTop {
  from { transform: translateY(-100%); }
  to { transform: translateY(0); }
}
```
Use for: mobile menus, top toasts, banners

---

## Stagger: How to Animate Lists

When multiple elements enter together, stagger them. This creates the sense that they're related but distinct.

```css
/* Parent triggers entrance, children stagger */
.list-item:nth-child(1) { animation-delay: 0ms; }
.list-item:nth-child(2) { animation-delay: 50ms; }
.list-item:nth-child(3) { animation-delay: 100ms; }
.list-item:nth-child(4) { animation-delay: 150ms; }
.list-item:nth-child(5) { animation-delay: 200ms; }
/* Stop staggering after 5 — beyond that it just feels slow */
```

**Rules:**
- Stagger delay: 50ms per item
- Maximum stagger: 5 items (250ms total)
- After 5 items: all remaining enter simultaneously with the 5th group's delay
- Direction: always top-to-bottom or left-to-right (reading direction)

---

## Scroll-Triggered Animation

Use `IntersectionObserver` to trigger entrance animations when elements enter the viewport.

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
      observer.unobserve(entry.target); // Only animate once
    }
  });
}, { threshold: 0.15 }); // Trigger when 15% visible
```

**Rules:**
- Trigger at 15% visibility — not 0% (avoids premature fire)
- Animate once only — don't re-animate on scroll up
- Apply to: section headings, feature cards, testimonials, stats
- Never apply to: navbars, CTAs above fold, content the user typed

---

## Loading & Progress Animation

### Skeleton Shimmer
```css
@keyframes shimmer {
  from { background-position: -200% 0; }
  to { background-position: 200% 0; }
}

.skeleton {
  background: linear-gradient(
    90deg,
    var(--surface) 25%,
    var(--surface-elevated) 50%,
    var(--surface) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s var(--ease-linear) infinite;
}
```

### Spinner
```css
@keyframes spin {
  to { transform: rotate(360deg); }
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid transparent;
  border-top-color: currentColor;
  border-radius: 50%;
  animation: spin 0.8s var(--ease-linear) infinite;
}
```

### Progress Bar
```css
/* Indeterminate */
@keyframes progress-indeterminate {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(400%); }
}

/* Determinate — use JS to set --progress variable */
.progress-bar-fill {
  width: var(--progress, 0%);
  transition: width var(--duration-slow) var(--ease-out);
}
```

---

## Hover Feedback Rules

Every interactive element must have hover feedback. Here's the right type per element:

| Element | Hover Effect | Notes |
|---|---|---|
| Primary button | Darken bg 8% | Not scale, not glow |
| Secondary/outline button | Fill bg lightly | Tint with primary color |
| Ghost/text button | Bg tint | Light primary color at 10% opacity |
| Nav link | Color shift + underline | Or indicator bar |
| Card (clickable) | `translateY(-4px)` + shadow elevation | Not scale |
| Card (non-clickable) | No hover effect | Don't imply clickability |
| Icon button | Bg tint circle | Circular bg at 10% opacity |
| Table row | Bg tint | Same as card tint |
| List item | Bg tint | |
| Image/media | Subtle brightness increase | `filter: brightness(1.05)` |

---

## Micro-Interactions: The Details That Matter

### Toggle Switch
```
Off → On: thumb slides right + bg fills with color (spring easing)
On → Off: thumb slides left + bg drains (spring easing)
Duration: --duration-fast with --ease-spring
```

### Checkbox
```
Unchecked → Checked: check mark draws in (SVG stroke animation)
Checked → Unchecked: check mark erases
Duration: --duration-fast with --ease-spring
```

### Like / Favourite
```
Inactive → Active: icon scales to 1.3 then back to 1 (spring)
Color fills in with scale
Duration: --duration-fast with --ease-spring
```

### Copy to Clipboard Button
```
Default: "Copy" label + copy icon
After click: icon swaps to checkmark, label to "Copied!" (--duration-instant)
After 2s: returns to default (fade)
```

### Form Submit Success
```
Button label fades out
Checkmark fades in + scales up (--ease-spring)
After 1.5s: returns to default or redirects
```

---

## Reduced Motion

This is non-negotiable. Every animation must be wrapped.

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

For scroll-triggered reveals specifically, still show the content — just without animation:
```css
@media (prefers-reduced-motion: reduce) {
  .animate-in,
  [data-animate] {
    opacity: 1 !important;
    transform: none !important;
  }
}
```

---

## The Motion Audit Checklist

Before finishing, verify:

- [ ] All transitions use tokens from this file — no hardcoded `0.3s ease`
- [ ] Entering animations use `--ease-out`
- [ ] Exiting animations use `--ease-in`
- [ ] Stagger stops at 5 items
- [ ] Skeleton shimmer is `1.5s linear` not faster/slower
- [ ] Spinners are `0.8s linear`
- [ ] Hover effects match the table above — no rogue `scale(1.05)` on buttons
- [ ] Micro-interactions on toggle, checkbox, and CTA buttons exist
- [ ] Reduced motion media query is present and wraps all animations
- [ ] The page feels like ONE thing moving, not 10 separate animations
