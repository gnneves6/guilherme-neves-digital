import { motion } from "framer-motion";
import { useState } from "react";
import Reveal from "@/components/Reveal";

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
    <section className="section-padding section-spacing">
      <div className="max-content">
        <Reveal>
          <p className="text-caption mb-4">Operating System</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-headline max-w-2xl mb-4">
            Performance Nutrition Operating System.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-body-lg max-w-lg mb-14">
            From context to behaviour. From knowledge to repeatable action.
          </p>
        </Reveal>

        {/* Flow indicator */}
        <Reveal delay={0.25}>
          <div className="hidden md:flex items-center gap-3 mb-6 text-[10px] tracking-[0.3em] uppercase font-display opacity-40">
            {stages.map((s, i) => (
              <span key={s.title} className="flex items-center gap-3">
                {s.title}
                {i < stages.length - 1 && <span>→</span>}
              </span>
            ))}
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border/50">
          {stages.map((c, i) => {
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
                    scale: isHovered ? 1.015 : isReceded ? 0.985 : 1,
                    opacity: isReceded ? 0.55 : 1,
                  }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  style={{
                    boxShadow: isHovered
                      ? "0 24px 60px -16px hsl(var(--foreground) / 0.1)"
                      : "none",
                  }}
                >
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-px"
                    style={{ background: "hsl(var(--olive) / 0.6)", transformOrigin: "left" }}
                    animate={{ scaleX: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                  <div className="flex items-baseline justify-between mb-5">
                    <p className="text-caption text-[10px] opacity-40">
                      0{i + 1} — Stage
                    </p>
                    {i < stages.length - 1 && (
                      <span className="text-[10px] opacity-30 font-display">→ {stages[i + 1].title}</span>
                    )}
                  </div>
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