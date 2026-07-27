import { motion } from "framer-motion";

/**
 * LawSignal, a small animated "instrument" that represents each Fuel Law as a
 * metaphor, not a technical chart. One diagram per law, drawn on mount (when
 * the law expands), tinted with the law's accent colour. Inline SVG so it
 * scales, stays light and animates. Schematic only, no real athlete data.
 */

interface Props {
  number: string;
  color: string;
}

const ease = [0.25, 0.1, 0.25, 1] as const;

const micro = (fill: string) => ({
  fontSize: 8,
  letterSpacing: "0.16em",
  fontFamily: "var(--font-display)",
  textTransform: "uppercase" as const,
  fill,
});

const LawSignal = ({ number, color }: Props) => {
  const c = `hsl(${color})`;
  const c60 = `hsl(${color} / 0.6)`;
  const c40 = `hsl(${color} / 0.4)`;
  const c22 = `hsl(${color} / 0.22)`;
  const c15 = `hsl(${color} / 0.15)`;
  const dim = "hsl(var(--ivory) / 0.4)";
  const line = "hsl(var(--ivory) / 0.12)";

  const frame = { width: "100%", height: "auto" } as const;
  const vb = "0 0 340 160";

  // 01 - Charged battery driving performance to a high, sustained plateau
  if (number === "01") {
    const cells = [0, 1, 2, 3];
    return (
      <svg viewBox={vb} style={frame} role="img" aria-label="A charged battery driving performance to a high, sustained level">
        {/* battery */}
        <rect x="24" y="58" width="128" height="50" rx="9" fill="none" stroke={line} />
        <rect x="152" y="74" width="9" height="18" rx="2" fill={c40} />
        {cells.map((i) => (
          <motion.rect key={i} x={32 + i * 29} y="66" width="23" height="34" rx="4"
            fill={c15} stroke={c40}
            initial={{ opacity: 0, scaleY: 0.3 }} animate={{ opacity: 1, scaleY: 1 }}
            style={{ transformOrigin: "center bottom", transformBox: "fill-box" }}
            transition={{ duration: 0.4, delay: 0.12 + i * 0.12, ease }} />
        ))}
        <motion.path d="M92 64 L80 88 L90 88 L84 106 L102 80 L92 80 Z" fill={c}
          initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}
          style={{ transformOrigin: "91px 85px", transformBox: "fill-box" }} transition={{ delay: 0.6, ease }} />
        {/* performance graph: low baseline, then a climb to a flat, high plateau */}
        <line x1="178" y1="112" x2="324" y2="112" stroke={line} strokeDasharray="3 3" />
        <text x="178" y="126" style={{ ...micro(dim), fontSize: 7 }}>Baseline</text>
        <motion.path d="M178 109 C 208 108, 226 52, 258 52 L 324 52 L 324 112 L 178 112 Z"
          fill={c22}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.7 }} />
        <motion.path d="M178 109 C 208 108, 226 52, 258 52 L 324 52"
          fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.7, ease }} />
        {/* markers sit exactly on the flat plateau (y = 52) */}
        {[274, 296, 318].map((x, i) => (
          <motion.circle key={x} cx={x} cy={52} r="2.6" fill={c} stroke="hsl(220 26% 9%)" strokeWidth="1"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 + i * 0.1 }} />
        ))}
        <text x="26" y="128" style={micro(dim)}>Fuelled</text>
        <text x="324" y="42" textAnchor="end" style={micro(c)}>High &amp; sustained</text>
      </svg>
    );
  }

  // 02 - Interlocking base blocks holding an athlete up
  if (number === "02") {
    const W = 82, T = 8, yT = 84, yB = 110, m1 = 93, m2 = 103;
    const base = [
      { x: 47, label: "Sleep" },
      { x: 129, label: "Nutrition" },
      { x: 211, label: "Hydration" },
    ];
    const blockPath = (x: number, hasNotch: boolean, hasTab: boolean) => {
      const right = hasTab
        ? `V ${m1} H ${x + W + T} V ${m2} H ${x + W} V ${yB}`
        : `V ${yB}`;
      const left = hasNotch
        ? `V ${m2} H ${x + T} V ${m1} H ${x} V ${yT}`
        : `V ${yT}`;
      return `M ${x} ${yT} H ${x + W} ${right} H ${x} ${left} Z`;
    };
    return (
      <svg viewBox={vb} style={frame} role="img" aria-label="Interlocking daily habits of sleep, nutrition and hydration holding the athlete up">
        {/* athlete running: clean filled silhouette (Material directions_run) + speed lines */}
        <motion.g initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, ease }}>
          <g stroke={c} strokeWidth="3" strokeLinecap="round">
            <line x1="118" y1="34" x2="142" y2="34" />
            <line x1="112" y1="44" x2="136" y2="44" />
            <line x1="118" y1="54" x2="142" y2="54" />
          </g>
          <g transform="translate(146 9.5) scale(2.9)" fill={c}>
            <path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z" />
          </g>
        </motion.g>
        {/* platform the blocks lift */}
        <motion.rect x="45" y="72" width="254" height="7" rx="3" fill={c40}
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} style={{ transformOrigin: "center", transformBox: "fill-box" }}
          transition={{ duration: 0.5, delay: 0.7, ease }} />
        {/* three blocks that lock into one another, tab into notch */}
        {base.map((b, i) => (
          <motion.g key={b.label}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 + i * 0.16, ease }}>
            <path d={blockPath(b.x, i > 0, i < base.length - 1)}
              fill={c15} stroke={c60} strokeWidth="1.2" strokeLinejoin="round" />
            <text x={b.x + W / 2} y="100" textAnchor="middle"
              style={{ fontSize: 7.5, letterSpacing: "0.05em", fontFamily: "var(--font-display)", textTransform: "uppercase", fill: c }}>
              {b.label}
            </text>
          </motion.g>
        ))}
        <text x="170" y="136" textAnchor="middle" style={micro(dim)}>Blocks that lock in to hold the athlete</text>
      </svg>
    );
  }

  // 03 - The 3 R's: big circles, each word inside its own clear zone, recover in the centre
  if (number === "03") {
    const rings = [
      { cx: 180, cy: 96, hue: "38 70% 55%", lab: "38 70% 63%", k: "Refuel", lx: 180, ly: 60, fs: 11, ls: 0.09 },
      { cx: 130, cy: 162, hue: "5 62% 60%", lab: "5 62% 67%", k: "Repair", lx: 100, ly: 198, fs: 11, ls: 0.09 },
      { cx: 230, cy: 162, hue: "205 62% 58%", lab: "205 62% 68%", k: "Rehydrate", lx: 264, ly: 198, fs: 11, ls: 0.04 },
    ];
    const gx = 180, gy = 140;
    return (
      <svg viewBox="0 0 360 264" style={frame} role="img" aria-label="Refuel, repair and rehydrate overlapping so that recovery sits where all three meet">
        {rings.map((o, i) => (
          <motion.circle key={o.k} cx={o.cx} cy={o.cy} r={90}
            fill={`hsl(${o.hue} / 0.15)`} stroke={`hsl(${o.hue} / 0.8)`} strokeWidth="1.3"
            initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }}
            style={{ transformOrigin: `${o.cx}px ${o.cy}px`, transformBox: "fill-box" }}
            transition={{ duration: 0.5, delay: 0.15 + i * 0.15, ease }} />
        ))}
        {rings.map((o, i) => (
          <motion.text key={o.k} x={o.lx} y={o.ly} textAnchor="middle"
            style={{ fontSize: o.fs, letterSpacing: `${o.ls}em`, fontFamily: "var(--font-display)", textTransform: "uppercase", fontWeight: 600, fill: `hsl(${o.lab})` }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 + i * 0.12 }}>
            {o.k}
          </motion.text>
        ))}
        {/* recover, centred exactly on the triple overlap */}
        <motion.g initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}
          style={{ transformOrigin: `${gx}px ${gy}px`, transformBox: "fill-box" }} transition={{ delay: 0.9, ease }}>
          <text x={gx} y={gy + 3.5} textAnchor="middle"
            style={{ fontSize: 11, letterSpacing: "0.12em", fontFamily: "var(--font-display)", textTransform: "uppercase", fontWeight: 700, fill: "hsl(var(--ivory))" }}>
            Recover
          </text>
        </motion.g>
      </svg>
    );
  }

  // 04 - Hydration as the one input the whole system runs on (evidence-backed)
  if (number === "04") {
    const cx = 66, cy = 84; // droplet centre of mass
    const rows = [
      { y: 30, label: "Temperature control", icon: "thermo" },
      { y: 62, label: "Blood & oxygen flow", icon: "heart" },
      { y: 94, label: "Focus & reaction", icon: "focus" },
      { y: 126, label: "Power & endurance", icon: "bolt" },
    ];
    const ix = 150; // icon centre x
    const tx = 164; // label start x
    // every icon is drawn centred on the origin, then translated to (ix, y),
    // so all four share the exact same anchor point on the row.
    const icon = (kind: string, y: number) => {
      let glyph;
      if (kind === "thermo")
        glyph = (
          <>
            <line x1={0} y1={-6} x2={0} y2={1} stroke={c} strokeWidth="1.6" strokeLinecap="round" />
            <circle cx={0} cy={3.5} r="2.8" fill={c} />
          </>
        );
      else if (kind === "heart")
        glyph = <path d="M0 5 C -6 -1 -4.5 -6.5 0 -2.5 C 4.5 -6.5 6 -1 0 5 Z" fill={c} />;
      else if (kind === "focus")
        glyph = (
          <>
            <circle cx={0} cy={0} r="6" fill="none" stroke={c} strokeWidth="1.4" />
            <circle cx={0} cy={0} r="2.4" fill={c} />
          </>
        );
      else
        glyph = <path d="M1.5 -6 L -3.5 1 L -0.5 1 L -2 6 L 4 -1.5 L 1 -1.5 Z" fill={c} />;
      return <g transform={`translate(${ix} ${y})`}>{glyph}</g>;
    };
    return (
      <svg viewBox={vb} style={frame} role="img" aria-label="Correct hydration supporting temperature control, blood and oxygen flow, focus and reaction, power and endurance">
        {/* the droplet: one input */}
        <motion.path d="M66 34 C 88 64, 98 78, 98 94 A 32 32 0 1 1 34 94 C 34 78, 44 64, 66 34 Z"
          fill={c15} stroke={c}
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }} />
        <motion.path d="M52 90 a 12 12 0 0 0 8 14" fill="none" stroke="hsl(var(--ivory) / 0.45)" strokeWidth="1.5" strokeLinecap="round"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} />
        <text x={cx} y="150" textAnchor="middle" style={{ ...micro(c), fontSize: 8.5 }}>Hydration</text>

        {/* four systems it drives */}
        {rows.map((row, i) => (
          <g key={row.label}>
            <motion.path d={`M98 ${cy} C 120 ${cy}, 126 ${row.y} 142 ${row.y}`} fill="none" stroke={c40}
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.4 + i * 0.12 }} />
            <motion.g initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.55 + i * 0.12, ease }}>
              {icon(row.icon, row.y)}
              <text x={tx} y={row.y + 3}
                style={{ fontSize: 8.5, letterSpacing: "0.02em", fontFamily: "var(--font-display)", fill: "hsl(var(--ivory) / 0.86)" }}>
                {row.label}
              </text>
              {/* small upward tick = lifted by hydration */}
              <path d={`M312 ${row.y + 1} l -4 -5 l -4 5`} fill="none" stroke={c} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </motion.g>
          </g>
        ))}
      </svg>
    );
  }

  // 05 - Rehearse then race: training reps proven before game day
  return (
    <svg viewBox={vb} style={frame} role="img" aria-label="Strategies rehearsed across training days before being trusted on game day">
      <line x1="30" y1="80" x2="316" y2="80" stroke={line} />
      {[0, 1, 2, 3].map((i) => {
        const x = 52 + i * 44;
        return (
          <g key={i}>
            <motion.circle cx={x} cy="80" r="12" fill="none" stroke={c40}
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.15 + i * 0.13, ease }} />
            <motion.path d={`M ${x - 5} 80 l 3.5 4.5 l 7 -9`} fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.32 + i * 0.13 }} />
          </g>
        );
      })}
      <text x="52" y="110" style={micro(dim)}>Rehearsed in training</text>
      <motion.line x1="246" y1="80" x2="278" y2="80" stroke={c40}
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.75 }} />
      <motion.g initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        style={{ transformOrigin: "302px 80px", transformBox: "fill-box" }} transition={{ delay: 0.85, ease }}>
        <circle cx="302" cy="80" r="17" fill={c15} stroke={c} />
        <path d="M296 71 v18 M296 72 h10 l-2.5 3.5 l2.5 3.5 h-10" fill="none" stroke={c} strokeWidth="1.4" strokeLinejoin="round" />
      </motion.g>
      <text x="302" y="114" textAnchor="middle" style={{ ...micro(c), fontSize: 7.5 }}>Game day</text>
    </svg>
  );
};

export default LawSignal;
