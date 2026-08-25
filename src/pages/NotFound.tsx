import { Link, useLocation } from "react-router-dom";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/motion/Magnetic";

/**
 * The 404 someone actually lands on.
 *
 * This was the untouched starter page: a bare centred div with no navigation
 * and no footer, an "Oops! Page not found" that sounds like nobody's site, and
 * a raw anchor to "/" that ignores the base path and reloads the whole app.
 * A wrong link is the worst moment to hand a visitor a dead end, so it now
 * wears the site, keeps the bar and the footer, and offers the three places
 * worth going instead of one.
 */
const NotFound = () => {
  const { pathname } = useLocation();

  const routes = [
    { to: "/work", label: "The work", note: "Systems and tools from real environments." },
    { to: "/fuel-laws", label: "The five fuel laws", note: "The framework, free and open." },
    { to: "/about", label: "Who I am", note: "How this started, and where it goes." },
  ];

  return (
    <Layout>
      <SEO
        title="Page not found, Guilherme Neves"
        description="That page does not exist. Here is where the work actually lives."
        path={pathname}
      />
      <section className="section-padding section-spacing">
        <div className="max-content">
          <Reveal>
            <p className="text-caption mb-6">404</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-display max-w-3xl">This page doesn't exist.</h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-body-lg max-w-xl mt-8">
              Either the link was wrong or something moved. Nothing is lost, the
              work is all still here.
            </p>
          </Reveal>

          <div className="mt-14 md:mt-20 border-t border-border/60">
            {routes.map((r, i) => (
              <Reveal key={r.to} delay={0.25 + i * 0.08}>
                <Link
                  to={r.to}
                  className="group flex items-baseline justify-between gap-6 py-6 border-b border-border/60 transition-colors duration-300 hover:bg-card/50"
                >
                  <span className="min-w-0">
                    <span className="font-display text-xl md:text-2xl font-medium text-foreground">
                      {r.label}
                    </span>
                    <span className="block text-body text-sm mt-1">{r.note}</span>
                  </span>
                  <span
                    aria-hidden
                    className="shrink-0 font-display text-sm text-muted-foreground transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.5}>
            <Magnetic as="span" strength={7} className="inline-block mt-12">
              <Link
                to="/"
                className="inline-flex items-center justify-center px-9 py-4 bg-foreground text-background font-display text-sm font-medium tracking-wide transition-all duration-500 hover:tracking-wider"
              >
                Back to the start
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
