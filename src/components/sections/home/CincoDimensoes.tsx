import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "@/components/Reveal";

/**
 * O modelo, desenhado em vez de escrito.
 *
 * A versão anterior era uma lista de cinco frases debaixo do título "onde é
 * que isto costuma falhar", e a pergunta dele desmonta-a numa linha: isto o
 * quê? Uma lista não diz o que é que atravessa as cinco, nem porque é que
 * falhar numa chega para estragar tudo. Um modelo diz.
 *
 * Por isso isto é um percurso: a evidência entra de um lado, atravessa cinco
 * portões, e do outro lado sai prática. Carregar num portão fecha-o, e o
 * que está a jusante apaga-se. É a tese dele numa interação de um segundo:
 * a evidência não vira prática sozinha.
 *
 * As cinco estão pela ordem do Appendix A, e cada uma mostra o SINTOMA antes
 * do nome: um director desportivo não procura "contexto organizacional",
 * procura a razão de ter toda a gente a tratar de nutrição e ninguém
 * responsável por ela.
 *
 * Abre ao clique, nunca ao scroll: o scroll está todo gasto no capítulo dos
 * equipamentos, e o que depende de scroll não existe na pré-visualização.
 */
const portoes = [
  {
    n: 1,
    curto: "Conhecimento",
    nome: "Conhecimento científico",
    sintoma: "Faz-se assim porque era assim que o staff anterior fazia.",
    meco: "Se há critério por trás de cada decisão, ou hábito herdado com linguagem técnica por cima.",
  },
  {
    n: 2,
    curto: "Organização",
    nome: "Contexto organizacional",
    sintoma: "Toda a gente trata da nutrição e ninguém é responsável por ela.",
    meco: "Quem decide, quem executa, e o que se perde entre os dois quando a semana aperta.",
  },
  {
    n: 3,
    curto: "Competição",
    nome: "Contexto competitivo",
    sintoma: "Entre jogo, viagem e jogo, a semana planeada nunca chega a existir.",
    meco: "O que o calendário, as deslocações e a carga desfazem, e o que tem de ser desenhado já a contar com isso.",
  },
  {
    n: 4,
    curto: "Cultura",
    nome: "Dinâmicas culturais e sociais",
    sintoma: "O plano está certo e os jogadores não o cumprem.",
    meco: "Em quem é que o balneário confia, e se o plano passa por essa pessoa antes de chegar ao jogador.",
  },
  {
    n: 5,
    curto: "Adaptação",
    nome: "Adaptabilidade contextual",
    sintoma: "Funciona no papel e não sobrevive à primeira semana a sério.",
    meco: "O que do sistema aguenta um dia mau, um autocarro atrasado e um jogador que recusa, sem ninguém de serviço.",
  },
];

const OLIVE = "hsl(110 30% 62%)";
const DIM = "hsl(var(--ivory) / 0.14)";

