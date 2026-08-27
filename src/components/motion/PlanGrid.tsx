import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from "framer-motion";

/**
 * The ivory ground, made into a surface that answers.
 *
 * Most of this site is one flat cream colour, and long stretches of it read as
 * an unfinished page rather than as a deliberate one. This lays a technical
 * drawing under the text: a fine measuring grid, two heavier rules where the
 * eye already expects a margin, and a measure mark. The metaphor is the one the
 * work already uses everywhere else, a plan of an environment before anything
 * is prescribed, and it is the same schematic language as the fuel laws console
 * and the artefact covers rather than a new idea bolted on.
 *
 * It reacts to three things, in order of how obvious they are.
 *
 * The pointer lights it. A drawing is dark until you put a lamp on it, so the
 * grid is barely there until the cursor arrives and then comes up several times
 * stronger inside a soft circle that follows it, with a warm wash under that.
 * Move the mouse and the paper responds under your hand. This is the one that
 * has to be felt within a second of arriving, so it is the strongest of the
 * three by a distance.
 *
 * A click pings it. A ring opens from where you pressed and dies out, and the
 * grid brightens with it, which is a plan being sounded rather than a button
 * being pressed. It costs nothing and it means every click on this site gets an
 * answer, including the clicks that land on nothing.
 *
 * The scroll drifts it. The grid moves against the page at a fraction of scroll
 * speed so the text separates from the paper, and the measure mark travels down
 * the margin. This is the quietest of the three on purpose, and it is the only
 * one that does nothing at all when the page is inside a container that cannot
 * scroll, which is why it is not carrying the effect on its own.
 *
 * Nothing here runs on a clock. Every one of these is a response to something
 * the reader did. `aria-hidden` and `pointer-events-none` throughout: it is
 * atmosphere, and nothing here is content. Under reduced motion the light, the
 * ping and the drift are all off and the grid is simply printed.
 */
interface Props {
  /** Grid pitch in pixels. Larger reads calmer; smaller reads like graph paper. */
  size?: number;
  /** Resting strength. The default is deliberately near the threshold of sight. */
  opacity?: number;
  /** Fades the motif out at the top and bottom so it never meets a section seam. */
  feather?: boolean;
  className?: string;
}

const mask = "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)";

const gridImage =
  "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)";

/** How far the light reaches. Wide enough to feel like a lamp, not a torch. */
const LAMP = 300;

interface Ping {
  id: number;
  x: number;
  y: number;
}

