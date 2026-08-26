import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import Reveal from "@/components/Reveal";
import ResourceModal from "@/components/resource/ResourceModal";
import {
  artefacts,
  appliedWorkObjects,
  statusMeta,
  groupMeta,
  type Artefact,
  type ArtefactStatus,
} from "@/data/artefacts";
import Magnetic from "@/components/motion/Magnetic";
import { scrollToY } from "@/components/motion/SmoothScroll";
import { experiences } from "@/data/experiences";
import {
  nodeOf,
  maturityMeta,
  fieldNotes,
  environmentMeta,
  workByEnvironment,
  type EnvironmentId,
} from "@/data/work-graph";

type PreviewType = "editorialPlaceholder" | "blurredProtected" | "toolMockup" | "documentMockup" | "tableMockup" | "seriesMockup";

const getPreviewType = (status: ArtefactStatus, category: string): PreviewType => {
  if (status === "Protected") return "blurredProtected";
  if (category === "Interactive Tool" || category === "FuelOps Tool") return "toolMockup";
  if (category === "Educational Series") return "seriesMockup";
  if (category === "Matchday System" || category === "Framework") return "documentMockup";
  if (category === "Applied Tool" || category === "Athlete Resource") return "tableMockup";
  return "editorialPlaceholder";
};

const previewColors: Record<PreviewType, string> = {
  editorialPlaceholder: "hsl(155, 18%, 22%)",
  blurredProtected: "hsl(45, 10%, 18%)",
  toolMockup: "hsl(40, 28%, 28%)",
  documentMockup: "hsl(35, 22%, 38%)",
  tableMockup: "hsl(155, 15%, 25%)",
  seriesMockup: "hsl(30, 20%, 30%)",
};

/**
 * The face of a card.
 *
 * Six of these artefacts have a real photograph of the thing itself, a matchday
 * dashboard next to the printed MD-1 plan, the education cards laid out on a
 * desk. Those images were sitting unused in the repository while every card on
 * this page drew a fake rectangle with fake lines in it, which is a stranger
 * choice the longer you look at it: a real picture of real work, replaced by a
 * drawing of a document that does not exist.
 *
 * The drawn placeholder stays only for the artefacts that have no photograph
 * yet, and is treated as what it is, a holding pattern rather than a mockup
 * pretending to be a screenshot.
 */
const CardPreview = ({ artefact, index, wide }: { artefact: Artefact; index: number; wide?: boolean }) => {
  const pt = getPreviewType(artefact.status, artefact.category);
  const image = artefact.previewImage ?? artefact.previewImages?.[0];
  const ratio = wide ? "aspect-[16/9] sm:aspect-[32/9]" : "aspect-[16/9]";

  if (image) {
    return (
      <div className={`${ratio} relative overflow-hidden bg-[hsl(var(--charcoal-deep))]`}>
        <img
          src={image}
          alt={artefact.previewAlt ?? `${artefact.title}, a preview of the work.`}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
          loading="lazy"
        />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to top, hsl(var(--charcoal-deep) / 0.85) 0%, hsl(var(--charcoal-deep) / 0.15) 45%, transparent 70%)" }}
        />
        <div className="absolute inset-0 flex flex-col justify-between p-5">
          <span className="text-[9px] tracking-[0.4em] uppercase font-display text-[hsl(var(--ivory)/0.8)]">
            {artefact.category}
          </span>
          <span className="font-display text-5xl md:text-6xl font-bold leading-none text-[hsl(var(--ivory)/0.28)]">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </div>
    );
  }

  // No photograph of this one yet, so it gets a cover instead of a blank.
  // A drawn rectangle with a number in the corner reads as an image that
  // failed to load, sitting beside cards that do have a photograph; the title
  // set large reads as a deliberate cover, which is what a guide has anyway.
  return (
    <div className={`${ratio} relative overflow-hidden`} style={{ background: previewColors[pt] }}>
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--ivory)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--ivory)) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      <div className="absolute inset-0 flex flex-col justify-between p-5">
        <span className="text-[9px] tracking-[0.4em] uppercase font-display text-[hsl(var(--ivory)/0.55)]">
          {artefact.category}
        </span>
        <div className="flex items-end justify-between gap-4">
          <span className="font-display text-lg md:text-2xl font-semibold leading-[1.12] tracking-tight text-[hsl(var(--ivory)/0.9)] max-w-[85%]">
            {artefact.title}
          </span>
          <span className="font-display text-4xl md:text-5xl font-bold leading-none text-[hsl(var(--ivory)/0.16)] shrink-0">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </div>
    </div>
  );
};

