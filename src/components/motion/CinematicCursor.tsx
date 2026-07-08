import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

/**
 * CinematicCursor — a soft trailing ring plus a precise dot that replace the
 * native cursor on fine-pointer desktops. Uses mix-blend-difference so it
 * reads on both the ivory pages and the dark cinematic scenes. The ring
 * expands over interactive elements. Disabled entirely for touch devices and
 * for users who prefer reduced motion, where the native cursor stays.
 */
const INTERACTIVE = "a, button, [role='button'], input, textarea, select, label, summary, [data-cursor='hover']";

const CinematicCursor = () => {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [down, setDown] = useState(false);
  const [visible, setVisible] = useState(false);

  // Dot follows instantly; ring trails via spring.
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useSpring(dotX, { stiffness: 350, damping: 28, mass: 0.4 });
  const ringY = useSpring(dotY, { stiffness: 350, damping: 28, mass: 0.4 });

  const raf = useRef<number | null>(null);
  const next = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (reduce) return;
    const mql = window.matchMedia("(hover: hover) and (pointer: fine)");
    const apply = () => setEnabled(mql.matches);
    apply();
    mql.addEventListener("change", apply);
    return () => mql.removeEventListener("change", apply);
  }, [reduce]);

  useEffect(() => {
    if (!enabled) return;
    document.body.classList.add("has-custom-cursor");

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      next.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
      if (raf.current == null) {
        raf.current = requestAnimationFrame(() => {
          raf.current = null;
          if (next.current) {
            dotX.set(next.current.x);
            dotY.set(next.current.y);
          }
        });
      }
    };
    const onOver = (e: Event) => {
      const t = e.target as Element | null;
      if (t && t.closest?.(INTERACTIVE)) setHovering(true);
    };
    const onOut = (e: Event) => {
      const t = e.target as Element | null;
      if (t && t.closest?.(INTERACTIVE)) setHovering(false);
    };
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, true);
    document.addEventListener("pointerout", onOut, true);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerenter", onEnter);

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver, true);
      document.removeEventListener("pointerout", onOut, true);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerenter", onEnter);
      if (raf.current != null) cancelAnimationFrame(raf.current);
    };
  }, [enabled, visible, dotX, dotY]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[9999] mix-blend-difference"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.25s ease" }}
    >
      <motion.div
        className="absolute top-0 left-0 rounded-full bg-white"
        style={{ x: dotX, y: dotY, width: 7, height: 7, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: down ? 0.6 : hovering ? 0 : 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
      <motion.div
        className="absolute top-0 left-0 rounded-full border border-white"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: hovering ? 56 : 34,
          height: hovering ? 56 : 34,
          opacity: hovering ? 0.9 : 0.5,
          scale: down ? 0.85 : 1,
        }}
        transition={{ type: "spring", stiffness: 250, damping: 22 }}
      />
    </div>
  );
};

export default CinematicCursor;
