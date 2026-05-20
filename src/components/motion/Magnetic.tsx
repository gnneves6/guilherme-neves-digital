import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { ReactNode, useEffect, useRef, useState } from "react";

interface MagneticProps {
  children: ReactNode;
  strength?: number; // px of max pull
  className?: string;
  as?: "div" | "span";
}

/**
 * Desktop-only magnetic hover. Skips on reduced-motion and coarse pointers.
 * Wraps content; itself renders as inline-block by default to preserve layout.
 */
const Magnetic = ({ children, strength = 10, className, as = "div" }: MagneticProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 });

  useEffect(() => {
    if (reduce) return;
    const mql = window.matchMedia("(hover: hover) and (pointer: fine)");
    setEnabled(mql.matches);
    const onChange = () => setEnabled(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [reduce]);

  const onMove = (e: React.MouseEvent) => {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set((relX / rect.width) * strength * 2);
    y.set((relY / rect.height) * strength * 2);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Tag = as === "span" ? motion.span : motion.div;

  return (
    <Tag
      ref={ref as never}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy, display: as === "span" ? "inline-block" : undefined }}
      className={className}
    >
      {children}
    </Tag>
  );
};

export default Magnetic;