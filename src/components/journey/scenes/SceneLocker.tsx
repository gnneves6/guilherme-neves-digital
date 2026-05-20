import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Scene from "@/components/journey/Scene";
import ParallaxLayer from "@/components/journey/ParallaxLayer";
import TitleCard from "@/components/journey/TitleCard";
import Hotspot from "@/components/journey/Hotspot";
import MannequinTorso from "@/components/MannequinTorso";
import { experiences } from "@/components/sections/EnvironmentsSection";
import sceneEnv from "@/assets/scene-environments-archive.jpg";

const SceneLocker = ({ index = 1 }: { index?: number }) => {
  const [active, setActive] = useState(0);
  const exp = experiences[active];

  // Hotspot anchor positions around the mannequin (percentages).
  const positions = [
    { x: 28, y: 38 },
    { x: 72, y: 32 },
    { x: 70, y: 70 },
  ];

  return (
    <Scene
      index={index}
      bgImage={sceneEnv}
      bgFilter="brightness(0.3) contrast(1.18) saturate(0.55)"
      tone="hsl(var(--charcoal-deep))"
      overlay="radial-gradient(ellipse 95% 80% at 50% 55%, transparent 0%, hsl(var(--charcoal-deep) / 0.88) 75%)"
      zoomFrom={1.12}
      zoomTo={1.0}
    >
      {/* Active environment color wash */}
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: `radial-gradient(ellipse 80% 65% at 50% 50%, ${exp.kitColors.primary}1f 0%, transparent 70%)`,
        }}
        transition={{ duration: 1.0 }}
      />
      <div className="absolute inset-0 section-padding flex items-center">
        <div className="max-content w-full grid grid-cols-[1fr_360px_1fr] gap-8 items-center">
          {/* LEFT — chapter intro */}
          <ParallaxLayer strength={-12}>
            <TitleCard number="02" label="Real environments" tone="dark" className="mb-6" />
            <h2 className="font-display text-3xl lg:text-5xl font-semibold leading-tight text-[hsl(var(--ivory))]">
              Chapters that shaped the work.
            </h2>
            <p className="text-sm text-[hsl(var(--ivory)/0.55)] mt-5 max-w-sm">
              Hover a beacon to step into the environment.
            </p>
          </ParallaxLayer>

          {/* CENTER — mannequin + hotspots */}
          <div className="relative h-[460px]">
            <ParallaxLayer strength={14} className="absolute inset-0">
              <MannequinTorso
                primaryColor={exp.kitColors.primary}
                secondaryColor={exp.kitColors.secondary}
                accentColor={exp.kitColors.accent}
              />
            </ParallaxLayer>
            {experiences.map((e, i) => (
              <Hotspot
                key={e.name}
                x={positions[i % positions.length].x}
                y={positions[i % positions.length].y}
                label={`Reveal ${e.name}`}
                color={e.kitColors.primary}
                active={active === i}
                onActivate={() => setActive(i)}
              >
                <div
                  className="rounded-sm px-4 py-3 backdrop-blur-md text-left"
                  style={{
                    background: "hsl(var(--charcoal-deep) / 0.85)",
                    border: `1px solid ${e.kitColors.primary}55`,
                  }}
                >
                  <p className="text-[9px] tracking-[0.3em] uppercase font-display text-[hsl(var(--ivory)/0.45)]">
                    {e.period} — {e.location}
                  </p>
                  <p className="font-display text-sm text-[hsl(var(--ivory))] mt-1">{e.name}</p>
                  <p className="text-[11px] text-[hsl(var(--ivory)/0.55)] mt-1 leading-snug">
                    {e.role}
                  </p>
                </div>
              </Hotspot>
            ))}
          </div>

          {/* RIGHT — active environment narrative */}
          <ParallaxLayer strength={-14} className="text-right">
            <AnimatePresence mode="wait">
              <motion.div
                key={exp.name}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <span
                  className="font-display text-[100px] lg:text-[140px] font-bold leading-none"
                  style={{ color: `${exp.kitColors.primary}24` }}
                >
                  {String(active + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-2xl lg:text-3xl font-semibold text-[hsl(var(--ivory))] mt-2">
                  {exp.name}
                </h3>
                <p className="text-xs tracking-widest uppercase font-display mt-2 text-[hsl(var(--ivory)/0.45)]">
                  {exp.role}
                </p>
                <p className="font-display text-base lg:text-lg italic max-w-sm ml-auto leading-relaxed text-[hsl(var(--ivory)/0.7)] mt-5">
                  “{exp.chapter}”
                </p>
              </motion.div>
            </AnimatePresence>
          </ParallaxLayer>
        </div>
      </div>
    </Scene>
  );
};

export default SceneLocker;
