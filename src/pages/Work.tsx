import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/Layout";
import Reveal from "@/components/Reveal";
import ResourceModal from "@/components/resource/ResourceModal";
import { artefacts, statusMeta, type Artefact, type ArtefactStatus } from "@/data/artefacts";
import { LINKS } from "@/data/links";

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

const CardPreview = ({ artefact, index }: { artefact: Artefact; index: number }) => {
  const pt = getPreviewType(artefact.status, artefact.category);
  return (
    <div className="aspect-[16/9] relative overflow-hidden" style={{ background: previewColors[pt] }}>
      {pt === "blurredProtected" && (
        <div className="absolute inset-0 backdrop-blur-[2px] flex items-center justify-center">
          <div className="space-y-1.5 text-center opacity-30">
            <div className="w-8 h-px mx-auto" style={{ background: "hsl(var(--ivory))" }} />
            <span className="text-[8px] tracking-[0.4em] uppercase font-display text-[hsl(var(--ivory))]">Protected</span>
            <div className="w-8 h-px mx-auto" style={{ background: "hsl(var(--ivory))" }} />
          </div>
        </div>
      )}
      {pt === "documentMockup" && (
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <div className="w-full max-w-[60%] space-y-2 opacity-20">
            <div className="h-1 w-3/4 rounded" style={{ background: "hsl(var(--ivory))" }} />
            <div className="h-1 w-full rounded" style={{ background: "hsl(var(--ivory))" }} />
            <div className="h-1 w-2/3 rounded" style={{ background: "hsl(var(--ivory))" }} />
          </div>
        </div>
      )}
      {pt === "toolMockup" && (
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <div className="w-full max-w-[70%] opacity-15">
            <div className="border rounded-sm p-3 space-y-2" style={{ borderColor: "hsl(var(--ivory) / 0.4)" }}>
              <div className="h-1 w-1/3 rounded" style={{ background: "hsl(var(--ivory))" }} />
              <div className="flex gap-2">
                <div className="h-6 flex-1 rounded-sm" style={{ background: "hsl(var(--ivory) / 0.15)" }} />
                <div className="h-6 flex-1 rounded-sm" style={{ background: "hsl(var(--ivory) / 0.1)" }} />
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="absolute inset-0 flex flex-col justify-between p-5">
        <span className="text-[9px] tracking-[0.4em] uppercase font-display text-[hsl(var(--ivory)/0.55)]">
          {artefact.category}
        </span>
        <span className="font-display text-5xl md:text-6xl font-bold leading-none text-[hsl(var(--ivory)/0.18)]">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
};

type Filter =
  | "All"
  | ArtefactStatus
  | "Education"
  | "Tools"
  | "Club Systems"
  | "Frameworks";

const filters: Filter[] = [
  "All",
  "Public",
  "Protected",
  "In Development",
  "Education",
  "Tools",
  "Club Systems",
  "Frameworks",
];

const matches = (a: Artefact, f: Filter) => {
  if (f === "All") return true;
  if (f === "Public" || f === "Protected" || f === "In Development")
    return a.status === f;
  if (f === "Education") return a.category === "Educational Series";
  if (f === "Tools")
    return a.category === "Applied Tool" || a.category === "Interactive Tool" || a.category === "FuelOps Tool";
  if (f === "Club Systems")
    return a.category === "Matchday System" || a.category === "Team Report" || a.category === "Athlete Resource";
  if (f === "Frameworks") return a.category === "Framework";
  return true;
};

const Work = () => {
  const [active, setActive] = useState<Filter>("All");
  const [hovered, setHovered] = useState<string | null>(null);
  const [open, setOpen] = useState<Artefact | null>(null);

  const filtered = useMemo(() => artefacts.filter((a) => matches(a, active)), [active]);

  const handleCardClick = (a: Artefact) => {
    setOpen(a);
  };

  return (
    <Layout>
      <section className="section-padding section-spacing">
        <div className="max-content">
          <Reveal>
            <p className="text-caption mb-6">Resource Vault</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-display max-w-4xl">Selected proof. Protected depth.</h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-body-lg max-w-xl mt-6">
              A curated archive of applied resources, frameworks and tools.
              Public artefacts are open. Protected work exists as proof —
              accessible on request. In-development tools accept early interest.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-body max-w-xl mt-3">
              The complete archive lives in{" "}
              <a
                href={LINKS.NOTION_PORTFOLIO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline hover:text-foreground transition-colors"
              >
                my Notion workspace →
              </a>
            </p>
          </Reveal>
        </div>
      </section>

      <div className="section-padding max-content">
        <div className="divider" />
      </div>

      {/* Status legend */}
      <section className="section-padding pt-10">
        <div className="max-content">
          <Reveal>
            <div className="flex flex-wrap gap-x-6 gap-y-2 mb-8">
              {(["Public", "Protected", "In Development", "Future Product"] as ArtefactStatus[]).map((s) => (
              {(["Public", "Protected", "In Development"] as ArtefactStatus[]).map((s) => (
              {(["Public", "Protected", "In Development"] as ArtefactStatus[]).map((s) => (
              {(["Public", "Protected", "In Development"] as ArtefactStatus[]).map((s) => (
                <div key={s} className="flex items-center gap-2">
            <div className="flex flex-wrap gap-x-6 gap-y-2 mb-8">
              {(["Public", "Protected", "In Development"] as ArtefactStatus[]).map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: statusMeta[s].dot }} />
                  <span className="text-[10px] tracking-[0.25em] uppercase font-display opacity-55">
                    {s}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
      {/* Status legend */}
      <section className="section-padding pt-10">
        <div className="max-content">
          <Reveal>
            <div className="flex flex-wrap gap-x-6 gap-y-2 mb-8">
              {(["Public", "Protected", "In Development"] as ArtefactStatus[]).map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: statusMeta[s].dot }} />
                  <span className="text-[10px] tracking-[0.25em] uppercase font-display opacity-55">
                    {s}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActive(f)}
                  className={`px-4 py-2 text-[11px] font-display tracking-wider uppercase transition-all duration-500 border ${
                    active === f
                      ? "bg-foreground text-background border-foreground"
                      : "bg-transparent text-muted-foreground/60 border-border/50 hover:border-foreground/25 hover:text-foreground"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Vault grid */}
      <section className="section-padding py-16">
        <div className="max-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border/50"
            >
              {filtered.map((a, i) => {
                const isHovered = hovered === a.slug;
                const hasHover = hovered !== null;
                const isReceded = hasHover && !isHovered;
                const s = statusMeta[a.status];

                return (
                  <motion.button
                    key={a.slug}
                    onClick={() => handleCardClick(a)}
                    onMouseEnter={() => setHovered(a.slug)}
                    onMouseLeave={() => setHovered(null)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isReceded ? 0.4 : 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.04 }}
                    className="group block w-full text-left bg-background relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute top-0 left-0 right-0 h-px"
                      style={{ background: "hsl(var(--olive) / 0.6)", transformOrigin: "left" }}
                      animate={{ scaleX: isHovered ? 1 : 0 }}
                      transition={{ duration: 0.5 }}
                    />

                    <CardPreview artefact={a} index={i} />

                    <div className="p-7">
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-[10px] tracking-widest uppercase font-display text-muted-foreground/50">
                          {a.type}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.dot }} />
                          <span className="text-[9px] tracking-[0.25em] uppercase font-display opacity-60">
                            {s.label}
                          </span>
                        </div>
                      </div>
                      <h3 className="font-display text-lg md:text-xl font-medium leading-snug">
                        {a.title}
                      </h3>
                      <p className="text-sm mt-3 leading-relaxed opacity-65">{a.description}</p>

                      <div className="mt-5 pt-5 border-t border-border/50">
                        <p className="text-[10px] tracking-widest uppercase font-display opacity-40 mb-1">
                          Proves
                        </p>
                        <p className="text-xs opacity-70">{a.whatItProves}</p>
                      </div>

                      <span className="inline-block mt-5 text-xs opacity-65 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-500">
                        {a.ctaLabel} →
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <p className="text-center text-sm opacity-50 py-20">
              No artefacts in this filter yet.
            </p>
          )}
        </div>
      </section>

      {/* CTA */}
      <div className="section-padding max-content">
        <div className="divider" />
      </div>
      <section className="section-padding section-spacing">
        <div className="max-content text-center">
          <Reveal>
            <p className="text-body-lg max-w-md mx-auto">
              Building a performance environment? Some of these resources are
              shared on request.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              to="/contact"
              className="group inline-flex items-center justify-center mt-8 px-12 py-4 bg-foreground text-background font-display text-sm font-medium tracking-wide transition-all duration-500 hover:tracking-wider"
            >
              Get in Touch
            </Link>
          </Reveal>
        </div>
      </section>

      <ResourceModal artefact={open} onClose={() => setOpen(null)} />
    </Layout>
  );
};

export default Work;
