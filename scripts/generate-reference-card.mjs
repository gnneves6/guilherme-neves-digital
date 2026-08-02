/**
 * Generates the printable GN Fuel Laws reference card (A4, one page).
 *
 * Reads the framework from src/data/fuel-laws.json, the same file the
 * website renders from, so the card can never drift from the site.
 *
 * Usage:  node scripts/generate-reference-card.mjs
 * Output: public/gn-fuel-laws-reference.pdf
 */
import { chromium } from "playwright-core";
import { readFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const laws = JSON.parse(readFileSync(path.join(root, "src/data/fuel-laws.json"), "utf8"));

const actionsOf = (practical) =>
  practical.split(".").map((s) => s.trim()).filter(Boolean);

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const lawRows = laws
  .map(
    (l) => `
    <section class="law">
      <div class="mark">
        <span class="num" style="color:hsl(${l.color})">${l.number}</span>
        <span class="rule" style="background:hsl(${l.color} / 0.45)"></span>
      </div>
      <div class="body">
        <h2>${esc(l.title)}</h2>
        <p class="tagline">${esc(l.tagline)}</p>
        <ul>
          ${actionsOf(l.practical)
            .map(
              (a) =>
                `<li><span class="dot" style="background:hsl(${l.color})"></span>${esc(a)}.</li>`
            )
            .join("")}
        </ul>
      </div>
    </section>`
  )
  .join("");

const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&display=swap" rel="stylesheet">
<style>
  @page { size: A4; margin: 0; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --ivory: #f9f7f2;
    --charcoal: #22252b;
    --graphite: #4a4f57;
    --hair: #e2ddd2;
  }
  html, body { width: 210mm; height: 297mm; }
  body {
    background: var(--ivory);
    color: var(--charcoal);
    font-family: 'DM Sans', sans-serif;
    padding: 16mm 17mm 12mm;
    display: flex;
    flex-direction: column;
    -webkit-font-smoothing: antialiased;
  }
  .caption {
    font-family: 'Syne', sans-serif;
    font-size: 7pt;
    letter-spacing: 0.34em;
    text-transform: uppercase;
    color: #8a8578;
  }
  header h1 {
    font-family: 'Syne', sans-serif;
    font-size: 30pt;
    font-weight: 700;
    letter-spacing: -0.025em;
    line-height: 1;
    margin-top: 3.5mm;
  }
  header .sub {
    font-size: 9.5pt;
    line-height: 1.5;
    color: var(--graphite);
    max-width: 122mm;
    margin-top: 3.5mm;
  }
  .divider { height: 1px; background: var(--hair); margin: 7mm 0 0; }

  .laws { flex: 1; display: flex; flex-direction: column; justify-content: center; }
  .law { display: grid; grid-template-columns: 22mm 1fr; gap: 6mm; padding: 6.2mm 0; border-bottom: 1px solid var(--hair); }
  .law:last-child { border-bottom: 0; }
  .mark { display: flex; flex-direction: column; align-items: flex-start; }
  .num { font-family: 'Syne', sans-serif; font-size: 21pt; font-weight: 800; line-height: 1; letter-spacing: -0.02em; }
  .rule { display: block; width: 11mm; height: 2px; margin-top: 2.4mm; }
  .body h2 { font-family: 'Syne', sans-serif; font-size: 13pt; font-weight: 600; letter-spacing: -0.015em; line-height: 1.1; }
  .tagline { font-size: 9pt; color: var(--graphite); margin-top: 1.2mm; font-style: italic; }
  ul { list-style: none; margin-top: 3.2mm; display: flex; flex-direction: column; gap: 1.9mm; }
  li { font-size: 8.4pt; line-height: 1.35; color: var(--graphite); display: flex; align-items: baseline; gap: 2.4mm; }
  .dot { width: 3px; height: 3px; border-radius: 50%; flex: 0 0 auto; transform: translateY(-1px); }

  footer { border-top: 1px solid var(--hair); padding-top: 4mm; display: flex; justify-content: space-between; align-items: flex-end; gap: 8mm; }
  footer .who { font-family: 'Syne', sans-serif; font-size: 9.5pt; font-weight: 600; }
  footer .role { font-size: 7.6pt; color: var(--graphite); margin-top: 0.8mm; }
  footer .site { text-align: right; font-size: 7.6pt; color: var(--graphite); line-height: 1.5; }
</style></head>
<body>
  <header>
    <p class="caption">GN Performance Systems &middot; The Operating System</p>
    <h1>GN Fuel Laws</h1>
    <p class="sub">Five principles that turn performance nutrition from information into
    repeatable behaviour, and keep it working long after the advice is forgotten.</p>
  </header>
  <div class="divider"></div>
  <div class="laws">${lawRows}</div>
  <footer>
    <div>
      <p class="who">Guilherme Neves</p>
      <p class="role">Applied Performance Nutrition &middot; Porto &middot; Brussels</p>
    </div>
    <div class="site">
      <div>gnneves6.github.io/guilherme-neves-digital</div>
      <div>Pin it up. Use it weekly.</div>
    </div>
  </footer>
</body></html>`;

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || "/opt/pw-browsers/chromium",
});
const page = await browser.newPage();
await page.setContent(html, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);

mkdirSync(path.join(root, "public"), { recursive: true });
const out = path.join(root, "public/gn-fuel-laws-reference.pdf");
await page.pdf({ path: out, format: "A4", printBackground: true });

// Also capture a PNG so the site can show a real preview of the card.
await page.setViewportSize({ width: 794, height: 1123 });
await page.screenshot({
  path: path.join(root, "src/assets/fuel-laws-reference-preview.png"),
  fullPage: false,
});

await browser.close();
console.log("wrote", out);
