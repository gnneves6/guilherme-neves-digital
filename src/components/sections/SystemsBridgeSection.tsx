import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import Scene from "@/components/motion/Scene";

const ivory = (a: number) => `hsl(var(--ivory) / ${a})`;

/**
 * 04.5, Systems Bridge.
 * Narrative transition between Applied Work (proof objects) and The Method.
 * Connects individual projects to organisational consulting (Services).
 */
const SystemsBridgeSection = () => {
  return (
    <Scene
      tone="cinematic"
      spacing="lg"
      overlayGradient="linear-gradient(180deg, hsl(var(--cinematic)) 0%, hsl(220 22% 9% / 0.97) 50%, hsl(var(--cinematic)) 100%)"
      fadeTopFrom="hsl(var(--cinematic))"
      fadeBottomTo="hsl(var(--cinematic))"
      contentClassName="section-padding"
    >
      <div className="max-content relative">
        <div className="grid lg:grid-cols-[0.9fr,1.1fr] gap-12 lg:gap-20 items-start">
          {/* Left, chapter mark + headline */}
          <div>
            <Reveal>
              <div className="flex items-center gap-3 mb-6">
                <span
                  className="font-display text-[10px] md:text-[11px] tracking-[0.4em] uppercase"
                  style={{ color: ivory(0.5) }}
                >
                  04.5
                </span>
                <span className="h-px w-6" style={{ background: ivory(0.25) }} />
                <p
                  className="text-[10px] md:text-[11px] tracking-[0.3em] uppercase font-display"
                  style={{ color: ivory(0.5) }}
                >, From Projects to Systems.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h2
                className="font-display text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.08] tracking-tight max-w-xl"
                style={{ color: ivory(0.95) }}
              >
                Turning applied work into <br className="hidden md:block" />
                <span style={{ color: ivory(0.6) }}>organisational systems.</span>
              </h2>
            </Reveal>
          </div>

          {/* Right, paragraph + CTA */}
          <div className="lg:pt-6">
            <Reveal delay={0.18}>
              <p
                className="text-base md:text-lg leading-relaxed max-w-xl"
                style={{ color: ivory(0.72) }}
              >
                The projects above are not isolated deliverables. They reflect a
                broader philosophy, turning performance nutrition into practical
                systems that organisations can actually implement, sustain and
                own.
              </p>
            </Reveal>

            <Reveal delay={0.28}>
              <p
                className="text-sm md:text-base leading-relaxed max-w-xl mt-5"
                style={{ color: ivory(0.55) }}
              >
                Consulting engagements take that same philosophy and apply it at
                the scale of a department, a club or a federation.
              </p>
            </Reveal>

            <Reveal delay={0.38}>
              <div className="mt-10 flex flex-col sm:flex-row gap-6 sm:items-center">
                <Link
                  to="/services"
                  className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-sm transition-all duration-500"
                  style={{
                    border: `1px solid ${ivory(0.25)}`,
                    color: ivory(0.95),
                    background: ivory(0.02),
                  }}
                >
                  <span className="font-display text-sm tracking-[0.18em] uppercase">
                    Explore Consulting Engagements
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-500 group-hover:translate-x-1" />
                </Link>
                <span
                  className="text-[10px] tracking-[0.3em] uppercase font-display"
                  style={{ color: ivory(0.4) }}
                >
                  Three flagship engagements
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </Scene>
  );
};

export default SystemsBridgeSection;