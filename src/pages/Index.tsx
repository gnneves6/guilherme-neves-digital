import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useInView, useMotionValueEvent, useVelocity, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Layout from "@/components/Layout";
import Reveal from "@/components/Reveal";
import heroAtmosphere from "@/assets/hero-atmosphere.jpg";
import portraitImg from "@/assets/guilherme-portrait.jpg";
import logoAnderlecht from "@/assets/logo-anderlecht.png";
import logoLeca from "@/assets/logo-leca.png";
import logoR4E from "@/assets/logo-run4excellence.png";

const experiences = [
  {
    name: "RSC Anderlecht",
    role: "Performance Nutrition Intern",
    location: "Brussels, Belgium",
    period: "2026",
    description: "Belgian Pro League — Curricular internship in performance nutrition within an elite football environment.",
    logo: logoAnderlecht,
    kitColors: { primary: "#7B68AE", secondary: "#FFFFFF", accent: "#7B68AE" },
  },
  {
    name: "Leça FC",
    role: "First Team Performance Nutrition",
    location: "Porto, Portugal",
    period: "2025",
    description: "Portuguese football — Building and delivering practical nutrition systems for a competitive first-team environment.",
    logo: logoLeca,
    kitColors: { primary: "#1A3A6B", secondary: "#FFFFFF", accent: "#C4A853" },
  },
  {
    name: "Run4Excellence",
    role: "Performance Nutrition | Health & Performance",
    location: "Porto, Portugal",
    period: "2025",
    description: "Endurance performance — Applied nutrition and health strategies for distance athletes and structured training.",
    logo: logoR4E,
    kitColors: { primary: "#2D8C4E", secondary: "#FFFFFF", accent: "#F5A623" },
  },
];

const additionalExposure = [
  { name: "FC Porto B & U19", type: "Observational Experience", date: "Apr 2025" },
  { name: "Gil Vicente FC", type: "Observational Experience", date: "Aug 2025" },
  { name: "USC Paredes", type: "Observational Experience", date: "Nov 2025" },
];

const valuePillars = [
  {
    title: "Athlete Education & Behaviour",
    description: "Turning complex nutrition science into clear, actionable knowledge athletes actually use in daily life and competition.",
  },
  {
    title: "Matchday Nutrition Structure",
    description: "Building practical protocols that integrate seamlessly into match-day routines — from pre-match fueling to post-match recovery.",
  },
  {
    title: "Monitoring, Reporting & Practical Tools",
    description: "Creating useful tracking systems, anthropometric monitoring and resources that support staff decisions and athlete accountability.",
  },
  {
    title: "Team Nutrition Culture",
    description: "Developing environments where good nutrition becomes a natural part of how a team operates, trains and performs together.",
  },
  {
    title: "Fueling & Recovery Systems",
    description: "Designing repeatable fueling, recovery and hydration protocols that survive the complexity of real training weeks.",
  },
  {
    title: "Hydration & Supplementation",
    description: "Structuring evidence-based hydration and supplementation frameworks tailored to sport demands and individual athlete needs.",
  },
];

const workCategories = [
  { name: "The ABC of Football Nutrition", count: "Educational series" },
  { name: "Mini Classes", count: "Applied insights" },
  { name: "GN Fuel Laws", count: "Framework" },
  { name: "Club Strategies & Resources", count: "Applied tools" },
];

const fuelLaws = [
  { number: "01", title: "Fuel to Perform", desc: "Energy is the currency of performance." },
  { number: "02", title: "Build Your Base", desc: "Daily habits build or break the athlete." },
  { number: "03", title: "Recover Like a Pro", desc: "Recovery prepares the next performance." },
  { number: "04", title: "Hydrate to Dominate", desc: "Hydration supports physical and cognitive output." },
  { number: "05", title: "Test Before the Game", desc: "Competition is not the place to experiment." },
];

/* ═══ Parallax Atmospheric Layer ═══ */
const AtmosphericOrb = ({
  className,
  scrollYProgress,
  yRange,
  delay = 0,
}: {
  className: string;
  scrollYProgress: any;
  yRange: [string, string];
  delay?: number;
}) => {
  const y = useTransform(scrollYProgress, [0, 1], yRange);
  return (
    <motion.div
      className={`absolute pointer-events-none rounded-full ${className}`}
      style={{ y }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 2 }}
    />
  );
};

