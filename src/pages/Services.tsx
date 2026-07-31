import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/motion/Magnetic";
import { motion } from "framer-motion";
import sceneMethod from "@/assets/scene-method-podium.jpg";

type Service = {
  index: string;
  tag: string;
  title: string;
  positioning: string;
  problem: string;
  audience: string;
  outcomes: string[];
  deliverables: string[];
  cta: string;
  flagship?: boolean;
};

const services: Service[] = [
  {
    index: "01",
    tag: "Flagship engagement",
    title: "Football Nutrition Audit & Systems Review",
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
              Strategic partnerships for environments that take nutrition seriously.
            </h1>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="text-body-lg max-w-2xl mt-8">
              Three focused engagements for football clubs, performance
              departments and elite environments. Each one is built around the
              same question: is nutrition working as a system here, or only on
              paper?
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
          <Reveal>
            <div className="flex items-baseline justify-between gap-6 flex-wrap">
              <p className="text-caption">02, Strategic Engagements</p>
              <p className="text-caption text-[10px] text-muted-foreground">
                Three offerings · By invitation & enquiry
              </p>
            </div>
          </Reveal>

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
                    <div className="space-y-8">
                      <header className="space-y-4">
                        <h2 className="font-display text-2xl md:text-3xl font-medium leading-tight tracking-tight text-foreground">
                          {s.title}
                        </h2>
                        <p className="text-body-lg max-w-2xl">{s.positioning}</p>
                      </header>

                      <div className="grid md:grid-cols-2 gap-8 md:gap-10">
                        <div className="space-y-2">
                          <p className="text-caption text-[10px]">The problem it solves</p>
                          <p className="text-body text-sm">{s.problem}</p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-caption text-[10px]">Who it is for</p>
                          <p className="text-body text-sm">{s.audience}</p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8 md:gap-10">
                        <div className="space-y-3">
                          <p className="text-caption text-[10px]">Expected outcomes</p>
                          <ul className="space-y-2">
                            {s.outcomes.map((o) => (
                              <li key={o} className="flex gap-3 text-body text-sm">
                                <span className="mt-2 h-px w-4 bg-foreground/40 shrink-0" />
                                <span>{o}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="space-y-3">
                          <p className="text-caption text-[10px]">Deliverables</p>
                          <ul className="space-y-2">
                            {s.deliverables.map((d) => (
                              <li key={d} className="flex gap-3 text-body text-sm">
                                <span className="mt-2 h-px w-4 bg-foreground/40 shrink-0" />
                                <span>{d}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="pt-2">
                        <Link
                          to="/contact"
                          className="group/cta inline-flex items-center gap-3 text-sm font-display font-medium text-foreground"
                        >
                          <span className="link-underline">{s.cta}</span>
                          <span
                            aria-hidden
                            className="inline-block transition-transform duration-300 group-hover/cta:translate-x-1"
                          >
                            →
                          </span>
                        </Link>
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
            <ol className="grid md:grid-cols-5 gap-10 md:gap-4">
              {processSteps.map((step, i) => (
                <Reveal key={step.label} delay={i * 0.1}>
                  <li className="relative flex flex-col items-start md:items-center md:text-center">
                    <span
                      className="relative z-[1] flex items-center justify-center w-10 h-10 rounded-full font-display text-[11px] tabular-nums shrink-0"
                      style={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--olive) / 0.5)", color: "hsl(var(--olive))" }}
                    >
                      0{i + 1}
                    </span>
                    <h3 className="font-display text-base md:text-lg font-medium text-foreground tracking-tight mt-5">
                      {step.label}
                    </h3>
                    <p className="text-body text-sm mt-3 leading-relaxed md:px-1">
                      {step.text}
                    </p>
                  </li>
                </Reveal>
              ))}
            </ol>

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