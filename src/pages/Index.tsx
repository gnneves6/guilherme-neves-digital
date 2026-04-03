import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import Reveal from "@/components/Reveal";

const experiences = [
  {
    name: "RSC Anderlecht",
    description: "Belgian Pro League — Performance nutrition within an elite football environment.",
  },
  {
    name: "Leça FC",
    description: "Portuguese football — Practical nutrition systems for competitive club environments.",
  },
  {
    name: "Run4Excellence",
    description: "Endurance performance — Fueling strategies for distance athletes and training systems.",
  },
];

const valuePillars = [
  {
    title: "Athlete Education & Behaviour",
    description:
      "Turning complex nutrition science into clear, actionable knowledge athletes actually use in daily life and competition.",
  },
  {
    title: "Fueling, Recovery & Hydration Systems",
    description:
      "Building practical protocols that integrate seamlessly into training schedules and match-day routines.",
  },
  {
    title: "Monitoring, Reporting & Practical Tools",
    description:
      "Creating useful tracking systems and resources that support staff decisions and athlete accountability.",
  },
  {
    title: "Team Nutrition Culture & Applied Resources",
    description:
      "Developing environments where good nutrition becomes a natural part of how a team operates and performs.",
  },
];

const workCategories = [
  "Educational Systems",
  "Applied Club Resources",
  "Mini Classes / Applied Insights",
  "Performance Visuals / Guides",
];

const fuelLaws = [
  { number: "01", title: "Fuel to Perform" },
  { number: "02", title: "Build Your Base" },
  { number: "03", title: "Recover Like a Pro" },
  { number: "04", title: "Hydrate to Dominate" },
  { number: "05", title: "Test Before the Game" },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding section-spacing flex items-center min-h-[85vh]">
        <div className="max-content w-full">
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
      </section>

      <div className="section-padding max-content">
        <div className="divider" />
      </div>

      {/* Identity Snapshot */}
      <section className="section-padding section-spacing">
        <div className="max-content">
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
                <div className="py-8 border-b border-border group">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <h3 className="font-display text-xl md:text-2xl font-medium text-foreground group-hover:text-olive-light transition-colors duration-500">
                      {exp.name}
                    </h3>
                    <p className="text-body text-sm max-w-md">{exp.description}</p>
                  </div>
                </div>
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
                  className="p-8 md:p-10 border border-border/60 group cursor-default transition-colors duration-500 hover:border-foreground/20 hover:bg-card"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-caption text-xs mb-4">0{i + 1}</p>
                  <h3 className="font-display text-lg md:text-xl font-medium text-foreground mb-3">
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
          <Reveal>
            <p className="text-caption mb-6">Selected Work</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-body-lg max-w-xl mb-10">
              Curated projects and resources built at the intersection of sport
              nutrition, education and practical systems.
            </p>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-6">
            {workCategories.map((cat, i) => (
              <Reveal key={cat} delay={i * 0.08}>
                <Link
                  to="/work"
                  className="block p-8 border border-border/60 group transition-all duration-500 hover:border-foreground/20 hover:bg-card"
                >
                  <p className="text-caption text-xs mb-3">0{i + 1}</p>
                  <h3 className="font-display text-lg font-medium text-foreground group-hover:text-olive-light transition-colors duration-500">
                    {cat}
                  </h3>
                  <span className="inline-block mt-4 text-body text-xs group-hover:translate-x-1 transition-transform duration-300">
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
                <div className="flex items-center gap-6 md:gap-10 py-5 border-b border-border/60">
                  <span className="text-caption text-xs w-8">{law.number}</span>
                  <span className="font-display text-lg md:text-xl font-medium text-foreground">
                    {law.title}
                  </span>
                </div>
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
          <Reveal delay={0.15}>
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
