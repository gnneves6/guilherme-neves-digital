import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";

/**
 * SmoothScroll.
 *
 * Adds inertial scrolling so the page decelerates instead of stopping dead.
 * It is the one thing the existing motion stack cannot express: framer-motion
 * animates in response to scroll position, but the scroll itself belongs to
 * the browser. Softening that single input is what makes every scroll-driven
 * section read as one continuous movement.
 *
 * Left off for anyone who asked for reduced motion, and for coarse pointers,
 * where native momentum is already good and hijacking it feels wrong.
 */

/** Shared so navigation can drive the same scroller that owns the position. */
let lenis: Lenis | null = null;

/** Jump to the top, through Lenis when it is running so the two do not fight. */
export const scrollToTop = (immediate = true) => {
  if (lenis) lenis.scrollTo(0, { immediate });
  else window.scrollTo(0, 0);
};

/**
 * Animate to an absolute Y. Anything that used to call
 * window.scrollTo({ behavior: "smooth" }) has to come through here, otherwise
 * the browser's easing and Lenis's easing drive the same value at once.
 */
export const scrollToY = (top: number) => {
  if (lenis) lenis.scrollTo(top);
  else window.scrollTo({ top, behavior: "smooth" });
};

const SmoothScroll = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    if (prefersReduced || isCoarse) return;

    const instance = new Lenis({
      duration: 1.05,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      wheelMultiplier: 0.95,
    });
    lenis = instance;

    // CSS smooth scrolling animates the same property Lenis drives every
    // frame, so the two cancel each other out and programmatic jumps land
    // short. Lenis owns the easing while it is mounted.
    const root = document.documentElement;
    const previousBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";

    let frame = 0;
    const raf = (time: number) => {
      instance.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      instance.destroy();
      lenis = null;
      root.style.scrollBehavior = previousBehavior;
    };
  }, []);

  // A new page starts at the top, whichever scroller is in charge.
  useEffect(() => {
    scrollToTop(true);
  }, [pathname]);

  return null;
};

export default SmoothScroll;
