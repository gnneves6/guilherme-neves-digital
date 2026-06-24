import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/Layout";
import Reveal from "@/components/Reveal";
import ResourceModal from "@/components/resource/ResourceModal";
import {
  artefacts,
  statusMeta,
  groupMeta,
  groupOrder,
  type Artefact,
  type ArtefactStatus,
  type ArtefactGroup,
} from "@/data/artefacts";
import { LINKS } from "@/data/links";

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
            <div className="h-1.5 w-1/2 rounded" style={{ background: "hsl(var(--ivory))" }} />
            <div className="h-px w-full mt-1" style={{ background: "hsl(var(--ivory) / 0.3)" }} />
            <div className="h-1 w-full rounded" style={{ background: "hsl(var(--ivory) / 0.7)" }} />
            <div className="h-1 w-5/6 rounded" style={{ background: "hsl(var(--ivory) / 0.7)" }} />
            <div className="h-1 w-2/3 rounded" style={{ background: "hsl(var(--ivory) / 0.7)" }} />
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
      {pt === "tableMockup" && (
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <div className="w-full max-w-[70%] opacity-15">
            <div className="space-y-1.5">
              <div className="flex gap-3">
                <div className="h-1 w-1/4 rounded" style={{ background: "hsl(var(--ivory))" }} />
                <div className="h-1 w-1/4 rounded" style={{ background: "hsl(var(--ivory))" }} />
                <div className="h-1 w-1/4 rounded" style={{ background: "hsl(var(--ivory))" }} />
              </div>
              <div className="h-px w-full" style={{ background: "hsl(var(--ivory) / 0.5)" }} />
              {[1, 2, 3].map((r) => (
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
      {pt === "seriesMockup" && (
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

type Filter = "All" | ArtefactGroup;

const filters: Filter[] = ["All", ...groupOrder];

const filterLabel = (f: Filter) => (f === "All" ? "All" : groupMeta[f].label);

const Work = () => {
  const [active, setActive] = useState<Filter>("All");
  const [hovered, setHovered] = useState<string | null>(null);
  const [open, setOpen] = useState<Artefact | null>(null);

  const visibleGroups = useMemo<ArtefactGroup[]>(
    () => (active === "All" ? groupOrder : [active]),
    [active]
  );

  const grouped = useMemo(() => {
    const map = {} as Record<ArtefactGroup, Artefact[]>;
    for (const g of groupOrder) map[g] = [];
    for (const a of artefacts) map[a.group].push(a);
    return map;
  }, []);

  const renderCard = (a: Artefact, i: number) => {
    const isHovered = hovered === a.slug;
    const hasHover = hovered !== null;
    const isReceded = hasHover && !isHovered;
    const s = statusMeta[a.status];
    const g = groupMeta[a.group];

    return (
      <motion.button
        key={a.slug}
        onClick={() => setOpen(a)}
        onMouseEnter={() => setHovered(a.slug)}
        onMouseLeave={() => setHovered(null)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isReceded ? 0.4 : 1, y: 0 }}
        transition={{ duration: 0.5, delay: i * 0.04 }}
        className="group block w-full text-left bg-background relative overflow-hidden"
      >
        <motion.div
          className="absolute top-0 left-0 right-0 h-px z-10"
          style={{ background: "hsl(var(--olive) / 0.6)", transformOrigin: "left" }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        />

        <CardPreview artefact={a} index={i} />

        <div className="p-7">
          <div className="flex items-center justify-between mb-4 gap-3">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: g.dot }} />
              <span className="text-[9px] tracking-[0.25em] uppercase font-display opacity-65">
                {g.short}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.dot }} />
              <span className="text-[9px] tracking-[0.25em] uppercase font-display opacity-55">
                {s.label}
              </span>
            </div>
          </div>
          <h3 className="font-display text-lg md:text-xl font-medium leading-snug">
            {a.title}
          </h3>
          <p className="text-sm mt-3 leading-relaxed opacity-65">{a.description}</p>
          <span className="inline-block mt-5 text-xs opacity-65 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-500">
            {a.ctaLabel} →
          </span>
        </div>
      </motion.button>
    );
  };

  return (
    <Layout>
      <section className="section-padding section-spacing">
        <div className="max-content">
          <Reveal>
            <p className="text-caption mb-6">Work</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-display max-w-4xl">
              Applied work from inside performance environments.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-body-lg max-w-xl mt-8">
              A curated archive of resources, frameworks and tools developed
              inside real engagements. Public artefacts are open. Protected work
              exists as proof — accessible on request. In-development tools accept
              early interest.
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

      {/* Group + status legend & filters */}
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
                  {filterLabel(f)}
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Vault — grouped */}
      <section className="section-padding py-16">
        <div className="max-content space-y-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="space-y-20"
            >
              {visibleGroups.map((gKey) => {
                const g = groupMeta[gKey];
                const items = grouped[gKey];
                if (items.length === 0) return null;
                return (
                  <section
                    key={gKey}
                    id={g.anchor}
                    className="scroll-mt-24"
                    aria-labelledby={`${g.anchor}-title`}
                  >
                    <div className="flex items-baseline justify-between mb-6 gap-4 flex-wrap">
                      <div className="flex items-baseline gap-3">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: g.dot }} />
                        <h2
                          id={`${g.anchor}-title`}
                          className="font-display text-xl md:text-2xl font-medium"
                        >
                          {g.label}
                        </h2>
                      </div>
                      <p className="text-xs md:text-sm opacity-60 max-w-md">
                        {g.description}
                      </p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border/50">
                      {items.map((a, i) => renderCard(a, i))}
                    </div>
                  </section>
                );
              })}
            </motion.div>
          </AnimatePresence>
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
              Building a performance environment? Some of this work is shared
              on request as part of an engagement conversation.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              to="/contact"
              className="group inline-flex items-center justify-center mt-8 px-10 py-4 bg-foreground text-background font-display text-sm font-medium tracking-wide transition-all duration-300 hover:opacity-85"
            >
              Enquire about an engagement
            </Link>
          </Reveal>
        </div>
      </section>

      <ResourceModal artefact={open} onClose={() => setOpen(null)} />
    </Layout>
  );
};

export default Work;
