import { useState } from "react";
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
    color: "155 12% 35%",
  },
  {
    number: "03",
    title: "Recover Like a Pro",
    tagline: "Recovery prepares the next performance.",
    detail:
      "What happens in the 2–4 hours after training or competition determines how quickly the body adapts and how prepared the athlete is for the next session. Recovery nutrition — protein timing, carbohydrate replenishment, hydration — is a non-negotiable system, not an afterthought.",
    practical: "Protein within 30–60 min post-session. Replenish glycogen. Rehydrate with structure, not guesswork.",
    color: "155 15% 30%",
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

          {/* System cycle indicator */}
          <Reveal delay={0.4}>
            <div className="flex items-center gap-3 mt-10">
              {laws.map((law, i) => (
                <div key={law.number} className="flex items-center gap-3">
                  <motion.button
                    onClick={() => setActiveLaw(activeLaw === law.number ? null : law.number)}
                    className={`w-2 h-2 rounded-full transition-all duration-500 ${
                      activeLaw === law.number
                        ? "w-8 bg-foreground"
                        : "bg-foreground/20 hover:bg-foreground/40"
                    }`}
                    layout
                  />
                  {i < laws.length - 1 && (
                    <div className="w-4 h-px bg-border" />
                  )}
                </div>
              ))}
              <span className="text-[10px] text-muted-foreground/50 ml-2 font-display tracking-widest uppercase">
                Cycle
              </span>
            </div>
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
            <p className="text-caption mb-10">The Five Laws</p>
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
                    className="border-b border-border cursor-pointer relative overflow-hidden"
                    onClick={() => setActiveLaw(isActive ? null : law.number)}
                    onMouseEnter={() => setHoveredLaw(law.number)}
                    onMouseLeave={() => setHoveredLaw(null)}
                    animate={{
                      opacity: isReceded ? 0.4 : 1,
                    }}
                    transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    {/* Subtle accent bar on active */}
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 w-[2px]"
                      style={{ background: `hsl(${law.color})` }}
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: isActive ? 1 : 0 }}
                      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                    />

                    <div className="py-10 md:py-12">
                      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-10">
                        <motion.span
                          className="text-caption text-xs w-10 shrink-0"
                          animate={{ x: isActive ? 8 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {law.number}
                        </motion.span>
                        <motion.h3
                          className="font-display text-2xl md:text-3xl font-semibold transition-colors duration-500"
                          animate={{
                            x: isActive ? 8 : 0,
                            color: isFocused
                              ? "hsl(155, 12%, 40%)"
                              : "hsl(var(--foreground))",
                          }}
                          transition={{ duration: 0.4 }}
                        >
                          {law.title}
                        </motion.h3>
                        <motion.span
                          className="md:ml-auto text-body text-sm md:text-right"
                          animate={{ opacity: isReceded ? 0.5 : 1 }}
                          transition={{ duration: 0.4 }}
                        >
                          {law.tagline}
                        </motion.span>
                        <motion.span
                          className="hidden md:inline-block text-muted-foreground text-lg"
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
                          <div className="pb-10 md:pl-20 space-y-5">
                            <motion.p
                              className="text-body-lg max-w-xl"
                              initial={{ y: 10, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ delay: 0.15, duration: 0.4 }}
                            >
                              {law.detail}
                            </motion.p>
                            <motion.div
                              className="border-l-2 pl-4"
                              style={{ borderColor: `hsl(${law.color})` }}
                              initial={{ y: 10, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ delay: 0.25, duration: 0.4 }}
                            >
                              <p className="text-caption text-[10px] mb-1">In Practice</p>
                              <p className="text-body text-sm">{law.practical}</p>
                            </motion.div>

                            {/* Next law hint */}
                            {i < laws.length - 1 && (
                              <motion.button
                                className="text-[11px] font-display tracking-wider uppercase text-muted-foreground/50 hover:text-muted-foreground transition-colors mt-2"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveLaw(laws[i + 1].number);
                                }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.35 }}
                              >
                                Next → {laws[i + 1].title}
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
            <p className="text-caption mb-6">How It Expands</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-body-lg max-w-xl mb-12">
              The framework extends into practical applications across performance
              environments — from individual athlete education to team-level systems.
            </p>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-6">
            {expansions.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08}>
                <motion.div
                  className="p-8 border border-border/60 transition-all duration-500 hover:border-foreground/20 hover:bg-card group relative overflow-hidden"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute top-0 left-0 w-0 h-px bg-foreground/30 group-hover:w-full transition-all duration-700" />
                  <p className="text-caption text-xs mb-3">0{i + 1}</p>
                  <h3 className="font-display text-lg font-medium text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="text-body text-sm">{item.description}</p>
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
            <p className="text-body-lg max-w-md mx-auto mt-4">
              Whether for your team, club or individual practice — let's explore how the framework fits.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center mt-8 px-10 py-4 bg-foreground text-background font-display text-sm font-medium tracking-wide transition-all duration-300 hover:opacity-85"
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
