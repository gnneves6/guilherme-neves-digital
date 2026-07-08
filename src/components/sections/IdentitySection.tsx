import { Link } from "react-router-dom";
import Reveal from "@/components/Reveal";
import PortraitPlaceholder from "@/components/PortraitPlaceholder";

const IdentitySection = () => {
  return (
    <section className="section-padding section-spacing">
      <div className="max-content">
        <div className="grid md:grid-cols-[1fr,320px] lg:grid-cols-[1fr,380px] gap-12 md:gap-20 items-center">
          <div>
            <Reveal>
              <p className="text-caption mb-6">Presence</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-headline max-w-3xl">
                Athlete by nature.<br />Nutritionist by purpose.
              </h2>
            </Reveal>
            <Reveal delay={0.25}>
              <p className="text-body-lg max-w-2xl mt-6">
                Before I studied performance, I lived sport from the inside.
                That shapes how I build nutrition systems: practical, clear,
                human and designed for real environments.
              </p>
            </Reveal>
            <Reveal delay={0.35}>
              <p className="text-body text-sm max-w-2xl mt-5 opacity-70">
                Final-year BSc Nutrition Sciences student at FCNAUP, with a
                recently completed curricular internship in Performance
                Nutrition at RSC Anderlecht.
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              <Link
                to="/about"
                className="inline-block mt-8 text-body text-sm link-underline hover:text-foreground transition-colors"
              >
                Read the practice →
              </Link>
            </Reveal>
          </div>
          <Reveal delay={0.3} direction="right">
            {/* data-portrait so the real image can be swapped easily later */}
            <div className="relative group" data-portrait>
              <PortraitPlaceholder caption="Porto — Brussels" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default IdentitySection;