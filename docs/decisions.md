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

**There is a mark, and it is not a company.** A GN monogram sits beside the
wordmark in the navigation, in the favicon and on the installed icon. That is
not a reversal of the line above: a monogram is identity, the thing that was
removed was an invented corporation, complete with a trademark symbol, a coat
of arms and a product name for something that does not exist.

It is used as a CSS mask rather than placed as an image, so it keeps only its
shape and takes the site's own ink. The file is a near-black raster and a fixed
near-black beside warm ink reads as a sticker dropped on the page. It is never
put in the hero: the first screen's job is to say what a stranger can have, and
a mark says nothing, so spending that space on it makes the site less clear,
not more like a business.

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

**The block is Portuguese, and the copy has to say so.** It read as though the
door were shut everywhere: "I am completing professional registration, so I am
taking names now" was shown to every reader, including readers in countries
where a graduate may practise on the degree alone. That is turning away work
that could start immediately. The lines now name Portugal and invite everyone
else to ask. They deliberately do not state what any other country requires,
because that has to be checked one country at a time and a website is the wrong
place to guess.

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

**Seven routes**: `/`, `/work`, `/services`, `/fuel-laws`, `/about`,
`/contact`, `/privacy`, plus a 404 that wears the site and offers three real
destinations. Privacy is not a page anybody wants; it is the page that makes
the two forms legal, and it is linked from both of them and from the footer.

**Navigation is Work, Services, About, and a contact button.** Six links asked
a stranger to choose before they knew what anything was; three was the
correction. Home stays the wordmark rather than a fourth slot.

*Reversed once:* Fuel Laws was added back as a fifth item because it is the
only free thing here and most people who land are not buying anything, so
leaving it out put their path at the bottom of a long page. That reasoning was
right about distribution and wrong about the slot. A named method sitting level
with Work, Services and About reads as a methodology being announced, and a law
is a claim; claiming one at twenty-one with no public cases is the cart in
front of the horse. So it moved rather than went: it is the first button in the
hero now, which is better distribution than a fifth tab and costs the
navigation nothing.

**The first screen makes a promise, not a category.** It said "Applied
performance nutrition systems for athletes and teams", which names a field and
offers nothing: thirty-eight words on the first screen and not one of them told
a stranger what they could have. It now says who it is for and what changes for
them, in one sentence, and carries two buttons for two different people, the
free one leading because almost everybody who lands is eligible for it. The
first mention of anything on offer used to be at five thousand pixels.

**The home is five blocks**: who he is, where he has been, the evidence, the
argument, the invitation. The premise and the method are one section, not two,
because splitting them put the whole environments chapter between a problem and
its answer.

**The students door gives and does not sell.** It was written as a paid
one-to-one session and an earlier note called it the first offer that could
take money this week. That was wrong about this market: students do not pay.
What they do is decide, across years, who the reference is, and a good number
of them become the practitioners and staff who can buy. Charging them today to
lose that is a bad trade. So the door gives the route, the tools and a straight
answer, for nothing, and says out loud where the paid work lives: the
practitioner door above it, for when they are the person inside the building.
The position is earned by being useful now and by the career being worth
following.

**One taxonomy on the offer page, not two.** `/services` carried six audience
doors and, underneath them, three engagement cards describing the same work a
second way. A stranger had to read both and work out how they mapped onto each
other, which is what actually made that page heavy. The doors are the primary
axis, because "which of these am I" is the question people arrive with; the
three formats now live inside the door they belong to, under "How it runs",
each with the photograph of what it produces. The page lost about a third of
its height and nothing it was saying.

The formats were written for a club, because that is where they were built, so
a door can override the line where the shared one would lie: "System installed"
promising structures "your staff run without me in the room" is false to an
athlete who has no staff.

**Every door names one real piece of work.** Each door makes a claim, and one
named artefact under it is the cheapest honest way to back the claim: the
archive already records what each piece proves, so it costs no new writing and
cannot drift. Resolved through the graph, not through `artefacts`, because the
archive is two lists and resolving from one silently dropped the clubs door's
proof, which is the door most likely to be read by somebody who can buy. The
link opens the archive on the room the piece came out of, and the caption says
plainly whether it can be opened or only named.

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

**The site counts pages, and never people.** Every decision here was made by
reasoning with no numbers behind it, which was affordable while nobody was
arriving and stops being affordable the week a daily posting habit starts
pointing people here. Four non-identifying facts per view: the path, the host
that referred it, whether the screen is a phone, tablet or desktop, and a
random value in `sessionStorage` that dies with the tab and exists only to tell
one person reading five pages from five people reading one.

Deliberately not a third-party product. Those set cookies, profile across
sites, and would put a consent banner on a site that was just stripped back.
This writes to the same database as the forms, with the same insert-only policy
and the same denial of reads. `/privacy` describes it in the same words, and
that page has to be corrected in the same commit as any change here, or it
becomes a lie rather than merely out of date.

