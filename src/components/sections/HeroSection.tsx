import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import heroAtmosphere from "@/assets/hero-atmosphere.jpg";

const HeroSection = () => {
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.22]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const fadeToLight = useTransform(scrollYProgress, [0.4, 1], [0, 1]);

  // Mouse parallax — light follow
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  useEffect(() => {
    if (reduceMotion) return;
    const handler = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMouse({ x, y });
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, [reduceMotion]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "hsl(var(--charcoal-deep))" }}
    >
      {/* Atmospheric image */}
      <motion.div className="absolute inset-0 z-0" style={{ y: reduceMotion ? 0 : imageY }}>
        <motion.img
          src={heroAtmosphere}
          alt=""
          className="absolute inset-0 w-full h-[130%] object-cover"
          style={{
            scale: reduceMotion ? 1.05 : imageScale,
            filter: "brightness(0.32) contrast(1.12) saturate(0.65)",
          }}
        />
      </motion.div>

      {/* Light-following soft glow */}
      <motion.div
        className="absolute inset-0 z-[1] pointer-events-none"
        animate={{
          background: `radial-gradient(circle 600px at ${50 + mouse.x * 18}% ${50 + mouse.y * 18}%, hsl(var(--ivory) / 0.06), transparent 60%)`,
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 120% 100% at 30% 60%, transparent 0%, hsl(var(--charcoal-deep) / 0.6) 100%),
            linear-gradient(to bottom, transparent 55%, hsl(var(--charcoal-deep)) 100%)
          `,
        }}
      />

      {/* Vertical rhythm lines */}
      <div className="absolute inset-0 z-[3] pointer-events-none opacity-[0.04]">
        <div className="absolute left-[20%] top-0 w-px h-full"
          style={{ background: "linear-gradient(to bottom, transparent 10%, hsl(var(--ivory)) 50%, transparent 90%)" }} />
        <div className="absolute left-[80%] top-0 w-px h-full"
          style={{ background: "linear-gradient(to bottom, transparent 20%, hsl(var(--ivory)) 50%, transparent 80%)" }} />
      </div>

      {/* Hero text */}
      <motion.div
        className="section-padding max-content w-full relative z-10"
        style={{ y: reduceMotion ? 0 : textY, opacity: textOpacity }}
      >
        <div className="max-w-3xl">
          <motion.p
            className="text-[10px] md:text-xs tracking-[0.3em] uppercase font-display mb-6 md:mb-8"
            style={{ color: "hsl(var(--ivory) / 0.5)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Guilherme Neves — Performance Nutrition
          </motion.p>
          <motion.h1
            className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold leading-[0.98] tracking-tight"
            style={{ color: "hsl(var(--ivory))" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35 }}
          >
            Build from{" "}
            <span className="italic font-light" style={{ color: "hsl(var(--ivory) / 0.7)" }}>within</span>.
          </motion.h1>
          <motion.p
            className="text-base md:text-lg leading-relaxed max-w-xl mt-6 md:mt-8"
            style={{ color: "hsl(var(--ivory) / 0.6)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
          >
            Practical performance systems for athletes, clubs and environments
            that need clarity under pressure.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 mt-10 md:mt-14"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75 }}
          >
            <Link
              to="/work"
              className="group inline-flex items-center justify-center px-8 py-3.5 font-display text-sm font-medium tracking-wide transition-all duration-500 hover:tracking-wider"
              style={{ background: "hsl(var(--ivory))", color: "hsl(var(--charcoal-deep))" }}
            >
              Explore the Work
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 font-display text-sm font-medium tracking-wide transition-all duration-500 hover:tracking-wider"
              style={{ border: "1px solid hsl(var(--ivory) / 0.18)", color: "hsl(var(--ivory) / 0.85)" }}
            >
              Start a Conversation
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
      >
        <span className="text-[9px] tracking-[0.4em] uppercase font-display" style={{ color: "hsl(var(--ivory) / 0.3)" }}>
          Scroll
        </span>
        <motion.div
          className="w-px h-8"
          style={{ background: "hsl(var(--ivory) / 0.18)" }}
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Fade to light world */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[35vh] z-[5] pointer-events-none"
        style={{
          opacity: fadeToLight,
          background: "linear-gradient(to bottom, transparent, hsl(var(--background)))",
        }}
      />
    </section>
  );
};

export default HeroSection;