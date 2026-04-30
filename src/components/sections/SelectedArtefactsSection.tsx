import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import Reveal from "@/components/Reveal";
import ResourceModal from "@/components/resource/ResourceModal";
import { featuredArtefacts, statusMeta, type Artefact, type ArtefactStatus } from "@/data/artefacts";

// Preview type system
type PreviewType = "editorialPlaceholder" | "blurredProtected" | "toolMockup" | "documentMockup";

const getPreviewType = (status: ArtefactStatus, category: string): PreviewType => {
  if (status === "Protected") return "blurredProtected";
  if (category === "Interactive Tool" || category === "FuelOps Tool") return "toolMockup";
  if (category === "Educational Series" || category === "Matchday System" || category === "Applied Tool") return "documentMockup";
  return "editorialPlaceholder";
};

const previewColors: Record<PreviewType, string> = {
  editorialPlaceholder: "hsl(155, 18%, 22%)",
  blurredProtected: "hsl(220, 14%, 18%)",
  toolMockup: "hsl(40, 28%, 28%)",
  documentMockup: "hsl(35, 22%, 38%)",
};

const ArtefactPreview = ({ artefact, index }: { artefact: Artefact; index: number }) => {
  const previewType = getPreviewType(artefact.status, artefact.category);
  const bg = previewColors[previewType];

  return (
    <div className="relative aspect-[16/9] overflow-hidden" style={{ background: bg }}>
      {previewType === "blurredProtected" && (
        <div className="absolute inset-0 backdrop-blur-[2px] flex items-center justify-center">
          <div className="space-y-1.5 text-center opacity-30">
            <div className="w-8 h-px mx-auto" style={{ background: "hsl(var(--ivory))" }} />
            <span className="text-[8px] tracking-[0.4em] uppercase font-display text-[hsl(var(--ivory))]">Protected</span>
            <div className="w-8 h-px mx-auto" style={{ background: "hsl(var(--ivory))" }} />
          </div>
        </div>
      )}
      {previewType === "documentMockup" && (
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <div className="w-full max-w-[60%] space-y-2 opacity-20">
            <div className="h-1 w-3/4 rounded" style={{ background: "hsl(var(--ivory))" }} />
            <div className="h-1 w-full rounded" style={{ background: "hsl(var(--ivory))" }} />
            <div className="h-1 w-2/3 rounded" style={{ background: "hsl(var(--ivory))" }} />
            <div className="h-px w-full mt-3" style={{ background: "hsl(var(--ivory) / 0.3)" }} />
            <div className="h-1 w-5/6 rounded" style={{ background: "hsl(var(--ivory))" }} />
            <div className="h-1 w-1/2 rounded" style={{ background: "hsl(var(--ivory))" }} />
          </div>
        </div>
      )}
      {previewType === "toolMockup" && (
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <div className="w-full max-w-[70%] opacity-15">
            <div className="border rounded-sm p-3 space-y-2" style={{ borderColor: "hsl(var(--ivory) / 0.4)" }}>
              <div className="h-1 w-1/3 rounded" style={{ background: "hsl(var(--ivory))" }} />
              <div className="flex gap-2">
                <div className="h-6 flex-1 rounded-sm" style={{ background: "hsl(var(--ivory) / 0.15)" }} />
                <div className="h-6 flex-1 rounded-sm" style={{ background: "hsl(var(--ivory) / 0.1)" }} />
              </div>
              <div className="h-1 w-1/2 rounded" style={{ background: "hsl(var(--ivory))" }} />
            </div>
          </div>
        </div>
      )}
      <div className="absolute inset-0 flex flex-col justify-between p-5">
        <span className="text-[9px] tracking-[0.4em] uppercase font-display text-[hsl(var(--ivory)/0.5)]">
          {artefact.category}
        </span>
        <span className="font-display text-5xl md:text-6xl font-bold leading-none text-[hsl(var(--ivory)/0.12)]">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
};

const SelectedArtefactsSection = () => {
  const [open, setOpen] = useState<Artefact | null>(null);

  return (
    <section className="section-padding section-spacing section-dark">
      <div className="max-content">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <Reveal>
              <p className="text-caption mb-4">Selected Artefacts</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-[hsl(var(--ivory))] max-w-xl">
                Real systems, applied in real environments.
              </h2>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="text-sm md:text-base mt-5 max-w-lg" style={{ color: "hsl(var(--ivory) / 0.55)" }}>
                Curated proof — public previews, protected work and tools in development.
                Enough to trust. Enough to want more.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <Link
              to="/work"
              className="text-sm link-underline font-display tracking-wide whitespace-nowrap"
              style={{ color: "hsl(var(--ivory) / 0.7)" }}
            >
              Open Resource Vault →
            </Link>
          </Reveal>
        </div>

        <div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px"
          style={{ background: "hsl(var(--ivory) / 0.06)" }}
        >
          {featuredArtefacts.map((a, i) => {
            const s = statusMeta[a.status];
            const handleClick = () => {
              if (a.ctaType === "view" && a.externalUrl) {
                window.open(a.externalUrl, "_blank", "noopener,noreferrer");
              } else {
                setOpen(a);
              }
            };
            return (
              <Reveal key={a.slug} delay={i * 0.06}>
                <motion.button
                  onClick={handleClick}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  className="block w-full text-left group relative overflow-hidden h-full"
                  style={{ background: "hsl(var(--charcoal-deep))" }}
                >
                  <div className="absolute top-0 left-0 right-0 h-px z-10 overflow-hidden">
                    <div
                      className="w-0 h-full group-hover:w-full transition-all duration-700 ease-out"
                      style={{ background: "hsl(var(--ivory) / 0.22)" }}
                    />
                  </div>

                  <ArtefactPreview artefact={a} index={i} />

                  <div className="p-7 md:p-8">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-[10px] tracking-widest uppercase font-display text-[hsl(var(--ivory)/0.35)]">
                        {a.type}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.dot }} />
                        <span className="text-[9px] tracking-[0.25em] uppercase font-display text-[hsl(var(--ivory)/0.55)]">
                          {s.label}
                        </span>
                      </div>
                    </div>

                    <h3
                      className="font-display text-lg md:text-xl font-medium leading-snug"
                      style={{ color: "hsl(var(--ivory) / 0.95)" }}
                    >
                      {a.title}
                    </h3>
                    <p className="text-sm mt-3 leading-relaxed" style={{ color: "hsl(var(--ivory) / 0.55)" }}>
                      {a.description}
                    </p>

                    <span
                      className="inline-block mt-6 text-xs opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-500"
                      style={{ color: "hsl(var(--ivory) / 0.85)" }}
                    >
                      {a.ctaLabel} →
                    </span>
                  </div>
                </motion.button>
              </Reveal>
            );
          })}
        </div>
      </div>

      <ResourceModal artefact={open} onClose={() => setOpen(null)} />
    </section>
  );
};

export default SelectedArtefactsSection;