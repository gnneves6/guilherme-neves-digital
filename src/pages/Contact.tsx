import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import Reveal from "@/components/Reveal";
import { LINKS } from "@/data/links";
import { supabase } from "@/integrations/supabase/client";

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
      <SEO title="Engagement Enquiry — GN Performance Systems" description="Enquire about an embedded engagement, diagnostic, education programme or advisory." path="/contact" />
      <section className="section-padding section-spacing">
        <div className="max-content">
          <Reveal>
            <p className="text-caption mb-6">Chapter 04 — Engagement</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-display max-w-4xl">Enquire about an engagement.</h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-body-lg max-w-xl mt-8">
              GN Performance Systems works with a small number of organisations at a time.
              A short note about the environment and what you're trying to solve is the
              best place to start a conversation.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="section-padding max-content">
        <div className="divider" />
      </div>

      <section className="section-padding section-spacing">
        <div className="max-content grid md:grid-cols-[1fr,320px] lg:grid-cols-[1fr,400px] gap-16 md:gap-20">
          {/* Form */}
          <Reveal>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-20 text-center"
              >
                <h2 className="text-headline mb-4">Enquiry received.</h2>
                <p className="text-body-lg">
                  Thank you. You'll get a reply within a few working days.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-8 text-body text-sm link-underline hover:text-foreground transition-colors"
                >
                  Send another enquiry
                </button>
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
                    <option value="Embedded engagement">Embedded engagement</option>
                    <option value="Diagnostic / audit">Diagnostic / audit</option>
                    <option value="Education programme">Education programme</option>
                    <option value="Advisory">Advisory</option>
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
                <motion.button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center px-10 py-4 bg-foreground text-background font-display text-sm font-medium tracking-wide transition-all duration-300 hover:opacity-85 disabled:opacity-50"
                  whileHover={loading ? {} : { y: -1 }}
                  whileTap={loading ? {} : { scale: 0.98 }}
                >
                  {loading ? "Sending..." : "Send enquiry"}
                </motion.button>
              </form>
            )}
          </Reveal>

          {/* Links */}
          <Reveal delay={0.2}>
            <div className="space-y-12">
              <div className="space-y-4">
                <p className="text-caption">Direct</p>
                <a
                  href={`mailto:${LINKS.EMAIL}`}
                  className="text-body-lg link-underline hover:text-foreground transition-colors"
                >
                  {LINKS.EMAIL}
                </a>
                <p className="text-body text-sm">
                  For organisations that prefer email over the form above.
                </p>
              </div>
              <div className="space-y-4">
                <p className="text-caption">Professional</p>
                <a
                  href={LINKS.LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-body-lg link-underline hover:text-foreground transition-colors"
                >
                  LinkedIn ↗
                </a>
              </div>
              <div className="space-y-4">
                <p className="text-caption">Based</p>
                <p className="text-body-lg">Porto · Brussels</p>
                <p className="text-body text-sm">Working with organisations internationally.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
