import { ReactNode, Children, useRef } from "react";
import { useScroll } from "framer-motion";
import { JourneyContext } from "./JourneyContext";

interface JourneyStageProps {
  children: ReactNode;
  /** vh per scene for the outer scroll container. */
  scenePitch?: number;
}

/**
 * JourneyStage — desktop POV camera rig.
 *
 * Outer = a tall scroll container (sceneCount × scenePitch vh).
 * Inner = a `sticky top-0 h-screen` viewport — the "camera".
 * Scenes are absolutely positioned siblings inside the viewport and
 * use the shared scrollYProgress to crossfade / dolly / pan.
 *
 * Native scroll is preserved (no scroll hijacking). The user simply
 * scrolls — the world advances through them.
 */
const JourneyStage = ({ children, scenePitch = 130 }: JourneyStageProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const total = Children.count(children);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <div
      ref={ref}
      className="relative w-full"
      style={{ height: `${total * scenePitch}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <JourneyContext.Provider
          value={{ progress: scrollYProgress, total, active: true }}
        >
          {children}
        </JourneyContext.Provider>
      </div>
    </div>
  );
};

export default JourneyStage;
