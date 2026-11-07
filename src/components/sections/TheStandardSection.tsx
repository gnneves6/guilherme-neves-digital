import Reveal from "@/components/Reveal";
import Scene from "@/components/motion/Scene";

const principles = [
  { k: "I", t: "No account managers.", d: "The person who diagnoses the environment is the person who builds the system." },
  { k: "II", t: "No handoffs.", d: "Nothing is delegated, diluted or passed down a chain. The work carries one signature." },
  { k: "III", t: "No competing work.", d: "Engagements are chosen by what they build for the craft — never by what merely pays." },
];

const TheStandardSection = () => {
  return (
    <Scene tone="light" spacing="lg" parallax={0.06} contentClassName="section-padding">
      <div className="max-content">
        <Reveal>
          <div className="flex items-center gap-3 mb-6">
            <span
              className="font-display text-[10px] md:text-[11px] tracking-[0.4em] uppercase"
              style={{ color: "hsl(var(--olive))" }}
            >
              07
            </span>
            <span className="h-px w-6" style={{ background: "hsl(var(--olive) / 0.45)" }} />
            <p className="text-[10px] md:text-[11px] tracking-[0.3em] uppercase font-display opacity-60">
              — The Standard.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="text-headline max-w-3xl">
            One person. One standard. <span className="italic font-light opacity-70">No mask.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-body-lg max-w-2xl mt-6">
            GN Performance Systems is deliberately a practice of one. Not a company
            performing scale — a principal who answers personally for every system
            that carries his name.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <blockquote className="mt-12 md:mt-16 max-w-3xl border-l pl-6 md:pl-10" style={{ borderColor: "hsl(var(--olive) / 0.4)" }}>
            <p className="font-display text-2xl md:text-4xl font-light leading-snug tracking-tight text-foreground">
              “The work is the credential. <span className="italic opacity-60">Everything else is decoration.”</span>
            </p>
          </blockquote>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-10 md:gap-12 mt-14 md:mt-20 max-w-4xl">
          {principles.map((p, i) => (
            <Reveal key={p.k} delay={0.15 + i * 0.1}>
              <div className="pt-5 border-t border-border/60">
                <p className="text-caption text-[10px] mb-3">{p.k}</p>
                <p className="font-display text-base md:text-lg font-medium text-foreground mb-2">{p.t}</p>
                <p className="text-body text-sm">{p.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Scene>
  );
};

export default TheStandardSection;
