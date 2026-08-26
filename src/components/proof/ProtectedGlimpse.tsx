/**
 * What protected work looks like through frosted glass.
 *
 * A photograph of the real document cannot be shown: it belongs to a club, and
 * the numbers on it belong to named players. A generic blurred rectangle,
 * though, tells the reader nothing and reads as a paywall.
 *
 * So each of these draws the *shape* of the tool and nothing else. A monitoring
 * sheet is a grid of cells with a frozen first column. A longitudinal
 * assessment is a handful of lines descending over time. An operations review
 * is a status ring and a run of ticks. No real values, no invented ones either,
 * because a made-up number on a page about real work would be the one dishonest
 * thing on it. Blurred hard on top, so it registers as a kind of document
 * rather than as information.
 *
 * The aim is the feeling of walking past a screen in an office: you know
 * exactly what someone is working on, and you could not repeat a single figure.
 */
type Kind = "spreadsheet" | "longitudinal" | "operations" | "matchday" | "hydration";

const ivory = (a: number) => `hsl(var(--ivory) / ${a})`;

const Spreadsheet = () => {
  const rows = Array.from({ length: 9 });
  const cols = Array.from({ length: 7 });
  return (
    <g>
      <rect x="0" y="0" width="300" height="14" fill={ivory(0.14)} />
      {rows.map((_, r) => (
        <g key={r}>
          <rect x="0" y={18 + r * 18} width="54" height="14" fill={ivory(r % 2 ? 0.1 : 0.14)} />
          {cols.map((__, c) => (
            <rect
              key={c}
              x={58 + c * 35}
              y={18 + r * 18}
              width="31"
              height="14"
              fill={ivory(0.05 + ((r + c) % 4) * 0.022)}
            />
          ))}
        </g>
      ))}
    </g>
  );
};

const Longitudinal = () => {
  // Four players, each trending down and then settling. Drawn as paths with no
  // axis labels, so the shape of "measured repeatedly over months" survives and
  // nothing readable does.
  const series = [
    { d: "M8 30 C 60 34, 110 52, 170 60 S 250 68, 292 66", c: "hsl(var(--olive-light))" },
    { d: "M8 48 C 60 50, 110 62, 170 74 S 250 82, 292 80", c: "hsl(40, 55%, 60%)" },
    { d: "M8 66 C 60 62, 110 78, 170 88 S 250 92, 292 94", c: "hsl(var(--ivory) / 0.55)" },
    { d: "M8 84 C 60 90, 110 96, 170 104 S 250 108, 292 110", c: "hsl(200, 30%, 60%)" },
  ];
  return (
    <g>
      {[0, 1, 2, 3, 4].map((i) => (
        <line key={i} x1="0" y1={22 + i * 24} x2="300" y2={22 + i * 24} stroke={ivory(0.08)} strokeWidth="1" />
      ))}
      {series.map((s) => (
        <path key={s.d} d={s.d} fill="none" stroke={s.c} strokeWidth="2.5" strokeLinecap="round" />
      ))}
      {series.map((s, i) => (
        <circle key={i} cx="292" cy={[66, 80, 94, 110][i]} r="3.5" fill={s.c} />
      ))}
    </g>
  );
};

const Operations = () => (
  <g>
    <circle cx="58" cy="62" r="30" fill="none" stroke={ivory(0.12)} strokeWidth="8" />
    <circle
      cx="58"
      cy="62"
      r="30"
      fill="none"
      stroke="hsl(var(--olive-light))"
      strokeWidth="8"
      strokeDasharray="170 190"
      transform="rotate(-90 58 62)"
      strokeLinecap="round"
    />
    {Array.from({ length: 7 }).map((_, i) => (
      <g key={i}>
        <rect x="112" y={20 + i * 15} width="120" height="8" rx="1" fill={ivory(0.09)} />
        <path
          d={`M244 ${25 + i * 15} l4 4 l7 -8`}
          fill="none"
          stroke="hsl(var(--olive-light))"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
    ))}
  </g>
);

const Matchday = () => (
  <g>
    <line x1="24" y1="18" x2="24" y2="112" stroke={ivory(0.14)} strokeWidth="2" />
    {[0, 1, 2, 3, 4, 5].map((i) => {
      const y = 24 + i * 17;
      const isKick = i === 3;
      return (
        <g key={i}>
          <circle
            cx="24"
            cy={y}
            r={isKick ? 6 : 4}
            fill={isKick ? "hsl(40, 65%, 58%)" : ivory(0.3)}
          />
          <rect x="42" y={y - 4} width={isKick ? 96 : 70 + (i % 3) * 22} height="8" rx="1" fill={ivory(isKick ? 0.22 : 0.1)} />
          <rect x={200 + (i % 2) * 14} y={y - 4} width="46" height="8" rx="4" fill={ivory(0.08)} />
        </g>
      );
    })}
  </g>
);

const Hydration = () => (
  <g>
    {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
      const h = 24 + ((i * 37) % 62);
      return (
        <rect
          key={i}
          x={22 + i * 34}
          y={112 - h}
          width="20"
          height={h}
          rx="2"
          fill={i % 3 === 1 ? "hsl(200, 42%, 55%)" : ivory(0.16)}
        />
      );
    })}
    <line x1="10" y1="66" x2="292" y2="66" stroke="hsl(var(--olive-light))" strokeWidth="1.5" strokeDasharray="4 5" />
  </g>
);

const shapes: Record<Kind, () => JSX.Element> = {
  spreadsheet: Spreadsheet,
  longitudinal: Longitudinal,
  operations: Operations,
  matchday: Matchday,
  hydration: Hydration,
};

const ProtectedGlimpse = ({ kind, blur = 2.6 }: { kind: Kind; blur?: number }) => {
  const Shape = shapes[kind] ?? Spreadsheet;
  return (
    <div className="absolute inset-0" aria-hidden>
      <svg
        viewBox="0 0 300 130"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
        style={{ filter: `blur(${blur}px)`, opacity: 0.92 }}
      >
        <Shape />
      </svg>
    </div>
  );
};

export type { Kind as GlimpseKind };
export default ProtectedGlimpse;
