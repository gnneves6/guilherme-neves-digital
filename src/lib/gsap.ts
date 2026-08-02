import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";

/**
 * One place to register GSAP, so plugins are never registered twice and every
 * component reaches for the same eases.
 *
 * GSAP handles the work framer-motion cannot express cleanly: splitting live
 * text into animatable pieces that re-split on resize (SplitText), and
 * scrubbing several elements against one scroll range at different rates
 * (ScrollTrigger). framer-motion stays where it already works well, on
 * enter/exit and layout transitions.
 */
gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);

/** The house eases. Named so timing reads the same across the site. */
CustomEase.create("gnOut", "0.16, 1, 0.3, 1");     // arrivals, long settle
CustomEase.create("gnInOut", "0.65, 0, 0.35, 1");  // moves between two states

export const EASE_OUT = "gnOut";
export const EASE_IN_OUT = "gnInOut";

export { gsap, ScrollTrigger, SplitText };
