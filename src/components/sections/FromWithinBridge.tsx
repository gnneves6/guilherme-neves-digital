import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import Reveal from "@/components/Reveal";
import Chapter from "@/components/motion/Chapter";
import SplitReveal from "@/components/motion/SplitReveal";

const pillars = [
  { num: "01", label: "Diagnostic" },
  { num: "02", label: "Translation" },
  { num: "03", label: "Embedded Systems" },
];

const FromWithinBridge = () => {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const innerY = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);
  const breath = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.9]);

  return (
    <section ref={ref} className="section-padding section-spacing-sm relative overflow-hidden">
      {/* Top dissolve from previous cinematic scene */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-40 z-0 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, hsl(var(--charcoal-deep)), transparent)" }}
      />
      {/* There is no bottom dissolve any more. It used to darken into Selected
          Proof, and that section was removed when the home was cut to seven
          blocks, so it was fading to black in front of the light Invitation:
          a dark stripe across nothing, which also happened to be exactly where
          the three pillars now sit. The top dissolve stays, because Real
          Environments above it really is dark. */}
      <motion.div
        className="max-content relative z-[1]"
        style={reduce ? undefined : { y: innerY, opacity: breath }}
      >
        <Reveal>
          <Chapter
            number="03"
            title="The Practice."
            tone="light"
            className="mb-10 md:mb-14"
            meta={
              <p className="text-[10px] tracking-[0.3em] uppercase font-display opacity-40">
                Thesis
              </p>
            }
          />
        </Reveal>

        {/* The three pillars used to live in the right column of a two-column
            grid, aligned to its top, which parked them seven hundred pixels
            away from the paragraph they belong to and near the ceiling of an
            otherwise empty half. They read as debris rather than as the shape
            of the method. They now sit directly under the words they describe,
            across the full width, where the eye already is. */}
        <Reveal>
          <div className="max-w-3xl">
            <SplitReveal
              text={"Performance nutrition,\nstructured as a system."}
              as="h2"
              splitBy="line"
              stagger={0.12}
              className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.1] tracking-tight text-foreground"
            />
            <p
              className="mt-6 md:mt-8 font-sans text-base md:text-lg leading-relaxed"
              style={{ color: "hsl(var(--foreground) / 0.78)" }}
            >
              Most performance nutrition fails not because the science is wrong,
              but because the delivery is fragile. My work exists to close
              that gap, turning evidence into structures that staff, athletes
              and organisations can actually run.
            </p>
            <p
              className="mt-4 font-display italic text-base md:text-lg"
              style={{ color: "hsl(var(--foreground) / 0.6)" }}
            >
              Diagnose the environment, translate the science, and embed it
              quietly inside the daily routine.
            </p>
          </div>
        </Reveal>

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
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default FromWithinBridge;