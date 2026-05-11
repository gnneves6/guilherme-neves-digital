
# Strategic Refinement Plan — Identity, Hero & Curated Vault

This is a positioning + curation pass only. No backend, no DB, no lightbox, no auth, no payments, no domain/email work. Existing systems stay intact.

---

## 1. Recommended final hero copy

**Eyebrow**
`Guilherme Neves — Applied Performance Nutrition`

**Headline (H1)**
`Build from within.`

Short, memorable, ownable. It becomes the brand signature *and* the H1. Functional clarity is moved into the subheadline, where it belongs.

**Subheadline**
`Applied performance nutrition systems for athletes, teams and performance environments — rooted in football, built for real-world use.`

**Supporting micro-line (optional, under subheadline, smaller)**
`Athlete by nature. Nutritionist by purpose.`
Used as a quiet identity stamp, not as a CTA.

**CTAs (unchanged)**
- Primary: `Explore the Resource Vault` → `/work`
- Secondary: `Start a Conversation` → `/contact`

## 2. "Build from within." — headline or signature?

Use it as **both, but anchored as the H1**.
- It is short enough to function as the memorable signature line everywhere (footer, OG image, social).
- The subheadline carries the functional "what this is" message, so the H1 doesn't need to.
- This avoids the current problem where the H1 reads like a tagline + descriptor stitched together.

## 3. Balancing broader positioning with football specificity

Three rules:
1. **Top-level brand language = broad.** Hero, manifesto headline, meta tags, footer use *Applied Performance Nutrition & Sport Systems / athletes, teams and performance environments*.
2. **Proof layer = football.** Environments section, artefact descriptions, case copy stay football-led — that's the credibility.
3. **Bridge sentence everywhere there's risk of feeling football-only:** *"Rooted in football. Built for any high-performance environment."*

This keeps the brand expandable to other sports, federations, and FuelOps AI without diluting the proof.

## 4. Recommended homepage section order

Minimal change from current — only one rename and one tone shift:

```
1. Hero                          (new copy)
2. Manifesto                     (light copy tune to broaden language)
3. Identity                      (unchanged)
4. Selected Environments         (unchanged — football-led proof)
5. System Components             (unchanged)
6. Collaboration Areas           (kept, retoned — see §5)
7. GN Fuel Laws Preview          (unchanged)
8. Selected Artefacts (curated)  (reduced to 6, see §6)
9. Invitation                    (unchanged)
```

No reshuffle, no new sections, no removal — protects velocity and credits.

## 5. Collaboration Areas — own component or embedded?

**Keep as its own component**, but retone it so it reads as *engagement areas* rather than a services menu.

Specific changes (copy only, no structural change):
- Section eyebrow: `Where I Can Help` → `Areas of Engagement`
- Section H2: keep, but broaden — `Collaboration areas for athletes, teams and performance environments.`
- Reword Area 01 from "Football Nutrition Systems Review" → `Performance Nutrition Systems Review` (football proof remains in the description).
- No prices, no "book", no service-y verbs. Keep the "01–04" numbering.

It stays its own file (`CollaborationAreasSection.tsx`) — embedding it would crowd the page and weaken the premium feel.

## 6. Recommended homepage featured artefacts (set `featured: true`)

Exactly **6 cards**, in this order:

1. The ABC of Football Nutrition  *(public proof, only one with real previews)*
2. MD-1 Fuel System  *(matchday system depth)*
3. Athlete Equivalent Bank  *(applied tool)*
4. Matchday Timeline  *(in-development tool)*
5. FuelOps AI  *(ecosystem gateway)*
6. Individual Athlete Nutrition Orientation  *(one Protected Depth card, blurred — signals casework exists)*

This satisfies "selected proof, protected depth, tools in development" in a single 2×3 grid.

## 7. Artefacts that stay only on `/work` (not featured)

- Supplementation in Elite Football
- Why Players Cramp at 80 Minutes?
- Athlete's Food Pyramid
- Hydration Monitoring Tool
- Matchday Snack Bag Agent
- GN Fuel Laws Playbook
- Private Team Monitoring Report

They remain in `/work` so the vault stays rich, but the homepage stays curated.

## 8. Resources to delay / hide / de-emphasize until real previews exist

No removals. Only de-emphasis:
- Items still using mockup placeholders are **kept off the homepage** (handled by §7).
- `/work` keeps them visible because the variety reinforces ecosystem breadth.
- When you upload real previews for *MD-1*, *Athlete Equivalent Bank*, *Supplementation*, we revisit featuring or swapping.

No artefact should be hidden outright — protected/in-development states are part of the narrative.

## 9. Files to edit if approved

Tight scope, all presentation:

- `src/components/sections/HeroSection.tsx` — new eyebrow, H1 (`Build from within.`), subheadline, optional micro-line.
- `src/components/sections/ManifestoSection.tsx` — small copy tune to broaden language (review only; edit only if narrow).
- `src/components/sections/CollaborationAreasSection.tsx` — eyebrow, H2, Area 01 title.
- `src/data/artefacts.ts` — flip `featured` flags to match §6 / §7. No schema changes, no removals.
- `src/components/Footer.tsx` — add `Build from within.` as the signature line if not already present (check before editing).
- `index.html` — meta `<title>` and description aligned to broader positioning.

**Not touched:** `ResourceModal.tsx`, `ImageLightbox.tsx`, all DB / Supabase code, `Contact.tsx` form logic, `client.ts`, payments, auth, Shopify, connectors, supabase config.

## 10. Risks / tradeoffs

- **Broader positioning could dilute the football-expert signal** if the proof layer isn't kept football-heavy. Mitigated by §3 rule 2.
- **"Build from within." is poetic, not descriptive.** Mitigated by a clear functional subheadline directly beneath it.
- **Reducing featured artefacts to 6** removes some surface area for SEO/discovery on `/`. Mitigated by `/work` carrying the full vault and a strong "Open Resource Vault →" link.
- **Renaming Area 01** loses one explicit "football" mention up high — acceptable given hero subheadline still says "rooted in football".
- **Copy-only changes are cheap on credits**, low regression risk; only HeroSection has motion logic to preserve.

## 11. Minimal implementation plan (after approval)

Single focused build pass, ~5 file edits, no migrations, no new components:

1. Update `HeroSection.tsx` copy (eyebrow, H1, subheadline, micro-line). Keep all motion / parallax untouched.
2. Update `index.html` `<title>` and `<meta name="description">` to the broader positioning.
3. Update `CollaborationAreasSection.tsx` eyebrow, H2, and Area 01 title.
4. Light copy review on `ManifestoSection.tsx` — only edit if it currently reads football-only.
5. In `src/data/artefacts.ts`, set `featured` = true only for the 6 items in §6; everything else `featured: false`. No interface changes.
6. Verify `Footer.tsx` carries `Build from within.` as the signature; add if missing.
7. Quick visual QA on `/`, `/work`, `/contact` at mobile + desktop. No DB/edge work.

Estimated change surface: ~5 files, copy + flags only. No risk to working systems.
