import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
// A real dressing room, minutes before a real match, with him in it.
//
// This band used to sit on a rendered poster of a "GN LIFE & LEGACY OS", coat
// of arms and trademark included. It survived the branding pass because at a
// band 700px tall nobody could read it. Pinned to a full screen it is legible,
// and what it says is an invented company that does not exist, next to a claim
// about ending up out of the room. A photograph of the room is the honest
// version of the same idea and it is already in the repository.
import sceneRoom from "@/assets/photos/locker-room.webp";

/**
 * The claim, made by striking out the thing it is not.
 *
 * A single line stating what the work is asks to be agreed with. Showing the
 * assumption first, then drawing a line through it, makes the reader watch
 * their own reference get corrected, which is a different and much stickier
 * kind of persuasion: they do not receive a claim, they revise one.
 *
 * This used to be a stack: three struck sentences, then the standard below
 * them. Everything was on screen at once, so the correction had already
 * happened before the eye arrived, and the three wrong answers stayed visible
 * next to the right one, competing with it.
 *
 * It is now one position and the scroll is what moves through it. Each wrong
 * answer rises into the slot, gets a line drawn through it at reading speed,
 * and rolls out as the next one rises. The standard arrives last, into the
 * same spot the wrong answers just left, and takes its highlight there. The
 * argument is not read, it is watched happening, and the reader's own scroll
 * is what performs it.
 *
 * The section is a tall track with a sticky panel inside it. That is what buys
 * the scroll distance the sequence needs without the page appearing to freeze:
 * the panel is pinned, the reader is still scrolling, and the rail at the
 * bottom shows how much of the sequence is left, so nobody thinks the page has
 * broken.
 *
 * Under reduced motion none of this exists. The track collapses, the panel
 * stops being sticky, and the three struck lines and the standard are simply
 * printed in order. The meaning survives, the movement does not.
 */
const struck = [
  "Not a document that looks good in a meeting.",
  "Not a plan that fits everyone and no one.",
  "Not advice that dates the week after it lands.",
];

/**
 * Where each beat sits along the scroll of the track, as a fraction.
 *
 * The three wrong answers own the first two thirds; the standard owns the
 * last, and starts before the third one has finished leaving, so it reads as
 * arriving over the correction rather than after it.
 */
const SLOTS: [number, number][] = [
  [0.02, 0.26],
  [0.24, 0.48],
  [0.46, 0.72],
];
const CLAIM_IN = 0.66;

// Sized for a full screen rather than for a band. The wrong answers sit a step
// below the standard, so that when the standard lands in the same slot it is
// visibly the larger thing and not just the last thing.
const lineClass =
  "font-display text-2xl md:text-4xl font-light leading-snug tracking-tight";
const claimClass =
  "font-display text-[1.9rem] md:text-5xl lg:text-[3.4rem] font-semibold leading-[1.1] tracking-tight max-w-5xl";

/**
 * One wrong answer, for the length of its slot.
 *
 * Its own component so the transforms are declared once per line rather than
 * in a loop, which is the only way hooks are allowed to be written and also
 * the only way this stays readable.
 */
const ReelLine = ({
  progress,
  line,
  slot,
}: {
  progress: MotionValue<number>;
  line: string;
  slot: [number, number];
}) => {
  const [from, to] = slot;
  const settled = from + 0.06;
  const strikeStart = settled + 0.015;
  const strikeEnd = strikeStart + 0.075;
  const leaving = to - 0.07;

  const opacity = useTransform(progress, [from, settled, leaving, to], [0, 1, 1, 0]);
  const y = useTransform(progress, [from, settled, leaving, to], [38, 0, 0, -38]);
  // Drawn, not placed. The rule travels at about the speed the sentence is
  // read, so the correction lands as the reader finishes it.
  //
  // It is a background on the text rather than a bar over it, because these
  // sentences wrap on a phone. An absolutely positioned rule at half the
  // height of a two-line block is drawn between the lines, which reads as an
  // underline of the first one. Cloning the decoration per line fragment
  // gives every line its own rule, drawn together.
  const drawn = useTransform(progress, [strikeStart, strikeEnd], [0, 100]);
  const ruled = useMotionTemplate`${drawn}% 1px`;
  // Once struck, the sentence stops being worth looking at and says so.
  const dim = useTransform(progress, [strikeStart, strikeEnd], [0.55, 0.34]);

  return (
    <motion.p
      className={`absolute inset-x-0 top-0 max-w-3xl ${lineClass}`}
      style={{ opacity, y }}
      aria-hidden
    >
      <motion.span
        style={{
          color: "hsl(var(--ivory))",
          opacity: dim,
          backgroundImage:
            "linear-gradient(hsl(var(--ivory) / 0.75), hsl(var(--ivory) / 0.75))",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "0 55%",
          backgroundSize: ruled,
          WebkitBoxDecorationBreak: "clone",
          boxDecorationBreak: "clone",
        }}
      >
        {line}
      </motion.span>
    </motion.p>
  );
};

