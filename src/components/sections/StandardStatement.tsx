import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { lockScroll, unlockScroll } from "@/components/motion/SmoothScroll";
// A real dressing room, minutes before a real match, with him in it.
//
// This band used to sit on a rendered poster of a "GN LIFE & LEGACY OS", coat
// of arms and trademark included. It survived the branding pass because at a
// short band nobody could read it. Given a whole screen it is legible, and what
// it says is an invented company that does not exist, next to a claim about
// ending up out of the room. A photograph of the room is the honest version of
// the same idea and it was already in the repository.
import sceneRoom from "@/assets/photos/locker-room.webp";

/**
 * The claim, made by striking out the thing it is not.
 *
 * A single line stating what the work is asks to be agreed with. Showing the
 * assumption first, then drawing a line through it, makes the reader watch
 * their own reference get corrected: they do not receive a claim, they revise
 * one.
 *
 * There is one position and four things pass through it. Each wrong answer
 * arrives, gets a rule drawn through it at reading speed, then blurs and lifts
 * away while the next one is already rising into the same spot. The standard
 * arrives last, in the place the wrong answers just left, and takes its
 * highlight there. Nothing is ever printed above or below anything else, which
 * was the whole problem with the stack this replaces: with all four on screen
 * the correction had already happened before the eye arrived, and three wrong
 * answers sat next to the right one competing with it.
 *
 * The page stops here. That is the point of it.
 *
 * When the section fills the screen and you keep scrolling down, the scroll is
 * taken: the page does not move, and your wheel spends itself changing the
 * sentence instead. Three notches, then it is handed back and the page carries
 * on. It is the only place on this site where scrolling does something other
 * than move down a page, and it is that on purpose: a reader who has met one
 * moment where the surface behaves differently reads the rest of it looking
 * for the next one.
 *
 * Taking someone's scroll is the most hostile thing a page can do, so the
 * rules are strict and there is no way to get stuck:
 *
 *   it only takes it downward, and only while the section really is filling
 *   the screen, so it can never grab a page someone is passing through;
 *
 *   it takes it exactly three times and then never again for the rest of the
 *   visit, so coming back up and going down a second time costs nothing;
 *
 *   scrolling up always passes straight through;
 *
 *   and it stops two scrollers, not one. Preventing the wheel event stops the
 *   browser. Lenis is running its own loop and would keep moving the page
 *   underneath a cancelled event, so it is paused through lockScroll and
 *   restarted on release and on unmount, with no timeout and no rescue path
 *   because nothing here is allowed to fail into a page that will not scroll.
 *
 * Nothing about the sequence itself depends on scrolling, which is the second
 * reason it is written this way. A click or tap anywhere advances it and wraps
 * it, the marks jump to any beat, and if none of that happens a timer starts
 * when the section comes into view and stops the instant the reader touches
 * anything. So it still plays on a phone, on a trackpad, for somebody using a
 * keyboard, and inside the frame this site is previewed in, where the document
 * cannot scroll at all and a version scrubbed against scroll position sat at
 * frame zero forever, real and invisible.
 */
const struck = [
  "Not a document that looks good in a meeting.",
  "Not a plan that fits everyone and no one.",
  "Not advice that dates the week after it lands.",
];

const STEPS = struck.length + 1;
const CLAIM = STEPS - 1;

/** Long enough to read the line and watch it get cut, short enough to hold. */
const DWELL = 2600;
/** Wheel travel that buys one beat. Around one notch of a mouse, a flick of a trackpad. */
const NOTCH = 110;
/** No more than one beat per this, so a hard flick cannot blow through the whole thing. */
const COOLDOWN = 320;

const lineClass =
  "font-display text-[1.6rem] md:text-4xl lg:text-[2.6rem] font-light leading-snug tracking-tight";
const claimClass =
  "font-display text-[1.9rem] md:text-5xl lg:text-[3.4rem] font-semibold leading-[1.1] tracking-tight max-w-5xl";

const ruleStyle = {
  backgroundImage: "linear-gradient(hsl(var(--ivory) / 0.8), hsl(var(--ivory) / 0.8))",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "0 55%",
  WebkitBoxDecorationBreak: "clone",
  boxDecorationBreak: "clone",
} as const;

/** The printed version: no sequence, nothing moves, everything is there. */
const StaticStatement = () => (
  <div className="max-content">
    <p className="text-caption mb-8" style={{ color: "hsl(var(--ivory) / 0.5)" }}>
      The standard
    </p>
    <ul className="space-y-3 mb-9">
      {struck.map((line) => (
        <li key={line} className={lineClass}>
          <span style={{ ...ruleStyle, backgroundSize: "100% 1px", color: "hsl(var(--ivory) / 0.4)" }}>
            {line}
          </span>
        </li>
      ))}
    </ul>
    <h2 className={claimClass} style={{ color: "hsl(var(--ivory))" }}>
      A system that holds when the season gets loud, and keeps holding long
      after I have stopped being in the room.
    </h2>
    <p className="text-body-lg mt-6 max-w-xl" style={{ color: "hsl(var(--ivory) / 0.6)" }}>
      I work with few environments, closely, for a long time. That is the only
      way any of this compounds.
    </p>
  </div>
);

