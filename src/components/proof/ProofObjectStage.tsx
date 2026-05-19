import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { ProofObjectType } from "./ProofObjectTypes";

interface ProofObjectStageProps {
  type: ProofObjectType;
  /** Optional cover image asset — atmosphere only. */
  cover?: string;
  /** Replaceable cover slot — used when no cover image is provided yet. */
  fallback?: ReactNode;
  /** Index used for the large numeral. */
  index: number;
  /** Editorial category tag rendered above the numeral. */
  category: string;
  className?: string;
}

const stageBg: Record<ProofObjectType, string> = {
  document: "hsl(35, 22%, 38%)",
  tool: "hsl(40, 28%, 28%)",
  protected: "hsl(220, 14%, 18%)",
};

/**
 * ProofObjectStage — the "stage" a proof object sits on:
 * shadow plate, object frame, replaceable cover slot, material/glare overlay.
 */
const ProofObjectStage = ({
  type,
  cover,
  fallback,
  index,
  category,
  className,
}: ProofObjectStageProps) => {
  return (
    <div
      className={cn(
        "relative aspect-[16/9] overflow-hidden",
        className,
      )}
      style={{ background: stageBg[type] }}
    >
      {/* Cover slot — atmosphere only, never UI */}
      <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04] will-change-transform">
        {cover ? (
          <img
            src={cover}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          fallback
        )}
      </div>

      {/* Protected blur veil */}
      {type === "protected" && (
        <div
          aria-hidden
          className="absolute inset-0 backdrop-blur-[2px]"
          style={{ background: "hsl(var(--charcoal-deep) / 0.25)" }}
        />
      )}

      {/* Material / glare overlay */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background:
            "linear-gradient(115deg, transparent 35%, hsl(var(--ivory) / 0.06) 50%, transparent 65%)",
        }}
      />

      {/* Inner vignette */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 60%, transparent 0%, hsl(var(--charcoal-deep) / 0.35) 100%)",
        }}
      />

      {/* Editorial overlay text */}
      <div className="absolute inset-0 flex flex-col justify-between p-5 z-[2]">
        <span className="text-[9px] tracking-[0.4em] uppercase font-display text-[hsl(var(--ivory)/0.5)]">
          {category}
        </span>
        <span className="font-display text-5xl md:text-6xl font-bold leading-none text-[hsl(var(--ivory)/0.12)]">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
};

export default ProofObjectStage;