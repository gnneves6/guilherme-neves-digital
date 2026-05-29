export type ArtefactStatus = "Public" | "Protected" | "In Development";
import abcA from "@/assets/previews/abc-a-athlete-fuel-performance.png";
import abcB from "@/assets/previews/abc-b-build-your-base.png";
import abcC from "@/assets/previews/abc-c-care-about-recovery.png";

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
  | "request-access"  // protected — request access form
  | "waitlist"        // in development — join waitlist
  | "early-access"    // future product — early access
  | "protected";      // confidential — info only modal

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
      "A visual series turning core football nutrition principles into three memorable lessons athletes can repeat.",
    whatItProves: "Translation of complex science into clear, athlete-facing behaviour.",
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
      "A practical matchday-minus-one structure for carbohydrate loading, hydration and familiar meals — built to survive real match weeks.",
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
    whatItProves: "Flexibility designed for real life — without breaking the plan.",
    ctaLabel: "View Sample",
    ctaType: "view-sample",
    featured: true,
    previewType: "single",
  },
  {
    slug: "football-nutrition-atlas",
    title: "The Football Nutrition Atlas",
    category: "Product",
    group: "systems",
    type: "Premium Resource · In Development",
    status: "In Development",
    description:
      "A functional fueling guide translating football nutrition into practical plates, timing maps and matchday decisions.",
    whatItProves: "A scalable education product built from applied performance nutrition systems.",
    ctaLabel: "Preview the Atlas",
    ctaType: "early-access",
    featured: true,
    previewType: "blurred",
  },
  {
    slug: "supplementation-elite-football",
    title: "Supplementation in Elite Football",
    category: "Visual Guide",
    group: "public",
    type: "Applied Visual Guide",
    status: "Public",
    description:
      "An evidence-led visual guide on what actually moves the needle in football supplementation — and what doesn't.",
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
      "A short visual lesson on the real drivers of late-game cramping — beyond the hydration cliché.",
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
    slug: "matchday-fuel",
    title: "Matchday Fuel",
    category: "Interactive Tool",
    group: "tools",
    type: "Football Matchday Fueling System · In Development",
    status: "In Development",
    description:
      "An interactive fueling system that adapts nutrition timing around kick-off, role, travel and matchday constraints.",
    whatItProves: "Digital systems thinking applied to real football nutrition decisions.",
    ctaLabel: "Explore the System",
    ctaType: "waitlist",
    featured: true,
  },
  {
    slug: "hydration-monitoring",
    title: "Hydration Monitoring Tool",
    category: "Monitoring Tool",
    group: "tools",
    type: "Monitoring Tool · In Development",
    status: "In Development",
    description:
      "A lightweight monitoring layer for individual and team-level hydration status, built for staff workflows.",
    whatItProves: "Monitoring designed to support real staff decisions, not dashboards for show.",
    ctaLabel: "Join the Build List",
    ctaType: "waitlist",
    featured: false,
  },
  {
    slug: "snack-bag-agent",
    title: "Matchday Snack Bag Agent",
    category: "FuelOps Tool",
    group: "tools",
    type: "FuelOps Prototype · In Development",
    status: "In Development",
    description:
      "A prototype agent that turns match context into snack bag suggestions, checklists and preparation routines.",
    whatItProves: "Where applied nutrition meets performance operations and AI.",
    ctaLabel: "Get Early Access",
    ctaType: "waitlist",
    featured: false,
  },
  {
    slug: "fuel-laws-playbook",
    title: "GN Fuel Laws Playbook",
    category: "Framework",
    group: "systems",
    type: "Applied Framework · In Development",
    status: "In Development",
    description:
      "The applied playbook behind the GN Fuel Laws — turning principles into tools, guides and repeatable routines.",
    whatItProves: "A scalable system behind the public-facing education.",
    ctaLabel: "Join the Build List",
    ctaType: "waitlist",
    featured: false,
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
    slug: "athlete-orientation",
    title: "Individual Athlete Nutrition Orientation",
    category: "Athlete Resource",
    group: "protected",
    type: "Protected Casework",
    status: "Protected",
    description:
      "Real athlete-facing work translating body composition goals, training demands and daily habits into action. Confidential — preview shown on request.",
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
      "Team-level monitoring and reporting built for staff decision-making. Confidential — full document not shown publicly.",
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
  "In Development": { dot: "hsl(40, 55%, 60%)", label: "In Development" },
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
    description: "Interactive tools, agents and in-development products — including FuelOps.",
  },
  protected: {
    label: "Protected Casework",
    short: "Protected",
    anchor: "protected-casework",
    dot: "hsl(220, 8%, 52%)",
    description: "Confidential athlete, team and staff-facing work — shown as proof.",
  },
};

export const groupOrder: ArtefactGroup[] = ["public", "systems", "tools", "protected"];

/* ============================================================
   Applied Work — homepage section ("Selected Applied Work")
   Six curated proof objects, edited for the cinematic archive.
   ============================================================ */
export type AppliedPreviewKind =
  | "matchdayFuel"
  | "hydrationDashboard"
  | "redactedReport"
  | "operationsManual"
  | "educationGrid"
  | "atlasBook";

export interface AppliedWorkObject extends Artefact {
  number: string;
  context: string;
  problem: string;
  whatIBuilt: string;
  whyItMatters: string;
  appliedPreview: AppliedPreviewKind;
  statusBadge: string; // visible badge label inside the card header
}

export const appliedWorkObjects: AppliedWorkObject[] = [
  {
    slug: "matchday-fuel-system",
    number: "01",
    title: "Matchday Fuel System",
    statusBadge: "System / Applied Tool",
    category: "Matchday System",
    group: "systems",
    type: "Matchday nutrition · athletes & staff",
    status: "In Development",
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
    ctaLabel: "Explore system",
    ctaType: "view-sample",
  },
  {
    slug: "hydration-sweat-testing-framework",
    number: "02",
    title: "Hydration & Sweat Testing Framework",
    statusBadge: "Framework / Digital System",
    category: "Framework",
    group: "systems",
    type: "Sweat testing · sodium · hydration follow-up",
    status: "In Development",
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
    ctaLabel: "View framework",
    ctaType: "view-sample",
  },
  {
    slug: "body-composition-monitoring",
    number: "03",
    title: "Body Composition & Monitoring Support",
    statusBadge: "Protected / Internal",
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
    ctaLabel: "Protected preview",
    ctaType: "protected",
  },
  {
    slug: "food-environment-catering",
    number: "04",
    title: "Food Environment & Catering Operations",
    statusBadge: "Protected / Club Systems",
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
      "Protected operational work. Structure and quality only — no confidential details.",
    appliedPreview: "operationsManual",
    ctaLabel: "View structure",
    ctaType: "protected",
  },
  {
    slug: "football-nutrition-education-tools",
    number: "05",
    title: "Football Nutrition Education Tools",
    statusBadge: "Public / Education",
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
    ctaLabel: "Open collection",
    ctaType: "view-sample",
  },
  {
    slug: "football-nutrition-atlas",
    number: "06",
    title: "Football Nutrition Atlas",
    statusBadge: "In Development / Premium Resource",
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
    ctaLabel: "Preview atlas",
    ctaType: "early-access",
  },
];