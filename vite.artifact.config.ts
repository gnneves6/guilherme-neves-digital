// Build config for the self-contained claude.ai artifact preview.
// Produces ONE index.html with every script, style, font and image inlined,
// because the artifact sandbox blocks all external requests.
// Usage: npx vite build --config vite.artifact.config.ts
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { viteSingleFile } from "vite-plugin-singlefile";
import path from "path";
import fs from "fs";

// CSS with the site's Google Fonts embedded as data URIs. Generate it with
// any tool that downloads the woff2 files referenced by the fonts.googleapis
// stylesheet and swaps the URLs for base64 data URIs, then point this at it.
// The default used to be an absolute path into one session's scratchpad, and
// that directory is gone the moment its container is reclaimed, so the next
// session's build died on a missing file. Resolve it beside this config
// instead, which is where scripts/inline-fonts.mjs writes it.
const inlineFontsPath =
  process.env.INLINE_FONTS_CSS ??
  fileURLToPath(new URL("./fonts-inline.css", import.meta.url));

/**
 * Duas saídas a partir do MESMO código, e a diferença é só a moldura.
 *
 * `ARTIFACT_IFRAME=0` constrói o ficheiro que ele descarrega e abre no
 * browser dele. Aí há scroll a sério, logo o movimento ligado ao scroll
 * corre como no site. Por omissão constrói a pré-visualização do artifact,
 * que vive dentro de uma moldura dimensionada ao conteúdo: lá o scroll
 * interno fica a zero e `100svh` resolve para a altura do documento.
 */
const dentroDaMoldura = process.env.ARTIFACT_IFRAME !== "0";

export default defineConfig({
  plugins: [
    react(),
    {
      // Swap the Google Fonts @import for data-URI @font-face rules.
      name: "inline-google-fonts",
      transform(code, id) {
        if (id.endsWith("src/index.css") && code.includes("fonts.googleapis.com")) {
          const inlined = fs.readFileSync(inlineFontsPath, "utf8");
          return code.replace(/@import url\('https:\/\/fonts\.googleapis\.com[^']*'\);/, inlined);
        }
      },
    },
    viteSingleFile(),
  ],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
  define: {
    "import.meta.env.VITE_ARTIFACT": JSON.stringify("1"),
    "import.meta.env.VITE_IFRAME": JSON.stringify(dentroDaMoldura ? "1" : "0"),
  },
  build: {
    outDir: process.env.ARTIFACT_OUT ?? "dist-artifact",
    assetsInlineLimit: 100_000_000,
    chunkSizeWarningLimit: 100_000,
    cssCodeSplit: false,
    rollupOptions: {
      output: { inlineDynamicImports: true },
    },
  },
});
