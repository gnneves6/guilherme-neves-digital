import { Link } from "react-router-dom";
import { useState } from "react";
import Reveal from "@/components/Reveal";
import Chapter from "@/components/motion/Chapter";
import ResourceModal from "@/components/resource/ResourceModal";
import { featuredArtefacts, statusMeta, groupMeta, type Artefact, type ArtefactStatus } from "@/data/artefacts";
import ProofObjectCard from "@/components/proof/ProofObjectCard";
import type { ProofObjectType } from "@/components/proof/ProofObjectTypes";

/** Map artefact status/category to the new ProofObject type system. */
const getProofType = (status: ArtefactStatus, category: string): ProofObjectType => {
  if (status === "Protected") return "protected";
  if (
    category === "Interactive Tool" ||
    category === "FuelOps Tool" ||
    category === "Monitoring Tool" ||
    category === "Product"
  )
    return "tool";
  return "document";
};

/** Placeholder cover slot — atmospheric editorial mark, used until real cover assets land. */
const StageFallback = () => (
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="space-y-1.5 text-center opacity-20">
      <div className="w-10 h-px mx-auto" style={{ background: "hsl(var(--ivory))" }} />
      <span className="text-[8px] tracking-[0.45em] uppercase font-display text-[hsl(var(--ivory))]">
        Proof Object
      </span>
      <div className="w-10 h-px mx-auto" style={{ background: "hsl(var(--ivory))" }} />
    </div>
  </div>
);

const SelectedArtefactsSection = () => {
  const [open, setOpen] = useState<Artefact | null>(null);

  return (
    <section className="section-padding section-spacing scene-cinematic relative overflow-hidden">
      {/* Top dissolve from light scene above */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-32 z-[1] pointer-events-none"
        style={{ background: "linear-gradient(to bottom, hsl(var(--background)), transparent)" }}
      />
      <div className="max-content relative z-[2]">
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
            const proofType = getProofType(a.status, a.category);
            return (
              <Reveal key={a.slug} delay={i * 0.06}>
                <ProofObjectCard
                  index={i}
                  type={proofType}
                  title={a.title}
                  description={a.description}
                  category={a.category}
                  ctaLabel={a.ctaLabel}
                  cover={a.previewImage}
                  stageFallback={<StageFallback />}
                  meta={{
                    groupShort: g.short,
                    groupDot: g.dot,
                    statusLabel: s.label,
                    statusDot: s.dot,
                  }}
                  onClick={() => setOpen(a)}
                />
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