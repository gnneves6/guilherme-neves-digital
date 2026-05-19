import { Link } from "react-router-dom";
import { useState } from "react";
import Reveal from "@/components/Reveal";
import Chapter from "@/components/motion/Chapter";
import ResourceModal from "@/components/resource/ResourceModal";
import { featuredArtefacts, statusMeta, groupMeta, type Artefact, type ArtefactStatus } from "@/data/artefacts";
import ProofObjectCard from "@/components/proof/ProofObjectCard";
import type { ProofObjectType } from "@/components/proof/ProofObjectTypes";
import Scene from "@/components/motion/Scene";

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

const SelectedArtefactsSection = () => {
  const [open, setOpen] = useState<Artefact | null>(null);

  return (
    <Scene
      tone="cinematic"
      spacing="xl"
      grain
      parallax={0.15}
      fadeTopFrom="hsl(var(--background))"
      className="scene-atmos-archive"
      contentClassName="section-padding"
    >
      <div className="max-content relative">
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
    </Scene>
  );
};

export default SelectedArtefactsSection;