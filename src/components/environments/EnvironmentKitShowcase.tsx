import Environment3DShowcase from "./Environment3DShowcase";

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
    <div
      className="absolute -inset-x-[40%] -inset-y-32 pointer-events-none"
      style={{
        // Dissolve the canvas rectangle into the surrounding room — the
        // falloff is wide and gradual so side kits fully fade into the
        // atmosphere instead of being clipped by a visible edge.
        WebkitMaskImage:
          "radial-gradient(ellipse 85% 90% at 50% 50%, #000 55%, rgba(0,0,0,0.7) 75%, rgba(0,0,0,0) 100%)",
        maskImage:
          "radial-gradient(ellipse 85% 90% at 50% 50%, #000 55%, rgba(0,0,0,0.7) 75%, rgba(0,0,0,0) 100%)",
      }}
    >
      <Environment3DShowcase kits={kits} activeIndex={activeIndex} />
    </div>
  );
};

export default EnvironmentKitShowcase;