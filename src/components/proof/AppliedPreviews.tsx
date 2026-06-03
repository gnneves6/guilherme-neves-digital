import { Lock } from "lucide-react";
import type { AppliedPreviewKind } from "@/data/artefacts";

/**
 * Per-object preview compositions for the "Selected Applied Work" section.
 * Pure CSS/SVG mockups — no fake athlete data, no real club logos.
 * Tuned for a dark cinematic archive, ivory/olive/gold accents.
 * Each composition layers a primary "system" object with secondary
 * paper / document / report artefacts to evoke a real working desk.
 */

const ivory = (a: number) => `hsl(var(--ivory) / ${a})`;
const olive = (a: number) => `hsl(var(--olive-light) / ${a})`;
const accent = (a: number) => `hsl(var(--accent) / ${a})`;
const paper = (l = 92) => `hsl(38 22% ${l}%)`;
const ink = (a: number) => `hsl(220 15% 22% / ${a})`;

const StageFrame = ({ children }: { children: React.ReactNode }) => (
  <div
    className="absolute inset-0 overflow-hidden"
    style={{
      background:
        "radial-gradient(ellipse 100% 75% at 65% 38%, hsl(220 18% 13% / 0.95), hsl(220 24% 5% / 0.98))",
    }}
  >
    {/* very subtle diagonal desk texture */}
    <div
      aria-hidden
      className="absolute inset-0 opacity-[0.05] pointer-events-none"
      style={{
        backgroundImage:
          "repeating-linear-gradient(125deg, hsl(var(--ivory) / 0.6) 0 1px, transparent 1px 7px)",
      }}
    />
    {/* hairline frame */}
    <div className="absolute inset-2 border" style={{ borderColor: ivory(0.04) }} />
    {/* corner ticks */}
    {[
      "top-2 left-2 border-l border-t",
      "top-2 right-2 border-r border-t",
      "bottom-2 left-2 border-l border-b",
      "bottom-2 right-2 border-r border-b",
    ].map((c) => (
      <span
        key={c}
        aria-hidden
        className={`absolute w-2.5 h-2.5 ${c}`}
        style={{ borderColor: ivory(0.18) }}
      />
    ))}
    {children}
    {/* vignette */}
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          "radial-gradient(ellipse 95% 75% at 50% 55%, transparent 25%, hsl(220 24% 4% / 0.75))",
      }}
    />
  </div>
);

const ImagePreview = ({
  src,
  alt,
  objectPosition = "center",
  lazy = true,
}: {
  src: string;
  alt: string;
  objectPosition?: string;
  lazy?: boolean;
}) => (
  <StageFrame>
    <img
      src={src}
      alt={alt}
      loading={lazy ? "lazy" : "eager"}
      className="absolute inset-0 h-full w-full"
      style={{ objectFit: "cover", objectPosition }}
    />
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          "linear-gradient(180deg, hsl(220 24% 5% / 0.08) 0%, transparent 30%, transparent 72%, hsl(220 24% 4% / 0.2) 100%), radial-gradient(ellipse 90% 82% at 50% 52%, transparent 58%, hsl(220 24% 4% / 0.55) 100%)",
      }}
    />
    <div
      aria-hidden
      className="absolute inset-[2.5%] rounded-[2px] pointer-events-none"
      style={{ boxShadow: "inset 0 0 0 1px hsl(var(--ivory) / 0.05)" }}
    />
  </StageFrame>
);

const PaperLines = ({
  count = 5,
  shadeFrom = 0.18,
  shadeStep = 0.02,
  widths = [1, 0.92, 0.86, 0.78, 0.7],
}: {
  count?: number;
  shadeFrom?: number;
  shadeStep?: number;
  widths?: number[];
}) => (
  <div className="space-y-1">
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className="h-px"
        style={{
          width: `${(widths[i % widths.length] ?? 0.8) * 100}%`,
          background: `hsl(220 15% 22% / ${Math.max(0.06, shadeFrom - i * shadeStep)})`,
        }}
      />
    ))}
  </div>
);

