import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "@/components/Reveal";
import { dias, linhas, plano, imprevistos, chave, type Linha } from "@/data/semana";

/**
 * A SEMANA, e é a peça que faz o site deixar de ser texto.
 *
 * A crítica que a gerou foi dele e estava certa: trocar o texto de um
 * serviço pelo texto de um sítio continua a ser texto. Toda a gente escreve
 * bonito. Aqui o argumento não se lê, mexe-se.
 *
 * A mecânica: corre-se a semana e vê-se o plano perfeito partir-se em quatro
 * acontecimentos banais. Depois corre-se outra vez, mesma semana, mesmos
 * acontecimentos, agora com uma regra escrita para cada um, e aguenta. A
 * segunda passagem é a recompensa, e é ela que vende a auditoria sem uma
 * única frase a vender.
 *
 * ⚠️ Nada disto depende de scroll. O scroll não existe na pré-visualização
 * por onde ele vê o site, e já custou uma ronda inteira. Corre por clique e
 * por tempo.
 *
 * Com `prefers-reduced-motion` a semana não se anima: salta para o fim, que
 * é a única leitura honesta para quem desligou o movimento.
 */
const RITMO = 1150;

type Estado = "parado" | "a-correr" | "fim";
type Modo = "sem" | "com";

const SemanaReal = () => {
  const [estado, setEstado] = useState<Estado>("parado");
  const [modo, setModo] = useState<Modo>("sem");
  const [dia, setDia] = useState(-1);
  const temporizador = useRef<number | null>(null);

  const parar = () => {
    if (temporizador.current) window.clearInterval(temporizador.current);
    temporizador.current = null;
  };
  useEffect(() => parar, []);

  const correr = useCallback((m: Modo) => {
    parar();
    setModo(m);
    const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduzido) {
      setDia(dias.length - 1);
      setEstado("fim");
      return;
    }
    setDia(-1);
    setEstado("a-correr");
    let d = -1;
    temporizador.current = window.setInterval(() => {
      d += 1;
      setDia(d);
      if (d >= dias.length - 1) {
        parar();
        window.setTimeout(() => setEstado("fim"), 700);
      }
    }, RITMO);
  }, []);

  /** Uma célula só parte depois de o dia do imprevisto ter passado. */
  const imprevistoDe = (k: string) => imprevistos.find((i) => i.parte.includes(k));
  const jaAconteceu = (i: { d: number }) => dia >= i.d;

  const partidas = plano.filter((c) => {
    const i = imprevistoDe(chave(c.d, c.linha));
    return i && jaAconteceu(i);
  }).length;
  const total = plano.length;
  const deCadaVez = modo === "sem" ? total - partidas : total;

  const avisoActual = imprevistos.find((i) => i.d === dia);

  return (
    <section id="semana" className="section-dark section-padding section-spacing scroll-mt-24">
      <div className="max-content">
        <Reveal>
          <p className="text-caption mb-6">A prova</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="text-headline max-w-4xl" style={{ color: "hsl(var(--ivory))" }}>
            Toda a gente consegue escrever o plano. A pergunta é o que sobra
            dele na quinta-feira.
          </h2>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="text-body-lg mt-5 max-w-xl">
            Esta semana está impecável no papel. Carrega e vê o que a realidade
            lhe faz.
          </p>
        </Reveal>

        {/* COMANDOS */}
        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => correr("sem")}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 font-display text-sm font-medium tracking-wide transition-all duration-500 hover:tracking-wider"
              style={{ background: "hsl(var(--ivory))", color: "hsl(var(--charcoal-deep))" }}
            >
              {estado === "parado" ? "Correr a semana" : "Correr outra vez"}
            </button>

            <AnimatePresence>
              {estado === "fim" && modo === "sem" && (
                <motion.button
                  type="button"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  onClick={() => correr("com")}
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 font-display text-sm font-medium tracking-wide"
                  style={{
                    border: "1px solid hsl(var(--olive-light))",
                    color: "hsl(var(--olive-light))",
                  }}
                >
                  Agora com o sistema
                  <span aria-hidden>→</span>
                </motion.button>
              )}
            </AnimatePresence>

            {modo === "com" && estado !== "parado" && (
              <span
                className="font-display text-[10px] tracking-[0.24em] uppercase"
                style={{ color: "hsl(var(--olive-light))" }}
              >
                Com o sistema
              </span>
            )}
          </div>
        </Reveal>

        {/* O AVISO DO DIA */}
        <div className="mt-8 h-14 md:h-12">
          <AnimatePresence mode="wait">
            {avisoActual && estado === "a-correr" && (
              <motion.p
                key={avisoActual.d}
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.35 }}
                className="font-display text-base md:text-xl pl-4"
                style={{
                  color: "hsl(var(--ivory) / 0.92)",
                  borderLeft: `2px solid ${modo === "com" ? "hsl(var(--olive-light))" : "hsl(var(--ivory) / 0.45)"}`,
                }}
              >
                {avisoActual.texto}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* O PLANO */}
        {/* No telemóvel a grelha arrasta-se de lado. A esbatida na margem é
            o que diz isso sem uma legenda a dizê-lo. */}
        <div className="relative">
        <div className="mt-4 overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0">
          <div className="min-w-[680px]">
            {/* cabeçalho dos dias */}
            <div className="grid grid-cols-[72px_repeat(7,1fr)] gap-2 md:gap-2.5">
              <span />
              {dias.map((d, i) => (
                <motion.span
                  key={d}
                  className="font-display text-[10px] tracking-[0.2em] uppercase text-center pb-2"
                  animate={{
                    color:
                      dia === i && estado === "a-correr"
                        ? "hsl(var(--ivory))"
                        : "hsl(var(--ivory) / 0.35)",
                    borderBottom:
                      dia === i && estado === "a-correr"
                        ? "2px solid hsl(var(--olive-light))"
                        : "2px solid hsl(var(--ivory) / 0.08)",
                  }}
                >
                  {d}
                </motion.span>
              ))}
            </div>

            {linhas.map((l) => (
              <div
                key={l.id}
                className="grid grid-cols-[72px_repeat(7,1fr)] gap-2 md:gap-2.5 mt-2 md:mt-2.5 items-stretch"
              >
                <span
                  className="font-display text-[10px] tracking-[0.16em] uppercase self-center"
                  style={{ color: "hsl(var(--ivory) / 0.3)" }}
                >
                  {l.nome}
                </span>
                {dias.map((_, d) => {
                  const c = plano.find((x) => x.d === d && x.linha === l.id)!;
                  const imp = imprevistoDe(chave(d, l.id as Linha));
                  const atingida = !!imp && jaAconteceu(imp);
                  const partiu = atingida && modo === "sem";
                  const salva = atingida && modo === "com";

                  return (
                    <motion.div
                      key={`${d}-${l.id}`}
                      className="relative rounded-[3px] px-2.5 py-3 min-h-[62px] flex items-center"
                      animate={{
                        opacity: partiu ? 0.3 : 1,
                        y: partiu ? 7 : 0,
                        rotate: partiu ? -1.1 : 0,
                        borderColor: salva
                          ? "hsl(var(--olive-light) / 0.75)"
                          : "hsl(var(--ivory) / 0.14)",
                        backgroundColor: salva
                          ? "hsl(var(--olive) / 0.26)"
                          : "hsl(var(--ivory) / 0.04)",
                      }}
                      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                      style={{ borderWidth: 1, borderStyle: "solid" }}
                    >
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={salva ? "salva" : "base"}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-[12px] leading-snug"
                          style={{ color: "hsl(var(--ivory) / 0.82)" }}
                        >
                          {salva ? imp!.viraEm : c.texto}
                        </motion.span>
                      </AnimatePresence>

                      {/* o risco por cima, desenhado */}
                      {partiu && (
                        <motion.span
                          aria-hidden
                          className="absolute left-2 right-2 top-1/2 h-px origin-left"
                          style={{ background: "hsl(var(--ivory) / 0.55)" }}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 0.4, delay: 0.1 }}
                        />
                      )}
                    </motion.div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        <div
          aria-hidden
          className="md:hidden pointer-events-none absolute top-0 right-0 bottom-0 w-10"
          style={{ background: "linear-gradient(to left, hsl(var(--charcoal-deep)), transparent)" }}
        />
        </div>

        {/* O RESULTADO */}
        <div className="mt-10 md:mt-12 min-h-[108px]">
          <AnimatePresence mode="wait">
            {estado === "fim" && (
              <motion.div
                key={modo}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45 }}
                className="pt-7"
                style={{ borderTop: "1px solid hsl(var(--ivory) / 0.14)" }}
              >
                <p
                  className="font-display text-xl md:text-3xl font-medium tracking-tight"
                  style={{
                    color: modo === "com" ? "hsl(var(--olive-light))" : "hsl(var(--ivory))",
                  }}
                >
                  Quatro imprevistos. {deCadaVez} de {total} decisões de pé.
                </p>
                <p className="text-body text-sm md:text-base mt-4 max-w-xl leading-relaxed">
                  {modo === "sem"
                    ? "Nenhum deles foi culpa de alguém, e nenhum deles é falta de ciência. É o que acontece a toda a gente, todas as semanas."
                    : "Os mesmos quatro, na mesma semana. A diferença não está no plano: está em haver uma regra escrita para cada coisa que costuma correr mal."}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* AS REGRAS, só depois da 2.ª passagem */}
        <AnimatePresence>
          {estado === "fim" && modo === "com" && (
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-8 grid sm:grid-cols-2 gap-x-10 gap-y-4"
            >
              {imprevistos.map((i, k) => (
                <motion.li
                  key={i.regra}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + k * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <span
                    className="mt-[7px] w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: "hsl(var(--olive-light))" }}
                  />
                  <span className="text-sm leading-snug" style={{ color: "hsl(var(--ivory) / 0.72)" }}>
                    {i.regra}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default SemanaReal;