/** The printed version: no track, no pinning, nothing moves. */
const StaticStatement = () => (
  <div className="max-content">
    <p className="text-caption mb-8" style={{ color: "hsl(var(--ivory) / 0.5)" }}>
      The standard
    </p>
    <ul className="space-y-3 mb-9">
      {struck.map((line) => (
        <li key={line} className={lineClass}>
          {/* Same per-line rule as the animated version, already drawn. */}
          <span
            style={{
              color: "hsl(var(--ivory) / 0.4)",
              backgroundImage:
                "linear-gradient(hsl(var(--ivory) / 0.75), hsl(var(--ivory) / 0.75))",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "0 55%",
              backgroundSize: "100% 1px",
              WebkitBoxDecorationBreak: "clone",
              boxDecorationBreak: "clone",
            }}
          >
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
  const track = useRef<HTMLElement>(null);
  const reduce = !!useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: track,
    offset: ["start start", "end end"],
  });

  // The photograph drifts and settles across the whole sequence, so the panel
  // is never a still image behind moving text. Small numbers on purpose: this
  // is depth, not an effect.
  const bgY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.14, 1.02]);

  const claimOpacity = useTransform(scrollYProgress, [CLAIM_IN, CLAIM_IN + 0.13], [0, 1]);
  const claimY = useTransform(scrollYProgress, [CLAIM_IN, CLAIM_IN + 0.13], [44, 0]);
  const markScaleX = useTransform(scrollYProgress, [CLAIM_IN + 0.12, CLAIM_IN + 0.22], [0, 1]);
  const tailOpacity = useTransform(scrollYProgress, [CLAIM_IN + 0.2, CLAIM_IN + 0.3], [0, 1]);
  const railScaleX = useTransform(scrollYProgress, [0, 0.96], [0, 1]);
  // The eyebrow steps up as each wrong answer is dealt with, which is the only
  // counter in the panel and the reason the pinning does not feel open-ended.
  const beat = useTransform(scrollYProgress, (p) =>
    p < SLOTS[1][0] ? "01" : p < SLOTS[2][0] ? "02" : p < CLAIM_IN ? "03" : "04"
  );

  const band = (children: React.ReactNode) => (
    <>
      <motion.div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${sceneRoom})`,
          // Held well under the type. A daylight photograph needs more taking
          // down than the rendered scene did, and the point of it is presence,
          // not subject matter.
          filter: "brightness(0.26) contrast(1.05) saturate(0.45)",
          y: reduce ? 0 : bgY,
          scale: reduce ? 1 : bgScale,
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
          on the right, where the room can stay a room. A flat wash over the
          whole frame would have taken the photograph down to a texture. */}
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

  return (
    <section ref={track} className="relative" style={{ height: "300vh" }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden flex items-center">
        {band(
          <div className="relative w-full section-padding">
            <div className="max-content">
              <div className="flex items-baseline gap-3 mb-10 md:mb-14">
                <motion.span
                  className="text-caption tabular-nums"
                  // Not --olive-light. That token is tuned for the ivory pages
                  // and reads under the 4.5 a 14px label needs once it is on
                  // this charcoal. Lifted to 62% here, sampled from the
                  // rendered pixels at 6.7:1 against the darkest part of the
                  // photograph it sits over. The rail below can stay on the
                  // token: it carries no text.
                  style={{ color: "hsl(110 14% 62%)" }}
                >
                  {beat}
                </motion.span>
                <span className="text-caption" style={{ color: "hsl(var(--ivory) / 0.5)" }}>
                  The standard
                </span>
              </div>

              {/* The slot. Everything happens in this one place: the wrong
                  answers pass through it and the standard lands in it. Its
                  height is reserved so nothing below shifts as lines swap. */}
              <div className="relative min-h-[13rem] md:min-h-[15rem]">
                {struck.map((line, i) => (
                  <ReelLine
                    key={line}
                    line={line}
                    slot={SLOTS[i]}
                    progress={scrollYProgress}
                  />
                ))}

                <motion.h2
                  className={`absolute inset-x-0 top-0 ${claimClass}`}
                  style={{ color: "hsl(var(--ivory))", opacity: claimOpacity, y: claimY }}
                >
                  A system that holds when the season gets loud, and{" "}
                  <span className="relative whitespace-nowrap">
                    <motion.span
                      aria-hidden
                      // Sat on the baseline, not on the box: 0.2em is roughly
                      // where the descender space ends, so the band reads as a
                      // highlighter stroke rather than a bar behind the words.
                      // Same 0.4em height the Em marker uses elsewhere.
                      className="absolute left-[-0.08em] right-[-0.08em] bottom-[0.2em] h-[0.4em] origin-left"
                      style={{
                        background: "hsl(var(--olive) / 0.72)",
                        scaleX: markScaleX,
                      }}
                    />
                    <span className="relative">keeps holding</span>
                  </span>{" "}
                  long after I have stopped being in the room.
                </motion.h2>
              </div>

              <motion.p
                className="text-body-lg mt-8 md:mt-10 max-w-xl"
                style={{ color: "hsl(var(--ivory) / 0.6)", opacity: tailOpacity }}
              >
                I work with few environments, closely, for a long time. That is
                the only way any of this compounds.
              </motion.p>

              {/* How much is left. A pinned panel with no length showing is
                  the one thing that makes a reader think the page is stuck. */}
              <div
                aria-hidden
                className="mt-12 md:mt-16 h-px w-full max-w-md"
                style={{ background: "hsl(var(--ivory) / 0.14)" }}
              >
                <motion.div
                  className="h-px origin-left"
                  style={{ background: "hsl(var(--olive-light))", scaleX: railScaleX }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* The three wrong answers are aria-hidden above, because a rule drawn
          through a sentence means nothing read aloud and the fragments would
          arrive as three claims. They are given here once, in the order the
          sequence makes them, with the correction stated rather than drawn.
          The standard itself is not repeated: the heading above is real. */}
      <p className="sr-only">
        What this is not: a document that looks good in a meeting, a plan that
        fits everyone and no one, or advice that dates the week after it lands.
      </p>
    </section>
  );
};

export default StandardStatement;
