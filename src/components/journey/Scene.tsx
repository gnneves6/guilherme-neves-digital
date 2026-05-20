import { ReactNode } from "react";
import { motion, useTransform, useReducedMotion, useMotionValue } from "framer-motion";
import { useJourney } from "./JourneyContext";

interface SceneProps {
  /** Zero-based index of this scene inside JourneyStage. */
  index: number;
  children: ReactNode;
  /** Background image painted at the back of the camera frame. */
  bgImage?: string;
  /** Filter applied to the background image. */
  bgFilter?: string;
  /** Background tone fallback color (CSS color string). */
  tone?: string;
  /** Overlay gradient painted above the bg image. */
  overlay?: string;
  /** Initial camera distance — values <1 push in, >1 pull back. */
  zoomFrom?: number;
  zoomTo?: number;
  className?: string;
}

/**
 * Scene — a single keyframe range inside the JourneyStage camera.
 *
 * Each scene maps to an equal slice of the outer scroll progress.
 * Crossfade windows overlap by ~5% so transitions feel like
 * dissolves rather than cuts.
 *
 * Without a JourneyStage parent (mobile fallback), Scene renders
 * as a normal full-bleed section so content stays readable.
 */
const Scene = ({
  index,
  children,
  bgImage,
  bgFilter = "brightness(0.4) contrast(1.12) saturate(0.7)",
  tone = "hsl(var(--charcoal-deep))",
  overlay,
  zoomFrom = 1.08,
  zoomTo = 0.98,
  className,
}: SceneProps) => {
  const ctx = useJourney();
  const reduce = useReducedMotion();

  // Always derive a progress source so hook order stays stable across
  // mobile (no stage) and desktop (active stage) renders.
  const fallbackProgress = useMotionValue(0);
  const progress = ctx?.progress ?? fallbackProgress;
  const total = ctx?.total ?? 1;

  const slice = 1 / total;
  const start = index * slice;
  const end = start + slice;
  const fadeIn = slice * 0.35;
  const fadeOut = slice * 0.35;

  const opacity = useTransform(
    progress,
    [
      Math.max(0, start - fadeIn),
      start + fadeIn * 0.3,
      end - fadeOut * 0.3,
      Math.min(1, end + fadeOut),
    ],
    [0, 1, 1, 0]
  );
  const scale = useTransform(progress, [start - fadeIn, end + fadeOut], [zoomFrom, zoomTo]);
  const y = useTransform(progress, [start - fadeIn, end + fadeOut], ["3%", "-3%"]);
  const bgScale = useTransform(progress, [start - fadeIn, end + fadeOut], [zoomFrom * 1.05, zoomTo * 0.96]);

  // --- Mobile / no-stage fallback: render as a regular section ----------
  if (!ctx || !ctx.active) {
    return (
      <section
        className={`relative min-h-screen w-full overflow-hidden ${className ?? ""}`}
        style={{ background: tone }}
      >
        {bgImage && (
          <div
            aria-hidden
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${bgImage})`, filter: bgFilter, opacity: 0.45 }}
          />
        )}
        {overlay && (
          <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: overlay }} />
        )}
        <div className="relative z-[2] w-full">{children}</div>
      </section>
    );
  }

  return (
    <motion.div
      className={`absolute inset-0 w-full h-full overflow-hidden ${className ?? ""}`}
      style={{ opacity, background: tone, willChange: "opacity, transform" }}
      aria-hidden={false}
    >
      {bgImage && (
        <motion.div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${bgImage})`,
            filter: bgFilter,
            scale: reduce ? 1 : bgScale,
          }}
        />
      )}
      {overlay && (
        <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: overlay }} />
      )}
      <motion.div
        className="relative z-[2] h-full w-full"
        style={{ scale: reduce ? 1 : scale, y: reduce ? 0 : y }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default Scene;
