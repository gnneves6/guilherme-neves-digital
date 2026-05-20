import { createContext, useContext } from "react";
import type { MotionValue } from "framer-motion";

export interface JourneyCtx {
  /** Outer scroll progress 0..1 over the whole journey. */
  progress: MotionValue<number>;
  /** Total number of scenes mounted in the stage. */
  total: number;
  /** True when JourneyStage cinematic rig is active (desktop). */
  active: boolean;
}

export const JourneyContext = createContext<JourneyCtx | null>(null);

export const useJourney = () => useContext(JourneyContext);
