import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import Reveal from "@/components/Reveal";

const laws = [
  {
    number: "01",
    title: "Fuel to Perform",
    description: "Energy is the currency of performance.",
  },
  {
    number: "02",
    title: "Build Your Base",
    description: "Daily habits build or break the athlete.",
  },
  {
    number: "03",
    title: "Recover Like a Pro",
    description: "Recovery prepares the next performance.",
  },
  {
    number: "04",
    title: "Hydrate to Dominate",
    description: "Hydration supports physical and cognitive output.",
  },
  {
    number: "05",
    title: "Test Before the Game",
    description: "Competition is not the place to experiment.",
  },
];

const expansions = [
  "Education tools",
  "Club resources",
  "Applied guides",
  "Practical systems",
];

const FuelLaws = () => {
  return (
    <Layout>
      <section className="section-padding section-spacing">
        <div className="max-content">
          <Reveal>
            <p className="text-caption mb-6">Framework</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-display max-w-4xl">GN Fuel Laws</h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-body-lg max-w-2xl mt-8">
              GN Fuel Laws is a practical framework that helps turn nutrition from
              information into usable performance behaviour. Five principles.
              Clear action. Repeatable systems.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="section-padding max-content">
        <div className="divider" />
      </div>

      <section className="section-padding section-spacing">
        <div className="max-content">
          <Reveal>
            <p className="text-caption mb-10">The Five Laws</p>
          </Reveal>
          <div className="space-y-0">
            {laws.map((law, i) => (
              <Reveal key={law.number} delay={i * 0.08}>
                <motion.div
                  className="py-10 md:py-12 border-b border-border group"
                  whileHover={{ x: 8 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-10">
                    <span className="text-caption text-xs w-10 shrink-0">
                      {law.number}
                    </span>
                    <h3 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
                      {law.title}
                    </h3>
                    <span className="md:ml-auto text-body text-sm md:text-right">
                      {law.description}
                    </span>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="section-padding max-content">
        <div className="divider" />
      </div>

      {/* Expansion */}
      <section className="section-padding section-spacing">
        <div className="max-content">
          <Reveal>
            <p className="text-caption mb-6">How It Expands</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-body-lg max-w-xl mb-10">
              The framework extends into practical applications across performance
              environments.
            </p>
          </Reveal>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {expansions.map((item, i) => (
              <Reveal key={item} delay={i * 0.08}>
                <div className="p-6 border border-border/60 transition-colors duration-500 hover:border-foreground/20 hover:bg-card">
                  <p className="font-display text-base font-medium text-foreground">
                    {item}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="section-padding max-content">
        <div className="divider" />
      </div>
      <section className="section-padding section-spacing">
        <div className="max-content text-center">
          <Reveal>
            <p className="text-body-lg max-w-lg mx-auto">
              Interested in applying the framework within your team or
              organisation?
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center mt-8 px-10 py-4 bg-foreground text-background font-display text-sm font-medium tracking-wide transition-all duration-300 hover:opacity-85"
            >
              Get in Touch
            </Link>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
};

export default FuelLaws;
