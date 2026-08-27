import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";
import { ScrollTrigger } from "@/lib/gsap";

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
 *
 * `immediate` jumps instead of easing, and exists for landings that happen
 * across a navigation. This instance is torn down and rebuilt on every route
 * change, so an eased scrollTo started around that moment is killed halfway by
 * the destroy and the reader ends up at the top of a page they asked to arrive
 * partway down.
 */
export const scrollToY = (top: number, immediate = false) => {
  if (lenis) lenis.scrollTo(top, { immediate });
  else window.scrollTo({ top, behavior: immediate ? "auto" : "smooth" });
};

/**
 * Hand the page's scroll to a section, and take it back.
 *
 * A section that wants to hold the screen still while something happens on it
 * has to stop two scrollers, not one: the browser's, by preventing the wheel
 * event, and Lenis, which is running its own animation loop and would keep
 * moving the page underneath a cancelled event. Only Lenis knows how to be
 * paused, so it is asked here rather than fought with.
 *
 * Whoever locks is responsible for unlocking, including on unmount. There is
 * no timeout and no rescue: a page that cannot be scrolled is the worst thing
 * this site could do to somebody.
 */
export const lockScroll = () => lenis?.stop();
export const unlockScroll = () => lenis?.start();

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

    // Lenis moves the page on its own rAF loop, so ScrollTrigger has to be
    // told on every one of those frames. Without this the two keep separate
    // ideas of the scroll position and scrubbed animations lag behind.
    instance.on("scroll", ScrollTrigger.update);

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

  // A new page starts at the top, whichever scroller is in charge. Trigger
  // positions were measured against the old page, so they have to be taken
  // again once the new one has laid out.
  useEffect(() => {
    scrollToTop(true);
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return null;
};

export default SmoothScroll;
