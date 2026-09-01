import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Magnetic from "@/components/motion/Magnetic";
import { gsap, SplitText, EASE_OUT as EASE } from "@/lib/gsap";

import portrait from "@/assets/guilherme-portrait.webp";
import pitchside from "@/assets/photos/leca-pitchside.webp";
import lockerRoom from "@/assets/photos/locker-room.webp";
import anderlechtSign from "@/assets/photos/anderlecht-sign.webp";
import arrival from "@/assets/photos/leca-arrival.webp";

/**
 * HeroSection.
 *
 * The name carries the page, with a window cut into it that holds the work.
 * Three things run before the visitor touches anything: the frame pulls back
 * from a close crop, the letters slide in from the edges, and the window
 * keeps changing what it shows. The site is alive on arrival rather than
 * waiting to be activated.
 *
 * Light ground on purpose. The dark chapters further down (Real Environments
 * especially) hit harder when they are the exception rather than the rule.
 *
 * The right third is a full-height photograph, bleeding off the edge and
 * landing on the rule that was already drawn at 82%. Before it, every word sat
 * in the left half of a 1440px screen and the other half was empty: the eye
 * reached the end of the name and had nowhere to go, so it fell down the page
 * for want of an alternative rather than because it was invited. A still frame
 * on the right answers that. It also lets the two images divide the work
 * instead of competing, the panel holding who he is while the window cut into
 * the name keeps moving through where he has been.
 */

/**
 * What the window shows, and how each photograph is cropped into it.
 *
 * The window is 0.94em by 0.8em, so it is landscape at a ratio of 1.175, and
 * four of these five photographs are portrait. object-fit: cover therefore
 * throws away most of their height, and where the surviving band sits is the
 * whole difference between a frame with a person in it and a frame with a
 * chin in it. Two of them were landing on the second thing: the matchday
 * arrival opened its band at 19.8% of the image when his chin is at 23.5%, so
 * the frame began below his mouth, and the pitchside photograph opened at
 * 14.5% against a head running 7.8% to 19.5%, cutting it across the eyes.
 *
 * `zoom` is the scale the frame enters at. It matters here because the scale
 * transform closes in on the centre of the element, not on `position`, so the
 * band you carefully chose is not the band that is on screen for the first
 * two seconds — it is a tighter one around its middle. Every value below is
 * chosen so the subject survives at the zoom, not merely at rest.
 *
 * The Anderlecht frame is the one deliberate absence. He is standing thirty
 * metres from the camera there, so at the size of this window his face is a
 * few pixels wide: not a portrait, just a smudge that has to be cropped
 * through. The sign is what that photograph is actually for, so the band
 * holds the sign and lets him go rather than half-showing him.
 */
const frames = [
  { src: portrait, alt: "Guilherme Neves", position: "center 0%", zoom: 1.12 },
  { src: pitchside, alt: "Pitchside during a session", position: "center 6%", zoom: 1.12 },
  { src: lockerRoom, alt: "Inside the locker room", position: "center 50%", zoom: 1.14 },
  { src: anderlechtSign, alt: "At RSC Anderlecht", position: "center 10%", zoom: 1.1 },
  { src: arrival, alt: "Matchday arrival with the first team", position: "center 0%", zoom: 1.05 },
];

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/** How far from the cursor a letter still feels it, as a share of the name's height. */
const REACH = 0.85;

