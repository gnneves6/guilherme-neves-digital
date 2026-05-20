import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Scene from "@/components/journey/Scene";
import ParallaxLayer from "@/components/journey/ParallaxLayer";
import TitleCard from "@/components/journey/TitleCard";
import sceneMethod from "@/assets/scene-method-podium.jpg";

const method = [
  { title: "Assess", desc: "Context, routines, constraints, real-world signals." },
  { title: "Translate", desc: "Science and data become language athletes use." },
  { title: "Structure", desc: "Fueling, hydration, recovery, matchday — built to fit." },
  { title: "Educate", desc: "Autonomy through literacy and clear resources." },
  { title: "Monitor", desc: "Adherence, body comp, feedback, practical markers." },
  { title: "Embed", desc: "Nutrition becomes culture, not an extra task." },
];

const laws = [
  { title: "Fuel", micro: "Energy before output." },
  { title: "Build", micro: "Daily base before detail." },
  { title: "Recover", micro: "The next session starts now." },
  { title: "Hydrate", micro: "Flow supports body and brain." },
  { title: "Test", micro: "No experiments on game day." },
];

const SceneMethod = ({ index = 4 }: { index?: number }) => {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || reduce) return;
    const id = setInterval(() => setActive((a) => (a + 1) % laws.length), 2800);
    return () => clearInterval(id);
  }, [paused, reduce]);

  return (
    <Scene
      index={index}
      bgImage={sceneMethod}
      bgFilter="brightness(0.32) contrast(1.1) saturate(0.6)"
      tone="hsl(var(--cinematic))"
      overlay="radial-gradient(ellipse 70% 60% at 50% 40%, hsl(var(--cinematic) / 0.55) 0%, hsl(var(--cinematic) / 0.96) 75%)"
      zoomFrom={1.08}
      zoomTo={1.0}
    >
      <div className="absolute inset-0 section-padding overflow-y-auto">
        <div className="max-content w-full py-16 lg:py-24 text-[hsl(var(--ivory))]">
          <TitleCard number="05" label="The Method" tone="dark" className="mb-10" />

          <div className="grid md:grid-cols-[0.85fr,1.15fr] gap-12 md:gap-16 items-start">
            <ParallaxLayer strength={-8}>
              <p className="text-[10px] tracking-[0.4em] uppercase font-display opacity-45 mb-4">Act I — Process</p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight max-w-md">
                Six moves.<br />One operating system.
              </h2>
              <p className="text-base mt-6 max-w-md opacity-70">
                From context to behaviour. From knowledge to repeatable action.
              </p>
            </ParallaxLayer>

            <ParallaxLayer strength={8}>
              <ol className="relative border-l border-[hsl(var(--ivory)/0.18)] pl-6 md:pl-8 space-y-5">
                {method.map((m, i) => (
                  <motion.li
                    key={m.title}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    className="group relative"
                  >
                    <span aria-hidden className="absolute -left-[33px] md:-left-[37px] top-2 h-1.5 w-1.5 rounded-full bg-[hsl(var(--ivory)/0.35)]" />
                    <div className="flex items-baseline gap-4">
                      <span className="font-display text-[10px] tracking-[0.35em] uppercase opacity-45 tabular-nums">0{i + 1}</span>
                      <span className="font-display text-lg md:text-xl font-medium tracking-tight">{m.title}</span>
                    </div>
                    <p className="text-sm md:text-[15px] mt-1.5 opacity-65 leading-relaxed max-w-md">{m.desc}</p>
                  </motion.li>
                ))}
              </ol>
            </ParallaxLayer>
          </div>

          {/* Act II — Fuel Laws loop */}
          <div className="mt-16 pt-10 border-t border-[hsl(var(--ivory)/0.1)]">
            <p className="text-[10px] tracking-[0.4em] uppercase font-display opacity-45 mb-4">
              Act II — GN Fuel Laws<span className="opacity-50">™</span>
            </p>
            <div
              className="relative"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <div className="flex flex-wrap items-center gap-x-3 gap-y-3 md:gap-x-5">
                {laws.map((law, i) => {
                  const isActive = i === active;
                  return (
                    <div key={law.title} className="flex items-center gap-2 md:gap-4">
                      <button
                        onClick={() => { setActive(i); setPaused(true); }}
                        onMouseEnter={() => setActive(i)}
                        onFocus={() => setActive(i)}
                        className="relative focus:outline-none focus-visible:ring-1 focus-visible:ring-[hsl(var(--ivory)/0.4)]"
                      >
                        <motion.span
                          className="font-display font-medium tracking-tight"
                          animate={{
                            opacity: isActive ? 1 : 0.35,
                            fontSize: isActive ? "1.6rem" : "1rem",
                            color: isActive ? "hsl(var(--ivory))" : "hsl(var(--ivory) / 0.5)",
                          }}
                          transition={{ duration: 0.45 }}
                        >
                          {law.title}
                        </motion.span>
                      </button>
                      {i < laws.length - 1 && <span className="text-[hsl(var(--ivory)/0.25)] text-xs">→</span>}
                    </div>
                  );
                })}
              </div>
              <div className="mt-6 min-h-[60px]">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={active}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.4 }}
                    className="font-display text-xl md:text-2xl max-w-md leading-snug text-[hsl(var(--ivory)/0.9)]"
                  >
                    {laws[active].micro}
                  </motion.p>
                </AnimatePresence>
              </div>
              <Link
                to="/fuel-laws"
                className="inline-block mt-6 text-sm link-underline text-[hsl(var(--ivory)/0.7)] hover:text-[hsl(var(--ivory))] transition-colors"
              >
                Explore the framework →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Scene>
  );
};

export default SceneMethod;
