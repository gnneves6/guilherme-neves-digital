import { useState } from "react";
import Layout from "@/components/Layout";
import Reveal from "@/components/Reveal";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `mailto:hello@guilhermeneves.com?subject=Contact from ${formData.name}&body=${encodeURIComponent(formData.message)}%0A%0AFrom: ${formData.name} (${formData.email})`;
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
              Open to meaningful opportunities, practical projects, educational
              systems and performance environments. If there's alignment, let's
              talk.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="section-padding max-content">
        <div className="divider" />
      </div>

      <section className="section-padding section-spacing">
        <div className="max-content grid md:grid-cols-2 gap-20">
          {/* Form */}
          <Reveal>
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
              <button
                type="submit"
                className="inline-flex items-center justify-center px-10 py-4 bg-foreground text-background font-display text-sm font-medium tracking-wide transition-all duration-300 hover:opacity-85"
              >
                Send Message
              </button>
            </form>
          </Reveal>

          {/* Links */}
          <Reveal delay={0.2}>
            <div className="space-y-12">
              <div className="space-y-4">
                <p className="text-caption">Email</p>
                <a
                  href="mailto:hello@guilhermeneves.com"
                  className="text-body-lg link-underline hover:text-foreground transition-colors"
                >
                  hello@guilhermeneves.com
                </a>
              </div>
              <div className="space-y-4">
                <p className="text-caption">Social</p>
                <div className="flex flex-col gap-3">
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-body-lg link-underline w-fit hover:text-foreground transition-colors"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-body-lg link-underline w-fit hover:text-foreground transition-colors"
                  >
                    Instagram
                  </a>
                  <a
                    href="https://linktr.ee"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-body-lg link-underline w-fit hover:text-foreground transition-colors"
                  >
                    Linktree
                  </a>
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
