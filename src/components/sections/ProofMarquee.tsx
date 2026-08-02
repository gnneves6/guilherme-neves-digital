import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { experiences, additionalExposure } from "@/data/experiences";
import anderlechtCrest from "@/assets/logos/anderlecht.png";
import lecaCrest from "@/assets/logos/leca.png";
import r4eCrest from "@/assets/logos/run4excellence.jpg";

/**
 * ProofMarquee.
 *
 * A band of the environments the work has actually been done inside, moving
 * on its own. Two things earn its place: it is the fastest credibility a
 * stranger can read, and it keeps the page alive between two static sections
 * without asking for a scroll.
 *
 * Built as two identical tracks translated across a shared timeline, so the
 * seam never shows and the loop needs no measurement of the viewport.
 */

const crests: Record<string, string> = {
  anderlecht: anderlechtCrest,
  leca: lecaCrest,
  r4e: r4eCrest,
};

interface Entry {
  key: string;
  name: string;
  meta: string;
  crest?: string;
}

const entries: Entry[] = [
  ...experiences.map((e) => ({
    key: e.id,
    name: e.name,
    meta: e.location,
    crest: crests[e.id],
  })),
  ...additionalExposure.map((a) => ({
    key: a.name,
    name: a.name,
    meta: a.date,
  })),
];

const Track = ({ ariaHidden }: { ariaHidden?: boolean }) => (
  <div
    className="flex items-center shrink-0"
    aria-hidden={ariaHidden || undefined}
  >
    {entries.map((e) => (
      <div key={e.key} className="flex items-center gap-4 px-8 md:px-12 shrink-0">
        {e.crest ? (
          <img
            src={e.crest}
            alt=""
            className="w-9 h-9 md:w-11 md:h-11 object-contain shrink-0"
            draggable={false}
          />
        ) : (
          <span className="w-1.5 h-1.5 rounded-full bg-foreground/25 shrink-0" />
        )}
        <span className="flex flex-col leading-tight">
          <span className="font-display text-base md:text-lg font-medium text-foreground whitespace-nowrap">
            {e.name}
          </span>
          <span className="text-[10px] tracking-[0.2em] uppercase font-display text-muted-foreground whitespace-nowrap">
            {e.meta}
          </span>
        </span>
      </div>
    ))}
  </div>
);

const ProofMarquee = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Each track is exactly half the strip, so moving the pair left by 50%
      // lands the second copy precisely where the first began.
      gsap.to(el, {
        xPercent: -50,
        duration: 38,
        ease: "none",
        repeat: -1,
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="relative overflow-hidden border-y border-border/60 py-7 md:py-9"
      aria-label="Environments the work has been done inside"
    >
      <div ref={trackRef} className="flex w-max will-change-transform">
        <Track />
        <Track ariaHidden />
      </div>

      {/* Fade the strip into the page rather than letting it hit the edges */}
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 w-16 md:w-32 pointer-events-none"
        style={{ background: "linear-gradient(to right, hsl(var(--background)), transparent)" }}
      />
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 w-16 md:w-32 pointer-events-none"
        style={{ background: "linear-gradient(to left, hsl(var(--background)), transparent)" }}
      />
    </section>
  );
};

export default ProofMarquee;