const StandardStatement = () => {
  const ref = useRef<HTMLElement>(null);
  const reduce = !!useReducedMotion();
  const [step, setStep] = useState(0);
  // Which way the last change went, so the slot moves with it rather than
  // always throwing upwards.
  const [dir, setDir] = useState(1);
  const [engaged, setEngaged] = useState(false);
  const [touched, setTouched] = useState(false);

  // The wheel handler is created once and has to know where the sequence is
  // without being rebuilt on every beat, which would mean adding and removing
  // a non-passive listener four times a section.
  const stepRef = useRef(0);

  const go = useCallback((next: number, direction: number) => {
    stepRef.current = next;
    setDir(direction);
    setStep(next);
  }, []);

  // Plays itself once, if it is never touched.
  useEffect(() => {
    if (reduce || !engaged || touched || step >= CLAIM) return;
    const id = window.setTimeout(() => go(step + 1, 1), DWELL);
    return () => window.clearTimeout(id);
  }, [reduce, engaged, touched, step, go]);

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;

    let held = false;
    let travel = 0;
    const hold = () => {
      if (held) return;
      held = true;
      lockScroll();
    };
    const release = () => {
      if (!held) return;
      held = false;
      travel = 0;
      unlockScroll();
    };

    // Two thresholds, doing two different jobs. `engaged` is loose and only
    // decides whether the sequence may introduce itself. `filling` is strict
    // and is the only thing that lets the section touch anybody's scroll: the
    // section has to genuinely own the screen before it is allowed to.
    const io = new IntersectionObserver(([e]) => setEngaged(e.isIntersecting), {
      threshold: 0.35,
    });
    io.observe(el);

    let filling = false;
    const fillObserver = new IntersectionObserver(
      ([e]) => {
        filling = e.intersectionRatio > 0.9;
        if (!filling) release();
      },
      { threshold: [0, 0.9, 1] }
    );
    fillObserver.observe(el);

    let spent = false; // takes the scroll once per visit, then never again
    let last = 0;

    const onWheel = (e: WheelEvent) => {
      // Up always passes. So does a section that has already had its turn, one
      // that is not really on screen, and one already showing its last beat.
      if (spent || !filling || e.deltaY <= 0 || stepRef.current >= CLAIM) {
        if (stepRef.current >= CLAIM) spent = true;
        release();
        return;
      }

      // From here the scroll belongs to this section.
      e.preventDefault();
      e.stopPropagation();
      hold();
      setTouched(true);

      travel += e.deltaY;
      const now = performance.now();
      if (travel < NOTCH || now - last < COOLDOWN) return;
      travel = 0;
      last = now;

      const next = Math.min(CLAIM, stepRef.current + 1);
      go(next, 1);
      if (next >= CLAIM) {
        // The last beat is shown, and the page is handed back at once, so the
        // reader is never left pushing against a screen that has finished.
        spent = true;
        release();
      }
    };

    // Non-passive, or preventDefault is ignored. stopPropagation in the handler
    // keeps the event from reaching Lenis's own listener on the window.
    el.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      io.disconnect();
      fillObserver.disconnect();
      el.removeEventListener("wheel", onWheel);
      // Unmounting mid-hold would leave the whole site unscrollable.
      release();
    };
  }, [reduce, go]);

  // A press anywhere advances, and wraps, so it can be watched twice and so a
  // phone gets the whole thing.
  const onPress = () => {
    if (reduce) return;
    setTouched(true);
    go(step >= CLAIM ? 0 : step + 1, 1);
  };

  const band = (children: React.ReactNode) => (
    <>
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${sceneRoom})`,
          // Held well under the type. The point of it is presence, not subject.
          filter: "brightness(0.26) contrast(1.05) saturate(0.45)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, hsl(var(--charcoal-deep)), hsl(var(--charcoal-deep) / 0.5) 45%, hsl(var(--charcoal-deep)))",
        }}
      />
      {/* A bed for the type, and only for the type. The words live in the left
          two thirds, so the scrim is heaviest there and lets go of the picture
          on the right, where the room can stay a room. */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, hsl(var(--charcoal-deep) / 0.93) 0%, hsl(var(--charcoal-deep) / 0.78) 40%, hsl(var(--charcoal-deep) / 0.3) 74%, transparent 100%)",
        }}
      />
      {children}
    </>
  );

  if (reduce) {
    return (
      <section className="relative overflow-hidden">
        {band(
          <div className="relative section-padding py-24 md:py-36">
            <StaticStatement />
          </div>
        )}
      </section>
    );
  }

  const isClaim = step === CLAIM;

  return (
    <section
      ref={ref}
      onClick={onPress}
      className="relative overflow-hidden cursor-pointer select-none"
      // A fixed height, not a viewport one. `svh` is meaningless in a frame
      // sized to its content, where it resolves to the height of everything.
      style={{ minHeight: "clamp(560px, 78vh, 760px)" }}
    >
      {band(
        <div className="relative section-padding py-20 md:py-24 flex items-center min-h-[inherit]">
          <div className="max-content w-full">
            <div className="flex items-baseline gap-3 mb-10 md:mb-14">
              <span
                className="text-caption tabular-nums"
                // Not --olive-light, which is tuned for the ivory pages and
                // reads under 4.5:1 on this charcoal. 62% samples at 6.7:1
                // against the darkest part of the photograph.
                style={{ color: "hsl(110 14% 62%)" }}
              >
                {String(step + 1).padStart(2, "0")}
              </span>
              <span className="text-caption" style={{ color: "hsl(var(--ivory) / 0.5)" }}>
                The standard
              </span>
            </div>

            {/* The slot. One position, four things through it, nothing above
                or below anything else. The height is reserved so the page does
                not shuffle as they swap. */}
            <div className="relative min-h-[12rem] md:min-h-[15rem]">
              {/* Sync, not wait: both are mounted through the change, which is
                  the whole effect. The one leaving blurs and lifts off the
                  slot while the one arriving is already rising into it, so the
                  new line appears over the old rather than after it. */}
              <AnimatePresence initial={false}>
                {isClaim ? (
                  <motion.h2
                    key="claim"
                    className={`absolute inset-x-0 top-0 ${claimClass}`}
                    style={{ color: "hsl(var(--ivory))" }}
                    initial={{ opacity: 0, y: 44 * dir, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -44, filter: "blur(10px)" }}
                    transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  >
                    A system that holds when the season gets loud, and{" "}
                    <span className="relative whitespace-nowrap">
                      <motion.span
                        aria-hidden
                        className="absolute left-[-0.08em] right-[-0.08em] bottom-[0.2em] h-[0.4em] origin-left"
                        style={{ background: "hsl(var(--olive) / 0.72)" }}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.55, delay: 0.45, ease: [0.4, 0, 0.2, 1] }}
                      />
                      <span className="relative">keeps holding</span>
                    </span>{" "}
                    long after I have stopped being in the room.
                  </motion.h2>
                ) : (
                  <motion.p
                    key={step}
                    className={`absolute inset-x-0 top-0 max-w-3xl ${lineClass}`}
                    initial={{ opacity: 0, y: 40 * dir, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -40 * dir, filter: "blur(10px)" }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {/* The rule is a cloned background on the text, not a bar
                        over it: these sentences wrap on a phone, and a bar at
                        half the height of a two-line block is drawn between
                        the lines, which reads as underlining the first one. */}
                    <motion.span
                      style={{ ...ruleStyle, color: "hsl(var(--ivory) / 0.55)" }}
                      initial={{ backgroundSize: "0% 1px" }}
                      animate={{
                        backgroundSize: "100% 1px",
                        color: "hsl(var(--ivory) / 0.34)",
                      }}
                      transition={{ duration: 0.55, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    >
                      {struck[step]}
                    </motion.span>
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div className="mt-8 md:mt-10 min-h-[3.5rem]">
              <AnimatePresence>
                {isClaim && (
                  <motion.p
                    className="text-body-lg max-w-xl"
                    style={{ color: "hsl(var(--ivory) / 0.6)" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    I work with few environments, closely, for a long time. That
                    is the only way any of this compounds.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Where you are, and a way to get anywhere. A sequence with no
                visible length reads as a thing that might be stuck. */}
            <div className="mt-10 md:mt-12 flex items-center gap-2.5">
              {Array.from({ length: STEPS }).map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setTouched(true);
                    go(i, i > step ? 1 : -1);
                  }}
                  aria-label={
                    i === CLAIM ? "The standard" : `What it is not, ${i + 1} of ${struck.length}`
                  }
                  // Padded so the narrowest dot still clears a 24px target.
                  className="h-6 px-1 flex items-center"
                >
                  <motion.span
                    className="block h-px"
                    animate={{
                      width: i === step ? 40 : 16,
                      backgroundColor:
                        i === step ? "hsl(110 14% 62%)" : "hsl(var(--ivory) / 0.28)",
                    }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  />
                </button>
              ))}
              <span
                className="ml-3 text-[10px] tracking-[0.2em] uppercase font-display"
                style={{ color: "hsl(var(--ivory) / 0.3)" }}
              >
                {isClaim ? "Again" : "Scroll or tap"}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* The three wrong answers pass through aria-hidden markup that changes
          under a screen reader's feet. They are given here once, in order,
          with the correction stated rather than drawn. The standard itself is
          not repeated: the heading in the slot is real when it is there. */}
      <p className="sr-only">
        What this is not: a document that looks good in a meeting, a plan that
        fits everyone and no one, or advice that dates the week after it lands.
      </p>
    </section>
  );
};

export default StandardStatement;
