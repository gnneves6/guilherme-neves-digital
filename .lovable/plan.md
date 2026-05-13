Homepage Flow Refinement — Final Approved Plan

Goal:

Recover human story and interactive credibility before showing artefacts, while preserving the existing Selected Environments interaction — horizontal switcher + mannequin — untouched.

The website should feel like:

identity → interactive credibility → meaning → selected proof → method → opportunity

Not:

Hero → projects → archive

And not:

Hero → long philosophy → slow scroll

This pass should implement only the homepage flow refinement and environment copy enrichment. It should not touch backend, forms, modals, lightbox, Resource Vault logic, Atlas assets, payments, auth, email/domain, or connectors.

---

A) Recommended homepage order

1. Hero — “Built from within.”

2. Selected Environments — interactive proof, real environments, unchanged interaction

3. From Within Bridge — compact human/story bridge with 3 micro-pillars

4. Selected Artefacts — 6 curated proofs

5. System Components — operating system / method

6. Collaboration Areas — with /work anchors

7. GN Fuel Laws Preview — framework / IP

8. Invitation — final contact / opportunity CTA

This produces the desired rhythm:

identity → interactive credibility → meaning → proof → method → opportunity

The homepage should feel more alive, more human and more useful, without becoming long or text-heavy.

---

B) Should Selected Environments move back up after Hero?

Yes.

Selected Environments should move back up directly after Hero because it is one of the strongest proof layers on the website.

It works because it:

- breaks the abrupt “Hero → projects” feeling

- gives motion and interaction immediately after the still hero

- shows real-world credibility before asking users to care about artefacts

- makes the artefacts feel like outputs from real environments, not random portfolio cards

- preserves one of the most engaging parts of the current website experience

The environments section should act as an interactive credibility layer, not a CV dump.

---

C) Preserve current mannequin / horizontal environment interaction?

Yes — fully preserve it.

Do not replace the mannequin.

Do not rebuild the horizontal switching logic.

Do not change transitions, animation or interaction model.

Do not touch MannequinTorso.tsx.

Only enrich the per-environment copy/metadata inside the existing Selected Environments layout.

Allowed changes:

- role

- period

- context

- focus/output tags

- optional safe season note

Not allowed:

- structural rebuild

- replacing the visual concept

- removing the interaction

- turning it into a static timeline or logo wall

This section is one of the most memorable parts of the website and should stay interactive.

---

D) Where the compact From Within Bridge goes

The From Within Bridge should go after Selected Environments and before Selected Artefacts.

Reason:

The Hero already establishes identity verbally.

The Selected Environments then let the visitor feel real-world proof and interaction.

The bridge then explains the meaning behind that proof before the user reaches the artefacts.

This creates the rhythm:

Hero:

Who is this?

Selected Environments:

Where was this shaped?

From Within Bridge:

Why does this work exist?

Selected Artefacts:

What has been built from it?

The bridge should feel like a quiet exhale before the artefacts, not another long manifesto.

---

E) From Within Bridge structure

Create a compact new section:

Component name:

FromWithinBridge.tsx

Purpose:

Explain “Built from within.” in a short, premium, human and strategic way.

It should communicate:

- lived sport

- athlete identity

- nutrition science

- practical systems

- real performance environments

It should not be:

- a long biography

- a large text-only section

- a services section

- another full manifesto

- a repeated version of the Hero

Suggested copy:

Title:

From lived sport to usable systems.

Body:

Before I studied performance, I lived the routine: training, competition, recovery, pressure and the small decisions that shape consistency.

Supporting line:

This is where lived sport, nutrition science and practical systems meet.

Micro-pillars:

- Lived Sport

- Nutrition Science

- Practical Systems

Optional quiet worldview line, only if it fits without making the section too long:

Performance starts before the visible result.

Design:

- compact height

- premium editorial feel

- subtle border or quote-style layout

- short body copy

- 3 micro-pillars in one row

- no portrait

- no CTA

- no excessive whitespace

The bridge should replace the large ManifestoSection on the homepage, but preserve the soul of the human story.

ManifestoSection file should be preserved on disk for possible /about reuse, but removed from the homepage order.

---

F) Suggested per-environment copy structure

Use a consistent schema inside the existing Selected Environments panel:

[Environment name]

Role

Period

Context

Focus / outputs

Optional season note — muted, italic, visually secondary

The copy should be short, premium and useful.

Do not overload each panel.

Do not make it feel like a CV.

Do not claim team results as personal achievements.

---

G) Environment copy direction

RSC Anderlecht

Role:

Performance Nutrition Intern

Period:

2026 / 2025–26 season context

Context:

Elite football environment

Focus:

Hydration · Matchday fueling · Scientific reviews · Athlete & staff education · Practical resources

Optional season note:

During a season marked by a cup-final run and European qualification race.

Important:

Use the season note only if it fits safely and subtly.

Frame it as season context, not personal credit.

---

Leça FC

Role:

First Team Performance Nutrition

Period:

2025

Context:

Senior first-team football environment

Focus:

Body composition · Matchweek routines · Athlete education · Practical fueling

Optional season note:

Inside a competitive promotion-stage campaign.

Important:

Do not mention record-setting results unless verified later.

Do not imply personal responsibility for team outcomes.

