import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { audiences, audiencesByState } from "@/data/audiences";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/motion/Magnetic";
import { LINKS } from "@/data/links";
import { supabase } from "@/integrations/supabase/client";
import portrait from "@/assets/guilherme-portrait.webp";
import PlanGrid from "@/components/motion/PlanGrid";
import ArrivingLetter from "@/components/motion/ArrivingLetter";

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
      setError("Alguma coisa correu mal. Tente outra vez.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <SEO title="Falar comigo, Guilherme Neves" description="Diga-me o que está a tentar resolver. Cada contacto vem direito a mim e sou eu que respondo." path="/contacto" />
      <section className="section-padding section-spacing">
        <div className="max-content">
          <Reveal>
            <p className="text-caption mb-6">Contacto</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-display max-w-4xl">Diga-me o que está a tentar resolver.</h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-body-lg max-w-xl mt-8">
              Trabalho de perto com poucos ambientes de cada vez. Se a nutrição
              não está a aguentar como devia, umas linhas francas sobre o que
              tem à frente são o melhor sítio para começar.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="section-padding max-content">
        <div className="divider" />
      </div>

      {/* Clipped, because the sheet flies in from off the right edge and a
          page that scrolls sideways for a second is worse than no animation. */}
      <section className="section-padding section-spacing relative overflow-hidden">
        <PlanGrid />
        <div className="max-content grid md:grid-cols-[1fr,320px] lg:grid-cols-[1fr,400px] gap-12 md:gap-20 relative">
          {/* Form, delivered rather than displayed */}
          <ArrivingLetter>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-20 text-center"
              >
                <h2 className="text-headline mb-4">Recebido, já está comigo.</h2>
                <p className="text-body-lg max-w-md mx-auto">
                  Obrigado pela mensagem. Leio todos os contactos e respondo eu,
                  normalmente em poucos dias úteis. Até já.
                </p>
                {/* Someone has just written to him and now has days to wait.
                    The only thing here used to be "send another enquiry", which
                    almost nobody wants, so the page went quiet at the warmest
                    moment it will ever have. Hand them the free thing instead. */}
                <Magnetic as="span" strength={7} className="inline-block mt-8">
                  <Link
                    to="/cinco-verificacoes"
                    className="inline-flex items-center justify-center px-9 py-4 bg-foreground text-background font-display text-sm font-medium tracking-wide transition-all duration-500 hover:tracking-wider"
                  >
                    Enquanto espera, faça as cinco verificações
                  </Link>
                </Magnetic>
                <div className="mt-6">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-body text-sm py-2 link-underline hover:text-foreground transition-colors"
                  >
                    Enviar outra mensagem
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
                  <label className="text-caption text-xs">Organização</label>
                  <input
                    type="text"
                    value={formData.organisation}
                    onChange={(e) =>
                      setFormData({ ...formData, organisation: e.target.value })
                    }
                    className="w-full bg-transparent border-b border-border py-3 text-foreground font-body text-base focus:outline-none focus:border-foreground transition-colors duration-300 placeholder:text-muted-foreground/40"
                    placeholder="Clube, federação, academia, empresa"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-caption text-xs">Tipo de trabalho</label>
                  <select
                    value={formData.engagementType}
                    onChange={(e) =>
                      setFormData({ ...formData, engagementType: e.target.value })
                    }
                    className="w-full bg-transparent border-b border-border py-3 text-foreground font-body text-base focus:outline-none focus:border-foreground transition-colors duration-300"
                  >
                    <option value="">Escolha uma</option>
                    {/* Grouped the same way /services groups them, so someone
                        who chose a door there does not meet a flat list here
                        and wonder whether it is the same six. */}
                    {audiencesByState.map((group) => (
                      <optgroup key={group.state} label={group.meta.group}>
                        {group.items.map((a) => (
                          <option key={a.id} value={a.label}>
                            {a.label}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                    <option value="Outro">Outro</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-caption text-xs">Contexto</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full bg-transparent border-b border-border py-3 text-foreground font-body text-base focus:outline-none focus:border-foreground transition-colors duration-300 resize-none placeholder:text-muted-foreground/40"
                    placeholder="Umas linhas sobre o ambiente, as pessoas envolvidas, e o que gostaria de resolver."
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
                      {loading ? "A enviar..." : "Enviar"}
                    </motion.button>
                  </Magnetic>
                  <p className="text-caption text-[10px] text-muted-foreground max-w-[16rem] leading-relaxed">
                    Sem compromisso. Lido por mim, normalmente respondido em
                    poucos dias úteis.{" "}
                    <Link to="/privacidade" className="link-underline">
                      O que acontece ao que envia
                    </Link>
                    .
                  </p>
                </div>
              </form>
            )}
          </ArrivingLetter>

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
                  <p className="text-caption text-[10px]">Lê e responde pessoalmente</p>
                </div>
              </div>
              <p className="text-body text-sm mt-5 leading-relaxed max-w-sm">
                Cada contacto vem direito a mim. Não há caixa onde se perca, não
                há intermediário, não há resposta de modelo.
              </p>

              <div className="mt-10">
                <p className="text-caption mb-6">O que acontece a seguir</p>
                <ol className="space-y-5">
                  {[
                    "Manda umas linhas sobre o ambiente e sobre o que quer resolver.",
                    "Respondo eu, normalmente em poucos dias úteis.",
                    "Se fizer sentido, temos uma chamada curta. Sem pressão e sem compromisso.",
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
                    { to: "/trabalho", label: "See the work first" },
                    { to: "/cinco-verificacoes", label: "Take the five checks" },
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
