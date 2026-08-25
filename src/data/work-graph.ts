import { artefacts, appliedWorkObjects, type Artefact } from "@/data/artefacts";

/* ═══════════════════════════════════════════════════════════════════
   THE WORK GRAPH

   One file that holds every connection in the practice. Entries live in
   artefacts.ts; this is the connective tissue between them.

   Adding a new piece of work is a single block here. It then appears
   automatically under its laws, inside its environment, and in the
   lineage of whatever it grew out of. Nothing else needs redesigning,
   which is why the site gets denser over time without lurching.

   Three axes:
     laws         which fuel law the piece proves (the spine)
     maturity     how far up the making ladder it sits
     environment  where in the practice it actually came from
     grewFrom     the earlier pieces it developed out of (lineage)
   ═══════════════════════════════════════════════════════════════════ */

/**
 * The making ladder, from a thought caught on the touchline to something
 * a staff can operate. Everything is allowed in at any stage, because a
 * practice that only shows finished objects looks smaller than it is.
 */
export type Maturity =
  | "note"    // raw, caught in the field
  | "idea"    // shaped thinking, not yet made
  | "visual"  // a single image or diagram
  | "series"  // a carousel or multi-part explanation
  | "guide"   // a finished document someone can read
  | "system"  // a protocol a staff actually runs
  | "tool";   // operational, someone uses it to do the work

export type EnvironmentId = "anderlecht" | "leca" | "r4e" | "independent";

/**
 * Areas of practice. These are the top level of the work: a visitor should
 * meet the problem being solved before meeting the format it was solved in.
 * A system, the guide behind it and the tool that came out of it belong
 * together under one heading, rather than scattered across separate
 * catalogues by how finished or how public they happen to be.
 */
export type Topic =
  | "matchday"
  | "hydration"
  | "composition"
  | "environment"
  | "education"
  | "framework";

export const topicMeta: Record<Topic, { label: string; description: string; order: number }> = {
  matchday: {
    label: "Matchday Fuelling",
    description: "From MD-1 through kick-off to recovery, built to hold when the week gets loud.",
    order: 1,
  },
  hydration: {
    label: "Hydration",
    description: "Sweat losses, sodium and individual protocols, monitored rather than guessed.",
    order: 2,
  },
  composition: {
    label: "Body Composition & Monitoring",
    description: "Reading the athlete over time, and turning that reading into decisions staff can act on.",
    order: 3,
  },
  environment: {
    label: "The Food Environment",
    description: "Catering, structure and daily availability, because what is within reach decides most of it.",
    order: 4,
  },
  education: {
    label: "Athlete Education",
    description: "Making the science stick in language an athlete repeats without being asked.",
    order: 5,
  },
  framework: {
    label: "Framework & Products",
    description: "The operating system underneath the work, and what is being built on top of it.",
    order: 6,
  },
};

export const topicOrder: Topic[] = (Object.keys(topicMeta) as Topic[]).sort(
  (a, b) => topicMeta[a].order - topicMeta[b].order
);

export interface WorkNode {
  topic: Topic;
  laws: number[];
  maturity: Maturity;
  environment: EnvironmentId;
  grewFrom?: string[];
}

/**
 * Maturity metadata. `intent` is deliberately part of the ladder rather
 * than a separate marketing layer: what a visitor should be invited to do
 * is a property of how finished a piece is, not a banner bolted on later.
 */
export const maturityMeta: Record<
  Maturity,
  { label: string; order: number; note: string; intent: "follow" | "take" | "prove" | "waitlist" }
> = {
  note:   { label: "Field note", order: 1, note: "Caught in the environment, kept deliberately raw.", intent: "follow" },
  idea:   { label: "Idea",       order: 2, note: "Shaped thinking, not yet built.",                   intent: "follow" },
  visual: { label: "Visual",     order: 3, note: "One image doing the explaining.",                   intent: "take" },
  series: { label: "Series",     order: 4, note: "A sequence built to be remembered.",                intent: "take" },
  guide:  { label: "Guide",      order: 5, note: "Finished, and made to be kept.",                    intent: "take" },
  system: { label: "System",     order: 6, note: "Run by staff inside a real environment.",           intent: "prove" },
  tool:   { label: "Tool",       order: 7, note: "Operational, used to do the work.",                 intent: "waitlist" },
};

