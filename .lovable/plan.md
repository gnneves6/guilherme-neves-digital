
# UX & Information Architecture Refinement — Plan Only

Goal: make the site feel less like a beautiful archive and more like a strategic launch hub. Reduce, connect, group. Keep the editorial calm.

---

## A) What currently feels too long, text-heavy, or too spaced

- **Pre-value distance**: visitor hits Hero → Manifesto → Identity → Environments before seeing a single concrete artefact. That's ~3 long scrolls of philosophy before proof.
- **Manifesto + Identity + Collaboration Areas** repeat the "rooted in football, applied broadly" idea three times in different words.
- **Dividers + section-padding** create luxurious whitespace, but on a 922px viewport it reads as slow.
- **Artefact cards** show title + type + description + "Proves" line + status + CTA — too many text layers competing.
- **/work filters**: many flat filter chips (type/status/access) without visual grouping → marketplace feel.
- **EnvironmentsSection** mannequin metaphor is poetic but doesn't communicate role/period/output.
- **CollaborationAreasSection** is pure prose — no link out to proof.

---

## B) Sections to compress or reorder

- Compress: Manifesto (trim to 2 short stanzas), Identity (merge "Athlete by nature" line into Hero micro-line, drop the standalone section OR shrink to a single editorial quote band).
- Move "Proves" copy off cards → into modal.
- Reduce Divider frequency; let section background tone do the separating.
- Keep Fuel Laws Preview small — it's already a good rhythm break.

---

## C) Recommended homepage order

```
1. Hero ("Built from within.")
2. Selected Artefacts (6)              ← surface concrete value early
3. Manifesto (compressed, 2 stanzas)
4. Selected Environments (rebuilt, see H)
5. System Components (Operating System)
6. Collaboration Areas (with links to work, see G)
7. Fuel Laws Preview
8. Invitation
```

Removed/folded: standalone Identity section → its line lives in Hero + a quiet quote inside Manifesto.

Rationale: proof at scroll 2, story at scroll 3, depth after. Story still wins, but value is visible immediately.

---

## D) Resource Vault grouping (/work)

Replace flat filters with **4 named groups + All**:

1. **Public Resources** — ABC, education guides, mini-classes
2. **Practical Systems** — MD-1, Equivalent Bank, Atlas, frameworks
3. **Tools & Product Lab** — Matchday Fuel, FuelOps AI, in-development tools
4. **Protected Casework** — Team Monitoring Report, anonymised proofs

Layout options (recommend **Option B**):
- A) Single grid + 5 filter chips (All + 4 groups)
- **B) Grouped sections**: each group has its own heading, short one-liner, and a 2–4 card row. "All" view collapses to one filtered grid. ← clearest, most premium, least marketplace.

Drop secondary filters (status, access). Show status only as a small chip on the card itself.

---

## E) Filter / chip / color logic

One **group chip** + one **status chip** per card. That's it.

Group color tokens (add to `index.css`, all derived from existing olive/ivory palette — muted, no neon):

| Group | Token suggestion | Feel |
|---|---|---|
| Public Resources | `--group-public` — soft ivory/sand | open, educational |
| Practical Systems | `--group-systems` — deep olive | applied, structural |
| Tools & Product Lab | `--group-tools` — warm graphite + thin accent | technical, alive |
| Protected Casework | `--group-protected` — charcoal + lock glyph | discreet, serious |
| Product Direction (FuelOps) | `--group-product` — olive→graphite gradient hairline | forward-facing |

Status chip (orthogonal): `Public` · `Protected` · `In Development` · `Early Access` — outline style, neutral foreground, never colored loud.

Legend: one quiet line above the grid, not a panel.

---

## F) Card simplification

Current card layers → target:

```
[ preview visual                    ]
[ group-chip       status-chip      ]
[ Title (display font)              ]
[ One-line description              ]
[ CTA (text link with arrow)        ]
```

Move into modal: "Proves", long description, methodology notes, related links.
Hover: subtle lift + reveal CTA underline. No extra text on hover.

---

## G) Collaboration Areas → linked to work

Each area gets one quiet inline link (text + arrow, no button). Mapping:

| Area | Links to |
|---|---|
| Performance Nutrition Systems Review | /work#protected-casework → Team Monitoring Report |
| Education & Behaviour Change | /work#public-resources → ABC, guides |
| Applied Frameworks for Teams & Athletes | /work#practical-systems → Atlas, Equivalent Bank, MD-1 |
| Monitoring, Reporting & Practical Tools | /work#tools-product-lab → Matchday Fuel, FuelOps |

