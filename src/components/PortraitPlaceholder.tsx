import { cn } from "@/lib/utils";
import portrait from "@/assets/guilherme-portrait.jpg";

interface PortraitPlaceholderProps {
  className?: string;
  caption?: string;
  /**
   * CSS object-position for the portrait image. Ajusta aqui para reposicionar
   * o enquadramento (ex.: "50% 20%" puxa a foto para cima).
   * Default: "50% 30%" — centra o rosto no terço superior.
   */
  focal?: string;
  /** Force placeholder mode (hide the real photo). */
  placeholder?: boolean;
}

/**
 * Editorial portrait frame. Mostra a foto real do Guilherme com controlo de
 * enquadramento via `focal` (object-position). Se `placeholder` for true,
 * volta ao monograma tipográfico "GN".
 */
const PortraitPlaceholder = ({
  className,
  caption,
  focal = "50% 30%",
  placeholder = false,
}: PortraitPlaceholderProps) => {
  return (
    <div
      className={cn(
        "relative w-full aspect-[3/4] overflow-hidden bg-[hsl(var(--ivory-deep))]",
        className,
      )}
      aria-label={placeholder ? "Portrait — Guilherme Neves (placeholder)" : "Portrait — Guilherme Neves"}
      role="img"
    >
      {!placeholder && (
        <>
          <img
            src={portrait}
            alt="Guilherme Neves — RSC Anderlecht"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: focal }}
          />
          {/* Editorial tone: warm ivory wash + subtle bottom vignette */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, hsl(var(--ivory-deep) / 0.10) 0%, transparent 30%, transparent 70%, hsl(var(--charcoal-deep) / 0.18) 100%)",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-[0.08]"
            style={{
              background:
                "repeating-linear-gradient(90deg, hsl(var(--charcoal-deep)) 0 1px, transparent 1px 3px)",
            }}
          />
        </>
      )}

      {placeholder && (
        <>
      {/* Subtle vertical grain band — like exposed film */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.18]"
        style={{
          background:
            "repeating-linear-gradient(90deg, hsl(var(--charcoal-deep) / 0.06) 0 1px, transparent 1px 3px)",
        }}
      />
      {/* Soft top-light wash */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 45% at 50% 18%, hsl(var(--background) / 0.55) 0%, transparent 70%)",
        }}
      />

      {/* Monogram + meta */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <span
          className="font-display font-semibold leading-none text-[hsl(var(--charcoal-deep))] tracking-tight"
          style={{ fontSize: "clamp(96px, 22vw, 220px)" }}
        >
          GN
        </span>
        <span className="mt-6 text-[10px] tracking-[0.32em] uppercase font-display text-[hsl(var(--charcoal-deep)/0.55)]">
          Portrait — forthcoming
        </span>
      </div>
        </>
      )}

      {/* Frame ticks — top-left + bottom-right */}
      <div aria-hidden className="absolute top-3 left-3 w-4 h-4 border-l border-t border-[hsl(var(--charcoal-deep)/0.35)]" />
      <div aria-hidden className="absolute bottom-3 right-3 w-4 h-4 border-r border-b border-[hsl(var(--charcoal-deep)/0.35)]" />

      {caption && (
        <div className="absolute -bottom-3 -left-3 bg-background px-3 py-1.5 border border-border/50">
          <p className="text-caption text-[10px]">{caption}</p>
        </div>
      )}
    </div>
  );
};

export default PortraitPlaceholder;