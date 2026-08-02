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
 */

const frames = [
  { src: portrait, alt: "Guilherme Neves", position: "center 26%" },
  { src: pitchside, alt: "Pitchside during a session", position: "center 40%" },
  { src: lockerRoom, alt: "Inside the locker room", position: "center 50%" },
  { src: anderlechtSign, alt: "At RSC Anderlecht", position: "center 45%" },
  { src: arrival, alt: "Matchday arrival with the first team", position: "center 38%" },
];

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const HeroSection = () => {
  const heroRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const reduce = !!useReducedMotion();
  const [frame, setFrame] = useState(0);

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
          return gsap.from(self.chars, {
            xPercent: (i, target) =>
              (target as HTMLElement).closest("[data-split='last']") ? 110 : -110,
            autoAlpha: 0,
            duration: 1.15,
            ease: EASE,
            stagger: { each: 0.035, from: "start" },
            delay: 0.25,
          });
        },
      });
      gsap.set(el, { autoAlpha: 1 });
      return () => split.revert();
    }, el);

    return () => ctx.revert();
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
          className="font-display font-semibold tracking-[-0.035em] leading-[0.92] text-foreground text-[clamp(2.75rem,11vw,9rem)] invisible"
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
                  initial={{ opacity: 0, scale: frame === 0 ? 1.9 : 1.14 }}
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

        <motion.p
          className="font-display italic font-light text-lg md:text-2xl text-muted-foreground mt-7 md:mt-9"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.95, ease: EASE_OUT }}
        >
          Built from within.
        </motion.p>

        <motion.p
          className="text-body-lg max-w-xl mt-5"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.05, ease: EASE_OUT }}
        >
          Applied performance nutrition systems for athletes and teams, rooted in
          football and built to survive a real week.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 mt-10 md:mt-12"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.18, ease: EASE_OUT }}
        >
          <Magnetic strength={8} as="span">
            <Link
              to="/work"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-foreground text-background font-display text-sm font-medium tracking-wide transition-all duration-500 hover:tracking-wider"
            >
              View Applied Work
            </Link>
          </Magnetic>
          <Magnetic strength={8} as="span">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 font-display text-sm font-medium tracking-wide text-foreground transition-all duration-500 hover:tracking-wider"
              style={{ border: "1px solid hsl(var(--foreground) / 0.18)" }}
            >
              Start a Conversation
            </Link>
          </Magnetic>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.9, duration: 1 }}
      >
        <span className="text-[9px] tracking-[0.4em] uppercase font-display text-muted-foreground">
          Scroll
        </span>
        <motion.div
          className="w-px h-8 bg-foreground/20"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
