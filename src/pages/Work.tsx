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
  "Educational Series",
  "Club Strategies",
  "Mini Classes",
  "Performance Visuals",
  "In Development",
];

const projects = [
  {
    title: "The ABC of Football Nutrition",
    category: "Educational Series",
    description:
      "A foundational educational series breaking down the core principles of football nutrition into clear, accessible content for athletes and staff.",
    image: workPreview1,
    status: "Complete",
    audience: "Athletes & Staff",
    format: "Visual Series",
  },
  {
    title: "GN Fuel Laws — Framework & System",
    category: "Educational Series",
    description:
      "A practical five-law framework that turns nutrition knowledge into repeatable performance behaviour. The backbone of applied education.",
    image: null,
    status: "Complete",
    audience: "Athletes & Practitioners",
    format: "Framework",
  },
  {
    title: "Matchday Nutrition Protocol",
    category: "Club Strategies",
    description:
      "A structured match-day nutrition guide for professional football environments — pre-match, half-time and post-match fueling strategies.",
    image: workPreview2,
    status: "Complete",
    audience: "Performance Staff",
    format: "Protocol Document",
  },
  {
    title: "Weekly Nutrition Periodisation Planner",
    category: "Club Strategies",
    description:
      "An applied planning tool mapping nutrition periodisation to weekly training load, helping athletes and staff align fueling with demand.",
    image: null,
    status: "Complete",
    audience: "Performance Staff",
    format: "Planning Tool",
  },
  {
    title: "Hydration Monitoring & Reporting System",
    category: "Club Strategies",
    description:
      "A practical reporting tool for tracking athlete hydration markers across training and competition cycles.",
    image: null,
    status: "Complete",
    audience: "Performance Department",
    format: "Reporting System",
  },
  {
    title: "Recovery Nutrition Quick Guide",
    category: "Performance Visuals",
    description:
      "A concise visual guide designed for locker-room use — covering the essentials of post-training and post-match recovery nutrition.",
    image: workPreview3,
    status: "Complete",
    audience: "Athletes",
    format: "Visual Guide",
  },
  {
    title: "Mini Class: Fueling Basics",
    category: "Mini Classes",
    description:
      "A focused education session designed to be delivered to squads, covering the core behaviours around daily fueling for performance.",
    image: null,
    status: "Complete",
    audience: "Squad / Team",
    format: "Presentation",
  },
  {
    title: "Mini Class: Game-Day Nutrition",
    category: "Mini Classes",
    description:
      "A practical session on what, when and how to eat around competition. Designed for delivery in team environments.",
    image: null,
    status: "Complete",
    audience: "Squad / Team",
    format: "Presentation",
  },
  {
    title: "Supplement Decision Framework",
    category: "Performance Visuals",
    description:
      "A clear, evidence-based decision tool to help athletes and practitioners navigate supplement choices with practical criteria.",
    image: null,
    status: "Complete",
    audience: "Athletes & Practitioners",
    format: "Decision Tool",
  },
  {
    title: "Applied Reports & Practical Resources",
    category: "In Development",
    description:
      "A growing collection of anthropometric reports, monitoring templates and practical resources for performance departments.",
    image: null,
    status: "In Progress",
    audience: "Performance Departments",
    format: "Resource Collection",
  },
  {
    title: "Pre-Season Nutrition Toolkit",
    category: "In Development",
    description:
      "A comprehensive resource for pre-season nutrition planning, athlete onboarding and baseline assessment.",
    image: null,
    status: "In Progress",
    audience: "Performance Staff",
    format: "Toolkit",
  },
];

