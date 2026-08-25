import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { scrollToTop } from "@/components/motion/SmoothScroll";

/**
 * Three destinations, and one action.
 *
 * Six links asked a stranger to choose before they knew what any of it was.
 * These three answer the only three questions someone actually arrives with:
 * what has he done, what can I get, and who is he. Home is the wordmark, so
 * it does not need a seventh slot, and Fuel Laws is a thing you are handed on
 * the way past rather than a place you go looking for, so it lives in the
 * page bodies and the footer where the links to it already are.
 */
const navItems = [
  { label: "Work", path: "/work" },
  { label: "Services", path: "/services" },
  { label: "About", path: "/about" },
];

const CTA = { label: "Get in touch", path: "/contact" };

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  const handleHomeClick = useCallback((e: React.MouseEvent) => {
    if (isHome) {
      e.preventDefault();
      scrollToTop(false);
    }
  }, [isHome]);

  // Dark hero mode
  const inDarkHero = isHome && !scrolled;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <motion.div
        className="border-b transition-all duration-500"
        animate={{
          backgroundColor: scrolled
            ? "hsl(var(--background) / 0.95)"
            : "transparent",
          borderColor: scrolled
            ? "hsl(var(--border) / 0.5)"
            : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "blur(0px)",
        }}
        transition={{ duration: 0.4 }}
      >
        <nav className="section-padding max-content flex items-center justify-between h-16 md:h-20">
          <Link
            to="/"
            onClick={handleHomeClick}
            className={`font-display text-lg md:text-xl font-semibold tracking-tight transition-colors duration-500 ${
              inDarkHero ? "text-[hsl(var(--ivory))]" : "text-foreground"
            }`}
          >
            Guilherme Neves
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                aria-current={location.pathname === item.path ? "page" : undefined}
                className={`relative text-sm font-body tracking-wide transition-colors duration-300 ${
                  location.pathname === item.path
                    ? inDarkHero ? "text-[hsl(var(--ivory))]" : "text-foreground"
                    : inDarkHero
                      ? "text-[hsl(var(--ivory)/0.5)] hover:text-[hsl(var(--ivory)/0.9)]"
                      : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="activeNav"
                    className={`absolute -bottom-1 left-0 right-0 h-px ${
                      inDarkHero ? "bg-[hsl(var(--ivory))]" : "bg-foreground"
                    }`}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>
            ))}

            {/* The action, given a shape the three links do not have, so the
                one thing worth doing never competes with navigation. */}
            <Link
              to={CTA.path}
              aria-current={location.pathname === CTA.path ? "page" : undefined}
              className="ml-2 inline-flex items-center px-5 py-2 rounded-full text-sm font-display tracking-wide transition-all duration-300 hover:opacity-85"
              style={
                inDarkHero
                  ? { background: "hsl(var(--ivory))", color: "hsl(var(--charcoal-deep))" }
                  : { background: "hsl(var(--foreground))", color: "hsl(var(--background))" }
              }
            >
              {CTA.label}
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            <motion.span
              className={`block w-6 h-px origin-center ${inDarkHero ? "bg-[hsl(var(--ivory))]" : "bg-foreground"}`}
              animate={isOpen ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className={`block w-6 h-px ${inDarkHero ? "bg-[hsl(var(--ivory))]" : "bg-foreground"}`}
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className={`block w-6 h-px origin-center ${inDarkHero ? "bg-[hsl(var(--ivory))]" : "bg-foreground"}`}
              animate={isOpen ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </nav>
      </motion.div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            id="mobile-menu"
            className="md:hidden bg-background/98 backdrop-blur-md border-b border-border overflow-hidden"
          >
            <div className="section-padding py-8 flex flex-col gap-6">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.1, duration: 0.4 }}
                >
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    aria-current={location.pathname === item.path ? "page" : undefined}
                    className={`font-display text-2xl font-medium transition-colors ${
                      location.pathname === item.path
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.05 + 0.1, duration: 0.4 }}
                className="pt-2"
              >
                <Link
                  to={CTA.path}
                  onClick={() => setIsOpen(false)}
                  aria-current={location.pathname === CTA.path ? "page" : undefined}
                  className="inline-flex items-center px-6 py-3 rounded-full font-display text-base font-medium tracking-wide bg-foreground text-background"
                >
                  {CTA.label}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
