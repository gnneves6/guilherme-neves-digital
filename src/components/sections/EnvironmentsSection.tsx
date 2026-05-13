import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";
import MannequinTorso from "@/components/MannequinTorso";
import logoAnderlecht from "@/assets/logo-anderlecht.png";
import logoLeca from "@/assets/logo-leca.png";
import logoR4E from "@/assets/logo-run4excellence.png";

export const experiences = [
  {
    name: "RSC Anderlecht",
    role: "Performance Nutrition Intern",
    location: "Brussels, Belgium",
    period: "2026",
    chapter: "Elite football taught me that nutrition must be clear enough to survive pressure.",
    context: "Elite first-team football environment",
    focus: ["Hydration", "Matchday fueling", "Scientific reviews", "Athlete & staff education"],
    seasonNote: "During a season marked by a cup-final run and European qualification race.",
    logo: logoAnderlecht,
    kitColors: { primary: "#7B68AE", secondary: "#FFFFFF", accent: "#7B68AE" },
  },
  {
    name: "Leça FC",
    role: "First Team Performance Nutrition",
    location: "Porto, Portugal",
    period: "2025",
    chapter: "Senior football turned theory into daily decisions, monitoring and accountability.",
    context: "Senior first-team football environment",
    focus: ["Body composition", "Matchweek routines", "Athlete education", "Practical fueling"],
    seasonNote: "Inside a competitive promotion-stage campaign.",
    logo: logoLeca,
    kitColors: { primary: "#1A3A6B", secondary: "#FFFFFF", accent: "#C4A853" },
  },
  {
    name: "Run4Excellence",
    role: "Performance Nutrition | Health & Performance",
    location: "Porto, Portugal",
    period: "2025",
    chapter: "Performance is broader than football: training, recovery, health and consistency.",
    context: "Human-performance environment beyond football",
    focus: ["Health", "Habits", "Endurance", "Recovery", "Long-term development"],
    seasonNote: null,
    logo: logoR4E,
    kitColors: { primary: "#2D8C4E", secondary: "#FFFFFF", accent: "#F5A623" },
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

  return (
    <>
      {/* MOBILE FALLBACK — vertical cards (no pinning, no 3D) */}
      <section className="md:hidden section-dark section-padding section-spacing-sm">
        <div className="max-content">
          <p className="text-caption mb-3">Selected Environments</p>
          <h2 className="font-display text-3xl font-semibold text-[hsl(var(--ivory))] mb-10">
            Chapters that shaped the work.
          </h2>
          <div className="space-y-px" style={{ background: "hsl(var(--ivory) / 0.06)" }}>
            {experiences.map((exp, i) => (
              <div
                key={exp.name}
                className="p-6"
                style={{
                  background: "hsl(var(--charcoal-deep))",
                  borderLeft: `2px solid ${exp.kitColors.primary}`,
                }}
              >
                <span className="text-[10px] tracking-widest uppercase font-display text-[hsl(var(--ivory)/0.35)]">
                  {exp.period} — {exp.location}
                </span>
                <h3 className="font-display text-2xl font-semibold text-[hsl(var(--ivory))] mt-2">
                  {exp.name}
                </h3>
                <p className="text-[10px] tracking-widest uppercase font-display mt-2 text-[hsl(var(--ivory)/0.4)]">
                  {exp.role}
                </p>
                <p className="text-xs text-[hsl(var(--ivory)/0.5)] mt-3">
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
      </section>

      {/* DESKTOP — pinned FIFA-style mannequin */}
      <div ref={sectionRef} className="hidden md:block" style={{ height: `${(experiences.length + 1) * 100}vh` }}>
        <div className="sticky top-0 h-screen flex items-center overflow-hidden section-dark">
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
              <div className="mb-6 md:mb-10 flex items-baseline justify-between">
                <p className="text-caption">Selected Environments</p>
                <p className="text-[10px] tracking-[0.3em] uppercase font-display text-[hsl(var(--ivory)/0.3)]">
                  Chapter {String(activeIndex + 1).padStart(2, "0")} / {String(experiences.length).padStart(2, "0")}
                </p>
              </div>

              <div className="grid grid-cols-[1fr_260px_1fr] lg:grid-cols-[1fr_300px_1fr] gap-6 lg:gap-10 items-center min-h-[440px]">
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

                {/* Center — 3D Mannequin (smaller, more elegant) */}
                <div className="relative h-[360px] lg:h-[420px]">
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <motion.img
                      src={activeExp.logo}
                      alt=""
                      className="w-[200px] h-[200px] object-contain"
                      animate={{ opacity: 0.05, scale: 1.1 }}
                      transition={{ duration: 0.8 }}
                      style={{
                        filter: "grayscale(100%) brightness(2)",
                        maskImage: "radial-gradient(ellipse at center, black 20%, transparent 65%)",
                        WebkitMaskImage: "radial-gradient(ellipse at center, black 20%, transparent 65%)",
                      }}
                    />
                  </div>

                  <MannequinTorso
                    primaryColor={activeExp.kitColors.primary}
                    secondaryColor={activeExp.kitColors.secondary}
                    accentColor={activeExp.kitColors.accent}
                  />

                  <motion.div
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 h-px"
                    style={{ background: `${activeExp.kitColors.primary}40` }}
                    animate={{ width: 100 }}
                    transition={{ duration: 0.8 }}
                  />
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

                  {/* Clickable dots */}
                  <div className="flex items-center gap-3 mt-6">
                    {experiences.map((exp, i) => (
                      <button
                        key={i}
                        onClick={() => goTo(i)}
                        aria-label={`Go to ${exp.name}`}
                        className="group p-2 -m-2"
                      >
                        <motion.div
                          className="rounded-full"
                          animate={{
                            width: activeIndex === i ? 32 : 8,
                            height: 8,
                            backgroundColor: activeIndex === i
                              ? activeExp.kitColors.primary
                              : "hsl(var(--ivory) / 0.18)",
                          }}
                          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                        />
                      </button>
                    ))}
                  </div>

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