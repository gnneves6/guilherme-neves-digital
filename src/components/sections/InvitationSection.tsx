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
          <h2 className="text-headline max-w-3xl mx-auto">
            If you are building a performance environment<br className="hidden md:block" /> where clarity matters, let's talk.
          </h2>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="text-body-lg max-w-lg mx-auto mt-5">
            Open to clubs, academies, performance staff and collaborators building
            environments where applied nutrition matters.
          </p>
        </Reveal>
        <Reveal delay={0.4}>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-12">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-10 py-4 bg-foreground text-background font-display text-sm font-medium tracking-wide transition-all duration-500 hover:tracking-wider"
            >
              Start a Conversation
            </Link>
            <Link
              to="/work"
              className="inline-flex items-center justify-center px-10 py-4 border border-border/60 font-display text-sm font-medium tracking-wide hover:border-foreground/40 transition-all duration-500 hover:tracking-wider"
            >
              View Resource Vault
            </Link>
            <Link
              to="/work#fuelops-ai"
              className="inline-flex items-center justify-center px-10 py-4 border border-border/60 font-display text-sm font-medium tracking-wide hover:border-foreground/40 transition-all duration-500 hover:tracking-wider"
            >
              Join FuelOps Early Access
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default InvitationSection;