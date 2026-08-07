import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/motion/Magnetic";
import { motion } from "framer-motion";
import sceneMethod from "@/assets/scene-method-podium.jpg";
import AudienceSelector from "@/components/sections/AudienceSelector";

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

const principles = [
  {
    label: "Diagnostic before prescription",
    text: "Every engagement begins by understanding the environment as it actually operates, not as it appears on paper.",
  },
  {
    label: "Built for the floor",
    text: "Systems are judged by whether athletes and staff use them under fatigue, travel and competition pressure.",
  },
  {
    label: "Quiet, long-horizon work",
    text: "Partnerships are designed to compound. No noise, no hype, no products to download.",
  },
];

const processSteps = [
  {
    label: "Discover",
    text: "Understand the environment, the people, the constraints and the real question behind the brief.",
  },
  {
    label: "Audit",
    text: "Map the current nutrition operation across performance, medical, catering and athlete touchpoints.",
  },
  {
    label: "Design",
    text: "Build the system, frameworks, tools, ownership, to fit the environment, not the textbook.",
  },
  {
    label: "Implementation",
    text: "Embed the system on the floor, with staff and athletes, through real training weeks.",
  },
  {
    label: "Review",
    text: "Measure adherence, surface friction, refine. Systems are revisited, not handed over and forgotten.",
  },
];

const ecosystem = [
  { label: "Applied Work", state: "Live", to: "/work", note: "Proof objects from real environments." },
  { label: "Consulting", state: "Live", to: "/services", note: "Strategic engagements for organisations." },
  { label: "Resources", state: "Live", to: "/work", note: "Public tools originated from applied work." },
  { label: "Technology", state: "In Development", to: null, note: "FuelOps, operating tools for performance staff." },
  { label: "Research", state: "Future", to: null, note: "Field-driven applied performance nutrition research." },
];