export const environmentMeta: Record<EnvironmentId, { label: string; short: string }> = {
  anderlecht:  { label: "RSC Anderlecht", short: "Anderlecht" },
  leca:        { label: "Leça FC", short: "Leça FC" },
  r4e:         { label: "Run4Excellence", short: "Run4Excellence" },
  independent: { label: "Independent practice", short: "Independent" },
};

/**
 * The graph itself.
 *
 * Environments are seeded from the focus areas recorded in
 * src/data/experiences.ts (hydration and matchday fuelling at Anderlecht,
 * body composition and practical fuelling at Leça). Lineage is seeded only
 * where one piece is plainly a later form of another. Both are claims about
 * a real career, so they are meant to be corrected by Guilherme, not
 * treated as settled.
 */
const curatedGraph: Record<string, WorkNode> = {
  // ── Public education ──────────────────────────────────────────────
  "abc-of-football-nutrition": {
    topic: "education", laws: [1, 2], maturity: "series", environment: "independent",
  },
  "supplementation-elite-football": {
    topic: "education", laws: [1, 5], maturity: "visual", environment: "anderlecht",
  },
  "why-players-cramp": {
    topic: "hydration", laws: [1, 4], maturity: "series", environment: "anderlecht",
    grewFrom: ["hydration-sweat-testing-framework"],
  },
  "athletes-food-pyramid": {
    topic: "environment", laws: [2], maturity: "visual", environment: "independent",
  },
  "football-nutrition-education-tools": {
    topic: "education", laws: [1, 2], maturity: "series", environment: "leca",
    grewFrom: ["abc-of-football-nutrition"],
  },

  // ── Written and structural work ───────────────────────────────────
  "md-1-fuel-system": {
    topic: "matchday", laws: [1, 5], maturity: "guide", environment: "anderlecht",
  },
  "athlete-equivalent-bank": {
    topic: "environment", laws: [2], maturity: "guide", environment: "leca",
  },
  "football-nutrition-atlas": {
    topic: "framework", laws: [1, 2], maturity: "guide", environment: "independent",
  },
  "athlete-orientation": {
    topic: "composition", laws: [2], maturity: "guide", environment: "leca",
  },
  "team-monitoring-report": {
    topic: "composition", laws: [2, 4], maturity: "guide", environment: "leca",
  },

  // ── Systems run inside environments ───────────────────────────────
  "matchday-fuel-system": {
    topic: "matchday", laws: [1, 5], maturity: "system", environment: "anderlecht",
    grewFrom: ["md-1-fuel-system"],
  },
  "hydration-sweat-testing-framework": {
    topic: "hydration", laws: [4], maturity: "system", environment: "anderlecht",
  },
  "body-composition-monitoring": {
    topic: "composition", laws: [2], maturity: "system", environment: "leca",
  },
  "food-environment-catering": {
    topic: "environment", laws: [2], maturity: "system", environment: "anderlecht",
  },

  // ── Tools ─────────────────────────────────────────────────────────
  "fuelops-ai": {
    topic: "framework", laws: [1, 2], maturity: "tool", environment: "independent",
    grewFrom: ["matchday-fuel-system", "hydration-sweat-testing-framework"],
  },
};

/* ═══════════════════════════════════════════════════════════════════
   FIELD NOTES, the low end of the ladder

   A thought caught in an environment is worth keeping long before it is
   worth designing. Notes need none of the apparatus a finished artefact
   needs (no preview art, no access flow), so they are declared here in
   full, in one small block each:

     {
       slug: "cramping-clusters-on-away-trips",
       title: "Cramping clusters on away trips",
       body: "One or two honest sentences about what you saw.",
       laws: [4],
       environment: "anderlecht",
     }

   That is the whole intake. The note then shows up under its law, inside
   its environment, and can be cited as the origin of anything that grows
   out of it later, which is how a small observation ends up carrying the
   weight of the system it eventually became.
   ═══════════════════════════════════════════════════════════════════ */
