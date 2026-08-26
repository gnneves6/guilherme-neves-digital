import { motion } from "framer-motion";
import { ReactNode } from "react";
import { useLocation } from "react-router-dom";

/**
 * The fade a new page arrives on.
 *
 * This used to declare an `exit` animation as well, which never ran once: exit
 * requires an AnimatePresence somewhere above it and there is none in this
 * tree, so it was configuration describing behaviour the site did not have.
 * Removed rather than left to imply otherwise.
 *
 * Keyed on the path so the entrance replays on every navigation. Without the
 * key, React can keep this instance alive between two routes whose trees match,
 * and the second page would appear with no transition at all while the first
 * one had had one.
 *
 * Deliberately short and mostly opacity. A page that slides a long way on
 * arrival reads as a slideshow, and this one has a fixed bar and a smooth
 * scroller that both have to stay put while it happens.
 */
const PageTransition = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
