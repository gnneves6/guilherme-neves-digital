import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import ImageLightbox from "./ImageLightbox";
import type { Artefact } from "@/data/artefacts";
import { statusMeta } from "@/data/artefacts";
import { supabase } from "@/integrations/supabase/client";

interface Props {
  artefact: Artefact | null;
  onClose: () => void;
}

const isFormCta = (t: string) =>
  t === "request-access" || t === "waitlist" || t === "early-access";

const ctaIntro: Record<string, { title: string; body: string; submit: string; success: string }> = {
  "request-access": {
    title: "Request Access",
    body: "This resource is protected because it contains private, internal or athlete-specific work. A public case-study version may be released later.",
    submit: "Submit Request",
    success: "Request received. You'll hear back shortly.",
  },
  waitlist: {
    title: "Join the Build List",
    body: "Get notified when this is released. No spam — only the launch note.",
    submit: "Join Waitlist",
    success: "You're on the build list. I'll notify you when this resource is ready.",
  },
  "early-access": {
    title: "Early Access",
    body: "Be first to test this when it ships. Reserved for performance staff, athletes and partners.",
    submit: "Request Early Access",
    success: "You're on the build list. I'll notify you when this resource is ready.",
  },
  protected: {
    title: "Protected Resource",
    body: "This resource is protected because it contains private, internal or athlete-specific work. A public case-study version may be released later.",
    submit: "",
    success: "",
  },
  "view-sample": {
    title: "Sample Preview",
    body: "A condensed preview of the structure and content.",
    submit: "",
    success: "",
  },
};

// Meaningful sample page labels per artefact
const samplePages: Record<string, string[]> = {
  "md-1-fuel-system": [
    "Matchday-minus-one structure",
    "Carbohydrate loading & hydration",
    "Familiar meals & practical checklist",
  ],
  "athlete-equivalent-bank": [
    "Carbohydrate options",
    "Protein options",
    "Flexible substitutions",
  ],
  "abc-of-football-nutrition": [
    "A — Athlete Fuel = Performance",
    "B — Build Your Base",
    "C — Care About Recovery",
  ],
};

