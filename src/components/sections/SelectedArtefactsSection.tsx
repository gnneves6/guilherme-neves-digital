import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import Reveal from "@/components/Reveal";
import Chapter from "@/components/motion/Chapter";
import Magnetic from "@/components/motion/Magnetic";
import ResourceModal from "@/components/resource/ResourceModal";
import { featuredArtefacts, statusMeta, groupMeta, type Artefact, type ArtefactStatus } from "@/data/artefacts";

// Preview type system
type PreviewType = "editorialPlaceholder" | "blurredProtected" | "toolMockup" | "documentMockup" | "tableMockup" | "seriesMockup";

const getPreviewType = (status: ArtefactStatus, category: string): PreviewType => {
  if (status === "Protected") return "blurredProtected";
  if (category === "Interactive Tool" || category === "FuelOps Tool") return "toolMockup";
  if (category === "Educational Series") return "seriesMockup";
  if (category === "Matchday System" || category === "Framework") return "documentMockup";
  if (category === "Applied Tool" || category === "Athlete Resource") return "tableMockup";
  return "editorialPlaceholder";
};

const previewColors: Record<PreviewType, string> = {
  editorialPlaceholder: "hsl(155, 18%, 22%)",
  blurredProtected: "hsl(220, 14%, 18%)",
  toolMockup: "hsl(40, 28%, 28%)",
  documentMockup: "hsl(35, 22%, 38%)",
  tableMockup: "hsl(155, 15%, 25%)",
  seriesMockup: "hsl(30, 20%, 30%)",
};

const ArtefactPreview = ({ artefact, index }: { artefact: Artefact; index: number }) => {
  const previewType = getPreviewType(artefact.status, artefact.category);
  const bg = previewColors[previewType];

  return (
    <div className="relative aspect-[16/9] overflow-hidden" style={{ background: bg }}>
      {/* Inner visual gets a subtle parallax-on-hover lift via parent group */}
      <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04] will-change-transform">
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
            <div className="h-1.5 w-1/2 rounded" style={{ background: "hsl(var(--ivory))" }} />
            <div className="h-px w-full mt-1" style={{ background: "hsl(var(--ivory) / 0.3)" }} />
            <div className="h-1 w-full rounded" style={{ background: "hsl(var(--ivory) / 0.7)" }} />
            <div className="h-1 w-5/6 rounded" style={{ background: "hsl(var(--ivory) / 0.7)" }} />
            <div className="h-1 w-2/3 rounded" style={{ background: "hsl(var(--ivory) / 0.7)" }} />
            <div className="h-px w-full mt-2" style={{ background: "hsl(var(--ivory) / 0.3)" }} />
            <div className="h-1 w-4/5 rounded" style={{ background: "hsl(var(--ivory) / 0.5)" }} />
            <div className="h-1 w-1/2 rounded" style={{ background: "hsl(var(--ivory) / 0.5)" }} />
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
      {previewType === "tableMockup" && (
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <div className="w-full max-w-[70%] opacity-15">
            <div className="space-y-1.5">
              <div className="flex gap-3">
                <div className="h-1 w-1/4 rounded" style={{ background: "hsl(var(--ivory))" }} />
                <div className="h-1 w-1/4 rounded" style={{ background: "hsl(var(--ivory))" }} />
                <div className="h-1 w-1/4 rounded" style={{ background: "hsl(var(--ivory))" }} />
              </div>
              <div className="h-px w-full" style={{ background: "hsl(var(--ivory) / 0.5)" }} />
              {[1, 2, 3, 4].map((r) => (
                <div key={r} className="flex gap-3">
                  <div className="h-1 w-1/4 rounded" style={{ background: "hsl(var(--ivory) / 0.6)" }} />
                  <div className="h-1 w-1/4 rounded" style={{ background: "hsl(var(--ivory) / 0.4)" }} />
                  <div className="h-1 w-1/4 rounded" style={{ background: "hsl(var(--ivory) / 0.4)" }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {previewType === "seriesMockup" && (
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="flex gap-2 opacity-[0.18]">
            {["A", "B", "C"].map((letter) => (
              <div
                key={letter}
                className="w-12 h-16 md:w-14 md:h-20 rounded-sm flex items-center justify-center border"
                style={{ borderColor: "hsl(var(--ivory) / 0.3)", background: "hsl(var(--ivory) / 0.05)" }}
              >
                <span className="font-display text-lg md:text-xl font-bold" style={{ color: "hsl(var(--ivory) / 0.6)" }}>
                  {letter}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      </div>
      {/* Subtle inner vignette for depth */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 60%, transparent 0%, hsl(var(--charcoal-deep) / 0.45) 100%)",
        }}
      />
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
        <Reveal>
          <Chapter
            number="04"
            title="Selected proof."
            tone="dark"
            className="mb-10 md:mb-14"
          />
        </Reveal>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <Reveal delay={0.1}>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-[hsl(var(--ivory))] max-w-xl">
                Selected proof. Protected depth. Tools in development.
              </h2>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="text-sm md:text-base mt-5 max-w-lg" style={{ color: "hsl(var(--ivory) / 0.55)" }}>
                Public resources show clarity. Protected casework shows depth.
                Tools show where this is going next.
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
            const g = groupMeta[a.group];
            const handleClick = () => {
              setOpen(a);
            };
            return (
              <Reveal key={a.slug} delay={i * 0.06}>
                <Magnetic strength={6} className="h-full">
                <motion.button
                  onClick={handleClick}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="block w-full text-left group relative overflow-hidden h-full transition-shadow duration-500 hover:shadow-[0_24px_60px_-20px_hsl(0_0%_0%/0.55)]"
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
                    <div className="flex items-center justify-between mb-4 gap-3">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: g.dot }} />
                        <span className="text-[9px] tracking-[0.25em] uppercase font-display text-[hsl(var(--ivory)/0.6)]">
                          {g.short}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.dot }} />
                        <span className="text-[9px] tracking-[0.25em] uppercase font-display text-[hsl(var(--ivory)/0.5)]">
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
                </Magnetic>
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