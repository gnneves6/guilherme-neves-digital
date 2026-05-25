import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";
import { usePointer } from "@/components/journey/PointerField";

export interface ShowcaseKit {
  id: string;
  name: string;
  image: string;
  primary: string;
  secondary: string;
  accent?: string;
}

interface Props {
  kits: ShowcaseKit[];
  activeIndex: number;
  /** Compact mode shrinks layout for narrower viewports. */
  compact?: boolean;
}

/**
 * EnvironmentKitShowcase — floating archive of three layered jerseys on a
 * rotating pedestal. Always shows prev / active / next (cyclic). Active kit
 * is forward, sharper, larger; siblings recede with blur + dim. Designed as
 * a luxury display object, not a slider.
 */
const EnvironmentKitShowcase = ({ kits, activeIndex, compact = false }: Props) => {
  const reduce = useReducedMotion();
  const pointer = usePointer();
  const n = kits.length;

  const prevIndex = (activeIndex - 1 + n) % n;
  const nextIndex = (activeIndex + 1) % n;
  const active = kits[activeIndex];

  // Layout positions for three layered kits
  const slots = useMemo(
    () => [
      { key: "prev", index: prevIndex, x: compact ? -130 : -190, y: 24, scale: 0.62, z: 1, blur: 5, opacity: 0.35, rotate: -8 },
      { key: "next", index: nextIndex, x: compact ? 130 : 190, y: 24, scale: 0.62, z: 1, blur: 5, opacity: 0.35, rotate: 8 },
      { key: "active", index: activeIndex, x: 0, y: -10, scale: 1, z: 5, blur: 0, opacity: 1, rotate: 0 },
    ],
    [activeIndex, prevIndex, nextIndex, compact],
  );

  // Subtle pointer tilt only on the active kit
  const tilt = reduce ? { rx: 0, ry: 0 } : { rx: pointer.y * -5, ry: pointer.x * 8 };

  return (
    <div
      className="relative w-full h-full flex items-end justify-center"
      style={{ perspective: "1200px" }}
    >
      {/* Pedestal — disc that subtly glides/rotates per active environment */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
        style={{ bottom: compact ? 24 : 36, transformStyle: "preserve-3d" }}
        animate={{
          rotateZ: reduce ? 0 : activeIndex * 12,
        }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          aria-hidden
          className="rounded-full"
          style={{
            width: compact ? 260 : 320,
            height: compact ? 36 : 48,
            transform: "rotateX(70deg)",
            background: `radial-gradient(ellipse at center, ${active.primary}55 0%, ${active.primary}22 35%, transparent 70%)`,
            boxShadow: `0 30px 60px -20px ${active.primary}33, inset 0 0 0 1px hsl(var(--ivory) / 0.05)`,
            filter: "blur(0.3px)",
          }}
        />
        {/* Pedestal rim glow */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 mx-auto rounded-full"
          style={{
            width: compact ? 240 : 300,
            height: 1.5,
            background: `linear-gradient(90deg, transparent 0%, ${active.primary}aa 50%, transparent 100%)`,
            opacity: 0.7,
          }}
        />
      </motion.div>

      {/* Floor mist */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 pointer-events-none"
        style={{
          height: 120,
          background: `radial-gradient(ellipse at 50% 100%, ${active.primary}26 0%, transparent 70%)`,
          mixBlendMode: "screen",
        }}
      />

      {/* Three layered kits */}
      <div
        className="relative"
        style={{
          width: compact ? 360 : 460,
          height: compact ? 300 : 360,
          transformStyle: "preserve-3d",
        }}
      >
        {slots.map((slot) => {
          const kit = kits[slot.index];
          const isActive = slot.key === "active";
          const baseW = compact ? 200 : 280;
          const baseH = compact ? 240 : 340;
          return (
            <motion.div
              key={slot.key}
              className="absolute left-1/2 top-1/2"
              style={{
                width: baseW,
                height: baseH,
                marginLeft: -baseW / 2,
                marginTop: -baseH / 2,
                zIndex: slot.z,
                transformStyle: "preserve-3d",
              }}
              animate={{
                x: slot.x,
                y: slot.y,
                scale: slot.scale,
                rotateZ: slot.rotate,
                filter: `blur(${slot.blur}px)`,
                opacity: slot.opacity,
              }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="w-full h-full"
                style={{ transformStyle: "preserve-3d", transformOrigin: "50% 60%" }}
                animate={isActive ? { rotateX: tilt.rx, rotateY: tilt.ry } : { rotateX: 0, rotateY: 0 }}
                transition={{ type: "spring", stiffness: 60, damping: 14 }}
              >
                {/* Glow halo behind active kit */}
                {isActive && (
                  <div
                    aria-hidden
                    className="absolute inset-0 -z-10"
                    style={{
                      background: `radial-gradient(ellipse at 50% 45%, ${kit.primary}55 0%, transparent 65%)`,
                      filter: "blur(28px)",
                    }}
                  />
                )}
                <img
                  src={kit.image}
                  alt={kit.name}
                  draggable={false}
                  className="w-full h-full object-contain select-none"
                  style={{
                    filter: isActive
                      ? `drop-shadow(0 30px 40px rgba(0,0,0,0.55)) drop-shadow(0 0 30px ${kit.primary}55)`
                      : "drop-shadow(0 18px 24px rgba(0,0,0,0.5)) brightness(0.7) saturate(0.7)",
                  }}
                />
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default EnvironmentKitShowcase;