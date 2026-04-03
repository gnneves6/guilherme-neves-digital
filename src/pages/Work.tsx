import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/Layout";
import Reveal from "@/components/Reveal";
import workPreview1 from "@/assets/work-preview-1.jpg";
import workPreview2 from "@/assets/work-preview-2.jpg";
import workPreview3 from "@/assets/work-preview-3.jpg";

const categories = [
  "All",
  "Educational Systems",
  "Applied Club Resources",
  "Mini Classes",
  "Performance Visuals",
  "In Development",
];

const projects = [
  {
    title: "Match-Day Fueling Protocol",
    category: "Educational Systems",
    description:
      "A structured match-day nutrition guide for professional football environments, covering pre-match, half-time and post-match fueling strategies.",
    image: workPreview1,
    status: "Complete",
  },
  {
    title: "Weekly Nutrition Periodisation Planner",
    category: "Applied Club Resources",
    description:
      "An applied planning tool that maps nutrition periodisation to weekly training load, helping athletes and staff align fueling with demand.",
    image: workPreview2,
    status: "Complete",
  },
  {
    title: "Hydration Monitoring & Reporting System",
    category: "Applied Club Resources",
    description:
      "A practical reporting tool for tracking athlete hydration markers across training and competition cycles.",
    image: null,
    status: "Complete",
  },
  {
    title: "Recovery Nutrition Quick Guide",
    category: "Performance Visuals",
    description:
      "A concise, visual guide designed for locker-room use — covering the essentials of post-training and post-match recovery nutrition.",
    image: workPreview3,
    status: "Complete",
  },
  {
    title: "Athlete Education Mini-Class: Fueling Basics",
    category: "Mini Classes",
    description:
      "A focused education session designed to be delivered to squads, covering the core behaviours around daily fueling for performance.",
    image: null,
    status: "Complete",
  },
  {
    title: "Athlete Education Mini-Class: Game-Day Nutrition",
    category: "Mini Classes",
    description:
      "A practical session on what, when and how to eat around competition. Designed for delivery in team environments.",
    image: null,
    status: "Complete",
  },
  {
    title: "Supplement Decision Framework",
    category: "Educational Systems",
    description:
      "A clear, evidence-based decision tool to help athletes and practitioners navigate supplement choices with practical criteria.",
    image: null,
    status: "Complete",
  },
  {
    title: "Pre-Season Nutrition Toolkit",
    category: "In Development",
    description:
      "A comprehensive resource for pre-season nutrition planning, athlete onboarding and baseline assessment. Currently in development.",
    image: null,
    status: "In Progress",
  },
  {
    title: "Travel Nutrition Protocol",
    category: "In Development",
    description:
      "A practical guide for maintaining nutrition standards during travel days, away matches and international competition schedules.",
    image: null,
    status: "In Progress",
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
              athletes, clubs and performance environments. Each piece is designed
              to close the gap between knowledge and practice.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="section-padding max-content">
        <div className="divider" />
      </div>

      <section className="section-padding py-10">
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
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-0"
            >
              {filtered.map((project, i) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="py-10 border-b border-border group cursor-pointer"
                >
                  <div className="flex flex-col md:flex-row gap-6 md:gap-10">
                    {/* Image preview */}
                    {project.image && (
                      <div className="w-full md:w-48 lg:w-56 shrink-0 overflow-hidden">
                        <motion.img
                          src={project.image}
                          alt={project.title}
                          className="w-full aspect-[4/3] object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700"
                          loading="lazy"
                          width={224}
                          height={168}
                          whileHover={{ scale: 1.03 }}
                          transition={{ duration: 0.4 }}
                        />
                      </div>
                    )}
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 flex-1">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <p className="text-caption text-xs">{project.category}</p>
                          {project.status === "In Progress" && (
                            <span className="text-[10px] px-2 py-0.5 border border-border text-muted-foreground font-display tracking-wider">
                              IN PROGRESS
                            </span>
                          )}
                        </div>
                        <h3 className="font-display text-xl md:text-2xl font-medium text-foreground group-hover:text-olive-light transition-colors duration-500">
                          {project.title}
                        </h3>
                      </div>
                      <div className="md:text-right max-w-sm">
                        <p className="text-body text-sm">
                          {project.description}
                        </p>
                        <span className="inline-block mt-3 text-xs text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all duration-300">
                          View project →
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* CTA */}
      <div className="section-padding max-content">
        <div className="divider" />
      </div>
      <section className="section-padding section-spacing">
        <div className="max-content text-center">
          <Reveal>
            <p className="text-body-lg max-w-md mx-auto">
              Interested in collaborating on applied performance nutrition projects?
            </p>
          </Reveal>
          <Reveal delay={0.1}>
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

export default Work;
