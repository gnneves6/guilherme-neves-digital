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
  document: "hsl(35, 18%, 22%)",
  tool: "hsl(220, 16%, 14%)",
  protected: "hsl(220, 22%, 9%)",
};

/**
 * Intentional, premium fallback art per ProofObject type.
 * Document → editorial paper plate with type rule.
 * Tool     → schematic / instrument plate.
 * Protected → vault seal with redacted bars (desirable, not just blurred).
 */
const TypeFallback = ({ type }: { type: ProofObjectType }) => {
  if (type === "document") {
    return (
      <div className="absolute inset-0 flex items-center justify-center p-8">
        <div
          className="relative w-[62%] aspect-[3/4] shadow-[0_20px_50px_-15px_hsl(0_0%_0%/0.7)]"
          style={{ background: "hsl(40 22% 90%)" }}
        >
          <div className="absolute inset-x-6 top-7 space-y-2">
            <div className="h-px w-10" style={{ background: "hsl(220 15% 25% / 0.6)" }} />
            <div className="h-1.5 w-20" style={{ background: "hsl(220 15% 25% / 0.85)" }} />
            <div className="h-1 w-28" style={{ background: "hsl(220 15% 25% / 0.4)" }} />
          </div>
          <div className="absolute inset-x-6 bottom-6 space-y-1.5">
            <div className="h-px w-full" style={{ background: "hsl(220 15% 25% / 0.15)" }} />
            <div className="h-px w-3/4" style={{ background: "hsl(220 15% 25% / 0.15)" }} />
            <div className="h-px w-1/2" style={{ background: "hsl(220 15% 25% / 0.15)" }} />
          </div>
        </div>
      </div>
    );
  }
  if (type === "tool") {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <svg viewBox="0 0 200 120" className="w-2/3 h-auto opacity-80" aria-hidden>
          <g fill="none" stroke="hsl(40 28% 78%)" strokeWidth="0.6">
            <circle cx="100" cy="60" r="42" />
            <circle cx="100" cy="60" r="28" strokeOpacity="0.55" />
            <circle cx="100" cy="60" r="14" strokeOpacity="0.35" />
            <line x1="100" y1="10" x2="100" y2="110" strokeOpacity="0.25" />
            <line x1="40" y1="60" x2="160" y2="60" strokeOpacity="0.25" />
            <line x1="100" y1="60" x2="135" y2="35" stroke="hsl(155 30% 55%)" strokeWidth="1" />
            <circle cx="135" cy="35" r="2" fill="hsl(155 30% 55%)" stroke="none" />
          </g>
        </svg>
      </div>
    );
  }
  // protected — vault seal with redacted bars
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
      <div
        className="w-12 h-12 rounded-full border flex items-center justify-center"
        style={{
          borderColor: "hsl(40 33% 90% / 0.35)",
          background: "hsl(40 33% 90% / 0.04)",
        }}
      >
        <span
          className="text-[10px] tracking-[0.3em] font-display"
          style={{ color: "hsl(40 33% 90% / 0.7)" }}
        >
          GN
        </span>
      </div>
      <div className="w-[60%] space-y-1.5">
        <div className="h-2" style={{ background: "hsl(40 33% 90% / 0.18)" }} />
        <div className="h-2 w-3/4" style={{ background: "hsl(40 33% 90% / 0.12)" }} />
        <div className="h-2 w-1/2" style={{ background: "hsl(40 33% 90% / 0.18)" }} />
      </div>
      <span
        className="text-[8px] tracking-[0.45em] uppercase font-display"
        style={{ color: "hsl(40 33% 90% / 0.55)" }}
      >
        Protected casework
      </span>
    </div>
  );
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
          fallback ?? <TypeFallback type={type} />
        )}
      </div>

      {/* Protected blur veil */}
      {type === "protected" && (
        <div
          aria-hidden
          className="absolute inset-0 backdrop-blur-[1px]"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, hsl(var(--charcoal-deep) / 0.15), hsl(var(--charcoal-deep) / 0.55))",
          }}
        />
      )}

      {/* Material / glare overlay — sweeps on hover */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
        style={{
          background:
            "linear-gradient(115deg, transparent 30%, hsl(var(--ivory) / 0.09) 50%, transparent 70%)",
        }}
      />

      {/* Inner vignette — gives every object a soft floor */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 85% 65% at 50% 55%, transparent 0%, hsl(var(--charcoal-deep) / 0.45) 100%)",
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