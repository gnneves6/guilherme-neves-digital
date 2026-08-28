import auditImage from "@/assets/work-previews/food-catering-operations-preview.webp";
import systemsImage from "@/assets/work-previews/matchday-fuel-preview.webp";
import educationImage from "@/assets/work-previews/education-tools-preview.webp";

/**
 * The three shapes the work takes.
 *
 * These used to be a section of their own on `/services`, three large cards
 * under the heading "Three ways to make nutrition work in your environment",
 * sitting below six audience doors. That was two taxonomies describing the
 * same work on one page: a stranger had to read both and then work out how
 * they map onto each other, which is the actual reason that page felt heavy.
 *
 * One taxonomy now. The doors are the primary axis, because "which of these am
 * I" is the question people arrive with, and these are the formats the work
 * takes once the door is chosen. Each door names the ones that apply to it.
 *
 * The photographs came with them and are the whole point of keeping this as
 * data: every format shows the real thing it produces rather than describing
 * it. The crops are per image because these are dense documents shot at
 * 1536px, and shown whole in a small frame they lose every piece of detail
 * that makes them convincing.
 */

export type EngagementId = "audit" | "systems" | "education";

export interface Engagement {
  id: EngagementId;
  title: string;
  /** The commitment, in the words someone would use to plan for it. */
  shape: string;
  /** What they have at the end. One sentence, no hedging. */
  outcome: string;
  image: string;
  imageAlt: string;
  imageFocus: { scale: number; origin: string };
}

export const engagements: Record<EngagementId, Engagement> = {
  audit: {
    id: "audit",
    title: "Diagnostic",
    shape: "4 to 6 weeks, on site and remote",
    outcome:
      "A read on how nutrition actually operates across performance, medical and catering, and what to fix first.",
    image: auditImage,
    imageAlt:
      "An operations review sheet showing meal service checkpoints, compliance scoring and who owns each one, beside a printed catering operations manual.",
    imageFocus: { scale: 1.75, origin: "34% 44%" },
  },
  systems: {
    id: "systems",
    title: "System installed",
    shape: "A season, retained",
    outcome:
      "Matchday, travel and training-week structures your staff run without me in the room.",
    image: systemsImage,
    imageAlt:
      "A matchday fuelling dashboard with the timeline from breakfast to recovery, beside the printed MD-1 plan and matchday timeline sheets.",
    imageFocus: { scale: 1.7, origin: "26% 48%" },
  },
  education: {
    id: "education",
    title: "Education",
    shape: "One session, or a programme",
    outcome:
      "Athletes, staff or parents sharing one applied language for the decisions they make around food.",
    image: educationImage,
    imageAlt:
      "Six football nutrition education cards laid out on a desk, covering the basics, hydration, supplements, recovery and fructose intolerance.",
    imageFocus: { scale: 1.65, origin: "22% 34%" },
  },
};

export const engagementList = Object.values(engagements);
