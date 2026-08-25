import { Link } from "react-router-dom";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/motion/Magnetic";
import Scene from "@/components/motion/Scene";
import sceneInvitation from "@/assets/scene-invitation-exit.jpg";

const InvitationSection = () => {
  return (
    <Scene
      tone="light"
      spacing="xl"
      parallax={0.1}
      bgImage={sceneInvitation}
      overlayGradient="linear-gradient(to bottom, hsl(var(--background) / 0.92) 0%, hsl(var(--background) / 0.78) 45%, hsl(var(--background) / 0.92) 100%)"
      fadeTopFrom="hsl(var(--background))"
      contentClassName="section-padding"
    >
      <div className="max-content text-center">
        <Reveal>
          <div className="flex items-center justify-center gap-3 mb-6">
            <span
              className="font-display text-[10px] md:text-[11px] tracking-[0.4em] uppercase"
              style={{ color: "hsl(var(--olive))" }}
            >
              07
            </span>
            <span className="h-px w-6" style={{ background: "hsl(var(--olive) / 0.45)" }} />
            <p className="text-[10px] md:text-[11px] tracking-[0.3em] uppercase font-display opacity-60">, Invitation.
            </p>
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
        <Reveal delay={0.4}>
          <div className="flex justify-center mt-12">
            <Magnetic strength={8} as="span">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-10 py-4 bg-foreground text-background font-display text-sm font-medium tracking-wide transition-all duration-500 hover:tracking-wider"
              >
                Start a Conversation
              </Link>
            </Magnetic>
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