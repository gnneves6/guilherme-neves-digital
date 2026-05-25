import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";
import { usePointer } from "@/components/journey/PointerField";
import Chapter from "@/components/motion/Chapter";
import sceneEnvironments from "@/assets/scene-environments-archive.jpg";
import EnvironmentKitShowcase, { ShowcaseKit } from "@/components/environments/EnvironmentKitShowcase";
import KitTorso from "@/components/environments/KitTorso";

export const experiences = [
  {
    id: "anderlecht",
    name: "RSC Anderlecht",
    role: "Performance Nutrition Intern",
    location: "Brussels, Belgium",
    period: "2026",
    chapter: "Elite football taught me that nutrition must be clear enough to survive pressure.",
    context: "Elite first-team football environment",
    focus: ["Hydration", "Matchday fueling", "Scientific reviews", "Athlete & staff education"],
    seasonNote: "During a season marked by a cup-final run and European qualification race.",
    kitColors: { primary: "#5E3A8E", secondary: "#FFFFFF", accent: "#C9A84C" },
    kit: { variant: "plain" as const, symbol: "dots" as const },
  },
  {
    id: "leca",
    name: "Leça FC",
    role: "First Team Performance Nutrition",
    location: "Porto, Portugal",
    period: "2025",
    chapter: "Senior football turned theory into daily decisions, monitoring and accountability.",
    context: "Senior first-team football environment",
    focus: ["Body composition", "Matchweek routines", "Athlete education", "Practical fueling"],
    seasonNote: "Inside a competitive promotion-stage campaign.",
    kitColors: { primary: "#1F7A4D", secondary: "#FFFFFF", accent: "#C4A853" },
    kit: { variant: "hoops" as const, symbol: "crest" as const },
  },
  {
    id: "r4e",
    name: "Run4Excellence",
    role: "Performance Nutrition | Health & Performance",
    location: "Porto, Portugal",
    period: "2025",
    chapter: "Performance is broader than football: training, recovery, health and consistency.",
    context: "Human-performance environment beyond football",
    focus: ["Health", "Habits", "Endurance", "Recovery", "Long-term development"],
    seasonNote: null,
    kitColors: { primary: "#0E0E10", secondary: "#FFFFFF", accent: "#FFFFFF" },
    kit: { variant: "plain" as const, symbol: "four" as const },
  },
];

const additionalExposure = [
  { name: "FC Porto B & U19", date: "Apr 2025" },
  { name: "Gil Vicente FC", date: "Aug 2025" },
  { name: "USC Paredes", date: "Nov 2025" },
];

const EnvironmentsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const adjusted = Math.max(0, Math.min(0.999, (v - 0.1) / 0.8));
    const idx = Math.min(experiences.length - 1, Math.floor(adjusted * experiences.length));
    setActiveIndex(idx);
  });

  // Smooth-scroll dots: scroll to a target progress within the section
  const goTo = (idx: number) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const totalScrollable = rect.height - window.innerHeight;
    const target = 0.1 + (idx + 0.5) * (0.8 / experiences.length);
    const top = window.scrollY + rect.top + totalScrollable * target;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const activeExp = experiences[activeIndex];
  const pointer = usePointer();

  const showcaseKits: ShowcaseKit[] = experiences.map((e) => ({
    id: e.id,
    name: e.name,
    primary: e.kitColors.primary,
    secondary: e.kitColors.secondary,
    accent: e.kitColors.accent,
    variant: e.kit.variant,
    symbol: e.kit.symbol,
  }));

  return (
    <>
      {/* MOBILE FALLBACK — vertical cards (no pinning, no 3D) */}
      <section className="md:hidden section-dark section-padding section-spacing-sm relative overflow-hidden">
        {/* Atmosphere — performance archive, anchored behind content */}
        <div
          aria-hidden
          className="absolute inset-0 z-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: `url(${sceneEnvironments})`, filter: "brightness(0.45) contrast(1.1) saturate(0.7)" }}
        />
        <div aria-hidden className="absolute inset-0 z-[1]" style={{ background: "linear-gradient(to bottom, hsl(var(--charcoal-deep)) 0%, transparent 18%, transparent 82%, hsl(var(--charcoal-deep) / 0) 100%)" }} />
        <div className="max-content relative z-[2]">
          <Chapter
            number="02"
            title="Real environments."
            tone="dark"
            className="mb-6"
          />
          <h2 className="font-display text-3xl font-semibold text-[hsl(var(--ivory))] mb-10">
            Chapters that shaped the work.
          </h2>
          <div className="space-y-6">
            {experiences.map((exp, i) => (
              <div
                key={exp.name}
                className="p-6 rounded-sm relative overflow-hidden"
                style={{
                  background: `linear-gradient(180deg, hsl(var(--charcoal-deep)) 0%, ${exp.kitColors.primary}10 100%)`,
                  borderLeft: `2px solid ${exp.kitColors.primary}`,
                }}
              >
                {/* Floating kit thumb */}
                <div className="float-right ml-4 w-[88px] h-[110px] opacity-90">
                  <KitTorso
                    primary={exp.kitColors.primary}
                    secondary={exp.kitColors.secondary}
                    accent={exp.kitColors.accent}
                    variant={exp.kit.variant}
                    symbol={exp.kit.symbol}
                    clarity={0.85}
                  />
                </div>
                <span className="text-[10px] tracking-widest uppercase font-display text-[hsl(var(--ivory)/0.35)]">
                  {exp.period} — {exp.location}
                </span>
                <h3 className="font-display text-2xl font-semibold text-[hsl(var(--ivory))] mt-2">
                  {exp.name}
                </h3>
                <p className="text-[10px] tracking-widest uppercase font-display mt-2 text-[hsl(var(--ivory)/0.4)]">
                  {exp.role}
                </p>
                <p className="text-xs text-[hsl(var(--ivory)/0.5)] mt-3 clear-right">
                  {exp.context}
                </p>
                <div className="flex flex-wrap gap-x-3 gap-y-1 mt-3">
                  {exp.focus.map((f) => (
                    <span
                      key={f}
                      className="text-[10px] tracking-wide uppercase font-display text-[hsl(var(--ivory)/0.55)]"
                    >
                      · {f}
                    </span>
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-[hsl(var(--ivory)/0.65)] mt-4 italic">
                  “{exp.chapter}”
                </p>
                {exp.seasonNote && (
                  <p className="text-[11px] italic text-[hsl(var(--ivory)/0.4)] mt-3">
                    {exp.seasonNote}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="mt-10 pt-6" style={{ borderTop: "1px solid hsl(var(--ivory) / 0.06)" }}>
            <p className="text-[10px] tracking-widest uppercase font-display mb-3 text-[hsl(var(--ivory)/0.3)]">
              Additional Exposure
            </p>
            {additionalExposure.map((item) => (
              <div key={item.name} className="flex justify-between py-2 text-xs">
                <span className="font-display text-[hsl(var(--ivory)/0.5)]">{item.name}</span>
                <span className="text-[hsl(var(--ivory)/0.25)]">{item.date}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Soft dissolve into next section */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-24 z-[3] pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, hsl(var(--background)))" }}
        />
      </section>

      {/* DESKTOP — pinned FIFA-style mannequin */}
      <div ref={sectionRef} className="hidden md:block" style={{ height: `${(experiences.length + 1) * 100}vh` }}>
        <div className="sticky top-0 h-screen flex items-center overflow-hidden section-dark">
          {/* Atmosphere — performance archive corridor */}
          <div
            aria-hidden
            className="absolute inset-0 z-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${sceneEnvironments})`,
              filter: "brightness(0.32) contrast(1.15) saturate(0.55)",
              opacity: 0.55,
            }}
          />
          {/* Pointer-driven exploration light — visible scene response on desktop */}
          <div
            aria-hidden
            className="absolute inset-0 z-[1] pointer-events-none transition-[background] duration-200 ease-out"
            style={{
              background: `radial-gradient(circle 620px at ${50 + pointer.x * 22}% ${50 + pointer.y * 18}%, ${activeExp.kitColors.primary}1f, transparent 65%)`,
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0 z-[2] pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 90% 80% at 50% 55%, transparent 0%, hsl(var(--charcoal-deep) / 0.82) 78%), linear-gradient(to bottom, hsl(var(--charcoal-deep)) 0%, transparent 14%, transparent 78%, hsl(var(--charcoal-deep) / 0.7) 92%, hsl(var(--charcoal-deep) / 0) 100%)",
            }}
          />
          {/* Background color wash */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              background: `radial-gradient(ellipse 80% 70% at 50% 50%, ${activeExp.kitColors.primary}14 0%, transparent 70%)`,
            }}
            transition={{ duration: 1.2 }}
          />

          <div className="section-padding w-full relative z-10">
            <div className="max-content">
              <Chapter
                number="02"
                title="Real environments."
                tone="dark"
                className="mb-6 md:mb-10"
                meta={
                  <p className="text-[10px] tracking-[0.3em] uppercase font-display text-[hsl(var(--ivory)/0.3)]">
                    Chapter {String(activeIndex + 1).padStart(2, "0")} / {String(experiences.length).padStart(2, "0")}
                  </p>
                }
              />

              <div className="grid grid-cols-[1fr_460px_1fr] lg:grid-cols-[1fr_520px_1fr] gap-6 lg:gap-10 items-center min-h-[460px]">
                {/* Left — identity */}
                <div className="flex flex-col justify-center">
                  {experiences.map((exp, i) => {
                    const isFocused = i === activeIndex;
                    return (
                      <motion.div
                        key={exp.name}
                        className="overflow-hidden"
                        animate={{ height: isFocused ? "auto" : 0, opacity: isFocused ? 1 : 0 }}
                        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                      >
                        <div className="py-2">
                          <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                          >
                            <span className="text-[10px] tracking-widest uppercase font-display text-[hsl(var(--ivory)/0.35)]">
                              {exp.period} — {exp.location}
                            </span>
                            <h3 className="font-display text-3xl lg:text-5xl font-semibold leading-tight text-[hsl(var(--ivory))] mt-3">
                              {exp.name}
                            </h3>
                            <p className="text-xs tracking-widest uppercase font-display mt-3 text-[hsl(var(--ivory)/0.45)]">
                              {exp.role}
                            </p>
                            <p className="text-sm text-[hsl(var(--ivory)/0.6)] mt-3 max-w-md">
                              {exp.context}
                            </p>
                            <div className="flex flex-wrap gap-x-3 gap-y-1 mt-3 max-w-md">
                              {exp.focus.map((f) => (
                                <span
                                  key={f}
                                  className="text-[10px] tracking-wide uppercase font-display text-[hsl(var(--ivory)/0.55)]"
                                >
                                  · {f}
                                </span>
                              ))}
                            </div>
                            <p className="font-display text-base lg:text-lg italic max-w-md leading-relaxed text-[hsl(var(--ivory)/0.7)] mt-6">
                              “{exp.chapter}”
                            </p>
                            {exp.seasonNote && (
                              <p className="text-[11px] italic text-[hsl(var(--ivory)/0.4)] mt-3 max-w-md">
                                {exp.seasonNote}
                              </p>
                            )}
                          </motion.div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Center — Floating kit display archive */}
                <div className="relative h-[400px] lg:h-[460px]">
                  <EnvironmentKitShowcase kits={showcaseKits} activeIndex={activeIndex} />
                </div>

                {/* Right — index + dots */}
                <div className="flex flex-col justify-center items-end text-right">
                  <motion.span
                    className="font-display text-[100px] lg:text-[140px] font-bold leading-none"
                    style={{ color: `${activeExp.kitColors.primary}18` }}
                    key={activeIndex}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                  >
                    {String(activeIndex + 1).padStart(2, "0")}
                  </motion.span>

                  {/* Environment hotspots — focusable zones, no card metaphor */}
                  <ul className="flex flex-col items-end gap-2 mt-6">
                    {experiences.map((exp, i) => {
                      const isActive = activeIndex === i;
                      return (
                        <li key={exp.name}>
                          <button
                            onClick={() => goTo(i)}
                            onFocus={() => setActiveIndex(i)}
                            onMouseEnter={() => setActiveIndex(i)}
                            aria-current={isActive ? "true" : undefined}
                            aria-label={`Open ${exp.name} environment`}
                            className="group flex items-center gap-3 px-2 py-1 -mx-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[hsl(var(--ivory)/0.4)]"
                          >
                            <span
                              className="text-[10px] tracking-[0.3em] uppercase font-display transition-colors duration-500"
                              style={{
                                color: isActive
                                  ? "hsl(var(--ivory) / 0.85)"
                                  : "hsl(var(--ivory) / 0.3)",
                              }}
                            >
                              {exp.name}
                            </span>
                            <motion.span
                              className="block rounded-full"
                              animate={{
                                width: isActive ? 28 : 6,
                                height: 6,
                                backgroundColor: isActive
                                  ? exp.kitColors.primary
                                  : "hsl(var(--ivory) / 0.18)",
                              }}
                              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                            />
                          </button>
                        </li>
                      );
                    })}
                  </ul>

                  <motion.p
                    className="text-[9px] tracking-[0.3em] uppercase font-display mt-6 text-[hsl(var(--ivory)/0.25)]"
                    animate={{ opacity: [0.25, 0.55, 0.25] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    Scroll to advance
                  </motion.p>
                </div>
              </div>

              {/* Bottom strip */}
              <div className="mt-10 pt-6" style={{ borderTop: "1px solid hsl(var(--ivory) / 0.06)" }}>
                <p className="text-[10px] tracking-widest uppercase font-display mb-4 text-[hsl(var(--ivory)/0.3)]">
                  Additional Observational Exposure
                </p>
                <div className="flex flex-wrap gap-x-10 gap-y-2">
                  {additionalExposure.map((item) => (
                    <div key={item.name} className="flex items-center gap-3">
                      <span className="font-display text-sm font-medium text-[hsl(var(--ivory)/0.5)]">{item.name}</span>
                      <span className="text-[10px] text-[hsl(var(--ivory)/0.25)]">{item.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EnvironmentsSection;