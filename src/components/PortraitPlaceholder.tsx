import { cn } from "@/lib/utils";

interface PortraitPlaceholderProps {
  className?: string;
  caption?: string;
}

/**
 * Editorial placeholder used until the real portrait photo is uploaded.
 * Tipográfico, sóbrio, propositado — não parece "imagem em falta", parece capa.
 */
const PortraitPlaceholder = ({ className, caption }: PortraitPlaceholderProps) => {
  return (
    <div
      className={cn(
        "relative w-full aspect-[3/4] overflow-hidden bg-[hsl(var(--ivory-deep))]",
        className,
      )}
      aria-label="Portrait — Guilherme Neves (placeholder)"
      role="img"
    >
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