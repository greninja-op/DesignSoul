# Skeleton Loading (DesignSoul's built-in system)

DesignSoul ships its own skeleton system in the `skeleton/` folder. When a design needs a
loading state, **use this — do not hand-write grey boxes and do not pull in an outside
library.** The skeleton is captured from the real component, so it matches the content exactly.

> Rule: every async component gets a skeleton, and that skeleton is produced with the
> DesignSoul skeleton system (`skeleton/skeleton.js` + the generator), never ad-hoc placeholders.

---

## When to use a skeleton (vs. a spinner)

- **Skeleton** → content with layout: cards, lists, tables, profiles, dashboards, feeds.
  The user is waiting for *structured content*; the skeleton previews that structure.
- **Spinner** → a single action with no layout: a button submit, a short inline wait.
- Never show a skeleton that doesn't resemble the real layout — that's the whole point.

---

## The workflow the skill follows

1. **Build the real component first** (using the Component Method). The skeleton is derived
   from it, so it must exist.
2. **Mark it** with `data-skeleton="<name>"` on the component's outer container.
   - Add `data-skeleton-leaf` to elements that should be ONE block (a tag row, a chart).
   - Add `data-skeleton-ignore` to elements that shouldn't appear in the skeleton.
3. **Wrap the load site** with `<ds-skeleton name="<name>" loading="...">`.
4. **Generate the spec** if a browser tool is available (see below). If not, see "No browser" below.
5. **Wire the runtime**: copy `skeleton/skeleton.css` + `skeleton/skeleton.js` into the project,
   import the generated `registry.js` once at app entry.

---

## Generating specs

With a browser tool (Playwright — the same one used by `verification.md`):

```bash
node skeleton/skeleton-gen.mjs <dev-server-url-or-html-file> --out <project>/src/skeletons
```

The generator captures at 375 / 768 / 1280 by default and writes one `.skeleton.json` per
marked component plus a `registry.js`.

### No browser tool available
You can still ship a working skeleton — hand-author a spec from the component's known layout:
- Read the component's structure and approximate each leaf as a block.
- Block format: `{ "x": <%>, "y": <px>, "w": <%>, "h": <px>, "r": <px> }`
  (`x`/`w` are % of container width; `y`/`h` are pixels).
- Provide at least the `375` breakpoint; add `768`/`1280` if the layout changes.
- Tell the user it was hand-authored and can be regenerated precisely with the generator + a browser.

---

## Framework usage

The runtime is a standards-based custom element, so it works everywhere:

- **Plain HTML / any framework:** `<ds-skeleton name="card" loading="true">...</ds-skeleton>`
- **React:** render `<ds-skeleton name="card" loading={isLoading ? "true" : "false"}>{children}</ds-skeleton>`
  (custom elements are valid JSX; pass `loading` as a string attribute).
- **Vue/Svelte/Angular:** bind `loading` to your boolean (`:loading` / `loading={...}`), import
  `skeleton.js` + the registry once.
- **Direct/programmatic:** `renderSkeleton(getSkeleton('card'), { width })` returns a DOM node.

Animation defaults to `pulse`; use `shimmer` for premium feel, `solid` for reduced-motion or
minimal styles. Stagger is capped at 5 steps to obey `motion.md`.

---

## Style alignment

- Skeleton block color should come from the design tokens (a neutral derived from the surface),
  not pure grey — set it via `configureSkeletons({ color, darkColor })` or the `color` attribute.
- Match the skeleton's corner radius to the component's radius scale.
- Shimmer timing is 1.5s linear, consistent with the loading animation in `motion.md`.
- Dark mode uses the `.dark` class convention; verify both themes.

---

## Checklist (loading states)

- [ ] Every async component has a skeleton (not a bare spinner) when it has layout
- [ ] Skeleton generated/derived from the REAL component, matching its structure
- [ ] Block color comes from tokens (not pure `#ccc` grey); radius matches the component
- [ ] Animation is one of pulse/shimmer/solid and respects `prefers-reduced-motion`
- [ ] Skeleton fades to content (`transition`) rather than a hard swap
- [ ] Verified in light AND dark mode
- [ ] If hand-authored (no browser), the user was told it can be regenerated precisely