---

Run4Excellence

Role:

Performance Nutrition

Period:

2025

Context:

Human-performance environment beyond football

Focus:

Health · Habits · Endurance · Recovery · Long-term athlete development · Practical education

Purpose:

This environment should show the broader human-performance side, not only football.

---

FCNAUP

Role:

Nutrition Sciences

Period:

2022–2026

Context:

Scientific foundation

Focus:

Evidence-based practice · Research translation · Ethics · Applied education

Purpose:

This environment should show the scientific and ethical foundation behind the applied work.

---

H) Safe season-context framing rules

Season context is allowed.

Personal achievement claims are not.

Allowed wording:

- “during a season marked by…”

- “inside a first-team environment competing for…”

- “part of the performance environment during…”

- “in the context of…”

- “within an environment shaped by…”

Avoid:

- “I helped the team win…”

- “my trophy”

- “my results”

- “I contributed to the team achieving…”

- “I delivered the team’s success…”

Important distinction:

It is acceptable to mention personal outputs, such as resources built, education delivered, reviews prepared or systems developed.

It is not acceptable to claim responsibility for team trophies, rankings or competitive results.

Season notes should be italic, smaller or muted so they clearly read as context, not credit.

---

I) Selected Artefacts after the bridge?

Yes.

Selected Artefacts should come after:

1. Hero — identity

2. Selected Environments — interactive credibility

3. From Within Bridge — meaning and human story

Only then should the 6 artefacts appear.

This makes the artefacts feel like proof of the story, not a portfolio dump.

Keep the current 6 homepage featured artefacts:

- The ABC of Football Nutrition

- The Football Nutrition Atlas

- Athlete Equivalent Bank

- Matchday Fuel

- Protected Team Monitoring Report

- FuelOps AI

Keep:

- current grouping

- current modal logic

- current Resource Vault logic

- current early-access/request-access behaviour

Do not change artefact data unless required by this homepage flow.

---

J) Sections to compress / merge / remove

Retire from Index:

ManifestoSection

Reason:

The large ManifestoSection made the homepage slower and more philosophical before concrete value.

Replacement:

FromWithinBridge

Preserve:

The ManifestoSection file should stay in the project and can be reused later on /about if needed.

Keep as-is:

- HeroSection

- EnvironmentsSection interaction/visual system

- SelectedArtefactsSection

- SystemComponentsSection

- CollaborationAreasSection

- FuelLawsPreview

- InvitationSection

Do not touch:

- Work.tsx

- ResourceModal.tsx

- ImageLightbox.tsx

- MannequinTorso.tsx

- artefacts.ts unless absolutely required for homepage flow

- Supabase/database wiring

- forms

- email/domain

- payments

- auth

- connectors

---

K) Files / components edited if approved

Edit:

src/pages/Index.tsx

- reorder sections

- remove ManifestoSection from homepage

- insert FromWithinBridge after Selected Environments

- final order:

  Hero → Environments → FromWithinBridge → SelectedArtefacts → SystemComponents → CollaborationAreas → FuelLawsPreview → Invitation

Create:

src/components/sections/FromWithinBridge.tsx

- compact presentational section

- lead title + short body + supporting line + three micro-pillars

Edit:

src/components/sections/EnvironmentsSection.tsx

- copy/metadata enrichment only

- add role, period, context, focus[], optional seasonNote

- render inside existing panel layout without changing interaction, mannequin, animation or switching logic

Optional:

src/index.css

- add tiny utility/style for muted italic season note if needed

- avoid large styling changes

Do not edit:

src/components/MannequinTorso.tsx

src/components/resource/ResourceModal.tsx

src/components/ImageLightbox.tsx

src/pages/Work.tsx

database/form files

auth/payment/email/domain files

---

L) Minimal safe implementation plan

Pass A — Reorder + Bridge

1. Create FromWithinBridge.tsx.

2. Update Index.tsx order to:

   Hero → Environments → FromWithinBridge → SelectedArtefacts → SystemComponents → CollaborationAreas → FuelLawsPreview → Invitation.

3. Remove ManifestoSection import from Index.tsx.

4. Preserve ManifestoSection file.

Pass B — Environment copy enrichment

5. In EnvironmentsSection.tsx, enrich existing environment data with:

   - role

   - period

   - context

   - focus[]

   - optional seasonNote

6. Render this metadata inside the existing panel layout.

7. Do not change interaction, mannequin, animation, switching logic or layout architecture.

8. Apply safe-framing rules to every seasonNote.

Verification

9. Visual scroll-through on desktop and mobile.

10. Confirm Hero → Environments → Bridge → Artefacts feels natural.

11. Confirm the Selected Environments interaction still behaves the same.

12. Confirm mannequin is untouched.

13. Confirm no forms, modals, lightbox, database, routes or Resource Vault systems were touched.

---

M) Final implementation response required

After implementation, report:

A) final homepage order

B) FromWithinBridge copy used

C) whether ManifestoSection was retired from homepage and preserved as a file

D) environment copy/metadata added

E) whether the Selected Environments interaction and mannequin were untouched

F) whether Resource Vault/cards/forms/modals/lightbox were untouched

G) files/components edited

H) what should be reviewed visually next

---

Awaiting approval to implement Pass A + Pass B only.