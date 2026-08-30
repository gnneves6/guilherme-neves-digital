import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { recordView } from "@/lib/analytics";

/**
 * One line of the only feedback this site has ever had.
 *
 * Sits inside the router so it sees a route change, which on a single page
 * application is the only moment that corresponds to what a person would call
 * arriving at a page. Records the path, never the search string: `?about=clubs`
 * is harmless but `?` is where personal things end up, and a counter has no
 * business holding any of it.
 *
 * The hash is kept, because on this site the hash is which door was open, and
 * that is the most useful thing the counter can possibly learn.
 */
const PageViews = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    recordView(pathname + hash);
  }, [pathname, hash]);

  return null;
};

export default PageViews;
