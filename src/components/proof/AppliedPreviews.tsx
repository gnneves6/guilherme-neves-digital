import { Lock } from "lucide-react";
import type { AppliedPreviewKind } from "@/data/artefacts";

/**
 * Per-object preview compositions for the "Selected Applied Work" section.
 * Pure CSS/SVG mockups — no fake athlete data, no real club logos.
 * Tuned for a dark cinematic archive, ivory/olive/gold accents.
 */

const ivory = (a: number) => `hsl(var(--ivory) / ${a})`;
const olive = (a: number) => `hsl(var(--olive-light) / ${a})`;
const accent = (a: number) => `hsl(var(--accent) / ${a})`;

const StageFrame = ({ children }: { children: React.ReactNode }) => (
  <div
    className="absolute inset-0 overflow-hidden"
    style={{
      background:
        "radial-gradient(ellipse 90% 70% at 70% 40%, hsl(220 18% 14% / 0.9), hsl(220 22% 7% / 0.95))",
    }}
  >
    {/* hairline frame */}
    <div className="absolute inset-2 border" style={{ borderColor: ivory(0.04) }} />
    {children}
    {/* vignette */}
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          "radial-gradient(ellipse 90% 70% at 50% 55%, transparent 30%, hsl(220 22% 5% / 0.6))",
      }}
    />
  </div>
);

/* 01 — Matchday Fuel: planner card + layered MD-1 / timeline sheets */
const MatchdayFuel = () => (
  <StageFrame>
    {/* digital planner */}
    <div
      className="absolute left-[6%] top-[14%] w-[46%] aspect-[5/6] rounded-sm overflow-hidden shadow-[0_20px_50px_-15px_hsl(0_0%_0%/0.8)]"
      style={{
        background: "linear-gradient(180deg, hsl(220 22% 11%), hsl(220 22% 8%))",
        border: `1px solid ${ivory(0.07)}`,
      }}
    >
      <div className="flex items-center gap-1.5 px-3 py-2 border-b" style={{ borderColor: ivory(0.06) }}>
        <span className="w-3 h-3 rounded-sm flex items-center justify-center text-[7px] font-display" style={{ background: olive(0.4), color: ivory(0.9) }}>GN</span>
        <span className="text-[7px] tracking-[0.2em] uppercase font-display" style={{ color: ivory(0.7) }}>Matchday Fuel</span>
      </div>
      <div className="px-3 py-2.5 space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-[6px] tracking-[0.2em] uppercase font-display" style={{ color: ivory(0.4) }}>Kick-off 17:00</span>
          <span className="text-[6px] px-1 rounded-sm" style={{ background: olive(0.25), color: ivory(0.7) }}>Carb focus</span>
        </div>
        {[
          ["09:00", "Breakfast"],
          ["13:00", "Pre-match meal"],
          ["15:30", "Pre-game snack"],
          ["17:00", "Kick-off"],
          ["18:00", "Half-time"],
          ["19:00", "Post-game recovery"],
        ].map(([t, l]) => (
          <div key={t} className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full" style={{ background: olive(0.7) }} />
            <span className="text-[6px] font-display tracking-wide" style={{ color: ivory(0.55) }}>{t}</span>
            <span className="text-[6px]" style={{ color: ivory(0.4) }}>{l}</span>
          </div>
        ))}
      </div>
    </div>

    {/* MD-1 sheet */}
    <div
      className="absolute right-[18%] top-[22%] w-[28%] aspect-[3/4] shadow-[0_20px_40px_-12px_hsl(0_0%_0%/0.75)]"
      style={{
        background: "hsl(38 22% 88%)",
        transform: "rotate(-4deg)",
      }}
    >
      <div className="p-2 space-y-1">
        <span className="block text-[6px] tracking-[0.25em] uppercase font-display" style={{ color: "hsl(220 15% 25% / 0.85)" }}>MD-1 Plan</span>
        <div className="h-px w-1/2" style={{ background: "hsl(220 15% 25% / 0.35)" }} />
        <span className="block text-[6px] font-display" style={{ color: "hsl(220 15% 25% / 0.6)" }}>Glycogen loading</span>
        <span className="block text-[6px]" style={{ color: "hsl(220 15% 25% / 0.85)" }}>6–8 g CHO/kg</span>
        <div className="pt-1 space-y-0.5">
          <div className="h-px w-full" style={{ background: "hsl(220 15% 25% / 0.15)" }} />
          <div className="h-px w-5/6" style={{ background: "hsl(220 15% 25% / 0.15)" }} />
          <div className="h-px w-3/4" style={{ background: "hsl(220 15% 25% / 0.15)" }} />
        </div>
      </div>
    </div>

    {/* timeline sheet behind */}
    <div
      className="absolute right-[6%] top-[34%] w-[26%] aspect-[3/4] shadow-[0_20px_40px_-12px_hsl(0_0%_0%/0.7)]"
      style={{
        background: "hsl(38 22% 92%)",
        transform: "rotate(5deg)",
      }}
    >
      <div className="p-2 space-y-1">
        <span className="block text-[6px] tracking-[0.25em] uppercase font-display" style={{ color: "hsl(220 15% 25% / 0.8)" }}>Matchday Timeline</span>
        <div className="h-px w-2/3" style={{ background: "hsl(220 15% 25% / 0.35)" }} />
        {["Pre-game snack", "Kick-off", "Half-time", "Post-game"].map((l) => (
          <div key={l} className="flex items-center gap-1">
            <span className="w-1 h-1 rounded-full" style={{ background: "hsl(155 18% 30%)" }} />
            <span className="text-[6px]" style={{ color: "hsl(220 15% 25% / 0.65)" }}>{l}</span>
          </div>
        ))}
      </div>
    </div>
  </StageFrame>
);