const Work = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

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
          <Reveal delay={0.3}>
            <p className="text-body max-w-xl mt-3">
              For the full portfolio, visit{" "}
              <a
                href="https://www.notion.so/Guilherme-Neves-Performance-Nutrition-23575c57c50d80928e62c585039bd8fa"
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline hover:text-foreground transition-colors"
              >
                my Notion workspace →
              </a>
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
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 text-[11px] font-display tracking-wider uppercase transition-all duration-500 border ${
                    activeCategory === cat
                      ? "bg-foreground text-background border-foreground"
                      : "bg-transparent text-muted-foreground/60 border-border/50 hover:border-foreground/25 hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Proof in Motion — Project Cards */}
      <section className="section-padding pb-32">
        <div className="max-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="space-y-0"
            >
              {filtered.map((project, i) => {
                const isHovered = hoveredProject === project.title;
                const hasHover = hoveredProject !== null;
                const isReceded = hasHover && !isHovered;

                return (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: isReceded ? 0.35 : 1,
                      y: 0,
                    }}
                    transition={{ duration: 0.6, delay: i * 0.04 }}
                    className="py-10 md:py-12 border-b border-border/40 group cursor-pointer relative"
                    onMouseEnter={() => setHoveredProject(project.title)}
                    onMouseLeave={() => setHoveredProject(null)}
                  >
                    {/* Active indicator line */}
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 w-[2px] bg-foreground/20"
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: isHovered ? 1 : 0 }}
                      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                      style={{ originY: 0 }}
                    />

                    <div className="flex flex-col md:flex-row gap-6 md:gap-10">
                      {/* Image with premium hover */}
                      {project.image && (
                        <div className="w-full md:w-44 lg:w-52 shrink-0 overflow-hidden relative">
                          <motion.img
                            src={project.image}
                            alt={project.title}
                            className="w-full aspect-[4/3] object-cover"
                            loading="lazy"
                            width={208}
                            height={156}
                            animate={{
                              filter: isHovered ? "grayscale(0%) contrast(1.05)" : "grayscale(40%) contrast(1)",
                              scale: isHovered ? 1.05 : 1,
                            }}
                            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                          />
                          {/* Tonal overlay */}
                          <motion.div
                            className="absolute inset-0"
                            animate={{
                              background: isHovered
                                ? "transparent"
                                : "hsl(var(--background) / 0.08)",
                            }}
                            transition={{ duration: 0.5 }}
                          />
                        </div>
                      )}

                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 flex-1">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <p className="text-caption text-[10px] opacity-50">{project.category}</p>
                            {project.status === "In Progress" && (
                              <span className="text-[10px] px-2 py-0.5 border border-border/50 text-muted-foreground/50 font-display tracking-wider">
                                IN PROGRESS
                              </span>
                            )}
                          </div>
                          <motion.h3
                            className="font-display text-xl md:text-2xl font-medium transition-colors duration-600"
                            animate={{
                              color: isHovered
                                ? "hsl(155, 12%, 40%)"
                                : "hsl(var(--foreground))",
                            }}
                            transition={{ duration: 0.5 }}
                          >
                            {project.title}
                          </motion.h3>

                          {/* Context metadata — revealed on hover */}
                          <AnimatePresence>
                            {isHovered && (
                              <motion.div
                                className="flex gap-4 mt-2"
                                initial={{ opacity: 0, y: 6, height: 0 }}
                                animate={{ opacity: 1, y: 0, height: "auto" }}
                                exit={{ opacity: 0, y: 6, height: 0 }}
                                transition={{ duration: 0.35 }}
                              >
                                <span className="text-[10px] font-display tracking-wider uppercase text-muted-foreground/50">
                                  {project.audience}
                                </span>
                                <span className="text-[10px] text-muted-foreground/25">·</span>
                                <span className="text-[10px] font-display tracking-wider uppercase text-muted-foreground/50">
                                  {project.format}
                                </span>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        <div className="md:text-right max-w-sm">
                          <p className="text-body text-sm opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                            {project.description}
                          </p>
                          <motion.span
                            className="inline-block mt-3 text-xs text-muted-foreground/40 transition-all duration-500"
                            animate={{
                              x: isHovered ? 4 : 0,
                              color: isHovered
                                ? "hsl(var(--foreground))"
                                : "hsl(var(--muted-foreground) / 0.4)",
                            }}
                            transition={{ duration: 0.4 }}
                          >
                            View project →
                          </motion.span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
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
              className="group inline-flex items-center justify-center mt-8 px-12 py-4 bg-foreground text-background font-display text-sm font-medium tracking-wide transition-all duration-500 hover:tracking-wider"
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
