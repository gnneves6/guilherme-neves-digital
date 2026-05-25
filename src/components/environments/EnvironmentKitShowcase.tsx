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
    <div className="absolute inset-0">
      <Environment3DShowcase kits={kits} activeIndex={activeIndex} />
    </div>
  );
};

export default EnvironmentKitShowcase;