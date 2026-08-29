import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/motion/Magnetic";
import { motion } from "framer-motion";
import AudienceSelector from "@/components/sections/AudienceSelector";
import MatchdayPlanner from "@/components/sections/MatchdayPlanner";
import Em from "@/components/text/Em";
import PlanGrid from "@/components/motion/PlanGrid";
import StandardStatement from "@/components/sections/StandardStatement";

/** The shape is the message: five stages, and the last returns to the first. */
const processSteps = [
  { label: "Discover" },
  { label: "Audit" },
  { label: "Design" },
  { label: "Implementation" },
  { label: "Review" },
];

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
              but the question underneath never does:{" "}
              <Em>is nutrition working as a system here, or only on paper?</Em>
            </p>
          </Reveal>
          {/* The filter, stated before the offer.
              The six doors answer "which of these am I". They do not answer
              the question that actually decides whether the work goes well,
              which is not what somebody does for a living but how they think
              about spending money on getting better. Somebody weighing price
              against their bank balance and somebody weighing it against what
              it returns are two different clients, and only one of them
              finishes. Saying so here costs the wrong client a click and saves
              both of us a season.

              The guarantee is the other half of it. Selectivity without risk
              on my side is just a way of sounding expensive. */}
          <Reveal delay={0.3}>
            <div
              className="mt-10 max-w-2xl p-6 md:p-7"
              style={{ background: "hsl(41 40% 96%)", border: "1px solid hsl(var(--subtle-border))" }}
            >
              <p className="text-caption text-[10px] mb-3">Who this works for</p>
              <p className="text-body">
                People with a purpose, who read a number against what it gives
                back rather than against what it costs, and who are willing to
                be disciplined about the part that is theirs. Not everybody, and
                not the people who need convincing.
              </p>
              <p className="text-body mt-4">
                If I do not add value, I give the money back. I would rather
                carry that risk than have you carry it, because if I am not sure
                I can help you, I should not be taking the work.
              </p>
            </div>
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

      {/* The statement band owns its own scene and its own scroll length now,
          because the sequence inside it is what decides both. */}
      <StandardStatement />

      {/* The three engagements that used to stand here are gone as a section.
          They were a second taxonomy of the same work sitting under the six
          doors, so a stranger had to read both and map one onto the other.
          They now live inside the door they belong to, under "How it runs",
          with the photograph of what each one produces. */}

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
              <p className="text-caption">How collaboration works</p>
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
            {/* The knockout has to sit on the whole item, not on the label
                alone. With the background only behind the word, the rule ran
                straight through the step number and through the gap beside it,
                which read as a line drawn over the text by mistake. */}
            <ol className="relative flex flex-wrap items-center gap-x-1 gap-y-4 md:justify-between">
              {processSteps.map((step, i) => (
                <li
                  key={step.label}
                  className="flex items-center gap-2.5 md:px-3"
                  style={{ background: "hsl(var(--background))" }}
                >
                  <span
                    className="font-display text-[10px] tabular-nums"
                    style={{ color: "hsl(var(--olive) / 0.75)" }}
                  >
                    0{i + 1}
                  </span>
                  <span className="font-display text-base md:text-xl font-medium text-foreground tracking-tight">
                    {step.label}
                  </span>
                  {i < processSteps.length - 1 && (
                    <span aria-hidden className="md:hidden text-muted-foreground pl-1.5">·</span>
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
              <p className="text-caption mb-10">Invitation</p>
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