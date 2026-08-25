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
  /**
   * What was actually done inside this environment, in the first person.
   * These replace the generic focus tags on the home chapter: a tag says
   * the subject was touched, a proof says what came of it. Kept to the few
   * that show judgement or a decision changing, not a list of duties.
   */
  proofs: string[];
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
    proofs: [
      "Cut an estimated 75% from a proposed blood panel, keeping only the markers that could actually change a decision.",
      "Wrote the hydration and sweat loss protocol, a stock calculator and the catering manual for away and European fixtures, built for a hotel kitchen to sign off and execute.",
      "The department sent me its technical questions and expected a recommendation back, not a summary.",
    ],
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
    proofs: [
      "Ran the first team's nutrition day to day while still an undergraduate, from matchday and hydration to the supplementation protocol and preparing the isotonics.",
      "Assessed the full squad on the ISAK eight site protocol, reading each player's change over time rather than ranking them against one another.",
      "Long follow up with priority players. Every one improved body composition with performance holding, and no food was demonised to get there.",
    ],
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
    proofs: [
      "Performance read wider than football: health, habits, endurance and the long view on an athlete's development.",
    ],
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
