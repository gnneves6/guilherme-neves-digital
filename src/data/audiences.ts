/**
 * Who the practice serves.
 *
 * The site used to open with what is sold. It now opens with who is arriving,
 * because traffic comes from social video where the viewer already knows why
 * they clicked. A club director and a second-year student need different first
 * screens, and sending both to the same page loses one of them.
 *
 * Each entry has its own anchor, so a video can point straight at it
 * (/services#students) instead of at the top of a page the viewer then has to
 * search through.
 *
 * `status` separates what is running from what is being prepared. Work that
 * amounts to individual dietary prescription is a regulated act in Portugal
 * and sits behind professional registration, so it is shown honestly as in
 * preparation rather than either hidden or over-promised.
 */

export type AudienceStatus = "open" | "preparing" | "conversation";

export interface Audience {
  id: string;
  /** Anchor used in URLs, kept short enough to say out loud in a video. */
  anchor: string;
  label: string;
  /** Who this is, in their own words rather than a market segment. */
  who: string;
  /** The problem they arrive with. */
  problem: string;
  /** What I actually do for them. */
  offer: string;
  /** What they leave with. */
  gains: string[];
  status: AudienceStatus;
  cta: string;
  ctaMicro: string;
}

export const audienceStatusMeta: Record<
  AudienceStatus,
  { label: string; tone: "live" | "soon" | "open" }
> = {
  open: { label: "Working now", tone: "live" },
  preparing: { label: "In preparation", tone: "soon" },
  conversation: { label: "Open to conversations", tone: "open" },
};

export const audiences: Audience[] = [
  {
    id: "clubs",
    anchor: "clubs",
    label: "Clubs & performance departments",
    who: "Professional clubs, academies, federations and the staff inside them.",
    problem:
      "Nutrition is usually not missing. It is scattered across performance, medical, catering and the players themselves, and nobody owns the whole picture.",
    offer:
      "I come in, read how it actually operates, and build the parts that hold under a real week. Sometimes that is a diagnostic. Sometimes it is a system installed and handed over. Sometimes it is a season alongside the staff.",
    gains: [
      "A clear read on where nutrition is quietly leaking",
      "Systems your staff run without me in the room",
      "Matchday, travel and training-week structures that survive fixture congestion",
    ],
    status: "open",
    cta: "Start a conversation",
    ctaMicro: "Begins with a short scoping call, no obligation.",
  },
  {
    id: "staff",
    anchor: "professionals",
    label: "Coaches & performance staff",
    who: "Strength and conditioning coaches, physios, analysts and nutritionists working in sport.",
    problem:
      "You already know the science. What is hard to find is the football-specific version: what to do on MD-1, what half-time actually needs, how to make any of it survive a bus at midnight.",
    offer:
      "I hand over the applied systems rather than the theory. Frameworks, matchday structures and the Fuel Laws playbook, built for the environment you work in and yours to run.",
    gains: [
      "Applied systems you can operate without a nutritionist on staff",
      "The reasoning behind each decision, so you can adapt it",
      "Someone to check your thinking against real elite practice",
    ],
    status: "open",
    cta: "Talk about your environment",
    ctaMicro: "For departments and individual practitioners.",
  },
  {
    id: "students",
    anchor: "students",
    label: "Students & early career",
    who: "Nutrition students and recent graduates who want to work in football.",
    problem:
      "Nobody teaches the part that actually matters: how you get inside an elite environment, and what the job really looks like once you are there.",
    offer:
      "I walk you through the route I took, honestly, including what I would do differently. We look at where you are, what is missing, and what the next concrete step is.",
    gains: [
      "A real picture of the work, not the version on social media",
      "An honest read on your positioning and what to build next",
      "The things I wish someone had told me at your stage",
    ],
    status: "open",
    cta: "Book a session",
    ctaMicro: "One to one. Limited slots, because these are real hours.",
  },
  {
    id: "athletes",
    anchor: "athletes",
    label: "Professional athletes",
    who: "Senior professionals who want their nutrition handled properly.",
    problem:
      "Generic plans, conflicting advice from three different people, and nothing built around your actual calendar.",
    offer:
      "Individual performance nutrition, built around your season rather than a template. This is regulated work and I am completing professional registration, so I am taking names now and starting as soon as that is finalised.",
    gains: [
      "A plan shaped by your fixtures, travel and role",
      "Hydration and body composition monitored, not guessed",
      "One person accountable instead of four opinions",
    ],
    status: "preparing",
    cta: "Register your interest",
    ctaMicro: "I will come back to you personally when this opens.",
  },
  {
    id: "youth",
    anchor: "young-athletes",
    label: "Young athletes & families",
    who: "Academy players and the parents trying to get it right.",
    problem:
      "The internet is full of advice written for grown professionals, and almost none of it is safe or sensible for a growing athlete.",
    offer:
      "Long-horizon support that puts health and development first, and performance second, because at this age they are the same thing. Also regulated work, so it opens alongside the individual practice.",
    gains: [
      "Guidance appropriate to growth, not scaled-down professional advice",
      "Habits that hold through school, travel and family life",
      "A calm answer to what you are being told elsewhere",
    ],
    status: "preparing",
    cta: "Register your interest",
    ctaMicro: "Families and academies both welcome to ask.",
  },
  {
    id: "brands",
    anchor: "partnerships",
    label: "Brands & partnerships",
    who: "Companies building something in sport, performance or nutrition.",
    problem:
      "Most partnerships in this space trade credibility for reach, and the practitioner ends up saying things they cannot defend.",
    offer:
      "I work with products I would use and claims I can stand behind. If the evidence is not there I will say so, which is precisely why the endorsement is worth something.",
    gains: [
      "An honest technical read on what you are building",
      "Content and education that does not overstate the science",
      "A practitioner inside real elite environments, not a media account",
    ],
    status: "conversation",
    cta: "Send a proposal",
    ctaMicro: "I read every one personally, and say no often.",
  },
];

export const audienceByAnchor = (anchor: string) =>
  audiences.find((a) => a.anchor === anchor);
