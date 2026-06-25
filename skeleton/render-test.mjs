/* End-to-end test of the DesignSoul Skeleton runtime.
   Loads the harness in a real browser, renders a skeleton from a captured spec,
   and asserts the blocks are valid and the <ds-skeleton> toggle works. */
import { chromium } from "playwright";
import { mkdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { resolve, extname } from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "node:http";

const HERE = resolve(fileURLToPath(import.meta.url), "..");
const OUT = resolve(HERE, "examples/artifacts");
mkdirSync(OUT, { recursive: true });

// --- tiny static server (ES modules can't load over file:// in Chromium) ---
const MIME = { ".js": "text/javascript", ".mjs": "text/javascript", ".json": "application/json",
  ".css": "text/css", ".html": "text/html", ".png": "image/png" };
const server = createServer((req, res) => {
  let p = resolve(HERE, "." + decodeURIComponent(req.url.split("?")[0]));
  if (existsSync(p) && statSync(p).isFile()) {
    res.setHeader("Content-Type", MIME[extname(p)] || "application/octet-stream");
    res.end(readFileSync(p));
  } else { res.statusCode = 404; res.end("not found"); }
});
await new Promise((r) => server.listen(0, r));
const PORT = server.address().port;
const BASE = `http://localhost:${PORT}`;

let failures = [];
const ok = (cond, msg) => { if (!cond) failures.push(msg); };

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 460, height: 900 } });
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });

await page.goto(`${BASE}/examples/_harness.html`, { waitUntil: "networkidle" });
await page.waitForFunction(() => window.__ready === true, null, { timeout: 8000 });

const t = await page.evaluate(() => window.__skelTest);

ok(errors.length === 0, `runtime threw errors: ${errors.join("; ")}`);
ok(t.registered, "spec was not registered in the runtime registry");
ok(t.renderedBlocks === t.specBlocks,
   `rendered ${t.renderedBlocks} blocks but spec has ${t.specBlocks}`);
ok(t.renderedBlocks >= 8, `expected a rich skeleton (>=8 blocks), got ${t.renderedBlocks}`);

// Every block must sit inside the container bounds
for (const [i, b] of t.blockGeom.entries()) {
  ok(b.left >= -0.5 && b.left + b.width <= 100.5,
     `block ${i} horizontally out of bounds (left=${b.left} w=${b.width})`);
  ok(b.top >= 0 && b.top + b.height <= t.containerHeight + 1,
     `block ${i} vertically out of bounds (top=${b.top} h=${b.height} container=${t.containerHeight})`);
}

// Web component: shows skeleton while loading, reveals content when loading removed
const wcSkeletonVisible = await page.evaluate(() =>
  document.querySelector("#wc .ds-skeleton") !== null
);
ok(wcSkeletonVisible, "<ds-skeleton loading> did not render a skeleton");

await page.screenshot({ path: resolve(OUT, "skeleton-loading.png"), fullPage: true });

await page.evaluate(() => document.querySelector("#wc").removeAttribute("loading"));
await page.waitForTimeout(500); // allow transition fade
const wcContentVisible = await page.evaluate(() => {
  const real = document.querySelector("#wc .real");
  return real && getComputedStyle(real).display !== "none";
});
ok(wcContentVisible, "<ds-skeleton> did not reveal real content after loading ended");
await page.screenshot({ path: resolve(OUT, "skeleton-loaded.png"), fullPage: true });

await browser.close();
server.close();

console.log(`Spec blocks: ${t.specBlocks} · rendered: ${t.renderedBlocks} · container height: ${t.containerHeight}px`);
console.log(`Screenshots → skeleton/examples/artifacts/`);
if (failures.length) {
  console.log(`\n❌ ${failures.length} failure(s):`);
  for (const f of failures) console.log("  - " + f);
  process.exit(1);
} else {
  console.log("✅ Skeleton runtime works: spec captured from real UI, registered, rendered in-bounds,");
  console.log("   and <ds-skeleton> toggles between skeleton and real content.");
}
