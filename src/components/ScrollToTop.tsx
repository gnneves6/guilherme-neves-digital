import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToTop, scrollToY } from "@/components/motion/SmoothScroll";

/**
 * Where a new page starts.
 *
 * Normally the top. But links now arrive with a hash on them, sending someone
 * to the planner or to one audience rather than to the page those things
 * happen to live on, and resetting to zero on every navigation would throw
 * every one of those away. A link that lands six thousand pixels above what it
 * promised is a broken link that happens to return 200.
 *
 * Routed through the smooth scroller rather than window.scrollTo, because
 * Lenis owns the scroll position while it is running and setting it behind its
 * back leaves the two disagreeing about where the page is.
 *
 * The frame of delay is not decoration: the target has to exist before it can
 * be measured, and on a route change this runs before the new page has laid
 * itself out.
 */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      scrollToTop(true);
      return;
    }

    // Wait for the target, then confirm the page actually went there.
    //
    // Finding the element was never the hard part; it resolves on the first
    // frame. The scroll itself was being swallowed. SmoothScroll tears Lenis
    // down and builds a new one on every route change, and a freshly built
    // instance is still holding the previous page's dimensions, so it clamps a
    // four thousand pixel target down to nothing and reports success. Measured:
    // element found at 4203, scroll afterwards still 0.
    //
    // So this issues the scroll and then checks. If the page did not move, it
    // asks again on the next frame, until it lands or the budget runs out.
    // Nothing here ever scrolls to the top on failure: the route change has
    // already put the page there, and a jump after two seconds of stillness is
    // the one movement nobody asked for.
    const id = hash.slice(1);
    let raf = 0;
    let tries = 0;

    const attempt = () => {
      const target = document.getElementById(id);
      if (target) {
        const top = window.scrollY + target.getBoundingClientRect().top - 90;
        const landed = Math.abs(target.getBoundingClientRect().top - 90) < 4;
        if (landed) return;
        scrollToY(top, true);
      }
      if (tries++ > 120) return;
      raf = requestAnimationFrame(attempt);
    };

    raf = requestAnimationFrame(attempt);
    return () => cancelAnimationFrame(raf);
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
