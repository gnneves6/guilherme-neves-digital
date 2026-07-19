// Build config for the self-contained claude.ai artifact preview.
// Produces ONE index.html with every script, style, font and image inlined,
// because the artifact sandbox blocks all external requests.
// Usage: npx vite build --config vite.artifact.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { viteSingleFile } from "vite-plugin-singlefile";
import path from "path";
import fs from "fs";

// CSS with the site's Google Fonts embedded as data URIs. Generate it with
// any tool that downloads the woff2 files referenced by the fonts.googleapis
// stylesheet and swaps the URLs for base64 data URIs, then point this at it.
const inlineFontsPath =
  process.env.INLINE_FONTS_CSS ??
  "/tmp/claude-0/-home-user-guilherme-neves-digital/844446b3-26fe-5897-aa1f-c6cf76b65abf/scratchpad/fonts-inline.css";

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
  },
  build: {
    outDir: "dist-artifact",
    assetsInlineLimit: 100_000_000,
    chunkSizeWarningLimit: 100_000,
    cssCodeSplit: false,
    rollupOptions: {
      output: { inlineDynamicImports: true },
    },
  },
});
