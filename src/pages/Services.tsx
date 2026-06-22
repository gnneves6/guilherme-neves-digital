import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import Reveal from "@/components/Reveal";

type Service = {
  index: string;
  tag: string;
  title: string;
  positioning: string;
  problem: string;
  audience: string;
  outcomes: string[];
  cta: string;
  flagship?: boolean;
};

const services: Service[] = [
  {
    index: "01",
    tag: "Flagship engagement",
    title: "Football Nutrition Audit & Systems Review",
    positioning:
      "A structured diagnostic of how nutrition is actually delivered inside a football environment — from staff workflow to athlete experience.",
    problem:
      "Most clubs do not lack nutrition knowledge. They lack a clear picture of how nutrition is operating across performance, medical, catering and player-facing touchpoints — and where it quietly breaks down.",
    audience:
      "Professional and academy football clubs, federations and high-performance departments seeking an external, evidence-based read on their current nutrition operation.",
    outcomes: [
      "Mapped view of the current nutrition system across departments",
      "Identified friction points, gaps and duplication in delivery",
      "Prioritised recommendations the staff can actually act on",
      "A written systems review document for internal use",
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
      "Documents and protocols rarely fail on the science. They fail on the floor — when fatigue, schedule, catering reality and athlete habits collide with the plan.",
    audience:
      "Performance departments and individual elite athletes who need their nutrition operation to function consistently, not occasionally.",
    outcomes: [
      "Matchday, training-week and travel fuelling frameworks",
      "Athlete-facing tools designed for in-context use",
      "Hydration, body composition and recovery touchpoints",
      "Clear ownership: who does what, when, and how it is tracked",
    ],
    cta: "Discuss a partnership",
  },
  {
    index: "03",
    tag: "Education programme",
    title: "Education & Workshops",
    positioning:
      "Closed-door education built for athletes, staff and parent groups inside performance environments — not generic talks.",
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
    cta: "Plan a programme",
  },
];

const principles = [
  {
    label: "Diagnostic before prescription",
    text: "Every engagement begins by understanding the environment as it actually operates — not as it appears on paper.",
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

const Services = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding section-spacing">
        <div className="max-content">
          <Reveal>
            <p className="text-caption mb-6">Services</p>
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
        </div>
      </section>

      <div className="section-padding max-content">
        <div className="divider" />
      </div>

      {/* Principles */}
      <section className="section-padding section-spacing-sm">
        <div className="max-content">
          <Reveal>
            <p className="text-caption mb-10">How the work is approached</p>
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
              <p className="text-caption">Engagements</p>
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

      {/* Closing callout — full-width dark */}
      <section className="section-dark relative overflow-hidden">
        <div className="scene-grain absolute inset-0 pointer-events-none" />
        <div className="section-padding section-spacing relative">
          <div className="max-content">
            <Reveal>
              <p className="text-caption mb-10">A closing note</p>
            </Reveal>
            <Reveal delay={0.1}>
              <blockquote className="font-display text-3xl md:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight max-w-5xl text-[hsl(var(--ivory))]">
                “Not looking for another nutrition document. Looking for a system that people actually use.”
              </blockquote>
            </Reveal>
            <Reveal delay={0.25}>
              <div className="mt-12 flex items-center gap-6 flex-wrap">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-10 py-4 bg-[hsl(var(--ivory))] text-[hsl(var(--charcoal-deep))] font-display text-sm font-medium tracking-wide transition-all duration-300 hover:opacity-90"
                >
                  Start a conversation
                </Link>
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