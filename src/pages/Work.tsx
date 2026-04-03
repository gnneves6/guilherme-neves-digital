import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import Reveal from "@/components/Reveal";

const categories = [
  "All",
  "Football Nutrition Education",
  "Performance Systems",
  "Practical Guides",
  "Reporting & Applied Practice",
  "Resources in Development",
];

const projects = [
  {
    title: "Match-Day Fueling Protocol",
    category: "Football Nutrition Education",
    description:
      "A structured match-day nutrition guide for professional football environments, covering pre-match, half-time and post-match fueling strategies.",
  },
  {
    title: "Weekly Nutrition Planner for Athletes",
    category: "Performance Systems",
    description:
      "An applied planning tool that maps nutrition periodisation to weekly training load, helping athletes and staff align fueling with demand.",
  },
  {
    title: "Hydration Monitoring Dashboard",
    category: "Reporting & Applied Practice",
    description:
      "A practical reporting tool for tracking athlete hydration markers across training and competition cycles.",
  },
  {
    title: "Recovery Nutrition Quick Guide",
    category: "Practical Guides",
    description:
      "A concise, visual guide designed for locker-room use — covering the essentials of post-training and post-match recovery nutrition.",
  },
  {
    title: "Athlete Education Mini-Class Series",
    category: "Football Nutrition Education",
    description:
      "A set of short, focused education sessions designed to be delivered to squads, covering core nutrition behaviours for performance.",
  },
  {
    title: "Pre-Season Nutrition Toolkit",
    category: "Resources in Development",
    description:
      "An upcoming comprehensive resource for pre-season nutrition planning, athlete onboarding and baseline assessment.",
  },
];

const Work = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <Layout>
      <section className="section-padding section-spacing">
        <div className="max-content">
          <Reveal>
            <p className="text-caption mb-6">Work</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-display max-w-4xl">Selected work.</h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-body-lg max-w-xl mt-6">
              A curated selection of projects, resources and systems built for
              athletes, clubs and performance environments.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="section-padding max-content">
        <div className="divider" />
      </div>

      <section className="section-padding py-12">
        <div className="max-content">
          <Reveal>
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 text-xs font-display tracking-wide transition-all duration-300 border ${
                    activeCategory === cat
                      ? "bg-foreground text-background border-foreground"
                      : "bg-transparent text-muted-foreground border-border hover:border-foreground/30 hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-padding pb-32">
        <div className="max-content">
          <div className="space-y-0">
            {filtered.map((project, i) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="py-10 border-b border-border group cursor-pointer"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-caption text-xs mb-2">{project.category}</p>
                    <h3 className="font-display text-xl md:text-2xl font-medium text-foreground group-hover:text-olive-light transition-colors duration-500">
                      {project.title}
                    </h3>
                  </div>
                  <p className="text-body text-sm max-w-md md:text-right">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Work;
