import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "@/components/Reveal";

/**
 * As cinco dimensões, e é a única coisa nesta página que ninguém pode copiar.
 *
 * A versão anterior desta zona eram três números de currículo e um
 * planeador de dia de jogo. O currículo diz quem ele é, que não é o que
 * alguém procura ao chegar aqui, e o planeador era uma versão pobre de um
 * produto que ainda não foi lançado, o que desvaloriza os dois.
 *
 * Isto é outra coisa: é o diagrama do Appendix A do trabalho dele, as cinco
 * dimensões que decidem se a nutrição pega dentro de um clube, e é também
 * exactamente a primeira porta que se vende. Quem chega reconhece a própria
 * estrutura numa das cinco frases antes de ter lido um parágrafo, que é a
 * condição que esta página tinha de cumprir.
 *
 * Cada frase é o sintoma, não a dimensão. Um director desportivo não procura
 * "contexto organizacional", procura a razão de ter toda a gente a tratar de
 * nutrição e ninguém responsável por ela. A dimensão aparece a seguir, em
 * pequeno, porque é a resposta e não a isca.
 *
 * Abre ao clique, nunca ao scroll: o scroll já está todo gasto no capítulo
 * dos equipamentos logo acima, e o que depende de scroll não existe na
 * pré-visualização por onde ele vê o site.
 */
const dimensoes = [
  {
    n: "01",
    sintoma: "O plano está certo e os jogadores não o cumprem.",
    nome: "Dinâmicas culturais e sociais",
    meco: "Em quem é que o balneário confia, e se o plano passa por essa pessoa antes de chegar ao jogador.",
  },
  {
    n: "02",
    sintoma: "Toda a gente trata da nutrição e ninguém é responsável por ela.",
    nome: "Contexto organizacional",
    meco: "Quem decide, quem executa, e o que se perde entre os dois quando a semana aperta.",
  },
  {
    n: "03",
    sintoma: "Entre jogo, viagem e jogo, a semana planeada nunca chega a existir.",
    nome: "Contexto competitivo",
    meco: "O que o calendário, as deslocações e a carga desfazem, e o que tem de ser desenhado já a contar com isso.",
  },
  {
    n: "04",
    sintoma: "Faz-se assim porque era assim que o staff anterior fazia.",
    nome: "Conhecimento científico",
    meco: "Se há critério por trás de cada decisão, ou hábito herdado com linguagem técnica por cima.",
  },
  {
    n: "05",
    sintoma: "Funciona no papel e não sobrevive à primeira semana a sério.",
    nome: "Adaptabilidade contextual",
    meco: "O que do sistema aguenta um dia mau, um autocarro atrasado e um jogador que recusa, sem ninguém de serviço.",
  },
];

const CincoDimensoes = () => {
  const [aberta, setAberta] = useState(0);

  return (
    <section id="dimensoes" className="section-dark section-padding section-spacing scroll-mt-24">
      <div className="max-content">
        <Reveal>
          <p className="text-caption mb-6">Onde é que isto costuma falhar</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="text-headline max-w-3xl" style={{ color: "hsl(var(--ivory))" }}>
            A nutrição de um clube foge sempre por um de cinco sítios.
          </h2>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="text-body-lg mt-5 max-w-2xl">
            Vê qual é o teu.
          </p>
        </Reveal>

        <div className="mt-12 md:mt-16 border-t" style={{ borderColor: "hsl(var(--ivory) / 0.14)" }}>
          {dimensoes.map((d, i) => {
            const activa = aberta === i;
            return (
              <Reveal key={d.n} delay={0.1 + i * 0.06}>
                <div className="border-b" style={{ borderColor: "hsl(var(--ivory) / 0.14)" }}>
                  <button
                    type="button"
                    onClick={() => setAberta(activa ? -1 : i)}
                    onMouseEnter={() => setAberta(i)}
                    aria-expanded={activa}
                    className="w-full text-left grid grid-cols-[34px,1fr,auto] md:grid-cols-[64px,1fr,auto] gap-x-4 md:gap-x-8 items-start py-6 md:py-8 group"
                  >
                    <span
                      className="font-display text-[10px] tracking-[0.3em] pt-2 transition-opacity duration-300"
                      style={{ color: "hsl(var(--olive-light))", opacity: activa ? 1 : 0.55 }}
                    >
                      {d.n}
                    </span>

                    <span className="min-w-0">
                      <span
                        className="block font-display text-xl md:text-3xl font-medium tracking-tight leading-snug transition-opacity duration-300"
                        style={{ color: "hsl(var(--ivory))", opacity: activa ? 1 : 0.62 }}
                      >
                        {d.sintoma}
                      </span>

                      <AnimatePresence initial={false}>
                        {activa && (
                          <motion.span
                            key="aberto"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                            className="block overflow-hidden"
                          >
                            <span className="block pt-4 max-w-xl">
                              <span
                                className="block font-display text-[10px] tracking-[0.24em] uppercase"
                                style={{ color: "hsl(var(--olive-light))" }}
                              >
                                {d.nome}
                              </span>
                              <span className="block text-body text-sm md:text-base leading-relaxed mt-2.5">
                                {d.meco}
                              </span>
                            </span>
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </span>

                    <motion.span
                      aria-hidden
                      className="font-display text-lg pt-1.5"
                      style={{ color: "hsl(var(--ivory) / 0.45)" }}
                      animate={{ rotate: activa ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      +
                    </motion.span>
                  </button>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* O número só vale encostado a uma afirmação. Sozinhos, os três eram
            currículo; aqui são a razão de as cinco frases acima não serem
            opinião. */}
        <Reveal delay={0.4}>
          <div className="mt-12 md:mt-14 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <p className="text-body text-sm max-w-md leading-relaxed">
              As cinco saíram de dentro de um departamento de performance, não de
              um livro: <strong style={{ color: "hsl(var(--ivory))", fontWeight: 500 }}>630 horas</strong>,{" "}
              <strong style={{ color: "hsl(var(--ivory))", fontWeight: 500 }}>+100 atletas</strong> e{" "}
              <strong style={{ color: "hsl(var(--ivory))", fontWeight: 500 }}>22 protocolos</strong> no
              RSC Anderlecht. Agora a construir o serviço de raiz na Run4Excellence.
            </p>
            <Link
              to="/contact"
              className="shrink-0 inline-flex items-center justify-center px-8 py-4 font-display text-sm font-medium tracking-wide transition-all duration-500 hover:tracking-wider"
              style={{ background: "hsl(var(--ivory))", color: "hsl(var(--charcoal-deep))" }}
            >
              Quero saber qual é o meu
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default CincoDimensoes;
