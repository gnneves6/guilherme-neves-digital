import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, Globe, Layers, Sparkles, ArrowRight, ArrowUpRight } from "lucide-react";
import type { Artefact, AppliedAccessType } from "@/data/artefacts";
import { accessMeta } from "@/data/artefacts";
import { supabase } from "@/integrations/supabase/client";
import { LINKS } from "@/data/links";

interface Props {
  artefact: Artefact | null;
  onClose: () => void;
}

const ivory = (a: number) => `hsl(var(--ivory) / ${a})`;

const deriveAccessType = (a: Artefact): AppliedAccessType => {
  const explicit = (a as Artefact & { accessType?: AppliedAccessType }).accessType;
  if (explicit) return explicit;
  if (a.status === "Protected") return "protected";
  if (a.status === "In Development") return "in-development";
  // Public default — anything else with a notion / external URL is treated as public
  if (a.group === "systems" || a.group === "tools") return "internal";
  return "public";
};

const AccessIcon = ({
  kind,
  color,
  className,
}: {
  kind: "globe" | "layers" | "lock" | "sparkle";
  color: string;
  className?: string;
}) => {
  const props = { className, style: { color } } as const;
  if (kind === "globe") return <Globe {...props} />;
  if (kind === "layers") return <Layers {...props} />;
  if (kind === "lock") return <Lock {...props} />;
  return <Sparkles {...props} />;
};

const Block = ({
  label,
  children,
  accent,
}: {
  label: string;
  children: React.ReactNode;
  accent?: string;
}) => (
  <div
    className="rounded-sm p-5 md:p-6"
    style={{
      background: "hsl(220 22% 8% / 0.55)",
      border: `1px solid ${ivory(0.06)}`,
    }}
  >
    <div className="flex items-center gap-2 mb-3">
      <span
        className="block w-4 h-px"
        style={{ background: accent ?? ivory(0.3) }}
      />
      <p
        className="text-[10px] tracking-[0.3em] uppercase font-display"
        style={{ color: ivory(0.55) }}
      >
        {label}
      </p>
    </div>
    <div
      className="text-[13.5px] leading-relaxed"
      style={{ color: ivory(0.78) }}
    >
      {children}
    </div>
  </div>
);

