import { motion } from "framer-motion";

/**
 * LawSignal, a minimal animated "instrument" that represents each Fuel Law
 * visually. One diagram per law, drawn on mount (i.e. when the law expands),
 * tinted with the law's accent colour. Built as inline SVG so it scales
 * cleanly, stays light, and animates. No real athlete data, schematic only.
 */

interface Props {
  number: string;
  color: string;
}

const ease = [0.25, 0.1, 0.25, 1] as const;

const micro = (fill: string) => ({
  fontSize: 8,
  letterSpacing: "0.18em",
  fontFamily: "var(--font-display)",
  textTransform: "uppercase" as const,
  fill,
});

const LawSignal = ({ number, color }: Props) => {
  const c = `hsl(${color})`;
  const c40 = `hsl(${color} / 0.4)`;
  const c15 = `hsl(${color} / 0.15)`;
  const ivory = "hsl(var(--ivory))";
  const dim = "hsl(var(--ivory) / 0.35)";
  const line = "hsl(var(--ivory) / 0.12)";

  const frame = { width: "100%", height: "auto" } as const;
  const vb = "0 0 340 128";

  // 01, Fuel meets demand: fuel bars rising to match a training-load line
  if (number === "01") {
    const load = [34, 58, 44, 72, 50, 82, 40];
    return (
      <svg viewBox={vb} style={frame} role="img" aria-label="Fuel intake matched to training load across a week">
        <line x1="24" y1="104" x2="316" y2="104" stroke={line} />
        {load.map((h, i) => {
          const x = 34 + i * 42;
          return (
            <motion.rect
              key={i}
              x={x} width="20" rx="2"
              y={104 - h} height={h}
              fill={c15} stroke={c40}
              initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
              style={{ transformOrigin: "center bottom", transformBox: "fill-box" }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.06, ease }}
            />
          );
        })}
        <motion.polyline
          fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round"
          points={load.map((h, i) => `${34 + i * 42 + 10},${104 - h - 8}`).join(" ")}
          initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease }}
        />
        {load.map((h, i) => (
          <motion.circle key={i} cx={34 + i * 42 + 10} cy={104 - h - 8} r="2.4" fill={c}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 + i * 0.06 }} />
        ))}
        <text x="24" y="120" style={micro(dim)}>Intake</text>
        <text x="316" y="120" textAnchor="end" style={micro(c)}>Load</text>
      </svg>
    );
  }

  // 02, Build the base: a week of consistent habit bars on a foundation
  if (number === "02") {
    const days = ["M", "T", "W", "T", "F", "S", "S"];
    return (
      <svg viewBox={vb} style={frame} role="img" aria-label="Consistent daily habits building a resilient weekly base">
        <motion.rect x="24" y="92" width="292" height="6" rx="3" fill={c15}
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} style={{ transformOrigin: "left center", transformBox: "fill-box" }}
          transition={{ duration: 0.7, ease }} />
        {days.map((d, i) => {
          const x = 34 + i * 42;
          const h = 44 + (i % 2 === 0 ? 8 : 0);
          return (
            <g key={i}>
              <motion.rect x={x} width="20" rx="2" y={92 - h} height={h}
                fill={c15} stroke={c40}
                initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
                style={{ transformOrigin: "center bottom", transformBox: "fill-box" }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.08, ease }} />
              <motion.rect x={x} width="20" rx="2" y={92 - 6} height="6" fill={c}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 + i * 0.08 }} />
              <text x={x + 10} y="118" textAnchor="middle" style={micro(dim)}>{d}</text>
            </g>
          );
        })}
      </svg>
    );
  }

  // 03, Recovery window: post-session timeline with a highlighted window
  if (number === "03") {
    const marks = [
      { x: 60, label: "Protein" },
      { x: 120, label: "Carbs" },
      { x: 180, label: "Fluid" },
    ];
    return (
      <svg viewBox={vb} style={frame} role="img" aria-label="Post-session recovery window for protein, carbohydrate and fluid">
        <motion.rect x="40" y="48" width="160" height="30" rx="6" fill={c15}
          initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }}
          style={{ transformOrigin: "left center", transformBox: "fill-box" }}
          transition={{ duration: 0.6, ease }} />
        <line x1="40" y1="63" x2="300" y2="63" stroke={line} />
        {["0h", "1h", "2h", "3h", "4h"].map((t, i) => (
          <g key={t}>
            <line x1={40 + i * 65} y1="60" x2={40 + i * 65} y2="66" stroke={dim} />
            <text x={40 + i * 65} y="90" textAnchor="middle" style={micro(dim)}>{t}</text>
          </g>
        ))}
        {marks.map((m, i) => (
          <g key={m.label}>
            <motion.circle cx={m.x} cy="63" r="4.5" fill={c}
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4 + i * 0.12, ease }} />
            <motion.text x={m.x} y="40" textAnchor="middle" style={micro(c)}
              initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.12 }}>
              {m.label}
            </motion.text>
          </g>
        ))}
        <text x="40" y="112" style={micro(c)}>Recovery window</text>
      </svg>
    );
  }

  // 04, Hydration: a level column sitting inside the optimal band
  if (number === "04") {
    return (
      <svg viewBox={vb} style={frame} role="img" aria-label="Structured hydration held within the optimal range">
        <rect x="150" y="20" width="40" height="88" rx="8" fill="none" stroke={line} />
        <motion.rect x="158" y="36" width="24" height="14" rx="3" fill={c40}
          initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 0.2 }} />
        <motion.rect x="154" width="32" rx="5" fill={c15} stroke={c}
          initial={{ height: 0, y: 104 }} animate={{ height: 54, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2, ease }} />
        <line x1="120" y1="43" x2="150" y2="43" stroke={dim} strokeDasharray="2 2" />
        <line x1="120" y1="57" x2="150" y2="57" stroke={dim} strokeDasharray="2 2" />
        <text x="116" y="46" textAnchor="end" style={micro(c)}>Optimal</text>
        {/* body-weight monitoring line to the right */}
        <motion.polyline fill="none" stroke={c} strokeWidth="1.4" strokeLinecap="round"
          points="206,74 232,68 258,72 284,64 310,68"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.6, ease }} />
        <text x="206" y="98" style={micro(dim)}>Monitor · body weight</text>
      </svg>
    );
  }

  // 05, Rehearse then race: training reps leading into a match marker
  return (
    <svg viewBox={vb} style={frame} role="img" aria-label="Strategies rehearsed in training before being used on game day">
      <line x1="24" y1="64" x2="316" y2="64" stroke={line} />
      {[0, 1, 2, 3].map((i) => {
        const x = 44 + i * 46;
        return (
          <g key={i}>
            <motion.circle cx={x} cy="64" r="11" fill="none" stroke={c40}
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.15 + i * 0.12, ease }} />
            <motion.path d={`M ${x - 4} 64 l 3 4 l 6 -8`} fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.3 + i * 0.12 }} />
          </g>
        );
      })}
      <text x="44" y="92" style={micro(dim)}>Rehearsed in training</text>
      {/* arrow into match */}
      <motion.line x1="232" y1="64" x2="264" y2="64" stroke={dim}
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.7 }} />
      <motion.g initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        style={{ transformOrigin: "288px 64px", transformBox: "fill-box" }}
        transition={{ delay: 0.8, ease }}>
        <circle cx="288" cy="64" r="16" fill={c15} stroke={c} />
        <path d="M283 56 v16 M283 57 h9 l-2 3 l2 3 h-9" fill="none" stroke={c} strokeWidth="1.3" strokeLinejoin="round" />
      </motion.g>
      <text x="288" y="96" textAnchor="middle" style={micro(c)}>Game day</text>
    </svg>
  );
};

export default LawSignal;
