/* ============================================================================
   DesignSoul Skeletons — runtime (zero dependencies, framework-agnostic)

   Renders a loading skeleton from a layout spec captured from your real UI.
   Use the <ds-skeleton> custom element, or call renderSkeleton() directly.

   A spec looks like:
   {
     "name": "profile-card",
     "breakpoints": {
       "375": { "width": 343, "height": 120, "blocks": [ {x,y,w,h,r}, ... ] },
       "768": { ... }, "1280": { ... }
     }
   }
   - x, w  : percentages of the container width (responsive)
   - y, h  : pixels (fixed vertical rhythm)
   - r     : corner radius in pixels
   ============================================================================ */

const registry = new Map();
const liveElements = new Set();
let globalConfig = {
  color: "rgba(0,0,0,0.08)",
  darkColor: "rgba(255,255,255,0.07)",
  shimmerColor: "rgba(255,255,255,0.55)",
  animate: "pulse", // 'pulse' | 'shimmer' | 'solid'
  stagger: 0, // ms between blocks (0 = off)
  transition: 0, // ms fade when loading ends (0 = off)
};

/** Register one or more named specs (typically from the generated registry). */
export function registerSkeletons(map) {
  for (const [name, spec] of Object.entries(map)) registry.set(name, spec);
  // Re-sync any live <ds-skeleton> elements that were waiting on a spec.
  liveElements.forEach((el) => el._sync && el._sync());
}

/** Look up a registered spec by name. */
export function getSkeleton(name) {
  return registry.get(name) || null;
}

/** Override global defaults (color, animate, stagger, transition, ...). */
export function configureSkeletons(opts = {}) {
  globalConfig = { ...globalConfig, ...opts };
}

/** Pick the best breakpoint spec for a given width. */
function pickBreakpoint(spec, width) {
  const keys = Object.keys(spec.breakpoints)
    .map(Number)
    .sort((a, b) => a - b);
  if (keys.length === 0) return null;
  // largest breakpoint <= width, else the smallest defined
  let chosen = keys[0];
  for (const k of keys) if (k <= width) chosen = k;
  return spec.breakpoints[String(chosen)];
}

/**
 * Build a skeleton DOM element from a spec.
 * @returns {HTMLElement} the .ds-skeleton container
 */
export function renderSkeleton(spec, options = {}) {
  const cfg = { ...globalConfig, ...options };
  const root = document.createElement("div");
  root.className = "ds-skeleton";
  root.setAttribute("data-animate", cfg.animate);
  root.setAttribute("role", "status");
  root.setAttribute("aria-busy", "true");
  root.setAttribute("aria-label", cfg.label || "Loading");

  root.style.setProperty("--ds-skel-color", cfg.color);
  root.style.setProperty("--ds-skel-color-dark", cfg.darkColor);
  root.style.setProperty("--ds-skel-shimmer", cfg.shimmerColor);
  if (cfg.transition) root.style.setProperty("--ds-skel-transition", cfg.transition + "ms");

  const width = options.width || root.clientWidth || window.innerWidth || 375;
  const bp = pickBreakpoint(spec, width);
  if (!bp) return root;

  root.style.height = bp.height + "px";

  const staggerMs = cfg.stagger === true ? 80 : Number(cfg.stagger) || 0;

  bp.blocks.forEach((b, i) => {
    if (b.c) return; // container background blocks are not rendered
    const el = document.createElement("div");
    el.className = "ds-skel-block";
    el.style.left = b.x + "%";
    el.style.width = b.w + "%";
    el.style.top = b.y + "px";
    el.style.height = b.h + "px";
    el.style.borderRadius = (b.r || 4) + "px";
    if (staggerMs) {
      // cap stagger growth so long lists don't feel slow (DesignSoul motion rule)
      el.style.setProperty("--ds-skel-delay", Math.min(i, 5) * staggerMs + "ms");
    }
    root.appendChild(el);
  });

  return root;
}

/* -------------------------------------------------------------------------
   <ds-skeleton name="..." loading> custom element
   Works in plain HTML, React, Vue, Svelte, Angular — anywhere.
   While `loading` is set, shows the skeleton for `name`; otherwise shows slotted children.
   ------------------------------------------------------------------------- */
class DsSkeleton extends HTMLElement {
  static get observedAttributes() {
    return ["loading", "name", "animate", "color", "dark-color", "stagger", "transition"];
  }
  connectedCallback() { liveElements.add(this); this._sync(); }
  disconnectedCallback() { liveElements.delete(this); }
  attributeChangedCallback() { this._sync(); }

  _isLoading() {
    const v = this.getAttribute("loading");
    return v === "" || v === "true" || v === "1";
  }

  _setContentHidden(hidden) {
    for (const c of Array.from(this.children)) {
      if (c === this._skel) continue;
      c.style.display = hidden ? "none" : "";
    }
  }

  _sync() {
    const name = this.getAttribute("name");
    if (this._isLoading()) {
      this._setContentHidden(true);
      if (!this._skel) {
        const spec = name ? getSkeleton(name) : null;
        if (spec) {
          this._skel = renderSkeleton(spec, {
            animate: this.getAttribute("animate") || undefined,
            color: this.getAttribute("color") || undefined,
            darkColor: this.getAttribute("dark-color") || undefined,
            stagger: this.getAttribute("stagger") || undefined,
            transition: this.getAttribute("transition") || undefined,
            width: this.clientWidth || undefined,
          });
          this.appendChild(this._skel);
        }
      }
    } else {
      if (this._skel) {
        const t = Number(this.getAttribute("transition")) || 0;
        if (t) {
          this._skel.setAttribute("data-leaving", "true");
          const skel = this._skel;
          this._skel = null;
          setTimeout(() => skel.parentNode === this && this.removeChild(skel), t);
        } else {
          this._removeSkeleton();
        }
      }
      this._setContentHidden(false);
    }
  }

  _removeSkeleton() {
    if (this._skel && this._skel.parentNode === this) this.removeChild(this._skel);
    this._skel = null;
  }
}

if (typeof window !== "undefined" && window.customElements && !customElements.get("ds-skeleton")) {
  customElements.define("ds-skeleton", DsSkeleton);
}

export default DsSkeleton;
