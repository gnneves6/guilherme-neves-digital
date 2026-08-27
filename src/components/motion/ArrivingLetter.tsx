import { useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * The enquiry form, delivered rather than displayed.
 *
 * A contact form is the least interesting object on any website: a stack of
 * grey lines that is simply there, waiting, from the moment the page loads. It
 * is also the one thing on this site that asks a stranger to do real work, so
 * it is the last place that should feel like furniture.
 *
 * So it arrives. A sheet comes in from off the bottom right, turned slightly,
 * overshoots, and settles square into the place it belongs, and only when it
 * has landed can anything be typed into it. Nothing is animated for its own
 * sake here: the delay is the point. You watch a blank sheet be put in front
 * of you, which is a different invitation from finding one already lying
 * there, and it costs about a second.
 *
 * It reads as paper because everything else on these pages is a plan drawn on
 * paper: the ground is a measuring grid, the artefacts are photographs of real
 * documents. A sheet with a margin rule down the left is the same language,
 * not a new one.
 *
 * Triggered by coming into view rather than by scroll position, so it happens
 * on a phone, on a keyboard, and inside a frame that cannot scroll. Under
 * reduced motion there is no flight at all: the sheet is simply there, and
 * usable, from the first frame.
 */
const ArrivingLetter = ({ children }: { children: ReactNode }) => {
  const reduce = !!useReducedMotion();
  // Nothing can be typed into a sheet that is still in the air. Also stops a
  // click landing on a field that is about to move out from under it.
  const [landed, setLanded] = useState(reduce);

  const paper = (
    <div
      className="relative px-6 py-8 sm:px-10 sm:py-11"
      style={{
        background: "hsl(41 50% 97%)",
        boxShadow:
          "0 1px 1px hsl(40 20% 40% / 0.05), 0 18px 40px -24px hsl(40 25% 25% / 0.35)",
        border: "1px solid hsl(var(--subtle-border))",
      }}
    >
      {/* The margin of a written page. */}
      <span
        aria-hidden
        className="absolute inset-y-6 left-3 sm:left-5 w-px"
        style={{ background: "hsl(var(--olive) / 0.28)" }}
      />
      {children}
    </div>
  );

  if (reduce) return paper;

  return (
    <motion.div
      initial={{ opacity: 0, y: 150, x: 54, rotate: -6.5, scale: 0.94 }}
      whileInView={{
        opacity: 1,
        // Overshoots and comes back. A sheet put down on a desk does not stop
        // dead, and the difference between this and a straight ease is the
        // difference between an object arriving and a div appearing.
        y: [150, -14, 0],
        x: [54, -4, 0],
        rotate: [-6.5, 1.1, 0],
        scale: [0.94, 1.012, 1],
      }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1], times: [0, 0.72, 1] }}
      onAnimationComplete={() => setLanded(true)}
      style={{
        pointerEvents: landed ? "auto" : "none",
        transformOrigin: "70% 100%",
        willChange: "transform",
      }}
    >
      {paper}
    </motion.div>
  );
};

export default ArrivingLetter;
