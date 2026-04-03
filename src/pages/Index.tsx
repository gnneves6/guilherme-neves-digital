import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import Reveal from "@/components/Reveal";
import heroAtmosphere from "@/assets/hero-atmosphere.jpg";
import portraitImg from "@/assets/guilherme-portrait.jpg";

const experiences = [
  {
    name: "RSC Anderlecht",
    role: "Performance Nutrition",
    location: "Brussels, Belgium",
    period: "2024",
    description: "Belgian Pro League — Applied nutrition within an elite football academy environment.",
  },
  {
    name: "Leça FC",
    role: "Sports Nutritionist",
    location: "Porto, Portugal",
    period: "2023 – 2024",
    description: "Portuguese football — Practical nutrition systems for a competitive club environment.",
  },
  {
    name: "Run4Excellence",
    role: "Performance Nutrition",
    location: "Porto, Portugal",
    period: "2023",
    description: "Endurance performance — Fueling strategies for distance athletes and structured training.",
  },
];

const valuePillars = [
  {
    title: "Athlete Education & Behaviour",
    description:
      "Turning complex nutrition science into clear, actionable knowledge athletes actually use in daily life and competition.",
    icon: "→",
  },
  {
    title: "Fueling, Recovery & Hydration Systems",
    description:
      "Building practical protocols that integrate seamlessly into training schedules and match-day routines.",
    icon: "→",
  },
  {
    title: "Monitoring, Reporting & Practical Tools",
    description:
      "Creating useful tracking systems and resources that support staff decisions and athlete accountability.",
    icon: "→",
  },
  {
    title: "Team Nutrition Culture & Applied Resources",
    description:
      "Developing environments where good nutrition becomes a natural part of how a team operates and performs.",
    icon: "→",
  },
];

const workCategories = [
  { name: "Educational Systems", count: "4 projects" },
  { name: "Applied Club Resources", count: "3 projects" },
  { name: "Mini Classes / Applied Insights", count: "5 sessions" },
  { name: "Performance Visuals / Guides", count: "6 resources" },
];

const fuelLaws = [
  { number: "01", title: "Fuel to Perform", desc: "Energy is the currency of performance." },
  { number: "02", title: "Build Your Base", desc: "Daily habits build or break the athlete." },
  { number: "03", title: "Recover Like a Pro", desc: "Recovery prepares the next performance." },
  { number: "04", title: "Hydrate to Dominate", desc: "Hydration supports physical and cognitive output." },
  { number: "05", title: "Test Before the Game", desc: "Competition is not the place to experiment." },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding flex items-center min-h-[90vh] relative overflow-hidden">
        {/* Atmospheric background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-background/80 z-10" />
          <img
            src={heroAtmosphere}
            alt=""
            className="absolute right-0 top-0 w-full h-full object-cover opacity-[0.12]"
          />
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent z-10" />
        </div>

        <div className="max-content w-full relative z-20">
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
                  I build educational tools, applied resources and athlete-centered
                  systems that turn nutrition and performance knowledge into clear,
                  usable action.
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
        </div>
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
                  A performance-focused professional building practical systems,
                  educational resources and applied tools for athletes, clubs and
                  performance environments.
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

      {/* Selected Experience */}
      <section className="section-padding section-spacing">
        <div className="max-content">
          <Reveal>
            <p className="text-caption mb-6">Selected Experience</p>
          </Reveal>
          <div className="mt-8 space-y-0">
            {experiences.map((exp, i) => (
              <Reveal key={exp.name} delay={i * 0.1}>
                <motion.div
                  className="py-8 md:py-10 border-b border-border group cursor-default"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-1">
                        <h3 className="font-display text-xl md:text-2xl font-medium text-foreground group-hover:text-olive-light transition-colors duration-500">
                          {exp.name}
                        </h3>
                        <span className="hidden md:inline-block text-caption text-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
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
          <Reveal delay={0.3}>
            <p className="text-body text-sm mt-8 italic">
              Additional practical and observational exposure across competitive
              sport and performance settings.
            </p>
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
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 mt-10">
            {valuePillars.map((pillar, i) => (
              <Reveal key={pillar.title} delay={i * 0.1}>
                <motion.div
                  className="p-8 md:p-10 border border-border/60 group cursor-default transition-all duration-500 hover:border-foreground/20 hover:bg-card relative overflow-hidden"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute top-0 left-0 w-0 h-px bg-foreground/30 group-hover:w-full transition-all duration-700" />
                  <p className="text-caption text-xs mb-4">0{i + 1}</p>
                  <h3 className="font-display text-lg md:text-xl font-medium text-foreground mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-body text-sm">{pillar.description}</p>
                  <span className="inline-block mt-5 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 translate-x-[-4px] group-hover:translate-x-0 transition-all duration-500">
                    {pillar.icon}
                  </span>
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
