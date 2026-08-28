import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";

/**
 * What you can have, in order of how much it costs you.
 *
 * The offer was spread across two pages and organised by the wrong thing.
 * Work sorts by where something was built, Services sorts by what is sold, and
 * neither answers the question a visitor actually arrives with: what can I get,
 * and is any of it for me. They had to go and assemble that themselves, across
 * pages, before anything felt like value.
 *
 * So this sorts by the only axis that matters to a stranger, which is what it
 * asks of them. Take something and go. Use something now. Bring him in. Three
 * rungs, one line each, one door each, and the first one is free with nothing
 * asked in return, because most people who land here will never buy anything
 * and should still leave with something.
 *
 * It sits between the argument and the invitation deliberately. By that point
 * they know who he is and what he thinks; this is the first moment the page
 * offers rather than explains, and the invitation right after it then has
 * something concrete to invite about.
 */
const rungs = [
  {
    cost: "Free",
    title: "Take something and go",
    body: "The five checks I run first, the ABC series, and the weekly research routine I built for myself and then gave away. No email, no form.",
    to: "/fuel-laws",
    cta: "Take the five checks",
    forWhom: "Anyone",
  },
  {
    cost: "Free",
    title: "Use something now",
    body: "Set a kick-off and a body weight, and watch the week resolve around it. The same structure I run inside a club, open on this site.",
    to: "/services#run-the-system",
    cta: "Run the matchday planner",
    forWhom: "Athletes · Practitioners",
  },
  {
    cost: "Engagement",
    title: "Bring me into the environment",
    body: "Read the operation, build what is missing, and stay close enough for long enough that it still holds after I have gone.",
    to: "/services",
    cta: "See how the work starts",
    forWhom: "Clubs · Federations · Elite athletes",
  },
];

const TheLadder = () => (
  <section className="section-padding section-spacing-sm relative">
    <div className="max-content">
      <Reveal>
        <p className="text-caption mb-6">What you can have</p>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="text-headline max-w-3xl">
          Three ways in, and the first two cost you nothing.
        </h2>
      </Reveal>

      <div className="mt-12 md:mt-16 border-t border-border/60">
        {rungs.map((r, i) => (
          <Reveal key={r.title} delay={0.12 + i * 0.08}>
            <Link
              to={r.to}
              className="group grid md:grid-cols-[120px,1fr,auto] gap-4 md:gap-10 items-baseline py-8 md:py-9 border-b border-border/60 transition-colors duration-300 hover:bg-card/40"
            >
              <span
                className="text-[10px] tracking-[0.24em] uppercase font-display"
                style={{ color: i === 2 ? "hsl(var(--olive))" : "hsl(var(--muted-foreground))" }}
              >
                {r.cost}
              </span>

              <span className="min-w-0">
                <span className="block font-display text-xl md:text-2xl font-medium tracking-tight text-foreground">
                  {r.title}
                </span>
                <span className="block text-body text-sm mt-2 max-w-xl leading-relaxed">{r.body}</span>
                <span className="block text-caption text-[10px] mt-3">{r.forWhom}</span>
              </span>

              <span className="inline-flex items-center gap-2 font-display text-sm tracking-wide text-muted-foreground group-hover:text-foreground transition-colors duration-300 whitespace-nowrap">
                {r.cta}
                <motion.span
                  aria-hidden
                  className="inline-block"
                  initial={false}
                  whileHover={{ x: 3 }}
                >
                  →
                </motion.span>
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default TheLadder;
