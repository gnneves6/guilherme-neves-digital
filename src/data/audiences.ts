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
 * There are two axes here and they are not the same question.
 *
 * `state` is time: can this happen now, does it wait on professional
 * registration, or is it something that follows later. Six doors that look
 * identical make a visitor knock on the wrong one and then read a paragraph
 * explaining why the door does not open. The state is shown before the copy,
 * so nobody spends attention on a door that is not theirs yet.
 *
 * Work that amounts to individual dietary prescription is a regulated act in
 * Portugal and sits behind registration. That is the whole of the `waiting`
 * state, and it is stated rather than implied.
 *
 * `waiting` is a Portuguese fact, not a universal one, and the copy used to
 * read as though the door were shut everywhere. Several countries let a
 * graduate practise without a separate professional registration, so a reader
 * abroad was being turned away from work that could start immediately. The
 * lines now say where the block applies and invite the rest to ask. They do
 * not state what any other country's rules are, because that has to be checked
 * per country and a website is the wrong place to guess.
 */

import type { EngagementId } from "./engagements";
import { entryOf } from "./work-graph";

export type AudienceState = "now" | "waiting" | "later";

export interface Audience {
  id: string;
  /** Anchor used in URLs, kept short enough to say out loud in a video. */
  anchor: string;
  label: string;
  /** A qualifier printed next to the label, where the door covers more than its name. */
  labelNote?: string;
  /**
   * A word in the list, where the door differs from the ones around it.
   *
   * Three doors sit under "Open now" and one of them does not sell anything.
   * Without a mark they scan as three equivalent offers, and a student decides
   * whether to click based on whether they think they can afford it, which is
   * the exact hesitation this door exists to remove.
   */
  badge?: string;
  /** Who this is, in their own words rather than a market segment. */
  who: string;
  /**
   * The problem they arrive with.
   *
   * Kept, not rendered. The selector showed both this and the offer as
   * paragraphs above the gains list, which restated the line above them and
   * the list below them, and a person choosing between six options needs only
   * "is this me" and "what do I get". The copy stays here because it is worth
   * having if the panel ever needs to say more, but nothing prints it today.
   */
  problem: string;
  /** What I actually do for them. */
  offer: string;
  /** What they leave with. */
  gains: string[];
  /**
   * The shapes the work takes for this door, in the order they are offered.
   *
   * Replaces a separate section of three engagement cards that sat under these
   * six and described the same work a second way. A door that names its own
   * formats needs no cross-reference.
   */
  formats: EngagementId[];
  /**
   * Where a format means something different behind this door.
   *
   * The three formats were written for a club, because that is where they were
   * built. Printed unchanged under "Professional athletes", "System installed"
   * promised structures "your staff run without me in the room", to somebody
   * who has no staff. One shared set of formats is still right; a line per door
   * where the shared one would lie is the price of keeping it.
   */
  formatNotes?: Partial<Record<EngagementId, string>>;
  /**
   * One real piece of work, and why it belongs to this door.
   *
   * Every door claims something; exactly one artefact per door is the cheapest
   * honest way to back the claim, and it costs no new writing because the
   * archive already holds what each piece proves. Named, never described in
   * the abstract.
   */
  proof: { slug: string; why: string };
  state: AudienceState;
  /** Why this door is not open yet. Printed only where it exists. */
  legal?: string;
  cta: string;
  ctaMicro: string;
}

export const audienceStateMeta: Record<
  AudienceState,
  { label: string; group: string; groupNote: string; tone: "live" | "soon" | "open" }
> = {
  now: {
    label: "Open now",
    group: "Open now",
    groupNote: "Non-clinical work: systems, tools, education.",
    tone: "live",
  },
  waiting: {
    label: "Opens with registration",
    group: "Opens with registration",
    groupNote: "Regulated work in Portugal. Elsewhere, ask.",
    tone: "soon",
  },
  later: {
    label: "Open to proposals",
    group: "Open to proposals",
    groupNote: "Read personally and answered honestly. Never chased.",
    tone: "open",
  },
};

export const stateOrder: AudienceState[] = ["now", "waiting", "later"];