/* ═══ Chapter Section with cinematic fade ═══ */
const ChapterSection = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
};

/* ═══ Horizontal Scroll-Pinned Environments ═══ */
const EnvironmentsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const adjusted = Math.max(0, Math.min(1, (v - 0.15) / 0.7));
    const idx = Math.min(experiences.length - 1, Math.floor(adjusted * experiences.length));
    setActiveIndex(idx);
  });

  return (
    <div ref={sectionRef} style={{ height: `${(experiences.length + 1) * 100}vh` }}>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden section-dark">
        <div className="section-padding w-full">
          <div className="max-content">
            <div className="mb-8 md:mb-12">
              <p className="text-caption mb-3">Selected Experience</p>
              <p className="text-body-lg max-w-lg">
                Environments that shaped the work.
              </p>
            </div>

            <div className="relative h-[380px] md:h-[420px]">
              {experiences.map((exp, i) => {
                const offset = i - activeIndex;
                const isFocused = i === activeIndex;

                return (
                  <motion.div
                    key={exp.name}
                    className="absolute inset-0"
                    animate={{
                      x: `${offset * 105}%`,
                      scale: isFocused ? 1 : 0.82,
                      opacity: isFocused ? 1 : Math.abs(offset) <= 1 ? 0.25 : 0,
                      filter: isFocused ? "blur(0px)" : `blur(${Math.min(Math.abs(offset) * 4, 8)}px)`,
                      zIndex: 10 - Math.abs(offset),
                    }}
                    transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <div
                      className={`h-full border transition-colors duration-700 overflow-hidden relative ${
                        isFocused
                          ? "border-[hsl(var(--ivory)/0.12)] bg-[hsl(var(--charcoal))]"
                          : "border-[hsl(var(--ivory)/0.04)] bg-[hsl(var(--charcoal-deep))]"
                      }`}
                    >
                      {/* Club logo watermark */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                        <motion.img
                          src={exp.logo}
                          alt=""
                          className="w-[260px] h-[260px] md:w-[320px] md:h-[320px] object-contain"
                          animate={{
                            opacity: isFocused ? 0.08 : 0.02,
                            scale: isFocused ? 1.08 : 0.9,
                          }}
                          transition={{ duration: 0.8 }}
                          style={{
                            filter: "grayscale(100%) brightness(2)",
                            maskImage: "radial-gradient(ellipse at center, black 15%, transparent 70%)",
                            WebkitMaskImage: "radial-gradient(ellipse at center, black 15%, transparent 70%)",
                          }}
                        />
                      </div>

                      <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-12">
                        <div>
                          <div className="flex items-center justify-between mb-6">
                            <span className="text-[10px] tracking-widest uppercase font-display text-[hsl(var(--ivory)/0.35)]">
                              {exp.period}
                            </span>
                            <span className="text-[10px] tracking-widest uppercase font-display text-[hsl(var(--ivory)/0.2)]">
                              {exp.location}
                            </span>
                          </div>
                          <h3 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-[hsl(var(--ivory))]">
                            {exp.name}
                          </h3>
                          <p className="text-[10px] md:text-xs tracking-widest uppercase font-display mt-3 text-[hsl(var(--ivory)/0.4)]">
                            {exp.role}
                          </p>
                        </div>
                        <motion.p
                          className="text-sm max-w-md leading-relaxed text-[hsl(var(--ivory)/0.55)]"
                          animate={{ opacity: isFocused ? 1 : 0 }}
                          transition={{ duration: 0.5, delay: isFocused ? 0.2 : 0 }}
                        >
                          {exp.description}
                        </motion.p>
                      </div>

                      <motion.div
                        className="absolute bottom-0 left-0 h-[2px]"
                        style={{ background: "hsl(var(--olive-light))" }}
                        animate={{ width: isFocused ? "100%" : "0%" }}
                        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="flex items-center gap-3 mt-8">
              {experiences.map((_, i) => (
                <motion.div
                  key={i}
                  className="h-1 rounded-full"
                  animate={{
                    width: activeIndex === i ? 32 : 8,
                    backgroundColor: activeIndex === i
                      ? "hsl(var(--ivory))"
                      : "hsl(var(--ivory) / 0.15)",
                  }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                />
              ))}
              <span className="text-[10px] font-display tracking-widest uppercase ml-2 text-[hsl(var(--ivory)/0.3)]">
                {String(activeIndex + 1).padStart(2, "0")} / {String(experiences.length).padStart(2, "0")}
              </span>
            </div>

            <div className="mt-12 pt-8" style={{ borderTop: "1px solid hsl(var(--ivory) / 0.06)" }}>
              <p className="text-[10px] tracking-widest uppercase font-display mb-4 text-[hsl(var(--ivory)/0.3)]">
                Additional Observational Exposure
              </p>
              <div className="flex flex-wrap gap-x-10 gap-y-2">
                {additionalExposure.map((item) => (
                  <div key={item.name} className="flex items-center gap-3">
                    <span className="font-display text-sm font-medium text-[hsl(var(--ivory)/0.5)]">{item.name}</span>
                    <span className="text-[10px] text-[hsl(var(--ivory)/0.25)]">{item.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ═══ Value Cards with Depth Hover ═══ */
const ValueSection = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <ChapterSection>
      <section className="section-padding section-spacing">
        <div className="max-content">
          <Reveal>
            <p className="text-caption mb-4">Where I Add Value</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-body-lg max-w-lg mb-14">
              Structured components of a practical nutrition system.
            </p>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border/50">
            {valuePillars.map((pillar, i) => {
              const isHovered = hoveredIdx === i;
              const hasHover = hoveredIdx !== null;
              const isReceded = hasHover && !isHovered;

              return (
                <Reveal key={pillar.title} delay={i * 0.06}>
                  <motion.div
                    className="p-8 md:p-10 bg-background cursor-default relative overflow-hidden h-full"
                    onMouseEnter={() => setHoveredIdx(i)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    animate={{
                      y: isHovered ? -6 : 0,
                      scale: isHovered ? 1.02 : isReceded ? 0.97 : 1,
                      opacity: isReceded ? 0.4 : 1,
                      backgroundColor: isHovered
                        ? "hsl(var(--card))"
                        : "hsl(var(--background))",
                    }}
                    transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                    style={{
                      boxShadow: isHovered
                        ? "0 20px 50px -12px hsl(var(--foreground) / 0.08)"
                        : "none",
                    }}
                  >
                    <motion.div
                      className="absolute top-0 left-0 right-0 h-px bg-foreground/20"
                      animate={{ scaleX: isHovered ? 1 : 0 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      style={{ transformOrigin: "left" }}
                    />
                    <p className="text-caption text-[10px] mb-5 opacity-40">0{i + 1}</p>
                    <h3 className="font-display text-base md:text-lg font-medium text-foreground mb-3">
                      {pillar.title}
                    </h3>
                    <p className="text-body text-sm opacity-70">{pillar.description}</p>
                    <motion.span
                      className="block mt-5 text-[10px] tracking-widest uppercase text-muted-foreground/30"
                      animate={{ x: isHovered ? 4 : 0, opacity: isHovered ? 0.7 : 0.3 }}
                      transition={{ duration: 0.4 }}
                    >
                      →
                    </motion.span>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </ChapterSection>
  );
};

const Index = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Hero parallax transforms
  const heroImageY = useTransform(heroScroll, [0, 1], ["0%", "35%"]);
  const heroImageScale = useTransform(heroScroll, [0, 1], [1.1, 1.3]);
  const heroTextY = useTransform(heroScroll, [0, 1], ["0%", "25%"]);
  const heroTextOpacity = useTransform(heroScroll, [0, 0.5], [1, 0]);

  // Dark → Light world transition
  const heroBgOpacity = useTransform(heroScroll, [0, 0.8], [0, 1]);
  const heroOverlayDark = useTransform(heroScroll, [0, 0.3], [0.4, 0.7]);

  // Global parallax for atmospheric orbs
  const pageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: pageScroll } = useScroll({ target: pageRef });

  return (
    <Layout>
      <div ref={pageRef}>
        {/* ═══ CHAPTER 1: ENTRY — Dark Cinematic World ═══ */}
        <section
          ref={heroRef}
          className="relative min-h-screen flex items-center overflow-hidden"
          style={{ background: "hsl(var(--charcoal-deep))" }}
        >
          {/* Atmospheric image layer — deep parallax */}
          <motion.div className="absolute inset-0 z-0" style={{ y: heroImageY }}>
            <motion.img
              src={heroAtmosphere}
              alt=""
              className="absolute inset-0 w-full h-[130%] object-cover"
              style={{
                scale: heroImageScale,
                filter: "brightness(0.35) contrast(1.1) saturate(0.7)",
              }}
            />
          </motion.div>

          {/* Dark cinematic overlay */}
          <motion.div
            className="absolute inset-0 z-[1]"
            style={{
              opacity: heroOverlayDark,
              background: "hsl(var(--charcoal-deep))",
            }}
          />

          {/* Atmospheric depth — gradient vignette */}
          <div
            className="absolute inset-0 z-[2] pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse 120% 100% at 30% 60%, transparent 0%, hsl(var(--charcoal-deep) / 0.6) 100%),
                linear-gradient(to bottom, transparent 50%, hsl(var(--charcoal-deep)) 100%)
              `,
            }}
          />

          {/* Parallax floating atmospheric elements */}
          <AtmosphericOrb
            className="w-[600px] h-[600px] -top-20 -right-40 opacity-[0.03]"
            scrollYProgress={heroScroll}
            yRange={["0px", "-120px"]}
            delay={0.5}
          />
          <AtmosphericOrb
            className="w-[300px] h-[300px] bottom-20 left-[10%] opacity-[0.02]"
            scrollYProgress={heroScroll}
            yRange={["0px", "-80px"]}
            delay={1}
          />

          {/* Subtle vertical rhythm lines */}
          <div className="absolute inset-0 z-[3] pointer-events-none opacity-[0.04]">
            <div
              className="absolute left-[20%] top-0 w-px h-full"
              style={{ background: "linear-gradient(to bottom, transparent 10%, hsl(var(--ivory)) 50%, transparent 90%)" }}
            />
            <div
              className="absolute left-[80%] top-0 w-px h-full"
              style={{ background: "linear-gradient(to bottom, transparent 20%, hsl(var(--ivory)) 50%, transparent 80%)" }}
            />
          </div>

          {/* Hero text — light on dark */}
          <motion.div
            className="section-padding max-content w-full relative z-10"
            style={{ y: heroTextY, opacity: heroTextOpacity }}
          >
            <div className="max-w-3xl">
              <motion.p
                className="text-[10px] md:text-xs tracking-[0.3em] uppercase font-display mb-6 md:mb-8"
                style={{ color: "hsl(var(--ivory) / 0.5)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Guilherme Neves
              </motion.p>
              <motion.h1
                className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-[1.05] tracking-tight max-w-4xl"
                style={{ color: "hsl(var(--ivory))" }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.35 }}
              >
                Practical performance{"\n"}
                <br className="hidden md:block" />
                systems for sport.
              </motion.h1>
              <motion.p
                className="text-base md:text-lg leading-relaxed max-w-xl mt-6 md:mt-8"
                style={{ color: "hsl(var(--ivory) / 0.6)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.55 }}
              >
                I build practical nutrition systems, educational tools and applied
                resources designed to improve clarity, adherence and performance
                in real sporting environments.
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
                  style={{
                    background: "hsl(var(--ivory))",
                    color: "hsl(var(--charcoal-deep))",
                  }}
                >
                  Explore My Work
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-8 py-3.5 font-display text-sm font-medium tracking-wide transition-all duration-500 hover:tracking-wider"
                  style={{
                    border: "1px solid hsl(var(--ivory) / 0.15)",
                    color: "hsl(var(--ivory) / 0.8)",
                  }}
                >
                  Get in Touch
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 1 }}
          >
            <span
              className="text-[9px] tracking-[0.4em] uppercase font-display"
              style={{ color: "hsl(var(--ivory) / 0.25)" }}
            >
              Scroll
            </span>
            <motion.div
              className="w-px h-8"
              style={{ background: "hsl(var(--ivory) / 0.15)" }}
              animate={{ scaleY: [0, 1, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          {/* Transition to light world — gradual ivory reveal */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[40vh] z-[5] pointer-events-none"
            style={{
              opacity: heroBgOpacity,
              background: "linear-gradient(to bottom, transparent, hsl(var(--background)))",
            }}
          />
        </section>

        {/* ═══ CHAPTER 2: WORLDVIEW — Credibility Strip ═══ */}
        <ChapterSection>
          <section className="section-padding py-10 border-y border-border/30">
            <div className="max-content">
              <div className="flex flex-wrap items-center gap-x-10 gap-y-3 justify-center md:justify-start">
                <span className="text-caption text-[10px]">Selected Environments</span>
                <span className="hidden md:block w-8 h-px bg-border" />
                {["RSC Anderlecht", "Leça FC", "Run4Excellence", "FCNAUP"].map((name, i) => (
                  <motion.span
                    key={name}
                    initial={{ opacity: 0, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.12, duration: 0.6 }}
                    className="text-xs md:text-sm font-display font-medium text-muted-foreground/60 tracking-wide hover:text-muted-foreground transition-colors duration-500"
                  >
                    {name}
                  </motion.span>
                ))}
              </div>
            </div>
          </section>
        </ChapterSection>

        {/* ═══ CHAPTER 3: PRESENCE — Identity with Portrait ═══ */}
        <ChapterSection>
          <section className="section-padding section-spacing">
            <div className="max-content">
              <div className="grid md:grid-cols-[1fr,300px] lg:grid-cols-[1fr,360px] gap-12 md:gap-20 items-center">
                <div>
                  <Reveal>
                    <p className="text-caption mb-6">Identity</p>
                  </Reveal>
                  <Reveal delay={0.1}>
                    <h2 className="text-headline max-w-3xl">
                      Athlete by nature.<br />Nutritionist by purpose.
                    </h2>
                  </Reveal>
                  <Reveal delay={0.25}>
                    <p className="text-body-lg max-w-2xl mt-6">
                      A 21-year-old final-year Nutrition Sciences student at FCNAUP,
                      currently completing a curricular internship in Performance Nutrition
                      at RSC Anderlecht. Building practical systems, educational resources
                      and applied tools for athletes, clubs and performance environments.
                    </p>
                  </Reveal>
                  <Reveal delay={0.4}>
                    <Link
                      to="/about"
                      className="inline-block mt-8 text-body text-sm link-underline hover:text-foreground transition-colors"
                    >
                      More about me →
                    </Link>
                  </Reveal>
                </div>
                <Reveal delay={0.3} direction="right">
                  <div className="relative group">
                    <div className="overflow-hidden">
                      <motion.img
                        src={portraitImg}
                        alt="Guilherme Neves"
                        className="w-full aspect-[3/4] object-cover object-top"
                        loading="lazy"
                        width={360}
                        height={480}
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                        style={{ filter: "grayscale(15%) contrast(1.05)" }}
                      />
                    </div>
                    <motion.div
                      className="absolute -bottom-3 -left-3 bg-background px-4 py-2 border border-border/50"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8, duration: 0.6 }}
                    >
                      <p className="text-caption text-[10px]">Porto — Brussels</p>
                    </motion.div>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>
        </ChapterSection>

        <div className="section-padding max-content">
          <div className="divider" />
        </div>

        {/* ═══ CHAPTER 4: ENVIRONMENTS — Dark Immersive Horizontal ═══ */}
        <EnvironmentsSection />

        <div className="section-padding max-content">
          <div className="divider" />
        </div>

        {/* ═══ CHAPTER 5: VALUE — Depth Hover Cards ═══ */}
        <ValueSection />

        <div className="section-padding max-content">
          <div className="divider" />
        </div>

        {/* ═══ CHAPTER 6: PROOF — Selected Work (Dark moment) ═══ */}
        <ChapterSection>
          <section className="section-padding section-spacing section-dark">
            <div className="max-content">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                <div>
                  <Reveal>
                    <p className="text-caption mb-4">Selected Work</p>
                  </Reveal>
                  <Reveal delay={0.1}>
                    <p className="text-body-lg max-w-xl">
                      Curated projects and resources built at the intersection of sport
                      nutrition, education and practical systems.
                    </p>
                  </Reveal>
                </div>
                <Reveal delay={0.2}>
                  <Link
                    to="/work"
                    className="text-sm link-underline font-display tracking-wide transition-colors whitespace-nowrap"
                    style={{ color: "hsl(var(--ivory) / 0.6)" }}
                  >
                    View all work →
                  </Link>
                </Reveal>
              </div>
              <div className="grid sm:grid-cols-2 gap-px" style={{ background: "hsl(var(--ivory) / 0.06)" }}>
                {workCategories.map((cat, i) => (
                  <Reveal key={cat.name} delay={i * 0.1}>
                    <Link
                      to="/work"
                      className="block p-8 md:p-10 group transition-all duration-600 relative overflow-hidden"
                      style={{ background: "hsl(var(--charcoal-deep))" }}
                    >
                      <div className="absolute top-0 left-0 right-0 h-px overflow-hidden">
                        <div
                          className="w-0 h-full group-hover:w-full transition-all duration-700 ease-out"
                          style={{ background: "hsl(var(--ivory) / 0.15)" }}
                        />
                      </div>
                      <p
                        className="text-[10px] tracking-widest uppercase font-display mb-4"
                        style={{ color: "hsl(var(--ivory) / 0.25)" }}
                      >
                        0{i + 1}
                      </p>
                      <h3
                        className="font-display text-lg md:text-xl font-medium transition-colors duration-500"
                        style={{ color: "hsl(var(--ivory) / 0.85)" }}
                      >
                        {cat.name}
                      </h3>
                      <p className="text-xs mt-2" style={{ color: "hsl(var(--ivory) / 0.35)" }}>
                        {cat.count}
                      </p>
                      <span
                        className="inline-block mt-5 text-xs opacity-30 group-hover:opacity-80 group-hover:translate-x-2 transition-all duration-500"
                        style={{ color: "hsl(var(--ivory) / 0.5)" }}
                      >
                        View →
                      </span>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        </ChapterSection>

        {/* ═══ CHAPTER 7: FRAMEWORK — Fuel Laws Preview ═══ */}
        <ChapterSection>
          <section className="section-padding section-spacing">
            <div className="max-content">
              <Reveal>
                <p className="text-caption mb-4">Framework</p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="text-headline max-w-3xl">GN Fuel Laws</h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-body-lg max-w-xl mt-4 mb-14">
                  A practical framework for turning nutrition from information into
                  repeatable performance behaviour.
                </p>
              </Reveal>
              <div className="space-y-0">
                {fuelLaws.map((law, i) => (
                  <Reveal key={law.number} delay={i * 0.08}>
                    <Link
                      to="/fuel-laws"
                      className="flex items-center gap-6 md:gap-10 py-6 border-b border-border/40 group transition-all duration-500 hover:pl-3 relative"
                    >
                      <div className="absolute left-0 top-0 bottom-0 w-0 group-hover:w-[2px] bg-primary/40 transition-all duration-500" />
                      <span className="text-caption text-[10px] w-8 opacity-40">{law.number}</span>
                      <span className="font-display text-lg md:text-xl font-medium text-foreground group-hover:text-olive-light transition-colors duration-500">
                        {law.title}
                      </span>
                      <span className="hidden md:inline ml-auto text-body text-sm opacity-0 group-hover:opacity-60 transition-all duration-500 translate-x-2 group-hover:translate-x-0">
                        {law.desc}
                      </span>
                    </Link>
                  </Reveal>
                ))}
              </div>
              <Reveal delay={0.5}>
                <Link
                  to="/fuel-laws"
                  className="inline-block mt-10 text-body text-sm link-underline hover:text-foreground transition-colors"
                >
                  Explore the framework →
                </Link>
              </Reveal>
            </div>
          </section>
        </ChapterSection>

        <div className="section-padding max-content">
          <div className="divider" />
        </div>

        {/* ═══ CHAPTER 8: INVITATION ═══ */}
        <ChapterSection>
          <section className="section-padding py-32 md:py-40">
            <div className="max-content text-center">
              <Reveal>
                <h2 className="text-headline max-w-2xl mx-auto">
                  Let's build better performance environments.
                </h2>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="text-body-lg max-w-md mx-auto mt-5">
                  Open to meaningful opportunities in performance, education and applied sport nutrition.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <Link
                  to="/contact"
                  className="group inline-flex items-center justify-center mt-12 px-12 py-4 bg-foreground text-background font-display text-sm font-medium tracking-wide transition-all duration-500 hover:tracking-wider"
                >
                  Contact
                </Link>
              </Reveal>
            </div>
          </section>
        </ChapterSection>
      </div>
    </Layout>
  );
};

export default Index;
