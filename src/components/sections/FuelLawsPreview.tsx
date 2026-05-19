import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Reveal from "@/components/Reveal";
import Chapter from "@/components/motion/Chapter";

const laws = [
  {
    title: "Fuel",
    micro: "Energy before output.",
    detail: "Every session, every match, every travel day — energy availability is the first decision. Without fuel, nothing else works.",
  },
  {
    title: "Build",
    micro: "Daily base before detail.",
    detail: "Consistent daily structure beats any supplement or trend. Build meals around protein, carbohydrates and real food — then refine.",
  },
  {
    title: "Recover",
    micro: "The next session starts now.",
    detail: "Recovery nutrition is not optional. The window after training is where adaptation happens — protein, carbohydrates, hydration, timing.",
  },
  {
    title: "Hydrate",
    micro: "Flow supports body and brain.",
    detail: "Hydration affects cognition, thermoregulation, and performance before it affects thirst. Build habits, not reactions.",
  },
  {
    title: "Test",
    micro: "No experiments on game day.",
    detail: "Every strategy must be tested in training first. Matchday is for execution, not improvisation. Trust what has been rehearsed.",
  },
];

const FuelLawsPreview = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((a) => (a + 1) % laws.length), 2800);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <section className="section-padding section-spacing scene-cinematic relative overflow-hidden">
      {/* Top dissolve from dim scene above */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-32 z-[1] pointer-events-none"
        style={{ background: "linear-gradient(to bottom, hsl(var(--ivory-dim)), transparent)" }}
      />
      {/* Bottom dissolve to light invitation */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-32 z-[1] pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, hsl(var(--background)))" }}
      />
      <div className="max-content relative z-[2]">
        <Reveal>
          <Chapter number="07" title="GN Fuel Laws." tone="dark" className="mb-10 md:mb-14" />
        </Reveal>
        <div className="grid md:grid-cols-[0.9fr,1.3fr] gap-12 md:gap-20 items-start">
          <div>
            <Reveal delay={0.1}>
              <h2 className="text-headline max-w-md">
                Five laws.<br />One repeatable cycle.
              </h2>
            </Reveal>
            <Reveal delay={0.25}>
              <p className="text-body-lg max-w-md mt-6">
                A practical framework that turns nutrition from information
                into repeatable performance behaviour.
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              <Link
                to="/fuel-laws"
                className="inline-block mt-8 text-body text-sm link-underline hover:text-foreground transition-colors"
              >
                Explore the framework →
              </Link>
            </Reveal>
          </div>

          {/* Living cycle */}
          <Reveal delay={0.2} direction="right">
            <div
              className="relative py-6"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {/* Sequence line */}
              <div className="relative">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-3 md:gap-x-4">
                  {laws.map((law, i) => {
                    const isActive = i === active;
                    return (
                      <div key={law.title} className="flex items-center gap-2 md:gap-4">
                        <button
                          onClick={() => { setActive(i); setPaused(true); }}
                          onMouseEnter={() => setActive(i)}
                          className="relative group focus:outline-none"
                          aria-label={`Activate ${law.title}`}
                        >
                          <motion.span
                            className="font-display font-medium tracking-tight"
                            animate={{
                              opacity: isActive ? 1 : 0.32,
                              fontSize: isActive ? "1.65rem" : "1.05rem",
                              color: isActive ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))",
                            }}
                            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                          >
                            {law.title}
                          </motion.span>
                          <motion.span
                            className="absolute -bottom-1 left-0 right-0 h-px origin-left"
                            style={{ background: "hsl(var(--olive))" }}
                            animate={{ scaleX: isActive ? 1 : 0 }}
                            transition={{ duration: 0.5 }}
                          />
                        </button>
                        {i < laws.length - 1 && (
                          <span className="text-muted-foreground/30 text-xs">→</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Loop arrow */}
              <div className="flex items-center gap-2 mt-2 ml-1">
                <span className="text-muted-foreground/25 text-xs">↺</span>
                <span className="font-display text-[10px] tracking-wide text-muted-foreground/25">Back to Fuel</span>
              </div>

              {/* Active law microcopy */}
              <div className="mt-10 min-h-[80px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                     <p className="text-[10px] tracking-[0.35em] uppercase font-display opacity-50">
                      Law 0{active + 1}
                     </p>
                    <p className="font-display text-xl md:text-2xl font-medium mt-2 leading-snug max-w-md">
                      {laws[active].micro}
                    </p>
                    <p className="text-body text-sm mt-3 opacity-55 leading-relaxed max-w-md">
                      {laws[active].detail}
                    </p>
                  </motion.div>
                </AnimatePresence>

                <div className="mt-6 pt-4 border-t border-border/30">
                  <p className="text-[10px] tracking-[0.35em] uppercase font-display opacity-35">
                    The Loop
                  </p>
                  <p className="text-body text-xs opacity-50 mt-1">
                    Repeat, refine, adapt. Discipline is a cycle, not an event.
                  </p>
                </div>
              </div>

              {/* Progress dots */}
              <div className="flex gap-2 mt-8">
                {laws.map((_, i) => (
                  <motion.div
                    key={i}
                    className="h-px"
                    animate={{
                      width: i === active ? 32 : 12,
                      opacity: i === active ? 1 : 0.25,
                    }}
                    style={{ background: "hsl(var(--foreground))" }}
                    transition={{ duration: 0.5 }}
                  />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default FuelLawsPreview;