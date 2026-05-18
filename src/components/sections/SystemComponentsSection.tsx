import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Reveal from "@/components/Reveal";
import Chapter from "@/components/motion/Chapter";

const stages = [
  { title: "Assess", desc: "Understand the athlete, context, routine, needs and constraints." },
  { title: "Translate", desc: "Turn science, data and feedback into simple practical language." },
  { title: "Structure", desc: "Build fueling, hydration, recovery and matchday routines that fit real environments." },
  { title: "Monitor", desc: "Track progress, adherence, body composition, feedback and practical signals." },
  { title: "Educate", desc: "Build athlete autonomy, literacy and confidence through clear resources." },
  { title: "Embed", desc: "Make nutrition part of the team culture, not an extra task." },
];

const SystemComponentsSection = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="section-padding py-16 md:py-20">
      <div className="max-content">
        <Reveal>
          <Chapter number="05" title="Operating system." tone="light" className="mb-6" />
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-xl md:text-2xl font-semibold text-foreground max-w-2xl mb-2">
            Performance Nutrition Operating System.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-body text-sm max-w-lg mb-8 opacity-65">
            From context to behaviour. From knowledge to repeatable action.
          </p>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="flex flex-wrap items-start gap-y-4">
            {stages.map((s, i) => {
              const isHovered = hoveredIdx === i;
              return (
                <div key={s.title} className="flex items-center">
                  <div
                    className="relative cursor-default"
                    onMouseEnter={() => setHoveredIdx(i)}
                    onMouseLeave={() => setHoveredIdx(null)}
                  >
                    <motion.span
                      className="font-display text-sm md:text-base font-medium tracking-wide"
                      animate={{
                        opacity: hoveredIdx !== null && !isHovered ? 0.35 : 1,
                        color: isHovered ? "hsl(var(--olive-light))" : "hsl(var(--foreground))",
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {s.title}
                    </motion.span>
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          className="absolute top-full left-0 mt-3 w-56 md:w-64 z-10"
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.25 }}
                        >
                          <div className="p-4 border border-border/50 bg-background shadow-lg">
                            <p className="text-[10px] tracking-[0.25em] uppercase font-display opacity-40 mb-1.5">
                              0{i + 1} — {s.title}
                            </p>
                            <p className="text-body text-xs leading-relaxed opacity-75">
                              {s.desc}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  {i < stages.length - 1 && (
                    <span className="mx-2 md:mx-3 text-muted-foreground/30 text-xs select-none">→</span>
                  )}
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default SystemComponentsSection;
