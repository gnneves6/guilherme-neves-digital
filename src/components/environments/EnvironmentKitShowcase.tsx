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
      className="absolute -inset-x-48 -inset-y-40 pointer-events-none"
      style={{
        zIndex: 0,
        // Dissolve the canvas rectangle into the surrounding room — the
        // scene must fade into pure darkness well before any visible edge,
        // so there is no implied rectangular crop in the upper/lateral
        // areas of the showcase.
        WebkitMaskImage:
          "radial-gradient(ellipse 55% 60% at 50% 54%, rgba(0,0,0,1) 22%, rgba(0,0,0,0.78) 46%, rgba(0,0,0,0.32) 68%, rgba(0,0,0,0.08) 86%, rgba(0,0,0,0) 100%)",
        maskImage:
          "radial-gradient(ellipse 55% 60% at 50% 54%, rgba(0,0,0,1) 22%, rgba(0,0,0,0.78) 46%, rgba(0,0,0,0.32) 68%, rgba(0,0,0,0.08) 86%, rgba(0,0,0,0) 100%)",
      }}
    >
      <Environment3DShowcase kits={kits} activeIndex={activeIndex} />
    </div>
  );
};

export default EnvironmentKitShowcase;