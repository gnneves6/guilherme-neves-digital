import { AnimatePresence, motion, useTransform } from "framer-motion";
import { Palco, usePalco, usePonteiro, Atmosfera, Indice } from "@/components/palco/palco";
import balneario from "@/assets/scene-environments-archive.jpg";

/**
 * 01 · O jogador. Era um bloco de texto num fundo escuro, e ele disse o que
 * estava mal: muito texto, pouco exemplo, expressões que soavam mal.
 *
 * Agora é um palco. Ao fundo, um balneário com um jogador sozinho; à frente,
 * uma frase de cada vez, e cada uma só tem uma linha pequena por baixo. O
 * "12" enorme atrás é o mesmo gesto do número fantasma dos equipamentos.
 *
 * As frases são dele (historia.md, blocos 2 e versão ③), em inglês de
 * balneário e não de relatório: "I ate too much. Hope I'm not starting."
 * Sem botão, de propósito: é a verdade dele, não um anúncio.
 */
const batidas = [
  {
    grande: "I ate too much. Hope I’m not starting.",
    pequena: "The maths in my head before games.",
  },
  {
    grande: "Or: eat more, I’m on the bench anyway.",
    pequena: "Twelve years of football, up to the second national division.",
  },
  {
    grande: "Full, not fuelled.",
    pequena:
      "Cut in the week, ran out of gas, trained worse, made up for it at the weekend with what I shouldn’t have, and arrived at games full, tired and sleepy. I didn’t even know it had a name.",
  },
  {
    grande: "It wasn’t a lack of work. It was a lack of literacy.",
    pequena: "And literacy is scarcest in exactly the people who depend on it most.",
  },
];

const Batida = ({ b, n }: { b: (typeof batidas)[number]; n: number }) => (
  <div className="max-w-5xl">
    <p className="t-kicker" style={{ color: "hsl(var(--ivory) / 0.45)" }}>
      01 · The player · {String(n + 1).padStart(2, "0")}
    </p>
    <p className="t-quote mt-6" style={{ color: "hsl(var(--ivory))" }}>
      {b.grande}
    </p>
    <p className="text-body-lg mt-6 max-w-xl" style={{ color: "hsl(var(--ivory) / 0.62)" }}>
      {b.pequena}
    </p>
  </div>
);

const Jogador = () => {
  const palco = usePalco(batidas.length);
  const rato = usePonteiro();
  const escala = useTransform(palco.progresso, [0, 1], [1.18, 1.0]);
  const doze = useTransform(palco.progresso, [0, 1], [60, -60]);
  const fundoX = useTransform(rato.x, [-1, 1], [14, -14]);
  const dozeX = useTransform(rato.x, [-1, 1], [-26, 26]);

  if (palco.estatico) {
    return (
      <section style={{ background: "hsl(var(--charcoal-deep))" }} className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${balneario})`, filter: "brightness(0.3)" }}
        />
        <Atmosfera />
        <div className="relative z-10 section-padding max-content py-28 space-y-24">
          {batidas.map((b, i) => (
            <Batida key={i} b={b} n={i} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <Palco palco={palco} altura={batidas.length * 80 + 100} style={{ background: "hsl(var(--charcoal-deep))" }}>
      <div className="relative w-full h-full">
        <motion.div
          aria-hidden
          className="absolute -inset-10 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${balneario})`, scale: escala, x: fundoX, filter: "brightness(0.32) saturate(0.7)" }}
        />
        <Atmosfera />
        <motion.span
          aria-hidden
          className="absolute right-[4vw] top-1/2 -translate-y-1/2 z-[3] font-display font-extrabold leading-none select-none pointer-events-none"
          style={{ y: doze, x: dozeX, fontSize: "clamp(16rem, 38vw, 36rem)", color: "hsl(var(--ivory) / 0.05)", letterSpacing: "-0.06em" }}
        >
          12
        </motion.span>

        <div className="absolute inset-0 z-10 flex items-center">
          <div className="section-padding max-content w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={palco.indice}
                initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -30, filter: "blur(6px)" }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <Batida b={batidas[palco.indice]} n={palco.indice} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <Indice total={batidas.length} ativo={palco.indice} />
      </div>
    </Palco>
  );
};

export default Jogador;
