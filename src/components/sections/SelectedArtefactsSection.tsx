import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";

type Status = "Public" | "Private" | "Protected";

const artefacts: {
  title: string;
  type: string;
  description: string;
  status: Status;
  cta: string;
  href?: string;
}[] = [
  {
    title: "MD-1 Fuel System",
    type: "Matchday Protocol",
    description: "Practical matchday-minus-one structure for carbohydrate loading, hydration and familiar meals.",
    status: "Public",
    cta: "View",
    href: "/work",
  },
  {
    title: "Athlete Equivalent Bank",
    type: "Applied Tool",
    description: "A food substitution system helping athletes adapt meals without losing structure.",
    status: "Public",
    cta: "Learn more",
    href: "/work",
  },
  {
    title: "Individual Athlete Nutrition Orientation",
    type: "Case Study",
    description: "A real-world athlete plan translating body composition goals, training demands and daily habits into action.",
    status: "Private",
    cta: "Available on request",
    href: "/contact",
  },
  {
    title: "Private Team Monitoring Report",
    type: "Confidential Reporting",
    description: "Protected proof of team-level monitoring and reporting. Confidential — file not shown publicly.",
    status: "Protected",
    cta: "Protected",
  },
];

const statusStyle: Record<Status, { dot: string; text: string }> = {
  Public: { dot: "bg-[hsl(var(--olive-light))]", text: "text-[hsl(var(--ivory)/0.7)]" },
  Private: { dot: "bg-[hsl(35,30%,60%)]", text: "text-[hsl(var(--ivory)/0.55)]" },
  Protected: { dot: "bg-[hsl(var(--ivory)/0.3)]", text: "text-[hsl(var(--ivory)/0.4)]" },
};

const SelectedArtefactsSection = () => {
  return (
    <section className="section-padding section-spacing section-dark">
      <div className="max-content">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <Reveal>
              <p className="text-caption mb-4">Selected Artefacts</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-[hsl(var(--ivory))] max-w-xl">
                Real systems, applied in real environments.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <Link
              to="/work"
              className="text-sm link-underline font-display tracking-wide whitespace-nowrap"
              style={{ color: "hsl(var(--ivory) / 0.65)" }}
            >
              View all work →
            </Link>
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-2 gap-px" style={{ background: "hsl(var(--ivory) / 0.06)" }}>
          {artefacts.map((a, i) => {
            const isProtected = a.status === "Protected";
            const Wrapper: any = a.href && !isProtected ? Link : "div";
            const wrapperProps = a.href && !isProtected ? { to: a.href } : {};
            const s = statusStyle[a.status];

            return (
              <Reveal key={a.title} delay={i * 0.08}>
                <motion.div
                  whileHover={!isProtected ? { y: -4 } : undefined}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  className="h-full"
                >
                  <Wrapper
                    {...wrapperProps}
                    className={`block p-8 md:p-10 group relative overflow-hidden h-full ${
                      isProtected ? "cursor-default" : "cursor-pointer"
                    }`}
                    style={{ background: "hsl(var(--charcoal-deep))" }}
                  >
                    <div className="absolute top-0 left-0 right-0 h-px overflow-hidden">
                      <div
                        className="w-0 h-full group-hover:w-full transition-all duration-700 ease-out"
                        style={{ background: "hsl(var(--ivory) / 0.18)" }}
                      />
                    </div>

                    <div className="flex items-center justify-between mb-5">
                      <p className="text-[10px] tracking-widest uppercase font-display text-[hsl(var(--ivory)/0.3)]">
                        0{i + 1} — {a.type}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                        <span className={`text-[9px] tracking-[0.25em] uppercase font-display ${s.text}`}>
                          {a.status}
                        </span>
                      </div>
                    </div>

                    <h3
                      className="font-display text-xl md:text-2xl font-medium leading-snug"
                      style={{ color: "hsl(var(--ivory) / 0.92)" }}
                    >
                      {a.title}
                    </h3>
                    <p className="text-sm mt-3 leading-relaxed" style={{ color: "hsl(var(--ivory) / 0.55)" }}>
                      {a.description}
                    </p>

                    <span
                      className={`inline-block mt-6 text-xs ${
                        isProtected ? "opacity-30" : "opacity-50 group-hover:opacity-90 group-hover:translate-x-2"
                      } transition-all duration-500`}
                      style={{ color: "hsl(var(--ivory) / 0.7)" }}
                    >
                      {a.cta} {!isProtected && "→"}
                    </span>
                  </Wrapper>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SelectedArtefactsSection;