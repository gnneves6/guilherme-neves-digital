export type ArtefactStatus = "Public" | "Protected" | "In Development";
import abcA from "@/assets/previews/abc-a-athlete-fuel-performance.webp";
import abcB from "@/assets/previews/abc-b-build-your-base.webp";
import abcC from "@/assets/previews/abc-c-care-about-recovery.webp";
// Premium proof-object previews for the Selected Applied Work cards.
import matchdayFuelPreview from "@/assets/work-previews/matchday-fuel-preview.webp";
import hydrationPreview from "@/assets/work-previews/hydration-sweat-testing-preview.webp";
import bodyCompositionPreview from "@/assets/work-previews/body-composition-monitoring-preview.webp";
import foodCateringPreview from "@/assets/work-previews/food-catering-operations-preview.webp";
import educationToolsPreview from "@/assets/work-previews/education-tools-preview.webp";
import atlasPreview from "@/assets/work-previews/football-nutrition-atlas-preview.webp";

export type ArtefactCategory =
  | "Educational Series"
  | "Matchday System"
  | "Applied Tool"
  | "Interactive Tool"
  | "FuelOps Tool"
  | "Framework"
  | "Athlete Resource"
  | "Team Report"
  | "Mini-Class"
  | "Visual Guide"
  | "Monitoring Tool"
  | "Product";

export type ArtefactGroup = "public" | "systems" | "tools" | "protected";

export type CtaType =
  | "view"            // open external URL
  | "view-sample"     // open sample preview modal
  | "request-access"  // protected, request access form
  | "waitlist"        // in development, join waitlist
  | "early-access"    // future product, early access
  | "protected";      // confidential, info only modal

export interface Artefact {
  slug: string;
  title: string;
  category: ArtefactCategory;
  group: ArtefactGroup;
  type: string;             // human-readable subtype
  status: ArtefactStatus;
  description: string;
  whatItProves: string;
  ctaLabel: string;
  ctaType: CtaType;
  externalUrl?: string;
  featured?: boolean;       // shown on homepage
  previewImage?: string;
  previewImages?: string[];
  previewAlt?: string;
  previewType?: "single" | "gallery" | "blurred" | "toolMockup" | "documentMockup";
  fileUrl?: string;
  notionUrl?: string;
  isProtected?: boolean;
  isDownloadable?: boolean;
  // Extended editorial fields (used by the Applied Work homepage section and modal)
  number?: string;
  context?: string;
  problem?: string;
  whatIBuilt?: string;
  whyItMatters?: string;
  previewNote?: string;
  confidentialityNote?: string;
}

