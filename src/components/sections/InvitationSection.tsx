import { Link } from "react-router-dom";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/motion/Magnetic";
import Scene from "@/components/motion/Scene";
import sceneInvitation from "@/assets/scene-invitation-exit.jpg";

/**
 * The photograph behind this block has words printed inside it. At the old
 * 0.78 in the middle they were plainly legible: "DISCIPLINE BUILDS FREEDOM",
 * "SAME STANDARD", the whole athlete-by-nature line. That put four messages on
 * one screen at the exact moment someone decides whether to write to him.
 * Raised until the picture is texture rather than reading matter.
 */
const OVERLAY =
  "linear-gradient(to bottom, hsl(var(--background) / 0.985) 0%, hsl(var(--background) / 0.955) 45%, hsl(var(--background) / 0.985) 100%)";

const InvitationSection = () => {
  return (
    <Scene
      tone="light"
      spacing="xl"
      parallax={0.1}
      bgImage={sceneInvitation}
      overlayGradient={OVERLAY}
      fadeTopFrom="hsl(var(--background))"
      contentClassName="section-padding"
    >
      <div className="max-content text-center">
        <Reveal>
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-px w-6" style={{ background: "hsl(var(--olive) / 0.45)" }} />
            <p className="text-[10px] md:text-[11px] tracking-[0.3em] uppercase font-display opacity-60">
              Invitation
            </p>
            <span className="h-px w-6" style={{ background: "hsl(var(--olive) / 0.45)" }} />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-headline max-w-3xl mx-auto">
            If you are building a performance environment<br className="hidden md:block" /> where clarity matters, let's talk.
          </h2>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="text-body-lg max-w-xl mx-auto mt-5">
            For clubs, academies and performance environments
            looking for systems that hold under real conditions.
          </p>
        </Reveal>
        {/* Two doors, because this page has two kinds of visitor and only one
            of them is ready. The few who are take the dark button. The many
            who are not leave with the laws, and that is the whole point of
            keeping a free thing worth taking. */}
        <Reveal delay={0.4}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-12">
            <Magnetic strength={8} as="span">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-10 py-4 bg-foreground text-background font-display text-sm font-medium tracking-wide transition-all duration-500 hover:tracking-wider"
              >
                Start a Conversation
              </Link>
            </Magnetic>
            <Link
              to="/fuel-laws"
              className="inline-flex items-center gap-2 py-2 font-display text-sm tracking-wide transition-colors duration-300 text-muted-foreground hover:text-foreground"
            >
              Not yet? Take the five laws
              <span aria-hidden>→</span>
            </Link>
          </div>
        </Reveal>
        <Reveal delay={0.55}>
          <p className="mt-10 text-[10px] tracking-[0.35em] uppercase font-display opacity-40">
            Guilherme Neves · Porto, Brussels
          </p>
        </Reveal>
      </div>
    </Scene>
  );
};

export default InvitationSection;