#!/usr/bin/env node
/* ============================================================================
   DesignSoul Skeleton Generator

   Captures pixel-accurate skeleton specs from your REAL rendered UI — no manual
   measuring, no hand-tuned placeholders. Opens your app (or an HTML file) in a
   headless browser, finds every element marked `data-skeleton="<name>"`, walks
   its layout, and writes `<name>.skeleton.json` at several breakpoints.

   Usage:
     node skeleton-gen.mjs <url|file> [--out DIR] [--breakpoints 375,768,1280] [--wait 600]

   Markup in your UI:
     <div data-skeleton="profile-card"> ...real content... </div>
       data-skeleton-leaf    → treat this element as one atomic block (no recursion)
       data-skeleton-ignore  → skip this element and its subtree

   Output spec block format: { x:%, y:px, w:%, h:px, r:px, c?:true }
     x,w are % of the container width (responsive); y,h are px; r is corner radius.
   ============================================================================ */
import { chromium } from "playwright";
import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const args = process.argv.slice(2);
const positional = args.filter((a) => !a.startsWith("--"));
const flag = (name, def) => {
  const i = args.indexOf("--" + name);
  return i !== -1 && args[i + 1] && !args[i + 1].startsWith("--") ? args[i + 1] : def;
};

let target = positional[0];
if (!target) {
  console.error("Provide a URL or HTML file path. e.g. node skeleton-gen.mjs ./examples/source.html");
  process.exit(1);
}
const url = /^https?:\/\//.test(target) ? target : pathToFileURL(resolve(target)).href;
const outDir = resolve(flag("out", "./"));
const breakpoints = flag("breakpoints", "375,768,1280").split(",").map((n) => parseInt(n, 10));
const wait = parseInt(flag("wait", "500"), 10);

mkdirSync(outDir, { recursive: true });

// This function runs in the browser: walk a [data-skeleton] container into blocks.
const EXTRACTOR = (rootName) => {
  const results = {};
  const containers = document.querySelectorAll("[data-skeleton]");
  containers.forEach((container) => {
    const name = container.getAttribute("data-skeleton");
    const cRect = container.getBoundingClientRect();
    if (cRect.width === 0 || cRect.height === 0) return;
    const blocks = [];

    const isLeafCandidate = (el) => {
      const tag = el.tagName.toLowerCase();
      if (["img", "svg", "input", "textarea", "select", "video", "canvas", "hr"].includes(tag)) return true;
      // element with no element children but with visible text/size
      const hasElementChildren = Array.from(el.children).length > 0;
      return !hasElementChildren;
    };

    const visible = (el) => {
      const cs = getComputedStyle(el);
      if (cs.display === "none" || cs.visibility === "hidden" || parseFloat(cs.opacity) === 0) return false;
      const r = el.getBoundingClientRect();
      return r.width > 1 && r.height > 1;
    };

    const pushBlock = (el) => {
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      let radius = parseFloat(cs.borderTopLeftRadius) || 0;
      // text leaves get a small pill radius for a softer skeleton
      const tag = el.tagName.toLowerCase();
      const looksTextual = !["img", "svg", "input", "textarea", "select", "video", "canvas"].includes(tag)
        && (el.textContent || "").trim().length > 0;
      if (looksTextual && radius < 4) radius = 4;
      blocks.push({
        x: +(((r.left - cRect.left) / cRect.width) * 100).toFixed(3),
        y: Math.round(r.top - cRect.top),
        w: +((r.width / cRect.width) * 100).toFixed(3),
        h: Math.round(r.height),
        r: Math.round(radius),
      });
    };

    const walk = (el) => {
      for (const child of Array.from(el.children)) {
        if (child.hasAttribute("data-skeleton-ignore")) continue;
        if (!visible(child)) continue;
        if (child.hasAttribute("data-skeleton-leaf") || isLeafCandidate(child)) {
          pushBlock(child);
        } else {
          walk(child);
        }
      }
    };

    walk(container);
    results[name] = {
      name,
      width: Math.round(cRect.width),
      height: Math.round(cRect.height),
      blocks,
    };
  });
  return results;
};

const browser = await chromium.launch();
const captured = {}; // name -> { breakpoints: {} }

for (const bp of breakpoints) {
  const page = await browser.newPage({ viewport: { width: bp, height: 900 } });
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(wait);
  const perName = await page.evaluate(EXTRACTOR);
  for (const [name, data] of Object.entries(perName)) {
    captured[name] = captured[name] || { name, breakpoints: {} };
    captured[name].breakpoints[String(bp)] = {
      name,
      width: data.width,
      height: data.height,
      blocks: data.blocks,
    };
  }
  await page.close();
}
await browser.close();

const names = Object.keys(captured);
if (names.length === 0) {
  console.error("No elements with data-skeleton found. Add data-skeleton=\"name\" to a container.");
  process.exit(1);
}

const written = [];
for (const name of names) {
  const file = resolve(outDir, `${name}.skeleton.json`);
  writeFileSync(file, JSON.stringify(captured[name], null, 2) + "\n");
  written.push(`${name} (${Object.keys(captured[name].breakpoints).length} breakpoints, ${captured[name].breakpoints[String(breakpoints[0])].blocks.length} blocks)`);
}

// (Re)write a registry that imports every spec in the output dir.
const registryPath = resolve(outDir, "registry.js");
const importLines = names.map((n, i) => `import s${i} from './${n}.skeleton.json' assert { type: 'json' };`);
const mapLines = names.map((n, i) => `  ${JSON.stringify(n)}: s${i},`);
const registry =
`// Auto-generated by the DesignSoul Skeleton Generator — do not edit.
import { registerSkeletons } from '../skeleton.js';
${importLines.join("\n")}

registerSkeletons({
${mapLines.join("\n")}
});
`;
writeFileSync(registryPath, registry);

console.log(`✅ Captured ${names.length} skeleton(s) → ${outDir}`);
for (const w of written) console.log("   - " + w);
console.log("   - registry.js");
