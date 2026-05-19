import { ReactNode } from "react";
import { motion } from "framer-motion";
import Magnetic from "@/components/motion/Magnetic";
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
  /** Atmospheric cover image (optional — replaceable as assets land). */
  cover?: string;
  /** Fallback rendered inside the cover slot when no cover image exists. */
  stageFallback?: ReactNode;
  onClick: () => void;
}

/**
 * ProofObjectCard — reusable card composing a ProofObjectStage with
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
}: ProofObjectCardProps) => {
  return (
    <Magnetic strength={6} className="h-full">
      <motion.button
        onClick={onClick}
        whileHover={{ y: -6 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="block w-full text-left group relative overflow-hidden h-full transition-shadow duration-500 hover:shadow-[0_24px_60px_-20px_hsl(0_0%_0%/0.55)]"
        style={{ background: "hsl(var(--charcoal-deep))" }}
      >
        {/* Top hairline reveal */}
        <div className="absolute top-0 left-0 right-0 h-px z-10 overflow-hidden">
          <div
            className="w-0 h-full group-hover:w-full transition-all duration-700 ease-out"
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

        {/* Shadow plate under the object */}
        <div
          aria-hidden
          className="absolute left-1/2 -translate-x-1/2 w-3/4 h-3 blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-700"
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
            className="text-sm mt-3 leading-relaxed"
            style={{ color: "hsl(var(--ivory) / 0.55)" }}
          >
            {description}
          </p>

          <span
            className="inline-block mt-6 text-xs opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-500"
            style={{ color: "hsl(var(--ivory) / 0.85)" }}
          >
            {ctaLabel} →
          </span>
        </div>
      </motion.button>
    </Magnetic>
  );
};

export default ProofObjectCard;