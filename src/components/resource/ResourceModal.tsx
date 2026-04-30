import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { Artefact } from "@/data/artefacts";
import { statusMeta } from "@/data/artefacts";

interface Props {
  artefact: Artefact | null;
  onClose: () => void;
}

const isFormCta = (t: string) =>
  t === "request-access" || t === "waitlist" || t === "early-access";

const ctaIntro: Record<string, { title: string; body: string; submit: string; success: string }> = {
  "request-access": {
    title: "Request Access",
    body: "This resource is not publicly available. Share a quick note and I'll review your request personally.",
    submit: "Submit Request",
    success: "Request received. You'll hear back shortly.",
  },
  waitlist: {
    title: "Join the Waitlist",
    body: "Get notified when this is released. No spam — only the launch note.",
    submit: "Join Waitlist",
    success: "You're on the list. Thank you.",
  },
  "early-access": {
    title: "Early Access",
    body: "Be first to test this when it ships. Reserved for performance staff, athletes and partners.",
    submit: "Request Early Access",
    success: "Reserved. You'll be contacted when access opens.",
  },
  protected: {
    title: "Protected Resource",
    body: "This artefact is confidential and exists to demonstrate work, not to be shared. Reach out if you'd like to discuss the methodology.",
    submit: "",
    success: "",
  },
  "view-sample": {
    title: "Sample Preview",
    body: "A condensed preview of the structure. The full resource lives in the private archive.",
    submit: "",
    success: "",
  },
};

const ResourceModal = ({ artefact, onClose }: Props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (artefact) {
      setName(""); setEmail(""); setMessage(""); setSubmitted(false);
      document.body.style.overflow = "hidden";
      const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
      window.addEventListener("keydown", onKey);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", onKey);
      };
    }
  }, [artefact, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    // Local capture — backend-ready (resource_interest table shape)
    const payload = {
      created_at: new Date().toISOString(),
      name: name.trim().slice(0, 100),
      email: email.trim().slice(0, 255),
      resource_slug: artefact?.slug,
      interest_type: artefact?.ctaType,
      message_optional: message.trim().slice(0, 1000) || null,
    };
    try {
      const existing = JSON.parse(localStorage.getItem("resource_interest") || "[]");
      localStorage.setItem("resource_interest", JSON.stringify([...existing, payload]));
    } catch {/* ignore */}
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {artefact && (() => {
        const intro = ctaIntro[artefact.ctaType] ?? ctaIntro["view-sample"];
        const showForm = isFormCta(artefact.ctaType);
        const s = statusMeta[artefact.status];
        return (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute inset-0 backdrop-blur-md"
              style={{ background: "hsl(var(--charcoal-deep) / 0.85)" }}
              onClick={onClose}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="resource-modal-title"
              className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto"
              style={{ background: "hsl(var(--ivory))", color: "hsl(var(--charcoal))" }}
              initial={{ y: 24, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 16, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute top-4 right-4 p-2 hover:opacity-60 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="p-8 md:p-10">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.dot }} />
                  <span className="text-[10px] tracking-[0.25em] uppercase font-display opacity-60">
                    {s.label} · {artefact.type}
                  </span>
                </div>

                <h3
                  id="resource-modal-title"
                  className="font-display text-2xl md:text-3xl font-semibold leading-tight"
                >
                  {artefact.title}
                </h3>

                <p className="text-sm leading-relaxed mt-4 opacity-75">
                  {artefact.description}
                </p>

                <div className="mt-6 pt-6 border-t" style={{ borderColor: "hsl(var(--charcoal) / 0.08)" }}>
                  <p className="text-[10px] tracking-widest uppercase font-display opacity-50 mb-2">
                    What it proves
                  </p>
                  <p className="text-sm opacity-80">{artefact.whatItProves}</p>
                </div>

                <div className="mt-6 pt-6 border-t" style={{ borderColor: "hsl(var(--charcoal) / 0.08)" }}>
                  <p className="text-sm font-medium">{intro.title}</p>
                  <p className="text-xs opacity-65 mt-1 leading-relaxed">{intro.body}</p>
                </div>

                {showForm && !submitted && (
                  <form onSubmit={handleSubmit} className="mt-6 space-y-3">
                    <input
                      type="text"
                      required
                      maxLength={100}
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 text-sm bg-transparent border focus:outline-none focus:border-foreground/60 transition-colors"
                      style={{ borderColor: "hsl(var(--charcoal) / 0.15)" }}
                    />
                    <input
                      type="email"
                      required
                      maxLength={255}
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 text-sm bg-transparent border focus:outline-none focus:border-foreground/60 transition-colors"
                      style={{ borderColor: "hsl(var(--charcoal) / 0.15)" }}
                    />
                    <textarea
                      placeholder="Context (optional)"
                      value={message}
                      maxLength={1000}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 text-sm bg-transparent border focus:outline-none focus:border-foreground/60 transition-colors resize-none"
                      style={{ borderColor: "hsl(var(--charcoal) / 0.15)" }}
                    />
                    <button
                      type="submit"
                      className="w-full py-3 text-xs tracking-widest uppercase font-display font-medium transition-all hover:tracking-[0.25em]"
                      style={{ background: "hsl(var(--charcoal-deep))", color: "hsl(var(--ivory))" }}
                    >
                      {intro.submit}
                    </button>
                  </form>
                )}

                {showForm && submitted && (
                  <div className="mt-6 p-4 text-sm" style={{ background: "hsl(var(--olive) / 0.08)" }}>
                    {intro.success}
                  </div>
                )}

                {artefact.ctaType === "view-sample" && (
                  <div className="mt-6 grid grid-cols-3 gap-2">
                    {[1,2,3].map((n) => (
                      <div
                        key={n}
                        className="aspect-[3/4] flex items-center justify-center text-[9px] tracking-[0.3em] uppercase font-display opacity-40"
                        style={{ background: "hsl(var(--charcoal) / 0.04)", border: "1px solid hsl(var(--charcoal) / 0.08)" }}
                      >
                        Page {n}
                      </div>
                    ))}
                  </div>
                )}

                {artefact.ctaType === "view" && artefact.externalUrl && (
                  <a
                    href={artefact.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-6 w-full py-3 text-xs tracking-widest uppercase font-display font-medium text-center transition-all hover:tracking-[0.25em]"
                    style={{ background: "hsl(var(--charcoal-deep))", color: "hsl(var(--ivory))" }}
                  >
                    Open Resource →
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        );
      })()}
    </AnimatePresence>
  );
};

export default ResourceModal;