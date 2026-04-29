import { Link } from "react-router-dom";
import Reveal from "@/components/Reveal";

const InvitationSection = () => {
  return (
    <section className="section-padding py-32 md:py-40">
      <div className="max-content text-center">
        <Reveal>
          <p className="text-caption mb-6">Invitation</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-headline max-w-2xl mx-auto">
            Let's build performance environments<br className="hidden md:block" /> that hold under pressure.
          </h2>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="text-body-lg max-w-md mx-auto mt-5">
            Open to meaningful opportunities in performance, education and applied sport nutrition.
          </p>
        </Reveal>
        <Reveal delay={0.4}>
          <Link
            to="/contact"
            className="group inline-flex items-center justify-center mt-12 px-12 py-4 bg-foreground text-background font-display text-sm font-medium tracking-wide transition-all duration-500 hover:tracking-wider"
          >
            Start a Conversation
          </Link>
        </Reveal>
      </div>
    </section>
  );
};

export default InvitationSection;