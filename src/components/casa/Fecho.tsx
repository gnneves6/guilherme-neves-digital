import { useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "@/components/Reveal";
import { supabase } from "@/integrations/supabase/client";
import retrato from "@/assets/guilherme-portrait.webp";

/**
 * O fecho. Fecha-se com imagem e nunca com slogan (historia.md, regra 3), e a
 * imagem é dele: os toques na parede de casa. As maiúsculas e o ";)" ficam,
 * porque são a aresta imperfeita que faz isto soar a uma pessoa.
 *
 * Por baixo, a lista, e só aqui: o email pede-se depois de haver valor, nunca
 * à entrada. Um campo. O nome é opcional porque a tabela exige um e pedir dois
 * campos a quem só quer ficar a saber é pedir trabalho.
 */
const Fecho = () => {
  const [email, setEmail] = useState("");
  const [estado, setEstado] = useState<"parado" | "a-enviar" | "feito" | "erro">("parado");

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    const limpo = email.trim();
    if (!limpo) return;
    setEstado("a-enviar");
    try {
      const { error } = await supabase.from("resource_interest").insert({
        created_at: new Date().toISOString(),
        name: "Not given",
        email: limpo.slice(0, 255),
        resource_slug: "the-list",
        resource_title: "The list",
        interest_type: "list",
        message_optional: null,
        consent: true,
        source_page: "/",
      });
      if (error) throw error;
      setEstado("feito");
    } catch {
      setEstado("erro");
    }
  };

  return (
    <section className="section-padding section-spacing">
      <div className="max-content grid md:grid-cols-12 gap-x-8 gap-y-14 items-end">
        <div className="md:col-span-8">
          <Reveal>
            <p className="t-quote">And here I am, still kicking a ball against the wall at home.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-body-lg mt-8 max-w-xl">
              Because the passion and the joy can (AND SHOULD) live on inside us ;)
            </p>
          </Reveal>
        </div>
        <Reveal className="md:col-span-3 md:col-start-10" delay={0.1}>
          <img
            src={retrato}
            alt="Guilherme Neves, smiling."
            className="w-full aspect-square object-cover"
            loading="lazy"
          />
        </Reveal>
      </div>

      <div className="max-content mt-24 md:mt-32 border-t pt-10" style={{ borderColor: "hsl(var(--foreground) / 0.15)" }}>
        <div className="grid md:grid-cols-12 gap-x-8 gap-y-6 items-end">
          <div className="md:col-span-5">
            <p className="t-kicker" style={{ color: "hsl(var(--graphite))" }}>
              The list
            </p>
            <p className="font-display font-bold text-2xl md:text-3xl tracking-tight mt-3">
              One email when something new is finished.
            </p>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            {estado === "feito" ? (
              <p className="text-body-lg">Done. The next thing I finish goes to you first.</p>
            ) : (
              <form onSubmit={enviar} className="flex flex-col sm:flex-row gap-3">
                <label htmlFor="lista-email" className="sr-only">
                  Email
                </label>
                <input
                  id="lista-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 bg-transparent border-b py-3 font-body text-base focus:outline-none"
                  style={{ borderColor: "hsl(var(--foreground) / 0.35)" }}
                />
                <button
                  type="submit"
                  disabled={estado === "a-enviar"}
                  className="font-body text-sm font-semibold px-7 py-4 disabled:opacity-60"
                  style={{ background: "hsl(var(--foreground))", color: "hsl(var(--background))" }}
                >
                  {estado === "a-enviar" ? "Sending" : "Send"}
                </button>
              </form>
            )}
            {estado === "erro" && (
              <p className="text-body mt-3">That didn’t go through. Try again in a moment.</p>
            )}
            <p className="text-body mt-4" style={{ fontSize: "0.8rem" }}>
              Nothing else, and you can leave whenever you want.{" "}
              <Link to="/privacidade" className="underline">
                How this is kept
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Fecho;