const ResourceModal = ({ artefact, onClose }: Props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (artefact) {
      setName(""); setEmail(""); setMessage(""); setConsent(false); setSubmitted(false); setLoading(false); setLightboxIndex(null);
      document.body.style.overflow = "hidden";
      const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
      window.addEventListener("keydown", onKey);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", onKey);
      };
    }
  }, [artefact, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !consent) return;
    setLoading(true);

    // Backend-ready payload matching resource_interest table schema
    const payload = {
      created_at: new Date().toISOString(),
      name: name.trim().slice(0, 100),
      email: email.trim().slice(0, 255),
      resource_slug: artefact?.slug,
      resource_title: artefact?.title,
      interest_type: artefact?.ctaType,
      message_optional: message.trim().slice(0, 1000) || null,
      consent: true,
      source_page: window.location.pathname,
    };

    try {
      const { error: dbError } = await supabase.from('resource_interest').insert(payload);
      if (dbError) throw dbError;
      setSubmitted(true);
    } catch {
      setSubmitted(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {artefact && (() => {
        const intro = ctaIntro[artefact.ctaType] ?? ctaIntro["view-sample"];
        const showForm = isFormCta(artefact.ctaType);
        const s = statusMeta[artefact.status];
        const pages = samplePages[artefact.slug] ?? ["Section 1", "Section 2", "Section 3"];
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

                {/* Protected reason */}
                {(artefact.ctaType === "protected" || artefact.ctaType === "request-access") && (
                  <div className="mt-6 pt-6 border-t" style={{ borderColor: "hsl(var(--charcoal) / 0.08)" }}>
                    <p className="text-[10px] tracking-widest uppercase font-display opacity-50 mb-2">
                      Why protected
                    </p>
                    <p className="text-xs opacity-65 leading-relaxed">
                      This resource is protected because it contains private, internal or athlete-specific work. A public case-study version may be released later.
                    </p>
                  </div>
                )}

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
                    <label className="flex items-start gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        required
                        className="mt-1 w-3.5 h-3.5 accent-current"
                      />
                      <span className="text-[10px] leading-relaxed opacity-55">
                        By submitting, you agree to be contacted about this resource or related releases. No spam.
                      </span>
                    </label>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 text-xs tracking-widest uppercase font-display font-medium transition-all hover:tracking-[0.25em] disabled:opacity-50"
                      style={{ background: "hsl(var(--charcoal-deep))", color: "hsl(var(--ivory))" }}
                    >
                      {loading ? "Submitting..." : intro.submit}
                    </button>
                  </form>
                )}

                {showForm && submitted && (
                  <div className="mt-6 p-4 text-sm" style={{ background: "hsl(var(--olive) / 0.08)" }}>
                    {intro.success}
                  </div>
                )}

                {artefact.ctaType === "view-sample" && (
                  <div className="mt-6 space-y-4">
                    {artefact.previewImages && artefact.previewImages.length > 0 ? (
                      <div className="grid grid-cols-3 gap-2">
                        {artefact.previewImages.map((src, n) => (
                          <div
                            key={n}
                            className="aspect-[3/4] overflow-hidden rounded-sm cursor-pointer group"
                            style={{ border: "1px solid hsl(var(--charcoal) / 0.08)" }}
                            onClick={() => setLightboxIndex(n)}
                          >
                            <img
                              src={src}
                              alt={pages[n] ?? `Preview ${n + 1}`}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="grid grid-cols-3 gap-2">
                        {pages.map((label, n) => (
                          <div
                            key={n}
                            className="aspect-[3/4] flex flex-col items-center justify-center gap-2 text-center px-2 rounded-sm"
                            style={{ background: "hsl(var(--charcoal) / 0.04)", border: "1px solid hsl(var(--charcoal) / 0.08)" }}
                          >
                            <span className="text-[8px] tracking-[0.25em] uppercase font-display opacity-30">
                              {String(n + 1).padStart(2, "0")}
                            </span>
                            <span className="text-[9px] tracking-wide leading-snug font-display opacity-50">
                              {label}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                    {artefact.notionUrl && (
                      <a
                        href={artefact.notionUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full py-3 text-xs tracking-widest uppercase font-display font-medium text-center transition-all hover:tracking-[0.25em]"
                        style={{ background: "hsl(var(--charcoal-deep))", color: "hsl(var(--ivory))" }}
                      >
                        View full portfolio in Notion →
                      </a>
                    )}
                  </div>
                )}

                {artefact.ctaType === "protected" && (
                  <div className="mt-6 grid grid-cols-3 gap-2">
                    {[1, 2, 3].map((n) => (
                      <div
                        key={n}
                        className="aspect-[3/4] relative overflow-hidden"
                        style={{ background: "hsl(var(--charcoal) / 0.06)", border: "1px solid hsl(var(--charcoal) / 0.08)" }}
                      >
                        <div className="absolute inset-0 backdrop-blur-sm flex items-center justify-center">
                          <span className="text-[9px] tracking-[0.3em] uppercase font-display opacity-25">
                            Protected
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {artefact.ctaType === "view" && artefact.externalUrl && (
                  <div className="mt-6 space-y-2">
                    <a
                      href={artefact.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full py-3 text-xs tracking-widest uppercase font-display font-medium text-center transition-all hover:tracking-[0.25em]"
                      style={{ background: "hsl(var(--charcoal-deep))", color: "hsl(var(--ivory))" }}
                    >
                      View full portfolio in Notion →
                    </a>
                  </div>
                )}

                {artefact.ctaType === "view" && !artefact.externalUrl && (
                  <div className="mt-6 p-4 text-sm text-center opacity-55" style={{ background: "hsl(var(--charcoal) / 0.04)" }}>
                    Sample link coming soon.
                  </div>
                )}

              </div>

              {lightboxIndex !== null && artefact.previewImages && artefact.previewImages.length > 0 && (
                <ImageLightbox
                  images={artefact.previewImages}
                  initialIndex={lightboxIndex}
                  onClose={() => setLightboxIndex(null)}
                />
              )}
            </motion.div>
          </motion.div>
        );
      })()}
    </AnimatePresence>
  );
};

export default ResourceModal;