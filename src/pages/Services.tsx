import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/motion/Magnetic";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import sceneMethod from "@/assets/scene-method-podium.jpg";
import AudienceSelector from "@/components/sections/AudienceSelector";
import MatchdayPlanner from "@/components/sections/MatchdayPlanner";

type Service = {
  index: string;
  tag: string;
  title: string;
  outcome: string;
  format: string;
  forWhom: string;
  positioning: string;
  problem: string;
  audience: string;
  outcomes: string[];
  deliverables: string[];
  cta: string;
  ctaMicro: string;
  flagship?: boolean;
};

const services: Service[] = [
  {
    index: "01",
    tag: "Flagship engagement",
    title: "Football Nutrition Audit & Systems Review",
    outcome: "A clear map of what's working, what's leaking, and what to fix first.",
    format: "4–6 weeks · on-site + remote",
    forWhom: "Clubs · Federations · Performance departments",
    ctaMicro: "Starts with a short scoping call, no obligation.",
    positioning:
      "A structured diagnostic of how nutrition is actually delivered inside a football environment, from staff workflow to athlete experience.",
    problem:
      "Most clubs do not lack nutrition knowledge. They lack a clear picture of how nutrition is operating across performance, medical, catering and player-facing touchpoints, and where it quietly breaks down.",
    audience:
      "Professional and academy football clubs, federations and high-performance departments seeking an external, evidence-based read on their current nutrition operation.",
    outcomes: [
      "Mapped view of the current nutrition system across departments",
      "Identified friction points, gaps and duplication in delivery",
      "Prioritised recommendations the staff can actually act on",
      "A written systems review document for internal use",
    ],
    deliverables: [
      "On-site and remote diagnostic across 4–6 weeks",
      "Stakeholder interviews across performance, medical, catering and player groups",
      "Written systems review document and executive summary",
      "Closing presentation with prioritised roadmap",
    ],
    cta: "Request the audit overview",
    flagship: true,
  },
  {
    index: "02",
    tag: "Ongoing partnership",
    title: "Performance Nutrition Systems",
    outcome: "Nutrition that runs every week, not just on match day.",
    format: "Season-long · retained",
    forWhom: "Performance departments · Elite athletes",
    ctaMicro: "Starts from your calendar, never a template.",
    positioning:
      "Design and implementation of practical nutrition systems that survive real training weeks, travel, congested fixtures and human reality.",
    problem:
      "Documents and protocols rarely fail on the science. They fail on the floor, when fatigue, schedule, catering reality and athlete habits collide with the plan.",
    audience:
      "Performance departments and individual elite athletes who need their nutrition operation to function consistently, not occasionally.",
    outcomes: [
      "Matchday, training-week and travel fuelling frameworks",
      "Athlete-facing tools designed for in-context use",
      "Hydration, body composition and recovery touchpoints",
      "Clear ownership: who does what, when, and how it is tracked",
    ],
    deliverables: [
      "Quarterly or season-long retained partnership",
      "Custom matchday, travel and training-week frameworks",
      "Athlete-facing tools and staff playbooks",
      "Recurring review cycles and adjustments",
    ],
    cta: "Discuss a partnership",
  },
  {
    index: "03",
    tag: "Education programme",
    title: "Education & Workshops",
    outcome: "Players who own their fuelling, in a language your whole staff shares.",
    format: "Single or multi-session",
    forWhom: "Clubs · Academies · National teams",
    ctaMicro: "Built for your group, not a generic talk.",
    positioning:
      "Closed-door education built for athletes, staff and parent groups inside performance environments, not generic talks.",
    problem:
      "Athletes are repeatedly told what to eat. They are rarely shown how to think, decide and adapt around food in the context of their own sport, schedule and body.",
    audience:
      "Clubs, academies, national teams and performance institutes that want their athletes and staff to share a common, applied nutrition language.",
    outcomes: [
      "Tailored sessions for athletes, staff or parents",
      "Tools and visuals designed for retention, not slides",
      "A shared internal vocabulary around fuelling decisions",
      "Follow-up material the environment continues to use",
    ],
    deliverables: [
      "Single sessions or multi-session programmes",
      "Audience-specific content for athletes, staff or parents",
      "Printable and digital follow-up materials",
      "Optional integration with an ongoing systems engagement",
    ],
    cta: "Plan a programme",
  },
];

/** The shape is the message: five stages, and the last returns to the first. */
const processSteps = [
  { label: "Discover" },
  { label: "Audit" },
  { label: "Design" },
  { label: "Implementation" },
  { label: "Review" },
];

/**
 * One engagement, folded.
 *
 * Each of these cards carried the outcome, the positioning, the problem, four
 * outcomes with tick marks, the full delivery list and the call to action, all
 * open at once. Three of them ran about 2400px, on a page that was already the
 * longest on the site, and almost nobody reads a proposal they did not ask for.
 *
 * What stays open is what a buyer scans on the way past: who it is for, how
 * long it takes, what they walk away with, and how to start. The detail is one
 * click away for the one reader in ten who is actually deciding, and it is the
 * same detail as before, not a summary of it.
 */