**Motion answers the reader.** Pointer, click and scroll, in that order of
importance. A thing that moves because the reader moved is depth.

*Reversed in part:* the rule used to be that nothing moves on its own. A page
left completely alone reads as switched off, and the exceptions kept arriving
anyway, so the rule is now narrower and honest. Exactly one thing on the ivory
runs by itself: the measure mark on the plan grid, a plotter head working down
the margin over twenty-two seconds, breathing between 0.2 and 0.42 opacity. It
is set to be caught in peripheral vision rather than watched, its scroll
position still applies so moving the page moves it too, and it stops dead under
reduced motion. Anything else that wants to move on its own has to argue for
itself against this one.

The order matters and was learned the hard way. Scroll was built first and was
invisible, because the preview the site is reviewed in runs inside a frame
sized to its own content, so the inner document never scrolls: everything
scroll-driven sits at frame zero and every reveal fires at once on load. Any
effect that only exists on scroll cannot be reviewed and may not be seen.
Pointer and click work in any container, so they carry the site and scroll
decorates it.

What answers today: the name on the home lifts, grows and takes olive under the
cursor, as a field with a falloff rather than a hover, so moving anywhere near
it moves several letters at once. The plan grid is lit by the pointer, three
and a half times its resting strength inside a soft circle that follows the
cursor, with a warm wash under it. A click opens a ring from where it landed,
including clicks that hit nothing. Olive-marked words fill with their highlight
when the cursor stops on them.

Written straight to the element through GSAP or custom properties, never React
state. These run every frame the mouse is moving.

**The statement is a sequence, not a stack.** "The standard" puts the three
wrong answers and the claim through a single position, one at a time, each one
struck and then blurred away while the next rises into the same spot. Stacked,
the whole correction was visible before the eye arrived and the three wrong
answers sat next to the right one competing with it.

*Reversed once:* it was first built as a pinned screen scrubbed against scroll
position, which is the better idea in a browser and worthless anywhere else.
It now takes whatever input it can get, in this order: the wheel, a click or
tap, the dots, and failing all of those a timer that starts when the section
comes into view and stops the instant the reader does anything. The wheel never
takes the page scroll away. The timer is the one thing on this site that moves
on its own, and it is here because an argument nobody ever sees is worse than
an argument that introduces itself. No viewport units either: `svh` resolves to
the height of the whole page inside a frame sized to its content.

**One place takes the scroll, and only one.** On "The standard", when the
section fills the screen and the reader keeps scrolling down, the wheel is
consumed: the page holds still and the sentence changes instead. Three notches,
then it is handed back for the rest of the visit. Taking someone's scroll is
the most hostile thing a page can do, so it only ever takes it downward, only
while the section really fills the screen, only once, and it stops Lenis as
well as the browser, releasing on every exit path including unmount. A reader
who meets one moment where the surface behaves differently reads the rest of
the site looking for the next one; a reader who meets five of them leaves.

**The enquiry form is delivered, not displayed.** It arrives as a sheet from
off the bottom right, overshoots, settles square, and only then accepts typing.
A contact form is the least interesting object on any site and the one thing
that asks a stranger to do real work. Watching a blank sheet be put in front of
you is a different invitation from finding one already lying there, and it
costs about a second.

**Changing a panel moves it sideways.** The six doors used to cross-fade in
place, which read as one panel whose words kept changing, so choosing felt like
nothing had happened. The panel now travels laterally, in the direction the
choice was made in the list.

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

**Fuel Laws keeps its content and lost its branding, twice.** "GN Fuel Laws"
and "Operating System" went first. The word "laws" went next: the page is "The
five checks I run before anything else", framed as something handed over rather
than a framework declared. The five did not change and neither did the proof
beside each one. What changed is who owes whom: a method says "I am important
enough to have a method", a gift says "this is what I actually use, take it".
Inside the page the word "laws" can stay, because what makes it arrogant is
claiming it without proof, and the proof is next to each one.

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
- ~~The five laws do not capture an email yet.~~ They do, through `LawKeep`,
  and it was writing `consent: true` to the database on a form that told nobody
  what they were consenting to and gave them nowhere to look it up. `/privacy`
  now exists, names the mailing list as a mailing list, and is linked from both
  forms. It is written as a description of what the code does, not from a
  template, so it stays true only as long as somebody updates it when the
  behaviour changes. It has not been read by a lawyer.

---

## Checks that must pass before merging to main

Run against a production build, desktop at 1440 and mobile at 390:

- no horizontal overflow on any route
- no console errors on any route
- exactly one `h1` per route
- zero em-dashes anywhere in `src/`, `index.html` and `scripts/`
- every promised count matches what renders
- every internal link lands on the right page, at the right position
