# Working in this repository

## Read first

- `docs/decisions.md` — the rules the site is built to, and every reversal with
  its reasoning. Read before changing copy, structure or navigation, so
  decisions already made are not quietly re-made.
- `docs/strategy.md` — what is being built and why we think it works: the
  position, the niche, the differentiator, the community mechanic, the pricing
  architecture, what is missing, and the next step.

## This repository is public

`gnneves6/guilherme-neves-digital` is public. Personal, financial and family
material must never arrive here, in the site, in the docs, or in a commit
message.

`gnneves6/gui-os` is Guilherme's private thinking. When a session has both
repositories attached, `gui-os` may inform decisions — principles, structure,
features — but nothing from it is copied here. If something from it deserves
recording, write it in your own words in `docs/`, without the personal material
behind it.

Never use or store his credentials. He has shared a password in a session
before; the correct response was to refuse to use it and tell him to change it.

## Branch

Work on `claude/guilherme-neves-digital-6rrw2v`. Merge to `main` only when he
says it is polished. Deployment runs from `main`.

## The preview he actually looks at

He previews through a published Artifact, not through the file:

    https://claude.ai/code/artifact/54688270-83ff-4865-8351-ddedc21b6904

**Republish to that URL** (pass it as `url`) after any visible change. Pushing
to the branch does not update it, and publishing without the URL creates a
second artifact instead of updating this one. He has already been shown a
week-old preview once because of this.

Building it:

    node scripts/inline-fonts.mjs            # writes fonts-inline.css
    npx vite build --config vite.artifact.config.ts
    node scripts/to-fragment.cjs             # writes gn-site-preview.html

`vite.artifact.config.ts` looks for `fonts-inline.css` at the path in
`INLINE_FONTS_CSS`, defaulting to the session scratchpad. The scratchpad does
not survive the container being reclaimed, which is why the generator is a
script rather than a sentence.

## The preview iframe has no scroll

The artifact is sized to its content, so inner `scrollY` stays 0 and `100svh`
resolves to the full document height. **Anything scroll-driven is structurally
invisible there.** This has caused him to report, correctly, that a change made
no difference. Effects that must be visible in the preview have to be driven by
pointer, click or time, not by scroll.

## Verify visual work by rendering it

Chromium is at `/opt/pw-browsers/chromium`; drive it with
`node_modules/playwright-core/index.mjs`. Arithmetic about crops, contrast or
layout is not evidence — render it at the real geometry and look.

One trap: reading the DOM and then screenshotting is racy when something is on
a timer, and the two will disagree. Build a static harness at the real size
instead of chasing a live animation.

## Routing

`BrowserRouter` in production, `HashRouter` in the artifact build
(`VITE_ARTIFACT === "1"`). Never rewrite the address with
`window.history.replaceState` — under `HashRouter` it deletes the route and
wipes react-router's state index, which is what produced a 404 on the back
button. Use `navigate(..., { replace: true })`.

## Stack

Vite + React 18 + TypeScript + Tailwind + shadcn/ui + framer-motion, with GSAP
(ScrollTrigger, SplitText, CustomEase) and Lenis smooth scroll. Lenis is
destroyed and rebuilt on route change, and a fresh instance still holds the
previous page's dimensions — see `src/components/ScrollToTop.tsx` for why
anchor scrolling has to confirm it landed.

Supabase holds `contact_messages`, `resource_interest` and `page_views`. The
RLS pattern is validated-insert for anon, SELECT denied.

## Style

Match the surrounding code. Comments in this codebase explain **why**, usually
by naming the thing that went wrong and the measurement that proved it — not
what the line does. Commit messages follow the same rule.
