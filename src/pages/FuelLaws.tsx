import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/Layout";
import Reveal from "@/components/Reveal";

const laws = [
  {
    number: "01",
    title: "Fuel to Perform",
    tagline: "Energy is the currency of performance.",
    detail:
      "Without adequate energy availability, everything else breaks down — decision-making, recovery, adaptation, intensity. Fueling isn't about eating more. It's about eating enough, at the right times, to sustain the demands of training and competition. This is the foundation.",
    practical: "Match energy intake to training load. Periodise carbohydrate availability. Never under-fuel on high-demand days.",
    color: "155 18% 25%",
  },
  {
    number: "02",
    title: "Build Your Base",
    tagline: "Daily habits build or break the athlete.",
    detail:
      "Performance nutrition isn't a match-day intervention — it's a daily operating system. The habits athletes build around sleep, hydration, meal structure and consistency across the week are what create a resilient base. You can't out-supplement a broken routine.",
    practical: "Establish consistent meal timing. Build weekly nutrition rhythms. Create accountability through simple tracking.",
    color: "155 14% 30%",
  },
  {
    number: "03",
    title: "Recover Like a Pro",
    tagline: "Recovery prepares the next performance.",
    detail:
      "What happens in the 2–4 hours after training or competition determines how quickly the body adapts and how prepared the athlete is for the next session. Recovery nutrition — protein timing, carbohydrate replenishment, hydration — is a non-negotiable system, not an afterthought.",
    practical: "Protein within 30–60 min post-session. Replenish glycogen. Rehydrate with structure, not guesswork.",
    color: "155 12% 35%",
  },
  {
    number: "04",
    title: "Hydrate to Dominate",
    tagline: "Hydration supports physical and cognitive output.",
    detail:
      "Even mild dehydration impairs reaction time, concentration and physical capacity. Hydration monitoring and structured intake protocols should be as habitual as warm-ups. It's one of the simplest, most impactful systems to get right — and one of the most commonly neglected.",
    practical: "Monitor body weight changes. Use structured hydration protocols. Adapt intake to climate and session intensity.",
    color: "155 10% 40%",
  },
  {
    number: "05",
    title: "Test Before the Game",
    tagline: "Competition is not the place to experiment.",
    detail:
      "Every nutrition strategy — from match-day meals to supplement use to hydration plans — must be tested in training before it's used in competition. The match is the exam, not the practice session. If it hasn't been rehearsed, it doesn't belong on game day.",
    practical: "Rehearse match-day meals in training weeks. Trial supplements before competition. Build a proven pre-match routine.",
    color: "155 8% 45%",
  },
];

const expansions = [
  {
    title: "Education Tools",
    description: "Mini-classes, visual guides and structured learning resources that make the framework accessible to athletes and staff.",
  },
  {
    title: "Applied Guides",
    description: "Practical protocols for match-day, recovery and travel nutrition — built from the framework principles.",
  },
  {
    title: "Club Resources",
    description: "Team-level systems for nutrition planning, monitoring and reporting within performance departments.",
  },
  {
    title: "Practical Systems",
    description: "Repeatable processes that embed the framework into weekly training cycles and competition calendars.",
  },
];

