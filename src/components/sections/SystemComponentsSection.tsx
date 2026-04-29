import { motion } from "framer-motion";
import { useState } from "react";
import Reveal from "@/components/Reveal";

const components = [
  { title: "Education", desc: "Turning complex nutrition into clear behaviours athletes can repeat." },
  { title: "Fueling", desc: "Structuring energy before key sessions, matches and demanding weeks." },
  { title: "Recovery", desc: "Building post-training and post-match routines that prepare the next output." },
  { title: "Hydration", desc: "Making fluid and electrolyte strategy practical, visible and adaptable." },
  { title: "Monitoring", desc: "Translating measurements and reports into useful decisions." },
  { title: "Culture", desc: "Helping nutrition become part of how a team operates, not an extra task." },
];

const SystemComponentsSection = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="section-padding section-spacing">
      <div className="max-content">
        <Reveal>
          <p className="text-caption mb-4">System Components</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-headline max-w-2xl mb-4">
            One applied system. Six components.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-body-lg max-w-lg mb-14">
            Not isolated services — interconnected parts of a single performance system.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border/50">
          {components.map((c, i) => {
            const isHovered = hoveredIdx === i;
            const isReceded = hoveredIdx !== null && !isHovered;

            return (
              <Reveal key={c.title} delay={i * 0.05}>
                <motion.div
                  className="p-8 md:p-10 bg-background cursor-default relative overflow-hidden h-full"
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  animate={{
                    y: isHovered ? -4 : 0,
                    scale: isHovered ? 1.015 : isReceded ? 0.98 : 1,
                    opacity: isReceded ? 0.45 : 1,
                  }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  style={{
                    boxShadow: isHovered
                      ? "0 24px 60px -16px hsl(var(--foreground) / 0.1)"
                      : "none",
                  }}
                >
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-px bg-foreground/25"
                    animate={{ scaleX: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    style={{ transformOrigin: "left" }}
                  />
                  <p className="text-caption text-[10px] mb-5 opacity-40">0{i + 1}</p>
                  <h3 className="font-display text-lg md:text-xl font-medium text-foreground mb-3">
                    {c.title}
                  </h3>
                  <p className="text-body text-sm opacity-70">{c.desc}</p>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SystemComponentsSection;