export type ArtefactStatus = "Public" | "Protected" | "In Development";
export type ArtefactCategory =
  | "Educational Series"
  | "Matchday System"
  | "Applied Tool"
  | "Interactive Tool"
  | "FuelOps Tool"
  | "Framework"
  | "Athlete Resource"
  | "Team Report";

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
    type: "Educational Series",
    status: "Public",
    description:
      "A visual educational series translating football nutrition principles into simple, memorable lessons.",
    whatItProves: "Athlete-facing education and simple communication.",
    ctaLabel: "View Preview",
    ctaType: "view-sample",
    notionUrl: "https://www.notion.so/Guilherme-Neves-Performance-Nutrition-23575c57c50d80928e62c585039bd8fa",
    featured: true,
    previewType: "gallery",
  },
  {
    slug: "md-1-fuel-system",
    title: "MD-1 Fuel System",
    category: "Matchday System",
    type: "Matchday Nutrition Guide",
    status: "Public",
    description:
      "A practical matchday-minus-one structure for carbohydrate loading, hydration and familiar meals.",
    whatItProves: "Translation of matchday evidence into practical routines.",
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
      "A substitution system helping athletes adapt meals without losing nutritional structure.",
    whatItProves: "Practical flexibility and athlete-friendly structure.",
    ctaLabel: "View Sample",
    ctaType: "view-sample",
    featured: true,
    previewType: "single",
  },
  {
    slug: "matchday-timeline",
    title: "Matchday Timeline",
    category: "Interactive Tool",
    type: "Interactive Matchday Tool",
    status: "In Development",
    description:
      "An interactive timeline designed to adapt nutrition timing around kick-off and practical matchday demands.",
    whatItProves: "Interactive tool thinking and applied matchday systems.",
    ctaLabel: "Join Waitlist",
    ctaType: "waitlist",
    featured: true,
  },
  {
    slug: "snack-bag-agent",
    title: "Matchday Snack Bag Agent",
    category: "FuelOps Tool",
    type: "FuelOps Tool",
    status: "In Development",
    description:
      "A practical agent designed to turn match context into snack bag suggestions, checklists and preparation routines.",
    whatItProves: "AI-enabled performance operations thinking.",
    ctaLabel: "Get Early Access",
    ctaType: "waitlist",
    featured: true,
  },
  {
    slug: "fuel-laws-playbook",
    title: "GN Fuel Laws Playbook",
    category: "Framework",
    type: "Framework / Playbook",
    status: "In Development",
    description:
      "The applied playbook behind the GN Fuel Laws — turning principles into practical tools, guides and routines.",
    whatItProves: "Framework development and scalable education.",
    ctaLabel: "Notify Me",
    ctaType: "waitlist",
    featured: true,
  },
  {
    slug: "athlete-orientation",
    title: "Individual Athlete Nutrition Orientation",
    category: "Athlete Resource",
    type: "Athlete Support Resource",
    status: "Protected",
    description:
      "A real-world athlete support resource translating body composition goals, training demands and daily habits into action.",
    whatItProves: "Individual translation from goals and context into action.",
    ctaLabel: "Request Access",
    ctaType: "request-access",
  },
  {
    slug: "team-monitoring-report",
    title: "Private Team Monitoring Report",
    category: "Team Report",
    type: "Team Performance Report",
    status: "Protected",
    description:
      "Protected proof of team-level monitoring and reporting. Confidential — file not shown publicly.",
    whatItProves: "Team-level monitoring, reporting and staff-facing communication.",
    ctaLabel: "Learn More",
    ctaType: "protected",
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