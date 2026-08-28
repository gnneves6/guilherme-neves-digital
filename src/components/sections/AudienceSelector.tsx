import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "@/components/Reveal";
import {
  ShieldCheck,
  ClipboardList,
  GraduationCap,
  Trophy,
  Users,
  Handshake,
} from "lucide-react";
import {
  audiences,
  audiencesByState,
  audienceStateMeta,
  audienceByAnchor,
  proofFor,
} from "@/data/audiences";
import { engagements } from "@/data/engagements";
import { environmentOfArtefact } from "@/data/work-graph";

/**
 * One mark per audience, so the six lines stop being six lines.
 *
 * A stack of similar-length phrases in the same weight is read word by word,
 * which is the slowest way to answer "which of these is me". A shape in front
 * of each one is recognised before the words are, so the eye lands on its own
 * row first and reads only that. Kept to plain outlines at a single stroke
 * weight; anything more decorative would compete with the type.
 */
const audienceIcons: Record<string, typeof ShieldCheck> = {
  clubs: ShieldCheck,
  staff: ClipboardList,
  students: GraduationCap,
  athletes: Trophy,
  youth: Users,
  brands: Handshake,
};

/**
 * AudienceSelector.
 *
 * The entrance to the offer, sorted by who is arriving rather than by what is
 * being sold. Traffic from social video comes with an intent already formed,
 * so the first question the page answers is "is this for me".
 *
 * Reads the URL hash on mount, which is what makes a video call to action
 * land somewhere specific (/services#students) instead of at the top of the
 * page. Changing selection rewrites the hash without adding history entries,
 * so the back button still leaves the page rather than stepping through tabs.
 *
 * The six are grouped by when they open rather than listed flat. Six doors in
 * the same weight look equally available, so someone picks the one that sounds
 * most like them, reads a full panel, and only at the end finds a sentence
 * saying it waits on registration. The grouping puts that fact before the
 * choice instead of after it, which costs the visitor nothing and is the only
 * honest order.
 *
 * Nothing here scrolls. Choosing is a pointer gesture and the page stays put,
 * which keeps scroll meaning one thing only.
 */

const toneStyles = {
  live: { dot: "hsl(var(--olive-light))", text: "hsl(var(--olive))" },
  // 38% lightness measured 4.31:1 against the ivory, under the 4.5 that 10px
  // uppercase needs. 35% reads 4.87 and is the same amber to the eye.
  soon: { dot: "hsl(40, 55%, 55%)", text: "hsl(38, 45%, 35%)" },
  open: { dot: "hsl(var(--muted-foreground))", text: "hsl(var(--muted-foreground))" },
} as const;

