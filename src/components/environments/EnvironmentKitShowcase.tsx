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
      className="absolute pointer-events-none"
      style={{
        // Expand the render area far beyond the column so 3D objects
        // (pedestal disc, floor glow, side kits) never reach a hard
        // rectangular canvas edge. Then feather the visible area into
        // the surrounding dark room with a soft elliptical mask.
        top: "-60%",
        bottom: "-60%",
        left: "-50%",
        right: "-50%",
        overflow: "visible",
        WebkitMaskImage:
          "radial-gradient(ellipse 45% 50% at 50% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.92) 40%, rgba(0,0,0,0.55) 65%, rgba(0,0,0,0.18) 82%, rgba(0,0,0,0) 96%)",
        maskImage:
          "radial-gradient(ellipse 45% 50% at 50% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.92) 40%, rgba(0,0,0,0.55) 65%, rgba(0,0,0,0.18) 82%, rgba(0,0,0,0) 96%)",
      }}
    >
      <Environment3DShowcase kits={kits} activeIndex={activeIndex} />
    </div>
  );
};

export default EnvironmentKitShowcase;