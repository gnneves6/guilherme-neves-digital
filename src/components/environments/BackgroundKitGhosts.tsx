import { AnimatePresence, motion } from "framer-motion";
import type { ShowcaseKit } from "./EnvironmentKitShowcase";

interface Props {
  kits: ShowcaseKit[];
  activeIndex: number;
}

/**
 * BackgroundKitGhosts — atmospheric prev/next jersey silhouettes rendered as
 * CSS/HTML behind the WebGL active kit and behind the text columns. Full
 * silhouettes (never clipped), softly blurred and tinted by the kit color.
 */
const BackgroundKitGhosts = ({ kits, activeIndex }: Props) => {
  const n = kits.length;
  if (n < 2) return null;
  const prev = kits[(activeIndex - 1 + n) % n];
  const next = kits[(activeIndex + 1) % n];

  const slots: Array<{ side: "left" | "right"; kit: ShowcaseKit }> = [
    { side: "left", kit: prev },
    { side: "right", kit: next },
  ];

  return (
    <div className="absolute -inset-x-32 inset-y-0 pointer-events-none z-0 overflow-visible">
      {slots.map(({ side, kit }) => {
        const horizontal =
          side === "left" ? { left: "-2%" } : { right: "-2%" };
        return (
          <div
            key={side}
            className="absolute top-1/2"
            style={{
              ...horizontal,
              transform: "translateY(-50%)",
              width: "30%",
              maxWidth: 260,
              aspectRatio: "3 / 4",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={kit.id}
                src={kit.image}
                alt=""
                aria-hidden
                draggable={false}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.18 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
                className="w-full h-full object-contain select-none"
                style={{
                  filter: `blur(3px) drop-shadow(0 18px 22px rgba(0,0,0,0.55)) drop-shadow(0 0 24px ${kit.primary}55)`,
                  transform: `scale(0.52) ${side === "left" ? "rotate(-3deg)" : "rotate(3deg)"}`,
                  transformOrigin: side === "left" ? "left center" : "right center",
                }}
              />
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default BackgroundKitGhosts;