const HeroSection = () => {
  const heroRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const reduce = !!useReducedMotion();
  const [frame, setFrame] = useState(0);

  /**
   * The letters of the name, and where each one rests.
   *
   * Filled once the entrance has finished, and refilled whenever SplitText
   * re-splits at a new width. Centres are stored relative to the heading and
   * measured while every letter is still at rest, so the pointer loop reads
   * one rectangle a frame instead of eighteen, and reads none of the boxes it
   * is in the middle of moving.
   */
  const letters = useRef<
    { el: HTMLElement; cx: number; cy: number; t: number }[]
  >([]);

  // SplitText handles the name: it splits into characters wrapped in masking
  // lines, re-splits on resize so nothing breaks mid-word at a new width, and
  // puts the original markup back on cleanup. Doing this by hand meant every
  // character became inline-block, which lets a word wrap through its middle.
  useLayoutEffect(() => {
    const el = nameRef.current;
    if (!el) return;
    if (reduce) {
      gsap.set(el, { autoAlpha: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      const split = SplitText.create(el.querySelectorAll("[data-split]"), {
        type: "chars",
        charsClass: "gn-char",
        mask: "chars",
        autoSplit: true,
        onSplit(self) {
          // The previous split's elements are gone. Stop driving them before
          // the entrance starts writing to their replacements.
          letters.current = [];
          return gsap.from(self.chars, {
            xPercent: (i, target) =>
              (target as HTMLElement).closest("[data-split='last']") ? 110 : -110,
            autoAlpha: 0,
            duration: 1.15,
            ease: EASE,
            stagger: { each: 0.035, from: "start" },
            delay: 0.25,
            onComplete() {
              // The mask that made the entrance possible has to go, or every
              // letter is trapped in a box the height of itself and lifting it
              // just clips it off. It has done its job by now.
              const chars = self.chars as HTMLElement[];
              chars.forEach((c) => {
                if (c.parentElement) c.parentElement.style.overflow = "visible";
              });
              const box = el.getBoundingClientRect();
              letters.current = chars.map((c) => {
                const r = c.getBoundingClientRect();
                // GSAP has finished with this element, so the pointer loop can
                // own its transform outright. Two quickTo tweens were tried
                // first, one for the lift and one for the scale, and only the
                // lift ever appeared: they write the same transform and the
                // second never composed. One string, written by one loop.
                c.style.willChange = "transform";
                return {
                  el: c,
                  cx: r.left - box.left + r.width / 2,
                  cy: r.top - box.top + r.height / 2,
                  t: 0,
                };
              });
            },
          });
        },
      });
      gsap.set(el, { autoAlpha: 1 });
      return () => split.revert();
    }, el);

    return () => ctx.revert();
  }, [reduce]);

  /**
   * The name answers the cursor.
   *
   * Letters near the pointer lift and grow, letters further away less so, and
   * the whole thing settles back when the pointer leaves. It is the first
   * thing on the site and now the first thing that proves the site is not a
   * picture: you move, it moves, before you have read a word or clicked
   * anything.
   *
   * Deliberately a field rather than a hover. A letter that only reacts when
   * the cursor is exactly on it gives you one letter at a time; a falloff
   * across the whole name means moving anywhere near it moves several, which
   * is what makes it read as a surface with weight rather than as eighteen
   * separate buttons.
   *
   * Driven straight through GSAP, never through React state, because this runs
   * every frame the mouse is moving and re-rendering the page underneath it
   * sixty times a second would cost more than the effect is worth.
   */
  useEffect(() => {
    if (reduce) return;
    const host = heroRef.current;
    const name = nameRef.current;
    if (!host || !name) return;

    let raf = 0;
    let px = 0;
    let py = 0;
    let inside = false;
    let settled = true;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      px = e.clientX;
      py = e.clientY;
      inside = true;
      settled = false;
    };
    const onLeave = () => {
      inside = false;
      settled = false;
    };

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const set = letters.current;
      if (!set.length || settled) return;

      const box = name.getBoundingClientRect();
      const x = px - box.left;
      const y = py - box.top;
      const reach = Math.max(box.height * REACH, 120);

      let moving = false;

      for (let i = 0; i < set.length; i++) {
        const l = set[i];

        let want = 0;
        if (inside) {
          const dx = l.cx - x;
          const dy = l.cy - y;
          const d = Math.sqrt(dx * dx + dy * dy);
          // Squared falloff: close letters do nearly all of the moving, so the
          // shape under the cursor is a peak and not a bulge.
          want = d >= reach ? 0 : (1 - d / reach) ** 2;
        }

        // Eased towards the target rather than snapped to it, which is what
        // gives the name weight: it catches up to the cursor instead of being
        // welded to it.
        l.t += (want - l.t) * 0.16;
        if (Math.abs(want - l.t) > 0.002) moving = true;

        const t = l.t;
        l.el.style.transform = `translate3d(0, ${(-26 * t).toFixed(2)}px, 0) scale(${(1 + 0.13 * t).toFixed(4)})`;
        // Olive arrives only at the peak, so it marks one letter rather than
        // washing the whole name.
        l.el.style.color = t < 0.02 ? "" : `color-mix(in srgb, hsl(var(--olive)) ${Math.round(t * 78)}%, hsl(var(--foreground)))`;
      }

      // Stop running the loop once every letter has arrived home.
      if (!inside && !moving) settled = true;
    };

    host.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerleave", onLeave, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [reduce]);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // The window keeps moving on its own, so the page never looks parked.
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setFrame((f) => (f + 1) % frames.length), 3600);
    return () => clearInterval(id);
  }, [reduce]);

  const current = frames[frame];

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100svh] flex items-center overflow-hidden"
      style={{ background: "hsl(var(--background))" }}
    >
      {/* Editorial rules, barely there */}
      <div aria-hidden className="absolute inset-0 pointer-events-none opacity-[0.05]">
        <div className="absolute left-[18%] top-0 w-px h-full bg-foreground" />
        <div className="absolute left-[82%] top-0 w-px h-full bg-foreground" />
      </div>

      {/* The right third, held by a single still frame. It starts on the 66%
          line and bleeds off the edge, so the composition ends at the screen
          rather than stopping short of it. */}
      <motion.div
        aria-hidden
        className="hidden md:block absolute right-0 top-0 bottom-0 w-[30%] lg:w-[32%] overflow-hidden"
        initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, delay: 0.35, ease: EASE_OUT }}
      >
        <img
          src={pitchside}
          alt=""
          className="w-full h-full object-cover"
          style={{ objectPosition: "40% 30%" }}
        />
        {/* Dissolves the hard left edge so the photo reads as part of the page
            and not as a panel dropped on top of it. */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, hsl(var(--background)) 0%, hsl(var(--background) / 0.55) 14%, transparent 42%)",
          }}
        />
        {/* The navigation bar sits over this panel, and the last link landed
            on the photograph where it lost most of its contrast. The top
            fade gives the bar clean ground to sit on. */}
        <div
          className="absolute inset-x-0 top-0 h-28 md:h-32 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, hsl(var(--background)) 8%, hsl(var(--background) / 0.72) 55%, transparent)" }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
          style={{ background: "linear-gradient(to top, hsl(var(--background) / 0.8), transparent)" }}
        />
      </motion.div>

      <motion.div
        className="section-padding max-content w-full relative z-10 pt-24 pb-16 md:pt-20"
        style={{ y: reduce ? 0 : contentY, opacity: contentOpacity }}
      >
        <motion.div
          className="flex items-center gap-3 mb-8 md:mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.15 }}
        >
          <span className="font-display text-[10px] md:text-xs tracking-[0.4em] uppercase text-muted-foreground">
            01
          </span>
          <span className="h-px w-6 bg-border" />
          <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase font-display text-muted-foreground">
            Performance Nutrition &amp; Systems
          </p>
        </motion.div>

        {/* The name, with the work set into it */}
        <h1
          ref={nameRef}
          aria-label="Guilherme Neves"
          className="font-display font-semibold tracking-[-0.035em] leading-[0.92] text-foreground text-[clamp(2.75rem,9.5vw,8.5rem)] invisible"
        >
          <span className="block" aria-hidden data-split="first">
            GUILHERME
          </span>
          <span className="flex items-center gap-[0.14em]">
            {/* The window */}
            <motion.span
              aria-hidden
              className="relative inline-block overflow-hidden shrink-0 align-middle"
              style={{ width: "0.94em", height: "0.8em", background: "hsl(var(--ivory-deep))" }}
              initial={reduce ? { opacity: 0 } : { width: 0, opacity: 0 }}
              animate={{ width: "0.94em", opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.5, ease: EASE_OUT }}
            >
              <AnimatePresence initial={false}>
                <motion.img
                  key={frame}
                  src={current.src}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ objectPosition: current.position }}
                  initial={{ opacity: 0, scale: current.zoom }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    opacity: { duration: 0.9, ease: "easeInOut" },
                    scale: { duration: frame === 0 ? 2.6 : 4.2, ease: EASE_OUT },
                  }}
                />
              </AnimatePresence>
              {/* keeps the photo sitting in the type rather than floating */}
              <span
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{ boxShadow: "inset 0 0 0 1px hsl(var(--foreground) / 0.08)" }}
              />
            </motion.span>
            <span aria-hidden data-split="last">NEVES</span>
          </span>
        </h1>

        {/* The line that separates him from every other practitioner was set
            smaller and greyer than the sentence describing his services, which
            is the hierarchy exactly backwards. It carries foreground ink now. */}
        <motion.p
          className="font-display italic font-light text-2xl md:text-4xl text-foreground mt-8 md:mt-10"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.95, ease: EASE_OUT }}
        >
          Built from within.
        </motion.p>

        {/* The promise, which this screen did not have.
            It said "Applied performance nutrition systems for athletes and
            teams, rooted in football and built to survive a real week", which
            names a category and promises nothing. Thirty-eight words on the
            first screen and not one of them told a stranger what they could
            have. This says who it is for and what changes for them, and it is
            one sentence because nobody reads two. */}
        <motion.p
          className="text-body-lg max-w-xl mt-5"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.05, ease: EASE_OUT }}
        >
          I make nutrition work as a system inside football clubs, so it holds
          through a congested week instead of living in a document nobody opens.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row sm:items-center gap-4 mt-10 md:mt-12"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.18, ease: EASE_OUT }}
        >
          {/* Two buttons, and they are two because they are for two different
              people: the many who are not buying anything today, and the few
              who are. The free one leads, because it is the one almost
              everybody who lands is eligible for.

              This slot used to hold "View Applied Work" alone, which sends a
              stranger to look at proof before they have been told what is
              being proved. Work is still one click away in the bar above. */}
          <Magnetic strength={8} as="span">
            <Link
              to="/fuel-laws"
              className="inline-flex items-center justify-center px-9 py-4 bg-foreground text-background font-display text-sm font-medium tracking-wide transition-all duration-500 hover:tracking-wider"
            >
              Take the five checks, free
            </Link>
          </Magnetic>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 py-4 font-display text-sm text-foreground link-underline"
          >
            Or tell me about your environment
            <span aria-hidden>&rarr;</span>
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator, aligned to the text column rather than to the
          middle of a screen whose right third is now a photograph. */}
      <motion.div
        className="absolute bottom-8 left-6 md:left-12 lg:left-20 xl:left-28 z-20 flex items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.9, duration: 1 }}
      >
        <span className="text-[9px] tracking-[0.4em] uppercase font-display text-muted-foreground">
          Scroll
        </span>
        <motion.div
          className="h-px w-10 bg-foreground/25 origin-left"
          animate={{ scaleX: [0, 1, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
