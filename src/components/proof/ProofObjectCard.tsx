import { ReactNode, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import ProofObjectStage from "./ProofObjectStage";
import type { ProofObjectMeta, ProofObjectType } from "./ProofObjectTypes";

interface ProofObjectCardProps {
  index: number;
  type: ProofObjectType;
  title: string;
  description: string;
  category: string;
  ctaLabel: string;
  meta: ProofObjectMeta;
  /** Atmospheric cover image (optional, replaceable as assets land). */
  cover?: string;
  /** Fallback rendered inside the cover slot when no cover image exists. */
  stageFallback?: ReactNode;
  onClick: () => void;
  /** Base rotation (deg), scatter table arrangement. */
  rotate?: number;
  /** Z-index inside scatter layout. */
  z?: number;
}

/**
 * ProofObjectCard, reusable card composing a ProofObjectStage with
 * editorial metadata. Stays a button so resource modals continue to open.
 */
const ProofObjectCard = ({
  index,
  type,
  title,
  description,
  category,
  ctaLabel,
  meta,
  cover,
  stageFallback,
  onClick,
  rotate = 0,
  z = 1,
}: ProofObjectCardProps) => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLButtonElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, gx: 50, gy: 50 });

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (reduce) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setTilt({
      x: (py - 0.5) * -6, // rotateX
      y: (px - 0.5) * 8,  // rotateY
      gx: px * 100,
      gy: py * 100,
    });
  };
  const handleLeave = () => setTilt({ x: 0, y: 0, gx: 50, gy: 50 });

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onFocus={handleLeave}
      initial={{ rotate: reduce ? 0 : rotate, y: 0 }}
      whileHover={reduce ? undefined : { y: -10, rotate: 0, scale: 1.015 }}
      whileFocus={reduce ? undefined : { y: -10, rotate: 0, scale: 1.015 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: "hsl(var(--charcoal-deep))",
        zIndex: z,
        transformStyle: "preserve-3d",
      }}
      className="block w-full text-left group relative overflow-hidden h-full focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[hsl(var(--ivory)/0.4)] transition-shadow duration-500 hover:shadow-[0_28px_70px_-20px_hsl(0_0%_0%/0.7)] focus-visible:shadow-[0_28px_70px_-20px_hsl(0_0%_0%/0.7)]"
    >
      {/* Inner tilt layer, driven by local mouse, respects reduced-motion */}
      <motion.div
        className="relative will-change-transform"
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: "spring", stiffness: 140, damping: 18, mass: 0.4 }}
        style={{ transformStyle: "preserve-3d", transformPerspective: 900 }}
      >
        {/* Top hairline reveal */}
        <div className="absolute top-0 left-0 right-0 h-px z-10 overflow-hidden">
          <div
            className="w-0 h-full group-hover:w-full group-focus-visible:w-full transition-all duration-700 ease-out"
            style={{ background: "hsl(var(--ivory) / 0.22)" }}
          />
        </div>

        <ProofObjectStage
          type={type}
          cover={cover}
          fallback={stageFallback}
          index={index}
          category={category}
        />

        {/* Pointer-driven glare, moves with local cursor */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle 220px at ${tilt.gx}% ${tilt.gy}%, hsl(var(--ivory) / 0.14), transparent 60%)`,
            mixBlendMode: "screen",
          }}
        />

        {/* Shadow plate under the object */}
        <div
          aria-hidden
          className="absolute left-1/2 -translate-x-1/2 w-3/4 h-3 blur-md opacity-0 group-hover:opacity-50 group-focus-visible:opacity-50 transition-opacity duration-700"
          style={{ top: "calc(56.25% - 6px)", background: "hsl(0 0% 0% / 0.55)" }}
        />

        <div className="p-7 md:p-8">
          <div className="flex items-center justify-between mb-4 gap-3">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: meta.groupDot }} />
              <span className="text-[9px] tracking-[0.25em] uppercase font-display text-[hsl(var(--ivory)/0.6)]">
                {meta.groupShort}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: meta.statusDot }} />
              <span className="text-[9px] tracking-[0.25em] uppercase font-display text-[hsl(var(--ivory)/0.5)]">
                {meta.statusLabel}
              </span>
            </div>
          </div>

          <h3
            className="font-display text-lg md:text-xl font-medium leading-snug"
            style={{ color: "hsl(var(--ivory) / 0.95)" }}
          >
            {title}
          </h3>
          <p
            className="text-sm mt-3 leading-relaxed opacity-70 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-500"
            style={{ color: "hsl(var(--ivory) / 0.7)" }}
          >
            {description}
          </p>

          <span
            className="inline-block mt-6 text-xs opacity-60 group-hover:opacity-100 group-focus-visible:opacity-100 group-hover:translate-x-1 group-focus-visible:translate-x-1 transition-all duration-500"
            style={{ color: "hsl(var(--ivory) / 0.85)" }}
          >
            {ctaLabel} →
          </span>
        </div>
      </motion.div>
    </motion.button>
  );
};

export default ProofObjectCard;