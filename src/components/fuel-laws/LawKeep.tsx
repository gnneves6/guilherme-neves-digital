import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/motion/Magnetic";
import { supabase } from "@/integrations/supabase/client";
import cardPreview from "@/assets/fuel-laws-reference-preview.png";

/**
 * LawKeep, the takeaway step at the end of the framework.
 *
 * The card is given first, with no gate, because a reference someone
 * actually keeps (or forwards to their staff) travels further than a
 * download form. The invitation to stay in touch appears only once the
 * value has landed, which is the honest moment to ask.
 */
const LawKeep = () => {
  const cardUrl = `${import.meta.env.BASE_URL}fuel-laws-reference.pdf`;

  const [taken, setTaken] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const { error: dbError } = await supabase.from("resource_interest").insert({
        created_at: new Date().toISOString(),
        name: name.trim().slice(0, 100) || "Not given",
        email: email.trim().slice(0, 255),
        resource_slug: "fuel-laws-reference-card",
        resource_title: "Fuel Laws Reference Card",
        interest_type: "reference-card",
        message_optional: null,
        consent: true,
        source_page: "/fuel-laws",
      });
      if (dbError) throw dbError;
      setDone(true);
    } catch {
      setError("That didn't go through. Try again in a moment.");
    } finally {
      setLoading(false);
    }
  };

  const field =
    "w-full bg-transparent border-b border-border py-2.5 text-foreground font-body text-sm focus:outline-none focus:border-foreground transition-colors duration-300 placeholder:text-muted-foreground/40";

  return (
    <section className="section-padding section-spacing">
      <div className="max-content grid md:grid-cols-[300px,1fr] lg:grid-cols-[360px,1fr] gap-10 md:gap-16 items-center">
        {/* The object itself, shown as a real thing you can hold */}
        <Reveal>
          <motion.div
            className="relative"
            initial={{ rotate: -1.5 }}
            whileHover={{ rotate: 0, y: -4 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <img
              src={cardPreview}
              alt="The fuel laws reference card, a single printable page listing all five laws with their practical actions."
              className="w-full h-auto rounded-sm"
              style={{
                boxShadow:
                  "0 30px 60px -25px hsl(45 12% 10% / 0.4), 0 4px 12px -4px hsl(45 12% 10% / 0.2)",
                border: "1px solid hsl(var(--subtle-border))",
              }}
            />
          </motion.div>
        </Reveal>

        <div>
          <Reveal>
            <p className="text-caption mb-5">Take it with you</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-headline max-w-lg">
              Keep the five laws where the work actually happens.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-body-lg max-w-lg mt-5">
              One page, the whole framework. Print it for the kitchen, the gym or the
              staff room, or hand it to an athlete. Same five laws you just read,
              written to survive a real week.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-x-5 gap-y-3">
              <Magnetic as="span" strength={6}>
                <motion.a
                  href={cardUrl}
                  download
                  onClick={() => setTaken(true)}
                  className="inline-flex items-center gap-2.5 px-8 py-4 bg-foreground text-background font-display text-sm font-medium tracking-wide transition-all duration-300 hover:opacity-85"
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Download the card <span aria-hidden>↓</span>
                </motion.a>
              </Magnetic>
              <p className="text-caption text-[10px] text-muted-foreground">
                Free, and no email needed.
              </p>
            </div>
          </Reveal>

          {/* The ask, only after the value has landed */}
          <AnimatePresence>
            {taken && !done && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                className="overflow-hidden"
              >
                <div
                  className="mt-9 pt-8 max-w-lg"
                  style={{ borderTop: "1px solid hsl(var(--subtle-border))" }}
                >
                  <p className="text-body">
                    That one is yours to keep. I am building the applied versions of
                    each law, the systems and tools that sit underneath them. If you
                    want them as they are ready, leave your email.
                  </p>
                  <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={field}
                        placeholder="First name"
                        aria-label="First name"
                      />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={field}
                        placeholder="your@email.com"
                        aria-label="Email"
                      />
                    </div>
                    {error && (
                      <p className="text-sm" style={{ color: "hsl(0, 60%, 55%)" }}>
                        {error}
                      </p>
                    )}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-x-5 gap-y-3">
                      <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex items-center justify-center px-8 py-3.5 font-display text-sm font-medium tracking-wide transition-all duration-300 hover:opacity-85 disabled:opacity-50"
                        style={{ background: "hsl(var(--olive))", color: "hsl(var(--ivory))" }}
                      >
                        {loading ? "Sending..." : "Send them my way"}
                      </button>
                      {/* The consent line, which the record already claimed and
                          the page never showed. `consent: true` was being
                          written to the database on a form that told nobody
                          what it was consenting to, and gave them nowhere to
                          look it up. */}
                      <p className="text-caption text-[10px] text-muted-foreground max-w-[19rem] leading-relaxed">
                        Your address is kept by me, used only to send you the
                        work, and dropped the moment you ask.{" "}
                        <Link to="/privacy" className="link-underline">
                          What I do with it
                        </Link>
                        .
                      </p>
                    </div>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {done && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-9 pt-8 max-w-lg"
                style={{ borderTop: "1px solid hsl(var(--subtle-border))" }}
              >
                <p className="font-display text-lg font-medium text-foreground">
                  You're on the list.
                </p>
                <p className="text-body mt-2">
                  I'll send the applied versions as they're finished. If you want to
                  talk before then, the door is open.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default LawKeep;
