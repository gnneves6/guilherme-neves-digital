import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { audiences } from "@/data/audiences";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/motion/Magnetic";
import { LINKS } from "@/data/links";
import { supabase } from "@/integrations/supabase/client";
import portrait from "@/assets/guilherme-portrait.webp";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organisation: "",
    engagementType: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();

  // Someone arriving from a specific audience on /services already told us why
  // they came. Carrying that through means they do not restate it, and the
  // enquiry lands already labelled.
  const arrivedAbout = audiences.find((a) => a.anchor === searchParams.get("about"));

  useEffect(() => {
    if (arrivedAbout) {
      setFormData((f) => (f.engagementType ? f : { ...f, engagementType: arrivedAbout.label }));
    }
  }, [arrivedAbout]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const subjectLine = [
      formData.organisation.trim() && `Organisation: ${formData.organisation.trim()}`,
      formData.engagementType.trim() && `Engagement: ${formData.engagementType.trim()}`,
    ]
      .filter(Boolean)
      .join(" · ");

    const payload = {
      created_at: new Date().toISOString(),
      name: formData.name.trim().slice(0, 100),
      email: formData.email.trim().slice(0, 255),
      subject: subjectLine.slice(0, 200),
      message: formData.message.trim().slice(0, 2000),
      source_page: "engagement-enquiry",
    };

    try {
      const { error: dbError } = await supabase.from('contact_messages').insert(payload);
      if (dbError) throw dbError;
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <SEO title="Contact Guilherme Neves" description="Tell me what you are trying to solve. Every enquiry comes straight to me and I reply personally." path="/contact" />
      <section className="section-padding section-spacing">
        <div className="max-content">
          <Reveal>
            <p className="text-caption mb-6">Chapter 04, Engagement</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-display max-w-4xl">Tell me what you're trying to solve.</h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-body-lg max-w-xl mt-8">
              I work closely with a small number of environments at a time. If nutrition
              isn't holding up the way it should, a few honest lines about what you're
              facing are the best place to start.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="section-padding max-content">
        <div className="divider" />
      </div>

      <section className="section-padding section-spacing">
        <div className="max-content grid md:grid-cols-[1fr,320px] lg:grid-cols-[1fr,400px] gap-12 md:gap-20">
          {/* Form */}
          <Reveal>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-20 text-center"
              >
                <h2 className="text-headline mb-4">Got it, it's with me now.</h2>
                <p className="text-body-lg max-w-md mx-auto">
                  Thank you for the note. I read every enquiry myself and will reply
                  personally, usually within a few working days. Talk soon.
                </p>
                {/* Someone has just written to him and now has days to wait.
                    The only thing here used to be "send another enquiry", which
                    almost nobody wants, so the page went quiet at the warmest
                    moment it will ever have. Hand them the free thing instead. */}
                <Magnetic as="span" strength={7} className="inline-block mt-8">
                  <Link
                    to="/fuel-laws"
                    className="inline-flex items-center justify-center px-9 py-4 bg-foreground text-background font-display text-sm font-medium tracking-wide transition-all duration-500 hover:tracking-wider"
                  >
                    While you wait, take the five laws
                  </Link>
                </Magnetic>
                <div className="mt-6">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-body text-sm py-2 link-underline hover:text-foreground transition-colors"
                  >
                    Send another enquiry
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-2">
                  <label className="text-caption text-xs">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full bg-transparent border-b border-border py-3 text-foreground font-body text-base focus:outline-none focus:border-foreground transition-colors duration-300 placeholder:text-muted-foreground/40"
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-caption text-xs">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full bg-transparent border-b border-border py-3 text-foreground font-body text-base focus:outline-none focus:border-foreground transition-colors duration-300 placeholder:text-muted-foreground/40"
                    placeholder="your@email.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-caption text-xs">Organisation</label>
                  <input
                    type="text"
                    value={formData.organisation}
                    onChange={(e) =>
                      setFormData({ ...formData, organisation: e.target.value })
                    }
                    className="w-full bg-transparent border-b border-border py-3 text-foreground font-body text-base focus:outline-none focus:border-foreground transition-colors duration-300 placeholder:text-muted-foreground/40"
                    placeholder="Club, federation, academy, company"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-caption text-xs">Type of engagement</label>
                  <select
                    value={formData.engagementType}
                    onChange={(e) =>
                      setFormData({ ...formData, engagementType: e.target.value })
                    }
                    className="w-full bg-transparent border-b border-border py-3 text-foreground font-body text-base focus:outline-none focus:border-foreground transition-colors duration-300"
                  >
                    <option value="">Select one</option>
                    {audiences.map((a) => (
                      <option key={a.id} value={a.label}>
                        {a.label}
                      </option>
                    ))}
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-caption text-xs">Context</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full bg-transparent border-b border-border py-3 text-foreground font-body text-base focus:outline-none focus:border-foreground transition-colors duration-300 resize-none placeholder:text-muted-foreground/40"
                    placeholder="A few lines about the environment, the people involved, and what you'd like to solve."
                  />
                </div>
                {error && (
                  <p className="text-sm" style={{ color: "hsl(0, 60%, 55%)" }}>{error}</p>
                )}
                <div className="flex flex-col sm:flex-row sm:items-center gap-x-5 gap-y-3">
                  <Magnetic as="span" strength={6}>
                    <motion.button
                      type="submit"
                      disabled={loading}
                      className="inline-flex items-center justify-center px-10 py-4 bg-foreground text-background font-display text-sm font-medium tracking-wide transition-all duration-300 hover:opacity-85 disabled:opacity-50"
                      whileHover={loading ? {} : { y: -1 }}
                      whileTap={loading ? {} : { scale: 0.98 }}
                    >
                      {loading ? "Sending..." : "Send it over"}
                    </motion.button>
                  </Magnetic>
                  <p className="text-caption text-[10px] text-muted-foreground max-w-[16rem] leading-relaxed">
                    No obligation. Read personally, usually answered within a few working days.
                  </p>
                </div>
              </form>
            )}
          </Reveal>

          {/* Who you're reaching, and what happens next */}
          <Reveal delay={0.2}>
            <div className="md:sticky md:top-28">
              <div className="flex items-center gap-4">
                <img
                  src={portrait}
                  alt="Guilherme Neves"
                  className="w-14 h-14 rounded-full object-cover shrink-0"
                  style={{ objectPosition: "center 28%" }}
                />
                <div>
                  <p className="font-display text-base font-medium text-foreground">Guilherme Neves</p>
                  <p className="text-caption text-[10px]">Reads and replies personally</p>
                </div>
              </div>
              <p className="text-body text-sm mt-5 leading-relaxed max-w-sm">
                Every enquiry comes straight to me. No inbox to get lost in, no
                gatekeeper, no template reply.
              </p>

              <div className="mt-10">
                <p className="text-caption mb-6">What happens next</p>
                <ol className="space-y-5">
                  {[
                    "You send a few lines about the environment and what you want to solve.",
                    "I reply personally, usually within a few working days.",
                    "If it fits, we take a short call. No pressure, no obligation.",
                  ].map((step, i) => (
                    <li key={i} className="flex gap-4">
                      <span
                        className="flex items-center justify-center w-6 h-6 rounded-full shrink-0 text-[10px] font-display tabular-nums"
                        style={{ border: "1px solid hsl(var(--olive) / 0.5)", color: "hsl(var(--olive))" }}
                      >
                        {i + 1}
                      </span>
                      <span className="text-body text-sm leading-snug max-w-xs">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-10 pt-8 space-y-6 border-t border-border/60">
                <div className="space-y-1.5">
                  <p className="text-caption text-[10px]">Prefer email</p>
                  <a
                    href={`mailto:${LINKS.EMAIL}`}
                    className="text-body text-sm link-underline hover:text-foreground transition-colors"
                  >
                    {LINKS.EMAIL}
                  </a>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1.5">
                    <p className="text-caption text-[10px]">Based</p>
                    <p className="text-body text-sm">Porto · Brussels</p>
                  </div>
                  <a
                    href={LINKS.LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-body text-sm py-2 link-underline hover:text-foreground transition-colors"
                  >
                    LinkedIn ↗
                  </a>
                </div>

                {/* Not everyone who reaches this page is ready to write, and
                    until now the only way onward from here led off the site
                    entirely. Two doors back into the work. */}
                <div className="pt-6 border-t border-border/60 space-y-3">
                  <p className="text-caption text-[10px]">Not ready yet</p>
                  {[
                    { to: "/work", label: "See the work first" },
                    { to: "/fuel-laws", label: "Take the five fuel laws" },
                  ].map((l) => (
                    <Link
                      key={l.to}
                      to={l.to}
                      className="group flex items-center justify-between gap-4 py-2 text-body text-sm hover:text-foreground transition-colors duration-300"
                    >
                      {l.label}
                      <span
                        aria-hidden
                        className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