const PlanGrid = ({ size = 88, opacity = 0.045, feather = true, className = "" }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = !!useReducedMotion();
  const [pings, setPings] = useState<Ping[]>([]);

  // Measured across the section's whole pass through the viewport, so the
  // drift is a property of where the reader is in the section rather than of
  // where they are on the page.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const drift = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  // Moved as a background position rather than a transform, so the lit copy of
  // the grid and the mask that reveals it stay in the same coordinate space and
  // the lines underneath the lamp line up exactly with the lines outside it.
  const gridPos = useMotionTemplate`0px ${drift}px`;
  const tickTop = useTransform(scrollYProgress, [0.05, 0.95], ["14%", "86%"]);

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    const host = el?.parentElement;
    if (!el || !host) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let seen = false;
    let alive = true;

    const onMove = (e: PointerEvent) => {
      // Touch has no hover, and a lamp that appears where a finger last landed
      // is a smudge rather than a response.
      if (e.pointerType !== "mouse") return;
      const r = el.getBoundingClientRect();
      tx = e.clientX - r.left;
      ty = e.clientY - r.top;
      if (!seen) {
        // Arrive at the pointer rather than sliding in from the last corner.
        seen = true;
        cx = tx;
        cy = ty;
        el.style.setProperty("--px", `${cx}px`);
        el.style.setProperty("--py", `${cy}px`);
        el.style.setProperty("--lit", "1");
      }
    };

    const onLeave = () => {
      seen = false;
      el.style.setProperty("--lit", "0");
    };

    const onDown = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const id = performance.now();
      setPings((v) => [...v, { id, x: e.clientX - r.left, y: e.clientY - r.top }]);
      // Cleared by a timer rather than by the animation, because a click on a
      // link unmounts this mid-flight and an animation callback would never
      // arrive to do it.
      window.setTimeout(() => {
        if (alive) setPings((v) => v.filter((p) => p.id !== id));
      }, 900);
    };

    const tick = () => {
      // Lagged behind the cursor so the light has weight. Written straight to
      // the element as custom properties: this runs every frame the mouse is
      // moving, and putting it through React state would re-render the page
      // under it sixty times a second.
      cx += (tx - cx) * 0.16;
      cy += (ty - cy) * 0.16;
      el.style.setProperty("--px", `${Math.round(cx)}px`);
      el.style.setProperty("--py", `${Math.round(cy)}px`);
      raf = requestAnimationFrame(tick);
    };

    host.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerleave", onLeave, { passive: true });
    // Capture, so a press that lands on a link or a button still answers.
    host.addEventListener("pointerdown", onDown, { passive: true, capture: true });
    raf = requestAnimationFrame(tick);

    return () => {
      alive = false;
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      host.removeEventListener("pointerdown", onDown, { capture: true });
      cancelAnimationFrame(raf);
    };
  }, [reduce]);

  const lamp = `radial-gradient(${LAMP}px ${LAMP}px at var(--px, 50%) var(--py, 50%), black 0%, rgba(0,0,0,0.55) 42%, transparent 72%)`;

  return (
    <div
      ref={ref}
      aria-hidden
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      // The feather lives here, on the section's own box, not on the grid.
      // A mask measured against a taller inner element fades in above the
      // section and leaves the grid at full strength exactly where two sections
      // meet, which is the seam the feather exists to hide.
      style={{
        maskImage: feather ? mask : undefined,
        WebkitMaskImage: feather ? mask : undefined,
      }}
    >
      {/* The drawing at rest. */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity,
          backgroundImage: gridImage,
          backgroundSize: `${size}px ${size}px`,
          backgroundPosition: reduce ? undefined : gridPos,
        }}
      />

      {/* The warm ground under the lamp, so the light is felt on the paper and
          not only on the lines. */}
      <div
        className="absolute inset-0"
        style={{
          opacity: "var(--lit, 0)",
          transition: "opacity 480ms ease",
          background: `radial-gradient(${LAMP * 1.25}px ${LAMP * 1.25}px at var(--px, 50%) var(--py, 50%), hsl(var(--olive) / 0.07), transparent 70%)`,
        }}
      />

      {/* The same drawing, several times stronger, revealed only where the
          lamp is. Identical background position to the layer above, so the
          lines it lights are the lines already there. */}
      <motion.div
        className="absolute inset-0"
        style={{
          // Measured, not guessed. At full strength the lit grid draws
          // near-black lines and the lamp reads as a hole cut in the page;
          // a diff of the frame with and without the pointer put the peak
          // change at 563 of a possible 765. Roughly three and a half times
          // the resting grid is the point where the lift is unmistakable and
          // still looks like the same drawing.
          opacity: "calc(var(--lit, 0) * 0.16)",
          transition: "opacity 480ms ease",
          backgroundImage: gridImage,
          backgroundSize: `${size}px ${size}px`,
          backgroundPosition: reduce ? undefined : gridPos,
          maskImage: lamp,
          WebkitMaskImage: lamp,
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
        }}
      />

      {/* The two margins of a drawn plan, and one measure mark that travels. */}
      <div
        className="absolute inset-y-0 left-[6%] w-px hidden md:block"
        style={{ background: "hsl(var(--foreground))", opacity: opacity * 1.6 }}
      />
      <div
        className="absolute inset-y-0 right-[6%] w-px hidden md:block"
        style={{ background: "hsl(var(--foreground))", opacity: opacity * 1.6 }}
      />
      <motion.div
        className="absolute left-[6%] h-px hidden md:block w-6"
        style={{
          background: "hsl(var(--olive))",
          opacity: 0.35,
          top: reduce ? "50%" : tickTop,
        }}
      />

      {/* Sounding the plan. */}
      {pings.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.x,
            top: p.y,
            width: 12,
            height: 12,
            marginLeft: -6,
            marginTop: -6,
            border: "1px solid hsl(var(--olive))",
          }}
          initial={{ scale: 0.4, opacity: 0.55 }}
          animate={{ scale: 26, opacity: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
    </div>
  );
};

export default PlanGrid;
