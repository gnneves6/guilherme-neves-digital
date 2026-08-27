# Site decisions

The rules this site is built to. Read this before changing copy, structure or
navigation, so decisions already made are not quietly re-made.

**This repository is public.** Everything here is readable by anyone. Personal,
financial and family matters are deliberately absent: they live in a private
repository and must never arrive here, in the site or in this file.

Each entry says what was decided and why. Where a decision was reversed, the
reversal is recorded rather than the original being edited away, because the
reasoning is what stops it being reversed again by accident.

---

## Identity

**The person is the brand.** There is no company name. `SITE_BRAND` in
`src/config/site.ts` is "Guilherme Neves", and an invented agency name was
removed: it made a one-man practice sound like something it has to live up to.
Structured data treats the Person as the primary entity, with the site as a
`WebSite` record about them.

**"Soon to be a registered nutritionist."** He holds a BSc from FCNAUP; the
professional licence is pending. The site says this plainly wherever
credentials appear. It is never implied to be complete.

**English throughout**, because the work is aimed internationally.

**The person comes before the product.** The home opens on who he is, not on a
tool. A tool is value for one segment; identity is the only thing that works
on all of them. Leading with the planner was tried and reversed.

---

## Regulatory discipline

Non-clinical work can be sold now: systems, tools, education, mentoring,
partnerships. Individual assessment, diagnosis, prescription and follow-up are
regulated acts and wait for the licence.

Where an audience implies regulated work, the site shows a waitlist line rather
than an offer, and says why. This is not hedging, it is the difference between
taking names and practising. Do not remove it to make a page read stronger.

**The six audiences are grouped by when they open**, not listed flat: open now,
opens with registration, open to proposals. Six doors in the same weight look
equally available, so someone picks the one that sounds most like them, reads a
whole panel, and only at the end meets a sentence saying it waits. The state
belongs before the choice. The sentence explaining why still prints inside the
panel, after what the person would get and before the button.

Non-clinical work is not affected by this. A generic tool with its assumptions
and its limits stated is not an individual act, and can be sold now; what stops
it today is fiscal, not the Ordem.

---

## What the site is for

**Two jobs, and only two.** Convert the few who arrive ready. Capture the many
who do not. Every block has to serve one of them or come out.

**A showroom, not a warehouse.** The site proves capability. New tools go to
social and to the list, so the site does not need weekly maintenance. If a
change means this page has to be updated every time something ships, the change
is wrong.

---

## Structure

**Six routes**: `/`, `/work`, `/services`, `/fuel-laws`, `/about`, `/contact`,
plus a 404 that wears the site and offers three real destinations.

**Navigation is Work, Services, Fuel Laws, About, and a contact button.** Six
links asked a stranger to choose before they knew what anything was; three was
the correction. Fuel Laws was then added back deliberately: it is the only free
thing here and most people who land are not buying anything, so leaving it out
put their path at the bottom of a long page. Home stays the wordmark rather
than a fifth slot.

**The home is five blocks**: who he is, where he has been, the evidence, the
argument, the invitation. The premise and the method are one section, not two,
because splitting them put the whole environments chapter between a problem and
its answer.

**The archive is organised by environment, not by subject.** Three chapters:
RSC Anderlecht, Leça FC, independent practice. Each opens on what was actually
done there. Subject filters were removed; seven openable items do not need
faceted search.

**The offer is a ladder, sorted by what it costs the visitor.** Take something
and go, free. Use something now, free. Bring me into the environment. It lives
on the home because sorting by "where it was built" and "what is sold" never
answered the question a stranger actually arrives with.

---

## Copy

**No em-dashes. Ever.** Commas, colons and full stops instead. This is checked
before every commit.

**Nothing is advertised that does not exist.** Titles with nothing behind them
were removed rather than labelled. What is genuinely being built says
"Building" and is a plain sentence, not a card.

**Protected work is named, never teased.** It belongs to the club it was built
for. It gets a title, what it proves, and a drawing of the kind of tool it was.
It never gets a blurred photograph pretending to be openable, and it never gets
invented numbers.

**Proof is framed before it is given.** Three sharp specifics, standing alone,
read as everything he did in a season. Each environment states the breadth of
the role first, then "In practice", then the examples. "For example" was tried
and reads like a textbook.

**Nothing points at the visitor's wallet.** "This is what gets built, here's how
it gets bought" was written and removed: it is clever and cold, and it makes a
page about players read backwards as a funnel.

**Highlights stay rare.** The `Em` marker carries the spine of an argument.
Five across the whole site. A mark in every sentence is the same as no marks.

---

## Visual system

**Warm ground.** Beige and cashmere green, premium and light. The palette is
HSL tokens in `src/index.css`; change them there, never per component.

