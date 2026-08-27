import { type ReactNode } from "react";

/**
 * Marks the spine of a sentence so it can be read without being read.
 *
 * A soft olive band sits behind the words rather than under them, at the height
 * of a highlighter stroke, and the weight goes up one step. Nobody reads a
 * paragraph on a site they landed on thirty seconds ago; they scan it. This
 * decides what they take away when they scan.
 *
 * It only works while it is rare. Two or three marks on a page carry the
 * argument; a mark in every sentence is the same as no marks at all, because
 * the eye has nothing left to land on. Lived on the About page alone until now;
 * moved here so the whole site can use the same one rather than growing three
 * slightly different versions of it.
 *
 * Put the cursor on one and the stroke fills the word. The styling moved to a
 * class in index.css to make that possible: hover cannot be expressed in an
 * inline style, and these are precisely the words worth rewarding someone for
 * stopping on.
 */
const Em = ({ children }: { children: ReactNode }) => (
  <span className="gn-em">{children}</span>
);

export default Em;
