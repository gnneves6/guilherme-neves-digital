import { createContext, useContext, useEffect, useRef, useState, ReactNode } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * PointerField — global normalized pointer position (-1..1 on both axes).
 * Updated via requestAnimationFrame for smoothness. Returns {0,0} when
 * reduced motion is requested or on touch-only devices, so the cinematic
 * journey degrades into a calm static sequence.
 */
interface PointerState {
  x: number; // -1..1
  y: number; // -1..1
  active: boolean; // true once mouse moved at least once
}

const PointerContext = createContext<PointerState>({ x: 0, y: 0, active: false });

export const usePointer = () => useContext(PointerContext);

export const PointerField = ({ children }: { children: ReactNode }) => {
  const reduce = useReducedMotion();
  const [state, setState] = useState<PointerState>({ x: 0, y: 0, active: false });
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const raf = useRef<number | null>(null);
  const activated = useRef(false);

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.current.y = (e.clientY / window.innerHeight) * 2 - 1;
      if (!activated.current) activated.current = true;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const tick = () => {
      // Lerp toward target for smoothness
      current.current.x += (target.current.x - current.current.x) * 0.08;
      current.current.y += (target.current.y - current.current.y) * 0.08;
      setState({
        x: Math.round(current.current.x * 1000) / 1000,
        y: Math.round(current.current.y * 1000) / 1000,
        active: activated.current,
      });
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [reduce]);

  return <PointerContext.Provider value={state}>{children}</PointerContext.Provider>;
};

export default PointerField;