const AudienceSelector = () => {
  const { hash, pathname, search } = useLocation();
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState(audiences[0].id);
  const [dir, setDir] = useState(1);

  // A link from elsewhere (a video description, a post) selects directly.
  useEffect(() => {
    const anchor = hash.replace("#", "");
    const match = anchor && audienceByAnchor(anchor);
    if (match) setActiveId(match.id);
  }, [hash]);

  const active = audiences.find((a) => a.id === activeId) ?? audiences[0];
  const state = audienceStateMeta[active.state];
  const tone = toneStyles[state.tone];
  const proof = proofFor(active);
  // Deep link into the environment chapter the piece belongs to, so the
  // archive opens on the right room rather than at the top of a long page.
  const proofEnv = proof ? environmentOfArtefact(proof.artefact.slug) : null;

  const select = (id: string, anchor: string) => {
    // Which way the panel should travel. Picking a door further down the list
    // sends the old panel left and brings the new one in from the right, so
    // the movement agrees with the movement of your own eye down the column.
    const from = audiences.findIndex((a) => a.id === activeId);
    const to = audiences.findIndex((a) => a.id === id);
    if (to !== from) setDir(to > from ? 1 : -1);
    setActiveId(id);

    // Through the router, never through history directly.
    //
    // This used to be `history.replaceState(null, "", "#" + anchor)`, which is
    // wrong twice. It writes `null` over the state object react-router keeps
    // its own stack index in. And under HashRouter, which is what the shared
    // preview build uses, the entire route lives in the hash: replacing the
    // hash with `#students` deleted `/services` outright, so the next
    // navigation or back button resolved a path called `/students` and landed
    // on the 404. Replacing through the router produces the right URL under
    // either router and leaves its bookkeeping intact.
    navigate({ pathname, search, hash: `#${anchor}` }, { replace: true });
  };

  return (
    <section className="section-padding section-spacing">
      <div className="max-content">
        {/* A landing point for every anchor.
            The hash already chose the right panel, but nothing on the page
            carried these ids, so /services#athletes selected professional
            athletes and then left the reader at the top of a nine thousand
            pixel page with no idea it had happened. Six zero-height marks at
            the head of the section give the scroll something to find. They sit
            at the same position on purpose: the anchor decides which panel is
            open, not where on the page you land. */}
        {audiences.map((a) => (
          <span key={a.anchor} id={a.anchor} aria-hidden className="block h-0" />
        ))}
        <Reveal>
          <p className="text-caption mb-6">Who I work with</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-headline max-w-3xl">
            Six kinds of people arrive here. Tell me which one you are.
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="text-body-lg max-w-xl mt-5">
            The work looks different depending on who is asking, so rather than
            list everything at once, pick the line that sounds like you. They
            are grouped by what can happen now and what waits on registration,
            so you know before you read.
          </p>
        </Reveal>

        <div className="mt-12 grid lg:grid-cols-[minmax(230px,300px)_1fr] gap-8 lg:gap-16">
          {/* Chooser */}
          <Reveal delay={0.2}>
            <div className="flex flex-col gap-7">
              {audiencesByState.map((group) => (
                <div key={group.state}>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0 translate-y-[-1px]"
                      style={{ background: toneStyles[group.meta.tone].dot }}
                    />
                    <span
                      className="text-[10px] tracking-[0.24em] uppercase font-display"
                      style={{ color: toneStyles[group.meta.tone].text }}
                    >
                      {group.meta.group}
                    </span>
                  </div>
                  <p className="text-[11px] leading-snug text-muted-foreground mb-3 pl-[14px] max-w-[19rem]">
                    {group.meta.groupNote}
                  </p>
                  <ul className="flex flex-col gap-px bg-border/50 lg:bg-transparent lg:gap-0">
                    {group.items.map((a) => {
                      const isActive = a.id === active.id;
                      return (
                        <li key={a.id}>
                          <button
                            onClick={() => select(a.id, a.anchor)}
                            aria-pressed={isActive}
                            className="group w-full text-left px-4 py-4 lg:px-0 lg:py-3.5 bg-background flex items-center gap-3 transition-colors duration-300"
                            style={{
                              borderBottom: "1px solid hsl(var(--subtle-border))",
                            }}
                          >
                            <motion.span
                              className="block h-px shrink-0"
                              animate={{
                                width: isActive ? 18 : 8,
                                backgroundColor: isActive
                                  ? "hsl(var(--foreground))"
                                  : "hsl(var(--foreground) / 0.2)",
                              }}
                              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                            />
                            {(() => {
                              const Icon = audienceIcons[a.id];
                              return Icon ? (
                                <Icon
                                  aria-hidden
                                  strokeWidth={1.5}
                                  className="w-[18px] h-[18px] shrink-0 transition-colors duration-300"
                                  style={{
                                    color: isActive
                                      ? "hsl(var(--olive))"
                                      : "hsl(var(--muted-foreground) / 0.55)",
                                  }}
                                />
                              ) : null;
                            })()}
                            <span
                              className="font-display text-sm md:text-[15px] leading-snug transition-colors duration-300"
                              style={{
                                color: isActive
                                  ? "hsl(var(--foreground))"
                                  : "hsl(var(--muted-foreground))",
                              }}
                            >
                              {a.label}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>

          {/* The answer */}
          {/* Sideways, not up. Six panels that all faded in place read as one
              panel whose words keep changing, which is why choosing felt like
              nothing happened. Travelling laterally says a different card was
              brought in, and the direction it comes from says where it came
              from in the list. `overflow-hidden` because a panel on its way out
              must not be visible in the margin. */}
          <div className="relative min-h-[18rem] overflow-hidden">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={active.id}
                custom={dir}
                initial={{ opacity: 0, x: 70 * dir, filter: "blur(6px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -70 * dir, filter: "blur(6px)" }}
                transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-center gap-2.5 mb-5">
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: tone.dot }}
                  />
                  <span
                    className="text-[10px] tracking-[0.24em] uppercase font-display"
                    style={{ color: tone.text }}
                  >
                    {state.label}
                  </span>
                </div>

                <h3 className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-foreground flex items-center gap-3">
                  {(() => {
                    const Icon = audienceIcons[active.id];
                    return Icon ? (
                      <Icon
                        aria-hidden
                        strokeWidth={1.5}
                        className="w-6 h-6 md:w-7 md:h-7 shrink-0"
                        style={{ color: "hsl(var(--olive))" }}
                      />
                    ) : null;
                  })()}
                  {active.label}
                </h3>
                {active.labelNote && (
                  <p className="text-caption text-[10px] mt-2.5">{active.labelNote}</p>
                )}
                <p className="text-body mt-3 max-w-xl">{active.who}</p>

                {/* "What usually brings you here" and "What I do" were two more
                    paragraphs restating the line above and the list below. A
                    person choosing between six options needs two things: is
                    this me, and what do I get. Both survive; the restating
                    does not. */}
                <div className="mt-8 max-w-xl">
                  <p className="text-caption text-[10px] mb-4">What you walk away with</p>
                  <ul className="space-y-2.5">
                    {active.gains.map((g) => (
                      <li key={g} className="flex items-start gap-3 text-sm leading-snug">
                        <span
                          className="mt-[7px] w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ background: "hsl(var(--olive))" }}
                        />
                        <span style={{ color: "hsl(var(--graphite))" }}>{g}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* How it runs.
                    These are the three engagements that used to be a section of
                    their own further down this page, under six doors that
                    described the same work a second way. A stranger had to read
                    both and map one onto the other, which is what made the page
                    heavy. Each door names its own now, with the photograph of
                    what that format actually produces. */}
                <div className="mt-9 max-w-2xl">
                  <p className="text-caption text-[10px] mb-4">How it runs</p>
                  <ul className="flex flex-col divide-y" style={{ borderColor: "hsl(var(--subtle-border))" }}>
                    {active.formats.map((id) => {
                      const f = engagements[id];
                      return (
                        <li key={id} className="flex items-start gap-4 py-3.5 first:pt-0">
                          <span
                            className="hidden sm:block w-16 h-12 shrink-0 overflow-hidden"
                            style={{ border: "1px solid hsl(var(--subtle-border))" }}
                          >
                            <img
                              src={f.image}
                              alt=""
                              aria-hidden
                              className="w-full h-full object-cover"
                              style={{
                                transform: `scale(${f.imageFocus.scale})`,
                                transformOrigin: f.imageFocus.origin,
                              }}
                            />
                          </span>
                          <span className="min-w-0">
                            <span className="flex flex-wrap items-baseline gap-x-3">
                              <span className="font-display text-[15px] font-medium text-foreground">
                                {f.title}
                              </span>
                              <span className="text-caption text-[10px] text-muted-foreground">
                                {f.shape}
                              </span>
                            </span>
                            <span className="block text-sm leading-snug mt-1" style={{ color: "hsl(var(--graphite))" }}>
                              {active.formatNotes?.[id] ?? f.outcome}
                            </span>
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* One real piece of work, named. Every door makes a claim, and
                    this is the cheapest honest way to back it: the archive
                    already records what each piece proves, so this costs no new
                    writing and cannot drift from the truth. */}
                {proof && (
                  <div
                    className="mt-8 max-w-2xl p-5"
                    style={{ background: "hsl(41 40% 96%)", border: "1px solid hsl(var(--subtle-border))" }}
                  >
                    <p className="text-caption text-[10px] mb-3">Proof</p>
                    <Link
                      to={`/work?env=${proofEnv ?? ""}`}
                      className="font-display text-base font-medium text-foreground link-underline"
                    >
                      {proof.artefact.title}
                    </Link>
                    <p className="text-sm leading-snug mt-2" style={{ color: "hsl(var(--graphite))" }}>
                      {proof.why}
                    </p>
                    <p className="text-caption text-[10px] mt-3 text-muted-foreground">
                      {proof.artefact.status === "Protected"
                        ? "Built inside a club, so it is named rather than opened"
                        : "Open to read in the archive"}
                    </p>
                  </div>
                )}

                {/* Why the door is not open yet, in the door's own words. It
                    sits after the gains and before the button, which is the
                    only place it belongs: hiding it would be dishonest, and
                    leading with it would bury an offer someone can still put
                    their name to today. */}
                {active.legal && (
                  <p
                    className="mt-8 max-w-xl text-sm leading-relaxed pl-4"
                    style={{
                      borderLeft: "2px solid hsl(40, 55%, 55%)",
                      color: "hsl(var(--graphite))",
                    }}
                  >
                    {active.legal}
                  </p>
                )}

                <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-x-5 gap-y-3">
                  <Link
                    to={`/contact?about=${active.anchor}`}
                    className="inline-flex items-center justify-center px-8 py-3.5 bg-foreground text-background font-display text-sm font-medium tracking-wide transition-all duration-500 hover:tracking-wider"
                  >
                    {active.cta}
                  </Link>
                  <p className="text-caption text-[10px] text-muted-foreground max-w-[17rem] leading-relaxed">
                    {active.ctaMicro}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AudienceSelector;
