import { AnimatePresence, motion, useTransform } from "framer-motion";
import { Palco, usePalco, usePonteiro, Atmosfera } from "@/components/palco/palco";
import relvado from "@/assets/hero-atmosphere.jpg";

/**
 * Depois dos equipamentos: o que ele percebeu lá dentro, e a tese defendida.
 *
 * A imagem é um túnel com o relvado ao fundo, e o scroll anda em direcção à
 * luz. É a tese dele feita imagem: a evidência está no túnel, a prática está
 * no relvado, e o trabalho é o caminho entre os dois.
 */
const batidas = [
  {
    grande: "This work goes far beyond knowledge.",
    pequena:
      "Inside the clubs I understood it is systems, logistics, context and culture. And that my problem had never been only mine: elite athletes without the basics, in a career that ends at thirty.",
  },
  {
    grande: "Evidence does not automatically become practice.",
    pequena: "The argument of my final-year review, defended at FCNAUP in July 2026. It is what everything here is built on.",
  },
];

const Tese = () => {
  const palco = usePalco(batidas.length);
  const rato = usePonteiro();
  const escala = useTransform(palco.progresso, [0, 1], [1.0, 1.32]);
  const brilho = useTransform(palco.progresso, [0, 1], [0.38, 0.8]);
  const filtro = useTransform(brilho, (b) => `brightness(${b}) saturate(0.9)`);
  const fundoX = useTransform(rato.x, [-1, 1], [16, -16]);
  const fundoY = useTransform(rato.y, [-1, 1], [10, -10]);

  const Texto = ({ i }: { i: number }) => (
    <div className="max-w-4xl mx-auto text-center">
      <p className="t-title" style={{ color: "hsl(var(--ivory))", fontSize: "clamp(2.3rem, 5.4vw, 5.4rem)" }}>
        {i === 1 ? `“${batidas[i].grande}”` : batidas[i].grande}
      </p>
      <p className="text-body-lg mt-7 max-w-2xl mx-auto" style={{ color: "hsl(var(--ivory) / 0.65)" }}>
        {batidas[i].pequena}
      </p>
    </div>
  );

  if (palco.estatico) {
    return (
      <section className="relative overflow-hidden" style={{ background: "hsl(var(--charcoal-deep))" }}>
        <div aria-hidden className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${relvado})`, filter: "brightness(0.35)" }} />
        <Atmosfera />
        <div className="relative z-10 section-padding py-28 space-y-24">
          <Texto i={0} />
          <Texto i={1} />
        </div>
      </section>
    );
  }

  return (
    <Palco palco={palco} altura={240} style={{ background: "hsl(var(--charcoal-deep))" }}>
      <div className="relative w-full h-full">
        <motion.div
          aria-hidden
          className="absolute -inset-10 z-0 bg-cover"
          style={{ backgroundImage: `url(${relvado})`, backgroundPosition: "50% 55%", scale: escala, filter: filtro, x: fundoX, y: fundoY }}
        />
        <Atmosfera />
        <div className="absolute inset-0 z-10 flex items-center justify-center section-padding">
          <AnimatePresence mode="wait">
            <motion.div
              key={palco.indice}
              initial={{ opacity: 0, scale: 0.96, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.04, filter: "blur(8px)" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <Texto i={palco.indice} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Palco>
  );
};

export default Tese;