const CincoDimensoes = () => {
  const [falha, setFalha] = useState<number | null>(null);
  const activo = portoes.find((p) => p.n === falha) ?? null;
  const partido = falha !== null;

  /** Um troço está aceso enquanto vier antes do portão fechado. */
  const aceso = (indice: number) => falha === null || indice < falha;

  return (
    <section id="dimensoes" className="section-dark section-padding section-spacing scroll-mt-24">
      <div className="max-content">
        <Reveal>
          <p className="text-caption mb-6">O modelo</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="text-headline max-w-4xl" style={{ color: "hsl(var(--ivory))" }}>
            Entre o que a ciência já sabe e o que o jogador faz na segunda-feira
            há cinco portões.
          </h2>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="text-body-lg mt-5 max-w-xl">
            Basta um fechado para não sair nada do outro lado. Carrega num.
          </p>
        </Reveal>

        {/* O PERCURSO */}
        <Reveal delay={0.2}>
          <div className="mt-14 md:mt-20">
            <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-0">
              {/* Entrada */}
              <div className="md:w-[124px] shrink-0 md:text-right md:pr-5 pl-0 md:pl-0">
                <p
                  className="font-display text-[11px] tracking-[0.2em] uppercase leading-snug"
                  style={{ color: "hsl(var(--ivory) / 0.75)" }}
                >
                  A evidência
                </p>
                <p className="text-[11px] mt-1" style={{ color: "hsl(var(--ivory) / 0.35)" }}>
                  o que já se sabe
                </p>
              </div>

              {/* Portões */}
              <div className="flex md:flex-1 flex-col md:flex-row md:items-center">
                {portoes.map((p) => {
                  const estaFechado = falha === p.n;
                  const antes = aceso(p.n);
                  return (
                    <div
                      key={p.n}
                      className="flex flex-col md:flex-1 items-start md:items-center"
                    >
                      {/* troço que chega a este portão */}
                      <motion.span
                        aria-hidden
                        className="shrink-0 md:w-full md:h-[2px] w-[2px] h-7 md:ml-0 ml-[26px]"
                        animate={{ background: antes ? OLIVE : DIM, opacity: antes ? 0.9 : 1 }}
                        transition={{ duration: 0.45 }}
                        style={{ display: "block" }}
                      />
                      <button
                        type="button"
                        onClick={() => setFalha(estaFechado ? null : p.n)}
                        aria-pressed={estaFechado}
                        aria-label={`Fechar o portão ${p.nome}`}
                        className="group flex md:flex-col items-center gap-4 md:gap-0 md:-mt-7 md:-mb-7 w-full md:w-auto text-left md:text-center"
                      >
                        <motion.span
                          className="relative flex items-center justify-center rounded-full shrink-0 font-display text-[13px]"
                          animate={{
                            width: 54,
                            height: 54,
                            borderColor: estaFechado
                              ? "hsl(var(--ivory) / 0.7)"
                              : antes
                                ? OLIVE
                                : "hsl(var(--ivory) / 0.18)",
                            backgroundColor: estaFechado
                              ? "hsl(var(--ivory) / 0.1)"
                              : antes
                                ? "hsl(var(--olive) / 0.28)"
                                : "hsl(var(--charcoal-deep))",
                            color: antes || estaFechado ? "hsl(var(--ivory))" : "hsl(var(--ivory) / 0.4)",
                          }}
                          transition={{ duration: 0.4 }}
                          style={{
                            borderWidth: 1,
                            borderStyle: "solid",
                            boxShadow: antes && !estaFechado ? "0 0 22px hsl(var(--olive) / 0.45)" : "none",
                          }}
                        >
                          {estaFechado ? (
                            <motion.span
                              initial={{ rotate: -90, opacity: 0 }}
                              animate={{ rotate: 0, opacity: 1 }}
                              className="text-base"
                            >
                              ✕
                            </motion.span>
                          ) : (
                            String(p.n).padStart(2, "0")
                          )}
                        </motion.span>
                        <motion.span
                          className="font-display text-[10px] tracking-[0.16em] uppercase md:mt-3 whitespace-nowrap"
                          animate={{
                            color:
                              estaFechado || antes
                                ? "hsl(var(--ivory) / 0.8)"
                                : "hsl(var(--ivory) / 0.3)",
                          }}
                        >
                          {p.curto}
                        </motion.span>
                      </button>
                    </div>
                  );
                })}
                {/* O troço final é uma coluna fantasma, com a mesma geometria
                    de um portão. Como um troço solto, o `items-center` da
                    linha alinhava-o pelo centro de uma coluna que inclui a
                    etiqueta, e o carril partia-se treze pixels abaixo. */}
                <div
                  aria-hidden
                  className="flex flex-col md:flex-[0.55] items-start md:items-center"
                >
                  <motion.span
                    className="shrink-0 md:w-full md:h-[2px] w-[2px] h-7 ml-[26px] md:ml-0 block"
                    animate={{ background: partido ? DIM : OLIVE, opacity: partido ? 1 : 0.9 }}
                    transition={{ duration: 0.45 }}
                  />
                  <span className="hidden md:block md:-mt-7 md:-mb-7 h-[54px]" />
                  <span className="hidden md:block font-display text-[10px] tracking-[0.16em] uppercase md:mt-3 opacity-0">
                    .
                  </span>
                </div>
              </div>

              {/* Saída */}
              <div className="md:w-[168px] shrink-0 md:pl-5">
                <motion.p
                  className="font-display text-[11px] tracking-[0.2em] uppercase leading-snug"
                  animate={{ color: partido ? "hsl(var(--ivory) / 0.3)" : "hsl(var(--ivory) / 0.9)" }}
                >
                  {partido ? "Não chega lá" : "Prática que pega"}
                </motion.p>
                <motion.p
                  className="text-[11px] mt-1"
                  animate={{ color: partido ? "hsl(var(--ivory) / 0.22)" : "hsl(var(--ivory) / 0.45)" }}
                >
                  {partido ? "fica no papel" : "exequível, aceite, sustentável"}
                </motion.p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* O QUE ACONTECE QUANDO ESTE FALHA */}
        <Reveal delay={0.26}>
          <div className="mt-14 md:mt-16 min-h-[150px] md:min-h-[128px] border-t pt-8" style={{ borderColor: "hsl(var(--ivory) / 0.12)" }}>
            <AnimatePresence mode="wait">
              {activo ? (
                <motion.div
                  key={activo.n}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.32 }}
                  className="grid md:grid-cols-[1fr_1fr] gap-6 md:gap-14"
                >
                  <div>
                    <p
                      className="font-display text-[10px] tracking-[0.24em] uppercase"
                      style={{ color: OLIVE }}
                    >
                      {activo.nome}
                    </p>
                    <p
                      className="font-display text-xl md:text-3xl font-medium tracking-tight leading-snug mt-3"
                      style={{ color: "hsl(var(--ivory))" }}
                    >
                      “{activo.sintoma}”
                    </p>
                  </div>
                  <div className="md:pt-7">
                    <p className="text-[9px] tracking-[0.3em] uppercase font-display" style={{ color: "hsl(var(--ivory) / 0.35)" }}>
                      O que eu meço aqui
                    </p>
                    <p className="text-body text-sm md:text-base leading-relaxed mt-3 max-w-md">
                      {activo.meco}
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.p
                  key="parado"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-body text-sm md:text-base max-w-xl leading-relaxed"
                >
                  As cinco são o diagrama do meu trabalho de fim de curso, e são
                  elas que decidem se o que se sabe chega a fazer-se. Numa
                  auditoria eu meço as cinco e digo-te qual é a tua.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default CincoDimensoes;
