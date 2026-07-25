// Shared experience data, used by the home Environments section and the
// About Experience section. Pure data, no asset imports, so it stays light.

export interface Experience {
  id: string;
  name: string;
  role: string;
  location: string;
  period: string;
  chapter: string;
  context: string;
  focus: string[];
  seasonNote: string | null;
  kitColors: { primary: string; secondary: string; accent: string };
  kit: { variant: "plain" | "hoops"; symbol: "dots" | "crest" | "four" };
}

export const experiences: Experience[] = [
  {
    id: "anderlecht",
    name: "RSC Anderlecht",
    role: "Performance Nutrition Intern",
    location: "Brussels, Belgium",
    period: "2026",
    chapter: "Elite football taught me that nutrition must be clear enough to survive pressure.",
    context: "Elite first-team football environment",
    focus: ["Hydration", "Matchday fueling", "Scientific reviews", "Athlete & staff education"],
    seasonNote: "During a season marked by a cup-final run and European qualification race.",
    kitColors: { primary: "#5E3A8E", secondary: "#FFFFFF", accent: "#C9A84C" },
    kit: { variant: "plain", symbol: "dots" },
  },
  {
    id: "leca",
    name: "Leça FC",
    role: "First Team Performance Nutrition",
    location: "Porto, Portugal",
    period: "2025",
    chapter: "Senior football turned theory into daily decisions, monitoring and accountability.",
    context: "Senior first-team football environment",
    focus: ["Body composition", "Matchweek routines", "Athlete education", "Practical fueling"],
    seasonNote: "Inside a competitive promotion-stage campaign.",
    kitColors: { primary: "#1F7A4D", secondary: "#FFFFFF", accent: "#C4A853" },
    kit: { variant: "hoops", symbol: "crest" },
  },
  {
    id: "r4e",
    name: "Run4Excellence",
    role: "Performance Nutrition | Health & Performance",
    location: "Porto, Portugal",
    period: "2025",
    chapter: "Performance is broader than football: training, recovery, health and consistency.",
    context: "Human-performance environment beyond football",
    focus: ["Health", "Habits", "Endurance", "Recovery", "Long-term development"],
    seasonNote: null,
    kitColors: { primary: "#0E0E10", secondary: "#FFFFFF", accent: "#FFFFFF" },
    kit: { variant: "plain", symbol: "four" },
  },
];

export const additionalExposure = [
  { name: "FC Porto B & U19", date: "Apr 2025" },
  { name: "Gil Vicente FC", date: "Aug 2025" },
  { name: "USC Paredes", date: "Nov 2025" },
];
