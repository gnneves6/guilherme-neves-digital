import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, ArrowRight, Globe, Layers, Sparkles } from "lucide-react";
import Reveal from "@/components/Reveal";
import Scene from "@/components/motion/Scene";
import ResourceModal from "@/components/resource/ResourceModal";
import {
  appliedWorkObjects,
  statusMeta,
  accessMeta,
  type Artefact,
  type AppliedWorkObject,
} from "@/data/artefacts";
import AppliedPreview from "@/components/proof/AppliedPreviews";

const ivory = (a: number) => `hsl(var(--ivory) / ${a})`;

const AccessIcon = ({
  kind,
  color,
  className,
}: {
  kind: "globe" | "layers" | "lock" | "sparkle";
  color: string;
  className?: string;
}) => {
  const props = { className, style: { color } } as const;
  if (kind === "globe") return <Globe {...props} />;
  if (kind === "layers") return <Layers {...props} />;
  if (kind === "lock") return <Lock {...props} />;
  return <Sparkles {...props} />;
};

const StatusBadge = ({ obj }: { obj: AppliedWorkObject }) => {
  const meta = obj.accessType ? accessMeta[obj.accessType] : null;
  const s = statusMeta[obj.status];
  const accent = meta?.accent ?? s.dot;
  const bg = meta?.background ?? ivory(0.04);
  const border = meta?.border ?? ivory(0.08);
  const iconKind = meta?.icon ?? (obj.status === "Protected" ? "lock" : "layers");
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2 py-1 rounded-sm"
      style={{ background: bg, border: `1px solid ${border}` }}
    >
      <AccessIcon kind={iconKind} color={accent} className="w-2.5 h-2.5" />
      <span
        className="text-[9px] tracking-[0.22em] uppercase font-display"
        style={{ color: ivory(0.78) }}
      >
        {obj.statusBadge}
      </span>
    </span>
  );
};

const ProofCard = ({
  obj,
  onOpen,
}: {
  obj: AppliedWorkObject;
  onOpen: (a: Artefact) => void;
}) => {
  return (
    <motion.button
      onClick={() => onOpen(obj)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group relative text-left w-full h-full overflow-hidden rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[hsl(var(--ivory)/0.35)]"
      style={{
        background:
          "linear-gradient(180deg, hsl(220 22% 9% / 0.92), hsl(220 24% 6% / 0.95))",
        border: `1px solid ${ivory(0.07)}`,
        boxShadow: "0 30px 80px -30px hsl(0 0% 0% / 0.7)",
      }}
    >
      {/* hairline reveal on hover */}
      <div className="absolute top-0 left-0 right-0 h-px overflow-hidden z-10">
        <div
          className="w-0 h-full transition-all duration-700 ease-out group-hover:w-full"
          style={{ background: `linear-gradient(to right, transparent, ${ivory(0.35)}, transparent)` }}
        />
      </div>

      <div className="flex flex-col h-full">
        {/* Preview area — taller so the full image shows crisp at 3-col widths */}
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <AppliedPreview
            kind={obj.appliedPreview}
            previewImage={obj.previewImage}
            previewAlt={obj.previewAlt}
            objectPosition={obj.previewObjectPosition}
            lazy
          />
          {/* bottom fade into card body */}
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-20 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, transparent, hsl(220 24% 6% / 0.9))",
            }}
          />
          {/* subtle pointer glare */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{
              background:
                "linear-gradient(115deg, transparent 35%, hsl(var(--ivory) / 0.06) 50%, transparent 65%)",
              mixBlendMode: "screen",
            }}
          />
        </div>

        {/* Text content */}
        <div className="p-5 md:p-6 flex flex-col flex-1">
          <div className="flex items-center justify-between mb-3 gap-3">
            <span
              className="text-[10px] tracking-[0.3em] font-display"
              style={{ color: ivory(0.45) }}
            >
              {obj.number}
            </span>
            <StatusBadge obj={obj} />
          </div>

          <h3
            className="font-display font-semibold leading-tight text-lg md:text-xl"
            style={{ color: ivory(0.95) }}
          >
            {obj.title}
          </h3>

          <p
            className="text-[10px] tracking-[0.22em] uppercase font-display mt-2"
            style={{ color: "hsl(var(--accent) / 0.85)" }}
          >
            {obj.context}
          </p>

          <p
            className="text-[13px] mt-3 leading-relaxed"
            style={{ color: ivory(0.7) }}
          >
            {obj.description}
          </p>

          <span
            className="inline-flex items-center gap-2 mt-auto pt-5 text-[11px] font-display tracking-[0.18em] uppercase opacity-75 group-hover:opacity-100 transition-all duration-500"
            style={{ color: ivory(0.85) }}
          >
            {obj.status === "Protected" && (
              <Lock className="w-3 h-3" style={{ color: ivory(0.55) }} />
            )}
            {obj.ctaLabel}
            <ArrowRight className="w-3 h-3 transition-transform duration-500 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </motion.button>
  );
};