/* 01 — Matchday Fuel: planner card + layered MD-1 / timeline sheets + gold tag */
const MatchdayFuel = () => (
  <StageFrame>
    <div
      className="absolute left-[5%] top-[10%] w-[48%] aspect-[5/6.4] rounded-[3px] overflow-hidden shadow-[0_30px_60px_-18px_hsl(0_0%_0%/0.85)]"
      style={{
        background: "linear-gradient(180deg, hsl(220 22% 12%), hsl(220 24% 7%))",
        border: `1px solid ${ivory(0.09)}`,
        transform: "perspective(900px) rotateY(4deg) rotateX(1deg)",
        transformOrigin: "right center",
      }}
    >
      <div className="flex items-center justify-between px-2.5 py-1.5 border-b" style={{ borderColor: ivory(0.06), background: "hsl(220 24% 9%)" }}>
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: ivory(0.18) }} />
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: ivory(0.12) }} />
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: ivory(0.12) }} />
        </div>
        <span className="text-[5.5px] tracking-[0.25em] uppercase font-display" style={{ color: ivory(0.35) }}>fuelops · matchday</span>
      </div>
      <div className="flex items-center gap-1.5 px-3 py-2 border-b" style={{ borderColor: ivory(0.05) }}>
        <span className="w-3.5 h-3.5 rounded-sm flex items-center justify-center text-[7px] font-display" style={{ background: olive(0.45), color: ivory(0.95) }}>GN</span>
        <span className="text-[7px] tracking-[0.22em] uppercase font-display" style={{ color: ivory(0.78) }}>Matchday Fuel</span>
        <span className="ml-auto text-[6px] px-1 rounded-sm font-display" style={{ background: "hsl(40 70% 55% / 0.18)", color: "hsl(40 70% 65%)" }}>LIVE</span>
      </div>
      <div className="px-3 py-2.5 space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-[6px] tracking-[0.22em] uppercase font-display" style={{ color: ivory(0.45) }}>Kick-off 17:00</span>
          <span className="text-[6px] px-1 rounded-sm" style={{ background: olive(0.28), color: ivory(0.8) }}>Carb focus</span>
        </div>
        <div className="relative pt-1 pb-0.5">
          <div className="absolute left-1 top-3 bottom-1 w-px" style={{ background: ivory(0.08) }} />
          {[
            ["09:00", "Breakfast", false],
            ["13:00", "Pre-match meal", true],
            ["15:30", "Pre-game snack", false],
            ["17:00", "Kick-off", true],
            ["18:00", "Half-time", false],
            ["19:00", "Recovery", false],
          ].map(([t, l, hl]) => (
            <div key={t as string} className="relative flex items-center gap-2 pl-3.5 py-[1.5px]">
              <span
                className="absolute left-0.5 w-1.5 h-1.5 rounded-full"
                style={{ background: hl ? "hsl(40 80% 60%)" : olive(0.7), boxShadow: hl ? "0 0 6px hsl(40 80% 60% / 0.6)" : "none" }}
              />
              <span className="text-[6px] font-display tracking-wide w-7" style={{ color: ivory(0.6) }}>{t}</span>
              <span className="text-[6px]" style={{ color: hl ? ivory(0.85) : ivory(0.45) }}>{l}</span>
              {hl ? <span className="ml-auto text-[5.5px] px-1 rounded-sm" style={{ background: "hsl(40 70% 55% / 0.16)", color: "hsl(40 70% 70%)" }}>+CHO</span> : null}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-1 pt-1">
          {[
            ["CHO", "8g/kg"],
            ["Fluid", "35ml/kg"],
            ["Na+", "1.2g"],
          ].map(([k, v]) => (
            <div key={k} className="px-1 py-0.5 rounded-sm" style={{ background: ivory(0.03), border: `1px solid ${ivory(0.06)}` }}>
              <span className="block text-[5px] tracking-[0.2em] uppercase font-display" style={{ color: ivory(0.4) }}>{k}</span>
              <span className="block text-[6.5px] font-display" style={{ color: ivory(0.85) }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* MD-1 sheet */}
    <div
      className="absolute right-[14%] top-[14%] w-[30%] aspect-[3/4.1] shadow-[0_22px_45px_-12px_hsl(0_0%_0%/0.8)]"
      style={{
        background: `linear-gradient(180deg, ${paper(91)}, ${paper(86)})`,
        transform: "rotate(-6deg)",
        borderLeft: `1px solid ${ink(0.08)}`,
      }}
    >
      <div className="p-2 space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="block text-[6px] tracking-[0.28em] uppercase font-display font-semibold" style={{ color: ink(0.9) }}>MD-1 Plan</span>
          <span className="text-[5px] tracking-[0.2em] uppercase font-display" style={{ color: ink(0.45) }}>v.04</span>
        </div>
        <div className="h-px w-2/3" style={{ background: ink(0.4) }} />
        <span className="block text-[6px] font-display" style={{ color: ink(0.65) }}>Glycogen loading</span>
        <span className="block text-[7px] font-display font-semibold" style={{ color: ink(0.9) }}>6–8 g CHO/kg</span>
        <div className="pt-1">
          <PaperLines count={6} widths={[1, 0.85, 0.78, 0.92, 0.7, 0.6]} />
        </div>
        <div className="pt-1 flex items-center gap-1">
          <span className="w-3 h-3 rounded-full" style={{ background: "hsl(40 60% 60%)" }} />
          <span className="w-3 h-3 rounded-full" style={{ background: "hsl(155 22% 42%)" }} />
          <span className="w-3 h-3 rounded-full" style={{ background: "hsl(0 35% 55%)" }} />
        </div>
      </div>
    </div>

    {/* timeline sheet behind */}
    <div
      className="absolute right-[4%] top-[36%] w-[28%] aspect-[3/3.6] shadow-[0_22px_40px_-14px_hsl(0_0%_0%/0.75)]"
      style={{ background: paper(94), transform: "rotate(7deg)" }}
    >
      <div className="p-2 space-y-1">
        <span className="block text-[6px] tracking-[0.28em] uppercase font-display font-semibold" style={{ color: ink(0.85) }}>Matchday Timeline</span>
        <div className="h-px w-3/4" style={{ background: ink(0.35) }} />
        <div className="relative h-3 mt-1">
          <div className="absolute top-1/2 left-0 right-0 h-px" style={{ background: ink(0.25) }} />
          {[10, 30, 50, 70, 90].map((p, i) => (
            <span
              key={p}
              className="absolute top-1/2 -translate-y-1/2 w-1 h-1 rounded-full"
              style={{ left: `${p}%`, background: i === 2 ? "hsl(40 70% 55%)" : "hsl(155 18% 30%)" }}
            />
          ))}
        </div>
        {["Pre-game snack", "Kick-off", "Half-time", "Recovery"].map((l) => (
          <div key={l} className="flex items-center gap-1">
            <span className="w-1 h-1 rounded-full" style={{ background: "hsl(155 18% 30%)" }} />
            <span className="text-[6px]" style={{ color: ink(0.7) }}>{l}</span>
          </div>
        ))}
      </div>
    </div>

    <div
      className="absolute left-[42%] bottom-[6%] px-1.5 py-0.5 rounded-sm"
      style={{ background: "hsl(40 60% 50% / 0.18)", border: "1px solid hsl(40 60% 55% / 0.3)" }}
    >
      <span className="text-[5.5px] tracking-[0.28em] uppercase font-display" style={{ color: "hsl(40 70% 72%)" }}>MD-1 → MD+1</span>
    </div>
  </StageFrame>
);

/* 02 — Hydration & Sweat Testing */
const HydrationDashboard = () => (
  <StageFrame>
    <div
      className="absolute left-[5%] top-[10%] w-[60%] aspect-[5/3.2] rounded-[3px] overflow-hidden shadow-[0_30px_60px_-18px_hsl(0_0%_0%/0.85)]"
      style={{
        background: "linear-gradient(180deg, hsl(220 22% 12%), hsl(220 24% 7%))",
        border: `1px solid ${ivory(0.09)}`,
        transform: "perspective(900px) rotateY(3deg)",
        transformOrigin: "right center",
      }}
    >
      <div className="flex items-center justify-between px-2.5 py-1 border-b" style={{ borderColor: ivory(0.06), background: "hsl(220 24% 9%)" }}>
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: ivory(0.18) }} />
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: ivory(0.12) }} />
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: ivory(0.12) }} />
        </div>
        <span className="text-[5.5px] tracking-[0.25em] uppercase font-display" style={{ color: ivory(0.35) }}>hydration ops</span>
      </div>
      <div className="flex items-center gap-1.5 px-3 py-1.5 border-b" style={{ borderColor: ivory(0.05) }}>
        <span className="w-3 h-3 rounded-sm flex items-center justify-center text-[7px] font-display" style={{ background: accent(0.55), color: ivory(0.95) }}>GN</span>
        <div className="flex flex-col leading-none">
          <span className="text-[7px] tracking-[0.22em] uppercase font-display" style={{ color: ivory(0.85) }}>Sweat Testing</span>
          <span className="text-[5.5px] font-display tracking-wide" style={{ color: ivory(0.4) }}>Squad overview · week 14</span>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-1.5 px-3 py-2">
        {[
          ["Sweat rate", "1.4 L/h", "hsl(190 60% 60%)"],
          ["Na+ loss", "1.1 g/L", "hsl(40 70% 60%)"],
          ["Tests / wk", "6", "hsl(155 35% 55%)"],
          ["Athletes", "24", ivory(0.8)],
        ].map(([k, v, c]) => (
          <div key={k as string} className="p-1.5 rounded-sm relative overflow-hidden" style={{ background: ivory(0.03), border: `1px solid ${ivory(0.05)}` }}>
            <span className="block text-[5px] tracking-[0.22em] uppercase font-display" style={{ color: ivory(0.4) }}>{k}</span>
            <span className="block text-[8.5px] font-display mt-0.5" style={{ color: ivory(0.95) }}>{v}</span>
            <span className="absolute bottom-0 left-0 h-[2px]" style={{ width: "60%", background: c as string }} />
          </div>
        ))}
      </div>
      <div className="px-3 pb-2 grid grid-cols-5 gap-2">
        <div className="col-span-2 space-y-1">
          <span className="text-[5px] tracking-[0.22em] uppercase font-display" style={{ color: ivory(0.4) }}>Squad roster</span>
          {[0.9, 0.74, 0.66, 0.58, 0.5].map((w, i) => (
            <div key={i} className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full" style={{ background: ivory(0.12) }} />
              <div className="flex-1 h-1 rounded-sm" style={{ background: ivory(0.07) }}>
                <div className="h-full" style={{ width: `${w * 100}%`, background: accent(0.7) }} />
              </div>
            </div>
          ))}
        </div>
        <div className="col-span-3 relative h-16 rounded-sm" style={{ background: ivory(0.02), border: `1px solid ${ivory(0.04)}` }}>
          <svg viewBox="0 0 100 40" className="w-full h-full" preserveAspectRatio="none">
            {[10, 20, 30].map((y) => (
              <line key={y} x1="0" x2="100" y1={y} y2={y} stroke={ivory(0.06)} strokeWidth="0.3" />
            ))}
            <path d="M0,30 L14,22 L28,26 L42,14 L56,18 L70,9 L84,12 L100,5 L100,40 L0,40 Z" fill={accent(0.18)} />
            <polyline fill="none" stroke={accent(0.9)} strokeWidth="0.9" points="0,30 14,22 28,26 42,14 56,18 70,9 84,12 100,5" />
            <polyline fill="none" stroke="hsl(190 60% 60% / 0.6)" strokeWidth="0.6" strokeDasharray="1.2 1.2" points="0,33 14,28 28,30 42,22 56,24 70,18 84,20 100,14" />
          </svg>
          <span className="absolute top-1 right-1.5 text-[5px] tracking-[0.2em] uppercase font-display" style={{ color: ivory(0.4) }}>L · Na+</span>
        </div>
      </div>
    </div>

    {/* protocol sheet */}
    <div
      className="absolute right-[5%] top-[14%] w-[32%] aspect-[3/4.1] shadow-[0_22px_45px_-12px_hsl(0_0%_0%/0.8)]"
      style={{ background: paper(91), transform: "rotate(4deg)" }}
    >
      <div className="p-2 space-y-1">
        <div className="flex items-center justify-between">
          <span className="block text-[6px] tracking-[0.28em] uppercase font-display font-semibold" style={{ color: ink(0.9) }}>Sweat Protocol</span>
          <span className="text-[5px] tracking-[0.2em] uppercase font-display" style={{ color: ink(0.45) }}>v.02</span>
        </div>
        <div className="h-px w-full" style={{ background: ink(0.35) }} />
        {["Purpose", "Procedure", "Calculations", "Interpretation"].map((s, i) => (
          <div key={s} className="space-y-0.5">
            <div className="flex items-center gap-1">
              <span className="text-[5px] font-display" style={{ color: ink(0.5) }}>0{i + 1}</span>
              <span className="block text-[6px] font-display font-semibold" style={{ color: ink(0.9) }}>{s}</span>
            </div>
            <PaperLines count={2} widths={[1, 0.86]} />
          </div>
        ))}
        <div className="pt-1 grid grid-cols-3 gap-1">
          {["Pre", "Mid", "Post"].map((l) => (
            <div key={l} className="text-center py-0.5" style={{ background: ink(0.06), border: `1px solid ${ink(0.12)}` }}>
              <span className="text-[5px] tracking-[0.2em] uppercase font-display" style={{ color: ink(0.75) }}>{l}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* small report card bottom-left */}
    <div
      className="absolute left-[4%] bottom-[6%] w-[26%] aspect-[3/1.6] rounded-sm overflow-hidden shadow-[0_18px_30px_-12px_hsl(0_0%_0%/0.7)]"
      style={{ background: "hsl(220 24% 10%)", border: `1px solid ${ivory(0.07)}` }}
    >
      <div className="px-2 py-1 flex items-center justify-between border-b" style={{ borderColor: ivory(0.05) }}>
        <span className="text-[5px] tracking-[0.22em] uppercase font-display" style={{ color: ivory(0.5) }}>Indiv. profile</span>
        <span className="text-[5px] font-display" style={{ color: accent(0.8) }}>● Hi-Na</span>
      </div>
      <div className="p-2 flex items-end gap-0.5 h-10">
        {[4, 6, 5, 8, 7, 9, 6, 8, 7, 9, 8, 10].map((h, i) => (
          <span key={i} className="flex-1 rounded-sm" style={{ height: `${h * 9}%`, background: accent(0.6) }} />
        ))}
      </div>
    </div>
  </StageFrame>
);

/* 03 — Body Composition: redacted report */
const RedactedReport = () => (
  <StageFrame>
    <div
      className="absolute right-[6%] top-[20%] w-[38%] aspect-[3/4] shadow-[0_18px_30px_-12px_hsl(0_0%_0%/0.65)]"
      style={{ background: paper(86), transform: "rotate(5deg)" }}
    >
      <div className="p-2 space-y-1">
        <span className="block text-[5.5px] tracking-[0.28em] uppercase font-display font-semibold" style={{ color: ink(0.85) }}>Individual Notes</span>
        <div className="h-px w-2/3" style={{ background: ink(0.3) }} />
        <PaperLines count={6} widths={[1, 0.9, 0.8, 0.85, 0.6, 0.7]} />
      </div>
    </div>

    <div
      className="absolute left-[6%] top-[8%] w-[70%] aspect-[5/4] rounded-[3px] overflow-hidden shadow-[0_30px_60px_-18px_hsl(0_0%_0%/0.85)]"
      style={{
        background: "linear-gradient(180deg, hsl(220 22% 12%), hsl(220 24% 7%))",
        border: `1px solid ${ivory(0.09)}`,
      }}
    >
      <div className="px-3 py-1.5 border-b flex items-center justify-between" style={{ borderColor: ivory(0.06), background: "hsl(220 24% 9%)" }}>
        <span className="text-[6px] tracking-[0.28em] uppercase font-display" style={{ color: ivory(0.6) }}>Team Report · Confidential</span>
        <div className="flex items-center gap-1">
          <span className="text-[5px] tracking-[0.22em] uppercase font-display" style={{ color: "hsl(35 40% 65%)" }}>Redacted</span>
          <Lock className="w-2.5 h-2.5" style={{ color: ivory(0.5) }} />
        </div>
      </div>
      <div className="px-3 py-2 space-y-1.5">
        <div className="grid grid-cols-5 gap-2">
          <div className="col-span-2 space-y-1">
            <span className="text-[5.5px] tracking-[0.22em] uppercase font-display" style={{ color: ivory(0.45) }}>Summary</span>
            <div className="flex items-end gap-0.5 h-10">
              {[5, 8, 4, 9, 6, 7, 5, 8, 6, 9, 7, 8].map((h, i) => (
                <div key={i} className="flex-1 rounded-sm" style={{ height: `${h * 9}%`, background: i % 3 === 0 ? olive(0.65) : olive(0.4) }} />
              ))}
            </div>
            <div className="flex justify-between pt-0.5">
              <span className="text-[5px] font-display" style={{ color: ivory(0.35) }}>W1</span>
              <span className="text-[5px] font-display" style={{ color: ivory(0.35) }}>W12</span>
            </div>
          </div>
          <div className="col-span-3 relative h-14 rounded-sm" style={{ background: ivory(0.02), border: `1px solid ${ivory(0.05)}` }}>
            <svg viewBox="0 0 100 40" className="w-full h-full" preserveAspectRatio="none">
              <path d="M0,28 L20,22 L40,24 L60,18 L80,20 L100,12 L100,40 L0,40 Z" fill={olive(0.18)} />
              <polyline points="0,28 20,22 40,24 60,18 80,20 100,12" fill="none" stroke={olive(0.85)} strokeWidth="0.8" />
              <polyline points="0,32 20,30 40,28 60,26 80,22 100,18" fill="none" stroke={ivory(0.35)} strokeWidth="0.5" strokeDasharray="1 1" />
            </svg>
            <span className="absolute top-1 left-1.5 text-[5px] tracking-[0.22em] uppercase font-display" style={{ color: ivory(0.4) }}>FM / FFM trend</span>
          </div>
        </div>
        <div className="space-y-1 pt-1">
          <div className="flex items-center justify-between">
            <span className="text-[5.5px] tracking-[0.22em] uppercase font-display" style={{ color: ivory(0.45) }}>Individual Overview</span>
            <span className="text-[5px] tracking-[0.22em] uppercase font-display" style={{ color: ivory(0.35) }}>n = 24</span>
          </div>
          {[0.92, 0.78, 0.66, 0.84, 0.6, 0.72].map((w, r) => (
            <div key={r} className="flex gap-1.5 items-center">
              <span className="text-[5px] font-display w-3" style={{ color: ivory(0.35) }}>{String(r + 1).padStart(2, "0")}</span>
              <div className="h-1.5 w-12 rounded-sm blur-[2px]" style={{ background: ivory(0.22) }} />
              <div className="flex-1 h-1 rounded-sm" style={{ background: ivory(0.06) }}>
                <div className="h-full rounded-sm" style={{ width: `${w * 100}%`, background: olive(0.55) }} />
              </div>
              <div className="h-1 w-5 rounded-sm" style={{ background: ivory(0.14) }} />
              <div className="h-1 w-5 rounded-sm blur-[1.5px]" style={{ background: ivory(0.18) }} />
            </div>
          ))}
        </div>
      </div>
      <span className="absolute right-3 bottom-1.5 text-[6px] tracking-[0.4em] uppercase font-display" style={{ color: ivory(0.08) }}>
        CONFIDENTIAL
      </span>
    </div>

    <div
      className="absolute right-[8%] bottom-[8%] w-7 h-7 rounded-full flex items-center justify-center"
      style={{ background: ivory(0.06), border: `1px solid ${ivory(0.18)}`, backdropFilter: "blur(4px)" }}
    >
      <Lock className="w-3 h-3" style={{ color: ivory(0.75) }} />
    </div>
  </StageFrame>
);

/* 04 — Food Environment: manual cover + checklist + protected tag */
const OperationsManual = () => (
  <StageFrame>
    <div
      className="absolute left-[6%] top-[10%] w-[42%] aspect-[3/4.2] shadow-[0_28px_55px_-16px_hsl(0_0%_0%/0.85)]"
      style={{
        background: `linear-gradient(180deg, ${paper(91)}, ${paper(84)})`,
        transform: "rotate(-5deg)",
        borderLeft: `2px solid hsl(155 22% 28%)`,
      }}
    >
      <div className="p-3 space-y-1.5 text-center h-full flex flex-col">
        <span className="block text-[5px] tracking-[0.32em] uppercase font-display" style={{ color: ink(0.5) }}>
          GN · Performance Nutrition
        </span>
        <div className="h-px w-12 mx-auto" style={{ background: ink(0.4) }} />
        <span className="block text-[7.5px] tracking-[0.22em] uppercase font-display font-semibold leading-tight pt-2" style={{ color: ink(0.95) }}>
          Catering &amp; Food Standards
        </span>
        <span className="block text-[5.5px] tracking-[0.28em] uppercase font-display" style={{ color: ink(0.55) }}>
          Operational Manual · v.03
        </span>
        <div className="mx-auto mt-2 w-8 h-8 rounded-full flex items-center justify-center" style={{ border: `1px solid ${ink(0.45)}` }}>
          <span className="text-[8px] font-display tracking-tight" style={{ color: ink(0.85) }}>GN</span>
        </div>
        <div className="mt-auto space-y-0.5">
          <div className="h-1 w-2/3 mx-auto blur-[2px]" style={{ background: ink(0.25) }} />
          <div className="h-1 w-1/2 mx-auto blur-[2px]" style={{ background: ink(0.2) }} />
          <span className="block text-[5px] tracking-[0.3em] uppercase font-display pt-1" style={{ color: ink(0.45) }}>Confidential</span>
        </div>
      </div>
    </div>

    <div
      className="absolute right-[6%] top-[12%] w-[42%] aspect-[3/4.2] shadow-[0_28px_55px_-16px_hsl(0_0%_0%/0.8)]"
      style={{ background: paper(94), transform: "rotate(5deg)" }}
    >
      <div className="p-2.5 space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="block text-[6px] tracking-[0.3em] uppercase font-display font-semibold" style={{ color: ink(0.9) }}>
            Buffet Setup
          </span>
          <span className="text-[5px] tracking-[0.22em] uppercase font-display" style={{ color: ink(0.5) }}>MD &amp; MD-1</span>
        </div>
        <div className="h-px w-full" style={{ background: ink(0.3) }} />
        {[
          ["Breakfast station", true],
          ["Soup station", true],
          ["Salad bar", true],
          ["Hot buffet · CHO focus", true],
          ["Pasta station", false],
          ["Recovery shakes", false],
          ["Sandwich bags (travel)", false],
        ].map(([l, done]) => (
          <div key={l as string} className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-[2px] flex items-center justify-center"
              style={{ background: done ? "hsl(155 28% 35%)" : "transparent", border: `1px solid ${ink(0.5)}` }}
            >
              {done ? (
                <svg viewBox="0 0 8 8" className="w-1.5 h-1.5"><path d="M1 4 L3 6 L7 2" stroke={paper(95)} strokeWidth="1.5" fill="none" /></svg>
              ) : null}
            </span>
            <span className="text-[6px]" style={{ color: ink(done ? 0.85 : 0.55) }}>{l}</span>
          </div>
        ))}
        <div className="pt-1 space-y-0.5">
          <span className="block text-[5px] tracking-[0.25em] uppercase font-display" style={{ color: ink(0.5) }}>Supplier details</span>
          <div className="h-1.5 w-full blur-[2.5px]" style={{ background: ink(0.3) }} />
          <div className="h-1.5 w-5/6 blur-[2.5px]" style={{ background: ink(0.28) }} />
          <div className="h-1.5 w-4/6 blur-[2.5px]" style={{ background: ink(0.25) }} />
        </div>
      </div>
    </div>

    <div
      className="absolute left-[40%] bottom-[6%] flex items-center gap-1 px-1.5 py-0.5 rounded-sm"
      style={{ background: "hsl(220 22% 8% / 0.7)", border: `1px solid ${ivory(0.15)}`, backdropFilter: "blur(3px)" }}
    >
      <Lock className="w-2 h-2" style={{ color: ivory(0.75) }} />
      <span className="text-[5.5px] tracking-[0.28em] uppercase font-display" style={{ color: ivory(0.7) }}>Protected</span>
    </div>
  </StageFrame>
);

/* 05 — Education Tools: 6-tile infographic grid */
const EducationGrid = () => {
  const tiles = [
    { title: "The ABC", subtitle: "Football Nutrition", tone: "olive", icon: "abc" },
    { title: "Cramp at 80'", subtitle: "Late-game shots", tone: "amber", icon: "bolt" },
    { title: "Hydration", subtitle: "Before Match", tone: "blue", icon: "drop" },
    { title: "Fructose", subtitle: "Intolerance", tone: "green", icon: "leaf" },
    { title: "Snacks", subtitle: "Youth athletes", tone: "rose", icon: "snack" },
    { title: "Supplements", subtitle: "What works", tone: "charcoal", icon: "pill" },
  ];
  const toneBg: Record<string, string> = {
    olive: "linear-gradient(135deg, hsl(155 32% 24%), hsl(155 22% 12%))",
    amber: "linear-gradient(135deg, hsl(35 50% 32%), hsl(30 30% 14%))",
    blue: "linear-gradient(135deg, hsl(210 32% 26%), hsl(210 26% 12%))",
    green: "linear-gradient(135deg, hsl(140 28% 22%), hsl(140 22% 10%))",
    rose: "linear-gradient(135deg, hsl(8 32% 28%), hsl(8 22% 12%))",
    charcoal: "linear-gradient(135deg, hsl(220 18% 18%), hsl(220 22% 9%))",
  };
  const renderIcon = (icon: string) => {
    switch (icon) {
      case "abc":
        return <span className="text-[10px] font-display font-bold" style={{ color: ivory(0.85) }}>A·B·C</span>;
      case "bolt":
        return <svg viewBox="0 0 12 12" className="w-3 h-3"><path d="M7 1 L3 7 L6 7 L5 11 L9 5 L6 5 Z" fill="hsl(40 80% 65%)" /></svg>;
      case "drop":
        return <svg viewBox="0 0 12 12" className="w-3 h-3"><path d="M6 1 C8 4 10 6 10 8 a4 4 0 1 1 -8 0 C2 6 4 4 6 1Z" fill="hsl(195 60% 65%)" /></svg>;
      case "leaf":
        return <svg viewBox="0 0 12 12" className="w-3 h-3"><path d="M2 10 C2 4 7 2 10 2 C10 6 8 10 2 10Z" fill="hsl(140 45% 55%)" /></svg>;
      case "snack":
        return <div className="w-3 h-2 rounded-sm" style={{ background: "hsl(15 55% 60%)" }} />;
      case "pill":
        return <div className="w-3.5 h-1.5 rounded-full" style={{ background: "linear-gradient(90deg, hsl(0 0% 85%), hsl(0 45% 55%))" }} />;
      default:
        return null;
    }
  };
  return (
    <StageFrame>
      <div className="absolute inset-x-[6%] inset-y-[10%] grid grid-cols-3 grid-rows-2 gap-1.5">
        {tiles.map((t) => (
          <div
            key={t.title}
            className="relative rounded-sm overflow-hidden"
            style={{ background: toneBg[t.tone], border: `1px solid ${ivory(0.07)}`, boxShadow: "0 10px 20px -10px hsl(0 0% 0% / 0.6)" }}
          >
            <div className="absolute inset-0 p-1.5 flex flex-col justify-between">
              <div className="flex items-start justify-between">
                {renderIcon(t.icon)}
                <span className="text-[5px] tracking-[0.22em] uppercase font-display" style={{ color: ivory(0.35) }}>GN</span>
              </div>
              <div>
                <span className="block text-[6.5px] font-display font-semibold leading-tight" style={{ color: ivory(0.95) }}>
                  {t.title}
                </span>
                <span className="block text-[5.5px] font-display tracking-tight" style={{ color: ivory(0.55) }}>
                  {t.subtitle}
                </span>
              </div>
            </div>
            <span className="absolute top-1 right-1 w-1 h-1 rounded-full" style={{ background: ivory(0.25) }} />
          </div>
        ))}
      </div>
    </StageFrame>
  );
};

/* 06 — Atlas: closed cover + open spread with locked right page */
const AtlasBook = () => (
  <StageFrame>
    <div
      className="absolute left-[6%] top-[12%] w-[28%] aspect-[3/4.4] shadow-[0_30px_55px_-18px_hsl(0_0%_0%/0.85)]"
      style={{
        background: "linear-gradient(180deg, hsl(155 16% 18%), hsl(155 18% 10%))",
        border: `1px solid hsl(40 35% 55% / 0.25)`,
        transform: "rotate(-4deg)",
      }}
    >
      <div className="p-2.5 h-full flex flex-col text-center">
        <span className="block text-[5px] tracking-[0.35em] uppercase font-display" style={{ color: "hsl(40 50% 70% / 0.7)" }}>GN · 2026</span>
        <div className="h-px w-10 mx-auto mt-1.5" style={{ background: "hsl(40 50% 65% / 0.5)" }} />
        <span className="block text-[8px] tracking-[0.18em] uppercase font-display font-semibold leading-tight mt-3" style={{ color: ivory(0.95) }}>
          The Football<br />Nutrition Atlas
        </span>
        <div className="mx-auto mt-3 w-10 h-10 rounded-full flex items-center justify-center" style={{ border: `1px solid hsl(40 50% 60% / 0.5)` }}>
          <svg viewBox="0 0 20 20" className="w-5 h-5">
            <circle cx="10" cy="10" r="7" fill="none" stroke="hsl(40 50% 65%)" strokeWidth="0.6" />
            <path d="M3 10 H17 M10 3 V17 M5 5 Q10 10 5 15 M15 5 Q10 10 15 15" stroke="hsl(40 50% 65%)" strokeWidth="0.4" fill="none" />
          </svg>
        </div>
        <span className="mt-auto block text-[5px] tracking-[0.3em] uppercase font-display" style={{ color: "hsl(40 50% 70% / 0.65)" }}>Premium Edition</span>
      </div>
    </div>

    <div
      className="absolute right-[5%] top-[14%] w-[58%] aspect-[7/5] flex shadow-[0_28px_55px_-15px_hsl(0_0%_0%/0.8)]"
      style={{ transform: "perspective(900px) rotateY(-6deg)", transformOrigin: "left center" }}
    >
      <div className="flex-1 relative p-2.5 space-y-1.5" style={{ background: `linear-gradient(180deg, ${paper(94)}, ${paper(89)})` }}>
        <span className="block text-[5px] tracking-[0.32em] uppercase font-display" style={{ color: ink(0.5) }}>Chapter 02</span>
        <span className="block text-[7px] tracking-[0.18em] uppercase font-display font-semibold" style={{ color: ink(0.95) }}>
          The Pre-match Plate
        </span>
        <div className="h-px w-1/2" style={{ background: ink(0.4) }} />
        <div className="relative w-12 h-12 mx-auto rounded-full overflow-hidden" style={{ border: `1px solid ${ink(0.35)}` }}>
          <div className="absolute inset-0" style={{ background: "conic-gradient(hsl(40 60% 60%) 0 50%, hsl(155 22% 42%) 50% 78%, hsl(0 35% 55%) 78% 100%)" }} />
          <div className="absolute inset-2 rounded-full" style={{ background: paper(95), border: `1px solid ${ink(0.2)}` }} />
        </div>
        <div className="flex items-center justify-center gap-2 pt-0.5">
          <span className="flex items-center gap-0.5 text-[5px] font-display" style={{ color: ink(0.7) }}><span className="w-1.5 h-1.5 rounded-full" style={{ background: "hsl(40 60% 60%)" }} />CHO</span>
          <span className="flex items-center gap-0.5 text-[5px] font-display" style={{ color: ink(0.7) }}><span className="w-1.5 h-1.5 rounded-full" style={{ background: "hsl(155 22% 42%)" }} />Veg</span>
          <span className="flex items-center gap-0.5 text-[5px] font-display" style={{ color: ink(0.7) }}><span className="w-1.5 h-1.5 rounded-full" style={{ background: "hsl(0 35% 55%)" }} />Pro</span>
        </div>
        <div className="pt-1">
          <PaperLines count={4} widths={[1, 0.9, 0.82, 0.7]} />
        </div>
        <span className="absolute bottom-1 left-2.5 text-[5px] font-display" style={{ color: ink(0.4) }}>p.24</span>
      </div>

      <div className="w-[6px] relative" style={{ background: "linear-gradient(90deg, hsl(220 15% 18% / 0.5), hsl(220 15% 8% / 0.7), hsl(220 15% 18% / 0.5))" }}>
        <div className="absolute inset-y-1 left-1/2 -translate-x-1/2 w-px" style={{ background: ink(0.4) }} />
      </div>

      <div className="flex-1 relative p-2.5 space-y-1" style={{ background: `linear-gradient(180deg, ${paper(91)}, ${paper(85)})` }}>
        <span className="block text-[5px] tracking-[0.32em] uppercase font-display" style={{ color: ink(0.5) }}>Chapter 03</span>
        <span className="block text-[7px] tracking-[0.18em] uppercase font-display font-semibold" style={{ color: ink(0.95) }}>
          During-match Fuel
        </span>
        <div className="h-px w-1/2" style={{ background: ink(0.4) }} />
        <div className="space-y-1 pt-1">
          {[1, 2, 3, 4, 5, 6].map((r) => (
            <div key={r} className="h-1 rounded-sm" style={{ background: ink(0.18), width: `${90 - r * 5}%` }} />
          ))}
        </div>
        <div
          className="absolute inset-0 backdrop-blur-[3px] flex flex-col items-center justify-center gap-1"
          style={{ background: "hsl(220 22% 8% / 0.42)" }}
        >
          <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: ivory(0.08), border: `1px solid ${ivory(0.22)}` }}>
            <Lock className="w-3 h-3" style={{ color: ivory(0.8) }} />
          </div>
          <span className="text-[5.5px] tracking-[0.3em] uppercase font-display" style={{ color: ivory(0.7) }}>In Development</span>
        </div>
      </div>
    </div>

    <div
      className="absolute left-[36%] bottom-[6%] px-1.5 py-0.5 rounded-sm"
      style={{ background: "hsl(40 60% 50% / 0.16)", border: "1px solid hsl(40 60% 55% / 0.3)" }}
    >
      <span className="text-[5.5px] tracking-[0.3em] uppercase font-display" style={{ color: "hsl(40 65% 75%)" }}>Premium Resource</span>
    </div>
  </StageFrame>
);

export const AppliedPreview = ({
  kind,
  previewImage,
  previewAlt,
  objectPosition,
  lazy = true,
}: {
  kind: AppliedPreviewKind;
  previewImage?: string;
  previewAlt?: string;
  objectPosition?: string;
  lazy?: boolean;
}) => {
  if (previewImage && previewAlt) {
    return (
      <ImagePreview
        src={previewImage}
        alt={previewAlt}
        objectPosition={objectPosition}
        lazy={lazy}
      />
    );
  }

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
