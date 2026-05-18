import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import Chapter from "@/components/motion/Chapter";
import SplitReveal from "@/components/motion/SplitReveal";

const pillars = [
  { num: "01", label: "Lived Sport" },
  { num: "02", label: "Nutrition Science" },
  { num: "03", label: "Practical Systems" },
];

const FromWithinBridge = () => {
  return (
    <section className="section-padding section-spacing-sm relative">
      <div className="max-content">
        <Reveal>
          <Chapter
            number="03"
            title="From lived sport to usable systems."
            tone="light"
            className="mb-10 md:mb-14"
            meta={
              <p className="text-[10px] tracking-[0.3em] uppercase font-display opacity-40">
                Bridge
              </p>
            }
          />
        </Reveal>

        <div className="grid md:grid-cols-[1.1fr_1fr] gap-10 md:gap-16 items-start">
          <Reveal>
            <div>
              <SplitReveal
                text={"From lived sport\nto usable systems."}
                as="h2"
                splitBy="line"
                stagger={0.12}
                className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.1] tracking-tight text-foreground"
              />
              <p
                className="mt-6 md:mt-8 font-sans text-base md:text-lg leading-relaxed max-w-xl"
                style={{ color: "hsl(var(--foreground) / 0.78)" }}
              >
                Before I studied performance, I lived the routine: training,
                competition, recovery, pressure and the small decisions that
                shape consistency.
              </p>
              <p
                className="mt-4 font-display italic text-base md:text-lg max-w-xl"
                style={{ color: "hsl(var(--foreground) / 0.6)" }}
              >
                This is where lived sport, nutrition science and practical
                systems meet.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-3 gap-4 md:gap-6 md:pt-2">
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
                <span className="mt-3 font-display text-sm md:text-base leading-snug text-foreground">
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
        </div>

        <Reveal delay={0.3}>
          <p className="mt-12 md:mt-16 text-[11px] tracking-[0.3em] uppercase font-display opacity-50">
            Athlete by nature · Nutritionist by purpose
          </p>
        </Reveal>
      </div>
    </section>
  );
};

export default FromWithinBridge;