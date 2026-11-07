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
   * The breadth of the role, in one sentence.
   *
   * Without it the proofs below read as the complete inventory of what he did
   * in a whole season, which makes a serious job sound like three small tasks.
   * This says what the work covered; the proofs are then read as examples of
   * it rather than as the whole of it.
   */
  scope: string;
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
    role: "Performance nutrition, first team to under-16s",
    location: "Brussels, Belgium",
    period: "2026",
    chapter: "Elite football taught me that nutrition has to be clear enough to hold up under pressure.",
    context: "Elite football, first team",
    focus: ["Hydration", "Matchday", "Scientific reviews", "Athlete and staff education"],
    scope:
      "Inside the first team's performance department: hydration and sweat testing, matchday and travel, the evidence behind what was being sold to the club, and what the kitchen actually put in front of the players away from home.",
    proofs: [
      "I wrote the hydration protocol and the travel catering manual, made for a hotel kitchen to carry out.",
      "I cut 75% of a proposed blood panel. Only what changed a decision stayed.",
      "The department sent me the technical questions expecting a recommendation, not a summary.",
      "A fluid and salt stock calculator for away and European games.",
    ],
    seasonNote: "In a season with a run to the cup final and a fight for the European places.",
    kitColors: { primary: "#5E3A8E", secondary: "#FFFFFF", accent: "#C9A84C" },
    kit: { variant: "plain", symbol: "dots" },
  },
  {
    id: "leca",
    name: "Leça FC",
    role: "Performance nutrition, first team",
    location: "Porto, Portugal",
    period: "2025",
    chapter: "Senior football turned theory into daily decisions, measurement and accountability.",
    context: "Senior football, first team",
    focus: ["Body composition", "Match week", "Athlete education", "Practical eating"],
    scope:
      "A first team's nutrition, day to day, through a promotion campaign: the match week, the supplementation protocol, body composition, individual follow-up, and the education that got the players deciding on their own.",
    proofs: [
      "I ran the first team's nutrition day to day, while still doing my degree.",
      "I assessed the whole squad with the ISAK eight-skinfold method, reading each player's change instead of comparing them.",
      "Long follow-up with priority players. All of them improved their body composition without losing performance, and without demonising a single food.",
    ],
    seasonNote: "Inside a promotion campaign.",
    kitColors: { primary: "#1F7A4D", secondary: "#FFFFFF", accent: "#C4A853" },
    kit: { variant: "hoops", symbol: "crest" },
  },
  {
    id: "r4e",
    name: "Run4Excellence",
    role: "Health and performance",
    location: "Porto, Portugal",
    period: "2025",
    chapter: "Performance is wider than football: training, recovery, health and consistency.",
    context: "Human performance beyond football",
    focus: ["Health", "Habits", "Endurance", "Recovery", "Long-term development"],
    scope:
      "Performance nutrition beyond football, with people who train seriously around a normal life. Endurance, recovery, health markers, and the habits that decide whether it lasts longer than a month.",
    proofs: [
      "Performance read wider than football: health, habits, endurance and an athlete's long run.",
      "People who train seriously around a job, and a plan that has to survive that.",
    ],
    seasonNote: null,
    kitColors: { primary: "#0E0E10", secondary: "#FFFFFF", accent: "#FFFFFF" },
    kit: { variant: "plain", symbol: "four" },
  },
];

export const additionalExposure = [
  { name: "FC Porto B and under-19s", date: "Apr 2025" },
  { name: "Gil Vicente FC", date: "Ago 2025" },
  { name: "USC Paredes", date: "Nov 2025" },
];
