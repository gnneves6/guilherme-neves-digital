import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Thin olive progress bar fixed to the top of the viewport.
 * Subtle, non-blocking, respects reduced-motion (spring still settles instantly enough).
 */
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 22,
    mass: 0.3,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left pointer-events-none"
      style={{
        scaleX,
        background:
          "linear-gradient(to right, hsl(var(--olive) / 0.35), hsl(var(--olive)))",
      }}
    />
  );
};

export default ScrollProgress;