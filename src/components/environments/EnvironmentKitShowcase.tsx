import Environment3DShowcase from "./Environment3DShowcase";
import BackgroundKitGhosts from "./BackgroundKitGhosts";

export interface ShowcaseKit {
  id: string;
  name: string;
  image: string;
  primary: string;
  secondary: string;
  accent?: string;
}

interface Props {
  kits: ShowcaseKit[];
  activeIndex: number;
}

/**
 * EnvironmentKitShowcase — wrapper around the WebGL Environment3DShowcase.
 * The active kit floats forward on a dark pedestal; siblings recede into
 * depth. All rendering happens in WebGL with transparent kit textures.
 */
const EnvironmentKitShowcase = ({ kits, activeIndex }: Props) => {
  return (
    <>
      {/* Atmospheric ghosts — prev/next kits as full silhouettes behind text */}
      <BackgroundKitGhosts kits={kits} activeIndex={activeIndex} />
      <div
      className="absolute -inset-x-24 -inset-y-16 pointer-events-none"
      style={{
        // Dissolve the canvas rectangle into the surrounding room.
        WebkitMaskImage:
          "radial-gradient(ellipse 62% 70% at 50% 52%, rgba(0,0,0,1) 35%, rgba(0,0,0,0.85) 55%, rgba(0,0,0,0.4) 78%, rgba(0,0,0,0) 100%)",
        maskImage:
          "radial-gradient(ellipse 62% 70% at 50% 52%, rgba(0,0,0,1) 35%, rgba(0,0,0,0.85) 55%, rgba(0,0,0,0.4) 78%, rgba(0,0,0,0) 100%)",
      }}
    >
      <Environment3DShowcase kits={kits} activeIndex={activeIndex} />
      </div>
    </>
  );
};

export default EnvironmentKitShowcase;