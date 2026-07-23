import { motion } from "framer-motion";

export type KitVariant = "plain" | "hoops";
export type KitSymbol = "dots" | "four" | "crest" | "none";

interface KitTorsoProps {
  primary: string;
  secondary: string;
  accent?: string;
  variant?: KitVariant;
  symbol?: KitSymbol;
  /** 0..1, lower for background kits */
  clarity?: number;
}

/**
 * KitTorso, stylized SVG jersey on an abstract collar form. Pure
 * presentational, no brand assets. Used inside the EnvironmentKitShowcase
 * to represent each environment as a floating display object.
 */
const KitTorso = ({
  primary,
  secondary,
  accent,
  variant = "plain",
  symbol = "none",
  clarity = 1,
}: KitTorsoProps) => {
  const stroke = secondary;
  const opacityBoost = 0.6 + clarity * 0.4;

  return (
    <svg
      viewBox="0 0 220 260"
      className="w-full h-full"
      style={{ filter: `saturate(${0.7 + clarity * 0.3}) brightness(${0.85 + clarity * 0.15})` }}
      aria-hidden
    >
      <defs>
        <linearGradient id={`kit-shade-${primary.replace("#", "")}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.08" />
          <stop offset="55%" stopColor="#000000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.35" />
        </linearGradient>
        <clipPath id={`kit-clip-${primary.replace("#", "")}`}>
          <path d="M50 60 L80 38 Q110 56 140 38 L170 60 L200 90 L180 110 L168 100 L168 230 Q110 244 52 230 L52 100 L40 110 L20 90 Z" />
        </clipPath>
      </defs>

      {/* Soft drop shadow under jersey */}
      <ellipse cx="110" cy="248" rx="78" ry="6" fill="#000" opacity={0.35 * clarity} />

      {/* Neck void */}
      <ellipse cx="110" cy="40" rx="22" ry="14" fill="#0a0a0c" opacity={0.9} />

      {/* Jersey body */}
      <g opacity={opacityBoost}>
        <path
          d="M50 60 L80 38 Q110 56 140 38 L170 60 L200 90 L180 110 L168 100 L168 230 Q110 244 52 230 L52 100 L40 110 L20 90 Z"
          fill={primary}
        />

        {/* Hoops variant */}
        {variant === "hoops" && (
          <g clipPath={`url(#kit-clip-${primary.replace("#", "")})`}>
            {[78, 122, 166, 210].map((y) => (
              <rect key={y} x="0" y={y} width="220" height="22" fill={secondary} />
            ))}
          </g>
        )}

        {/* Collar */}
        <path
          d="M88 44 Q110 60 132 44 L128 52 Q110 64 92 52 Z"
          fill={secondary}
          opacity={0.85}
        />

        {/* Cuff trim */}
        <path d="M22 92 L40 110 L36 116 L18 98 Z" fill={secondary} opacity={0.6} />
        <path d="M198 92 L180 110 L184 116 L202 98 Z" fill={secondary} opacity={0.6} />

        {/* Shading overlay */}
        <path
          d="M50 60 L80 38 Q110 56 140 38 L170 60 L200 90 L180 110 L168 100 L168 230 Q110 244 52 230 L52 100 L40 110 L20 90 Z"
          fill={`url(#kit-shade-${primary.replace("#", "")})`}
        />

        {/* Symbol, abstract, never real club assets */}
        {symbol === "four" && (
          <text
            x="110"
            y="160"
            textAnchor="middle"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
            fontWeight={700}
            fontSize="46"
            fill={secondary}
            opacity={0.95}
          >
            4
          </text>
        )}
        {symbol === "dots" && accent && (
          <g fill={accent} opacity={0.9}>
            <circle cx="96" cy="96" r="3" />
            <circle cx="110" cy="90" r="3" />
            <circle cx="124" cy="96" r="3" />
          </g>
        )}
        {symbol === "crest" && accent && (
          <g opacity={0.85}>
            <path
              d="M138 92 L150 92 L150 108 Q144 116 138 108 Z"
              fill={accent}
              opacity={0.75}
            />
          </g>
        )}
      </g>

      {/* Subtle highlight on shoulder */}
      <path
        d="M64 60 Q90 50 110 56"
        stroke={stroke}
        strokeOpacity={0.12 * clarity}
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
};

export default KitTorso;