import { Link } from "react-router-dom";
import Reveal from "@/components/Reveal";
import fotoBalneario from "@/assets/photos/locker-room.webp";
import fotoChegada from "@/assets/photos/leca-arrival.webp";

/**
 * A cara e os números, no mesmo sítio, e é de propósito.
 *
 * Os três números tinham tido uma secção só para eles e foram cortados por
 * serem currículo. O problema nunca foi o número, foi estar sozinho: sem
 * cara nem contexto, `630 horas` é uma alegação como outra qualquer. Com a
 * fotografia do sítio onde foram passadas, passa a selo.
 *
 * Vem no fim, depois do modelo, porque é aqui que a pergunta muda de "o que
 * é isto" para "quem é que está do outro lado". Antes do modelo seria
 * currículo outra vez.
 *
 * ⚠️ Só entram fotografias dele, no ambiente dele. Atleta, emblema de clube
 * de destino e material de trabalho interno ficam de fora enquanto não
 * houver autorização escrita.
 */
const numeros = [
  { figura: "630", unidade: "horas" },
  { figura: "+100", unidade: "atletas" },
  { figura: "22", unidade: "protocolos" },
];

const Assinatura = () => (
  <section className="section-padding section-spacing-sm">
    <div className="max-content">
      <div className="grid md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-8 md:gap-14 items-center">
        <Reveal>
          <div className="grid grid-cols-2 gap-2.5 md:gap-3">
            <figure className="relative overflow-hidden rounded-[3px] aspect-[3/4]">
              <img
                src={fotoBalneario}
                alt="Guilherme Neves num balneário de futebol antes de um jogo."
                className="w-full h-full object-cover"
                style={{ objectPosition: "center 25%" }}
                loading="lazy"
              />
            </figure>
            <figure className="relative overflow-hidden rounded-[3px] aspect-[3/4] mt-7 md:mt-10">
              <img
                src={fotoChegada}
                alt="Guilherme Neves a chegar ao estádio com o plantel em dia de jogo."
                className="w-full h-full object-cover"
                style={{ objectPosition: "center 28%" }}
                loading="lazy"
              />
            </figure>
          </div>
        </Reveal>

        <div>
          <Reveal delay={0.1}>
            <p className="text-caption mb-6">Quem está do outro lado</p>
          </Reveal>
          <Reveal delay={0.16}>
            <h2 className="text-headline">
              Aprendi isto por dentro, não em cima de um livro.
            </h2>
          </Reveal>
          <Reveal delay={0.22}>
            <p className="text-body mt-5 max-w-md leading-relaxed">
              Equipa principal do Leça FC durante a licenciatura, e depois o
              departamento de performance do RSC Anderlecht. Agora a construir
              o serviço de raiz na Run4Excellence.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-6">
              {numeros.map((n) => (
                <div key={n.figura}>
                  <dt className="font-display text-4xl md:text-5xl font-medium tracking-tight text-foreground">
                    {n.figura}
                  </dt>
                  <dd
                    className="font-display text-[10px] tracking-[0.22em] uppercase mt-1.5"
                    style={{ color: "hsl(var(--olive))" }}
                  >
                    {n.unidade}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.36}>
            <p className="text-caption text-[10px] mt-6 opacity-70">
              RSC Anderlecht, 2026 ·{" "}
              <Link to="/about" className="link-underline">
                O percurso todo
              </Link>
            </p>
          </Reveal>
        </div>
      </div>
    </div>
  </section>
);

export default Assinatura;