const ResourceModal = ({ artefact, onClose }: Props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (artefact) {
      setName(""); setEmail(""); setMessage(""); setConsent(false); setSubmitted(false); setLoading(false); setShowForm(false);
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
        const accessType = deriveAccessType(artefact);
        const meta = accessMeta[accessType];
        const heroImage =
          (artefact as Artefact & { previewImage?: string }).previewImage ??
          (artefact.previewImages && artefact.previewImages[0]);
        const externalCta =
          accessType === "public"
            ? artefact.notionUrl || artefact.externalUrl || LINKS.NOTION_PORTFOLIO_URL
            : null;
        const useForm = accessType !== "public";
        const number = (artefact as Artefact & { number?: string }).number;
        const positioningLine =
          (artefact as Artefact & { positioningLine?: string }).positioningLine;

        return (
          <motion.div
            className="fixed inset-0 z-[100] flex items-start md:items-center justify-center p-3 md:p-8 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="fixed inset-0 backdrop-blur-md"
              style={{ background: "hsl(220 30% 4% / 0.85)" }}
              onClick={onClose}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="resource-modal-title"
              className="relative w-full max-w-[1040px] my-4 md:my-0 rounded-md overflow-hidden"
              style={{
                background:
                  "linear-gradient(180deg, hsl(220 24% 8% / 0.98), hsl(220 28% 5% / 0.98))",
                border: `1px solid ${ivory(0.08)}`,
                boxShadow: "0 60px 140px -40px hsl(0 0% 0% / 0.9)",
                color: "hsl(var(--ivory))",
              }}
              initial={{ y: 24, opacity: 0, scale: 0.985 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 16, opacity: 0, scale: 0.985 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* grain texture */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.6'/></svg>\")",
                }}
              />

              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute top-3 right-3 md:top-4 md:right-4 z-30 p-2 rounded-sm transition-all hover:bg-[hsl(var(--ivory)/0.08)]"
                style={{
                  background: "hsl(220 30% 4% / 0.6)",
                  border: `1px solid ${ivory(0.12)}`,
                  color: ivory(0.8),
                }}
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative max-h-[92vh] overflow-y-auto">
                {/* Hero visual */}
                {heroImage && (
                  <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden">
                    <img
                      src={heroImage}
                      alt={artefact.previewAlt ?? artefact.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    {/* dark gradient bottom */}
                    <div
                      aria-hidden
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(180deg, hsl(220 30% 4% / 0.15) 0%, hsl(220 30% 4% / 0) 35%, hsl(220 28% 5% / 0.85) 95%)",
                      }}
                    />
                    {/* vignette */}
                    <div
                      aria-hidden
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 55%, hsl(220 30% 4% / 0.5) 100%)",
                      }}
                    />

                    {/* number + status badge over image */}
                    <div className="absolute left-5 md:left-8 bottom-5 md:bottom-7 flex items-center gap-3 flex-wrap">
                      {number && (
                        <span
                          className="text-[11px] tracking-[0.4em] uppercase font-display"
                          style={{ color: ivory(0.55) }}
                        >
                          {number}
                        </span>
                      )}
                      <span
                        className="inline-flex items-center gap-2 px-2.5 py-1 rounded-sm"
                        style={{
                          background: meta.background,
                          border: `1px solid ${meta.border}`,
                        }}
                      >
                        <AccessIcon
                          kind={meta.icon}
                          color={meta.accent}
                          className="w-3 h-3"
                        />
                        <span
                          className="text-[10px] tracking-[0.28em] uppercase font-display"
                          style={{ color: ivory(0.85) }}
                        >
                          {meta.label}
                        </span>
                      </span>
                      {(artefact.context || artefact.type) && (
                        <span
                          className="text-[10px] tracking-[0.28em] uppercase font-display hidden sm:inline"
                          style={{ color: ivory(0.55) }}
                        >
                          {artefact.context ?? artefact.type}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Header */}
                <div className="px-5 md:px-10 pt-7 md:pt-9">
                  {!heroImage && (
                    <div className="flex items-center gap-2 mb-5 flex-wrap">
                      {number && (
                        <span
                          className="text-[11px] tracking-[0.4em] uppercase font-display"
                          style={{ color: ivory(0.55) }}
                        >
                          {number}
                        </span>
                      )}
                      <span
                        className="inline-flex items-center gap-2 px-2.5 py-1 rounded-sm"
                        style={{
                          background: meta.background,
                          border: `1px solid ${meta.border}`,
                        }}
                      >
                        <AccessIcon
                          kind={meta.icon}
                          color={meta.accent}
                          className="w-3 h-3"
                        />
                        <span
                          className="text-[10px] tracking-[0.28em] uppercase font-display"
                          style={{ color: ivory(0.85) }}
                        >
                          {meta.label}
                        </span>
                      </span>
                    </div>
                  )}

                  <h3
                    id="resource-modal-title"
                    className="font-display font-semibold leading-[1.1] tracking-tight text-2xl md:text-[34px]"
                    style={{ color: ivory(0.96) }}
                  >
                    {artefact.title}
                  </h3>

                  {(positioningLine || artefact.description) && (
                    <p
                      className="mt-4 text-[15px] md:text-base leading-relaxed max-w-[62ch]"
                      style={{ color: ivory(0.72) }}
                    >
                      {positioningLine ?? artefact.description}
                    </p>
                  )}

                  {/* meta row */}
                  <div
                    className="mt-6 pt-5 flex flex-wrap gap-x-6 gap-y-2"
                    style={{ borderTop: `1px solid ${ivory(0.06)}` }}
                  >
                    {artefact.context && (
                      <div className="flex items-center gap-2">
                        <span
                          className="text-[9px] tracking-[0.3em] uppercase font-display"
                          style={{ color: ivory(0.4) }}
                        >
                          Context
                        </span>
                        <span
                          className="text-[11px] font-display"
                          style={{ color: ivory(0.78) }}
                        >
                          {artefact.context}
                        </span>
                      </div>
                    )}
                    {artefact.category && (
                      <div className="flex items-center gap-2">
                        <span
                          className="text-[9px] tracking-[0.3em] uppercase font-display"
                          style={{ color: ivory(0.4) }}
                        >
                          Category
                        </span>
                        <span
                          className="text-[11px] font-display"
                          style={{ color: ivory(0.78) }}
                        >
                          {artefact.category}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Content blocks */}
                <div className="px-5 md:px-10 pt-7 md:pt-8 grid gap-3 md:gap-4 md:grid-cols-2">
                  {artefact.problem && (
                    <Block label="Problem" accent={meta.accent}>
                      {artefact.problem}
                    </Block>
                  )}
                  {artefact.whatIBuilt && (
                    <Block label="What I built" accent={meta.accent}>
                      {artefact.whatIBuilt}
                    </Block>
                  )}
                  {artefact.whyItMatters && (
                    <Block label="Why it matters" accent={meta.accent}>
                      {artefact.whyItMatters}
                    </Block>
                  )}
                  {artefact.previewNote && (
                    <Block label="Preview" accent={meta.accent}>
                      {artefact.previewNote}
                    </Block>
                  )}
                  {artefact.confidentialityNote && (
                    <div className="md:col-span-2">
                      <Block label="Confidentiality" accent={meta.accent}>
                        {artefact.confidentialityNote}
                      </Block>
                    </div>
                  )}
                  {!artefact.problem &&
                    !artefact.whatIBuilt &&
                    !artefact.whyItMatters &&
                    artefact.whatItProves && (
                      <div className="md:col-span-2">
                        <Block label="What it proves" accent={meta.accent}>
                          {artefact.whatItProves}
                        </Block>
                      </div>
                    )}
                </div>

                {/* Access panel */}
                <div className="px-5 md:px-10 pt-8 md:pt-10 pb-8 md:pb-10">
                  <div
                    className="rounded-sm p-6 md:p-7"
                    style={{
                      background: meta.background,
                      border: `1px solid ${meta.border}`,
                    }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <AccessIcon
                        kind={meta.icon}
                        color={meta.accent}
                        className="w-3.5 h-3.5"
                      />
                      <span
                        className="text-[10px] tracking-[0.3em] uppercase font-display"
                        style={{ color: meta.accent }}
                      >
                        Access · {meta.label}
                      </span>
                    </div>
                    <p
                      className="font-display text-lg md:text-xl leading-snug"
                      style={{ color: ivory(0.95) }}
                    >
                      {meta.panelTitle}
                    </p>
                    <p
                      className="text-[13.5px] leading-relaxed mt-3 max-w-[62ch]"
                      style={{ color: ivory(0.7) }}
                    >
                      {meta.panelBody}
                    </p>
                    <p
                      className="text-[12px] leading-relaxed mt-4 max-w-[62ch]"
                      style={{ color: ivory(0.5) }}
                    >
                      {meta.accessNote}
                    </p>

                    {/* CTA */}
                    <div className="mt-6">
                      {externalCta && !showForm && (
                        <a
                          href={externalCta}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-3 rounded-sm text-[11px] tracking-[0.28em] uppercase font-display font-medium transition-all"
                          style={{
                            background: meta.accent,
                            color: "hsl(220 30% 6%)",
                          }}
                        >
                          {meta.ctaLabel}
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      )}

                      {useForm && !showForm && !submitted && (
                        <button
                          onClick={() => setShowForm(true)}
                          className="inline-flex items-center gap-2 px-5 py-3 rounded-sm text-[11px] tracking-[0.28em] uppercase font-display font-medium transition-all hover:tracking-[0.32em]"
                          style={{
                            background: ivory(0.92),
                            color: "hsl(220 30% 6%)",
                            border: `1px solid ${meta.border}`,
                          }}
                        >
                          {meta.ctaLabel}
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {useForm && showForm && !submitted && (
                        <form onSubmit={handleSubmit} className="mt-2 space-y-3">
                          <div className="grid sm:grid-cols-2 gap-3">
                            <input
                              type="text"
                              required
                              maxLength={100}
                              placeholder="Name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="w-full px-4 py-3 text-sm bg-transparent focus:outline-none transition-colors rounded-sm"
                              style={{
                                border: `1px solid ${ivory(0.12)}`,
                                color: ivory(0.92),
                              }}
                            />
                            <input
                              type="email"
                              required
                              maxLength={255}
                              placeholder="Email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="w-full px-4 py-3 text-sm bg-transparent focus:outline-none transition-colors rounded-sm"
                              style={{
                                border: `1px solid ${ivory(0.12)}`,
                                color: ivory(0.92),
                              }}
                            />
                          </div>
                          <textarea
                            placeholder={
                              accessType === "protected"
                                ? "Briefly describe your context (team, environment, role)…"
                                : "Context (optional)"
                            }
                            value={message}
                            maxLength={1000}
                            onChange={(e) => setMessage(e.target.value)}
                            rows={3}
                            className="w-full px-4 py-3 text-sm bg-transparent focus:outline-none transition-colors resize-none rounded-sm"
                            style={{
                              border: `1px solid ${ivory(0.12)}`,
                              color: ivory(0.92),
                            }}
                          />
                          <label className="flex items-start gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={consent}
                              onChange={(e) => setConsent(e.target.checked)}
                              required
                              className="mt-1 w-3.5 h-3.5 accent-current"
                            />
                            <span
                              className="text-[10px] leading-relaxed"
                              style={{ color: ivory(0.55) }}
                            >
                              I agree to be contacted privately about this work. No spam, no list.
                            </span>
                          </label>
                          <div className="flex flex-wrap gap-3 pt-1">
                            <button
                              type="submit"
                              disabled={loading}
                              className="inline-flex items-center gap-2 px-5 py-3 rounded-sm text-[11px] tracking-[0.28em] uppercase font-display font-medium transition-all hover:tracking-[0.32em] disabled:opacity-50"
                              style={{
                                background: meta.accent,
                                color: "hsl(220 30% 6%)",
                              }}
                            >
                              {loading ? "Sending…" : meta.ctaLabel}
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => setShowForm(false)}
                              className="inline-flex items-center px-4 py-3 rounded-sm text-[11px] tracking-[0.28em] uppercase font-display transition-colors"
                              style={{ color: ivory(0.6) }}
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      )}

                      {useForm && submitted && (
                        <div
                          className="mt-2 rounded-sm p-4 text-[13px]"
                          style={{
                            background: "hsl(220 22% 8% / 0.5)",
                            border: `1px solid ${meta.border}`,
                            color: ivory(0.8),
                          }}
                        >
                          Received. I'll reply personally — usually within a few days.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        );
      })()}
    </AnimatePresence>
  );
};

export default ResourceModal;