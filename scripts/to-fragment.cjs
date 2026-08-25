/**
 * Turns the single-file artifact build into a body fragment.
 *
 * The Artifact host wraps whatever it is given in its own
 * <!doctype html><head></head><body> skeleton, so shipping a full document
 * nests one page inside another. This lifts the parts that matter, the title,
 * the inlined styles and the inlined bundle, out of the document shell and
 * emits them in the order the browser needs them.
 */
const fs = require("fs");
const path = require("path");

const SRC = path.join(__dirname, "..", "dist-artifact", "index.html");
const OUT = path.join(__dirname, "..", "gn-site-preview.html");

const html = fs.readFileSync(SRC, "utf8");

const pick = (re) => {
  const out = [];
  let m;
  while ((m = re.exec(html)) !== null) out.push(m[0]);
  return out;
};

const title = (html.match(/<title>[\s\S]*?<\/title>/i) || [
  "<title>Guilherme Neves</title>",
])[0];

const styles = pick(/<style[\s\S]*?<\/style>/gi);
const fontLinks = pick(/<link[^>]+fonts\.(?:googleapis|gstatic)\.com[^>]*>/gi);
const scripts = pick(/<script(?![^>]*\btype=["']application\/ld\+json["'])[\s\S]*?<\/script>/gi);

const bodyInner = (html.match(/<body[^>]*>([\s\S]*?)<\/body>/i) || [, ""])[1]
  .replace(/<script(?![^>]*\btype=["']application\/ld\+json["'])[\s\S]*?<\/script>/gi, "")
  .trim();

const fragment = [title, ...fontLinks, ...styles, bodyInner, ...scripts].join("\n");

fs.writeFileSync(OUT, fragment, "utf8");

const kb = (fs.statSync(OUT).size / 1024).toFixed(0);
console.log(`Wrote ${path.relative(process.cwd(), OUT)} (${kb} KB)`);
console.log(`  styles: ${styles.length}  scripts: ${scripts.length}  font links: ${fontLinks.length}`);
