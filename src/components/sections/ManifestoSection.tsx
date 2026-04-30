import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";

const statements = [
  {
    num: "01",
    label: "Before",
    text: "Performance starts before the visible result.",
  },
  {
    num: "02",
    label: "Clarity",
    text: "Clarity beats noise.",
  },
  {
    num: "03",
    label: "Systems",
    text: "Systems turn discipline into repeatable behaviour.",
  },
];

const ManifestoSection = () => {
  return (
    <section className="section-padding section-spacing relative">
      <div className="max-content">
        <Reveal>
          <div className="flex items-baseline justify-between mb-16 md:mb-24">
            <p className="text-caption">Worldview</p>
            <p className="text-[10px] tracking-[0.3em] uppercase font-display opacity-40 hidden md:block">
              Manifesto · Three Statements
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 md:divide-x divide-border/50">
          {statements.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: i * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative pt-10 pb-12 md:py-2 md:px-8 lg:px-12 first:md:pl-0 last:md:pr-0 flex flex-col"
            >
              <div className="flex items-baseline gap-3 mb-8">
                <span
                  className="font-display text-xs tracking-[0.4em]"
                  style={{ color: "hsl(var(--olive))" }}
                >
                  {s.num}
                </span>
                <span className="text-[10px] tracking-[0.35em] uppercase font-display opacity-50">
                  — {s.label}
                </span>
              </div>
              <p className="font-display text-[22px] md:text-[26px] lg:text-[30px] leading-[1.2] tracking-tight font-medium text-foreground min-h-[6rem]">
                {s.text}
              </p>
              <motion.div
                className="mt-8 h-px origin-left"
                style={{ background: "hsl(var(--olive) / 0.55)", maxWidth: "3rem" }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.15 + 0.4 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ManifestoSection;