const ServiceCard = ({ service: s }: { service: Service }) => {
  const [open, setOpen] = useState(false);
  const panelId = `service-detail-${s.index}`;

  return (
    <article
      className={`group relative border border-border/60 bg-card/40 hover:bg-card/70 transition-colors duration-500 ${
        s.flagship ? "border-foreground/25" : ""
      }`}
    >
      {s.flagship && <div className="absolute top-0 left-0 h-px w-16 bg-foreground/60" />}
      <div className="grid md:grid-cols-[180px,1fr] gap-8 md:gap-12 p-8 md:p-12">
        {/* Index column */}
        <div className="space-y-3 md:border-r md:border-border/40 md:pr-8">
          <p className="font-display text-5xl md:text-6xl font-medium leading-none text-foreground/90">
            {s.index}
          </p>
          <p className="text-caption text-[10px]">{s.tag}</p>
        </div>

        {/* Body */}
        <div className="space-y-6">
          {/* who it is for + format, sets expectation up front */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-[10px] tracking-[0.2em] uppercase font-display" style={{ color: "hsl(var(--olive))" }}>
              {s.forWhom}
            </span>
            <span className="text-caption text-[10px] text-muted-foreground">{s.format}</span>
          </div>

          {/* the outcome, what the client actually walks toward */}
          <h3 className="font-display text-2xl md:text-[28px] lg:text-[32px] font-semibold leading-[1.15] tracking-tight text-foreground max-w-3xl">
            {s.outcome}
          </h3>

          <p className="text-body text-sm max-w-2xl leading-relaxed">
            <span className="text-foreground font-medium">{s.title}.</span> {s.positioning}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-x-5 gap-y-2.5">
            <Magnetic as="span" strength={6}>
              <Link
                to="/contact"
                className={`group/cta inline-flex items-center gap-2.5 px-6 py-3 rounded-md font-display text-sm font-medium tracking-wide transition-all duration-300 ${
                  s.flagship
                    ? "bg-foreground text-background hover:opacity-90"
                    : "border border-foreground/25 text-foreground hover:border-foreground/50"
                }`}
              >
                {s.cta}
                <span aria-hidden className="inline-block transition-transform duration-300 group-hover/cta:translate-x-1">→</span>
              </Link>
            </Magnetic>
            <span className="text-caption text-[10px] text-muted-foreground">{s.ctaMicro}</span>
          </div>

          <div className="pt-1">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls={panelId}
              className="inline-flex items-center gap-2.5 py-2 font-display text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              {open ? "Hide the detail" : "What's involved"}
              <motion.span
                aria-hidden
                className="inline-block"
                animate={{ rotate: open ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                ↓
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  id={panelId}
                  key="panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pt-6 space-y-6">
                    <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                      <div className="space-y-2">
                        <p className="text-caption text-[10px]">The problem we remove</p>
                        <p className="text-body text-sm leading-relaxed">{s.problem}</p>
                      </div>
                      <div className="space-y-3">
                        <p className="text-caption text-[10px]" style={{ color: "hsl(var(--olive))" }}>
                          What you walk away with
                        </p>
                        <ul className="space-y-2.5">
                          {s.outcomes.map((o) => (
                            <li key={o} className="flex gap-2.5 text-body text-sm">
                              <svg width="14" height="14" viewBox="0 0 14 14" className="mt-1 shrink-0" fill="none" aria-hidden>
                                <path d="M3 7.5 L6 10.5 L11 4" stroke="hsl(var(--olive))" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                              <span>{o}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div>
                      <p className="text-caption text-[10px] mb-2">How it runs</p>
                      <p className="text-body text-xs text-muted-foreground max-w-2xl leading-relaxed">
                        {s.deliverables.join("   ·   ")}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </article>
  );
};

const Services = () => {
  return (
    <Layout>
      <SEO title="Working with me, Guilherme Neves" description="Embedded engagements, diagnostics, education programmes and advisory for high-performance environments." path="/services" />
      {/* Hero, Why */}
      <section className="section-padding section-spacing">
        <div className="max-content">
          <Reveal>
            <p className="text-caption mb-6">Working with me</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-display max-w-5xl">
              Work built for environments that take nutrition seriously.
            </h1>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="text-body-lg max-w-2xl mt-8">
              Clubs, the staff inside them, the athletes they carry, and the people
              trying to get into this work. What I do changes with who is asking,
              but the question underneath never does: is nutrition working as a
              system here, or only on paper?
            </p>
          </Reveal>
          <Reveal delay={0.35}>
            <div className="mt-10 flex items-center gap-6 flex-wrap">
              <Link
                to="/work"
                className="text-sm font-display tracking-wide link-underline"
              >
                View the applied work this is built on →
              </Link>
              <span className="text-caption text-[10px] text-muted-foreground">
                Porto / Brussels · By invitation & enquiry
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Sorted by who is arriving, before anything is sold */}
      <AudienceSelector />

      {/* Cinematic statement band */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${sceneMethod})`, filter: "brightness(0.3) contrast(1.1) saturate(0.65)" }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, hsl(var(--charcoal-deep)), hsl(var(--charcoal-deep) / 0.5) 45%, hsl(var(--charcoal-deep)))" }}
        />
        <div className="relative section-padding py-24 md:py-36">
          <div className="max-content">
            <Reveal>
              <p className="text-caption mb-6" style={{ color: "hsl(var(--ivory) / 0.5)" }}>
                The standard
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2
                className="font-display text-2xl md:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight max-w-4xl"
                style={{ color: "hsl(var(--ivory))" }}
              >
                A system that holds when the season gets loud, not a document that
                looks good in a meeting.
              </h2>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding section-spacing">
        <div className="max-content space-y-10 md:space-y-14">
          <div>
            <Reveal>
              <p className="text-caption">01, Strategic Engagements</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-headline max-w-3xl mt-5">
                Three ways to make nutrition{" "}
                <span style={{ color: "hsl(var(--olive-light))", fontStyle: "italic", fontWeight: 300 }}>
                  work in your environment
                </span>
                , not just on paper.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-body-lg max-w-2xl mt-6">
                Each one starts inside your environment and ends with something your
                staff and athletes actually use. Chosen with you, scoped to fit.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-2">
                {["By invitation", "A few partners each season", "Every enquiry reviewed personally"].map((t) => (
                  <span key={t} className="inline-flex items-center gap-2 text-caption text-[10px] text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: "hsl(var(--olive) / 0.7)" }} />
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="space-y-8 md:space-y-10">
            {services.map((s, i) => (
              <Reveal key={s.index} delay={i * 0.08}>
                <ServiceCard service={s} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="section-padding max-content">
        <div className="divider" />
      </div>

      {/* A sample of the work itself, sitting between what can be bought and
          how it runs. It answers "what is it actually like" without a single
          extra paragraph of claim. */}
      <MatchdayPlanner />

      <div className="section-padding max-content">
        <div className="divider" />
      </div>

      {/* Process */}
      <section className="section-padding section-spacing-sm">
        <div className="max-content">
          <Reveal>
            <div className="flex items-baseline justify-between gap-6 flex-wrap mb-10 md:mb-12">
              <p className="text-caption">02, How Collaboration Works</p>
              <p className="text-caption text-[10px] text-muted-foreground">
                A loop, not a handover
              </p>
            </div>
          </Reveal>

          {/* Five steps used to carry a sentence each, a scroll-drawn rule and
              an animated return curve, and took most of a screen to say
              something a buyer reads in three seconds. The shape is the whole
              message here: five stages, and the last one goes back to the
              first. The words alone carry it. */}
          <div className="relative">
            <motion.div
              aria-hidden
              className="hidden md:block absolute top-1/2 left-0 right-0 h-px origin-left"
              style={{ background: "hsl(var(--olive) / 0.35)" }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            />
            <ol className="relative flex flex-wrap items-center gap-x-3 gap-y-4 md:justify-between">
              {processSteps.map((step, i) => (
                <li key={step.label} className="flex items-center gap-3">
                  <span
                    className="font-display text-[10px] tabular-nums"
                    style={{ color: "hsl(var(--olive) / 0.75)" }}
                  >
                    0{i + 1}
                  </span>
                  <span
                    className="font-display text-base md:text-xl font-medium text-foreground tracking-tight md:px-3"
                    style={{ background: "hsl(var(--background))" }}
                  >
                    {step.label}
                  </span>
                  {i < processSteps.length - 1 && (
                    <span aria-hidden className="md:hidden text-muted-foreground">·</span>
                  )}
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-8 flex items-center gap-2.5">
            <span className="text-base leading-none" style={{ color: "hsl(var(--olive))" }} aria-hidden>↺</span>
            <span className="text-[10px] tracking-[0.2em] uppercase font-display" style={{ color: "hsl(var(--olive))" }}>
              Revisited, not handed over
            </span>
          </div>
        </div>
      </section>

      <div className="section-padding max-content">
        <div className="divider" />
      </div>

      {/* Closing callout, full-width dark */}
      <section className="section-dark relative overflow-hidden">
        <div className="scene-grain absolute inset-0 pointer-events-none" />
        <div className="section-padding section-spacing relative">
          <div className="max-content">
            <Reveal>
              <p className="text-caption mb-10">03, Invitation</p>
            </Reveal>
            <Reveal delay={0.1}>
              <blockquote className="font-display text-3xl md:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight max-w-5xl text-[hsl(var(--ivory))]">
                “Not looking for another nutrition document. Looking for a system that people actually use.”
              </blockquote>
            </Reveal>
            <Reveal delay={0.25}>
              <div className="mt-12 flex items-center gap-6 flex-wrap">
                <Magnetic as="span" strength={7}>
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center px-10 py-4 bg-[hsl(var(--ivory))] text-[hsl(var(--charcoal-deep))] font-display text-sm font-medium tracking-wide transition-all duration-300 hover:opacity-90"
                  >
                    Start a conversation
                  </Link>
                </Magnetic>
                <p className="text-caption text-[10px] text-[hsl(var(--ivory)/0.5)]">
                  Enquiries reviewed personally · Porto / Brussels
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;