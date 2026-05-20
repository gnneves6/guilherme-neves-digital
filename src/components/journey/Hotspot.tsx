import { ReactNode, useState, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HotspotProps {
  /** Position inside the parent (percentages). */
  x: number;
  y: number;
  label: string;
  color?: string;
  children?: ReactNode;
  onActivate?: () => void;
  active?: boolean;
}

/**
 * Hotspot — a focusable dot anchored inside a scene. Hover or focus
 * reveals an associated info panel; click/Enter triggers `onActivate`.
 * Always reachable via keyboard.
 */
const Hotspot = ({ x, y, label, color = "hsl(var(--ivory))", children, onActivate, active }: HotspotProps) => {
  const [hover, setHover] = useState(false);
  const id = useId();
  const open = hover || !!active;
  return (
    <div
      className="absolute"
      style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
    >
      <button
        type="button"
        aria-label={label}
        aria-expanded={open}
        aria-controls={id}
        onClick={onActivate}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
        className="relative grid place-items-center w-6 h-6 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ivory)/0.45)]"
      >
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full"
          style={{ background: color, opacity: 0.18 }}
          animate={{ scale: open ? 2 : 1.4, opacity: open ? 0.0 : 0.18 }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
        />
        <span
          aria-hidden
          className="block w-2 h-2 rounded-full"
          style={{ background: color, boxShadow: `0 0 18px ${color}` }}
        />
      </button>
      <AnimatePresence>
        {open && children && (
          <motion.div
            id={id}
            role="tooltip"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 top-full mt-4 -translate-x-1/2 w-[260px] max-w-[80vw] pointer-events-none"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Hotspot;