const FuelLaws = () => {
  const [activeLaw, setActiveLaw] = useState<string | null>(null);
  const [hoveredLaw, setHoveredLaw] = useState<string | null>(null);
  const [exploredLaws, setExploredLaws] = useState<Set<string>>(new Set());

  const handleLawClick = (num: string) => {
    const isActive = activeLaw === num;
    setActiveLaw(isActive ? null : num);
    if (!isActive) {
      setExploredLaws((prev) => new Set(prev).add(num));
    }
  };

  const activeIndex = laws.findIndex((l) => l.number === activeLaw);
  const progressPercent = (exploredLaws.size / laws.length) * 100;

  return (
    <Layout>
      <section className="section-padding section-spacing">
        <div className="max-content">
          <Reveal>
            <p className="text-caption mb-6">Framework</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-display max-w-4xl">GN Fuel Laws</h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-body-lg max-w-2xl mt-8">
              GN Fuel Laws is a practical framework that helps turn nutrition from
              information into usable performance behaviour. Five principles.
              Clear action. Repeatable systems.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-body max-w-2xl mt-4">
              Each law addresses a fundamental dimension of applied performance nutrition.
              Together, they form a complete operating system for how athletes and teams
              can approach nutrition with clarity and consistency.
            </p>
          </Reveal>

          {/* System cycle — connected dots */}
          <Reveal delay={0.4}>
            <div className="flex items-center gap-2 mt-12">
              {laws.map((law, i) => (
                <div key={law.number} className="flex items-center gap-2">
                  <motion.button
                    onClick={() => handleLawClick(law.number)}
                    className="relative flex items-center justify-center"
                    whileHover={{ scale: 1.3 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      className="w-2.5 h-2.5 rounded-full transition-colors duration-500"
                      animate={{
                        backgroundColor:
                          activeLaw === law.number
                            ? `hsl(${law.color})`
                            : exploredLaws.has(law.number)
                              ? "hsl(var(--foreground) / 0.35)"
                              : "hsl(var(--foreground) / 0.15)",
                        scale: activeLaw === law.number ? 1.4 : 1,
                      }}
                      transition={{ duration: 0.4 }}
                    />
                    {activeLaw === law.number && (
                      <motion.div
                        className="absolute w-5 h-5 rounded-full border"
                        style={{ borderColor: `hsl(${law.color} / 0.3)` }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.button>
                  {i < laws.length - 1 && (
                    <motion.div
                      className="w-6 md:w-10 h-px"
                      animate={{
                        backgroundColor:
                          activeIndex >= 0 && i >= Math.min(activeIndex, i) && i < Math.max(activeIndex, laws.length)
                            ? "hsl(var(--foreground) / 0.15)"
                            : "hsl(var(--foreground) / 0.08)",
                      }}
                      transition={{ duration: 0.5 }}
                    />
                  )}
                </div>
              ))}
              <span className="text-[10px] text-muted-foreground/40 ml-3 font-display tracking-widest uppercase">
                Cycle
              </span>
            </div>
          </Reveal>

          {/* Performance Bar */}
          <Reveal delay={0.5}>
            <div className="mt-8 flex items-center gap-4">
              <div className="flex-1 h-[3px] bg-border/40 rounded-full overflow-hidden relative">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{ background: "linear-gradient(90deg, hsl(155 18% 25%), hsl(155 8% 45%))" }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                />
              </div>
              <motion.span
                className="text-[10px] font-display tracking-widest uppercase text-muted-foreground/50 tabular-nums min-w-[52px] text-right"
                animate={{ color: progressPercent === 100 ? "hsl(155 18% 25%)" : "hsl(var(--muted-foreground) / 0.5)" }}
              >
                {exploredLaws.size}/{laws.length}
              </motion.span>
            </div>
            <AnimatePresence>
              {progressPercent === 100 && (
                <motion.p
                  className="text-[10px] font-display tracking-wider uppercase mt-3"
                  style={{ color: "hsl(155 18% 25%)" }}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 0.7, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Framework complete ✓
                </motion.p>
              )}
            </AnimatePresence>
          </Reveal>
        </div>
      </section>

      <div className="section-padding max-content">
        <div className="divider" />
      </div>

      {/* The Five Laws — Framework Reveal */}
      <section className="section-padding section-spacing">
        <div className="max-content">
          <Reveal>
            <p className="text-caption mb-12">The Five Laws</p>
          </Reveal>
          <div className="space-y-0">
            {laws.map((law, i) => {
              const isActive = activeLaw === law.number;
              const isHovered = hoveredLaw === law.number;
              const hasActiveOrHover = activeLaw !== null || hoveredLaw !== null;
              const isFocused = isActive || isHovered;
              const isReceded = hasActiveOrHover && !isFocused;

              return (
                <Reveal key={law.number} delay={i * 0.08}>
                  <motion.div
                    className="border-b border-border/50 cursor-pointer relative overflow-hidden"
                    onClick={() => setActiveLaw(isActive ? null : law.number)}
                    onMouseEnter={() => setHoveredLaw(law.number)}
                    onMouseLeave={() => setHoveredLaw(null)}
                    animate={{
                      opacity: isReceded ? 0.35 : 1,
                    }}
                    transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    {/* Accent bar */}
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 w-[2px]"
                      style={{ background: `hsl(${law.color})` }}
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: isActive ? 1 : 0 }}
                      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                      layoutId={`accent-${law.number}`}
                    />

                    {/* Subtle background glow on active */}
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      animate={{
                        background: isActive
                          ? `linear-gradient(90deg, hsl(${law.color} / 0.04), transparent 40%)`
                          : "transparent",
                      }}
                      transition={{ duration: 0.5 }}
                    />

                    <div className="py-10 md:py-14 relative z-10">
                      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-10">
                        <motion.span
                          className="text-caption text-[10px] w-10 shrink-0 opacity-40"
                          animate={{ x: isActive ? 8 : 0, opacity: isActive ? 0.8 : 0.4 }}
                          transition={{ duration: 0.4 }}
                        >
                          {law.number}
                        </motion.span>
                        <motion.h3
                          className="font-display text-2xl md:text-3xl font-semibold"
                          animate={{
                            x: isActive ? 8 : 0,
                            color: isFocused
                              ? `hsl(${law.color})`
                              : "hsl(var(--foreground))",
                          }}
                          transition={{ duration: 0.5 }}
                        >
                          {law.title}
                        </motion.h3>
                        <motion.span
                          className="md:ml-auto text-body text-sm md:text-right max-w-xs"
                          animate={{ opacity: isReceded ? 0.4 : 0.7 }}
                          transition={{ duration: 0.5 }}
                        >
                          {law.tagline}
                        </motion.span>
                        <motion.span
                          className="hidden md:inline-block text-muted-foreground/40 text-lg font-light"
                          animate={{ rotate: isActive ? 45 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          +
                        </motion.span>
                      </div>
                    </div>

                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pb-12 md:pl-20 space-y-6">
                            <motion.p
                              className="text-body-lg max-w-xl"
                              initial={{ y: 12, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ delay: 0.12, duration: 0.5 }}
                            >
                              {law.detail}
                            </motion.p>
                            <motion.div
                              className="border-l-2 pl-5 py-1"
                              style={{ borderColor: `hsl(${law.color})` }}
                              initial={{ y: 12, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ delay: 0.22, duration: 0.5 }}
                            >
                              <p className="text-caption text-[10px] mb-2">In Practice</p>
                              <p className="text-body text-sm">{law.practical}</p>
                            </motion.div>

                            {/* Next law navigation */}
                            {i < laws.length - 1 && (
                              <motion.button
                                className="flex items-center gap-2 text-[11px] font-display tracking-wider uppercase text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors mt-3 group"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveLaw(laws[i + 1].number);
                                }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.35 }}
                              >
                                <span className="group-hover:translate-x-1 transition-transform duration-300">
                                  Next → {laws[i + 1].title}
                                </span>
                              </motion.button>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <div className="section-padding max-content">
        <div className="divider" />
      </div>

      {/* Expansion */}
      <section className="section-padding section-spacing">
        <div className="max-content">
          <Reveal>
            <p className="text-caption mb-4">How It Expands</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-body-lg max-w-xl mb-14">
              The framework extends into practical applications across performance
              environments — from individual athlete education to team-level systems.
            </p>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-px bg-border/40">
            {expansions.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08}>
                <motion.div
                  className="p-8 md:p-10 bg-background transition-all duration-600 hover:bg-card group relative overflow-hidden"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="absolute top-0 left-0 right-0 h-px">
                    <div className="w-0 h-full bg-foreground/20 group-hover:w-full transition-all duration-700 ease-out" />
                  </div>
                  <p className="text-caption text-[10px] mb-4 opacity-40">0{i + 1}</p>
                  <h3 className="font-display text-lg font-medium text-foreground mb-3 group-hover:text-olive-light transition-colors duration-500">
                    {item.title}
                  </h3>
                  <p className="text-body text-sm opacity-70 group-hover:opacity-100 transition-opacity duration-500">
                    {item.description}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="section-padding max-content">
        <div className="divider" />
      </div>
      <section className="section-padding section-spacing">
        <div className="max-content text-center">
          <Reveal>
            <h2 className="text-headline max-w-lg mx-auto">
              Interested in applying the framework?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-body-lg max-w-md mx-auto mt-5">
              Whether for your team, club or individual practice — let's explore how the framework fits.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <Link
              to="/contact"
              className="group inline-flex items-center justify-center mt-10 px-12 py-4 bg-foreground text-background font-display text-sm font-medium tracking-wide transition-all duration-500 hover:tracking-wider"
            >
              Get in Touch
            </Link>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
};

export default FuelLaws;
