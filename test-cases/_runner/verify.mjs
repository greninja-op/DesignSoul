// Live browser verification of the DesignSoul test fixtures.
// Renders each fixture at 3 viewports, captures screenshots, and runs the
// verification.md rubric as programmatic assertions.
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = resolve(fileURLToPath(import.meta.url), "../../..");
const OUT = resolve(ROOT, "test-cases/_runner/artifacts");
mkdirSync(OUT, { recursive: true });

const VIEWPORTS = [
  { name: "mobile", width: 375, height: 720 },
  { name: "tablet", width: 768, height: 900 },
  { name: "desktop", width: 1440, height: 900 },
];

// fixture: { path, expectDefaultBlue } — "before" files are SUPPOSED to trip the anti-pattern
const FIXTURES = [
  { id: "generic-card/before", expectDefaultBlue: true },
  { id: "generic-card/after", expectDefaultBlue: false },
  { id: "upload-dropzone/before", expectDefaultBlue: true },
  { id: "upload-dropzone/after", expectDefaultBlue: false },
];

const DEFAULT_BLUES = ["rgb(59, 130, 246)", "#3b82f6", "rgb(37, 99, 235)", "#2563eb"];
let failures = [];

function fail(ctx, msg) { failures.push(`${ctx}: ${msg}`); }

const browser = await chromium.launch();
for (const fx of FIXTURES) {
  const url = pathToFileURL(resolve(ROOT, "test-cases", fx.id + ".html")).href;

  // ---- per-viewport: overflow + console errors + screenshot ----
  for (const vp of VIEWPORTS) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    const consoleErrors = [];
    page.on("console", (m) => { if (m.type() === "error") consoleErrors.push(m.text()); });
    page.on("pageerror", (e) => consoleErrors.push(String(e)));
    await page.goto(url, { waitUntil: "networkidle" });

    const overflow = await page.evaluate(() =>
      document.documentElement.scrollWidth - document.documentElement.clientWidth
    );
    if (overflow > 1) {
      if (fx.expectDefaultBlue) {
        // 'before' fixtures are intentionally AI-default — detecting their flaws is the point
        console.log(`  • (expected) ${fx.id}@${vp.width}px: AI-default flaw detected — ${overflow}px overflow`);
      } else {
        fail(`${fx.id}@${vp.width}px`, `horizontal overflow of ${overflow}px`);
      }
    }
    if (consoleErrors.length) fail(`${fx.id}@${vp.width}px`, `console errors: ${consoleErrors.join("; ")}`);

    await page.screenshot({ path: resolve(OUT, `${fx.id.replace("/", "__")}__${vp.name}.png`), fullPage: true });
    await page.close();
  }

  // ---- anti-pattern: default-blue presence (checked once at desktop) ----
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(url, { waitUntil: "networkidle" });
  const usesDefaultBlue = await page.evaluate((blues) => {
    const props = ["color", "backgroundColor", "borderColor", "borderTopColor", "outlineColor"];
    for (const el of document.querySelectorAll("*")) {
      const cs = getComputedStyle(el);
      for (const p of props) {
        const v = (cs[p] || "").toLowerCase().replace(/\s+/g, " ");
        if (blues.some((b) => v.includes(b.toLowerCase()))) return true;
      }
    }
    return false;
  }, DEFAULT_BLUES);

  if (fx.expectDefaultBlue && !usesDefaultBlue)
    fail(fx.id, "expected the AI-default blue to be present in 'before' but found none");
  if (!fx.expectDefaultBlue && usesDefaultBlue)
    fail(fx.id, "ANTI-PATTERN: default blue (#3B82F6/#2563EB) found in a DesignSoul output");

  // ---- focus state present on first button (accessibility) ----
  const hasBtn = await page.$("button");
  if (hasBtn && !fx.expectDefaultBlue) {
    const before = await page.evaluate(() => {
      const b = document.querySelector("button");
      const c = getComputedStyle(b);
      return c.boxShadow + "|" + c.outlineStyle + "|" + c.outlineWidth;
    });
    await page.focus("button");
    const after = await page.evaluate(() => {
      const b = document.querySelector("button");
      const c = getComputedStyle(b);
      return c.boxShadow + "|" + c.outlineStyle + "|" + c.outlineWidth;
    });
    if (before === after)
      fail(fx.id, "no visible focus state change on button (:focus-visible)");
  }
  await page.close();
}
await browser.close();

console.log(`\nScreenshots saved to test-cases/_runner/artifacts/ (${FIXTURES.length * VIEWPORTS.length} images)`);
if (failures.length) {
  console.log(`\n❌ ${failures.length} verification failure(s):`);
  for (const f of failures) console.log("  - " + f);
  process.exit(1);
} else {
  console.log("✅ All fixtures passed: no overflow, no console errors, before-files trip the");
  console.log("   default-blue anti-pattern, after-files do NOT, and after-buttons have focus states.");
}