const Legend = () => {
  const items: Array<{ label: string; status?: "Public" | "Protected" | "In Development"; isProtected?: boolean }> = [
    { label: "Public", status: "Public" },
    { label: "Internal", status: "In Development" },
    { label: "Protected", status: "Protected", isProtected: true },
    { label: "In Development", status: "In Development" },
  ];
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
      {items.map((it) => {
        const dot = it.status ? statusMeta[it.status].dot : ivory(0.4);
        return (
          <div key={it.label} className="flex items-center gap-1.5">
            {it.isProtected ? (
              <Lock className="w-2.5 h-2.5" style={{ color: dot }} />
            ) : (
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: dot }} />
            )}
            <span
              className="text-[9px] tracking-[0.28em] uppercase font-display"
              style={{ color: ivory(0.55) }}
            >
              {it.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

const SelectedArtefactsSection = () => {
  const [open, setOpen] = useState<Artefact | null>(null);

  return (
    <Scene
      tone="cinematic"
      spacing="xl"
      grain
      overlayGradient="radial-gradient(ellipse 90% 80% at 50% 20%, hsl(220 22% 9% / 0.6) 0%, hsl(var(--cinematic) / 0.95) 80%)"
      fadeTopFrom="hsl(var(--cinematic))"
      fadeBottomTo="hsl(var(--cinematic))"
      className="scene-atmos-archive"
      contentClassName="section-padding"
    >
      <div className="max-content relative">
        {/* Header row */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-10 md:mb-14">
          <div className="max-w-2xl">
            <Reveal>
              <span
                className="block text-[11px] tracking-[0.4em] uppercase font-display mb-5"
                style={{ color: ivory(0.5) }}
              >
                04 — Applied Work
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight"
                style={{ color: ivory(0.95) }}
              >
                Selected Applied Work
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p
                className="text-sm md:text-base mt-5 leading-relaxed max-w-xl"
                style={{ color: ivory(0.6) }}
              >
                Proof objects from applied performance nutrition — systems, tools
                and educational resources built to turn science into usable
                decisions.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.22}>
            <Legend />
          </Reveal>
        </div>

        {/* Unified grid — 3 columns × 2 rows on desktop, 2 on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {appliedWorkObjects.map((obj, i) => (
            <Reveal key={obj.slug} delay={(i % 3) * 0.06}>
              <ProofCard obj={obj} onOpen={setOpen} />
            </Reveal>
          ))}
        </div>

        {/* Footer note */}
        <Reveal delay={0.1}>
          <div
            className="mt-10 md:mt-12 rounded-sm px-5 md:px-7 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
            style={{
              background: ivory(0.02),
              border: `1px solid ${ivory(0.06)}`,
            }}
          >
            <div className="flex items-center gap-3">
              <Lock className="w-3 h-3 shrink-0" style={{ color: ivory(0.45) }} />
              <p className="text-xs md:text-sm" style={{ color: ivory(0.6) }}>
                Every object reflects applied experience in academy, senior
                football and performance environments.
              </p>
            </div>
            <p
              className="text-[10px] md:text-xs text-left md:text-right"
              style={{ color: ivory(0.45) }}
            >
              Public work is shared openly. Protected work stays protected.
            </p>
          </div>
        </Reveal>
      </div>

      <ResourceModal artefact={open} onClose={() => setOpen(null)} />
    </Scene>
  );
};

export default SelectedArtefactsSection;