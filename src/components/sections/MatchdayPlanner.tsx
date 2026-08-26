import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Reveal from "@/components/Reveal";

/**
 * MatchdayPlanner, the one section that hands the work over instead of
 * describing it.
 *
 * Everywhere else the site says systems get built. Here a visitor runs one:
 * set a kick-off and a body weight, and the MD-1 structure resolves into an
 * actual timeline with actual targets. Saying "I build practical systems" and
 * letting someone use one are not the same claim.
 *
 * It is also the section where scroll deliberately does nothing. The page
 * moves between chapters; the pointer explores inside them. Keeping those two
 * gestures separate is what stops a long page feeling like noise.
 *
 * Every number here is one this site already publishes (6 to 8 g/kg carbohydrate,
 * 35 ml/kg fluid, 1.2 g sodium, and the MD-1 timeline anchored to kick-off).
 * Nothing is invented for the demo, and the panel says plainly that real
 * engagements individualise all of it.
 */

const KICKOFFS = ["15:00", "17:00", "20:00"];

/** Offsets in hours from kick-off, matching the published MD-1 sheet. */
const STEPS: { offset: number; label: string; detail: string; key?: boolean }[] = [
  { offset: -8, label: "Breakfast", detail: "High carbohydrate, moderate protein, low fibre." },
  { offset: -4, label: "Pre-match meal", detail: "The main fuelling window. Familiar food only.", key: true },
  { offset: -1.5, label: "Pre-game snack", detail: "Easy to digest, tops up liver glycogen." },
  { offset: 0, label: "Kick-off", detail: "Fuelled, hydrated, nothing new tried today.", key: true },
  { offset: 1, label: "Half-time", detail: "Fluid with sodium, carbohydrate if the load is high." },
  { offset: 2, label: "Recovery", detail: "Protein and carbohydrate together, then rehydrate to plan." },
];

const addHours = (hhmm: string, hours: number) => {
  const [h, m] = hhmm.split(":").map(Number);
  let total = h * 60 + m + Math.round(hours * 60);
  total = ((total % 1440) + 1440) % 1440;
  const nh = Math.floor(total / 60);
  const nm = total % 60;
  return `${String(nh).padStart(2, "0")}:${String(nm).padStart(2, "0")}`;
};