export const artefacts: Artefact[] = [
  {
    slug: "abc-of-football-nutrition",
    title: "The ABC of Football Nutrition",
    category: "Educational Series",
    group: "public",
    type: "Athlete-facing Education",
    status: "Public",
    description:
      "Athletes get handed the technical answer before they own the basics, so it never sticks. Three lessons, in order, that have to be in place before anything specific is worth teaching.",
    whatItProves: "Getting the foundation in place first, so the specific work later actually lands.",
    ctaLabel: "View Preview",
    ctaType: "view-sample",
    notionUrl: "https://www.notion.so/Guilherme-Neves-Performance-Nutrition-23575c57c50d80928e62c585039bd8fa",
    featured: true,
    previewType: "gallery",
    previewImages: [abcA, abcB, abcC],
  },
  {
    slug: "md-1-fuel-system",
    title: "MD-1 Fuel System",
    category: "Matchday System",
    group: "systems",
    type: "Matchday Protocol",
    status: "Public",
    description:
      "A practical matchday-minus-one structure for carbohydrate loading, hydration and familiar meals, built to survive real match weeks.",
    whatItProves: "Matchday evidence translated into a protocol staff and athletes can actually run.",
    ctaLabel: "View Sample",
    ctaType: "view-sample",
    featured: false,
    previewType: "documentMockup",
  },
  {
    slug: "athlete-equivalent-bank",
    title: "Athlete Equivalent Bank",
    category: "Applied Tool",
    group: "systems",
    type: "Practical Food System",
    status: "Public",
    description:
      "A food substitution system that lets athletes adapt meals on the road or at home without losing nutritional structure.",
    whatItProves: "Flexibility designed for real life, without breaking the plan.",
    ctaLabel: "View Sample",
    ctaType: "view-sample",
    featured: true,
    previewType: "single",
  },
  {
    slug: "supplementation-elite-football",
    title: "Supplementation in Elite Football",
    category: "Visual Guide",
    group: "public",
    type: "Applied Visual Guide",
    status: "Public",
    description:
      "An evidence-led visual guide on what actually moves the needle in football supplementation, and what doesn't.",
    whatItProves: "Evidence filtering and clear staff/athlete communication.",
    ctaLabel: "View Sample",
    ctaType: "view-sample",
    featured: false,
    previewType: "documentMockup",
  },
  {
    slug: "why-players-cramp",
    title: "Why Players Cramp at 80 Minutes?",
    category: "Mini-Class",
    group: "public",
    type: "Educational Mini-Class",
    status: "Public",
    description:
      "A short visual lesson on the real drivers of late-game cramping, beyond the hydration cliché.",
    whatItProves: "Sharp educational thinking on a real, recurring performance problem.",
    ctaLabel: "View Sample",
    ctaType: "view-sample",
    featured: false,
    previewType: "documentMockup",
  },
  {
    slug: "athletes-food-pyramid",
    title: "Athlete's Food Pyramid",
    category: "Visual Guide",
    group: "public",
    type: "Foundational Visual Guide",
    status: "Public",
    description:
      "A reframed food pyramid built around training load, recovery and athlete-specific demands.",
    whatItProves: "Foundational education adapted to the athlete, not the average.",
    ctaLabel: "View Sample",
    ctaType: "view-sample",
    featured: false,
    previewType: "documentMockup",
  },
  {
    slug: "fuelops-ai",
    title: "FuelOps AI",
    category: "Product",
    group: "tools",
    type: "Performance Nutrition Product · Private Beta",
    status: "In Development",
    description:
      "The next layer of this work: an AI-assisted operating system for performance nutrition staff. Currently in private development.",
    whatItProves: "Where resources, systems and tools converge into a product.",
    ctaLabel: "Join Early Access",
    ctaType: "early-access",
    featured: true,
  },
  {
    slug: "evidence-radar",
    title: "The Evidence Radar",
    category: "Applied Tool",
    group: "tools",
    type: "AI research routine · built and given away",
    status: "Public",
    description:
      "A weekly research routine run through an AI assistant against rules I wrote, so a practitioner stays current on the literature in one sitting instead of losing an hour a day they do not have.",
    whatItProves:
      "Built for a problem I had myself, then handed over: other practitioners asked for the prompt and the steps, and got both.",
    ctaLabel: "How it works",
    ctaType: "view-sample",
    featured: true,
  },
  {
    slug: "matchday-fuel-planner",
    title: "Matchday Fuel Planner",
    category: "Interactive Tool",
    group: "tools",
    type: "Live on this site",
    status: "Public",
    description:
      "Set a kick-off and a body weight and the week resolves around it: carbohydrate, fluid and sodium targets, and the six moments that decide the match. Built at home after seeing the same question asked over and over inside a club.",
    whatItProves: "A decision someone actually has to make, turned into something they can run in thirty seconds.",
    ctaLabel: "Run it",
    ctaType: "view-sample",
    featured: true,
  },
  {
    slug: "athlete-orientation",
    title: "Individual Athlete Nutrition Orientation",
    category: "Athlete Resource",
    group: "protected",
    type: "Protected Casework",
    status: "Protected",
    description:
      "Real athlete-facing work translating body composition goals, training demands and daily habits into action. Confidential, preview shown on request.",
    whatItProves: "Individual translation from context to behaviour, in real environments.",
    ctaLabel: "Request Access",
    ctaType: "request-access",
    featured: false,
  },
  {
    slug: "team-monitoring-report",
    title: "Protected Team Monitoring Report",
    category: "Team Report",
    group: "protected",
    type: "Protected Team Casework",
    status: "Protected",
    description:
      "Team-level monitoring and reporting built for staff decision-making. Confidential, full document not shown publicly.",
    whatItProves: "Staff-facing reporting and team-level performance communication.",
    ctaLabel: "Learn More",
    ctaType: "protected",
    featured: true,
  },
];

export const featuredArtefacts = artefacts.filter((a) => a.featured);

export const statusMeta: Record<
  ArtefactStatus,
  { dot: string; label: string }
> = {
  Public: { dot: "hsl(var(--olive-light))", label: "Public" },
  Protected: { dot: "hsl(35, 28%, 62%)", label: "Protected" },
  "In Development": { dot: "hsl(40, 55%, 60%)", label: "Building" },
};

