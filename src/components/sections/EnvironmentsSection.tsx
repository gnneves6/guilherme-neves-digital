import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { lazy, Suspense, useRef, useState } from "react";
import { usePointer } from "@/components/journey/PointerField";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollToY } from "@/components/motion/SmoothScroll";
import Chapter from "@/components/motion/Chapter";
import sceneEnvironments from "@/assets/scene-environments-archive.jpg";
import type { ShowcaseKit } from "@/components/environments/EnvironmentKitShowcase";

const EnvironmentKitShowcase = lazy(() => import("@/components/environments/EnvironmentKitShowcase"));
import anderlechtKit from "@/assets/kits/anderlecht-kit-transparent.png";
import lecaKit from "@/assets/kits/leca-kit-transparent.png";
import r4eKit from "@/assets/kits/run4excellence-kit-transparent.png";
import { experiences, additionalExposure } from "@/data/experiences";

const kitImages: Record<string, string> = {
  anderlecht: anderlechtKit,
  leca: lecaKit,
  r4e: r4eKit,
};

const EnvironmentsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const { scrollYProgress: mobileProgress } = useScroll({
    target: mobileRef,
    offset: ["start start", "end end"],
  });

  const progressToIndex = (v: number) => {
    const adjusted = Math.max(0, Math.min(0.999, (v - 0.1) / 0.8));
    return Math.min(experiences.length - 1, Math.floor(adjusted * experiences.length));
  };

  // Two independent scroll trackers, one per layout. Only the visible one
  // (matched to the breakpoint) is allowed to drive the shared active index,
  // so the hidden layout never fights it.
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (isMobile) return;
    setActiveIndex(progressToIndex(v));
  });
  useMotionValueEvent(mobileProgress, "change", (v) => {
    if (!isMobile) return;
    setActiveIndex(progressToIndex(v));
  });

  // Smooth-scroll dots: scroll to a target progress within a given container
  const goToWithin = (ref: React.RefObject<HTMLDivElement>, idx: number) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const totalScrollable = rect.height - window.innerHeight;
    const target = 0.1 + (idx + 0.5) * (0.8 / experiences.length);
    const top = window.scrollY + rect.top + totalScrollable * target;
    scrollToY(top);
  };
  const goTo = (idx: number) => goToWithin(sectionRef, idx);
  const goToMobile = (idx: number) => goToWithin(mobileRef, idx);

  const activeExp = experiences[activeIndex];
  const pointer = usePointer();

  const showcaseKits: ShowcaseKit[] = experiences.map((e) => ({
    id: e.id,
    name: e.name,
    image: kitImages[e.id],
    primary: e.kitColors.primary,
    secondary: e.kitColors.secondary,
    accent: e.kitColors.accent,
  }));

  return (
    <>
      {/* MOBILE, pinned cinematic roulette mirroring the desktop mechanic */}
      <div
        ref={mobileRef}
        className="md:hidden"
        style={{ height: `${(experiences.length + 1) * 100}vh` }}
      >
        <div className="sticky top-0 h-[100svh] overflow-hidden section-dark flex flex-col">
          {/* Cinematic top dissolve, coming from ivory (FromWithinBridge above) */}
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-32 z-[4] pointer-events-none"
            style={{ background: "linear-gradient(to bottom, hsl(var(--background)) 0%, hsl(var(--background) / 0.55) 35%, transparent 100%)" }}
          />
          {/* Atmosphere, performance archive corridor */}
          <div
            aria-hidden
            className="absolute inset-0 z-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${sceneEnvironments})`, filter: "brightness(0.3) contrast(1.15) saturate(0.55)", opacity: 0.5 }}
          />
          <div
            aria-hidden
            className="absolute inset-0 z-[1] pointer-events-none"
            style={{ background: "radial-gradient(ellipse 92% 70% at 50% 44%, transparent 0%, hsl(var(--charcoal-deep) / 0.85) 82%), linear-gradient(to bottom, hsl(var(--charcoal-deep)) 0%, transparent 16%, transparent 74%, hsl(var(--charcoal-deep) / 0.85) 96%)" }}
          />
          {/* Active-kit colour wash */}
          <motion.div
            className="absolute inset-0 z-[1] pointer-events-none"
            animate={{ background: `radial-gradient(ellipse 90% 55% at 50% 42%, ${activeExp.kitColors.primary}1c 0%, transparent 68%)` }}
            transition={{ duration: 1 }}
          />

          <div className="section-padding relative z-10 flex flex-col h-full pt-[76px] pb-7">
            <Chapter
              number="02"
              title="Real environments."
              tone="dark"
              className="mb-0"
              meta={
                <p className="text-[10px] tracking-[0.3em] uppercase font-display text-[hsl(var(--ivory)/0.3)]">
                  Chapter {String(activeIndex + 1).padStart(2, "0")} / {String(experiences.length).padStart(2, "0")}
                </p>
              }
            />

            {/* 3D kit showcase, floating on its pedestal */}
            <div className="relative flex-1 min-h-0">
              {/* giant ghost index behind the kit */}
              <motion.span
                key={`n-${activeIndex}`}
                className="absolute inset-x-0 top-1 text-center font-display font-bold leading-none pointer-events-none select-none"
                style={{
                  fontSize: "40vw",
                  color: activeExp.id === "r4e" ? "rgba(170,170,170,0.10)" : `${activeExp.kitColors.primary}14`,
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                {String(activeIndex + 1).padStart(2, "0")}
              </motion.span>
              {isMobile && (
                <Suspense fallback={null}>
                  <EnvironmentKitShowcase kits={showcaseKits} activeIndex={activeIndex} />
                </Suspense>
              )}
            </div>

            {/* Identity, crossfaded per active chapter */}
            <div className="relative min-h-[188px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <span className="text-[10px] tracking-widest uppercase font-display text-[hsl(var(--ivory)/0.4)]">
                    {activeExp.period}, {activeExp.location}
                  </span>
                  <h3 className="font-display text-[2rem] leading-[1.02] font-semibold text-[hsl(var(--ivory))] mt-1.5 break-words">
                    {activeExp.name}
                  </h3>
                  <p className="text-[10px] tracking-[0.16em] uppercase font-display mt-2 text-[hsl(var(--ivory)/0.45)] leading-snug">
                    {activeExp.role}
                  </p>
                  <p className="font-display text-[15px] italic leading-snug text-[hsl(var(--ivory)/0.72)] mt-3">
                    “{activeExp.chapter}”
                  </p>
                  {/* Two proofs only on a phone, so the chapter still fits one screen. */}
                  <ul className="mt-3.5 space-y-2">
                    {activeExp.proofs.slice(0, 2).map((proof) => (
                      <li key={proof} className="flex items-start gap-2.5">
                        <span
                          className="mt-[6px] w-1 h-1 rounded-full shrink-0"
                          style={{ background: activeExp.kitColors.primary === "#0E0E10" ? "hsl(var(--ivory) / 0.45)" : activeExp.kitColors.primary }}
                        />
                        <span className="text-[11.5px] leading-snug text-[hsl(var(--ivory)/0.66)]">{proof}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Chapter selector, tap to jump */}
            <div className="mt-4 flex items-center justify-between">
              <ul className="flex items-center gap-2.5">
                {experiences.map((exp, i) => {
                  const isActive = activeIndex === i;
                  return (
                    <li key={exp.name}>
                      <button
                        onClick={() => goToMobile(i)}
                        aria-current={isActive ? "true" : undefined}
                        aria-label={`Open ${exp.name} environment`}
                        className="flex items-center py-2"
                      >
                        <motion.span
                          className="block rounded-full"
                          animate={{
                            width: isActive ? 26 : 7,
                            height: 7,
                            backgroundColor: isActive ? exp.kitColors.primary : "hsl(var(--ivory) / 0.2)",
                          }}
                          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                        />
                      </button>
                    </li>
                  );
                })}
              </ul>
              <motion.span
                className="text-[9px] tracking-[0.3em] uppercase font-display text-[hsl(var(--ivory)/0.28)]"
                animate={{ opacity: [0.28, 0.55, 0.28] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Scroll to advance
              </motion.span>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE, additional exposure, compact strip that closes the chapter */}
      <section className="md:hidden section-dark section-padding pb-16 pt-4 relative overflow-hidden">
        <div className="max-content relative z-[2]">
          <p className="text-[10px] tracking-widest uppercase font-display mb-3 text-[hsl(var(--ivory)/0.3)]">
            Additional Exposure
          </p>
          {additionalExposure.map((item) => (
            <div key={item.name} className="flex justify-between py-2 text-xs" style={{ borderTop: "1px solid hsl(var(--ivory) / 0.06)" }}>
              <span className="font-display text-[hsl(var(--ivory)/0.55)]">{item.name}</span>
              <span className="text-[hsl(var(--ivory)/0.28)]">{item.date}</span>
            </div>
          ))}
        </div>
        {/* Cinematic bottom dissolve, into SelectedArtefactsSection (cinematic dark) */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-24 z-[3] pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent 0%, hsl(var(--cinematic) / 0.7) 60%, hsl(var(--cinematic)) 100%)" }}
        />
      </section>

      {/* DESKTOP, pinned FIFA-style mannequin */}
      <div ref={sectionRef} className="hidden md:block" style={{ height: `${(experiences.length + 1) * 100}vh` }}>
        <div className="sticky top-0 h-screen flex items-center overflow-hidden section-dark">
          {/* Cinematic top dissolve, coming from FromWithinBridge (ivory) */}
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-48 z-[4] pointer-events-none"
            style={{ background: "linear-gradient(to bottom, hsl(var(--background)) 0%, hsl(var(--background) / 0.55) 35%, transparent 100%)" }}
          />
          {/* Cinematic bottom dissolve, into SelectedArtefactsSection (cinematic dark) */}
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-48 z-[4] pointer-events-none"
            style={{ background: "linear-gradient(to bottom, transparent 0%, hsl(var(--cinematic) / 0.7) 60%, hsl(var(--cinematic)) 100%)" }}
          />
          {/* Atmosphere, performance archive corridor */}
          <div
            aria-hidden
            className="absolute inset-0 z-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${sceneEnvironments})`,
              filter: "brightness(0.32) contrast(1.15) saturate(0.55)",
              opacity: 0.55,
            }}
          />
          {/* Pointer-driven exploration light, visible scene response on desktop */}
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

              <div className="grid grid-cols-[minmax(220px,1fr)_440px_minmax(180px,0.8fr)] lg:grid-cols-[1fr_520px_1fr] gap-6 lg:gap-12 items-center min-h-[460px]">
                {/* Left, identity */}
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
                              {exp.period}, {exp.location}
                            </span>
                            <h3 className="font-display text-2xl lg:text-4xl xl:text-5xl font-semibold leading-[1.05] tracking-tight text-[hsl(var(--ivory))] mt-3 break-words">
                              {exp.name}
                            </h3>
                            <p className="text-[11px] tracking-[0.18em] uppercase font-display mt-3 text-[hsl(var(--ivory)/0.45)] leading-snug max-w-sm">
                              {exp.role}
                            </p>
                            <p className="font-display text-base lg:text-lg italic max-w-md leading-relaxed text-[hsl(var(--ivory)/0.7)] mt-5">
                              “{exp.chapter}”
                            </p>
                            {/* What was actually done here. This replaced a row
                                of subject tags: a tag says the topic was touched,
                                a proof says what came of it. */}
                            <ul className="mt-6 space-y-2.5 max-w-md">
                              {exp.proofs.map((proof, pi) => (
                                <motion.li
                                  key={proof}
                                  className="flex items-start gap-3"
                                  initial={{ opacity: 0, x: -8 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.5, delay: 0.24 + pi * 0.1 }}
                                >
                                  <span
                                    className="mt-[7px] w-1.5 h-1.5 rounded-full shrink-0"
                                    style={{ background: exp.kitColors.primary === "#0E0E10" ? "hsl(var(--ivory) / 0.45)" : exp.kitColors.primary }}
                                  />
                                  <span className="text-[13px] lg:text-sm leading-snug text-[hsl(var(--ivory)/0.72)]">
                                    {proof}
                                  </span>
                                </motion.li>
                              ))}
                            </ul>
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

                {/* Center, Floating kit display archive */}
                <div className="relative h-[400px] lg:h-[460px]">
                  {!isMobile && (
                    <Suspense fallback={null}>
                      <EnvironmentKitShowcase kits={showcaseKits} activeIndex={activeIndex} />
                    </Suspense>
                  )}
                </div>

                {/* Right, index + dots */}
                <div className="flex flex-col justify-center items-end text-right">
                  <motion.span
                    className="font-display text-[100px] lg:text-[140px] font-bold leading-none"
                    style={{
                      color:
                        activeExp.id === "r4e"
                          ? "rgba(170, 170, 170, 0.14)"
                          : `${activeExp.kitColors.primary}18`,
                    }}
                    key={activeIndex}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                  >
                    {String(activeIndex + 1).padStart(2, "0")}
                  </motion.span>

                  {/* Environment hotspots, focusable zones, no card metaphor */}
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