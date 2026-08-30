import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import type { Product } from "@/data/products";

/**
 * The first priced thing on this site.
 *
 * It does not take payment yet, and pretending otherwise would be the one lie
 * this site cannot afford. Card details need accounts that are not mine to
 * open, so the button reserves a copy instead: the price is stated, what is
 * inside is listed, and the reader decides at the real number rather than
 * discovering it later. Somebody who leaves their address at eighty-nine euros
 * has told us something no amount of reasoning about this market could.
 *
 * That is also the honest version of a first edition, which is what this is.
 * Nothing here says "coming soon" as a way of avoiding a decision: the product
 * is defined, priced, and its limits are printed next to it.
 *
 * Writes to `resource_interest`, the table the reference card already uses, so
 * the demand signal lands next to the rest of the list rather than in a second
 * system nobody remembers to read.
 */
const ProductCard = ({ product }: { product: Product }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const { error: dbError } = await supabase.from("resource_interest").insert({
        created_at: new Date().toISOString(),
        name: name.trim().slice(0, 100) || "Not given",
        email: email.trim().slice(0, 255),
        resource_slug: product.slug,
        resource_title: product.name,
        interest_type: "product-reservation",
        message_optional: null,
        consent: true,
        source_page: "/services",
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
    <div
      className="mt-8 max-w-2xl"
      style={{ border: "1px solid hsl(var(--olive) / 0.3)", background: "hsl(41 45% 97%)" }}
    >
      <div className="p-5 md:p-6">
        <div className="flex items-baseline justify-between gap-4 flex-wrap">
          <p className="text-caption text-[10px]">Ready to run</p>
          <p
            className="font-display text-2xl font-semibold tabular-nums"
            style={{ color: "hsl(var(--olive))" }}
          >
            &euro;{product.priceEur}
          </p>
        </div>

        <h3 className="font-display text-xl font-semibold text-foreground mt-2">
          {product.name}
        </h3>
        <p className="text-body mt-2">{product.promise}</p>

        <ul className="mt-5 space-y-2.5">
          {product.contains.map((c) => (
            <li key={c} className="flex items-start gap-3 text-sm leading-snug">
              <span
                className="mt-[7px] w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: "hsl(var(--olive))" }}
              />
              <span style={{ color: "hsl(var(--graphite))" }}>{c}</span>
            </li>
          ))}
        </ul>

        {/* Printed next to the price, not buried under it. A structure for a
            group sold as though it were a plan for a person is exactly the
            thing this whole site refuses to do. */}
        <p className="text-caption text-[10px] mt-5 leading-relaxed max-w-lg">
          {product.limits}
        </p>

        <div className="mt-6">
          <AnimatePresence mode="wait">
            {done ? (
              <motion.p
                key="done"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-body text-sm"
              >
                Noted, and thank you. You will hear from me the day it is ready,
                at the price above, before anybody else.
              </motion.p>
            ) : open ? (
              <motion.form
                key="form"
                onSubmit={submit}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    className={field}
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    className={field}
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {error && <p className="text-sm" style={{ color: "hsl(0 50% 42%)" }}>{error}</p>}
                <div className="flex flex-col sm:flex-row sm:items-center gap-x-5 gap-y-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center px-7 py-3 font-display text-sm font-medium tracking-wide transition-all duration-300 hover:opacity-85 disabled:opacity-50"
                    style={{ background: "hsl(var(--olive))", color: "hsl(var(--ivory))" }}
                  >
                    {loading ? "Sending..." : "Hold one for me"}
                  </button>
                  <p className="text-caption text-[10px] text-muted-foreground max-w-[19rem] leading-relaxed">
                    No payment now and no charge without you saying yes again.{" "}
                    <Link to="/privacy" className="link-underline">
                      What I do with your address
                    </Link>
                    .
                  </p>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="cta"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col sm:flex-row sm:items-center gap-x-5 gap-y-2"
              >
                <button
                  onClick={() => setOpen(true)}
                  className="inline-flex items-center justify-center px-7 py-3 font-display text-sm font-medium tracking-wide transition-all duration-300 hover:opacity-85"
                  style={{ background: "hsl(var(--olive))", color: "hsl(var(--ivory))" }}
                >
                  Reserve a copy
                </button>
                <p className="text-caption text-[10px] text-muted-foreground max-w-[20rem] leading-relaxed">
                  First edition, not yet released. If it does not do what it says
                  here, I give the money back.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
