import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";

const statements = [
  { num: "I", text: "Performance starts before the visible result." },
  { num: "II", text: "Clarity beats noise." },
  { num: "III", text: "Systems turn discipline into repeatable behaviour." },
];

const ManifestoSection = () => {
  return (
    <section className="section-padding section-spacing relative">
      <div className="max-content">
        <Reveal>
          <p className="text-caption mb-16 md:mb-24">Worldview</p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-12 md:gap-16 lg:gap-24">
          {statements.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, delay: i * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative"
            >
              <span
                className="absolute -top-8 left-0 text-[10px] tracking-[0.4em] font-display"
                style={{ color: "hsl(var(--olive-light) / 0.55)" }}
              >
                {s.num}
              </span>
              <p className="font-display text-2xl md:text-[28px] lg:text-[32px] leading-[1.15] tracking-tight font-medium text-foreground">
                {s.text}
              </p>
              <motion.div
                className="mt-6 h-px origin-left"
                style={{ background: "hsl(var(--olive-light) / 0.4)" }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.15 + 0.3 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ManifestoSection;