import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import Scene from "@/components/journey/Scene";
import ParallaxLayer from "@/components/journey/ParallaxLayer";
import TitleCard from "@/components/journey/TitleCard";
import Spotlight from "@/components/journey/Spotlight";
import Magnetic from "@/components/motion/Magnetic";
import sceneHero from "@/assets/scene-hero-tunnel.jpg";

const SceneTunnel = ({ index = 0 }: { index?: number }) => {
  const reduce = useReducedMotion();
  return (
    <Scene
      index={index}
      bgImage={sceneHero}
      bgFilter="brightness(0.38) contrast(1.18) saturate(0.65)"
      tone="hsl(var(--charcoal-deep))"
      overlay="radial-gradient(ellipse 120% 90% at 50% 60%, transparent 0%, hsl(var(--charcoal-deep) / 0.72) 100%)"
      zoomFrom={1.05}
      zoomTo={1.18}
    >
      {/* Pointer-driven scene light */}
      <Spotlight color="hsl(var(--ivory) / 0.10)" size={620} follow={22} />
      <div className="absolute inset-0 grid place-items-center section-padding">
        <ParallaxLayer strength={-10} className="max-content w-full">
          <div className="max-w-3xl">
            <TitleCard
              number="01"
              label="Guilherme Neves — Applied Performance Nutrition"
              tone="dark"
              className="mb-6 md:mb-8"
            />
            <h1
              className="font-display font-semibold leading-[1.02] tracking-tight text-[clamp(3rem,8.4vw,7rem)] flex flex-wrap"
              style={{ color: "hsl(var(--ivory))" }}
            >
              {[
                { word: "Built", italic: false, delay: 0.25 },
                { word: "from", italic: true, delay: 0.34 },
                { word: "within.", italic: true, delay: 0.43 },
              ].map((p) => (
                <span key={p.word} className="inline-block overflow-hidden" style={{ paddingRight: "0.28em", paddingBottom: "0.06em" }}>
                  <motion.span
                    className="inline-block will-change-transform"
                    initial={{ y: reduce ? 0 : "110%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    transition={{ duration: 0.9, delay: p.delay, ease: [0.22, 1, 0.36, 1] }}
                    style={p.italic ? { color: "hsl(var(--ivory) / 0.75)", fontStyle: "italic", fontWeight: 300 } : undefined}
                  >
                    {p.word}
                  </motion.span>
                </span>
              ))}
            </h1>
            <motion.p
              className="text-base md:text-lg leading-relaxed max-w-xl mt-6 md:mt-8"
              style={{ color: "hsl(var(--ivory) / 0.6)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55 }}
            >
              Applied performance nutrition systems for athletes, teams and performance
              environments — shaped by lived sport, rooted in football and built for real-world use.
            </motion.p>
            <div className="flex flex-col sm:flex-row gap-4 mt-10 md:mt-14">
              <Magnetic strength={8} as="span">
                <Link
                  to="/work"
                  className="inline-flex items-center justify-center px-8 py-3.5 font-display text-sm font-medium tracking-wide transition-all duration-500 hover:tracking-wider"
                  style={{ background: "hsl(var(--ivory))", color: "hsl(var(--charcoal-deep))" }}
                >
                  Explore the Resource Vault
                </Link>
              </Magnetic>
              <Magnetic strength={8} as="span">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-8 py-3.5 font-display text-sm font-medium tracking-wide transition-all duration-500 hover:tracking-wider"
                  style={{ border: "1px solid hsl(var(--ivory) / 0.18)", color: "hsl(var(--ivory) / 0.85)" }}
                >
                  Start a Conversation
                </Link>
              </Magnetic>
            </div>
          </div>
        </ParallaxLayer>
      </div>
      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
      >
        <span className="text-[9px] tracking-[0.4em] uppercase font-display" style={{ color: "hsl(var(--ivory) / 0.3)" }}>
          Scroll to enter
        </span>
        <motion.div
          className="w-px h-8"
          style={{ background: "hsl(var(--ivory) / 0.18)" }}
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </Scene>
  );
};

export default SceneTunnel;
