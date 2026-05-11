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
}

export const artefacts: Artefact[] = [
  {
    slug: "abc-of-football-nutrition",
    title: "The ABC of Football Nutrition",
    category: "Educational Series",
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
    type: "Matchday Protocol",
    status: "Public",
    description:
      "A practical matchday-minus-one structure for carbohydrate loading, hydration and familiar meals — built to survive real match weeks.",
    whatItProves: "Matchday evidence translated into a protocol staff and athletes can actually run.",
    ctaLabel: "View Sample",
    ctaType: "view-sample",
    featured: true,
    previewType: "documentMockup",
  },
  {
    slug: "athlete-equivalent-bank",
    title: "Athlete Equivalent Bank",
    category: "Applied Tool",
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
    slug: "supplementation-elite-football",
    title: "Supplementation in Elite Football",
    category: "Visual Guide",
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
    slug: "matchday-timeline",
    title: "Matchday Timeline",
    category: "Interactive Tool",
    type: "Interactive Tool · In Development",
    status: "In Development",
    description:
      "An interactive timeline that adapts nutrition timing around kick-off, travel and real matchday constraints.",
    whatItProves: "Tool thinking applied directly to matchday operations.",
    ctaLabel: "Join the Build List",
    ctaType: "waitlist",
    featured: true,
  },
  {
    slug: "hydration-monitoring",
    title: "Hydration Monitoring Tool",
    category: "Monitoring Tool",
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
    type: "Protected Casework",
    status: "Protected",
    description:
      "Real athlete-facing work translating body composition goals, training demands and daily habits into action. Confidential — preview shown on request.",
    whatItProves: "Individual translation from context to behaviour, in real environments.",
    ctaLabel: "Request Access",
    ctaType: "request-access",
    featured: true,
  },
  {
    slug: "team-monitoring-report",
    title: "Private Team Monitoring Report",
    category: "Team Report",
    type: "Protected Team Casework",
    status: "Protected",
    description:
      "Team-level monitoring and reporting built for staff decision-making. Confidential — full document not shown publicly.",
    whatItProves: "Staff-facing reporting and team-level performance communication.",
    ctaLabel: "Learn More",
    ctaType: "protected",
    featured: false,
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