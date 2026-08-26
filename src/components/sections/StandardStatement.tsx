import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

/**
 * The claim, made by striking out the thing it is not.
 *
 * A single line stating what the work is asks to be agreed with. Showing the
 * assumption first, then drawing a line through it, makes the reader watch
 * their own reference get corrected, which is a different and much stickier
 * kind of persuasion: they do not receive a claim, they revise one.
 *
 * Three strikes and then the standard, because the objection is never just one
 * thing. A document, a template, a thing that dates. The rule is drawn left to
 * right at reading speed rather than appearing complete, so it reads as an
 * argument being made rather than as a graphic.
 *
 * Under reduced motion nothing is drawn or staggered: the struck lines arrive
 * already struck and the standard arrives with them. The meaning survives, the
 * movement does not.
 */
const struck = [
  "Not a document that looks good in a meeting.",
  "Not a plan that fits everyone and no one.",
  "Not advice that dates the week after it lands.",
];

const StandardStatement = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-25%" });
  const reduce = !!useReducedMotion();
  const play = inView || reduce;

  return (
    <div ref={ref} className="max-content">
      <motion.p
        className="text-caption mb-8 md:mb-10"
        style={{ color: "hsl(var(--ivory) / 0.5)" }}
        initial={{ opacity: 0 }}
        animate={play ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
      >
        The standard
      </motion.p>

      <ul className="space-y-3 md:space-y-4 mb-9 md:mb-12">
        {struck.map((line, i) => (
          // The list item is block so the lines stack; the inner span is
          // inline-block so the rule spans the sentence and not the column.
          <li key={line}>
            <span className="relative inline-block">
            <motion.span
              className="font-display text-lg md:text-2xl lg:text-[1.75rem] font-light leading-snug tracking-tight block"
              style={{ color: "hsl(var(--ivory) / 0.42)" }}
              initial={{ opacity: 0, y: 8 }}
              animate={play ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: reduce ? 0 : 0.25 + i * 0.55 }}
            >
              {line}
            </motion.span>
            {/* Drawn, not placed. The line travels at about the speed the
                sentence is read, so the correction lands as it finishes. */}
            <motion.span
              aria-hidden
              className="absolute left-0 top-1/2 h-px w-full origin-left"
              style={{ background: "hsl(var(--ivory) / 0.5)" }}
              initial={{ scaleX: 0 }}
              animate={play ? { scaleX: 1 } : {}}
              transition={{
                duration: reduce ? 0 : 0.55,
                delay: reduce ? 0 : 0.6 + i * 0.55,
                ease: [0.4, 0, 0.2, 1],
              }}
            />
            </span>
          </li>
        ))}
      </ul>

      <motion.h2
        className="font-display text-2xl md:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight max-w-4xl"
        style={{ color: "hsl(var(--ivory))" }}
        initial={{ opacity: 0, y: 16 }}
        animate={play ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: reduce ? 0 : 2.15, ease: [0.16, 1, 0.3, 1] }}
      >
        A system that holds when the season gets loud, and keeps holding long
        after I have stopped being in the room.
      </motion.h2>

      <motion.p
        className="text-body-lg mt-6 max-w-xl"
        style={{ color: "hsl(var(--ivory) / 0.6)" }}
        initial={{ opacity: 0 }}
        animate={play ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: reduce ? 0 : 2.5 }}
      >
        I work with few environments, closely, for a long time. That is the only
        way any of this compounds.
      </motion.p>
    </div>
  );
};

export default StandardStatement;