const MatchdayPlanner = () => {
  const [kickOff, setKickOff] = useState("17:00");
  const [weight, setWeight] = useState(78);

  const targets = useMemo(
    () => ({
      choLow: Math.round(6 * weight),
      choHigh: Math.round(8 * weight),
      fluid: (35 * weight) / 1000,
      sodium: 1.2,
    }),
    [weight]
  );

  return (
    // Anchored, because the ladder on the home page sends people straight
    // here. A link that lands at the top of a six thousand pixel page is not a
    // link to the planner, it is a link to the page the planner is on.
    <section id="run-the-system" className="section-padding section-spacing scroll-mt-24">
      <div className="max-content">
        <Reveal>
          <div className="flex items-baseline justify-between gap-6 flex-wrap mb-6">
            <p className="text-caption">Run the system</p>
            <p className="text-caption text-[10px] opacity-50">Matchday Fuel · live</p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-headline max-w-2xl">
            Set a kick-off. Watch the week resolve around it.
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="text-body-lg max-w-xl mt-5 mb-12">
            This is the matchday structure I use, running. Change the two things that
            change everything else, and read what the athlete actually does.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: "hsl(var(--charcoal-deep))",
              boxShadow: "0 40px 80px -40px hsl(45 12% 6% / 0.45)",
            }}
          >
            {/* Controls */}
            <div
              className="grid md:grid-cols-2 gap-8 md:gap-12 p-6 md:p-10"
              style={{ borderBottom: "1px solid hsl(var(--ivory) / 0.08)" }}
            >
              <div>
                <p className="text-[10px] tracking-[0.28em] uppercase font-display mb-4" style={{ color: "hsl(var(--ivory) / 0.4)" }}>
                  Kick-off
                </p>
                <div className="flex flex-wrap gap-2">
                  {KICKOFFS.map((k) => {
                    const active = k === kickOff;
                    return (
                      <button
                        key={k}
                        onClick={() => setKickOff(k)}
                        aria-pressed={active}
                        className="px-5 py-2.5 rounded-lg font-display text-sm tabular-nums transition-all duration-300"
                        style={{
                          background: active ? "hsl(var(--ivory))" : "hsl(var(--ivory) / 0.05)",
                          color: active ? "hsl(var(--charcoal-deep))" : "hsl(var(--ivory) / 0.7)",
                          border: `1px solid ${active ? "hsl(var(--ivory))" : "hsl(var(--ivory) / 0.12)"}`,
                        }}
                      >
                        {k}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <div className="flex items-baseline justify-between mb-4">
                  <p className="text-[10px] tracking-[0.28em] uppercase font-display" style={{ color: "hsl(var(--ivory) / 0.4)" }}>
                    Body weight
                  </p>
                  <span className="font-display text-lg tabular-nums" style={{ color: "hsl(var(--ivory))" }}>
                    {weight} kg
                  </span>
                </div>
                <input
                  type="range"
                  min={55}
                  max={100}
                  step={1}
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  aria-label="Body weight in kilograms"
                  className="w-full accent-white cursor-pointer"
                  style={{ accentColor: "hsl(var(--ivory))" }}
                />
              </div>
            </div>

            {/* Targets */}
            <div
              className="grid grid-cols-3 divide-x"
              style={{ borderBottom: "1px solid hsl(var(--ivory) / 0.08)", borderColor: "hsl(var(--ivory) / 0.08)" }}
            >
              {[
                { k: "Carbohydrate, MD-1", v: `${targets.choLow} to ${targets.choHigh} g`, s: "6 to 8 g/kg" },
                { k: "Fluid, match day", v: `${targets.fluid.toFixed(1)} L`, s: "35 ml/kg" },
                { k: "Sodium", v: `${targets.sodium} g`, s: "Adjusted by sweat test" },
              ].map((t) => (
                <div key={t.k} className="px-4 md:px-8 py-6">
                  <p className="text-[9px] tracking-[0.22em] uppercase font-display" style={{ color: "hsl(var(--ivory) / 0.38)" }}>
                    {t.k}
                  </p>
                  <motion.p
                    key={t.v}
                    initial={{ opacity: 0.4 }}
                    animate={{ opacity: 1 }}
                    className="font-display text-xl md:text-3xl font-semibold tabular-nums mt-2"
                    style={{ color: "hsl(var(--ivory))" }}
                  >
                    {t.v}
                  </motion.p>
                  <p className="text-[10px] mt-1" style={{ color: "hsl(var(--ivory) / 0.35)" }}>
                    {t.s}
                  </p>
                </div>
              ))}
            </div>

            {/* Timeline */}
            <div className="p-6 md:p-10">
              <ol className="relative">
                <span
                  aria-hidden
                  className="absolute left-[7px] top-2 bottom-2 w-px"
                  style={{ background: "hsl(var(--ivory) / 0.1)" }}
                />
                {STEPS.map((s) => (
                  <li key={s.label} className="relative pl-8 py-3.5 flex flex-wrap items-baseline gap-x-5 gap-y-1">
                    <span
                      aria-hidden
                      className="absolute left-0 top-[19px] rounded-full"
                      style={{
                        width: s.key ? 15 : 9,
                        height: s.key ? 15 : 9,
                        marginLeft: s.key ? 0 : 3,
                        background: s.key ? "hsl(44 65% 58%)" : "hsl(var(--ivory) / 0.28)",
                        boxShadow: s.key ? "0 0 14px hsl(44 65% 58% / 0.45)" : "none",
                      }}
                    />
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.span
                        key={addHours(kickOff, s.offset)}
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.28 }}
                        className="font-display text-base md:text-lg tabular-nums w-[4.5rem] shrink-0"
                        style={{ color: s.key ? "hsl(var(--ivory))" : "hsl(var(--ivory) / 0.6)" }}
                      >
                        {addHours(kickOff, s.offset)}
                      </motion.span>
                    </AnimatePresence>
                    <span
                      className="font-display text-sm md:text-base w-[9.5rem] shrink-0"
                      style={{ color: s.key ? "hsl(var(--ivory))" : "hsl(var(--ivory) / 0.72)" }}
                    >
                      {s.label}
                    </span>
                    <span className="text-[13px] leading-snug" style={{ color: "hsl(var(--ivory) / 0.45)" }}>
                      {s.detail}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            {/* The honest line */}
            <div
              className="px-6 md:px-10 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              style={{ borderTop: "1px solid hsl(var(--ivory) / 0.08)" }}
            >
              <p className="text-[12px] leading-relaxed max-w-xl" style={{ color: "hsl(var(--ivory) / 0.45)" }}>
                A demonstration, using published ranges. Inside a real environment every
                number moves with the athlete, the calendar and the travel.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-display text-[13px] font-medium shrink-0 transition-opacity duration-300 hover:opacity-85"
                style={{ background: "hsl(var(--ivory))", color: "hsl(var(--charcoal-deep))" }}
              >
                Build this for your team <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default MatchdayPlanner;
