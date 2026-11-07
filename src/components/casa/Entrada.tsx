import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { scrollToY } from "@/components/motion/SmoothScroll";
import fotoRelvado from "@/assets/photos/leca-pitchside.webp";

gsap.registerPlugin(Flip);

/**
 * A entrada e a capa, no mesmo componente, porque são o mesmo objecto: a frase.
 *
 * Primeiro aparece sozinha, palavra a palavra, num ecrã escuro. Depois a
 * cortina sobe e a MESMA frase viaja até ao lugar dela na capa, enquanto chega
 * a pessoa que lhe responde. É a ordem do argumento dele (saber não é viver)
 * feita em movimento, e é feita de letra porque o loading estava decidido como
 * letra (visao-do-site.md §4).
 *
 * Corre por tempo e nunca por scroll, porque o preview não tem scroll e foi aí
 * que ele já viu duas vezes um efeito que "não fazia nada". Uma vez por sessão,
 * salta-se com um clique, e com reduced motion nem começa.
 */

const dentroDaMoldura = import.meta.env.VITE_IFRAME === "1";
const CHAVE = "gn-entrada-vista";

const deveCorrer = () => {
  if (typeof window === "undefined") return false;
  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  } catch {
    /* sem matchMedia, corre */
  }
  try {
    if (window.sessionStorage.getItem(CHAVE)) return false;
  } catch {
    /* sem sessionStorage, corre sempre: é só uma entrada */
  }
  return true;
};

const linhas = [
  ["Everybody", "knows"],
  ["what", "to", "eat."],
];

/** Prova sem adjectivos: onde, e o quê, em quatro linhas. */
const factos = [
  { onde: "RSC Anderlecht", o: "First team to under-16s · 2026" },
  { onde: "Leça FC", o: "First team · up to Liga 3" },
  { onde: "Run4Excellence", o: "Now · building it from scratch" },
  { onde: "FCNAUP", o: "BSc Nutrition Sciences · 2026" },
];

