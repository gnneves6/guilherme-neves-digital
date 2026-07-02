# Guilherme Neves — Digital

Personal website and digital home of Guilherme Neves — applied performance
nutrition for athletes, teams and performance environments. The site tells
the story ("Built from within"), presents the practice (GN Performance
Systems), the applied work archive, the GN Fuel Laws framework and the ways
to start an engagement.

**Live project:** built with [Lovable](https://lovable.dev) (project
`guilherme-neves-digital`) and synced with this repository.

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Cinematic home — hero, manifesto, method, environments, applied work, invitation |
| `/about` | The practice: where sport, science and systems meet |
| `/work` | Curated archive of applied artefacts (public, protected, in development) |
| `/services` | Consulting engagements for clubs and performance departments |
| `/fuel-laws` | The GN Fuel Laws framework |
| `/contact` | Enquiries about engagements |

## Tech stack

- Vite + React 18 + TypeScript
- Tailwind CSS + shadcn/ui (Radix primitives)
- framer-motion for scroll-driven storytelling
- three.js / @react-three/fiber for the WebGL kit showcase (lazy-loaded)
- react-router-dom, TanStack Query, react-helmet-async (SEO)

## Development

```sh
npm install
npm run dev        # dev server on :8080
npm run build      # production build
npm test           # vitest
npm run lint       # eslint
```

## Notes

- Some assets (work previews, portrait, OG image) are referenced through
  Lovable-hosted asset files (`*.asset.json`, served under `/__l5e/assets-v1/`)
  and resolve when the site is deployed through Lovable hosting.
