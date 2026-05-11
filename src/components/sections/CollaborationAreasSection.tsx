import { Link } from "react-router-dom";
import Reveal from "@/components/Reveal";

const areas = [
  {
    num: "01",
    title: "Football Nutrition Systems Review",
    desc: "Identifying gaps in nutrition strategy, education, routines and practical implementation across clubs, academies and performance environments.",
  },
  {
    num: "02",
    title: "Education & Behaviour Change Resources",
    desc: "Building athlete-facing resources that turn nutrition science into behaviours athletes can actually repeat.",
  },
  {
    num: "03",
    title: "Applied Frameworks for Teams & Academies",
    desc: "Practical frameworks, protocols and tools for matchday, recovery, hydration, supplementation and daily routines.",
  },
  {
    num: "04",
    title: "Monitoring, Reporting & Practical Tools",
    desc: "Tracking systems, reporting structures and visual tools that support staff decisions and athlete accountability.",
  },
];

const CollaborationAreasSection = () => {
  return (
    <section className="section-padding section-spacing">
      <div className="max-content">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <Reveal>
              <p className="text-caption mb-4">Where I Can Help</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground max-w-2xl">
                Collaboration areas for clubs, academies and performance environments.
              </h2>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="text-body text-sm md:text-base mt-5 max-w-lg">
                Applied performance nutrition systems, education and tools — built around how
                staff and athletes actually work.
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
              <div className="bg-background p-8 md:p-10 h-full">
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
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollaborationAreasSection;
