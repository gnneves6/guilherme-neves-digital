import { Link } from "react-router-dom";
import Scene from "@/components/journey/Scene";
import ParallaxLayer from "@/components/journey/ParallaxLayer";
import TitleCard from "@/components/journey/TitleCard";
import Spotlight from "@/components/journey/Spotlight";
import Magnetic from "@/components/motion/Magnetic";
import sceneExit from "@/assets/scene-invitation-exit.jpg";

const SceneExit = ({ index = 5 }: { index?: number }) => {
  return (
    <Scene
      index={index}
      bgImage={sceneExit}
      bgFilter="brightness(0.95) contrast(0.95) saturate(0.7)"
      tone="hsl(var(--background))"
      overlay="radial-gradient(ellipse 100% 80% at 50% 50%, hsl(var(--background) / 0.78) 0%, hsl(var(--background) / 0.94) 100%)"
      zoomFrom={1.06}
      zoomTo={0.96}
    >
      <Spotlight color="hsl(var(--olive) / 0.10)" size={720} follow={20} />
      <div className="absolute inset-0 grid place-items-center section-padding">
        <ParallaxLayer strength={-6} className="max-content text-center">
          <TitleCard number="06" label="Invitation" tone="light" className="justify-center mb-6 mx-auto inline-flex" />
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight max-w-3xl mx-auto text-foreground">
            If you are building a performance environment<br className="hidden md:block" /> where clarity matters, let's talk.
          </h2>
          <p className="text-base md:text-lg max-w-xl mx-auto mt-5 opacity-75">
            For clubs, academies, athletes and performance environments where clarity matters.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-12">
            <Magnetic strength={10} as="span">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-10 py-4 bg-foreground text-background font-display text-sm font-medium tracking-wide transition-all duration-500 hover:tracking-wider"
              >
                Start a Conversation
              </Link>
            </Magnetic>
            <Magnetic strength={10} as="span">
              <Link
                to="/work"
                className="inline-flex items-center justify-center px-10 py-4 border border-border/60 font-display text-sm font-medium tracking-wide hover:border-foreground/40 transition-all duration-500 hover:tracking-wider"
              >
                View Resource Vault
              </Link>
            </Magnetic>
            <Magnetic strength={10} as="span">
              <Link
                to="/work#fuelops-ai"
                className="inline-flex items-center justify-center px-10 py-4 border border-border/60 font-display text-sm font-medium tracking-wide hover:border-foreground/40 transition-all duration-500 hover:tracking-wider"
              >
                Join FuelOps Early Access
              </Link>
            </Magnetic>
          </div>
        </ParallaxLayer>
      </div>
    </Scene>
  );
};

export default SceneExit;
