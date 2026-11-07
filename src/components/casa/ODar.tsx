import { Link } from "react-router-dom";
import Reveal from "@/components/Reveal";
import atlasPreview from "@/assets/work-previews/football-nutrition-atlas-preview.webp";

/**
 * 03 · O que eu dou. É AQUI que o Radar vive: uma peça entre três, e não a
 * porta do site. Foi o travão dele a 6 nov ("isso seria voltar o website
 * inteiro só à volta do radar"), e estava certo: uma ferramenta de um público
 * na entrada de todos.
 *
 * Grátis e sem email para ver, porque a primeira acção do site é receber e não
 * entregar (correção 5 dele, 3 nov). O email pede-se no fim da página, depois
 * de haver valor.
 *
 * As cinco verificações têm capa de letra e não o cartão de referência: esse
 * cartão ainda diz "The Five Fuel Laws" e "Hydrate to Dominate", a marca de
 * método que já foi tirada duas vezes por soar a guru.
 */

const RadarCapa = () => (
  <div
    className="w-full aspect-[4/3] p-6 md:p-7 flex flex-col justify-between"
    style={{ background: "hsl(var(--charcoal-deep))", color: "hsl(var(--ivory))" }}
    aria-hidden="true"
  >
    <p className="t-kicker" style={{ color: "hsl(var(--ivory) / 0.5)" }}>
      Every study, two grades
    </p>
    {/* As quatro leituras são as da tabela dele, "como ler o resultado", no
        guia do Radar: alta com alta lê-se primeiro, alta sem utilidade é boa
        ciência noutro contexto, moderada com utilidade pede prudência, e a
        evidência baixa é contexto e nada mais, seja qual for a utilidade. */}
    <div className="grid grid-cols-[auto,1fr,1fr] gap-x-3 gap-y-2 items-center text-[0.72rem] font-body">
      <span />
      <span className="t-kicker text-center" style={{ color: "hsl(var(--ivory) / 0.5)" }}>
        Useful
      </span>
      <span className="t-kicker text-center" style={{ color: "hsl(var(--ivory) / 0.5)" }}>
        Not useful
      </span>
      <span className="t-kicker self-center" style={{ color: "hsl(var(--ivory) / 0.5)" }}>
        Strong
      </span>
      <span className="py-3 px-2 text-center font-semibold" style={{ background: "hsl(var(--olive-light))" }}>
        Read first
      </span>
      <span className="py-3 px-2 text-center" style={{ background: "hsl(var(--ivory) / 0.08)" }}>
        Good science, not your case
      </span>
      <span className="t-kicker self-center" style={{ color: "hsl(var(--ivory) / 0.5)" }}>
        Moderate
      </span>
      <span className="py-3 px-2 text-center" style={{ background: "hsl(var(--ivory) / 0.16)" }}>
        Worth a look, act with care
      </span>
      <span className="py-3 px-2 text-center" style={{ background: "hsl(var(--ivory) / 0.04)" }}>
        &nbsp;
      </span>
      <span className="t-kicker self-center" style={{ color: "hsl(var(--ivory) / 0.5)" }}>
        Weak
      </span>
      <span className="col-span-2 py-3 px-2 text-center" style={{ background: "hsl(var(--ivory) / 0.04)" }}>
        Context, and nothing more
      </span>
    </div>
  </div>
);

const CincoCapa = () => (
  <div
    className="w-full aspect-[4/3] p-6 md:p-7 flex items-end"
    style={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--foreground) / 0.12)" }}
    aria-hidden="true"
  >
    <span className="t-mega" style={{ fontSize: "clamp(5rem, 10vw, 9rem)" }}>
      5
    </span>
  </div>
);

const pecas = [
  {
    titulo: "The Evidence Radar",
    texto:
      "A weekly research routine an AI runs against rules I wrote. Every study gets two grades: how strong the evidence is, and whether it changes anything on Monday morning.",
    nota: "More than 80 people asked for it in August 2026.",
    para: "/trabalho?a=evidence-radar",
    capa: <RadarCapa />,
  },
  {
    titulo: "The five checks",
    texto:
      "The five things I check before anything else in a performance environment, each with the work behind it.",
    nota: "Free, whole, on one page.",
    para: "/cinco-verificacoes",
    capa: <CincoCapa />,
  },
  {
    titulo: "Football Nutrition Atlas",
    texto:
      "Nine pages that turn football nutrition research into the decisions a player actually makes on the day, from the pre-match plate to recovery.",
    nota: "Finished. Three real pages to see.",
    para: "/trabalho?a=football-nutrition-atlas",
    capa: (
      <img
        src={atlasPreview}
        alt="Three pages of the Football Nutrition Atlas: the cover, the matchday flow and the cheat sheet."
        className="w-full aspect-[4/3] object-cover"
        loading="lazy"
      />
    ),
  },
];

const ODar = () => (
  <section id="dar" className="section-padding section-spacing" style={{ background: "hsl(var(--ivory-dim))" }}>
    <div className="max-content">
      <Reveal>
        <p className="t-kicker" style={{ color: "hsl(var(--graphite))" }}>
          03 · Given away
        </p>
      </Reveal>
      <div className="grid md:grid-cols-12 gap-x-8 gap-y-6 mt-8 items-end">
        <Reveal className="md:col-span-6" delay={0.05}>
          {/* Era "Made for me first.", tirado do guia do Radar. Lá funciona
              porque a frase continua ("e partilho porque não faz sentido
              guardar"); cortada num título, lia-se como egoísmo. Travão
              dele a 7 nov. */}
          <h2 className="t-title">Take what I use.</h2>
        </Reveal>
        <Reveal className="md:col-span-5 md:col-start-8" delay={0.1}>
          <p className="text-body-lg">
            The same tools I work with, given whole. Free, and no email to see any of it.
          </p>
        </Reveal>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mt-16">
        {pecas.map((p, i) => (
          <Reveal key={p.titulo} delay={0.08 * i}>
            <Link to={p.para} className="group block">
              <div className="overflow-hidden">
                <div className="transition-transform duration-700 ease-out group-hover:scale-[1.03]">
                  {p.capa}
                </div>
              </div>
              <p className="font-display font-bold text-2xl tracking-tight mt-6">{p.titulo}</p>
              <p className="text-body mt-3">{p.texto}</p>
              <p className="t-kicker mt-4" style={{ color: "hsl(var(--graphite))" }}>
                {p.nota}
              </p>
              <p className="font-body text-sm font-semibold mt-5 link-underline">Open it →</p>
            </Link>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <Link to="/trabalho" className="inline-block font-body text-sm font-semibold mt-16 link-underline">
          Everything I’ve built, in Work →
        </Link>
      </Reveal>
    </div>
  </section>
);

export default ODar;
