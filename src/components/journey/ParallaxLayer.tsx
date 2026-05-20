import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { usePointer } from "./PointerField";

interface ParallaxLayerProps {
  children: ReactNode;
  /** Pointer offset multiplier in px (negative = inverse). */
  strength?: number;
  /** Z-depth label — purely organisational, not used for styling. */
  depth?: "back" | "mid" | "front";
  className?: string;
}

/**
 * ParallaxLayer — translates with the global pointer. Used to layer
 * background/midground/foreground inside a Scene so mouse movement
 * visibly shifts the frame.
 */
const ParallaxLayer = ({ children, strength = 14, className }: ParallaxLayerProps) => {
  const { x, y } = usePointer();
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      style={{
        x: reduce ? 0 : x * strength,
        y: reduce ? 0 : y * strength,
        willChange: "transform",
      }}
      transition={{ type: "tween", duration: 0.4, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default ParallaxLayer;
