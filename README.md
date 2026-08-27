# Guilherme Neves

Personal site of Guilherme Neves: applied performance nutrition for athletes,
teams and performance environments, learned inside elite professional football.

**Before changing anything, read [`docs/decisions.md`](docs/decisions.md).** It
records the rules this site is built to and why, so decisions already made are
not quietly re-made. It also lists the checks that must pass before merging.

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Who he is, where he has been, the argument, what you can have, the invitation |
| `/work` | The archive, walked as three environments: Anderlecht, Leça, independent |
| `/services` | Three engagements, and the audiences they are for |
| `/fuel-laws` | The five fuel laws, with the work that proves each one |
| `/about` | The person, and why this work |
| `/contact` | Enquiries, read and answered personally |

## Tech stack

- Vite + React 18 + TypeScript
- Tailwind CSS + shadcn/ui (Radix primitives)
- framer-motion, GSAP with ScrollTrigger and SplitText, Lenis for smooth scroll
- three.js / @react-three/fiber for the WebGL kit showcase (lazy-loaded)
- react-router-dom, TanStack Query, react-helmet-async (SEO)
- Supabase for contact and resource-interest capture

## Development

```sh
npm install
npm run dev        # dev server on :8080
npm run build      # production build
npm test           # vitest
npm run lint       # eslint
```

## Content lives in data, not in components

Most of what the site says comes from a handful of files. Editing these is
usually the right change; editing a page component usually is not.

| File | Holds |
| --- | --- |
| `src/data/artefacts.ts` | Every piece of work, its status and its preview |
| `src/data/work-graph.ts` | Which environment, topic and law each piece belongs to |
| `src/data/experiences.ts` | The three environments, their scope and their proofs |
| `src/data/audiences.ts` | Who arrives, and what each of them gets |
| `src/data/fuel-laws.json` | The five laws, and the printed card generated from them |
| `src/index.css` | The whole palette, as HSL tokens |

The graph is the reason a new piece of work appears in several places at once.
Adding an entry to `work-graph.ts` puts it in its environment chapter, in the
laws it proves, and in the counts, without touching a page.

## Scripts

```sh
node scripts/generate-reference-card.mjs   # rebuild the printable fuel laws card
npx vite build --config vite.artifact.config.ts && node scripts/to-fragment.cjs
```

The second pair builds the single-file preview used to share work in progress.

## Notes

- Some assets are referenced through hosted asset files (`*.asset.json`) left
  over from the original scaffold and resolve only on that host. Anything added
  since is a real file under `src/assets`.
