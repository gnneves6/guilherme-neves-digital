import { Link } from "react-router-dom";
import { useState } from "react";
import Scene from "@/components/journey/Scene";
import ParallaxLayer from "@/components/journey/ParallaxLayer";
import TitleCard from "@/components/journey/TitleCard";
import Spotlight from "@/components/journey/Spotlight";
import ProofObjectCard from "@/components/proof/ProofObjectCard";
import ResourceModal from "@/components/resource/ResourceModal";
import { featuredArtefacts, statusMeta, groupMeta, type Artefact, type ArtefactStatus } from "@/data/artefacts";
import type { ProofObjectType } from "@/components/proof/ProofObjectTypes";
import sceneProofArchive from "@/assets/scene-proof-archive.jpg";
import proofObjectAtlas from "@/assets/proof-object-atlas.jpg";

const getProofType = (status: ArtefactStatus, category: string): ProofObjectType => {
  if (status === "Protected") return "protected";
  if (["Interactive Tool", "FuelOps Tool", "Monitoring Tool", "Product"].includes(category)) return "tool";
  return "document";
};

const SceneArchive = ({ index = 3 }: { index?: number }) => {
  const [open, setOpen] = useState<Artefact | null>(null);
  // Cinematic table: show first 4 objects on the journey; full vault stays linked
  const items = featuredArtefacts.slice(0, 4);

  return (
    <Scene
      index={index}
      bgImage={sceneProofArchive}
      bgFilter="brightness(0.3) contrast(1.15) saturate(0.6)"
      tone="hsl(var(--cinematic))"
      overlay="radial-gradient(ellipse 80% 70% at 50% 40%, hsl(var(--cinematic) / 0.55) 0%, hsl(var(--cinematic) / 0.92) 80%)"
      zoomFrom={1.1}
      zoomTo={0.98}
    >
      <Spotlight color="hsl(var(--ivory) / 0.08)" size={680} follow={26} />
      <div className="absolute inset-0 section-padding overflow-y-auto">
        <div className="max-content w-full py-16 lg:py-24">
          <TitleCard number="04" label="Selected proof" tone="dark" className="mb-8" />
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-[hsl(var(--ivory))] max-w-xl">
                Selected proof. Protected depth. Tools in development.
              </h2>
              <p className="text-sm md:text-base mt-4 max-w-lg" style={{ color: "hsl(var(--ivory) / 0.55)" }}>
                Hover to lift an object off the table. Public shows clarity, protected shows depth, tools show where this is going.
              </p>
            </div>
            <Link
              to="/work"
              className="text-sm link-underline font-display tracking-wide whitespace-nowrap"
              style={{ color: "hsl(var(--ivory) / 0.7)" }}
            >
              Open Resource Vault →
            </Link>
          </div>
          <ParallaxLayer strength={10}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {items.map((a, i) => {
                const s = statusMeta[a.status];
                const g = groupMeta[a.group];
                const t = getProofType(a.status, a.category);
                const rot = [-1.4, 1.2, -0.8, 1.6][i] ?? 0;
                const lift = [0, 22, 0, 18][i] ?? 0;
                return (
                  <div key={a.slug} style={{ transform: `translateY(${lift}px)` }}>
                    <ProofObjectCard
                      index={i}
                      type={t}
                      title={a.title}
                      description={a.description}
                      category={a.category}
                      ctaLabel={a.ctaLabel}
                      cover={a.previewImage ?? (t !== "protected" ? proofObjectAtlas : undefined)}
                      meta={{
                        groupShort: g.short,
                        groupDot: g.dot,
                        statusLabel: s.label,
                        statusDot: s.dot,
                      }}
                      onClick={() => setOpen(a)}
                      rotate={rot}
                      z={i % 2 === 0 ? 1 : 2}
                    />
                  </div>
                );
              })}
            </div>
          </ParallaxLayer>
        </div>
      </div>
      <ResourceModal artefact={open} onClose={() => setOpen(null)} />
    </Scene>
  );
};

export default SceneArchive;
