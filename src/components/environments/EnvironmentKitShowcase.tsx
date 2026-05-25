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
      className="absolute -inset-x-24 -inset-y-16 pointer-events-none"
      style={{
        // Dissolve the canvas rectangle into the surrounding room.
        // Mask fades to fully transparent well before the canvas edge so
        // the rectangular boundary is no longer perceptible.
        WebkitMaskImage:
          "radial-gradient(ellipse 58% 64% at 50% 52%, rgba(0,0,0,1) 28%, rgba(0,0,0,0.9) 48%, rgba(0,0,0,0.45) 68%, rgba(0,0,0,0) 88%)",
        maskImage:
          "radial-gradient(ellipse 58% 64% at 50% 52%, rgba(0,0,0,1) 28%, rgba(0,0,0,0.9) 48%, rgba(0,0,0,0.45) 68%, rgba(0,0,0,0) 88%)",
      }}
    >
      <Environment3DShowcase kits={kits} activeIndex={activeIndex} />
    </div>
  );
};

export default EnvironmentKitShowcase;