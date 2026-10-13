import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import Reveal from "@/components/Reveal";
import Chapter from "@/components/motion/Chapter";
import SplitReveal from "@/components/motion/SplitReveal";

/**
 * The thesis, named.
 *
 * This block used to be called FromWithinBridge and it carried the argument
 * without ever carrying the evidence for it: the chapter label said "Thesis"
 * and the thesis was nowhere on the page. The argument was stated as an
 * opinion, in his own words, which anyone can state. Named, with its
 * references and its two conclusions quoted as written, it stops being an
 * opinion and becomes a defended position.
 *
 * It matters commercially, not only editorially. When a club is being sold
 * nutrition, the thing it is actually being sold is a claim about why nutrition
 * fails inside clubs. He wrote the literature review that argues that claim,
 * and he wrote it before there was anything to sell, which is the one order of
 * events that cannot be faked afterwards.
 *
 * Deliberately not called peer reviewed. It is a final year thematic review,
 * written, supervised and defended. That is accurate and it is strong enough;
 * the stronger word would be the kind of inflation this site exists to avoid.
 */
const pillars = [
  { num: "01", label: "Diagnostic", body: "Read the environment before touching the plan." },
  { num: "02", label: "Translation", body: "Turn the evidence into something that survives a week." },
  { num: "03", label: "Embedded systems", body: "Leave it running when I am no longer in the room." },
];

const ThesisSection = () => {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const innerY = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);
  const breath = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.9]);

  return (
    <section ref={ref} className="section-padding section-spacing-sm relative overflow-hidden">
      <motion.div
        className="max-content relative z-[1]"
        style={reduce ? undefined : { y: innerY, opacity: breath }}
      >
        <Reveal>
          <Chapter
            number="02"
            title="The thesis."
            tone="light"
            className="mb-10 md:mb-14"
            meta={
              <p className="text-[10px] tracking-[0.3em] uppercase font-display opacity-40">
                Thematic review, FCNAUP
              </p>
            }
          />
        </Reveal>

        {/* The premise and the title are one thought, so they are stated
            together. The premise is the best sentence on the site and it used
            to be buried in a meta description. */}
        <Reveal>
          <div className="max-w-3xl">
            <p
              className="font-display text-2xl md:text-3xl lg:text-[2.5rem] font-light leading-[1.2] tracking-tight mb-7 md:mb-9"
              style={{ color: "hsl(var(--foreground) / 0.5)" }}
            >
              Most nutrition advice is correct and useless.
              <br className="hidden sm:block" /> It survives the meeting and dies in the week.
            </p>

            <SplitReveal
              text={"The Influence of Organizational Context\non the Role of the Sports Nutritionist in Football"}
              as="h2"
              splitBy="line"
              stagger={0.12}
              className="font-display text-[1.6rem] md:text-[2rem] lg:text-[2.3rem] font-semibold leading-[1.14] tracking-tight text-foreground"
            />

            <p
              className="mt-6 md:mt-8 font-sans text-base md:text-lg leading-relaxed"
              style={{ color: "hsl(var(--foreground) / 0.78)" }}
            >
              My final year review at the Faculty of Nutrition and Food Sciences
              in Porto. Seventeen references, written and defended before any of
              this was an offer. Two of its conclusions are the whole of what I
              do for a living.
            </p>
          </div>
        </Reveal>

        {/* Quoted as written, not paraphrased. A paraphrase would read as the
            same opinion in nicer clothes, which is what this section replaced. */}
        <Reveal delay={0.1}>
          <div className="mt-10 md:mt-12 max-w-3xl grid gap-6 md:gap-7">
            {[
              "Evidence does not automatically become practice; recommendations require context-sensitive translation, operational reliability and integration into the rhythm of the football environment.",
              "The sports nutritionist should be understood not only as a technical expert, but also as an educator, communicator, coordinator and systems practitioner.",
            ].map((quote) => (
              <blockquote
                key={quote.slice(0, 24)}
                className="border-l pl-5 md:pl-6 font-display text-lg md:text-xl leading-snug"
                style={{ borderColor: "hsl(var(--olive) / 0.5)", color: "hsl(var(--foreground) / 0.85)" }}
              >
                {quote}
              </blockquote>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <p
            className="mt-10 md:mt-12 max-w-3xl font-sans text-base md:text-lg leading-relaxed"
            style={{ color: "hsl(var(--foreground) / 0.78)" }}
          >
            So when nutrition fails inside a club, the science is rarely the
            thing that failed. Access to the athletes, hierarchy, role clarity,
            communication and logistics are. That is what I am brought in to
            fix, and I argued it from the literature before anybody paid me to
            say it.
          </p>
        </Reveal>

        {/* The thesis turned into a way of working. Each pillar carries a line
            now, because three nouns on their own could belong to any
            consultancy and said nothing about how the week actually runs. */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 md:gap-10 mt-12 md:mt-16 pt-10 border-t border-border/50">
          {pillars.map((p, i) => (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex flex-col"
            >
              <span
                className="font-display text-[10px] tracking-[0.4em]"
                style={{ color: "hsl(var(--olive))" }}
              >
                {p.num}
              </span>
              <span className="mt-3 font-display text-lg md:text-2xl font-medium leading-snug tracking-tight text-foreground">
                {p.label}
              </span>
              <motion.div
                className="mt-4 h-px origin-left"
                style={{ background: "hsl(var(--olive) / 0.55)", maxWidth: "2.5rem" }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: i * 0.12 + 0.3 }}
              />
              <span className="mt-4 text-body text-sm leading-relaxed max-w-[32ch]">
                {p.body}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ThesisSection;