/**
 * Picks a column count that leaves no hole in the last row.
 *
 * Three of the six families hold two items in a fixed three-column grid, so
 * each of them ended on a bare cream cell where a third card should be. It did
 * not read as deliberate space, it read as a card that failed to load.
 *
 * Three columns only when the count divides by three; otherwise two, which is
 * exact for every even count and leaves at most one card over. That last card
 * goes full width, and because it has no neighbour in its row there is no
 * height to mismatch, which is the trap in widening one card of a pair.
 */
const gridCols = (n: number) =>
  n === 1 ? "grid-cols-1" : n % 3 === 0 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2";

const isWide = (n: number, i: number) => n === 1 || (n % 3 !== 0 && n % 2 === 1 && i === n - 1);

/** Environments that actually hold work, in the order the story runs. */
const ENV_ORDER: EnvironmentId[] = ["anderlecht", "leca", "independent"];

const Work = () => {
  const [hovered, setHovered] = useState<string | null>(null);
  const [open, setOpen] = useState<Artefact | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  // Deep link from elsewhere on the site (a Fuel Law citing the work that
  // proves it) opens that artefact directly, so the connection is followable
  // rather than decorative.
  useEffect(() => {
    const slug = searchParams.get("a");
    if (!slug) return;
    const match =
      artefacts.find((x) => x.slug === slug) ??
      appliedWorkObjects.find((x) => x.slug === slug);
    if (match) setOpen(match);
    searchParams.delete("a");
    setSearchParams(searchParams, { replace: true });
  }, [searchParams, setSearchParams]);

  // Arriving from a club chapter on the home. The page is organised by
  // environment now, so this scrolls to that chapter rather than filtering the
  // page down to it: the visitor gets what they asked for and still sees that
  // the rest exists.
  const env = searchParams.get("env");
  useEffect(() => {
    if (!env) return;
    const target = document.getElementById(`env-${env}`);
    if (target) scrollToY(window.scrollY + target.getBoundingClientRect().top - 90);
  }, [env]);

  /**
   * The archive, split by where it was built and then by whether it can be
   * opened.
   *
   * It used to be fifteen near-identical cards grouped by subject, and eight of
   * those fifteen were a locked box or an unbuilt promise. A visitor scanning
   * that learned nothing: the strongest work here is the protected work, and as
   * a card it shows a blurred rectangle and asks for an email.
   *
   * Protected work stops pretending to be a product. It becomes a line of
   * evidence under the environment that produced it, which is what it actually
   * is, and only the seven pieces someone can genuinely open stay as cards.
   */
  const chapters = useMemo(
    () =>
      ENV_ORDER.map((id) => {
        const all = workByEnvironment(id);
        return {
          id,
          meta: environmentMeta[id],
          experience: experiences.find((e) => e.id === id) ?? null,
          openable: all.filter((a) => a.status === "Public"),
          protectedWork: all.filter((a) => a.status === "Protected"),
          building: all.filter((a) => a.status === "In Development"),
        };
      }).filter((c) => c.openable.length + c.protectedWork.length + c.building.length > 0),
    []
  );

  const renderCard = (a: Artefact, i: number, wide = false) => {
    const isHovered = hovered === a.slug;
    const hasHover = hovered !== null;
    const isReceded = hasHover && !isHovered;
    const s = statusMeta[a.status];
    const g = groupMeta[a.group];
    const node = nodeOf(a.slug);
    const rung = node ? maturityMeta[node.maturity] : undefined;

    return (
      <motion.button
        key={a.slug}
        onClick={() => setOpen(a)}
        onMouseEnter={() => setHovered(a.slug)}
        onMouseLeave={() => setHovered(null)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isReceded ? 0.4 : 1, y: 0 }}
        transition={{ duration: 0.5, delay: i * 0.04 }}
        className={`group block w-full text-left bg-background relative overflow-hidden ${wide ? "sm:col-span-2" : ""}`}
      >
        <motion.div
          className="absolute top-0 left-0 right-0 h-px z-10"
          style={{ background: "hsl(var(--olive) / 0.6)", transformOrigin: "left" }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        />

        <CardPreview artefact={a} index={i} wide={wide} />

        <div className="p-7">
          <div className="flex items-center justify-between mb-4 gap-3">
            {/* The card already sits under its group heading, so the group
                name would only repeat itself. Where it stands on the making
                ladder is the thing the reader does not already know. */}
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: g.dot }} />
              <span className="text-[9px] tracking-[0.25em] uppercase font-display opacity-65">
                {rung ? rung.label : g.short}
              </span>
            </div>
            {s.label !== g.short && (
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.dot }} />
                <span className="text-[9px] tracking-[0.25em] uppercase font-display opacity-55">
                  {s.label}
                </span>
              </div>
            )}
          </div>
          {/* The cover carries the title when there is no photograph to
              carry it, so repeating it here printed the same words twice in
              two hundred pixels. Whichever half shows it, it shows once. */}
          {(a.previewImage ?? a.previewImages?.[0]) && (
            <h3 className="font-display text-lg md:text-xl font-medium leading-snug mb-3">
              {a.title}
            </h3>
          )}
          <p className="text-sm leading-relaxed opacity-65">{a.description}</p>
          <span className="inline-block mt-5 text-xs opacity-65 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-500">
            {a.ctaLabel} →
          </span>
        </div>
      </motion.button>
    );
  };

  return (
    <Layout>
      <SEO title="Work, Guilherme Neves" description="What was built inside RSC Anderlecht, Leça FC and independent practice, and what came out of each." path="/work" />
      <section className="section-padding section-spacing">
        <div className="max-content">
          <Reveal>
            <p className="text-caption mb-6">Work</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-display max-w-4xl">
              Three rooms, and what came out of them.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-body-lg max-w-xl mt-8">
              Everything here was built inside a real environment, for people who
              had to use it that week.{" "}
              <span className="text-foreground font-medium">What can be opened is open.</span>{" "}
              What belongs to a club stays with the club, and is named rather
              than shown.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <Link
              to="/fuel-laws"
              className="inline-flex items-center gap-2 mt-6 py-2 font-display text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              Start with the five fuel laws
              <span aria-hidden>→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      <div className="section-padding max-content">
        <div className="divider" />
      </div>

      {/* The archive, walked as three rooms rather than browsed as a
          catalogue. Each chapter opens on what was done there, in his own
          words, then shows what can be opened and names what cannot. */}
      <section className="section-padding py-10 md:py-16">
        <div className="max-content space-y-24 md:space-y-32">
          {chapters.map((c, ci) => (
            <section
              key={c.id}
              id={`env-${c.id}`}
              className="scroll-mt-28"
              aria-labelledby={`env-${c.id}-title`}
            >
              <Reveal>
                <div className="flex items-baseline gap-4 flex-wrap">
                  <span className="text-caption text-[10px] opacity-40 tabular-nums">
                    {String(ci + 1).padStart(2, "0")}
                  </span>
                  <h2
                    id={`env-${c.id}-title`}
                    className="font-display text-2xl md:text-4xl font-semibold tracking-tight text-foreground"
                  >
                    {c.meta.label}
                  </h2>
                  {c.experience && (
                    <span className="text-caption text-[10px] opacity-55">
                      {c.experience.period} · {c.experience.location}
                    </span>
                  )}
                </div>
              </Reveal>

              {/* What was done here. These lines are the strongest thing on
                  the site and they were only ever on the home page.

                  The scope sentence above them is doing real work: on its own
                  a list of three sharp specifics reads as the complete
                  inventory of a season, which makes a serious job sound small.
                  Said first, the breadth frames them, and "for example" makes
                  explicit that these are samples of the work rather than all
                  of it. */}
              {c.experience ? (
                <Reveal delay={0.1}>
                  <p className="text-body-lg mt-7 max-w-2xl leading-relaxed">
                    {c.experience.scope}
                  </p>
                  <p className="text-caption text-[10px] mt-8 mb-4">For example</p>
                  <ul className="space-y-3 max-w-2xl">
                    {c.experience.proofs.map((proof) => (
                      <li key={proof} className="flex items-start gap-3">
                        <span
                          className="mt-[9px] w-1.5 h-1.5 rounded-full shrink-0"
                          style={{
                            background:
                              c.experience!.kitColors.primary === "#0E0E10"
                                ? "hsl(var(--olive))"
                                : c.experience!.kitColors.primary,
                          }}
                        />
                        <span className="text-body text-sm md:text-base leading-relaxed">{proof}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ) : (
                <Reveal delay={0.1}>
                  <p className="text-body text-sm md:text-base leading-relaxed mt-7 max-w-2xl">
                    Built outside any one club, from what kept repeating inside all
                    of them. Open to anyone, because the point is that it travels.
                  </p>
                </Reveal>
              )}

              {c.openable.length > 0 && (
                <div className="mt-12">
                  <Reveal>
                    <p className="text-caption text-[10px] mb-5">
                      Open, {c.openable.length}
                    </p>
                  </Reveal>
                  <div className={`grid gap-px bg-border/50 ${gridCols(c.openable.length)}`}>
                    {c.openable.map((a, i) => renderCard(a, i, isWide(c.openable.length, i)))}
                  </div>
                </div>
              )}

              {/* Protected work stops being a blurred card asking for an
                  email and becomes what it is: a named piece of evidence, next
                  to a real photograph of the thing, held back rather than
                  hidden. Four of these have the strongest images on the site,
                  and turning them into bare text lines threw those away. */}
              {c.protectedWork.length > 0 && (
                <div className="mt-14">
                  <Reveal>
                    <div className="flex items-baseline gap-3 mb-6">
                      <p className="text-caption text-[10px]">
                        Protected, {c.protectedWork.length}
                      </p>
                      <span className="text-caption text-[10px] opacity-45">
                        it belongs to the club, so it is named rather than opened
                      </span>
                    </div>
                  </Reveal>
                  <ul className="space-y-px bg-border/50">
                    {c.protectedWork.map((a, i) => {
                      const image = a.previewImage ?? a.previewImages?.[0];
                      return (
                        <Reveal key={a.slug} delay={0.05 * i}>
                          <li className="grid grid-cols-[104px,1fr] sm:grid-cols-[200px,1fr] gap-5 sm:gap-8 items-center bg-background p-4 sm:p-5">
                            <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-[hsl(var(--charcoal-deep))]">
                              {image && (
                                <img
                                  src={image}
                                  alt=""
                                  aria-hidden
                                  className="absolute inset-0 w-full h-full object-cover"
                                  style={{ filter: "blur(3px) saturate(0.75)", transform: "scale(1.08)" }}
                                  loading="lazy"
                                />
                              )}
                              <div
                                aria-hidden
                                className="absolute inset-0"
                                style={{ background: "hsl(var(--charcoal-deep) / 0.45)" }}
                              />
                              <span className="absolute inset-0 flex items-center justify-center text-[8px] tracking-[0.35em] uppercase font-display text-[hsl(var(--ivory)/0.7)]">
                                Protected
                              </span>
                            </div>
                            <div className="min-w-0">
                              <h3 className="font-display text-base md:text-lg font-medium text-foreground">
                                {a.title}
                              </h3>
                              <p className="text-body text-sm mt-1.5 max-w-xl">{a.whatItProves}</p>
                              <p className="text-caption text-[10px] opacity-50 mt-2.5">{a.category}</p>
                            </div>
                          </li>
                        </Reveal>
                      );
                    })}
                  </ul>
                </div>
              )}

              {/* Two unbuilt things, named once, in plain sentences. As cards
                  they were two more locked boxes in a page that had eight. */}
              {c.building.length > 0 && (
                <Reveal delay={0.1}>
                  <div className="mt-12 pt-7 border-t border-border/50 max-w-2xl">
                    <p className="text-caption text-[10px] mb-4">Being built</p>
                    <ul className="space-y-3">
                      {c.building.map((a) => (
                        <li key={a.slug} className="text-body text-sm leading-relaxed">
                          <span className="text-foreground font-medium">{a.title}.</span>{" "}
                          {a.description}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              )}
            </section>
          ))}
        </div>
      </section>

      {/* Field notes, the raw end of the ladder. Kept deliberately plain:
          these are observations, not products, and dressing them up as
          cards would misrepresent what they are. Renders nothing until
          there is something to show. */}
      {fieldNotes.length > 0 && (
        <section className="section-padding pb-4">
          <div className="max-content">
            <Reveal>
              <div className="flex items-baseline justify-between gap-4 mb-8">
                <p className="text-caption">From the floor</p>
                <span className="text-caption text-[10px] opacity-50">
                  {fieldNotes.length} {fieldNotes.length === 1 ? "note" : "notes"}
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-body max-w-xl mb-10">
                Observations caught inside real environments, kept raw on purpose.
                Some stay notes. Some become the systems above.
              </p>
            </Reveal>
            <ul className="max-w-3xl">
              {fieldNotes.map((n, i) => (
                <Reveal key={n.slug} delay={0.05 * i}>
                  <li
                    className="py-6 grid sm:grid-cols-[1fr,auto] gap-x-8 gap-y-2 items-baseline"
                    style={{ borderTop: "1px solid hsl(var(--subtle-border))" }}
                  >
                    <div>
                      <h3 className="font-display text-base font-medium text-foreground">
                        {n.title}
                      </h3>
                      <p className="text-body text-sm mt-1.5">{n.body}</p>
                    </div>
                    <span className="text-caption text-[10px] opacity-55 whitespace-nowrap">
                      {environmentMeta[n.environment].short}
                    </span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* CTA */}
      <div className="section-padding max-content">
        <div className="divider" />
      </div>
      {/* The close.
          This said "This is what gets built. Here's how it gets bought."
          Clever, and cold: it points at the visitor's wallet at the exact
          moment they have been reading about players, and it makes the whole
          page retroactively feel like a sales funnel. What someone actually
          wonders here is whether their own environment could work like this. */}
      <section className="section-padding section-spacing">
        <div className="max-content text-center">
          <Reveal>
            <h2 className="text-headline max-w-2xl mx-auto">
              Every one of these started with someone describing a problem.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-body-lg max-w-lg mx-auto mt-5">
              None of it was built in advance. If something here looks like the
              thing your environment is missing, that's usually the beginning of
              the conversation.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <Magnetic as="span" strength={7}>
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center px-10 py-4 bg-foreground text-background font-display text-sm font-medium tracking-wide transition-all duration-300 hover:opacity-85"
                >
                  How the work usually starts
                </Link>
              </Magnetic>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 py-2 font-display text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                Or just tell me the problem
                <span aria-hidden>→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <ResourceModal artefact={open} onClose={() => setOpen(null)} />
    </Layout>
  );
};

export default Work;