`--muted-foreground` is at 40% lightness and must not go lighter. At 42% it
read 4.39:1 against the ivory, under the 4.5 that normal text needs, and that
one token paints every caption, label and navigation link on the site.

**A plan grid under the ivory.** A fine measuring grid with two margin rules,
at an opacity meant to register as depth rather than as a pattern. The metaphor
is a plan of an environment drawn before anything is prescribed, which is what
the work is. Never placed under the fuel laws console, which carries its own.

**Real photographs of real artefacts.** Dense documents are cropped to a region
so detail survives at column size, and open full frame on click. Never a drawn
mockup standing in for a document that exists.

**One deliberate accent.** Olive marks the thing that matters in a block. It is
not decoration and does not get spread around.

**Motion is driven by scroll, never by a clock.** Nothing on this site loops or
plays on its own. The grid drifts against the page, the measure mark travels
down the margin, and the statement band runs its sequence, all as a function of
where the reader is. A thing that moves while the reader is still is asking for
attention it has not earned; a thing that moves because they moved is depth.

**The statement is a sequence, not a stack.** "The standard" pins one screen
and puts the three wrong answers through a single position, struck one at a
time, with the claim landing in the same place they left. Stacked, the whole
correction was visible before the eye arrived and the three wrong answers sat
next to the right one competing with it. Any pinned section owes the reader a
visible length: the counter and the rail exist so nobody thinks the page broke.

**No rendered brand scenes.** The band used to sit on a rendered poster of a
"GN LIFE & LEGACY OS", coat of arms and trademark included, invisible only
because the band was short. It is a photograph of a real dressing room now.
Nothing that shows a company, a monogram or merchandise that does not exist
goes on this site, however good it looks.

---

## The offer, settled

Recorded because these were decided once and cost real thinking. A later
session that finds them undocumented will want to decide them again.

**Matchfuel is a tool, not a platform.** It plans a matchday. The accompanied
athlete (wellness check-ins, their own history, a direct line) is a different
thing and does not exist yet. It is not built ahead of demand.

**The individual practice runs by hand first.** Software gets built when there
are enough athletes to justify it, and by then what it has to do is known,
because a year was spent doing it manually. Building the platform before the
offer is validated is the failure mode, not the plan.

**Relocation lives inside "Professional athletes".** It is not a seventh door.
Moving club or country is when that athlete needs this most, not a different
kind of person, and a separate card would split one audience into two half-full
ones. It is framed as accompaniment through a season, not an assessment trip:
week one on site, then a standing line and re-assessment as the season moves.

**The five fuel laws are the free offer.** They keep their place in the
navigation and their content. What changed is who owes whom: a method says "I
am important enough to have a method", a gift says "this is what I actually
use, take it". The proof sitting beside each law is what earns the word.

**Not decided, do not invent.** Prices, which wait until there is one real case
in each arm. And the name of the client space, which waits until the platform
exists.

---

## Currently parked

**FuelOps stays a positioning promise, not a build project.** The market for
"bring all your athlete data together" is held by established platforms. The
defensible idea is the decision layer, and the cheapest honest way to build it
is as the deliverable of a paid audit rather than as a separate product effort.
The site names it and does not oversell it.

**Fuel Laws keeps its content and lost its branding.** "GN Fuel Laws" and
"Operating System" are gone; it is "The five fuel laws". The earlier decision to
park the method stands in spirit: no method is claimed before it has been
earned. The navigation item serves distribution, not branding.

---

## Open

- The real Matchfuel application is not yet integrated. The planner on
  `/services` is the site's own, built from the same numbers.
- Five artefacts have no photograph and use a typographic cover instead:
  MD-1 Fuel System, Why Players Cramp at 80 Minutes, Supplementation in Elite
  Football, Athlete Equivalent Bank, Athlete's Food Pyramid.
- The services page describes three engagements. The way the work is actually
  intended to run, close and long-term rather than transactional, is not yet
  fully reflected there.
- `scene-invitation-exit.jpg`, behind the home invitation, still carries the
  invented branding the statement band just lost: a `gn.` monogram on a shaker,
  a gym bag and a notebook, and three slogans on the wall. It is dark enough
  that most people will not read it, which is exactly why it survived the
  branding pass. Decide whether it goes, and to what: there are five real
  photographs in `src/assets/photos`. (`scene-environments-archive.jpg` was
  checked at the same time and is clean: a rendered room, no branding.)
- The five laws do not capture an email yet. When they do, the privacy policy
  has to cover the list before the form ships, not after: a mailing list is a
  separate purpose under GDPR and the current policy does not name it.

---

## Checks that must pass before merging to main

Run against a production build, desktop at 1440 and mobile at 390:

- no horizontal overflow on any route
- no console errors on any route
- exactly one `h1` per route
- zero em-dashes anywhere in `src/`, `index.html` and `scripts/`
- every promised count matches what renders
- every internal link lands on the right page, at the right position
