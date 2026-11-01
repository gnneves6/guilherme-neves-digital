import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";

/**
 * A passagem de uma secção para a outra, que é onde estava o buraco.
 *
 * O pedido dele: *"não pode ser scroll só para baixo. Passando de uma secção
 * para outra devem acontecer transições, movimentos, tipo viradas de
 * página."* Antes, mudar de secção era mudar de cor de fundo e mais nada.
 *
 * O que isto faz: a secção que chega entra por baixo de uma cortina que
 * sobe, e o conteúdo dela vem ligeiramente mais devagar do que a página.
 * São os dois gestos que o cinema usa para dizer *mudámos de sítio*: um
 * corte com peso, e paralaxe. Ligado ao scroll com `scrub`, portanto a
 * pessoa conduz a câmara ao ritmo dela em vez de ver uma animação a tocar.
 *
 * 🚨 E o travão que isto obriga a ter: na build do artifact NÃO SE LIGA.
 * A pré-visualização é dimensionada ao conteúdo, o scroll interno fica
 * sempre a zero, e um efeito ligado ao scroll fica preso no primeiro
 * fotograma. Como o primeiro fotograma aqui é a cortina fechada, ligá-lo
 * lá dentro significaria ele abrir a pré-visualização e ver uma secção
 * invisível. Fora da build do artifact corre; dentro dela, a secção aparece
 * inteira e sem truque.
 */
const Passagem = ({
  children,
  intensidade = 1,
}: {
  children: ReactNode;
  /** 0 a 1. Abaixo de 1 a cortina é mais curta e o paralaxe mais contido. */
  intensidade?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const interior = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    const dentro = interior.current;
    if (!el || !dentro) return;
    if (import.meta.env.VITE_ARTIFACT === "1") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { clipPath: `inset(${18 * intensidade}% 0% 0% 0%)` },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "top 45%", scrub: 0.6 },
        }
      );
      gsap.fromTo(
        dentro,
        { y: 70 * intensidade, scale: 1 - 0.022 * intensidade },
        {
          y: 0,
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "top 35%", scrub: 0.6 },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [intensidade]);

  return (
    <div ref={ref} className="relative will-change-[clip-path]">
      <div ref={interior} className="will-change-transform">
        {children}
      </div>
    </div>
  );
};

export default Passagem;
