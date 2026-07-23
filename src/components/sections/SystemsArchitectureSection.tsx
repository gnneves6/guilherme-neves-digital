import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import Scene from "@/components/motion/Scene";

const ivory = (a: number) => `hsl(var(--ivory) / ${a})`;

type Status = "Live" | "Growing" | "In Development" | "Future";

interface Pillar {
  num: string;
  title: string;
  line: string;
  status: Status;
  href?: string;
}

const pillars: Pillar[] = [
  {
    num: "I",
    title: "Applied Work",
    line: "Real implementation inside professional football environments.",
    status: "Live",
    href: "/work",
  },
  {
    num: "II",
    title: "Consulting",
    line: "Helping organisations build performance systems that people actually use.",
    status: "Live",
    href: "/services",
  },
  {
    num: "III",
    title: "Resources",
    line: "Knowledge transformed into practical tools and education.",
    status: "Growing",
  },
  {
    num: "IV",
    title: "Technology",
    line: "Digital intelligence supporting better decisions.",
    status: "In Development",
  },
  {
    num: "V",
    title: "Research",
    line: "Evidence shaping every future system.",
    status: "Future",
  },
];

const statusOpacity: Record<Status, number> = {
  Live: 0.85,
  Growing: 0.65,
  "In Development": 0.5,
  Future: 0.4,
};

/**
 * 05.5, GN Performance Systems.
 * Editorial masthead + five pillars arranged as a quiet, magazine-style
 * spread. Reveals that the website is the architecture of a firm, not a
 * portfolio. Avoids flowchart, dashboard or SaaS aesthetics.
 */
const SystemsArchitectureSection = () => {
  const reduce = useReducedMotion();

  return (
    <Scene
      tone="cinematic"
      spacing="xl"
      overlayGradient="linear-gradient(180deg, hsl(var(--cinematic)) 0%, hsl(220 22% 8% / 0.98) 50%, hsl(var(--cinematic)) 100%)"
      fadeTopFrom="hsl(var(--cinematic))"
      fadeBottomTo="hsl(var(--background))"
      contentClassName="section-padding"
    >
      <div className="max-content relative">
        {/* Chapter mark */}
        <Reveal>
          <div className="flex items-center justify-center gap-3 mb-14 md:mb-20">
            <span
              className="font-display text-[10px] md:text-[11px] tracking-[0.4em] uppercase"
              style={{ color: ivory(0.5) }}
            >
              06
            </span>
            <span className="h-px w-6" style={{ background: ivory(0.25) }} />
            <p
              className="text-[10px] md:text-[11px] tracking-[0.3em] uppercase font-display"
              style={{ color: ivory(0.5) }}
            >, The Architecture.
            </p>
          </div>
        </Reveal>

        {/* Editorial masthead */}
        <div className="text-center mb-20 md:mb-28">
          <Reveal delay={0.1}>
            <p
              className="text-[10px] tracking-[0.45em] uppercase font-display mb-6"
              style={{ color: ivory(0.4) }}
            >
              One practice. Multiple systems.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="flex items-center justify-center gap-6 md:gap-10">
              <motion.span
                className="hidden md:block h-px"
                style={{ background: ivory(0.18), width: 80 }}
                initial={{ scaleX: reduce ? 1 : 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              />
              <h2
                className="font-display font-medium leading-[1.02] tracking-tight text-[clamp(2.25rem,6vw,5rem)]"
                style={{ color: ivory(0.95) }}
              >
                GN Performance <span style={{ color: ivory(0.55), fontStyle: "italic", fontWeight: 300 }}>Systems</span>
              </h2>
              <motion.span
                className="hidden md:block h-px"
                style={{ background: ivory(0.18), width: 80 }}
                initial={{ scaleX: reduce ? 1 : 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </Reveal>

          <Reveal delay={0.32}>
            <p
              className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto mt-8"
              style={{ color: ivory(0.62) }}
            >
              A practice built around football performance, structured across five
              connected layers. Some are already live. Others are being built quietly
              over the next decade.
            </p>
          </Reveal>
        </div>

        {/* Five pillars, editorial column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px"
             style={{ background: ivory(0.08) }}>
          {pillars.map((p, i) => {
            const inner = (
              <div
                className="h-full p-7 md:p-8 lg:p-7 xl:p-9 flex flex-col justify-between min-h-[260px] lg:min-h-[320px] transition-colors duration-700 group-hover:bg-[hsl(220_22%_10%/0.6)]"
                style={{ background: "hsl(220 22% 7%)" }}
              >
                <div>
                  <div className="flex items-baseline justify-between mb-5">
                    <span
                      className="font-display text-[11px] tracking-[0.4em]"
                      style={{ color: ivory(0.45) }}
                    >
                      {p.num}
                    </span>
                    <span
                      className="font-display text-[9px] tracking-[0.35em] uppercase"
                      style={{ color: ivory(statusOpacity[p.status]) }}
                    >
                      {p.status}
                    </span>
                  </div>
                  <h3
                    className="font-display text-xl md:text-2xl font-medium tracking-tight leading-tight"
                    style={{ color: ivory(0.95) }}
                  >
                    {p.title}
                  </h3>
                  <p
                    className="mt-4 text-sm md:text-[15px] leading-relaxed"
                    style={{ color: ivory(0.62) }}
                  >
                    {p.line}
                  </p>
                </div>
                <div className="mt-8 flex items-center justify-between">
                  <span
                    className="h-px w-8 transition-all duration-500 group-hover:w-14"
                    style={{ background: ivory(0.35) }}
                  />
                  {p.href && (
                    <span
                      className="font-display text-[10px] tracking-[0.3em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ color: ivory(0.6) }}
                    >
                      Enter →
                    </span>
                  )}
                </div>
              </div>
            );

            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group"
              >
                {p.href ? (
                  <Link to={p.href} className="block h-full focus:outline-none focus-visible:ring-1 focus-visible:ring-[hsl(var(--ivory)/0.4)]">
                    {inner}
                  </Link>
                ) : (
                  <div className="block h-full cursor-default">{inner}</div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Footnote */}
        <Reveal delay={0.2}>
          <p
            className="mt-14 md:mt-20 text-center text-[10px] tracking-[0.35em] uppercase font-display"
            style={{ color: ivory(0.35) }}
          >
            Est. Porto · Brussels, A long-horizon practice
          </p>
        </Reveal>
      </div>
    </Scene>
  );
};

export default SystemsArchitectureSection;