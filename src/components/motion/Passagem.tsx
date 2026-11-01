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
 * sobe, e depois o conteúdo dela deriva devagar durante TODA a travessia
 * pelo ecrã. São os dois gestos que o cinema usa para dizer *mudámos de
 * sítio*: um corte com peso, e paralaxe.
 *
 * 📏 A deriva longa veio de medir o deltacafes.com (1 nov): o gatilho que
 * domina aquele site é `top bottom` até `bottom bottom` com `scrub`, ou
 * seja, a animação dura a travessia inteira em vez de ser uma entrada de
 * 300 ms. É essa a diferença entre parecer uma câmara e parecer um efeito.
 * E `pin` não aparece lá uma única vez: nada prende o scroll, a pessoa
 * nunca perde o controlo. Seguimos a mesma regra.
 *
 * 🚨 O travão da MOLDURA, não do código. O site e a pré-visualização saem
 * do mesmo `src/`: o que muda é a janela onde correm. A pré-visualização é
 * dimensionada ao conteúdo, o scroll interno fica sempre a zero e um efeito
 * com `scrub` ficaria preso no primeiro fotograma, que aqui é a cortina
 * fechada. Antes disto, a solução era desligar o efeito lá dentro, e ele
 * abria a pré-visualização e via uma página parada. Agora a MESMA cortina
 * corre, só que disparada por o bloco entrar no ecrã em vez de pelo scroll.
 * Ele vê o gesto; o que a pré-visualização não lhe pode dar é o controlo
 * do ritmo, que é coisa do site a sério.
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
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const fechada = `inset(${18 * intensidade}% 0% 0% 0%)`;
    const aberta = "inset(0% 0% 0% 0%)";

    /* Na pré-visualização não há scroll para conduzir nada, por isso a
       cortina toca sozinha quando o bloco entra no ecrã. `power4.out` e
       0,9 s são os valores medidos no site da Delta, não inventados. */
    if (import.meta.env.VITE_IFRAME === "1") {
      gsap.set(el, { clipPath: fechada });
      gsap.set(dentro, { y: 56 * intensidade, scale: 1 - 0.02 * intensidade });

      let aberto = false;
      const abrir = () => {
        if (aberto) return;
        aberto = true;
        gsap.to(el, { clipPath: aberta, duration: 0.9, ease: "power4.out" });
        gsap.to(dentro, { y: 0, scale: 1, duration: 1, ease: "power4.out", delay: 0.06 });
      };

      const obs = new IntersectionObserver(
        (entradas) => entradas.forEach((e) => e.isIntersecting && abrir()),
        { threshold: 0.2 }
      );
      obs.observe(el);

      /* 🚨 E o relógio por baixo, que não é zelo a mais: medido a 1 nov, na
         pré-visualização `100svh` resolve para a altura do DOCUMENTO, cada
         secção de ecrã inteiro cresce com ele, e o documento passou de 10 mil
         para 66 mil px. Com isso há blocos que nunca chegam a intersectar
         nada e ficavam com a cortina fechada, ou seja, invisíveis. O relógio
         garante que ele vê o gesto de qualquer maneira, em cascata de cima
         para baixo. No site a sério este ramo não corre. */
      const fundo = Math.max(1, document.documentElement.scrollHeight);
      const posicao = (el.getBoundingClientRect().top + window.scrollY) / fundo;
      const t = window.setTimeout(abrir, 500 + Math.min(1.5, posicao * 2.4) * 1000);

      return () => {
        obs.disconnect();
        window.clearTimeout(t);
      };
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { clipPath: fechada },
        {
          clipPath: aberta,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "top 45%", scrub: 0.6 },
        }
      );
      /* A deriva longa: começa quando o topo entra e só acaba quando o fundo
         sai. É de propósito que é pouca, 56 px no total. Paralaxe que se dá
         por ela deixa de ser câmara e passa a ser truque. */
      gsap.fromTo(
        dentro,
        { y: 34 * intensidade },
        {
          y: -22 * intensidade,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.8 },
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
