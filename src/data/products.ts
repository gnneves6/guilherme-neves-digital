/**
 * The first thing on this site that has a price.
 *
 * Every door on `/services` ends in a form. That is right for a club, where the
 * work is scoped in a conversation, and wrong for a practitioner in another
 * country who found the site through a post at eleven at night. It is also the
 * only door that is neither blocked by Portuguese registration nor dependent on
 * a referral, which makes it the one place money can arrive without waiting for
 * anything.
 *
 * Choosing what to sell was mostly a matter of what may honestly be sold.
 *
 * The work built inside clubs belongs to those clubs and is named, never
 * opened. Everything already public here (MD-1, the ABC series, the Evidence
 * Radar, the planner) is given away and selling it back would be the worst
 * thing this site could do to the trust it has been building. So the product is
 * neither: it is a generic structure built from the same method, holding no
 * club's data and no individual's, which is what makes it a tool rather than a
 * regulated act and sellable before registration.
 *
 * The price is a judgement, not a calculation, and it is easy to change.
 * Eighty-nine euros is a professional tool price rather than an impulse price.
 * It filters for the reader the whole site now says it is for, the one who
 * weighs a number against what it returns; it sits above the twenty-nine to
 * forty-nine where practitioner resources become disposable; and seventeen of
 * them in a month clears the stated floor. The guarantee carries the risk that
 * the price creates, which is the only reason a number this specific is
 * defensible from somebody with no public cases yet.
 */

export interface Product {
  slug: string;
  name: string;
  /** Who it is for, in the words they would use about themselves. */
  forWhom: string;
  /** The one line that decides whether they read the rest. */
  promise: string;
  /** What is actually in the box. No adjectives. */
  contains: string[];
  /** Stated plainly, because a tool that pretends to be a plan is dangerous. */
  limits: string;
  priceEur: number;
  /** What they are buying instead of. */
  insteadOf: string;
}

export const products: Record<string, Product> = {
  "matchday-week": {
    slug: "matchday-week",
    name: "The Matchday Week",
    forWhom:
      "Coaches, physios and practitioners who carry nutrition without a nutritionist on staff.",
    promise:
      "The whole week around a fixture, structured, with the reasoning behind every call so you can defend it when somebody asks.",
    contains: [
      "MD-3 to MD+1 as a timed structure you fill for your own squad, not a sample week for somebody else's",
      "Half-time and the hour before kick-off, which is where most of it is won or lost",
      "The travel and late kick-off variants, because the standard week is the one that never happens",
      "The decision rules under each block, so you can adapt it rather than follow it",
      "A one-page version for the dressing room wall",
    ],
    limits:
      "A structure for a group, not a plan for a person. It makes no assumptions about any individual athlete and does not replace one being assessed.",
    priceEur: 89,
    insteadOf:
      "Improvising the answer when a player asks, or handing them something written for a marathon runner.",
  },
};

export const productOf = (slug?: string) => (slug ? products[slug] ?? null : null);
