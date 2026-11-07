import { ReactNode, useEffect, useRef, useState } from "react";
import {
  MotionValue,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";

/**
 * O palco: a linguagem da secção dos equipamentos, levada ao site inteiro.
 *
 * Ele disse a 7 nov que era a única parte do site que parecia feita a sério,
 * e disse porquê: há camadas, há profundidade, a imagem muda e mexe-se, e a
 * pessoa sente que está a navegar. Tudo o resto era texto num fundo branco.
 *
 * Um palco é uma secção alta cujo interior fica preso ao ecrã enquanto se
 * percorre. O progresso do scroll decide qual é a batida em cena e move as
 * camadas de fundo; o rato dá-lhes profundidade. É o mecanismo medido na
 * Delta e no Huesca, com o motor que o repo já tinha.
 *
 * Dentro da moldura do artifact não há scroll, e um palco ficaria parado na
 * primeira batida para sempre. Aí, e com reduced motion, as batidas empilham-se
 * uma a seguir à outra: lê-se tudo, só não se mexe.
 */

export const naMoldura = import.meta.env.VITE_IFRAME === "1";

export interface EstadoPalco {
  ref: React.RefObject<HTMLElement>;
  progresso: MotionValue<number>;
  indice: number;
  estatico: boolean;
}

export const usePalco = (batidas: number): EstadoPalco => {
  const ref = useRef<HTMLElement>(null);
  const reduzir = useReducedMotion();
  const estatico = naMoldura || !!reduzir;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [indice, setIndice] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(batidas - 1, Math.max(0, Math.floor(v * batidas)));
    setIndice((a) => (a === i ? a : i));
  });
  return { ref, progresso: scrollYProgress, indice, estatico };
};

/**
 * O rato como profundidade, sem re-render: valores de movimento que as
 * camadas leem directamente. O PointerField antigo fazia setState a cada
 * fotograma na raiz, o que re-desenhava a página inteira sessenta vezes por
 * segundo; aqui só se mexe o que lê o valor.
 */
export const usePonteiro = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  useEffect(() => {
    if (naMoldura) return;
    const mover = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set((e.clientX / window.innerWidth) * 2 - 1);
      y.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", mover, { passive: true });
    return () => window.removeEventListener("pointermove", mover);
  }, [x, y]);
  return {
    x: useSpring(x, { stiffness: 50, damping: 18, mass: 0.6 }),
    y: useSpring(y, { stiffness: 50, damping: 18, mass: 0.6 }),
  };
};

interface PalcoProps {
  palco: EstadoPalco;
  /** Altura total em vh: o tempo que a cena dura, medido em scroll. */
  altura: number;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  children: ReactNode;
}

export const Palco = ({ palco, altura, className = "", style, id, children }: PalcoProps) => (
  <section
    id={id}
    ref={palco.ref as React.RefObject<HTMLElement>}
    className={className}
    style={{ height: palco.estatico ? "auto" : `${altura}vh`, ...style }}
  >
    <div className={palco.estatico ? "relative overflow-hidden" : "sticky top-0 h-[100svh] overflow-hidden"}>
      {children}
    </div>
  </section>
);

/** O índice lateral, o mesmo gesto do capítulo dos equipamentos. */
export const Indice = ({ total, ativo, rotulos }: { total: number; ativo: number; rotulos?: string[] }) => (
  <div className="hidden md:flex flex-col items-end gap-3 absolute right-8 lg:right-12 top-1/2 -translate-y-1/2 z-20">
    {Array.from({ length: total }).map((_, i) => (
      <div key={i} className="flex items-center gap-3">
        {rotulos && (
          <span
            className="t-kicker transition-opacity duration-500"
            style={{ color: "hsl(var(--ivory))", opacity: i === ativo ? 0.85 : 0.25, fontSize: "0.62rem" }}
          >
            {rotulos[i]}
          </span>
        )}
        <span
          className="block h-[2px] transition-all duration-500"
          style={{ width: i === ativo ? 28 : 10, background: `hsl(var(--ivory) / ${i === ativo ? 0.9 : 0.3})` }}
        />
      </div>
    ))}
  </div>
);

/** Grão e vinheta por cima de qualquer fotografia: é o que a faz parecer sala e não ecrã. */
export const Atmosfera = () => (
  <>
    <div
      aria-hidden
      className="absolute inset-0 z-[2] pointer-events-none"
      style={{
        background:
          "radial-gradient(ellipse 85% 75% at 50% 45%, transparent 0%, hsl(var(--charcoal-deep) / 0.55) 70%, hsl(var(--charcoal-deep) / 0.95) 100%)",
      }}
    />
    <div
      aria-hidden
      className="absolute inset-0 z-[2] pointer-events-none mix-blend-overlay opacity-[0.12]"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
      }}
    />
  </>
);
