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
 * The point is that it should never be noticed on its own. At these opacities
 * it registers as texture and depth; anything stronger and it becomes a pattern
 * competing with the words, which is worse than the blank page it replaces.
 * `aria-hidden` and `pointer-events-none` throughout: it is atmosphere, and
 * nothing here is content.
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

const PlanGrid = ({ size = 88, opacity = 0.045, feather = true, className = "" }: Props) => (
  <div aria-hidden className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
    <div
      className="absolute inset-0"
      style={{
        opacity,
        backgroundImage:
          "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
        backgroundSize: `${size}px ${size}px`,
        maskImage: feather
          ? "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)"
          : undefined,
        WebkitMaskImage: feather
          ? "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)"
          : undefined,
      }}
    />
    {/* The two margins of a drawn plan, and one measure mark on the left. */}
    <div
      className="absolute inset-y-0 left-[6%] w-px hidden md:block"
      style={{ background: "hsl(var(--foreground))", opacity: opacity * 1.6 }}
    />
    <div
      className="absolute inset-y-0 right-[6%] w-px hidden md:block"
      style={{ background: "hsl(var(--foreground))", opacity: opacity * 1.6 }}
    />
    <div
      className="absolute left-[6%] top-1/2 w-6 h-px hidden md:block"
      style={{ background: "hsl(var(--olive))", opacity: 0.35 }}
    />
  </div>
);

export default PlanGrid;
