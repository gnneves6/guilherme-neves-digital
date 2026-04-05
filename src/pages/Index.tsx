import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
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
  },
  {
    name: "Leça FC",
    role: "First Team Performance Nutrition",
    location: "Porto, Portugal",
    period: "2025",
    description: "Portuguese football — Building and delivering practical nutrition systems for a competitive first-team environment.",
    logo: logoLeca,
  },
  {
    name: "Run4Excellence",
    role: "Performance Nutrition | Health & Performance",
    location: "Porto, Portugal",
    period: "2025",
    description: "Endurance performance — Applied nutrition and health strategies for distance athletes and structured training.",
    logo: logoR4E,
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
    description:
      "Turning complex nutrition science into clear, actionable knowledge athletes actually use in daily life and competition.",
  },
  {
    title: "Matchday Nutrition Structure",
    description:
      "Building practical protocols that integrate seamlessly into match-day routines — from pre-match fueling to post-match recovery.",
  },
  {
    title: "Monitoring, Reporting & Practical Tools",
    description:
      "Creating useful tracking systems, anthropometric monitoring and resources that support staff decisions and athlete accountability.",
  },
  {
    title: "Team Nutrition Culture",
    description:
      "Developing environments where good nutrition becomes a natural part of how a team operates, trains and performs together.",
  },
  {
    title: "Fueling & Recovery Systems",
    description:
      "Designing repeatable fueling, recovery and hydration protocols that survive the complexity of real training weeks.",
  },
  {
    title: "Hydration & Supplementation",
    description:
      "Structuring evidence-based hydration and supplementation frameworks tailored to sport demands and individual athlete needs.",
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

/* Staggered section component for cinematic pacing */
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

const Index = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroImageY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const heroImageScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);
  const heroOverlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0.75, 0.95]);
  const heroTextY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const heroLineScale = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <Layout>
      {/* ═══ CHAPTER 1: ENTRY — Tunnel to Clarity ═══ */}
      <section
        ref={heroRef}
        className="section-padding flex items-center min-h-screen relative overflow-hidden"
      >
        {/* Deep atmospheric background */}
        <motion.div className="absolute inset-0 z-0" style={{ y: heroImageY }}>
          <motion.img
            src={heroAtmosphere}
            alt=""
            className="absolute inset-0 w-full h-[120%] object-cover"
            style={{ scale: heroImageScale }}
          />
          {/* Primary darkness overlay */}
          <motion.div
            className="absolute inset-0 z-10"
            style={{
              opacity: heroOverlayOpacity,
              background: "hsl(var(--background))",
            }}
          />
          {/* Cinematic vignette — radial fade */}
          <div
            className="absolute inset-0 z-10"
            style={{
              background:
                "radial-gradient(ellipse 80% 70% at 30% 50%, transparent 0%, hsl(var(--background)) 100%)",
            }}
          />
          {/* Bottom gradient for seamless section transition */}
          <div className="absolute bottom-0 left-0 right-0 h-48 z-10 bg-gradient-to-t from-background via-background/80 to-transparent" />
          {/* Side atmosphere */}
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-background/70 via-transparent to-background/50" />
        </motion.div>

        {/* Subtle vertical rhythm lines */}
        <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.025]">
          <div
            className="absolute left-[20%] top-0 w-px h-full"
            style={{ background: "linear-gradient(to bottom, transparent 10%, hsl(var(--foreground)) 50%, transparent 90%)" }}
          />
          <div
            className="absolute left-[80%] top-0 w-px h-full"
            style={{ background: "linear-gradient(to bottom, transparent 20%, hsl(var(--foreground)) 50%, transparent 80%)" }}
          />
        </div>

        {/* Converging depth lines */}
        <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-0 left-1/2 w-px h-full origin-top"
            style={{
              background: "linear-gradient(to bottom, transparent, hsl(var(--foreground) / 0.035), transparent)",
              rotate: "-6deg",
              translateX: "-250px",
              scaleY: heroLineScale,
            }}
          />
          <motion.div
            className="absolute top-0 left-1/2 w-px h-full origin-top"
            style={{
              background: "linear-gradient(to bottom, transparent, hsl(var(--foreground) / 0.025), transparent)",
              rotate: "5deg",
              translateX: "200px",
              scaleY: heroLineScale,
            }}
          />
        </div>

        <motion.div
          className="max-content w-full relative z-20"
          style={{ y: heroTextY, opacity: heroTextOpacity }}
        >
          <div className="max-w-3xl">
            <Reveal>
              <p className="text-caption mb-6 md:mb-8">Guilherme Neves</p>
            </Reveal>
            <Reveal delay={0.15}>
              <h1 className="text-display max-w-4xl">
                Practical performance<br className="hidden md:block" /> systems for sport.
              </h1>
            </Reveal>
            <Reveal delay={0.35}>
              <p className="text-body-lg max-w-xl mt-6 md:mt-8">
                I build practical nutrition systems, educational tools and applied
                resources designed to improve clarity, adherence and performance
                in real sporting environments.
              </p>
            </Reveal>
            <Reveal delay={0.55}>
              <div className="flex flex-col sm:flex-row gap-4 mt-10 md:mt-14">
                <Link
                  to="/work"
                  className="group inline-flex items-center justify-center px-8 py-3.5 bg-foreground text-background font-display text-sm font-medium tracking-wide transition-all duration-500 hover:tracking-wider"
                >
                  Explore My Work
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-8 py-3.5 border border-foreground/15 font-display text-sm font-medium tracking-wide text-foreground transition-all duration-500 hover:border-foreground/40 hover:tracking-wider"
                >
                  Get in Touch
                </Link>
              </div>
            </Reveal>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <motion.div
            className="w-px h-8 bg-foreground/20"
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ originY: 0 }}
          />
        </motion.div>
      </section>

      {/* ═══ CHAPTER 2: PRESENCE — Credibility Strip ═══ */}
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

      {/* ═══ CHAPTER 2b: PRESENCE — Identity with Portrait ═══ */}
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
                  {/* Editorial label */}
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

      {/* ═══ CHAPTER 3: ENVIRONMENTS ═══ */}
      <ChapterSection>
        <section className="section-padding section-spacing">
          <div className="max-content">
            <Reveal>
              <p className="text-caption mb-4">Selected Experience</p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-body-lg max-w-lg mb-12">
                Environments that shaped the work.
              </p>
            </Reveal>
            <div className="space-y-0">
              {experiences.map((exp, i) => (
                <Reveal key={exp.name} delay={i * 0.12}>
                  <motion.div
                    className="py-10 md:py-14 border-b border-border/60 group cursor-default relative overflow-hidden"
                    whileHover={{ x: 6 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    {/* Club logo watermark */}
                    <div className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 pointer-events-none">
                      <motion.img
                        src={exp.logo}
                        alt=""
                        className="w-24 h-24 md:w-32 md:h-32 object-contain"
                        loading="lazy"
                        width={128}
                        height={128}
                        initial={{ opacity: 0.04 }}
                        whileInView={{ opacity: 0.06 }}
                        viewport={{ once: true }}
                        style={{
                          maskImage: "radial-gradient(ellipse at center, black 20%, transparent 75%)",
                          WebkitMaskImage: "radial-gradient(ellipse at center, black 20%, transparent 75%)",
                          filter: "grayscale(100%)",
                        }}
                      />
                    </div>

                    {/* Active line accent */}
                    <div className="absolute left-0 top-0 bottom-0 w-0 group-hover:w-[2px] bg-foreground/25 transition-all duration-500" />

                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 relative z-10">
                      <div className="flex-1">
                        <div className="flex items-baseline gap-5 mb-2">
                          <h3 className="font-display text-xl md:text-2xl lg:text-3xl font-medium text-foreground group-hover:text-olive-light transition-colors duration-600">
                            {exp.name}
                          </h3>
                          <span className="text-caption text-[10px] opacity-50">
                            {exp.period}
                          </span>
                        </div>
                        <p className="text-caption text-[10px] md:text-xs font-normal">
                          {exp.role}
                        </p>
                        <motion.p
                          className="text-[10px] text-muted-foreground/40 mt-1 font-display tracking-wider"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + i * 0.1 }}
                        >
                          {exp.location}
                        </motion.p>
                      </div>
                      <p className="text-body text-sm max-w-sm opacity-70 group-hover:opacity-100 transition-opacity duration-500">
                        {exp.description}
                      </p>
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>

            {/* Additional Exposure */}
            <Reveal delay={0.4}>
              <div className="mt-12">
                <p className="text-caption text-[10px] mb-5">Additional Observational Exposure</p>
                <div className="flex flex-wrap gap-x-10 gap-y-3">
                  {additionalExposure.map((item, i) => (
                    <motion.div
                      key={item.name}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * i }}
                    >
                      <span className="font-display text-sm font-medium text-muted-foreground/70">{item.name}</span>
                      <span className="text-[10px] text-muted-foreground/35">{item.date}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </ChapterSection>

      <div className="section-padding max-content">
        <div className="divider" />
      </div>

      {/* ═══ CHAPTER 4: VALUE ═══ */}
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
              {valuePillars.map((pillar, i) => (
                <Reveal key={pillar.title} delay={i * 0.06}>
                  <motion.div
                    className="p-8 md:p-10 bg-background group cursor-default transition-all duration-600 hover:bg-card relative overflow-hidden h-full"
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    {/* Top accent line */}
                    <div className="absolute top-0 left-0 right-0 h-px">
                      <div className="w-0 h-full bg-foreground/20 group-hover:w-full transition-all duration-700 ease-out" />
                    </div>
                    <p className="text-caption text-[10px] mb-5 opacity-40 group-hover:opacity-70 transition-opacity duration-500">
                      0{i + 1}
                    </p>
                    <h3 className="font-display text-base md:text-lg font-medium text-foreground mb-3 group-hover:text-olive-light transition-colors duration-500">
                      {pillar.title}
                    </h3>
                    <p className="text-body text-sm opacity-70 group-hover:opacity-100 transition-opacity duration-500">
                      {pillar.description}
                    </p>
                    <motion.span
                      className="block mt-5 text-[10px] tracking-widest uppercase text-muted-foreground/30 group-hover:text-muted-foreground/60 transition-all duration-500"
                    >
                      →
                    </motion.span>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </ChapterSection>

      <div className="section-padding max-content">
        <div className="divider" />
      </div>

      {/* ═══ CHAPTER 5: PROOF — Selected Work ═══ */}
      <ChapterSection>
        <section className="section-padding section-spacing">
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
                  className="text-body text-sm link-underline hover:text-foreground transition-colors whitespace-nowrap"
                >
                  View all work →
                </Link>
              </Reveal>
            </div>
            <div className="grid sm:grid-cols-2 gap-px bg-border/40">
              {workCategories.map((cat, i) => (
                <Reveal key={cat.name} delay={i * 0.1}>
                  <Link
                    to="/work"
                    className="block p-8 md:p-10 bg-background group transition-all duration-600 hover:bg-card relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 right-0 h-px">
                      <div className="w-0 h-full bg-foreground/20 group-hover:w-full transition-all duration-700 ease-out" />
                    </div>
                    <p className="text-caption text-[10px] mb-4 opacity-40">0{i + 1}</p>
                    <h3 className="font-display text-lg md:text-xl font-medium text-foreground group-hover:text-olive-light transition-colors duration-500">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-muted-foreground/60 mt-2">{cat.count}</p>
                    <motion.span
                      className="inline-block mt-5 text-body text-xs opacity-40 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500"
                    >
                      View →
                    </motion.span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </ChapterSection>

      <div className="section-padding max-content">
        <div className="divider" />
      </div>

      {/* ═══ CHAPTER 6: FRAMEWORK — Fuel Laws Preview ═══ */}
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
                    {/* Hover accent */}
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

      {/* ═══ CHAPTER 7: INVITATION ═══ */}
      <ChapterSection>
        <section className="section-padding section-spacing">
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
    </Layout>
  );
};

export default Index;