export const groupMeta: Record<
  ArtefactGroup,
  { label: string; short: string; anchor: string; dot: string; description: string }
> = {
  public: {
    label: "Public Resources",
    short: "Public",
    anchor: "public-resources",
    dot: "hsl(155, 14%, 42%)",
    description: "Educational guides, mini-classes and open learning resources.",
  },
  systems: {
    label: "Practical Systems",
    short: "Systems",
    anchor: "practical-systems",
    dot: "hsl(35, 24%, 52%)",
    description: "Applied frameworks and systems built for real performance environments.",
  },
  tools: {
    label: "Tools & Product Lab",
    short: "Tools",
    anchor: "tools-product-lab",
    dot: "hsl(40, 38%, 58%)",
    description: "The product layer this work is heading toward, starting with FuelOps.",
  },
  protected: {
    label: "Protected Casework",
    short: "Protected",
    anchor: "protected-casework",
    dot: "hsl(45, 8%, 52%)",
    description: "Confidential athlete, team and staff-facing work, shown as proof.",
  },
};

export const groupOrder: ArtefactGroup[] = ["public", "systems", "tools", "protected"];

/* ============================================================
   Applied Work, homepage section ("Selected Applied Work")
   Six curated proof objects, edited for the cinematic archive.
   ============================================================ */
export type AppliedPreviewKind =
  | "matchdayFuel"
  | "hydrationDashboard"
  | "redactedReport"
  | "operationsManual"
  | "educationGrid"
  | "atlasBook";

export type AppliedAccessType =
  | "public"
  | "internal"
  | "protected"
  | "in-development";

export interface AppliedWorkObject extends Artefact {
  number: string;
  context: string;
  problem: string;
  whatIBuilt: string;
  whyItMatters: string;
  appliedPreview: AppliedPreviewKind;
  statusBadge: string; // visible badge label inside the card header
  previewImage?: string;
  previewAlt?: string;
  previewObjectPosition?: string;
  accessType?: AppliedAccessType;
  positioningLine?: string;
}

export const accessMeta: Record<
  AppliedAccessType,
  {
    label: string;
    accent: string;            // primary accent hex (icon / text accent)
    background: string;        // tinted background
    border: string;            // muted border
    ctaLabel: string;
    accessNote: string;
    panelTitle: string;
    panelBody: string;
    icon: "globe" | "layers" | "lock" | "sparkle";
  }
> = {
  public: {
    label: "Public Resource",
    accent: "#7EA885",
    background: "rgba(73, 115, 88, 0.12)",
    border: "rgba(126, 168, 133, 0.28)",
    ctaLabel: "Open collection",
    accessNote:
      "Shared openly as part of the GN education library.",
    panelTitle: "Want to use this type of education?",
    panelBody:
      "Open resources are shared to make performance nutrition easier to understand and apply.",
    icon: "globe",
  },
  internal: {
    label: "Internal System",
    accent: "#7E91AA",
    background: "rgba(76, 96, 120, 0.12)",
    border: "rgba(120, 145, 170, 0.25)",
    ctaLabel: "Start a conversation",
    accessNote:
      "Built for applied performance environments and adaptable by context.",
    panelTitle: "Interested in applying this type of system?",
    panelBody:
      "This can be discussed for teams, athletes, academies or performance environments.",
    icon: "layers",
  },
  protected: {
    label: "Protected Casework",
    accent: "#C9A45C",
    background: "rgba(162, 123, 55, 0.12)",
    border: "rgba(206, 164, 83, 0.30)",
    ctaLabel: "Request private walkthrough",
    accessNote:
      "This is protected casework. Details remain confidential. A private walkthrough can be requested when relevant.",
    panelTitle: "Private walkthrough available by request.",
    panelBody:
      "This object represents confidential applied work. Details stay protected, but the structure can be discussed privately when relevant.",
    icon: "lock",
  },
  "in-development": {
    label: "Building",
    accent: "#D1A85A",
    background: "rgba(187, 143, 67, 0.10)",
    border: "rgba(210, 170, 90, 0.25)",
    ctaLabel: "Register interest",
    accessNote:
      "Being built now. Register interest and you hear first when it opens.",
    panelTitle: "Being built right now.",
    panelBody:
      "The structure is there. Register interest and you get it the week it opens.",
    icon: "sparkle",
  },
};