export const audiences: Audience[] = [
  {
    id: "clubs",
    anchor: "clubs",
    label: "Clubs & performance departments",
    who: "Professional clubs, academies and federations, and the staff carrying this inside them.",
    problem:
      "Nutrition is rarely missing. It is scattered across performance, medical, catering and the players themselves, and nobody owns the whole picture. So it works when someone happens to push it, and quietly stops working the week everyone is busy. Then it becomes somebody's fault.",
    offer:
      "I read how your environment actually operates, not how the manual says it should, and I build the parts that hold under a real week. Assessment protocols, matchday and travel structures, catering standards, monitoring your staff can run and interpret. Then I hand it over and it keeps running when I am not in the room.",
    gains: [
      "One person owning the whole picture instead of four departments half-owning it",
      "Systems your staff run without me there, not a document that dies in a drive",
      "The performance layer most clubs are quietly leaking, closed",
      "Nutrition handled properly without adding headcount",
    ],
    formats: ["audit", "systems", "education"],
    proof: {
      slug: "food-environment-catering",
      why: "Operating standards written for a real catering and hotel week, not for a manual.",
    },
    state: "now",
    cta: "Start a conversation",
    ctaMicro: "Begins with how your week actually runs.",
  },
  {
    id: "staff",
    anchor: "professionals",
    label: "Coaches & performance staff",
    who: "Strength and conditioning coaches, physios, analysts and nutritionists working in sport.",
    problem:
      "You already know the science. What is hard to find is the football-specific version: what MD-1 actually needs, what half-time is for, how any of it survives a bus at midnight. So when a player asks, you improvise or you deflect, and neither is the answer you want to be giving.",
    offer:
      "I hand over the applied systems instead of the theory. Matchday structures, hydration protocols, the frameworks I use inside elite environments, with the reasoning attached so you can defend every call you make with them. Yours to run.",
    gains: [
      "The football-specific version, not the textbook version",
      "Answers you can defend if a specialist ever checks your work",
      "Structures that survive fixture congestion, travel and late arrivals",
      "Your athletes better prepared, and the credit is yours",
    ],
    formats: ["systems", "education"],
    proof: {
      slug: "md-1-fuel-system",
      why: "The football-specific version of a matchday, in the form you would actually run it.",
    },
    state: "now",
    cta: "Talk about your environment",
    ctaMicro: "For departments and individual practitioners.",
  },
  {
    id: "students",
    anchor: "students",
    label: "Students & early career",
    badge: "Free",
    who: "Nutrition students and recent graduates who want to work in football.",
    /*
     * This door does not sell anything, on purpose.
     *
     * It was written as a paid one-to-one session, and an earlier note called
     * it the first offer that could take money this week. That was wrong about
     * this market: students do not pay. What they do is decide, over years,
     * who the reference is, and a good number of them become the practitioners
     * and the staff who can buy. Charging them fifty euros today to lose that
     * is a bad trade.
     *
     * So it gives, and it says out loud where the paid work lives: the door
     * above this one, for when they are the person inside the building. The
     * position is earned by being useful now and by the career being worth
     * following, not by monetising people who have no money.
     */
    problem:
      "The degree teaches the science and none of the part that decides it: how you get inside an elite environment, what the job actually is once you are there, and what makes a club say yes to someone who does not have a title yet.",
    offer:
      "Everything I would have wanted at your stage, for nothing. The route I took, honestly, including what I got wrong. The tools I build, as I build them. And an answer when you ask me something, because at your stage the answer is usually one sentence and nobody will give it to you.",
    gains: [
      "The route from someone who took it recently, not from someone who took it in 2005",
      "The tools as they get built, not a version cut down for students",
      "A straight answer to the question you cannot ask your professor",
      "The parts nobody tells you, including the mistakes",
    ],
    formats: ["education"],
    formatNotes: {
      education:
        "Open, and free. When you are the practitioner in the building, the door above this one is where we would work together.",
    },
    proof: {
      slug: "evidence-radar",
      why: "Built for a problem I had myself, then given away when other practitioners asked for it.",
    },
    state: "now",
    cta: "Ask me the thing nobody answers",
    ctaMicro: "No charge and no pitch at the end.",
  },
  {
    id: "athletes",
    anchor: "athletes",
    label: "Professional athletes",
    labelNote: "including a move to a new club or country",
    who: "Senior professionals whose income depends on a body they cannot afford to guess about, including players moving to a new club or a new country.",
    problem:
      "You already have a club nutritionist. She does not know you skip breakfast when you are nervous, that your partner cooks on Sundays, or that you quietly hate half the food you have been assigned. A plan built without your actual life in it does not survive your actual life, and your actual life is where the career gets decided. Move country and it gets worse: the food that was working simply is not there any more.",
    offer:
      "If you have just moved, I come to you. Week one on site: assessment, mapping what you can actually buy and eat where you now live, and setting the standard your season runs on. After that I stay in your corner. Message me when your sleep goes, when your gut is off, when the week went badly, not at the next scheduled call. We re-assess and adjust as the season moves, because a number from August means nothing in February.",
    gains: [
      "A specialist who knows you, your habits, your family, your real life, not just your numbers",
      "A direct line. Reach me when something is off, not at the next appointment",
      "A standard built around food you can actually get, wherever you are playing",
      "Re-assessed and adjusted through the season instead of going stale in week three",
      "One person accountable for the whole picture, home or away",
    ],
    formats: ["systems"],
    formatNotes: {
      systems:
        "Week one on site, then a standing line and a standard that is re-read as the season moves.",
    },
    proof: {
      slug: "athlete-orientation",
      why: "One athlete's context turned into behaviour, which is the whole of this work.",
    },
    state: "waiting",
    legal:
      "In Portugal this is regulated work and my registration is in progress, so here I am taking names now. Outside Portugal the rules are not the same, so if you are abroad, ask and we will look at it.",
    cta: "Register your interest",
    ctaMicro: "I will come back to you personally when this opens.",
  },
  {
    id: "youth",
    anchor: "young-athletes",
    label: "Young athletes & families",
    who: "Parents who can see the talent is real, and do not want the foundation left to guesswork.",
    problem:
      "Almost everything out there is written for grown professionals chasing marginal gains. Almost none of it is safe or sensible for a body that is still growing, and the stakes are different: what he eats now shapes how he grows, how he concentrates at school, and whether the body holds up long enough for the talent to matter at all.",
    offer:
      "Long-horizon support that puts health and development first and performance second, because at this age they are the same thing. I work with you and your child, not around you. Habits built to fit family life, explained so he understands why and not just what, adjusted as he grows.",
    gains: [
      "Habits that fit family life, not a professional's routine forced onto a growing kid",
      "A foundation that protects growth, school and long-term health at the same time",
      "Explained in language he will actually use, not rules he will rebel against",
      "Someone watching the long game while everyone else optimises this week",
    ],
    formats: ["education"],
    formatNotes: {
      education:
        "Habits built around how your family actually eats, explained so he understands why.",
    },
    proof: {
      slug: "abc-of-football-nutrition",
      why: "The foundation first, in language a young athlete will actually use.",
    },
    state: "waiting",
    legal:
      "Also regulated work in Portugal, so here it opens alongside the individual practice. Outside Portugal, ask. Families and academies are both welcome either way.",
    cta: "Register your interest",
    ctaMicro: "Families and academies both welcome to ask.",
  },
  {
    id: "brands",
    anchor: "partnerships",
    label: "Brands & partnerships",
    who: "Companies building something in sport, performance or nutrition.",
    problem:
      "Most partnerships in this space trade credibility for reach, and the practitioner ends up saying things they cannot defend. Everyone can tell. It costs the brand more than it buys.",
    offer:
      "I work with products I would use and claims I can stand behind. If the evidence is not there I will say so, which is precisely why the endorsement is worth something. What you get is a practitioner working inside real elite environments, not a media account with a nutrition label.",
    gains: [
      "An endorsement that survives scrutiny, because it was filtered before it was given",
      "Someone inside real environments, testing what you are building where it matters",
      "Content and education that does not overstate the science",
      "A no when it should be a no, which is what makes the yes worth having",
    ],
    formats: ["education"],
    formatNotes: {
      education:
        "Content and education that says what the evidence supports, and stops there.",
    },
    proof: {
      slug: "supplementation-elite-football",
      why: "Evidence filtered before anything is said about it, which is what makes a yes worth having.",
    },
    state: "later",
    cta: "Send a proposal",
    ctaMicro: "I read every one personally, and say no often.",
  },
];

export const audienceByAnchor = (anchor: string) =>
  audiences.find((a) => a.anchor === anchor);

/** The six doors, grouped by when they open. Empty groups are dropped. */
export const audiencesByState = stateOrder
  .map((state) => ({
    state,
    meta: audienceStateMeta[state],
    items: audiences.filter((a) => a.state === state),
  }))
  .filter((g) => g.items.length > 0);

/**
 * The named piece of work behind a door, resolved from the archive.
 *
 * Through the graph rather than through `artefacts`, because the archive is
 * two lists: `artefacts` holds the resources, `appliedWorkObjects` holds the
 * pieces built inside clubs, and the graph is the only place that has both.
 * Resolving from `artefacts` alone silently dropped the clubs door's proof,
 * which is the one door most likely to be read by somebody who can buy.
 */
export const proofFor = (a: Audience) => {
  const artefact = entryOf(a.proof.slug);
  return artefact ? { artefact, why: a.proof.why } : null;
};