const Services = () => {
  return (
    <Layout>
      <SEO title="Services, GN Performance Systems" description="Embedded engagements, diagnostics, education programmes and advisory for high-performance environments." path="/services" />
      {/* Hero, Why */}
      <section className="section-padding section-spacing">
        <div className="max-content">
          <Reveal>
            <p className="text-caption mb-6">Consulting · GN Performance Systems</p>
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

      {/* Principles */}
      <section className="section-padding section-spacing-sm">
        <div className="max-content">
          <Reveal>
            <p className="text-caption mb-10">01, Philosophy</p>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-10 md:gap-12">
            {principles.map((p, i) => (
              <Reveal key={p.label} delay={i * 0.08}>
                <div className="space-y-3">
                  <p className="text-caption text-[10px]">0{i + 1}</p>
                  <h3 className="font-display text-lg font-medium text-foreground">
                    {p.label}
                  </h3>
                  <p className="text-body text-sm">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="section-padding max-content">
        <div className="divider" />
      </div>

      {/* Services */}
      <section className="section-padding section-spacing">
        <div className="max-content space-y-10 md:space-y-14">
          <div>
            <Reveal>
              <p className="text-caption">02, Strategic Engagements</p>
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
                <article
                  className={`group relative border border-border/60 bg-card/40 hover:bg-card/70 transition-colors duration-500 ${
                    s.flagship ? "border-foreground/25" : ""
                  }`}
                >
                  {s.flagship && (
                    <div className="absolute top-0 left-0 h-px w-16 bg-foreground/60" />
                  )}
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
                        <span className="text-foreground font-medium">{s.title}.</span>{" "}
                        {s.positioning}
                      </p>

                      <div className="grid md:grid-cols-2 gap-8 md:gap-12 pt-2">
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

                      <div className="pt-1">
                        <p className="text-caption text-[10px] mb-2">How it runs</p>
                        <p className="text-body text-xs text-muted-foreground max-w-2xl leading-relaxed">
                          {s.deliverables.join("   ·   ")}
                        </p>
                      </div>

                      <div className="pt-3 flex flex-col sm:flex-row sm:items-center gap-x-5 gap-y-2.5">
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
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="section-padding max-content">
        <div className="divider" />
      </div>

      {/* Process */}
      <section className="section-padding section-spacing-sm">
        <div className="max-content">
          <Reveal>
            <div className="flex items-baseline justify-between gap-6 flex-wrap mb-14 md:mb-20">
              <p className="text-caption">03, How Collaboration Works</p>
              <p className="text-caption text-[10px] text-muted-foreground">
                A loop, not a handover
              </p>
            </div>
          </Reveal>

          <div className="relative">
            {/* forward line, drawn through the steps on scroll */}
            <motion.div
              aria-hidden
              className="hidden md:block absolute top-[19px] left-[10%] right-[10%] h-px origin-left"
              style={{ background: "hsl(var(--olive) / 0.6)" }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.3, ease: [0.25, 0.1, 0.25, 1] }}
            />
            <ol className="grid md:grid-cols-5 gap-5 md:gap-4">
              {processSteps.map((step, i) => (
                <Reveal key={step.label} delay={i * 0.1}>
                  <li className="relative flex md:flex-col items-stretch md:items-center gap-4 md:gap-0 md:text-center">
                    {/* number, with a connector down to the next step on mobile */}
                    <div className="relative flex flex-col items-center md:block shrink-0">
                      <span
                        className="relative z-[1] flex items-center justify-center w-10 h-10 rounded-full font-display text-[11px] tabular-nums"
                        style={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--olive) / 0.5)", color: "hsl(var(--olive))" }}
                      >
                        0{i + 1}
                      </span>
                      {i < processSteps.length - 1 && (
                        <span
                          aria-hidden
                          className="md:hidden w-px flex-1 mt-1"
                          style={{ background: "hsl(var(--olive) / 0.3)" }}
                        />
                      )}
                    </div>
                    <div className="md:mt-5 pb-1 md:pb-0">
                      <h3 className="font-display text-base md:text-lg font-medium text-foreground tracking-tight">
                        {step.label}
                      </h3>
                      <p className="text-body text-sm mt-2 md:mt-3 leading-relaxed md:px-1">
                        {step.text}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>

            {/* mobile: the cycle, in one clear line */}
            <div className="md:hidden mt-5 flex items-center gap-2.5 pl-[3px]">
              <span className="text-base leading-none" style={{ color: "hsl(var(--olive))" }} aria-hidden>↺</span>
              <span className="text-[10px] tracking-[0.2em] uppercase font-display" style={{ color: "hsl(var(--olive))" }}>
                Revisited, not handed over
              </span>
            </div>

            {/* the loop, systems come back rather than getting handed over */}
            <div className="hidden md:block relative mt-6" aria-hidden>
              <svg viewBox="0 0 1000 92" className="w-full h-auto">
                <motion.path
                  d="M905 12 C 905 74, 640 82, 500 82 C 360 82, 95 74, 95 16"
                  fill="none"
                  stroke="hsl(var(--olive) / 0.45)"
                  strokeWidth="1.4"
                  strokeDasharray="5 6"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.6, delay: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                />
                <motion.path
                  d="M95 16 l -6 8 M95 16 l 6 8"
                  fill="none"
                  stroke="hsl(var(--olive) / 0.7)"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 2.1 }}
                />
              </svg>
              <p
                className="absolute left-1/2 -translate-x-1/2 bottom-0 px-3 text-caption text-[10px]"
                style={{ color: "hsl(var(--olive))", background: "hsl(var(--background))" }}
              >
                Revisited, not handed over
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="section-padding max-content">
        <div className="divider" />
      </div>

      {/* Ecosystem */}
      <section className="section-padding section-spacing-sm">
        <div className="max-content">
          <Reveal>
            <div className="flex items-baseline justify-between gap-6 flex-wrap mb-3">
              <p className="text-caption">04, The Wider Ecosystem</p>
              <p className="text-caption text-[10px] text-muted-foreground">
                GN Performance Systems
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-body-lg max-w-2xl mb-12 md:mb-14">
              Consulting is one layer of a longer-term ecosystem. Applied work feeds
              public resources, operational tools and field-driven research. Some
              layers are already standing, others are still being built.
            </p>
          </Reveal>

          <div className="space-y-3 md:space-y-4">
            {ecosystem.map((e, i) => {
              const live = e.state === "Live";
              const dev = e.state === "In Development";
              const border = live
                ? "1px solid hsl(var(--foreground) / 0.22)"
                : dev
                ? "1px dashed hsl(var(--olive) / 0.55)"
                : "1px dotted hsl(var(--foreground) / 0.28)";
              const inner = (
                <div
                  className="relative flex items-center gap-4 md:gap-8 rounded-lg px-5 md:px-8 py-5 md:py-6 transition-colors duration-300"
                  style={{
                    border,
                    background: live ? "hsl(var(--card) / 0.55)" : "transparent",
                    opacity: live ? 1 : dev ? 0.72 : 0.5,
                  }}
                >
                  <span className="text-caption text-[10px] tabular-nums w-6 shrink-0">0{i + 1}</span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-x-3 gap-y-1 flex-wrap">
                      <h3 className="font-display text-lg md:text-xl font-medium text-foreground tracking-tight">
                        {e.label}
                      </h3>
                      <span
                        className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase font-display"
                        style={{ color: live ? "hsl(var(--olive))" : "hsl(var(--muted-foreground))" }}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{
                            background: live ? "hsl(var(--olive))" : "transparent",
                            border: live ? "none" : "1px solid hsl(var(--muted-foreground) / 0.7)",
                          }}
                        />
                        {e.state}
                      </span>
                    </div>
                    <p className="text-body text-sm mt-1.5">{e.note}</p>
                  </div>
                  {e.to && (
                    <span aria-hidden className="shrink-0 text-foreground/70 opacity-0 group-hover:opacity-100 transition-opacity">
                      →
                    </span>
                  )}
                </div>
              );
              return (
                <Reveal key={e.label} delay={i * 0.08}>
                  {e.to ? (
                    <Link to={e.to} className="block group">{inner}</Link>
                  ) : (
                    <div className="group">{inner}</div>
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Closing callout, full-width dark */}
      <section className="section-dark relative overflow-hidden">
        <div className="scene-grain absolute inset-0 pointer-events-none" />
        <div className="section-padding section-spacing relative">
          <div className="max-content">
            <Reveal>
              <p className="text-caption mb-10">05, Invitation</p>
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