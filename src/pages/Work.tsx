import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import Reveal from "@/components/Reveal";
import ResourceModal from "@/components/resource/ResourceModal";
import {
  artefacts,
  appliedWorkObjects,
  statusMeta,
  groupMeta,
  type Artefact,
  type ArtefactStatus,
} from "@/data/artefacts";
import Magnetic from "@/components/motion/Magnetic";
import {
  nodeOf,
  maturityMeta,
  fieldNotes,
  environmentMeta,
  workByTopic,
  topicMeta,
  topicOrder,
  type Topic,
} from "@/data/work-graph";

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
  blurredProtected: "hsl(45, 10%, 18%)",
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

type Filter = "All" | Topic;

const filters: Filter[] = ["All", ...topicOrder];

const filterLabel = (f: Filter) => (f === "All" ? "All" : topicMeta[f].label);

const Work = () => {
  const [active, setActive] = useState<Filter>("All");
  const [hovered, setHovered] = useState<string | null>(null);
  const [open, setOpen] = useState<Artefact | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  // Deep link from elsewhere on the site (a Fuel Law citing the work that
  // proves it) opens that artefact directly, so the connection is followable
  // rather than decorative.
  useEffect(() => {
    const slug = searchParams.get("a");
    if (!slug) return;
    const match =
      artefacts.find((x) => x.slug === slug) ??
      appliedWorkObjects.find((x) => x.slug === slug);
    if (match) setOpen(match);
    searchParams.delete("a");
    setSearchParams(searchParams, { replace: true });
  }, [searchParams, setSearchParams]);

  const visibleTopics = useMemo<Topic[]>(
    () => (active === "All" ? topicOrder : [active]),
    [active]
  );

  // One catalogue, organised by area of practice. Everything the site holds
  // lives here, including the applied systems that used to sit in a separate
  // collection of their own.
  const grouped = useMemo(() => {
    const map = {} as Record<Topic, Artefact[]>;
    for (const t of topicOrder) map[t] = workByTopic(t);
    return map;
  }, []);

  const renderCard = (a: Artefact, i: number) => {
    const isHovered = hovered === a.slug;
    const hasHover = hovered !== null;
    const isReceded = hasHover && !isHovered;
    const s = statusMeta[a.status];
    const g = groupMeta[a.group];
    const node = nodeOf(a.slug);
    const rung = node ? maturityMeta[node.maturity] : undefined;

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
            {/* The card already sits under its group heading, so the group
                name would only repeat itself. Where it stands on the making
                ladder is the thing the reader does not already know. */}
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: g.dot }} />
              <span className="text-[9px] tracking-[0.25em] uppercase font-display opacity-65">
                {rung ? rung.label : g.short}
              </span>
            </div>
            {s.label !== g.short && (
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.dot }} />
                <span className="text-[9px] tracking-[0.25em] uppercase font-display opacity-55">
                  {s.label}
                </span>
              </div>
            )}
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
      <SEO title="Work, Guilherme Neves" description="Systems, tools and resources built inside real performance environments, grouped by the problem they solve." path="/work" />
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
              inside real engagements. Public artefacts are open.{" "}
              <span className="text-foreground font-medium">Protected work exists as proof</span>,
              shown privately when it's relevant.
            </p>
          </Reveal>
          {/* The free thing, offered where someone is already browsing the
              work rather than buried in the footer. */}
          <Reveal delay={0.3}>
            <Link
              to="/fuel-laws"
              className="inline-flex items-center gap-2 mt-6 font-display text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              Start with the five fuel laws
              <span aria-hidden>→</span>
            </Link>
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
                    {statusMeta[s].label}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <p
              className="text-body text-sm max-w-2xl mb-8 leading-relaxed"
              style={{ color: "hsl(var(--muted-foreground))" }}
            >
              Some of the sharpest proof stays behind a line, because it belongs to
              the athletes and clubs it was built for. What's here is the structure
              and the standard. The detail is walked through privately, when it's
              relevant.
            </p>
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

      {/* Vault, grouped */}
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
              {visibleTopics.map((tKey, ti) => {
                const t = topicMeta[tKey];
                const items = grouped[tKey];
                if (items.length === 0) return null;
                const anchor = `topic-${tKey}`;
                return (
                  <section
                    key={tKey}
                    id={anchor}
                    className="scroll-mt-24"
                    aria-labelledby={`${anchor}-title`}
                  >
                    <div className="flex items-baseline justify-between mb-7 gap-4 flex-wrap">
                      <div className="flex items-baseline gap-4">
                        <span className="text-caption text-[10px] opacity-40 tabular-nums">
                          {String(ti + 1).padStart(2, "0")}
                        </span>
                        <h2
                          id={`${anchor}-title`}
                          className="font-display text-xl md:text-2xl font-medium"
                        >
                          {t.label}
                        </h2>
                        <span className="text-caption text-[10px] opacity-40">
                          {items.length}
                        </span>
                      </div>
                      <p className="text-xs md:text-sm opacity-60 max-w-md">
                        {t.description}
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

      {/* Field notes, the raw end of the ladder. Kept deliberately plain:
          these are observations, not products, and dressing them up as
          cards would misrepresent what they are. Renders nothing until
          there is something to show. */}
      {fieldNotes.length > 0 && (
        <section className="section-padding pb-4">
          <div className="max-content">
            <Reveal>
              <div className="flex items-baseline justify-between gap-4 mb-8">
                <p className="text-caption">From the floor</p>
                <span className="text-caption text-[10px] opacity-50">
                  {fieldNotes.length} {fieldNotes.length === 1 ? "note" : "notes"}
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-body max-w-xl mb-10">
                Observations caught inside real environments, kept raw on purpose.
                Some stay notes. Some become the systems above.
              </p>
            </Reveal>
            <ul className="max-w-3xl">
              {fieldNotes.map((n, i) => (
                <Reveal key={n.slug} delay={0.05 * i}>
                  <li
                    className="py-6 grid sm:grid-cols-[1fr,auto] gap-x-8 gap-y-2 items-baseline"
                    style={{ borderTop: "1px solid hsl(var(--subtle-border))" }}
                  >
                    <div>
                      <h3 className="font-display text-base font-medium text-foreground">
                        {n.title}
                      </h3>
                      <p className="text-body text-sm mt-1.5">{n.body}</p>
                    </div>
                    <span className="text-caption text-[10px] opacity-55 whitespace-nowrap">
                      {environmentMeta[n.environment].short}
                    </span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

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
            <Magnetic as="span" strength={7} className="mt-8">
              <Link
                to="/contact"
                className="group inline-flex items-center justify-center px-10 py-4 bg-foreground text-background font-display text-sm font-medium tracking-wide transition-all duration-300 hover:opacity-85"
              >
                Enquire about an engagement
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </section>

      <ResourceModal artefact={open} onClose={() => setOpen(null)} />
    </Layout>
  );
};

export default Work;