export interface FieldNote {
  slug: string;
  title: string;
  body: string;
  topic: Topic;
  laws: number[];
  environment: EnvironmentId;
  /** Defaults to "note". Use "idea" once it has taken a shape. */
  maturity?: Extract<Maturity, "note" | "idea">;
}

export const fieldNotes: FieldNote[] = [
  // Nothing here yet. Add a block and it appears on the site immediately.
];

/** Notes presented in the same shape as the rest of the work, so every
    query, panel and link treats them identically. */
const noteEntries: Artefact[] = fieldNotes.map((n) => ({
  slug: n.slug,
  title: n.title,
  category: "Educational Series",
  group: "public",
  type: "Field note",
  status: "Public",
  description: n.body,
  whatItProves: "",
  ctaLabel: "Read the note",
  ctaType: "view-sample",
}) as Artefact);

/** Field notes carry their own connections, so the graph absorbs them
    without asking for the same facts twice. */
export const workGraph: Record<string, WorkNode> = {
  ...curatedGraph,
  ...Object.fromEntries(
    fieldNotes.map((n) => [
      n.slug,
      {
        topic: n.topic,
        laws: n.laws,
        maturity: n.maturity ?? "note",
        environment: n.environment,
      } as WorkNode,
    ])
  ),
};

/* ── Queries ──────────────────────────────────────────────────────── */

/** Every entry, de-duplicated by slug (a few appear in both source lists). */
export const allWork: Artefact[] = (() => {
  const seen = new Set<string>();
  return [...artefacts, ...appliedWorkObjects, ...noteEntries].filter((a) => {
    if (seen.has(a.slug)) return false;
    seen.add(a.slug);
    return true;
  });
})();

const bySlug = new Map(allWork.map((a) => [a.slug, a]));

export const nodeOf = (slug: string): WorkNode | undefined => workGraph[slug];
export const entryOf = (slug: string): Artefact | undefined => bySlug.get(slug);

/** Work proving a given law, public-facing first so open evidence leads. */
export const workByLaw = (law: number): Artefact[] => {
  const rank: Record<string, number> = { public: 0, systems: 1, tools: 2, protected: 3 };
  return allWork
    .filter((a) => (workGraph[a.slug]?.laws ?? []).includes(law))
    .sort((a, b) => (rank[a.group] ?? 9) - (rank[b.group] ?? 9));
};

/**
 * Everything inside one area of practice, anchored by the systems that were
 * actually run, then the written work, then what was built on top. A reader
 * meets the proof first and the products last.
 */
export const workByTopic = (topic: Topic): Artefact[] => {
  const weight: Record<Maturity, number> = {
    system: 0, guide: 1, series: 2, visual: 3, tool: 4, idea: 5, note: 6,
  };
  return allWork
    .filter((a) => workGraph[a.slug]?.topic === topic)
    .sort(
      (a, b) =>
        weight[workGraph[a.slug]!.maturity] - weight[workGraph[b.slug]!.maturity]
    );
};

/** Work that came out of a given environment. */
export const workByEnvironment = (env: EnvironmentId): Artefact[] =>
  allWork
    .filter((a) => workGraph[a.slug]?.environment === env)
    .sort(
      (a, b) =>
        (maturityMeta[workGraph[b.slug]!.maturity]?.order ?? 0) -
        (maturityMeta[workGraph[a.slug]!.maturity]?.order ?? 0)
    );

/** What this piece developed out of. */
export const grewFrom = (slug: string): Artefact[] =>
  (workGraph[slug]?.grewFrom ?? [])
    .map((s) => bySlug.get(s))
    .filter((a): a is Artefact => Boolean(a));

/** What later grew out of this piece (the reverse edge). */
export const ledTo = (slug: string): Artefact[] =>
  allWork.filter((a) => (workGraph[a.slug]?.grewFrom ?? []).includes(slug));

/** How many distinct pieces sit on each rung, for the pipeline view. */
export const maturityCounts = (): Record<Maturity, number> => {
  const out = {} as Record<Maturity, number>;
  (Object.keys(maturityMeta) as Maturity[]).forEach((m) => (out[m] = 0));
  allWork.forEach((a) => {
    const m = workGraph[a.slug]?.maturity;
    if (m) out[m] += 1;
  });
  return out;
};
