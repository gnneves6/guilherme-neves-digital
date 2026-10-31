import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "@/components/Reveal";
import type { Sitio as SitioData } from "@/data/terreno";

/**
 * Um sítio do terreno, e a mesma peça serve todos os outros.
 *
 * O segundo sítio custa um objecto de dados e nada de código, que é o que
 * "um tijolo de cada vez" tem de querer dizer para não virar seis semanas.
 *
 * ⚠️ O movimento é por CLIQUE e por TEMPO, nunca por scroll. O scroll não
 * existe na pré-visualização por onde ele vê o site, e já custou uma ronda
 * inteira: ele viu uma página parada e disse, com razão, que não tinha
 * mudado nada.
 *
 * O grão é um filtro SVG e não uma imagem, por duas razões: não pesa nada e
 * não se repete em padrão visível. É ele que faz a diferença entre uma
 * fotografia colada e uma superfície. "Artístico" aqui quer dizer cru com
 * intenção, que foi a palavra dele: robuscado.
 */
const CAMADAS = ["posicao", "artefacto", "perguntas"] as const;
type Camada = (typeof CAMADAS)[number];

const etiquetas: Record<Camada, string> = {
  posicao: "A posição",
  artefacto: "O que construí",
  perguntas: "O que me perguntam",
};

