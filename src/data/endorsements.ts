/**
 * What other people have said, and whether they said we could publish it.
 *
 * This file exists because the proof was already there and nobody had called
 * it proof. The Dean of the faculty and a national team nutritionist had both
 * praised the work publicly, in comments on his own posts, months before
 * anyone thought to write it down.
 *
 * Two rules are enforced here rather than in a document, because a document
 * does not stop a deploy.
 *
 * 1. `permission` gates rendering. Nothing reaches a visitor until the person
 *    has seen the exact words, been told where they would appear, and said
 *    yes. A public comment is an opinion given in public; putting it on a
 *    website as marketing is a different act, and it gets asked for. The
 *    selector below is the only supported way to read this list, and it
 *    filters.
 *
 * 2. No anonymised job titles. "The Dean of a nutrition faculty in Porto" is
 *    one person, so removing the name protects nobody while making a true
 *    thing unverifiable, which is the failure mode this whole site is built
 *    against. Either it carries a real name a reader can check, or it does
 *    not go up. Aggregate reception, further down, is the honest way to say
 *    "many people responded" without dressing it as an endorsement.
 *
 * The full record, including quotes still waiting on an answer, lives in the
 * private positioning repository. This repository is public.
 */

export type Permission = "granted" | "pending" | "declined";

export interface Endorsement {
  id: string;
  /** Their words, exactly. Never tidied, never silently translated. */
  quote: string;
  /** Real name. There is no anonymous variant, on purpose: see rule 2. */
  name: string;
  role: string;
  /** Where it was said, so a reader can go and look. */
  sourceUrl?: string;
  permission: Permission;
  /** When permission was given, so the record stays auditable. */
  permissionDate?: string;
  /** Which doors this speaks to, matching ids in `audiences.ts`. */
  audiences?: string[];
}

/**
 * Seeded as `pending` on purpose. These are real quotes, really said, in
 * public. They render the day each person says yes, and not one day earlier.
 */
export const endorsements: Endorsement[] = [
  {
    id: "pedro-graca-direction",
    quote:
      "Vejo um futuro promissor, passo a passo, mas firme e em boa direção.",
    name: "Pedro Graça",
    role: "Dean, Faculty of Nutrition and Food Sciences, University of Porto",
    permission: "pending",
    audiences: ["students", "clubs"],
  },
  {
    id: "pedro-graca-fresh-air",
    quote: "Pelo percurso que estão a fazer e por trazerem ar fresco.",
    name: "Pedro Graça",
    role: "Dean, Faculty of Nutrition and Food Sciences, University of Porto",
    permission: "pending",
    audiences: ["students"],
  },
  {
    id: "pedro-meirinhos",
    quote: "Parabéns pela tua iniciativa!",
    name: "Pedro Meirinhos",
    role: "Nutritionist, Ghana National Team",
    permission: "pending",
    audiences: ["practitioners", "clubs"],
  },
];

/**
 * The response to the tools, as numbers rather than as borrowed words.
 *
 * Private messages are quoted nowhere on this site. Someone who writes to him
 * wrote to him, not to the internet, and hundreds of those messages arrived
 * without anyone being asked whether they could be republished. What is his to
 * publish is the size of the response, which is his own data.
 *
 * Keep these dated and true. A number that quietly stops being accurate is the
 * same problem as a claim that never was.
 */
export const reception = {
  asOf: "2026-09",
  items: [
    { figure: "10,000+", label: "views on the research radar tool" },
    { figure: "200+", label: "messages asking for it" },
    { figure: "100+", label: "practitioners and students in the comments" },
  ],
};

/** The only supported way to read the list. Filtering is not optional. */
export const publishableEndorsements = (): Endorsement[] =>
  endorsements.filter((e) => e.permission === "granted");

/** For a single door, when its card wants a line that speaks to that reader. */
export const endorsementsFor = (audienceId: string): Endorsement[] =>
  publishableEndorsements().filter((e) => e.audiences?.includes(audienceId));
