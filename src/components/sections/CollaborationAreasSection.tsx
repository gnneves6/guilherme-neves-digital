import { Link } from "react-router-dom";
import Reveal from "@/components/Reveal";
import Chapter from "@/components/motion/Chapter";
import Scene from "@/components/motion/Scene";

const areas = [
  {
    num: "01",
    title: "Performance Nutrition Systems Review",
    desc: "Identifying gaps in nutrition strategy, education, routines and practical implementation across clubs, academies and performance environments, with football as the primary proof environment.",
    anchor: "protected-casework",
  },
  {
    num: "02",
    title: "Education & Behaviour Change Resources",
    desc: "Building athlete-facing resources that turn nutrition science into behaviours athletes can actually repeat.",
    anchor: "public-resources",
  },
  {
    num: "03",
    title: "Applied Frameworks for Teams & Athletes",
    desc: "Practical frameworks, protocols and tools for matchday, recovery, hydration, supplementation and daily routines.",
    anchor: "practical-systems",
  },
  {
    num: "04",
    title: "Monitoring, Reporting & Practical Tools",
    desc: "Tracking systems, reporting structures and visual tools that support staff decisions and athlete accountability.",
    anchor: "tools-product-lab",
  },
];

const CollaborationAreasSection = () => {
  return (
    <Scene
      tone="dim"
      spacing="lg"
      className="scene-atmos-warm"
      contentClassName="section-padding"
    >
      <div className="max-content">
        <Reveal>
          <Chapter number="06" title="Collaboration areas." tone="light" className="mb-10 md:mb-14" />
        </Reveal>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <Reveal delay={0.1}>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground max-w-2xl">
                Collaboration areas for athletes, teams and performance environments.
              </h2>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="text-body text-sm md:text-base mt-5 max-w-lg">
                Applied performance nutrition systems, education and tools, rooted in football,
                built for any high-performance environment.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <Link
              to="/contact"
              className="text-sm link-underline font-display tracking-wide whitespace-nowrap"
            >
              Start a Conversation →
            </Link>
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-2 gap-px" style={{ background: "hsl(var(--border) / 0.6)" }}>
          {areas.map((a, i) => (
            <Reveal key={a.num} delay={i * 0.06}>
              <div
                className="group p-8 md:p-10 h-full transition-colors duration-500 relative overflow-hidden"
                style={{ background: "hsl(var(--ivory-dim))" }}
              >
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out"
                  style={{ background: "hsl(var(--olive))" }}
                />
                <div className="flex items-baseline gap-3 mb-5">
                  <span className="font-display text-xs tracking-[0.4em]" style={{ color: "hsl(var(--olive))" }}>
                    {a.num}
                  </span>
                  <span className="text-[10px] tracking-[0.3em] uppercase font-display opacity-50">
                    Area
                  </span>
                </div>
                <h3 className="font-display text-lg md:text-xl font-medium text-foreground leading-snug">
                  {a.title}
                </h3>
                <p className="text-body text-sm mt-4 leading-relaxed opacity-80">{a.desc}</p>
                <Link
                  to={`/work#${a.anchor}`}
                  className="inline-block mt-6 text-xs font-display tracking-wide opacity-60 hover:opacity-100 transition-opacity link-underline"
                >
                  See related work →
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Scene>
  );
};

export default CollaborationAreasSection;
