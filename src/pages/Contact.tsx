import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import Reveal from "@/components/Reveal";
import { LINKS } from "@/data/links";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      created_at: new Date().toISOString(),
      name: formData.name.trim().slice(0, 100),
      email: formData.email.trim().slice(0, 255),
      subject: formData.subject.trim().slice(0, 200),
      message: formData.message.trim().slice(0, 2000),
      source_page: "contact",
    };

    // Backend-ready: when Supabase is connected, replace localStorage with insert to contact_messages table
    // TODO: Replace with supabase.from('contact_messages').insert(payload)
    try {
      const existing = JSON.parse(localStorage.getItem("contact_messages") || "[]");
      localStorage.setItem("contact_messages", JSON.stringify([...existing, payload]));
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <section className="section-padding section-spacing">
        <div className="max-content">
          <Reveal>
            <p className="text-caption mb-6">Contact</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-display max-w-4xl">Let's connect.</h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-body-lg max-w-xl mt-8">
              Open to meaningful opportunities in performance environments, educational
              systems and applied sport nutrition projects. If there's alignment, let's talk.
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
                <h2 className="text-headline mb-4">Message sent.</h2>
                <p className="text-body-lg">Thank you. I'll get back to you soon.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-8 text-body text-sm link-underline hover:text-foreground transition-colors"
                >
                  Send another message
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
                  <label className="text-caption text-xs">Subject</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="w-full bg-transparent border-b border-border py-3 text-foreground font-body text-base focus:outline-none focus:border-foreground transition-colors duration-300 placeholder:text-muted-foreground/40"
                    placeholder="What's this about?"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-caption text-xs">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full bg-transparent border-b border-border py-3 text-foreground font-body text-base focus:outline-none focus:border-foreground transition-colors duration-300 resize-none placeholder:text-muted-foreground/40"
                    placeholder="Tell me about your project or opportunity..."
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
                  {loading ? "Sending..." : "Send Message"}
                </motion.button>
              </form>
            )}
          </Reveal>

          {/* Links */}
          <Reveal delay={0.2}>
            <div className="space-y-12">
              <div className="space-y-4">
                <p className="text-caption">Email</p>
                <a
                  href={`mailto:${LINKS.EMAIL}`}
                  className="text-body-lg link-underline hover:text-foreground transition-colors"
                >
                  {LINKS.EMAIL}
                </a>
              </div>
              <div className="space-y-4">
                <p className="text-caption">Phone</p>
                <a
                  href="tel:+351936071216"
                  className="text-body-lg link-underline hover:text-foreground transition-colors"
                >
                  +351 936 071 216
                </a>
              </div>
              <div className="space-y-4">
                <p className="text-caption">Social</p>
                <div className="flex flex-col gap-3">
                  {[
                    { label: "LinkedIn", href: LINKS.LINKEDIN_URL },
                    { label: "Linktree", href: LINKS.LINKTREE_URL },
                  ].map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-body-lg link-underline w-fit hover:text-foreground transition-colors group flex items-center gap-2"
                    >
                      {link.label}
                      <span className="text-xs opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1 transition-all duration-300">↗</span>
                    </a>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-caption">Location</p>
                <p className="text-body-lg">Porto, Portugal · Brussels, Belgium</p>
                <p className="text-body text-sm">Open to international opportunities.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