const Entrada = () => {
  const [fase, setFase] = useState<"intro" | "casa">(() => (deveCorrer() ? "intro" : "casa"));
  const [comCortina, setComCortina] = useState(fase === "intro");
  const secao = useRef<HTMLElement>(null);
  const h1 = useRef<HTMLHeadingElement>(null);
  const cortina = useRef<HTMLDivElement>(null);
  const estado = useRef<Flip.FlipState | null>(null);
  const feito = useRef(false);

  const avancar = useCallback(() => {
    if (feito.current) return;
    feito.current = true;
    if (h1.current) estado.current = Flip.getState(h1.current);
    setFase("casa");
  }, []);

  // A frase entra, palavra a palavra, e fica um instante sozinha.
  useLayoutEffect(() => {
    if (fase !== "intro") return;
    document.documentElement.dataset.entrada = "on";
    const palavras = secao.current?.querySelectorAll(".entrada-palavra");
    if (!palavras) return;
    gsap.set(palavras, { yPercent: 115, opacity: 0 });
    let cancelado = false;
    let espera: number | undefined;
    // Medir antes de a letra chegar dá a geometria da letra de recurso, e o
    // Flip levava a frase para um sítio que já não é o dela.
    const pronta = document.fonts?.ready ?? Promise.resolve();
    pronta.then(() => {
      if (cancelado) return;
      gsap.to(palavras, {
        yPercent: 0,
        opacity: 1,
        duration: 0.75,
        ease: "power4.out",
        stagger: 0.09,
      });
      espera = window.setTimeout(avancar, 1750);
    });
    return () => {
      cancelado = true;
      if (espera) window.clearTimeout(espera);
      gsap.killTweensOf(palavras);
      gsap.set(palavras, { clearProps: "all" });
    };
  }, [fase, avancar]);

  // A cortina sobe e a frase viaja para o lugar dela.
  useLayoutEffect(() => {
    if (fase !== "casa") return;
    delete document.documentElement.dataset.entrada;
    try {
      window.sessionStorage.setItem(CHAVE, "1");
    } catch {
      /* fica por gravar, e a entrada volta na próxima visita */
    }
    const anterior = estado.current;
    if (!anterior || !h1.current) return;
    const ctx = gsap.context(() => {
      Flip.from(anterior, {
        targets: h1.current,
        duration: 1.05,
        ease: "power4.inOut",
      });
      gsap.fromTo(
        cortina.current,
        { clipPath: "inset(0% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 100% 0%)",
          duration: 1,
          ease: "power3.inOut",
          onComplete: () => setComCortina(false),
        },
      );
      gsap.from(".entrada-resto", {
        opacity: 0,
        y: 22,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.08,
        delay: 0.55,
      });
    }, secao);
    return () => ctx.revert();
  }, [fase]);

  const irParaODar = () => {
    const alvo = document.getElementById("dar");
    if (alvo) scrollToY(alvo.getBoundingClientRect().top + window.scrollY - 72);
  };

  const emIntro = fase === "intro";

  return (
    <section
      ref={secao}
      className="relative overflow-hidden"
      style={{ minHeight: dentroDaMoldura ? 900 : "100svh" }}
    >
      {comCortina && (
        <div
          ref={cortina}
          onClick={avancar}
          className="absolute inset-0 z-20 cursor-pointer"
          style={{ background: "hsl(var(--charcoal-deep))" }}
          aria-hidden="true"
        />
      )}

      <div
        className="section-padding max-content relative grid md:grid-cols-12 gap-x-8 gap-y-12 items-end pt-28 md:pt-36 pb-12"
        style={{ minHeight: dentroDaMoldura ? 760 : "calc(100svh - 7.5rem)" }}
      >
        <div className="md:col-span-8">
          <p className="entrada-resto t-kicker" style={{ color: "hsl(var(--graphite))" }}>
            Guilherme Neves · Performance nutrition · Porto
          </p>

          <h1
            ref={h1}
            onClick={emIntro ? avancar : undefined}
            // Nos dois estados é o MESMO bloco, alinhado à esquerda e com as
            // mesmas duas linhas: só muda de sítio. Centrado no escuro e
            // alinhado à esquerda na capa, as linhas refluíam a meio da
            // viagem e a frase dava um salto em vez de deslizar.
            className={
              emIntro
                ? "t-mega absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-max max-w-[calc(100%-3rem)] cursor-pointer"
                : "t-mega relative z-30 mt-6"
            }
            // A cor muda por transição de CSS e não pelo Flip: o Flip lia o
            // valor escrito, hsl(var(--ivory)), e o GSAP não sabe interpretar
            // uma variável como cor. Falhava em cada fotograma da viagem.
            style={{
              color: emIntro ? "hsl(var(--ivory))" : "hsl(var(--foreground))",
              transition: "color 1s cubic-bezier(0.65, 0, 0.35, 1)",
            }}
          >
            {linhas.map((linha, i) => (
              <span key={i} className="block overflow-hidden pb-[0.06em] md:whitespace-nowrap">
                {linha.map((p, j) => (
                  <span key={j}>
                    <span className="entrada-palavra inline-block">{p}</span>
                    {j < linha.length - 1 ? " " : ""}
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <p className="entrada-resto text-body-lg max-w-xl mt-8">
            Twelve years as a player. Then elite football from the inside, at RSC Anderlecht and
            Leça FC, where I learned that this work goes far beyond knowing: it is systems,
            logistics, context and culture. So I build the systems, and show all of it on the way.
          </p>

          <div className="entrada-resto flex flex-wrap items-center gap-x-6 gap-y-4 mt-10">
            <button
              type="button"
              onClick={irParaODar}
              className="font-body text-sm font-semibold px-7 py-4 transition-colors duration-300"
              style={{ background: "hsl(var(--foreground))", color: "hsl(var(--background))" }}
            >
              Take what I use
            </button>
            <Link to="/sobre" className="font-body text-sm font-semibold link-underline">
              Read the story →
            </Link>
          </div>
        </div>

        <figure className="entrada-resto md:col-span-4 md:col-start-9">
          <img
            src={fotoRelvado}
            alt="Guilherme Neves at pitchside during a Leça FC first-team session."
            className="w-full aspect-[4/5] object-cover"
            style={{ objectPosition: "60% 30%" }}
          />
          <figcaption className="t-kicker mt-3" style={{ color: "hsl(var(--graphite))" }}>
            Leça FC · first team
          </figcaption>
        </figure>
      </div>

      <div className="entrada-resto section-padding max-content pb-14">
        <ul className="grid grid-cols-2 md:grid-cols-4 border-t" style={{ borderColor: "hsl(var(--foreground) / 0.15)" }}>
          {factos.map((f) => (
            <li key={f.onde} className="pt-5 pr-4 pb-2">
              <p className="font-display font-bold text-lg md:text-xl tracking-tight">{f.onde}</p>
              <p className="text-body mt-1" style={{ fontSize: "0.85rem" }}>
                {f.o}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Entrada;