CTA copy: `See related work →` (one variant, consistent). No "Request access" here — that lives in modals.

---

## H) Selected Environments — replace mannequin

Recommended: **editorial environment cards in a 2-column staggered list** (not timeline, not logo strip).

Each card:
- Role (e.g. "Performance Nutritionist")
- Period (e.g. "2022 – 2024")
- Context (1 line: setting/level, no club name if sensitive)
- Contribution (2–3 short bullets: what I built/delivered)
- Selected outputs (link chip → an artefact in the Vault, when safe)

Avoid: club-result claims, logos unless cleared, mannequin metaphor.
Keep: muted dividers, generous type, no images required to ship.

Mannequin component can be retired or moved to About as a single quiet visual.

---

## I) Atlas preview strategy (future, not now)

Keep current placeholder. When assets arrive, target preview structure:

```
[ atlas-cover.jpg — full bleed left ]
[ atlas-sample-01.jpg — one readable spread, right ]
[ atlas-blurred-spread.jpg — locked, with lock glyph ]
[ Status: In Development · Premium Resource ]
[ CTA: Join Early Access  →  (writes to resource_interest) ]
```

Rules: no full PDF, no public download, no payment, no price. One CTA only.

---

## J) Real assets to prepare next

Priority order:

1. `atlas-cover.jpg` (1600×2000, portrait, print-grade)
2. `atlas-sample-01.jpg` (one spread, readable)
3. `atlas-blurred-spread.jpg` (the same spread or another, blurred)
4. `matchday-fuel-ui.jpg` (tool mockup or screen)
5. `team-monitoring-anon.jpg` (anonymised chart/report visual)
6. `fuelops-teaser.jpg` (product system teaser, abstract OK)
7. Optional: `atlas-mobile-preview.jpg`, environment context photos (non-club)

All ≤ 400KB, JPG, sRGB.

---

## K) Files / components I would edit (if approved)

- `src/pages/Index.tsx` — reorder sections, drop one Divider, possibly remove `IdentitySection`.
- `src/components/sections/HeroSection.tsx` — absorb the "Athlete by nature…" micro-line (already there).
- `src/components/sections/ManifestoSection.tsx` — trim copy; optional inline quote from Identity.
- `src/components/sections/IdentitySection.tsx` — likely retire (or shrink to a quote band).
- `src/components/sections/EnvironmentsSection.tsx` — replace mannequin with editorial cards.
- `src/components/sections/CollaborationAreasSection.tsx` — add one `See related work →` link per area, mapped to /work anchors.
- `src/components/sections/SelectedArtefactsSection.tsx` — simplify card (remove "Proves" from face, keep status chip, add group chip).
- `src/pages/Work.tsx` — switch from flat filters to grouped sections + 5-chip filter (All + 4 groups), add anchor IDs.
- `src/data/artefacts.ts` — add `group` field ("public" | "systems" | "tools" | "protected" | "product") to each artefact.
- `src/index.css` — add `--group-*` tokens (HSL, derived from existing palette).
- `src/components/resource/ResourceModal.tsx` — surface the "Proves" copy and long description here.
- `src/components/MannequinTorso.tsx` — retire or move to About.

No DB, auth, payments, email, Shopify, or connector changes. ABC lightbox untouched. All form flows untouched.

---

## L) Minimal safe implementation plan (when approved)

Three small passes, each independently shippable:

**Pass 1 — IA & rhythm (low risk)**
- Reorder `Index.tsx`, retire/shrink Identity, trim Manifesto.
- Add anchor IDs in `/work` (no logic change yet).
- Add `See related work →` links in Collaboration Areas.

**Pass 2 — Card & Vault simplification (medium risk)**
- Add `group` field to artefacts.
- Add `--group-*` tokens.
- Simplify card face (move "Proves" into modal).
- Convert /work filters to All + 4 group chips, render as grouped sections.

**Pass 3 — Environments rebuild (medium risk, content-dependent)**
- Replace mannequin with editorial environment cards using existing copy I already have approved.
- Retire `MannequinTorso` from homepage; keep file for possible About reuse.

Atlas preview waits for assets — no code in this sprint.

---

## Risks & tradeoffs

- Removing Identity loses one "soul" beat — mitigate by keeping the micro-line in Hero and a single quote in Manifesto.
- Grouped Vault sections are longer than a single filtered grid — mitigate with tight 2–4 cards per group on first paint.
- Adding a `group` field touches every artefact entry — mechanical, but must be complete or filters break.
- Retiring the mannequin is a strong identity change — confirm before Pass 3.

Awaiting your approval (and which of the 3 passes to start with) before any code changes.
