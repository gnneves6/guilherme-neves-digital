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
 */
const Em = ({ children }: { children: ReactNode }) => (
  <span
    style={{
      backgroundImage:
        "linear-gradient(hsl(var(--olive-light) / 0.22), hsl(var(--olive-light) / 0.22))",
      backgroundSize: "100% 0.4em",
      backgroundPosition: "0 90%",
      backgroundRepeat: "no-repeat",
      WebkitBoxDecorationBreak: "clone",
      boxDecorationBreak: "clone",
      fontWeight: 500,
      color: "hsl(var(--foreground))",
    }}
  >
    {children}
  </span>
);

export default Em;
