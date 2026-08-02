import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap";

/**
 * ScrollStatement.
 *
 * The line travels right to left while the page keeps descending, and the two
 * move at different rates. That mismatch is the whole point: a static line
 * that merely scrolls past reads as a page moving, while a line with its own
 * speed reads as depth.
 *
 * ScrollTrigger scrubs it against the section's own range, so the words are
 * tied to scroll position rather than playing on a timer. Scrubbing back up
 * rewinds it exactly.
 */

interface Props {
  /** Kept short. This is one thought, not a paragraph. */
  lines: string[];
  caption?: string;
}

const ScrollStatement = ({ lines, caption }: Props) => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    if (!section || !text) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(text, { autoAlpha: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      const split = SplitText.create(text, {
        type: "words,lines",
        linesClass: "overflow-hidden",
        autoSplit: true,
        onSplit(self) {
          gsap.set(text, { autoAlpha: 1 });
          return gsap.from(self.words, {
            xPercent: 55,
            autoAlpha: 0,
            ease: "none",
            stagger: 0.06,
            scrollTrigger: {
              trigger: section,
              // Starts as the section rises into view and finishes before it
              // leaves, so the line has resolved while still on screen.
              start: "top 85%",
              end: "center 35%",
              scrub: 0.6,
            },
          });
        },
      });
      return () => split.revert();
    }, section);

    return () => ctx.revert();
  }, [lines]);

  useLayoutEffect(() => {
    // Fonts land after first paint and change line breaks, which moves every
    // trigger below this point.
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  }, []);

  return (
    <section ref={sectionRef} className="section-padding section-spacing overflow-hidden">
      <div className="max-content">
        {caption && <p className="text-caption mb-8">{caption}</p>}
        <p
          ref={textRef}
          className="font-display font-medium tracking-[-0.02em] leading-[1.08] text-foreground text-[clamp(1.75rem,5vw,3.75rem)] max-w-5xl invisible"
        >
          {lines.join(" ")}
        </p>
      </div>
    </section>
  );
};

export default ScrollStatement;
