import { ReactNode, useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export type SceneTone = "light" | "dim" | "deep" | "dark" | "cinematic";
export type SceneSpacing = "sm" | "md" | "lg" | "xl";

interface SceneProps {
  id?: string;
  tone?: SceneTone;
  /** Optional atmospheric background image (URL or imported asset). Used as atmosphere only — never as UI. */
  bgImage?: string;
  /** Optional overlay gradient layered above the bg image, below content. */
  overlayGradient?: string;
  /** Add a soft animated grain texture above the bg image. */
  grain?: boolean;
  /** Parallax intensity 0–1. 0 disables. */
  parallax?: number;
  /** Vertical rhythm of the scene. */
  spacing?: SceneSpacing;
  /** Dissolve transition into the next scene's tone. Pass a CSS color (hsl(var(--…))). */
  fadeBottomTo?: string;
  /** Dissolve transition coming from the previous scene's tone. */
  fadeTopFrom?: string;
  className?: string;
  contentClassName?: string;
  children: ReactNode;
}

const spacingClass: Record<SceneSpacing, string> = {
  sm: "py-16 md:py-24",
  md: "py-24 md:py-32",
  lg: "py-28 md:py-40",
  xl: "py-32 md:py-48",
};

const toneClass: Record<SceneTone, string> = {
  light: "scene-light",
  dim: "scene-dim",
  deep: "scene-deep",
  dark: "scene-dark",
  cinematic: "scene-cinematic",
};

/**
 * Scene — cinematic chapter wrapper.
 *
 * Provides tone, optional atmospheric background image, overlay gradient,
 * grain layer, parallax and dissolve transitions. Content stays as real HTML;
 * images are treated as atmosphere only.
 */
const Scene = ({
  id,
  tone = "light",
  bgImage,
  overlayGradient,
  grain = false,
  parallax = 0,
  spacing = "md",
  fadeTopFrom,
  fadeBottomTo,
  className,
  contentClassName,
  children,
}: SceneProps) => {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const range = Math.max(0, Math.min(1, parallax)) * 12;
  const y = useTransform(scrollYProgress, [0, 1], [`-${range}%`, `${range}%`]);

  return (
    <section
      ref={ref}
      id={id}
      className={cn(
        "relative overflow-hidden",
        toneClass[tone],
        grain && "scene-grain",
        className,
      )}
    >
      {bgImage && (
        <motion.div
          aria-hidden
          className="absolute inset-0 z-0 pointer-events-none"
          style={{ y: reduce || parallax === 0 ? 0 : y }}
        >
          <div
            className="absolute inset-0 w-full h-[120%] -top-[10%] bg-cover bg-center"
            style={{ backgroundImage: `url(${bgImage})` }}
          />
          {overlayGradient && (
            <div
              className="absolute inset-0"
              style={{ background: overlayGradient }}
            />
          )}
        </motion.div>
      )}

      {fadeTopFrom && (
        <div
          aria-hidden
          className="absolute top-0 left-0 right-0 h-56 md:h-72 z-[2] pointer-events-none"
          style={{
            background: `linear-gradient(to bottom, ${fadeTopFrom} 0%, ${fadeTopFrom} 18%, transparent 100%)`,
          }}
        />
      )}
      {fadeBottomTo && (
        <div
          aria-hidden
          className="absolute bottom-0 left-0 right-0 h-56 md:h-72 z-[2] pointer-events-none"
          style={{
            background: `linear-gradient(to bottom, transparent 0%, ${fadeBottomTo} 82%, ${fadeBottomTo} 100%)`,
          }}
        />
      )}

      <div className={cn("relative z-[3]", spacingClass[spacing], contentClassName)}>
        {children}
      </div>
    </section>
  );
};

export default Scene;