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
        {/* performance graph: low baseline, then a climb to a high sustained plateau */}
        <line x1="178" y1="112" x2="324" y2="112" stroke={line} strokeDasharray="3 3" />
        <text x="178" y="126" style={{ ...micro(dim), fontSize: 7 }}>Baseline</text>
        <motion.path d="M178 108 L204 106 C 224 104, 230 60, 254 58 L 324 56 L 324 112 L 178 112 Z"
          fill={c22}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.7 }} />
        <motion.path d="M178 108 L204 106 C 224 104, 230 60, 254 58 L 324 56"
          fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.7, ease }} />
        {[266, 290, 314].map((x, i) => (
          <motion.circle key={x} cx={x} cy={57} r="2.4" fill={c}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 + i * 0.1 }} />
        ))}
        <text x="26" y="128" style={micro(dim)}>Fuelled</text>
        <text x="324" y="46" textAnchor="end" style={micro(c)}>High &amp; sustained</text>
      </svg>
    );
  }

  // 02 - Interlocking base blocks holding an athlete up
  if (number === "02") {
    const W = 66, T = 7, yT = 84, yB = 110, m1 = 94, m2 = 104;
    const base = [
      { x: 74, label: "Sleep" },
      { x: 140, label: "Nutrition" },
      { x: 206, label: "Hydration" },
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
        {/* athlete in a dynamic stride on top */}
        <motion.g stroke={c} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none"
          initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, ease }}>
          <circle cx="176" cy="14" r="6" fill={c} stroke="none" />
          <path d="M174 22 L166 40" />
          <path d="M166 40 L178 48 L188 44" />
          <path d="M166 40 L156 50 L150 60" />
          <path d="M171 28 L184 28" />
          <path d="M171 28 L160 36" />
        </motion.g>
        {/* platform the blocks lift */}
        <motion.rect x="70" y="72" width="212" height="7" rx="3" fill={c40}
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} style={{ transformOrigin: "center", transformBox: "fill-box" }}
          transition={{ duration: 0.5, delay: 0.7, ease }} />
        {/* three blocks that lock into one another, tab into notch */}
        {base.map((b, i) => (
          <motion.g key={b.label}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 + i * 0.16, ease }}>
            <path d={blockPath(b.x, i > 0, i < base.length - 1)}
              fill={c15} stroke={c60} strokeWidth="1.2" strokeLinejoin="round" />
            <text x={b.x + W / 2} y="101" textAnchor="middle" style={{ ...micro(c), fontSize: 7.5 }}>{b.label}</text>
          </motion.g>
        ))}
        <text x="170" y="136" textAnchor="middle" style={micro(dim)}>Blocks that lock in to hold the athlete</text>
      </svg>
    );
  }

  // 03 - The 3 R's, labels inside each lobe, recovery only in the centre overlap
  if (number === "03") {
    const amber = "38 70% 55%";
    const rose = "5 62% 60%";
    const blue = "205 62% 58%";
    const r = 47;
    const circles = [
      { cx: 170, cy: 64, hue: amber, k: "Refuel", sub: "carbs", lx: 170, ly: 40 },
      { cx: 145, cy: 104, hue: rose, k: "Repair", sub: "protein", lx: 116, ly: 120 },
      { cx: 195, cy: 104, hue: blue, k: "Rehydrate", sub: "fluids", lx: 224, ly: 120 },
    ];
    const gx = (170 + 145 + 195) / 3;
    const gy = (64 + 104 + 104) / 3;
    return (
      <svg viewBox={vb} style={frame} role="img" aria-label="Refuel, repair and rehydrate overlapping so that recovery sits where all three meet">
        {circles.map((o, i) => (
          <motion.circle key={o.k} cx={o.cx} cy={o.cy} r={r}
            fill={`hsl(${o.hue} / 0.15)`} stroke={`hsl(${o.hue} / 0.75)`}
            initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }}
            style={{ transformOrigin: `${o.cx}px ${o.cy}px`, transformBox: "fill-box" }}
            transition={{ duration: 0.5, delay: 0.15 + i * 0.15, ease }} />
        ))}
        {circles.map((o) => (
          <text key={o.k} x={o.lx} y={o.ly} textAnchor="middle">
            <tspan style={{ ...micro(`hsl(${o.hue})`), fontSize: 8.5 }}>{o.k}</tspan>
            <tspan x={o.lx} dy="10" style={{ fontSize: 7, fontFamily: "var(--font-body)", fontStyle: "italic", fill: dim, letterSpacing: "0.03em" }}>{o.sub}</tspan>
          </text>
        ))}
        {/* recovery, centred exactly on the triple overlap */}
        <motion.g initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
          style={{ transformOrigin: `${gx}px ${gy}px`, transformBox: "fill-box" }} transition={{ delay: 0.85, ease }}>
          <text x={gx} y={gy + 3} textAnchor="middle" style={{ ...micro("hsl(var(--ivory))"), fontSize: 8 }}>Recover</text>
        </motion.g>
      </svg>
    );
  }

  // 04 - Hydration as the input that keeps both mind and body running high
  if (number === "04") {
    const rows = [
      { y: 60, label: "Focus", icon: "brain" },
      { y: 96, label: "Physical", icon: "bolt" },
    ];
    return (
      <svg viewBox={vb} style={frame} role="img" aria-label="Hydration keeping both cognitive focus and physical output running high">
        {/* droplet, the input */}
        <motion.path d="M74 40 C 98 72, 108 86, 108 102 A 34 34 0 1 1 40 102 C 40 86, 50 72, 74 40 Z"
          fill={c15} stroke={c}
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }} />
        <motion.path d="M60 96 a 13 13 0 0 0 9 15" fill="none" stroke="hsl(var(--ivory) / 0.45)" strokeWidth="1.5" strokeLinecap="round"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} />
        {/* two outputs it powers, both held high */}
        {rows.map((row, i) => (
          <g key={row.label}>
            {/* connector from droplet */}
            <motion.path d={`M108 100 C 132 100, 140 ${row.y + 8} 160 ${row.y + 8}`} fill="none" stroke={c40} strokeDasharray="3 3"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.5 + i * 0.15 }} />
            {/* icon */}
            {row.icon === "brain" ? (
              <g fill="none" stroke={c} strokeWidth="1.4">
                <circle cx="171" cy={row.y + 4} r="8" />
                <circle cx="171" cy={row.y + 4} r="3.4" />
                <circle cx="171" cy={row.y + 4} r="0.6" fill={c} stroke="none" />
              </g>
            ) : (
              <path d={`M174 ${row.y - 5} L166 ${row.y + 8} L173 ${row.y + 8} L169 ${row.y + 18} L182 ${row.y + 3} L174 ${row.y + 3} Z`} fill={c} />
            )}
            <text x="190" y={row.y + 2} style={{ ...micro(c), fontSize: 8 }}>{row.label}</text>
            {/* level bar held high */}
            <rect x="190" y={row.y + 8} width="122" height="7" rx="3.5" fill="hsl(var(--ivory) / 0.06)" />
            <motion.rect x="190" y={row.y + 8} height="7" rx="3.5" fill={c}
              initial={{ width: 0 }} animate={{ width: 110 }} transition={{ duration: 0.9, delay: 0.7 + i * 0.15, ease }} />
          </g>
        ))}
        <text x="74" y="150" textAnchor="middle" style={micro(dim)}>Hydrated</text>
        <text x="312" y="150" textAnchor="end" style={micro(c)}>Running high</text>
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