/* 02 — Hydration & Sweat Testing: dashboard + protocol page */
const HydrationDashboard = () => (
  <StageFrame>
    <div
      className="absolute left-[6%] top-[12%] w-[58%] aspect-[5/3] rounded-sm overflow-hidden shadow-[0_20px_50px_-15px_hsl(0_0%_0%/0.8)]"
      style={{
        background: "linear-gradient(180deg, hsl(220 22% 11%), hsl(220 22% 8%))",
        border: `1px solid ${ivory(0.07)}`,
      }}
    >
      <div className="flex items-center gap-1.5 px-3 py-2 border-b" style={{ borderColor: ivory(0.06) }}>
        <span className="w-3 h-3 rounded-sm flex items-center justify-center text-[7px] font-display" style={{ background: accent(0.5), color: ivory(0.95) }}>GN</span>
        <div className="flex flex-col leading-none">
          <span className="text-[7px] tracking-[0.2em] uppercase font-display" style={{ color: ivory(0.8) }}>Hydration Ops</span>
          <span className="text-[6px] font-display" style={{ color: ivory(0.4) }}>Dashboard</span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-1.5 px-3 py-2">
        {[
          ["Avg sweat rate", "0.5 L/h"],
          ["Sodium loss", "100 mmol/L"],
          ["Tests / week", "3"],
        ].map(([k, v]) => (
          <div key={k} className="p-1.5" style={{ background: ivory(0.03), border: `1px solid ${ivory(0.05)}` }}>
            <span className="block text-[5px] tracking-[0.2em] uppercase font-display" style={{ color: ivory(0.4) }}>{k}</span>
            <span className="block text-[8px] font-display mt-0.5" style={{ color: ivory(0.9) }}>{v}</span>
          </div>
        ))}
      </div>
      <div className="px-3 pb-2 flex gap-2">
        <div className="w-1/3 space-y-1">
          <span className="text-[5px] tracking-[0.2em] uppercase font-display" style={{ color: ivory(0.4) }}>Athlete</span>
          <div className="h-1 w-full rounded-sm" style={{ background: ivory(0.08) }} />
          <div className="h-1 w-3/4 rounded-sm" style={{ background: ivory(0.05) }} />
          <div className="h-1 w-2/3 rounded-sm" style={{ background: ivory(0.05) }} />
        </div>
        <div className="flex-1 relative h-12">
          <svg viewBox="0 0 100 40" className="w-full h-full" preserveAspectRatio="none">
            <polyline
              fill="none"
              stroke={accent(0.8).replace("hsl(", "hsl(")}
              strokeWidth="0.8"
              points="0,30 14,24 28,28 42,16 56,20 70,10 84,14 100,6"
            />
            <polyline
              fill="none"
              stroke={ivory(0.1).replace("hsl(", "hsl(")}
              strokeWidth="0.3"
              points="0,40 100,40"
            />
          </svg>
        </div>
      </div>
    </div>

    {/* protocol sheet */}
    <div
      className="absolute right-[6%] top-[18%] w-[32%] aspect-[3/4] shadow-[0_20px_40px_-12px_hsl(0_0%_0%/0.75)]"
      style={{
        background: "hsl(38 22% 90%)",
        transform: "rotate(3deg)",
      }}
    >
      <div className="p-2 space-y-1">
        <span className="block text-[6px] tracking-[0.25em] uppercase font-display font-medium" style={{ color: "hsl(220 15% 20%)" }}>
          Sweat Testing Protocol
        </span>
        <div className="h-px w-full" style={{ background: "hsl(220 15% 25% / 0.25)" }} />
        {["Purpose", "Procedure", "Calculations", "Interpretation"].map((s) => (
          <div key={s} className="space-y-0.5">
            <span className="block text-[6px] font-display" style={{ color: "hsl(220 15% 25% / 0.85)" }}>{s}</span>
            <div className="h-px w-full" style={{ background: "hsl(220 15% 25% / 0.12)" }} />
            <div className="h-px w-5/6" style={{ background: "hsl(220 15% 25% / 0.12)" }} />
          </div>
        ))}
      </div>
    </div>
  </StageFrame>
);

