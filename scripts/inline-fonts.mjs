// Regenerates the data-URI @font-face CSS that vite.artifact.config.ts splices
// into src/index.css when building the single-file preview.
//
// It lives here because it kept being written straight into a scratchpad, and a
// scratchpad does not survive the container being reclaimed - which is exactly
// how the preview build broke, with a config pointing confidently at a file
// that no longer existed.
//
//   node scripts/inline-fonts.mjs > /dev/null   (writes fonts-inline.css)
//
// Point INLINE_FONTS_CSS at the result, or leave the config's default path.
import fs from "node:fs";
const URL_ = "https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap";
// Ask for the latin subset only, as a modern browser would, to keep it small.
const css = await (await fetch(URL_, { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36" } })).text();
const urls = [...new Set([...css.matchAll(/url\((https:\/\/fonts\.gstatic\.com[^)]+)\)/g)].map(m => m[1]))];
console.error("faces:", urls.length);
const map = new Map();
for (const u of urls) {
  const buf = Buffer.from(await (await fetch(u)).arrayBuffer());
  map.set(u, `data:font/woff2;base64,${buf.toString("base64")}`);
}
// Keep only latin / latin-ext blocks; drop the rest to keep the artifact small.
const blocks = css.split("@font-face").slice(1).map(b => "@font-face" + b);
const keep = blocks.filter(b => /unicode-range:[^;]*U\+0000/.test(b) || /\/\* latin/.test(b));
let out = (keep.length ? keep : blocks).join("\n");
for (const [u, d] of map) out = out.split(u).join(d);
fs.writeFileSync("fonts-inline.css", out);
console.error("bytes:", out.length);
