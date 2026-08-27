import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * The ivory ground, stopped from being blank paper.
 *
 * Most of this site is one flat cream colour, and long stretches of it read as
 * an unfinished page rather than as a deliberate one. This lays a technical
 * drawing under the text: a fine measuring grid, two heavier rules where the
 * eye already expects a margin, and a single olive tick. The metaphor is the
 * one the work already uses everywhere else, a plan of an environment before
 * anything is prescribed, and it is the same schematic language as the fuel
 * laws console and the artefact covers rather than a new idea bolted on.
 *
 * It also moves, which is the difference between a background and a backdrop.
 * The grid drifts against the page at a fraction of scroll speed, so the text
 * separates from the paper instead of being printed on it, and the olive tick
 * travels down the left margin as the section passes, like the head of a
 * measuring instrument working down a drawing. Both are tied to scroll rather
 * than to a clock: nothing here moves unless the reader is moving.
 *
 * The point is that it should never be noticed on its own. At these opacities
 * it registers as texture and depth; anything stronger and it becomes a pattern
 * competing with the words, which is worse than the blank page it replaces. The
 * same rule governs the drift: 40 pixels across a whole section is felt and not
 * seen. `aria-hidden` and `pointer-events-none` throughout: it is atmosphere,
 * and nothing here is content.
 */
interface Props {
  /** Grid pitch in pixels. Larger reads calmer; smaller reads like graph paper. */
  size?: number;
  /** Overall strength. The default is deliberately near the threshold of sight. */
  opacity?: number;
  /** Fades the motif out at the top and bottom so it never meets a section seam. */
  feather?: boolean;
  className?: string;
}

const mask = "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)";

const PlanGrid = ({ size = 88, opacity = 0.045, feather = true, className = "" }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = !!useReducedMotion();

  // Measured across the section's whole pass through the viewport, so the
  // drift is a property of where the reader is in the section rather than of
  // where they are on the page.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const gridY = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const tickTop = useTransform(scrollYProgress, [0.05, 0.95], ["14%", "86%"]);
  const tickWidth = useTransform(scrollYProgress, [0, 0.5, 1], [16, 34, 16]);

  return (
    <div
      ref={ref}
      aria-hidden
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      // The feather lives here, on the section's own box, not on the grid.
      // The grid is taller than the section so the drift never pulls an edge
      // into view, and a mask measured against that taller box fades in above
      // the section, leaving the grid at full strength exactly where the two
      // sections meet, which is the seam the feather exists to hide.
      style={{
        maskImage: feather ? mask : undefined,
        WebkitMaskImage: feather ? mask : undefined,
      }}
    >
      <motion.div
        className="absolute -top-16 -bottom-16 inset-x-0"
        style={{
          opacity,
          y: reduce ? 0 : gridY,
          backgroundImage:
            "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: `${size}px ${size}px`,
        }}
      />
      {/* The two margins of a drawn plan, and one measure mark that travels. */}
      <div
        className="absolute inset-y-0 left-[6%] w-px hidden md:block"
        style={{ background: "hsl(var(--foreground))", opacity: opacity * 1.6 }}
      />
      <div
        className="absolute inset-y-0 right-[6%] w-px hidden md:block"
        style={{ background: "hsl(var(--foreground))", opacity: opacity * 1.6 }}
      />
      <motion.div
        className="absolute left-[6%] h-px hidden md:block"
        style={{
          background: "hsl(var(--olive))",
          opacity: 0.35,
          top: reduce ? "50%" : tickTop,
          width: reduce ? 24 : tickWidth,
        }}
      />
    </div>
  );
};

export default PlanGrid;
