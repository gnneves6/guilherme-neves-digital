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
  const c15 = `hsl(${color} / 0.15)`;
  const dim = "hsl(var(--ivory) / 0.4)";
  const line = "hsl(var(--ivory) / 0.12)";

  const frame = { width: "100%", height: "auto" } as const;
  const vb = "0 0 340 150";

  // 01 — Charged battery sustaining output: full tank powers the burn
  if (number === "01") {
    const cells = [0, 1, 2, 3];
    return (
      <svg viewBox={vb} style={frame} role="img" aria-label="A charged battery sustaining performance output">
        {/* battery body */}
        <rect x="30" y="52" width="150" height="52" rx="9" fill="none" stroke={line} />
        <rect x="180" y="68" width="9" height="20" rx="2" fill={c40} />
        {/* charge cells filling up */}
        {cells.map((i) => (
          <motion.rect
            key={i} x={39 + i * 34} y="60" width="27" height="36" rx="4"
            fill={c15} stroke={c40}
            initial={{ opacity: 0, scaleY: 0.3 }} animate={{ opacity: 1, scaleY: 1 }}
            style={{ transformOrigin: "center bottom", transformBox: "fill-box" }}
            transition={{ duration: 0.4, delay: 0.15 + i * 0.13, ease }}
          />
        ))}
        {/* bolt */}
        <motion.path d="M108 58 L96 82 L106 82 L100 100 L118 74 L108 74 Z" fill={c}
          initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}
          style={{ transformOrigin: "107px 79px", transformBox: "fill-box" }}
          transition={{ delay: 0.7, ease }} />
        {/* output it sustains — a line held high */}
        <motion.path d="M200 88 C 224 88, 236 60, 262 60 C 288 60, 300 64, 320 62" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.7, ease }} />
        <motion.circle cx="320" cy="62" r="2.6" fill={c} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} />
        <text x="30" y="124" style={micro(dim)}>Fuelled</text>
        <text x="320" y="124" textAnchor="end" style={micro(c)}>Output sustained</text>
      </svg>
    );
  }

  // 02 — Foundation pyramid: daily habits hold the athlete up
  if (number === "02") {
    const base = [
      { x: 46, label: "Sleep" },
      { x: 138, label: "Nutrition" },
      { x: 230, label: "Hydration" },
    ];
    return (
      <svg viewBox={vb} style={frame} role="img" aria-label="Daily habits of sleep, nutrition and hydration forming the base that holds the athlete up">
        {/* athlete on top */}
        <motion.g initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, ease }}>
          <circle cx="170" cy="22" r="7" fill={c} />
          <path d="M170 30 L170 46 M170 34 L156 40 M170 34 L184 40 M170 46 L160 60 M170 46 L180 60" stroke={c} strokeWidth="2" strokeLinecap="round" fill="none" />
        </motion.g>
        {/* platform the base supports */}
        <motion.rect x="70" y="66" width="200" height="9" rx="3" fill={c40}
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} style={{ transformOrigin: "center", transformBox: "fill-box" }}
          transition={{ duration: 0.5, delay: 0.7, ease }} />
        {/* three load-bearing base blocks */}
        {base.map((b, i) => (
          <motion.g key={b.label}
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 + i * 0.16, ease }}>
            <rect x={b.x} y="84" width="64" height="34" rx="5" fill={c15} stroke={c40} />
            <text x={b.x + 32} y="104" textAnchor="middle" style={{ ...micro(c), fontSize: 7.5 }}>{b.label}</text>
          </motion.g>
        ))}
        {/* support ticks from blocks to platform */}
        {[102, 170, 262].map((x, i) => (
          <motion.line key={i} x1={x} y1="84" x2={x} y2="75" stroke={c60}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 + i * 0.1 }} />
        ))}
        <text x="46" y="136" style={micro(dim)}>Break one, the rest is compromised</text>
      </svg>
    );
  }

  // 03 — The 3 R's converging on recovery (no false time window)
  if (number === "03") {
    const amber = "38 70% 55%";
    const rose = "5 60% 58%";
    const blue = "205 60% 56%";
    const circles = [
      { cx: 170, cy: 56, hue: amber, k: "Refuel", sub: "carbs", lx: 170, ly: 30 },
      { cx: 140, cy: 96, hue: rose, k: "Repair", sub: "protein", lx: 74, ly: 128 },
      { cx: 200, cy: 96, hue: blue, k: "Rehydrate", sub: "fluids", lx: 266, ly: 128 },
    ];
    return (
      <svg viewBox={vb} style={frame} role="img" aria-label="Refuel, repair and rehydrate overlapping to drive recovery">
        {circles.map((o, i) => (
          <motion.circle key={o.k} cx={o.cx} cy={o.cy} r="42"
            fill={`hsl(${o.hue} / 0.16)`} stroke={`hsl(${o.hue} / 0.7)`}
            initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }}
            style={{ transformOrigin: `${o.cx}px ${o.cy}px`, transformBox: "fill-box" }}
            transition={{ duration: 0.5, delay: 0.15 + i * 0.15, ease }} />
        ))}
        {circles.map((o) => (
          <text key={o.k} x={o.lx} y={o.ly} textAnchor="middle">
            <tspan style={{ ...micro(`hsl(${o.hue})`), fontSize: 9 }}>{o.k}</tspan>
            <tspan x={o.lx} dy="11" style={{ fontSize: 7.5, fontFamily: "var(--font-body)", fontStyle: "italic", fill: dim, letterSpacing: "0.04em" }}>{o.sub}</tspan>
          </text>
        ))}
        <motion.g initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}
          style={{ transformOrigin: "170px 82px", transformBox: "fill-box" }} transition={{ delay: 0.8, ease }}>
          <circle cx="170" cy="82" r="17" fill="hsl(var(--ivory) / 0.06)" />
          <text x="170" y="85" textAnchor="middle" style={{ ...micro("hsl(var(--ivory))"), fontSize: 7.5 }}>Recover</text>
        </motion.g>
      </svg>
    );
  }

  // 04 — Hydration as coolant: keeps the system out of the overheat zone
  if (number === "04") {
    // gauge arc from 150° (left) to 30° (right); needle points into the cool zone
    const cx = 232, cy = 100, r = 46;
    const pol = (ang: number, rad: number) => [cx + rad * Math.cos((ang * Math.PI) / 180), cy - rad * Math.sin((ang * Math.PI) / 180)];
    const arc = (a0: number, a1: number) => {
      const [x0, y0] = pol(a0, r); const [x1, y1] = pol(a1, r);
      return `M ${x0} ${y0} A ${r} ${r} 0 0 0 ${x1} ${y1}`;
    };
    const [nx, ny] = pol(120, r - 10); // needle into the cool zone
    return (
      <svg viewBox={vb} style={frame} role="img" aria-label="Hydration keeping the athlete's system in the cool, optimal zone and out of overheating">
        {/* droplet, the coolant */}
        <motion.path d="M70 44 C 92 72, 100 84, 100 98 A 30 30 0 1 1 40 98 C 40 84, 48 72, 70 44 Z"
          fill={c15} stroke={c}
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }} />
        <motion.path d="M58 92 a 12 12 0 0 0 8 14" fill="none" stroke="hsl(var(--ivory) / 0.5)" strokeWidth="1.4" strokeLinecap="round"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} />
        {/* connective flow to the gauge */}
        <motion.line x1="102" y1="98" x2="150" y2="98" stroke={c40} strokeDasharray="3 3"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.5 }} />
        {/* gauge: cool zone (colour) + overheat zone (red) */}
        <path d={arc(150, 90)} fill="none" stroke={c} strokeWidth="5" strokeLinecap="round" />
        <path d={arc(90, 30)} fill="none" stroke="hsl(5 60% 55% / 0.5)" strokeWidth="5" strokeLinecap="round" />
        {/* needle held in the cool zone */}
        <motion.line x1={cx} y1={cy} x2={nx} y2={ny} stroke="hsl(var(--ivory))" strokeWidth="2" strokeLinecap="round"
          initial={{ rotate: 40 }} animate={{ rotate: 0 }} style={{ transformOrigin: `${cx}px ${cy}px`, transformBox: "fill-box" }}
          transition={{ duration: 0.9, delay: 0.6, ease }} />
        <circle cx={cx} cy={cy} r="3.5" fill="hsl(var(--ivory))" />
        <text x="188" y="118" style={{ ...micro(c), fontSize: 7.5 }}>Cool</text>
        <text x="276" y="118" textAnchor="end" style={{ ...micro("hsl(5 55% 60%)"), fontSize: 7.5 }}>Overheat</text>
        <text x="70" y="140" textAnchor="middle" style={micro(dim)}>Hydrated</text>
      </svg>
    );
  }

  // 05 — Rehearse then race: training reps proven before game day
  return (
    <svg viewBox={vb} style={frame} role="img" aria-label="Strategies rehearsed across training days before being trusted on game day">
      <line x1="30" y1="76" x2="316" y2="76" stroke={line} />
      {[0, 1, 2, 3].map((i) => {
        const x = 52 + i * 44;
        return (
          <g key={i}>
            <motion.circle cx={x} cy="76" r="12" fill="none" stroke={c40}
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.15 + i * 0.13, ease }} />
            <motion.path d={`M ${x - 5} 76 l 3.5 4.5 l 7 -9`} fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.32 + i * 0.13 }} />
          </g>
        );
      })}
      <text x="52" y="106" style={micro(dim)}>Rehearsed in training</text>
      <motion.line x1="246" y1="76" x2="278" y2="76" stroke={c40}
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.75 }} />
      <motion.g initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        style={{ transformOrigin: "302px 76px", transformBox: "fill-box" }} transition={{ delay: 0.85, ease }}>
        <circle cx="302" cy="76" r="17" fill={c15} stroke={c} />
        <path d="M296 67 v18 M296 68 h10 l-2.5 3.5 l2.5 3.5 h-10" fill="none" stroke={c} strokeWidth="1.4" strokeLinejoin="round" />
      </motion.g>
      <text x="302" y="110" textAnchor="middle" style={{ ...micro(c), fontSize: 7.5 }}>Game day</text>
    </svg>
  );
};

export default LawSignal;
