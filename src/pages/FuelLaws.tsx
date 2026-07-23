import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/motion/Magnetic";
import LawSignal from "@/components/fuel-laws/LawSignal";

const laws = [
  {
    number: "01",
    title: "Fuel to Perform",
    tagline: "Energy is the currency of performance.",
    detail:
      "Without adequate energy availability, everything else breaks down — decision-making, recovery, adaptation, intensity. Fueling isn't about eating more. It's about eating enough, at the right times, to sustain the demands of training and competition. This is the foundation.",
    practical: "Match energy intake to training load. Periodise carbohydrate availability. Never under-fuel on high-demand days.",
    color: "150 30% 46%",
  },
  {
    number: "02",
    title: "Build Your Base",
    tagline: "Daily habits build or break the athlete.",
    detail:
      "Performance nutrition isn't a match-day intervention — it's a daily operating system. The habits athletes build around sleep, hydration, meal structure and consistency across the week are what create a resilient base. You can't out-supplement a broken routine.",
    practical: "Establish consistent meal timing. Build weekly nutrition rhythms. Create accountability through simple tracking.",
    color: "168 34% 46%",
  },
  {
    number: "03",
    title: "Recover Like a Pro",
    tagline: "Recovery prepares the next performance.",
    detail:
      "What happens in the 2–4 hours after training or competition determines how quickly the body adapts and how prepared the athlete is for the next session. Recovery nutrition — protein timing, carbohydrate replenishment, hydration — is a non-negotiable system, not an afterthought.",
    practical: "Protein within 30–60 min post-session. Replenish glycogen. Rehydrate with structure, not guesswork.",
    color: "192 42% 52%",
  },
  {
    number: "04",
    title: "Hydrate to Dominate",
    tagline: "Hydration supports physical and cognitive output.",
    detail:
      "Even mild dehydration impairs reaction time, concentration and physical capacity. Hydration monitoring and structured intake protocols should be as habitual as warm-ups. It's one of the simplest, most impactful systems to get right — and one of the most commonly neglected.",
    practical: "Monitor body weight changes. Use structured hydration protocols. Adapt intake to climate and session intensity.",
    color: "205 55% 56%",
  },
  {
    number: "05",
    title: "Test Before the Game",
    tagline: "Competition is not the place to experiment.",
    detail:
      "Every nutrition strategy — from match-day meals to supplement use to hydration plans — must be tested in training before it's used in competition. The match is the exam, not the practice session. If it hasn't been rehearsed, it doesn't belong on game day.",
    practical: "Rehearse match-day meals in training weeks. Trial supplements before competition. Build a proven pre-match routine.",
    color: "44 65% 55%",
  },
];

const expansions = [
  {
    title: "Athlete Education",
    description: "Turning each law into language athletes understand, remember and act on — session by session.",
  },
  {
    title: "Team Systems",
    description: "Embedding the framework into staff workflows so nutrition holds under the pressure of a real season.",
  },
  {
    title: "Applied Diagnostics",
    description: "Reading each environment against the five laws to find where performance is quietly leaking.",
  },
  {
    title: "Practical Systems",
    description: "Repeatable processes that embed the framework into weekly training cycles and competition calendars.",
  },
];

const toActions = (practical: string) =>
  practical.split(".").map((s) => s.trim()).filter(Boolean);

