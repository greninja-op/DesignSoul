#!/usr/bin/env node
/* ============================================================================
   designsoul-skeleton — capture skeleton specs from your real rendered UI.

   Usage:
     npx designsoul-skeleton <url|file> [--out DIR] [--breakpoints 375,768,1280] [--wait 600]

   Mark components in your UI:
     <div data-skeleton="profile-card"> ...real content... </div>
       data-skeleton-leaf    → treat element as one atomic block (no recursion)
       data-skeleton-ignore  → skip element and its subtree

   Requires Playwright (optional peer dependency):
     npm i -D playwright && npx playwright install chromium
   ============================================================================ */
import { writeFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const args = process.argv.slice(2);
if (args.includes("--help") || args.includes("-h") || args.length === 0) {
  console.log("Usage: designsoul-skeleton <url|file> [--out DIR] [--breakpoints 375,768,1280] [--wait 600]");
  process.exit(args.length === 0 ? 1 : 0);
}

const positional = args.filter((a) => !a.startsWith("--"));
const flag = (name, def) => {
  const i = args.indexOf("--" + name);
  return i !== -1 && args[i + 1] && !args[i + 1].startsWith("--") ? args[i + 1] : def;
};

// Lazy-load Playwright so installing the package never forces a browser download.
let chromium;
try {
  ({ chromium } = await import("playwright"));
} catch {
  console.error(
    "\n✗ Playwright is required to capture skeletons but isn't installed.\n" +
    "  Install it once:\n    npm i -D playwright && npx playwright install chromium\n"
  );
  process.exit(1);
}

const target = positional[0];
const url = /^https?:\/\//.test(target) ? target : pathToFileURL(resolve(target)).href;
const outDir = resolve(flag("out", "./"));
const breakpoints = flag("breakpoints", "375,768,1280").split(",").map((n) => parseInt(n, 10));
const wait = parseInt(flag("wait", "500"), 10);
mkdirSync(outDir, { recursive: true });

const EXTRACTOR = () => {
  const results = {};
  document.querySelectorAll("[data-skeleton]").forEach((container) => {
    const name = container.getAttribute("data-skeleton");
    const cRect = container.getBoundingClientRect();
    if (cRect.width === 0 || cRect.height === 0) return;
    const blocks = [];

    const isLeafCandidate = (el) => {
      const tag = el.tagName.toLowerCase();
      if (["img", "svg", "input", "textarea", "select", "video", "canvas", "hr"].includes(tag)) return true;
      return Array.from(el.children).length === 0;
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
        if (child.hasAttribute("data-skeleton-leaf") || isLeafCandidate(child)) pushBlock(child);
        else walk(child);
      }
    };
    walk(container);
    results[name] = { name, width: Math.round(cRect.width), height: Math.round(cRect.height), blocks };
  });
  return results;
};

const browser = await chromium.launch();
const captured = {};
for (const bp of breakpoints) {
  const page = await browser.newPage({ viewport: { width: bp, height: 900 } });
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(wait);
  const perName = await page.evaluate(EXTRACTOR);
  for (const [name, data] of Object.entries(perName)) {
    captured[name] = captured[name] || { name, breakpoints: {} };
    captured[name].breakpoints[String(bp)] = data;
  }
  await page.close();
}
await browser.close();

const names = Object.keys(captured);
if (names.length === 0) {
  console.error('No elements with data-skeleton found. Add data-skeleton="name" to a container.');
  process.exit(1);
}

const written = [];
for (const name of names) {
  writeFileSync(resolve(outDir, `${name}.skeleton.json`), JSON.stringify(captured[name], null, 2) + "\n");
  const first = captured[name].breakpoints[String(breakpoints[0])];
  written.push(`${name} (${Object.keys(captured[name].breakpoints).length} breakpoints, ${first.blocks.length} blocks)`);
}

const importLines = names.map((n, i) => `import s${i} from './${n}.skeleton.json' with { type: 'json' };`);
const mapLines = names.map((n, i) => `  ${JSON.stringify(n)}: s${i},`);
writeFileSync(
  resolve(outDir, "registry.js"),
`// Auto-generated by designsoul-skeleton — do not edit.
import { registerSkeletons } from 'designsoul-skeleton';
${importLines.join("\n")}

registerSkeletons({
${mapLines.join("\n")}
});
`
);

console.log(`✅ Captured ${names.length} skeleton(s) → ${outDir}`);
for (const w of written) console.log("   - " + w);
console.log("   - registry.js");