const Sitio = ({ sitio }: { sitio: SitioData }) => {
  const [camada, setCamada] = useState<Camada>("posicao");

  return (
    <section className="section-dark relative overflow-hidden">
      {/* A FOTOGRAFIA, a respirar devagar. Animação por tempo: sem scroll. */}
      <div aria-hidden className="absolute inset-0">
        <img
          src={sitio.foto}
          alt=""
          className="w-full h-full object-cover sitio-respira"
          style={{ objectPosition: "38% 20%" }}
        />
        {/* Escurece a sério, e por duas razões ao mesmo tempo. A legibilidade
            é a óbvia. A outra é de regra: esta fotografia tem mais gente lá
            dentro, e à escala de um ecrã inteiro passam a ser pessoas
            identificáveis, o que no retrato pequeno da página de percurso não
            acontecia. O enquadramento favorece-o a ele e o resto afunda. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, hsl(var(--charcoal-deep) / 0.985) 0%, hsl(var(--charcoal-deep) / 0.94) 38%, hsl(var(--charcoal-deep) / 0.8) 70%, hsl(var(--charcoal-deep) / 0.72) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 85% 75% at 50% 45%, transparent 0%, hsl(var(--charcoal-deep) / 0.85) 95%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 22% 40%, hsl(var(--olive) / 0.22), transparent 70%)",
          }}
        />
        {/* grão */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.2] mix-blend-overlay">
          <filter id="grao-sitio">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grao-sitio)" />
        </svg>
      </div>

      <div className="relative z-10 section-padding py-20 md:py-28">
        <div className="max-content">
          <Reveal>
            <p
              className="font-display text-[10px] tracking-[0.34em] uppercase"
              style={{ color: "hsl(var(--olive-light))" }}
            >
              O terreno · {sitio.numero}
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h2
              className="font-display font-semibold tracking-tight leading-[0.92] mt-5 text-[clamp(2.6rem,8vw,5.5rem)]"
              style={{ color: "hsl(var(--ivory))" }}
            >
              {sitio.nome}
            </h2>
          </Reveal>

          <Reveal delay={0.14}>
            <p
              className="font-display text-base md:text-xl italic mt-5 max-w-xl leading-snug"
              style={{ color: "hsl(var(--ivory) / 0.62)" }}
            >
              {sitio.tagline}
            </p>
          </Reveal>

          {/* AS CAMADAS */}
          <Reveal delay={0.2}>
            <div
              className="mt-12 md:mt-16 flex flex-wrap gap-x-7 gap-y-3 pb-4"
              style={{ borderBottom: "1px solid hsl(var(--ivory) / 0.14)" }}
            >
              {CAMADAS.map((c) => {
                const activa = camada === c;
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCamada(c)}
                    aria-pressed={activa}
                    className="relative font-display text-[11px] md:text-xs tracking-[0.2em] uppercase py-1.5 transition-colors duration-300"
                    style={{ color: activa ? "hsl(var(--ivory))" : "hsl(var(--ivory) / 0.38)" }}
                  >
                    {etiquetas[c]}
                    {activa && (
                      <motion.span
                        layoutId={`camada-${sitio.id}`}
                        className="absolute left-0 right-0 -bottom-[17px] h-[2px]"
                        style={{ background: "hsl(var(--olive-light))" }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </Reveal>

          <div className="mt-10 md:mt-12 min-h-[300px] md:min-h-[250px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={camada}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                {camada === "posicao" && (
                  <div className="max-w-3xl">
                    <p
                      className="font-display text-2xl md:text-4xl font-medium tracking-tight leading-[1.15]"
                      style={{ color: "hsl(var(--ivory))" }}
                    >
                      {sitio.posicao.frase}
                    </p>
                    <p
                      className="text-sm md:text-base leading-relaxed mt-6 max-w-xl"
                      style={{ color: "hsl(var(--ivory) / 0.6)" }}
                    >
                      {sitio.posicao.corpo}
                    </p>
                  </div>
                )}

                {camada === "artefacto" && (
                  <div className="grid md:grid-cols-[320px_1fr] gap-7 md:gap-12 items-start">
                    <figure
                      className="relative overflow-hidden rounded-[3px]"
                      style={{ border: "1px solid hsl(var(--ivory) / 0.16)" }}
                    >
                      <img
                        src={sitio.artefacto.imagem}
                        alt={sitio.artefacto.imagemAlt}
                        className="w-full h-full object-cover aspect-[4/3]"
                        loading="lazy"
                      />
                    </figure>
                    <div>
                      <p
                        className="font-display text-xl md:text-2xl font-medium tracking-tight"
                        style={{ color: "hsl(var(--ivory))" }}
                      >
                        {sitio.artefacto.nome}
                      </p>
                      <p
                        className="text-sm md:text-base leading-relaxed mt-4 max-w-lg"
                        style={{ color: "hsl(var(--ivory) / 0.6)" }}
                      >
                        {sitio.artefacto.corpo}
                      </p>
                      <p
                        className="font-display text-sm md:text-base mt-6 pl-4"
                        style={{
                          color: "hsl(var(--ivory) / 0.9)",
                          borderLeft: "2px solid hsl(var(--olive-light))",
                        }}
                      >
                        {sitio.artefacto.fica}
                      </p>
                    </div>
                  </div>
                )}

                {camada === "perguntas" && (
                  <div className="max-w-2xl">
                    <ul className="space-y-5">
                      {sitio.perguntas.linhas.map((l, i) => (
                        <motion.li
                          key={l}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.08 + i * 0.1, duration: 0.4 }}
                          className="font-display text-lg md:text-2xl leading-snug pl-5"
                          style={{
                            color: "hsl(var(--ivory) / 0.82)",
                            borderLeft: "1px solid hsl(var(--ivory) / 0.2)",
                          }}
                        >
                          “{l}”
                        </motion.li>
                      ))}
                    </ul>
                    <p
                      className="text-[11px] tracking-[0.16em] uppercase font-display mt-8"
                      style={{ color: "hsl(var(--ivory) / 0.35)" }}
                    >
                      Padrões, não pessoas. O que se diz aqui dentro fica aqui dentro.
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* O AGORA */}
          <Reveal delay={0.3}>
            <div
              className="mt-12 md:mt-14 pt-6 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6"
              style={{ borderTop: "1px solid hsl(var(--ivory) / 0.12)" }}
            >
              <span
                className="font-display text-[10px] tracking-[0.3em] uppercase shrink-0"
                style={{ color: "hsl(var(--olive-light))" }}
              >
                Agora · {sitio.agora.data}
              </span>
              <p className="text-sm leading-relaxed" style={{ color: "hsl(var(--ivory) / 0.6)" }}>
                {sitio.agora.linha}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Sitio;
