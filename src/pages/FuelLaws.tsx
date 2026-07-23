import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
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

  const progressPercent = (exploredLaws.size / laws.length) * 100;

  return (
    <Layout>
      <SEO title="GN Fuel Laws — Performance Nutrition Principles" description="Ten applied principles that frame how we fuel for performance." path="/fuel-laws" />
      {/* Header */}
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
        </div>
      </section>

      <div className="section-padding max-content">
        <div className="divider" />
      </div>

      {/* ═══ Unified Framework System ═══ */}
      <section className="section-padding section-spacing">
        <div className="max-content">
          <div className="grid lg:grid-cols-[1fr,280px] gap-12 lg:gap-20">
            {/* Laws — Main column */}
            <div>
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
                        onClick={() => handleLawClick(law.number)}
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
                        />

                        {/* Subtle glow */}
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
                                      setExploredLaws((prev) => new Set(prev).add(laws[i + 1].number));
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

            {/* Sidebar — Cycle + Performance Bar (always visible alongside laws) */}
            <div className="lg:sticky lg:top-28 lg:self-start space-y-10">
              {/* Vertical cycle */}
              <div>
                <p className="text-caption text-[10px] mb-6">System Cycle</p>
                <div className="flex flex-row lg:flex-col items-center lg:items-start gap-0">
                  {laws.map((law, i) => {
                    const isActive = activeLaw === law.number;
                    const isExplored = exploredLaws.has(law.number);

                    return (
                      <div key={law.number} className="flex flex-row lg:flex-col items-center lg:items-start">
                        <motion.button
                          className="flex items-center gap-3 py-2 lg:py-3 group"
                          onClick={() => handleLawClick(law.number)}
                          whileHover={{ x: 4 }}
                          transition={{ duration: 0.2 }}
                        >
                          <motion.div
                            className="w-2.5 h-2.5 rounded-full shrink-0"
                            animate={{
                              backgroundColor: isActive
                                ? `hsl(${law.color})`
                                : isExplored
                                  ? "hsl(var(--foreground) / 0.4)"
                                  : "hsl(var(--foreground) / 0.12)",
                              scale: isActive ? 1.5 : 1,
                            }}
                            transition={{ duration: 0.4 }}
                          />
                          {isActive && (
                            <motion.div
                              className="absolute w-5 h-5 rounded-full border"
                              style={{ borderColor: `hsl(${law.color} / 0.3)` }}
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ duration: 0.3 }}
                            />
                          )}
                          <span className="hidden lg:inline text-[11px] font-display tracking-wider uppercase text-muted-foreground/50 group-hover:text-muted-foreground/80 transition-colors">
                            {law.title}
                          </span>
                        </motion.button>
                        {i < laws.length - 1 && (
                          <div className="w-4 lg:w-px h-px lg:h-4 bg-border/40 lg:ml-[5px] mx-1 lg:mx-0" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Performance bar */}
              <div>
                <p className="text-caption text-[10px] mb-3">Performance</p>
                <div className="flex lg:flex-col items-center lg:items-stretch gap-3">
                  <div className="flex-1 lg:flex-none h-[3px] lg:h-[3px] w-full bg-border/40 rounded-full overflow-hidden relative">
                    <motion.div
                      className="absolute inset-y-0 left-0 rounded-full"
                      style={{ background: "linear-gradient(90deg, hsl(155 18% 25%), hsl(155 8% 45%))" }}
                      animate={{ width: `${progressPercent}%` }}
                      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                    />
                  </div>
                  <motion.span
                    className="text-[10px] font-display tracking-widest uppercase text-muted-foreground/50 tabular-nums"
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
              </div>
            </div>
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
                   className="p-8 md:p-10 bg-background transition-all duration-600 hover:bg-card/50 group relative overflow-hidden cursor-default"
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
      <section className="section-padding py-32 md:py-40">
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
