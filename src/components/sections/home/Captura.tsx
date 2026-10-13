import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/motion/Magnetic";
import { supabase } from "@/integrations/supabase/client";

/**
 * A captura, e é a razão de esta página existir.
 *
 * Um post fez oito mil visualizações com mil e quinhentos seguidores, e o
 * link do perfil mandava essas pessoas para um directório desactualizado.
 * Isto não é uma secção de newsletter, é o buraco por onde saiu uma
 * audiência medida.
 *
 * O que estava aqui antes pedia o email para dar "o que vou construindo":
 * uma descrição dele, não uma troca. Pede-se o email em troca da grelha das
 * cinco dimensões, que é a coisa que a secção acima acabou de mostrar a
 * funcionar, porque o que converteu nas redes converteu sempre pela mesma
 * razão: a peça estava incompleta sem aquilo que o portão dava.
 *
 * ⚠️ A grelha tem de existir antes de isto ir para o ar. Um formulário que
 * promete um ficheiro que não é enviado queima o contacto e a lista de uma
 * vez.
 *
 * Insere em `resource_interest`, a tabela que já existe e já tem RLS, em vez
 * de criar outra. Um formulário que não guarda nada é pior do que não ter
 * formulário nenhum, porque a fuga continua e passa a ser invisível.
 */
const Captura = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const submeter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setErro(null);
    try {
      const { error } = await supabase.from("resource_interest").insert({
        created_at: new Date().toISOString(),
        name: nome.trim().slice(0, 100) || "Não indicado",
        email: email.trim().slice(0, 255),
        resource_slug: "grelha-cinco-dimensoes",
        resource_title: "Grelha das cinco dimensões",
        interest_type: "grelha",
        message_optional: null,
        consent: true,
        source_page: "/",
      });
      if (error) throw error;
      setDone(true);
    } catch {
      setErro("Não foi. Tenta outra vez daqui a um bocado.");
    } finally {
      setLoading(false);
    }
  };

  const campo =
    "w-full bg-transparent border-b border-border py-2.5 text-foreground font-body text-sm focus:outline-none focus:border-foreground transition-colors duration-300 placeholder:text-muted-foreground/40";

  return (
    <section className="section-padding section-spacing-sm border-t border-border/60">
      <div className="max-content max-w-2xl">
        <Reveal>
          <p className="text-caption mb-6">Leva isto contigo</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="text-headline">
            A grelha das cinco dimensões, para aplicares à tua estrutura.
          </h2>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="text-body-lg mt-5">
            Uma página. As cinco perguntas que faço quando entro num clube, o
            que procurar em cada uma e o que fazer com a resposta. Usa-a
            sozinho, hoje, sem me contratares.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-9">
            <AnimatePresence mode="wait">
              {done ? (
                <motion.p
                  key="feito"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-display text-xl text-foreground"
                >
                  Recebido. Mando-ta para esse email.
                </motion.p>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={submeter}
                  exit={{ opacity: 0 }}
                  className="grid sm:grid-cols-2 gap-x-6 gap-y-5"
                >
                  <label className="block">
                    <span className="sr-only">Nome</span>
                    <input
                      type="text"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      placeholder="Nome"
                      autoComplete="name"
                      className={campo}
                    />
                  </label>
                  <label className="block">
                    <span className="sr-only">Email</span>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      autoComplete="email"
                      className={campo}
                    />
                  </label>
                  <div className="sm:col-span-2 flex flex-col sm:flex-row sm:items-center gap-4 mt-2">
                    <Magnetic as="span" strength={6}>
                      <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex items-center justify-center px-9 py-4 bg-foreground text-background font-display text-sm font-medium tracking-wide transition-all duration-500 hover:tracking-wider disabled:opacity-50"
                      >
                        {loading ? "A enviar" : "Quero a grelha"}
                      </button>
                    </Magnetic>
                    <p className="text-caption text-[10px] text-muted-foreground">
                      Sem newsletter semanal e sem dar o teu endereço a ninguém.{" "}
                      <Link to="/privacy" className="link-underline">
                        O que faço com os dados
                      </Link>
                    </p>
                  </div>
                  {erro && (
                    <p className="sm:col-span-2 text-sm" style={{ color: "hsl(var(--olive))" }}>
                      {erro}
                    </p>
                  )}
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <p className="mt-14 text-[10px] tracking-[0.35em] uppercase font-display opacity-40">
            Guilherme Neves · Porto
          </p>
        </Reveal>
      </div>
    </section>
  );
};

export default Captura;