export const appliedWorkObjects: AppliedWorkObject[] = [
  {
    slug: "matchday-fuel-system",
    number: "01",
    title: "Matchday Fuel System",
    statusBadge: "Internal System",
    accessType: "internal",
    positioningLine:
      "Turning matchday nutrition into clear decisions from MD-1 to recovery.",
    category: "Matchday System",
    group: "systems",
    type: "Matchday nutrition · athletes & staff",
    status: "Protected",
    context: "Matchday nutrition · athletes & staff",
    description:
      "Context-aware matchday fueling decisions, from MD-1 to recovery.",
    problem:
      "Matchday nutrition is often reduced to generic advice, even though kick-off time, role, appetite, travel, stress and recovery context change the real decision.",
    whatIBuilt:
      "A practical matchday fueling system combining timelines, MD-1 planning, pre-game meal guidance, liquid strategies, recovery actions and digital planner concepts.",
    whyItMatters:
      "It turns matchday nutrition into clear decisions athletes and staff can actually use under pressure.",
    whatItProves:
      "Matchday evidence translated into a tool staff and athletes can actually run.",
    previewNote:
      "Digital planner mockup + layered MD-1 / timeline document preview.",
    appliedPreview: "matchdayFuel",
    previewImage: matchdayFuelPreview,
    previewAlt:
      "Matchday Fuel System preview, a dark premium matchday planner dashboard with kick-off timeline and overlapping MD-1 Plan and Matchday Timeline sheets.",
    previewObjectPosition: "center",
    ctaLabel: "Explore system",
    ctaType: "view-sample",
  },
  {
    slug: "hydration-sweat-testing-framework",
    number: "02",
    title: "Hydration & Sweat Testing Framework",
    statusBadge: "Internal System",
    accessType: "internal",
    positioningLine:
      "From sweat losses and sodium data to individualized hydration decisions.",
    category: "Framework",
    group: "systems",
    type: "Sweat testing · sodium · hydration follow-up",
    status: "Protected",
    context: "Sweat testing · sodium · hydration follow-up",
    description:
      "From sweat testing data to athlete-ready hydration decisions.",
    problem:
      "Hydration advice often stays generic, while sweat losses, sodium losses and drinking behaviour vary widely between players.",
    whatIBuilt:
      "A practical field protocol and digital workflow for sweat-rate testing, sodium testing, player profiling, intervention planning and reporting.",
    whyItMatters:
      "It helps practitioners move from raw measurements to individualized hydration support.",
    whatItProves:
      "Measurement translated into individualized hydration decisions.",
    previewNote: "Dashboard mockup + protocol page preview.",
    appliedPreview: "hydrationDashboard",
    previewImage: hydrationPreview,
    previewAlt:
      "Hydration & Sweat Testing framework preview, a dark premium dashboard with squad sweat-rate and sodium metrics, a trend chart and the Sweat Testing Protocol sheet.",
    previewObjectPosition: "center right",
    ctaLabel: "View framework",
    ctaType: "view-sample",
  },
  {
    slug: "body-composition-monitoring",
    number: "03",
    title: "Body Composition & Monitoring Support",
    statusBadge: "Protected Casework",
    accessType: "protected",
    positioningLine:
      "Assessment translated into staff decisions, not rankings.",
    category: "Team Report",
    group: "protected",
    type: "Team monitoring · staff decision support",
    status: "Protected",
    context: "Team monitoring · staff decision support",
    description:
      "Turning assessment into practical follow-up, not rankings.",
    problem:
      "Body composition data can easily become isolated numbers or harmful comparisons if it is not interpreted with context.",
    whatIBuilt:
      "Team and individual monitoring reports using standardized assessment, aggregated summaries, cut-off interpretation, longitudinal tracking and practical staff notes.",
    whyItMatters:
      "It supports nutrition, training and recovery decisions while keeping the focus on individual evolution.",
    whatItProves:
      "Staff-facing reporting that supports decisions without reducing players to rankings.",
    previewNote: "Redacted report and dashboard preview.",
    confidentialityNote:
      "Protected internal work. Names and sensitive data remain redacted.",
    appliedPreview: "redactedReport",
    previewImage: bodyCompositionPreview,
    previewAlt:
      "Body Composition & Monitoring Support preview, a confidential Team Report (Redacted) with Σ8 skinfolds season-trend chart, redacted athlete table and an individual summary sheet.",
    previewObjectPosition: "center left",
    ctaLabel: "Protected preview",
    ctaType: "protected",
  },
  {
    slug: "food-environment-catering",
    number: "04",
    title: "Food Environment & Catering Operations",
    statusBadge: "Protected Casework",
    accessType: "protected",
    positioningLine:
      "Performance nutrition standards for the real food environment athletes live inside.",
    category: "Applied Tool",
    group: "protected",
    type: "Hotels · catering · food logistics",
    status: "Protected",
    context: "Hotels · catering · food logistics",
    description:
      "Performance nutrition standards for real food environments.",
    problem:
      "Even strong nutrition plans fail if the food environment, catering standards and logistics do not support the players.",
    whatIBuilt:
      "Operational manuals, buffet requirements, matchday food standards, shopping lists, ingredient guidance and food information databases for performance environments.",
    whyItMatters:
      "It turns nutrition into an environment athletes can actually live inside.",
    whatItProves:
      "Nutrition operating standards designed for real catering and hotel environments.",
    previewNote: "Blurred operational manual + checklist-style object.",
    confidentialityNote:
      "Protected operational work. Structure and quality only, no confidential details.",
    appliedPreview: "operationsManual",
    previewImage: foodCateringPreview,
    previewAlt:
      "Food Environment & Catering Operations preview, a dark operations dashboard alongside the Catering Operations Manual, structure and quality only with no confidential details.",
    previewObjectPosition: "center",
    ctaLabel: "View structure",
    ctaType: "protected",
  },
  {
    slug: "football-nutrition-education-tools",
    number: "05",
    title: "Football Nutrition Education Tools",
    statusBadge: "Public Resource",
    accessType: "public",
    positioningLine:
      "Evidence translated into simple, memorable decisions athletes can actually use.",
    category: "Educational Series",
    group: "public",
    type: "Athletes · parents · staff",
    status: "Public",
    context: "Athletes · parents · staff",
    description:
      "Visual education tools that make performance nutrition easier to understand.",
    problem:
      "Athletes often receive information that is either too scientific to use or too simple to respect.",
    whatIBuilt:
      "Infographics, mini-classes, ABC-style concepts, supplement education, cramp shot explainers, hydration visuals, youth athlete snack guides and practical food education.",
    whyItMatters:
      "It turns evidence into simple, memorable decisions without losing scientific responsibility.",
    whatItProves:
      "Translation of evidence into clear, athlete-facing behaviour.",
    previewNote:
      "Stack of visual education pieces / infographic thumbnails.",
    appliedPreview: "educationGrid",
    previewImage: educationToolsPreview,
    previewAlt:
      "Football Nutrition Education Tools preview, a premium dark grid of six visual learning objects covering matchday nutrition, hydration, recovery and supplements.",
    previewObjectPosition: "center",
    ctaLabel: "Open collection",
    ctaType: "view-sample",
  },
  {
    slug: "football-nutrition-atlas",
    number: "06",
    title: "Football Nutrition Atlas",
    statusBadge: "Building",
    accessType: "in-development",
    positioningLine:
      "A scalable atlas connecting matchday, training, recovery, hydration and food decisions.",
    category: "Product",
    group: "systems",
    type: "Football food decisions · practical resource",
    status: "In Development",
    context: "Football food decisions · practical resource",
    description:
      "A practical atlas translating science into football food decisions.",
    problem:
      "Football nutrition resources are often scattered across guidelines, recipes, isolated tips and context-free recommendations.",
    whatIBuilt:
      "A premium educational atlas connecting matchday, training day, recovery, hydration, plate structure, timing and practical food examples.",
    whyItMatters:
      "It creates a scalable resource that helps athletes and practitioners understand not just what to eat, but why and when.",
    whatItProves:
      "A scalable education product built from applied performance nutrition systems.",
    previewNote:
      "Premium book / atlas mockup with first pages visible and remaining pages blurred.",
    appliedPreview: "atlasBook",
    previewImage: atlasPreview,
    previewAlt:
      "Football Nutrition Atlas preview, an open premium book spread showing the pre-match plate chapter, with the remaining pages held back.",
    previewObjectPosition: "top center",
    ctaLabel: "Preview atlas",
    ctaType: "early-access",
  },
];

/* Connections between these entries (laws, maturity, environment and
   lineage) live in src/data/work-graph.ts, so this file stays a plain
   catalogue and the graph stays the single place to feed. */