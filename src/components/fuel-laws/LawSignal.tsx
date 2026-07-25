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
        {/* athlete mid-stride, driving arms and legs in opposition */}
        <motion.g stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"
          initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, ease }}>
          <circle cx="170" cy="15" r="6" fill={c} stroke="none" />
          {/* torso, leaning forward into the run */}
          <path d="M167 21 L172 44" />
          {/* legs: front thigh driving up, back leg extended behind */}
          <path d="M172 44 L188 50 L193 68" />
          <path d="M172 44 L159 54 L150 66" />
          {/* arms: opposite drive to the legs */}
          <path d="M168 24 L181 27 L187 21" />
          <path d="M168 24 L156 30 L149 36" />
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

  // 03 - The 3 R's: labels sit clear outside each circle, recovery only in the centre
  if (number === "03") {
    const amber = "38 70% 55%";
    const rose = "5 62% 60%";
    const blue = "205 62% 58%";
    const r = 42;
    // centres pulled close so the triple overlap is wide enough to hold the word
    const circles = [
      { cx: 170, cy: 62, hue: amber, k: "Refuel", lx: 170, ly: 14, anchor: "middle" as const },
      { cx: 152, cy: 96, hue: rose, k: "Repair", lx: 78, ly: 130, anchor: "start" as const },
      { cx: 188, cy: 96, hue: blue, k: "Rehydrate", lx: 262, ly: 130, anchor: "end" as const },
    ];
    const gx = (170 + 152 + 188) / 3;
    const gy = (62 + 96 + 96) / 3;
    return (
      <svg viewBox={vb} style={frame} role="img" aria-label="Refuel, repair and rehydrate overlapping so that recovery sits where all three meet">
        {circles.map((o, i) => (
          <motion.circle key={o.k} cx={o.cx} cy={o.cy} r={r}
            fill={`hsl(${o.hue} / 0.14)`} stroke={`hsl(${o.hue} / 0.7)`} strokeWidth="1.2"
            initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }}
            style={{ transformOrigin: `${o.cx}px ${o.cy}px`, transformBox: "fill-box" }}
            transition={{ duration: 0.5, delay: 0.15 + i * 0.15, ease }} />
        ))}
        {circles.map((o, i) => (
          <motion.text key={o.k} x={o.lx} y={o.ly} textAnchor={o.anchor}
            style={{ fontSize: 9, letterSpacing: "0.1em", fontFamily: "var(--font-display)", textTransform: "uppercase", fill: `hsl(${o.hue})` }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 + i * 0.12 }}>
            {o.k}
          </motion.text>
        ))}
        {/* recovery, centred exactly on the triple overlap and small enough to fit inside it */}
        <motion.g initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
          style={{ transformOrigin: `${gx}px ${gy}px`, transformBox: "fill-box" }} transition={{ delay: 0.9, ease }}>
          <text x={gx} y={gy + 3} textAnchor="middle"
            style={{ fontSize: 8, letterSpacing: "0.1em", fontFamily: "var(--font-display)", textTransform: "uppercase", fontWeight: 600, fill: "hsl(var(--ivory))" }}>
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
    const icon = (kind: string, y: number) => {
      if (kind === "thermo")
        return (
          <g stroke={c} strokeWidth="1.4" fill="none" strokeLinecap="round">
            <line x1={ix} y1={y - 6} x2={ix} y2={y + 1} />
            <circle cx={ix} cy={y + 3} r="3" fill={c} stroke="none" />
          </g>
        );
      if (kind === "heart")
        return (
          <path d={`M${ix} ${y + 5} c -4 -4 -8 -1 -8 2 c 0 3 4 5 8 8 c 4 -3 8 -5 8 -8 c 0 -3 -4 -6 -8 -2 z`} fill={c} />
        );
      if (kind === "focus")
        return (
          <g stroke={c} strokeWidth="1.3" fill="none">
            <circle cx={ix} cy={y} r="6" />
            <circle cx={ix} cy={y} r="2.4" fill={c} stroke="none" />
          </g>
        );
      return (
        <path d={`M${ix + 3} ${y - 6} L${ix - 4} ${y + 2} L${ix} ${y + 2} L${ix - 2} ${y + 8} L${ix + 5} ${y - 1} L${ix + 1} ${y - 1} Z`} fill={c} />
      );
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
              <path d={`M324 ${row.y + 1} l -4 -5 l -4 5`} fill="none" stroke={c} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
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
