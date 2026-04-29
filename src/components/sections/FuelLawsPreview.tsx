import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";

const cycle = ["Fuel", "Build", "Recover", "Hydrate", "Test", "Repeat"];

const FuelLawsPreview = () => {
  return (
    <section className="section-padding section-spacing">
      <div className="max-content">
        <div className="grid md:grid-cols-[1fr,1.2fr] gap-12 md:gap-20 items-center">
          <div>
            <Reveal>
              <p className="text-caption mb-4">GN Fuel Laws</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-headline max-w-md">
                Five laws.<br />One repeatable cycle.
              </h2>
            </Reveal>
            <Reveal delay={0.25}>
              <p className="text-body-lg max-w-md mt-6">
                A practical framework that turns nutrition from information
                into repeatable performance behaviour.
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              <Link
                to="/fuel-laws"
                className="inline-block mt-8 text-body text-sm link-underline hover:text-foreground transition-colors"
              >
                Explore the framework →
              </Link>
            </Reveal>
          </div>

          {/* Cycle */}
          <Reveal delay={0.2} direction="right">
            <div className="relative py-8">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-6 justify-center md:justify-end">
                {cycle.map((step, i) => (
                  <div key={step + i} className="flex items-center gap-4">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: i * 0.08 }}
                      className="relative group"
                    >
                      <span className="font-display text-base md:text-lg font-medium text-foreground tracking-tight">
                        {step}
                      </span>
                      <motion.span
                        className="absolute -bottom-1 left-0 right-0 h-px origin-left"
                        style={{ background: "hsl(var(--olive-light))" }}
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: i * 0.08 + 0.2 }}
                      />
                    </motion.div>
                    {i < cycle.length - 1 && (
                      <motion.span
                        className="text-muted-foreground/40 text-xs"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.08 + 0.4 }}
                      >
                        →
                      </motion.span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default FuelLawsPreview;