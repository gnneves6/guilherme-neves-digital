import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useReducedMotion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/Reveal";
import Chapter from "@/components/motion/Chapter";
import Scene from "@/components/motion/Scene";
import sceneMethod from "@/assets/scene-method-podium.jpg";

/**
 * Chapter 05 — The Method.
 * Folds the former Operating System (Assess → Embed) and
 * GN Fuel Laws (Fuel → Test) into a single cinematic, two-act chapter.
 * Act I  — The Method (process)
 * Act II — GN Fuel Laws™ (memorable IP loop)
 */

const method = [
  { title: "Assess", desc: "Context, routines, constraints, real-world signals." },
  { title: "Translate", desc: "Science and data become language athletes actually use." },
  { title: "Structure", desc: "Fueling, hydration, recovery, matchday — built to fit." },
  { title: "Educate", desc: "Autonomy through literacy and clear resources." },
  { title: "Monitor", desc: "Adherence, body comp, feedback, practical markers." },
  { title: "Embed", desc: "Nutrition becomes culture, not an extra task." },
];

const laws = [
  { title: "Fuel", micro: "Energy before output.", detail: "Energy availability is the first decision — every session, every match, every travel day." },
  { title: "Build", micro: "Daily base before detail.", detail: "Consistent structure beats any supplement or trend. Real food, then refine." },
  { title: "Recover", micro: "The next session starts now.", detail: "Protein, carbs, hydration, timing. Adaptation lives in the window after training." },
  { title: "Hydrate", micro: "Flow supports body and brain.", detail: "Hydration shapes cognition and performance before thirst arrives." },
  { title: "Test", micro: "No experiments on game day.", detail: "Every strategy is rehearsed first. Matchday is execution, not improvisation." },
];

const TheMethodSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const railX = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  useEffect(() => {
    if (paused || reduce) return;
    const id = setInterval(() => setActive((a) => (a + 1) % laws.length), 2800);
    return () => clearInterval(id);
  }, [paused, reduce]);

  return (
    <Scene
      tone="cinematic"
      spacing="xl"
      grain
      parallax={0.14}
      bgImage={sceneMethod}
      overlayGradient="radial-gradient(ellipse 70% 60% at 50% 40%, hsl(var(--cinematic) / 0.55) 0%, hsl(var(--cinematic) / 0.95) 75%)"
      fadeTopFrom="hsl(var(--cinematic))"
      fadeBottomTo="hsl(var(--background))"
      className="scene-atmos-philosophy"
      contentClassName="section-padding"
    >
      <div ref={ref} className="max-content relative">
        <Reveal>
          <Chapter number="05" title="The Method." tone="dark" className="mb-14 md:mb-20" />
        </Reveal>

        {/* ============ ACT I — The Method ============ */}
        <div className="grid md:grid-cols-[0.85fr,1.15fr] gap-12 md:gap-20 items-start mb-28 md:mb-40">
          <div>
            <Reveal delay={0.05}>
              <p className="text-[10px] tracking-[0.4em] uppercase font-display opacity-45 mb-4">
                Act I — Process
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <h2 className="text-headline max-w-md">
                Six moves.<br />One operating system.
              </h2>
            </Reveal>
            <Reveal delay={0.22}>
              <p className="text-body-lg max-w-md mt-6 opacity-80">
                From context to behaviour. From knowledge to repeatable action —
                the operating system behind every environment I build.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.18}>
            <motion.div style={{ x: reduce ? 0 : railX }} className="relative">
              <ol className="relative border-l border-foreground/15 pl-6 md:pl-8 space-y-7">
                {method.map((m, i) => (
                  <motion.li
                    key={m.title}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    className="group relative"
                  >
                    <span
                      aria-hidden
                      className="absolute -left-[33px] md:-left-[37px] top-2 h-1.5 w-1.5 rounded-full bg-foreground/30 group-hover:bg-foreground transition-colors duration-500"
                    />
                    <div className="flex items-baseline gap-4">
                      <span className="font-display text-[10px] tracking-[0.35em] uppercase opacity-40 tabular-nums">
                        0{i + 1}
                      </span>
                      <span className="font-display text-lg md:text-xl font-medium tracking-tight">
                        {m.title}
                      </span>
                    </div>
                    <p className="text-body text-sm md:text-[15px] mt-1.5 opacity-65 leading-relaxed max-w-md">
                      {m.desc}
                    </p>
                  </motion.li>
                ))}
              </ol>
            </motion.div>
          </Reveal>
        </div>

        {/* ============ Act divider ============ */}
        <Reveal>
          <div className="flex items-center gap-4 mb-14 md:mb-20">
            <span className="h-px flex-1" style={{ background: "hsl(var(--foreground) / 0.12)" }} />
            <span className="font-display text-[10px] tracking-[0.4em] uppercase opacity-40">
              The Non-Negotiable Loop
            </span>
            <span className="h-px flex-1" style={{ background: "hsl(var(--foreground) / 0.12)" }} />
          </div>
        </Reveal>

        {/* ============ ACT II — GN Fuel Laws™ ============ */}
        <div className="grid md:grid-cols-[0.9fr,1.3fr] gap-12 md:gap-20 items-start">
          <div>
            <Reveal delay={0.05}>
              <p className="text-[10px] tracking-[0.4em] uppercase font-display opacity-45 mb-4">
                Act II — Memorable IP
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <h3 className="font-display text-3xl md:text-5xl font-medium tracking-tight max-w-md leading-[1.05]">
                GN Fuel Laws<span className="align-super text-xs opacity-50">™</span>
              </h3>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-body-lg max-w-md mt-6 opacity-80">
                The non-negotiable loop behind practical performance nutrition.
                Five laws. One repeatable cycle.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <Link
                to="/fuel-laws"
                className="inline-block mt-8 text-body text-sm link-underline hover:text-foreground transition-colors"
              >
                Explore the framework →
              </Link>
            </Reveal>
          </div>

          <Reveal delay={0.2} direction="right">
            <div
              className="relative py-6"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
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
                            opacity: isActive ? 1 : 0.3,
                            fontSize: isActive ? "1.75rem" : "1.05rem",
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

              <div className="flex items-center gap-2 mt-2 ml-1">
                <span className="text-muted-foreground/25 text-xs">↺</span>
                <span className="font-display text-[10px] tracking-wide text-muted-foreground/25">
                  Back to Fuel
                </span>
              </div>

              <div className="mt-10 min-h-[110px]">
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
                    <p className="text-body text-sm mt-3 opacity-60 leading-relaxed max-w-md">
                      {laws[active].detail}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex gap-2 mt-8">
                {laws.map((_, i) => (
                  <motion.div
                    key={i}
                    className="h-px"
                    animate={{ width: i === active ? 32 : 12, opacity: i === active ? 1 : 0.25 }}
                    style={{ background: "hsl(var(--foreground))" }}
                    transition={{ duration: 0.5 }}
                  />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Scene>
  );
};

export default TheMethodSection;