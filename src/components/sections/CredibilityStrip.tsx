import Reveal from "@/components/Reveal";

const environments = [
  "RSC Anderlecht",
  "Leça FC",
  "Run4Excellence",
  "FC Porto B/U19",
  "Gil Vicente FC",
  "USC Paredes",
];

const chips = [
  "Football Nutrition",
  "Athlete Education",
  "Matchday Fueling",
  "Monitoring",
  "Applied Systems",
];

const CredibilityStrip = () => {
  return (
    <section
      aria-label="Field experience"
      className="relative border-t border-b border-foreground/10 bg-foreground/[0.025] backdrop-blur-sm"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/15 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent"
      />
      <div className="relative mx-auto max-w-6xl px-6 py-14 md:py-20">
        <Reveal direction="up" duration={0.7}>
          <p className="text-[0.7rem] tracking-[0.32em] uppercase text-foreground/35 mb-6">
            Field Experience
          </p>
        </Reveal>

        <Reveal direction="up" delay={0.05} duration={0.7}>
          <p className="font-display text-xl md:text-2xl leading-relaxed text-foreground/80 max-w-3xl">
            Experience across elite academy, senior football and applied
            performance environments.
          </p>
        </Reveal>

        <Reveal direction="up" delay={0.1} duration={0.7}>
          <p className="mt-8 text-sm md:text-[0.95rem] text-foreground/55 leading-relaxed flex flex-wrap gap-x-3 gap-y-2">
            {environments.map((env, i) => (
              <span key={env} className="inline-flex items-center gap-3">
                <span>{env}</span>
                {i < environments.length - 1 && (
                  <span aria-hidden className="text-foreground/25">·</span>
                )}
              </span>
            ))}
          </p>
        </Reveal>

        <Reveal direction="up" delay={0.15} duration={0.7}>
          <ul className="mt-10 flex flex-wrap gap-x-2 gap-y-2">
            {chips.map((chip) => (
              <li
                key={chip}
                className="text-[0.68rem] tracking-[0.18em] uppercase text-foreground/50 border border-foreground/10 bg-foreground/[0.02] rounded-full px-3 py-1.5"
              >
                {chip}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
};

export default CredibilityStrip;