/* 03 — Body Composition: redacted report */
const RedactedReport = () => (
  <StageFrame>
    <div
      className="absolute inset-x-[10%] inset-y-[14%] rounded-sm overflow-hidden"
      style={{
        background: "linear-gradient(180deg, hsl(220 22% 11%), hsl(220 22% 8%))",
        border: `1px solid ${ivory(0.07)}`,
      }}
    >
      <div className="px-3 py-2 border-b flex items-center justify-between" style={{ borderColor: ivory(0.06) }}>
        <span className="text-[6px] tracking-[0.25em] uppercase font-display" style={{ color: ivory(0.55) }}>Team Report — Redacted</span>
        <Lock className="w-2.5 h-2.5" style={{ color: ivory(0.4) }} />
      </div>
      <div className="px-3 py-2 space-y-1.5">
        <span className="text-[6px] tracking-[0.2em] uppercase font-display" style={{ color: ivory(0.4) }}>Summary</span>
        <div className="flex items-end gap-1 h-8">
          {[5, 8, 4, 9, 6, 7, 5, 8].map((h, i) => (
            <div key={i} className="flex-1 rounded-sm" style={{ height: `${h * 9}%`, background: olive(0.5) }} />
          ))}
        </div>
        <div className="space-y-0.5 pt-1">
          <span className="text-[6px] tracking-[0.2em] uppercase font-display" style={{ color: ivory(0.4) }}>Individual Overview</span>
          {[1, 2, 3, 4].map((r) => (
            <div key={r} className="flex gap-1.5 items-center">
              <div className="h-1.5 w-10 rounded-sm blur-[1.5px]" style={{ background: ivory(0.18) }} />
              <div className="flex-1 h-1 rounded-sm" style={{ background: ivory(0.08) }} />
              <div className="h-1 w-6 rounded-sm" style={{ background: ivory(0.12) }} />
              <div className="h-1 w-6 rounded-sm blur-[1px]" style={{ background: ivory(0.1) }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  </StageFrame>
);

/* 04 — Food Environment: catering manual + buffet checklist */
const OperationsManual = () => (
  <StageFrame>
    <div
      className="absolute left-[8%] top-[14%] w-[42%] aspect-[3/4] shadow-[0_20px_40px_-12px_hsl(0_0%_0%/0.75)]"
      style={{ background: "hsl(38 20% 90%)", transform: "rotate(-3deg)" }}
    >
      <div className="p-2.5 space-y-1.5 text-center">
        <span className="block text-[6px] tracking-[0.3em] uppercase font-display font-medium" style={{ color: "hsl(220 15% 20%)" }}>
          Catering & Food Standards
        </span>
        <div className="h-px w-3/4 mx-auto" style={{ background: "hsl(220 15% 25% / 0.3)" }} />
        <span className="block text-[5px] tracking-[0.25em] uppercase font-display" style={{ color: "hsl(220 15% 25% / 0.55)" }}>
          Operational Manual
        </span>
        <div className="pt-2 space-y-1">
          {[1, 2, 3, 4, 5].map((r) => (
            <div key={r} className="h-px w-full mx-auto" style={{ background: "hsl(220 15% 25% / 0.1)" }} />
          ))}
          <div className="h-1 w-2/3 mx-auto blur-[1.5px]" style={{ background: "hsl(220 15% 25% / 0.18)" }} />
        </div>
      </div>
    </div>
    <div
      className="absolute right-[8%] top-[18%] w-[40%] aspect-[3/4] shadow-[0_20px_40px_-12px_hsl(0_0%_0%/0.75)]"
      style={{ background: "hsl(38 20% 93%)", transform: "rotate(4deg)" }}
    >
      <div className="p-2.5 space-y-1.5">
        <span className="block text-[6px] tracking-[0.3em] uppercase font-display font-medium" style={{ color: "hsl(220 15% 20%)" }}>
          Buffet Setup
        </span>
        <div className="h-px w-full" style={{ background: "hsl(220 15% 25% / 0.25)" }} />
        {[
          "Breakfast station",
          "Soup station",
          "Salad bar",
          "Hot buffet",
          "Pasta station",
          "Sandwich bags",
        ].map((l) => (
          <div key={l} className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 border rounded-[1px]" style={{ borderColor: "hsl(220 15% 25% / 0.5)" }} />
            <span className="text-[6px]" style={{ color: "hsl(220 15% 25% / 0.75)" }}>{l}</span>
          </div>
        ))}
      </div>
    </div>
  </StageFrame>
);

/* 05 — Education Tools: tile grid of infographic placeholders */
const EducationGrid = () => {
  const tiles = [
    { title: "The ABC", subtitle: "of Football Nutrition", tone: "olive" },
    { title: "The Shot", subtitle: "vs The System", tone: "charcoal" },
    { title: "Hydration", subtitle: "Before Match", tone: "blue" },
    { title: "Tackle Fructose", subtitle: "Intolerance", tone: "green" },
  ];
  const toneBg: Record<string, string> = {
    olive: "linear-gradient(135deg, hsl(155 30% 22%), hsl(155 22% 14%))",
    charcoal: "linear-gradient(135deg, hsl(220 18% 18%), hsl(220 22% 10%))",
    blue: "linear-gradient(135deg, hsl(210 28% 24%), hsl(210 24% 14%))",
    green: "linear-gradient(135deg, hsl(140 24% 20%), hsl(140 22% 12%))",
  };
  return (
    <StageFrame>
      <div className="absolute inset-x-[8%] inset-y-[14%] grid grid-cols-2 gap-2">
        {tiles.map((t) => (
          <div
            key={t.title}
            className="relative rounded-sm overflow-hidden"
            style={{ background: toneBg[t.tone], border: `1px solid ${ivory(0.06)}` }}
          >
            <div className="absolute inset-0 p-2 flex flex-col justify-between">
              <span className="text-[7px] font-display font-semibold tracking-tight leading-tight" style={{ color: ivory(0.9) }}>
                {t.title}
                <span className="block text-[6px] font-normal" style={{ color: ivory(0.6) }}>{t.subtitle}</span>
              </span>
              <span className="self-end w-3 h-3 rounded-full" style={{ background: ivory(0.08) }} />
            </div>
          </div>
        ))}
      </div>
    </StageFrame>
  );
};

/* 06 — Atlas: open book spread, second half blurred + locked */
const AtlasBook = () => (
  <StageFrame>
    <div className="absolute inset-x-[8%] inset-y-[16%] flex shadow-[0_25px_50px_-15px_hsl(0_0%_0%/0.8)]">
      {/* left page */}
      <div className="flex-1 relative" style={{ background: "hsl(38 22% 92%)" }}>
        <div className="absolute right-0 inset-y-0 w-px" style={{ background: "hsl(220 15% 25% / 0.18)" }} />
        <div className="p-2 space-y-1">
          <span className="block text-[6px] tracking-[0.3em] uppercase font-display font-medium" style={{ color: "hsl(220 15% 20%)" }}>
            Pre-match Plate
          </span>
          <div className="h-px w-1/2" style={{ background: "hsl(220 15% 25% / 0.3)" }} />
          <div className="mt-1 h-10 rounded-full mx-auto w-3/4" style={{ background: "hsl(155 22% 35%)" }} />
          {[1, 2, 3, 4].map((r) => (
            <div key={r} className="flex gap-1 items-center">
              <span className="w-1 h-1 rounded-full" style={{ background: "hsl(220 15% 25% / 0.5)" }} />
              <div className="h-px flex-1" style={{ background: "hsl(220 15% 25% / 0.15)" }} />
            </div>
          ))}
        </div>
      </div>
      {/* right page — blurred / locked */}
      <div className="flex-1 relative" style={{ background: "hsl(38 22% 88%)" }}>
        <div className="p-2 space-y-1">
          <span className="block text-[6px] tracking-[0.3em] uppercase font-display font-medium" style={{ color: "hsl(220 15% 20%)" }}>
            During Match Fuel
          </span>
          <div className="h-px w-1/2" style={{ background: "hsl(220 15% 25% / 0.3)" }} />
          <div className="space-y-1 pt-1">
            {[1, 2, 3, 4, 5].map((r) => (
              <div key={r} className="h-1 rounded-sm" style={{ background: "hsl(220 15% 25% / 0.18)", width: `${90 - r * 6}%` }} />
            ))}
          </div>
        </div>
        <div
          className="absolute inset-0 backdrop-blur-[3px] flex items-center justify-center"
          style={{ background: "hsl(220 22% 8% / 0.35)" }}
        >
          <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: ivory(0.08), border: `1px solid ${ivory(0.18)}` }}>
            <Lock className="w-2.5 h-2.5" style={{ color: ivory(0.7) }} />
          </div>
        </div>
      </div>
    </div>
  </StageFrame>
);

export const AppliedPreview = ({ kind }: { kind: AppliedPreviewKind }) => {
  switch (kind) {
    case "matchdayFuel": return <MatchdayFuel />;
    case "hydrationDashboard": return <HydrationDashboard />;
    case "redactedReport": return <RedactedReport />;
    case "operationsManual": return <OperationsManual />;
    case "educationGrid": return <EducationGrid />;
    case "atlasBook": return <AtlasBook />;
  }
};

export default AppliedPreview;