const FuelLaws = () => {
  const [activeLaw, setActiveLaw] = useState<string | null>("01");
  const [exploredLaws, setExploredLaws] = useState<Set<string>>(new Set(["01"]));

  const handleLawClick = (num: string) => {
    const isActive = activeLaw === num;
    setActiveLaw(isActive ? null : num);
    if (!isActive) setExploredLaws((prev) => new Set(prev).add(num));
  };

  const explored = exploredLaws.size;
  const complete = explored === laws.length;

  return (
    <Layout>
      <SEO title="GN Fuel Laws — The Operating System for Performance Nutrition" description="Five applied principles that turn nutrition from information into repeatable performance behaviour." path="/fuel-laws" />

      {/* Header */}
      <section className="section-padding section-spacing">
        <div className="max-content">
          <Reveal>
            <p className="text-caption mb-6">Framework · The Operating System</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-display max-w-4xl">GN Fuel Laws</h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-body-lg max-w-2xl mt-8">
              A practical framework that turns nutrition from information into usable
              performance behaviour. Five principles. Clear action. Repeatable systems.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="flex flex-wrap gap-x-10 gap-y-3 mt-10">
              {["Five principles", "Clear action", "Repeatable systems"].map((t, i) => (
                <div key={t} className="flex items-center gap-3">
                  <span className="text-caption text-[10px] opacity-40">0{i + 1}</span>
                  <span className="font-display text-sm font-medium text-foreground">{t}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ The dark interactive console ═══ */}
      <section className="section-padding pb-10">
        <div className="max-content">
          <Reveal>
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                background:
                  "radial-gradient(ellipse 80% 60% at 50% -10%, hsl(220 22% 15%), hsl(220 26% 7%) 70%)",
                border: "1px solid hsl(var(--ivory) / 0.08)",
                boxShadow: "0 50px 100px -40px hsl(220 40% 3% / 0.7)",
              }}
            >
              {/* faint schematic grid */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none opacity-[0.04]"
                style={{
                  backgroundImage:
                    "linear-gradient(hsl(var(--ivory)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--ivory)) 1px, transparent 1px)",
                  backgroundSize: "56px 56px",
                }}
              />

              {/* Console header */}
              <div
                className="relative flex items-center justify-between gap-4 px-6 md:px-10 py-5 border-b"
                style={{ borderColor: "hsl(var(--ivory) / 0.08)" }}
              >
                <div className="flex items-center gap-3">
                  <span className="flex gap-1.5">
                    <span className="w-2 h-2 rounded-full" style={{ background: "hsl(var(--ivory) / 0.2)" }} />
                    <span className="w-2 h-2 rounded-full" style={{ background: "hsl(var(--ivory) / 0.14)" }} />
                    <span className="w-2 h-2 rounded-full" style={{ background: "hsl(var(--ivory) / 0.14)" }} />
                  </span>
                  <span className="text-[10px] md:text-[11px] tracking-[0.28em] uppercase font-display" style={{ color: "hsl(var(--ivory) / 0.5)" }}>
                    GN Fuel Laws · Operating System
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="hidden sm:inline text-[10px] tracking-[0.24em] uppercase font-display" style={{ color: "hsl(var(--ivory) / 0.35)" }}>
                    Explored
                  </span>
                  <span className="text-[11px] font-display tracking-widest tabular-nums" style={{ color: complete ? "hsl(44 65% 60%)" : "hsl(var(--ivory) / 0.7)" }}>
                    {explored}/{laws.length}
                  </span>
                </div>
              </div>

              {/* Cycle rail */}
              <div className="relative px-6 md:px-10 pt-7 pb-2">
                <div className="flex items-center">
                  {laws.map((law, i) => {
                    const isActive = activeLaw === law.number;
                    const isExplored = exploredLaws.has(law.number);
                    return (
                      <div key={law.number} className="flex items-center flex-1 last:flex-none">
                        <button
                          onClick={() => handleLawClick(law.number)}
                          className="relative flex flex-col items-center gap-2 group shrink-0"
                          aria-label={`Law ${law.number}: ${law.title}`}
                        >
                          <motion.span
                            className="relative flex items-center justify-center w-9 h-9 rounded-full text-[11px] font-display tabular-nums"
                            animate={{
                              backgroundColor: isActive ? `hsl(${law.color} / 0.16)` : "hsl(var(--ivory) / 0.03)",
                              borderColor: isActive ? `hsl(${law.color})` : isExplored ? `hsl(${law.color} / 0.4)` : "hsl(var(--ivory) / 0.14)",
                              color: isActive || isExplored ? `hsl(${law.color})` : "hsl(var(--ivory) / 0.4)",
                            }}
                            style={{ border: "1px solid" }}
                            transition={{ duration: 0.4 }}
                          >
                            {law.number}
                            {isActive && (
                              <motion.span
                                className="absolute inset-0 rounded-full"
                                style={{ border: `1px solid hsl(${law.color} / 0.4)` }}
                                initial={{ scale: 1, opacity: 0.8 }}
                                animate={{ scale: 1.6, opacity: 0 }}
                                transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
                              />
                            )}
                          </motion.span>
                        </button>
                        {i < laws.length - 1 && (
                          <div className="flex-1 h-px mx-1 md:mx-2" style={{ background: "hsl(var(--ivory) / 0.1)" }}>
                            <motion.div
                              className="h-full origin-left"
                              style={{ background: `hsl(${law.color} / 0.5)` }}
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: exploredLaws.has(laws[i + 1].number) || (isExplored && exploredLaws.has(laws[i + 1].number)) ? 1 : isExplored ? 0.5 : 0 }}
                              transition={{ duration: 0.6 }}
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                  {/* loop indicator */}
                  <span className="ml-3 md:ml-4 text-[15px]" style={{ color: "hsl(var(--ivory) / 0.3)" }} title="Repeatable cycle">↺</span>
                </div>
              </div>

              {/* Law rows */}
              <div className="relative px-2 md:px-4 pb-4">
                {laws.map((law) => {
                  const isActive = activeLaw === law.number;
                  const actions = toActions(law.practical);
                  return (
                    <div
                      key={law.number}
                      className="border-b last:border-b-0"
                      style={{ borderColor: "hsl(var(--ivory) / 0.07)" }}
                    >
                      <button
                        onClick={() => handleLawClick(law.number)}
                        className="w-full text-left px-4 md:px-6 py-6 flex items-center gap-4 md:gap-8 group"
                      >
                        <span
                          className="font-display text-3xl md:text-5xl font-bold tabular-nums shrink-0 transition-colors duration-500"
                          style={{ color: isActive ? `hsl(${law.color})` : "hsl(var(--ivory) / 0.14)" }}
                        >
                          {law.number}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span
                            className="block font-display text-lg md:text-2xl font-semibold transition-colors duration-300"
                            style={{ color: isActive ? "hsl(var(--ivory))" : "hsl(var(--ivory) / 0.82)" }}
                          >
                            {law.title}
                          </span>
                          <span className="block text-[13px] md:text-sm mt-1" style={{ color: "hsl(var(--ivory) / 0.45)" }}>
                            {law.tagline}
                          </span>
                        </span>
                        <motion.span
                          className="shrink-0 flex items-center justify-center w-7 h-7 rounded-full"
                          style={{ border: "1px solid hsl(var(--ivory) / 0.16)", color: "hsl(var(--ivory) / 0.6)" }}
                          animate={{ rotate: isActive ? 45 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <span className="text-base leading-none">+</span>
                        </motion.span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
                            className="overflow-hidden"
                          >
                            {/* Visual signal — the principle, shown not told */}
                            <div className="px-4 md:px-6 pt-1 pb-6">
                              <div
                                className="rounded-xl px-4 py-4"
                                style={{ background: "hsl(var(--ivory) / 0.02)", border: "1px solid hsl(var(--ivory) / 0.06)" }}
                              >
                                <div className="max-w-md mx-auto">
                                  <LawSignal number={law.number} color={law.color} />
                                </div>
                              </div>
                            </div>
                            <div className="px-4 md:px-6 pb-8 pt-1 grid md:grid-cols-[1fr,300px] gap-6 md:gap-10">
                              <p className="text-[14px] md:text-[15px] leading-relaxed" style={{ color: "hsl(var(--ivory) / 0.66)" }}>
                                {law.detail}
                              </p>
                              <div
                                className="rounded-xl p-5"
                                style={{ background: "hsl(var(--ivory) / 0.03)", border: `1px solid hsl(${law.color} / 0.2)` }}
                              >
                                <p className="text-[10px] tracking-[0.24em] uppercase font-display mb-4" style={{ color: `hsl(${law.color})` }}>
                                  Put it to work
                                </p>
                                <ul className="space-y-3">
                                  {actions.map((a, ai) => (
                                    <motion.li
                                      key={ai}
                                      className="flex items-start gap-3 text-[13px] leading-snug"
                                      style={{ color: "hsl(var(--ivory) / 0.75)" }}
                                      initial={{ opacity: 0, x: -6 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: 0.12 + ai * 0.07 }}
                                    >
                                      <span className="mt-[6px] w-1.5 h-1.5 rounded-full shrink-0" style={{ background: `hsl(${law.color})` }} />
                                      <span>{a}.</span>
                                    </motion.li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* Completion footer */}
              <div
                className="relative px-6 md:px-10 py-6 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                style={{ borderColor: "hsl(var(--ivory) / 0.08)" }}
              >
                <AnimatePresence mode="wait">
                  {complete ? (
                    <motion.p
                      key="done"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-[13px] font-display tracking-wide"
                      style={{ color: "hsl(44 65% 62%)" }}
                    >
                      System mapped — all five laws explored. This is how a real fueling operation runs.
                    </motion.p>
                  ) : (
                    <motion.p
                      key="hint"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-[13px]"
                      style={{ color: "hsl(var(--ivory) / 0.45)" }}
                    >
                      Open each law to see the principle and how it runs in practice.
                    </motion.p>
                  )}
                </AnimatePresence>
                <Magnetic as="span" strength={6}>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-display text-[13px] font-medium tracking-wide transition-all duration-300"
                    style={{ background: "hsl(var(--ivory))", color: "hsl(var(--charcoal-deep))" }}
                  >
                    Apply the framework <span aria-hidden>→</span>
                  </Link>
                </Magnetic>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* How It Expands */}
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
                  className="p-8 md:p-10 bg-background transition-all duration-500 hover:bg-card/50 group relative overflow-hidden cursor-default"
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
            <Magnetic as="span" strength={7} className="mt-10">
              <Link
                to="/contact"
                className="group inline-flex items-center justify-center px-12 py-4 bg-foreground text-background font-display text-sm font-medium tracking-wide transition-all duration-500 hover:tracking-wider"
              >
                Get in Touch
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
};

export default FuelLaws;
