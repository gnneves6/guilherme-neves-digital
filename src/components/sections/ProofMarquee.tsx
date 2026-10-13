import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { experiences, additionalExposure } from "@/data/experiences";
import anderlechtCrest from "@/assets/logos/anderlecht.png";
import lecaCrest from "@/assets/logos/leca.png";
import r4eCrest from "@/assets/logos/run4excellence.jpg";

/**
 * ProofMarquee, os ambientes a passar.
 *
 * É a secção de que ele mais gosta e durante um tempo deixou de a encontrar
 * na página, o que é o próprio diagnóstico: tinha 118 pixels de altura,
 * escudos de 36, e estava encostada à dobra por baixo de um herói de ecrã
 * inteiro. Nessa escala não se lê como uma secção, lê-se como um separador,
 * e passa-se por ela sem reparar.
 *
 * Agora tem o dobro da altura, escudos ao tamanho a que um emblema se
 * reconhece, e uma etiqueta por cima que diz o que aquilo é. Continua a não
 * ter uma linha de texto corrido, que é a razão de funcionar: é a
 * credibilidade mais rápida que um estranho consegue ler, e lê-se sem ler.
 *
 * Dois carris idênticos deslocados sobre a mesma linha de tempo, para a
 * emenda nunca aparecer e o ciclo não depender de medir o ecrã.
 */

const crests: Record<string, string> = {
  anderlecht: anderlechtCrest,
  leca: lecaCrest,
  r4e: r4eCrest,
};

interface Entry {
  key: string;
  name: string;
  meta: string;
  crest?: string;
}

const entries: Entry[] = [
  ...experiences.map((e) => ({
    key: e.id,
    name: e.name,
    meta: e.location,
    crest: crests[e.id],
  })),
  ...additionalExposure.map((a) => ({
    key: a.name,
    name: a.name,
    meta: a.date,
  })),
];

const Track = ({ ariaHidden }: { ariaHidden?: boolean }) => (
  <div
    className="flex items-center shrink-0"
    aria-hidden={ariaHidden || undefined}
  >
    {entries.map((e) => (
      <div key={e.key} className="flex items-center gap-5 px-10 md:px-16 shrink-0">
        {e.crest ? (
          <img
            src={e.crest}
            alt=""
            className="w-14 h-14 md:w-16 md:h-16 object-contain shrink-0"
            draggable={false}
          />
        ) : (
          <span className="w-2 h-2 rounded-full bg-foreground/25 shrink-0" />
        )}
        <span className="flex flex-col leading-tight">
          <span className="font-display text-lg md:text-2xl font-medium tracking-tight text-foreground whitespace-nowrap">
            {e.name}
          </span>
          <span className="text-[10px] md:text-[11px] tracking-[0.22em] uppercase font-display text-muted-foreground whitespace-nowrap mt-0.5">
            {e.meta}
          </span>
        </span>
      </div>
    ))}
  </div>
);

const ProofMarquee = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Each track is exactly half the strip, so moving the pair left by 50%
      // lands the second copy precisely where the first began.
      gsap.to(el, {
        xPercent: -50,
        duration: 38,
        ease: "none",
        repeat: -1,
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="relative overflow-hidden border-y border-border/60 py-10 md:py-14"
      aria-label="Os ambientes onde o trabalho foi feito"
    >
      <p className="text-caption section-padding mb-7 md:mb-9">Feito por dentro de</p>
      <div ref={trackRef} className="flex w-max will-change-transform">
        <Track />
        <Track ariaHidden />
      </div>

      {/* Fade the strip into the page rather than letting it hit the edges */}
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 w-16 md:w-32 pointer-events-none"
        style={{ background: "linear-gradient(to right, hsl(var(--background)), transparent)" }}
      />
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 w-16 md:w-32 pointer-events-none"
        style={{ background: "linear-gradient(to left, hsl(var(--background)), transparent)" }}
      />
    </section>
  );
};

export default ProofMarquee;
