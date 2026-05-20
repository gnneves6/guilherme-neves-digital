import { usePointer } from "./PointerField";

interface SpotlightProps {
  /** Light tint as a `hsl(...)` or `rgba(...)` string. */
  color?: string;
  /** Radius in px. */
  size?: number;
  /** 0..1 max opacity at the center. */
  intensity?: number;
  /** Pointer follow strength (px the light drifts from cursor center). */
  follow?: number;
  /** Tailwind className for stacking. */
  className?: string;
}

/**
 * Spotlight — soft radial light that follows the global pointer. Purely
 * decorative, `pointer-events-none`. Falls back to a static centered glow
 * when the pointer field is inactive (touch/reduced-motion).
 */
const Spotlight = ({
  color = "hsl(var(--ivory) / 0.08)",
  size = 520,
  intensity = 1,
  follow = 18,
  className,
}: SpotlightProps) => {
  const { x, y, active } = usePointer();
  const cx = 50 + (active ? x * follow : 0);
  const cy = 50 + (active ? y * follow : 0);

  return (
    <div
      aria-hidden
      className={"pointer-events-none absolute inset-0 transition-[background] duration-300 ease-out " + (className ?? "")}
      style={{
        opacity: intensity,
        background: `radial-gradient(circle ${size}px at ${cx}% ${cy}%, ${color}, transparent 65%)`,
      }}
    />
  );
};

export default Spotlight;