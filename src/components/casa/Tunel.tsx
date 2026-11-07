import { useLayoutEffect, useRef } from "react";
import { motion, useTransform } from "framer-motion";
import gsap from "gsap";
import { Palco, usePalco, usePonteiro, Atmosfera } from "@/components/palco/palco";
import tunel from "@/assets/scene-hero-tunnel.jpg";

/**
 * A entrada. Um túnel de estádio, e a frase decidida a 3 nov sozinha no meio.
 *
 * Duas coisas mexem, e cada uma por uma razão. O TEMPO faz a frase aparecer
 * palavra a palavra, porque isso tem de se ver mesmo onde não há scroll (o
 * preview). O SCROLL leva a pessoa pelo túnel em direcção à luz do relvado:
 * a imagem cresce e acende, a frase sobe e sai, e chega-se ao balneário.
 *
 * É a única imagem gerada na entrada, e está bem que seja: é uma sala, não
 * uma prova. Não tem nada escrito, verificado a 7 nov; as três que tinham
 * marca inventada nas paredes ficaram de fora.
 */
const linhas = [
  ["Everybody", "knows"],
  ["what", "to", "eat."],
];

const Tunel = () => {
  const palco = usePalco(2);
  const rato = usePonteiro();
  const frase = useRef<HTMLDivElement>(null);

  const escala = useTransform(palco.progresso, [0, 1], [1.02, 1.55]);
  const brilho = useTransform(palco.progresso, [0, 1], [0.5, 0.95]);
  const filtro = useTransform(brilho, (b) => `brightness(${b}) contrast(1.08) saturate(0.85)`);
  const fraseY = useTransform(palco.progresso, [0, 0.75], [0, -120]);
  const fraseOpacidade = useTransform(palco.progresso, [0.25, 0.7], [1, 0]);
  const fundoX = useTransform(rato.x, [-1, 1], [18, -18]);
  const fundoY = useTransform(rato.y, [-1, 1], [12, -12]);
  const fraseX = useTransform(rato.x, [-1, 1], [-8, 8]);

  useLayoutEffect(() => {
    const raiz = frase.current;
    if (!raiz) return;
    const palavras = raiz.querySelectorAll(".palavra");
    const resto = raiz.querySelectorAll(".depois");
    let reduzir = false;
    try {
      reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {
      /* corre */
    }
    if (reduzir) return;
    const ctx = gsap.context(() => {
      gsap.set(palavras, { yPercent: 115, opacity: 0 });
      gsap.set(resto, { opacity: 0, y: 14 });
      const pronta = document.fonts?.ready ?? Promise.resolve();
      pronta.then(() => {
        gsap.to(palavras, { yPercent: 0, opacity: 1, duration: 0.9, ease: "power4.out", stagger: 0.1, delay: 0.25 });
        gsap.to(resto, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.12, delay: 1.35 });
      });
    }, raiz);
    return () => ctx.revert();
  }, []);

  return (
    <Palco palco={palco} altura={210} style={{ background: "hsl(var(--charcoal-deep))" }}>
      <div className="relative w-full" style={{ height: palco.estatico ? 860 : "100%" }}>
        <motion.div
          aria-hidden
          className="absolute -inset-10 z-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${tunel})`,
            scale: palco.estatico ? 1.05 : escala,
            filter: palco.estatico ? "brightness(0.55)" : filtro,
            x: fundoX,
            y: fundoY,
          }}
        />
        <Atmosfera />

        <motion.div
          ref={frase}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6"
          style={{ y: palco.estatico ? 0 : fraseY, opacity: palco.estatico ? 1 : fraseOpacidade, x: fraseX }}
        >
          <p className="depois t-kicker mb-8" style={{ color: "hsl(var(--ivory) / 0.6)" }}>
            Guilherme Neves
          </p>
          <h1 className="t-mega" style={{ color: "hsl(var(--ivory))", fontSize: "clamp(3rem, 8.2vw, 8.6rem)" }}>
            {linhas.map((l, i) => (
              <span key={i} className="block overflow-hidden pb-[0.07em] md:whitespace-nowrap">
                {l.map((p, j) => (
                  <span key={j}>
                    <span className="palavra inline-block">{p}</span>
                    {j < l.length - 1 ? " " : ""}
                  </span>
                ))}
              </span>
            ))}
          </h1>
          <p className="depois text-body-lg mt-8 max-w-md" style={{ color: "hsl(var(--ivory) / 0.7)" }}>
            Performance nutrition, built from inside elite football.
          </p>
        </motion.div>

        <div className="depois absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3">
          <span className="t-kicker" style={{ color: "hsl(var(--ivory) / 0.5)", fontSize: "0.6rem" }}>
            Scroll
          </span>
          <span className="relative block w-px h-12 overflow-hidden" style={{ background: "hsl(var(--ivory) / 0.18)" }}>
            <span className="absolute inset-x-0 top-0 h-1/2 animate-[descer_1.8s_ease-in-out_infinite]" style={{ background: "hsl(var(--ivory))" }} />
          </span>
        </div>
      </div>
    </Palco>
  );
};

export default Tunel;
