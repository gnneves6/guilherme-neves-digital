import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
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

const Index = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroImageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroImageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const heroOverlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.8, 0.92]);
  const heroTextY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <Layout>
      {/* Hero — Tunnel to Clarity */}
      <section
        ref={heroRef}
        className="section-padding flex items-center min-h-[90vh] relative overflow-hidden"
      >
        {/* Atmospheric background with parallax */}
        <motion.div className="absolute inset-0 z-0" style={{ y: heroImageY }}>
          <motion.div
            className="absolute inset-0 bg-background z-10"
            style={{ opacity: heroOverlayOpacity }}
          />
          <motion.img
            src={heroAtmosphere}
            alt=""
            className="absolute right-0 top-0 w-full h-full object-cover"
            style={{ scale: heroImageScale }}
          />
          {/* Cinematic vignette layers */}
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-background/40 via-transparent to-background" />
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-background/60 via-transparent to-background/30" />
        </motion.div>

        {/* Subtle grid/line overlay for depth */}
        <div className="absolute inset-0 z-10 opacity-[0.03]">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px)",
              backgroundSize: "1px 80px",
            }}
          />
        </div>

        {/* Converging perspective lines */}
        <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-0 left-1/2 w-px h-full origin-top"
            style={{
              background: "linear-gradient(to bottom, transparent, hsl(var(--foreground) / 0.04), transparent)",
              rotate: "-8deg",
              translateX: "-200px",
            }}
          />
          <motion.div
            className="absolute top-0 left-1/2 w-px h-full origin-top"
            style={{
              background: "linear-gradient(to bottom, transparent, hsl(var(--foreground) / 0.03), transparent)",
              rotate: "6deg",
              translateX: "150px",
            }}
          />
        </div>

        <motion.div
          className="max-content w-full relative z-20"
          style={{ y: heroTextY }}
        >
          <div className="grid lg:grid-cols-[1fr,auto] gap-12 items-center">
            <div>
              <Reveal>
                <p className="text-caption mb-6 md:mb-8">Guilherme Neves</p>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="text-display max-w-4xl">
                  Practical performance systems for sport.
                </h1>
              </Reveal>
              <Reveal delay={0.25}>
                <p className="text-body-lg max-w-2xl mt-6 md:mt-8">
                  I build practical nutrition systems, educational tools and applied
                  resources designed to improve clarity, adherence and performance
                  in real sporting environments.
                </p>
              </Reveal>
              <Reveal delay={0.4}>
                <div className="flex flex-col sm:flex-row gap-4 mt-10 md:mt-12">
                  <Link
                    to="/work"
                    className="inline-flex items-center justify-center px-8 py-3.5 bg-foreground text-background font-display text-sm font-medium tracking-wide transition-all duration-300 hover:opacity-85"
                  >
                    Explore My Work
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center px-8 py-3.5 border border-foreground/20 font-display text-sm font-medium tracking-wide text-foreground transition-all duration-300 hover:border-foreground/50"
                  >
                    Get in Touch
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </motion.div>

        {/* Bottom fade for smooth transition */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-20" />
      </section>

      {/* Credibility Strip */}
      <section className="section-padding py-8 border-y border-border/50">
        <div className="max-content">
          <Reveal>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 justify-center md:justify-start">
              <span className="text-caption text-[10px] md:text-xs">Selected Environments</span>
              <span className="hidden md:block w-px h-4 bg-border" />
              {["RSC Anderlecht", "Leça FC", "Run4Excellence", "FCNAUP"].map((name, i) => (
                <motion.span
                  key={name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.15 }}
                  className="text-xs md:text-sm font-display font-medium text-muted-foreground/70 tracking-wide"
                >
                  {name}
                </motion.span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Identity Snapshot with Portrait */}
      <section className="section-padding section-spacing">
        <div className="max-content">
          <div className="grid md:grid-cols-[1fr,320px] lg:grid-cols-[1fr,380px] gap-12 md:gap-16 items-center">
            <div>
              <Reveal>
                <p className="text-caption mb-6">Identity</p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="text-headline max-w-3xl">
                  Athlete by nature. Nutritionist by purpose.
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-body-lg max-w-2xl mt-6">
                  A 21-year-old final-year Nutrition Sciences student at FCNAUP,
                  currently completing a curricular internship in Performance Nutrition
                  at RSC Anderlecht. Building practical systems, educational resources
                  and applied tools for athletes, clubs and performance environments.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <Link
                  to="/about"
                  className="inline-block mt-8 text-body text-sm link-underline hover:text-foreground transition-colors"
                >
                  More about me →
                </Link>
              </Reveal>
            </div>
            <Reveal delay={0.2} direction="right">
              <div className="relative">
                <div className="overflow-hidden">
                  <motion.img
                    src={portraitImg}
                    alt="Guilherme Neves"
                    className="w-full aspect-[3/4] object-cover object-top grayscale-[20%]"
                    loading="lazy"
                    width={380}
                    height={507}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-background px-4 py-2">
                  <p className="text-caption text-[10px]">Porto — Brussels</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="section-padding max-content">
        <div className="divider" />
      </div>

      {/* Selected Experience — with club logos */}
      <section className="section-padding section-spacing">
        <div className="max-content">
          <Reveal>
            <p className="text-caption mb-6">Selected Experience</p>
          </Reveal>
          <div className="mt-8 space-y-0">
            {experiences.map((exp, i) => (
              <Reveal key={exp.name} delay={i * 0.1}>
                <motion.div
                  className="py-8 md:py-10 border-b border-border group cursor-default relative overflow-hidden"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Club logo watermark behind */}
                  <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 pointer-events-none">
                    <img
                      src={exp.logo}
                      alt=""
                      className="w-20 h-20 md:w-28 md:h-28 object-contain opacity-[0.06] group-hover:opacity-[0.12] transition-opacity duration-700"
                      style={{
                        maskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
                        WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
                      }}
                      loading="lazy"
                      width={112}
                      height={112}
                    />
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 relative z-10">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-1">
                        <h3 className="font-display text-xl md:text-2xl font-medium text-foreground group-hover:text-olive-light transition-colors duration-500">
                          {exp.name}
                        </h3>
                        <span className="text-caption text-[10px]">
                          {exp.period}
                        </span>
                      </div>
                      <p className="text-caption text-[10px] md:text-xs font-normal mt-1">
                        {exp.role} · {exp.location}
                      </p>
                    </div>
                    <p className="text-body text-sm max-w-md">{exp.description}</p>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>

          {/* Additional Exposure */}
          <Reveal delay={0.3}>
            <div className="mt-10">
              <p className="text-caption text-[10px] mb-5">Additional Observational Exposure</p>
              <div className="flex flex-wrap gap-x-8 gap-y-3">
                {additionalExposure.map((item) => (
                  <div key={item.name} className="flex items-center gap-3">
                    <span className="font-display text-sm font-medium text-muted-foreground">{item.name}</span>
                    <span className="text-[10px] text-muted-foreground/50">{item.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="section-padding max-content">
        <div className="divider" />
      </div>

      {/* Value Pillars */}
      <section className="section-padding section-spacing">
        <div className="max-content">
          <Reveal>
            <p className="text-caption mb-6">Where I Add Value</p>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-10">
            {valuePillars.map((pillar, i) => (
              <Reveal key={pillar.title} delay={i * 0.08}>
                <motion.div
                  className="p-8 border border-border/60 group cursor-default transition-all duration-500 hover:border-foreground/20 hover:bg-card relative overflow-hidden h-full"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute top-0 left-0 w-0 h-px bg-foreground/30 group-hover:w-full transition-all duration-700" />
                  <p className="text-caption text-xs mb-4">0{i + 1}</p>
                  <h3 className="font-display text-lg font-medium text-foreground mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-body text-sm">{pillar.description}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="section-padding max-content">
        <div className="divider" />
      </div>

      {/* Selected Work Preview */}
      <section className="section-padding section-spacing">
        <div className="max-content">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <Reveal>
                <p className="text-caption mb-6">Selected Work</p>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="text-body-lg max-w-xl">
                  Curated projects and resources built at the intersection of sport
                  nutrition, education and practical systems.
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.15}>
              <Link
                to="/work"
                className="text-body text-sm link-underline hover:text-foreground transition-colors whitespace-nowrap"
              >
                View all work →
              </Link>
            </Reveal>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {workCategories.map((cat, i) => (
              <Reveal key={cat.name} delay={i * 0.08}>
                <Link
                  to="/work"
                  className="block p-8 border border-border/60 group transition-all duration-500 hover:border-foreground/20 hover:bg-card relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-0 h-px bg-foreground/30 group-hover:w-full transition-all duration-700" />
                  <p className="text-caption text-xs mb-3">0{i + 1}</p>
                  <h3 className="font-display text-lg font-medium text-foreground group-hover:text-olive-light transition-colors duration-500">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-2">{cat.count}</p>
                  <span className="inline-block mt-4 text-body text-xs group-hover:translate-x-2 transition-transform duration-300">
                    View →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="section-padding max-content">
        <div className="divider" />
      </div>

      {/* Fuel Laws Preview */}
      <section className="section-padding section-spacing">
        <div className="max-content">
          <Reveal>
            <p className="text-caption mb-6">Framework</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-headline max-w-3xl">GN Fuel Laws</h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-body-lg max-w-xl mt-4 mb-12">
              A practical framework for turning nutrition from information into
              repeatable performance behaviour.
            </p>
          </Reveal>
          <div className="space-y-0">
            {fuelLaws.map((law, i) => (
              <Reveal key={law.number} delay={i * 0.08}>
                <Link
                  to="/fuel-laws"
                  className="flex items-center gap-6 md:gap-10 py-5 border-b border-border/60 group transition-colors duration-300 hover:bg-card/50"
                >
                  <span className="text-caption text-xs w-8">{law.number}</span>
                  <span className="font-display text-lg md:text-xl font-medium text-foreground group-hover:text-olive-light transition-colors duration-500">
                    {law.title}
                  </span>
                  <span className="hidden md:inline ml-auto text-body text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {law.desc}
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.5}>
            <Link
              to="/fuel-laws"
              className="inline-block mt-8 text-body text-sm link-underline hover:text-foreground transition-colors"
            >
              Explore the framework →
            </Link>
          </Reveal>
        </div>
      </section>

      <div className="section-padding max-content">
        <div className="divider" />
      </div>

      {/* Closing CTA */}
      <section className="section-padding section-spacing">
        <div className="max-content text-center">
          <Reveal>
            <h2 className="text-headline max-w-2xl mx-auto">
              Let's build better performance environments.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-body-lg max-w-md mx-auto mt-4">
              Open to meaningful opportunities in performance, education and applied sport nutrition.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center mt-10 px-10 py-4 bg-foreground text-background font-display text-sm font-medium tracking-wide transition-all duration-300 hover:opacity-85"
            >
              Contact
            </Link>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
