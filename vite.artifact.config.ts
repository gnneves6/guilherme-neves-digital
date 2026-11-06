// Build config for the self-contained claude.ai artifact preview.
// Produces ONE index.html with every script, style, font and image inlined,
// because the artifact sandbox blocks all external requests.
// Usage: npx vite build --config vite.artifact.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { viteSingleFile } from "vite-plugin-singlefile";
import path from "path";

// As fontes deixaram de vir do Google e passaram a viver em
// src/assets/fonts. O @font-face aponta para ficheiros locais e o
// assetsInlineLimit aqui em baixo transforma-os em data URIs sozinho, por
// isso o passo que descarregava e embutia o CSS do Google desapareceu: era
// um gerador que escrevia para a scratchpad, e a scratchpad morre com o
// contentor, o que já partiu esta build uma vez.

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
