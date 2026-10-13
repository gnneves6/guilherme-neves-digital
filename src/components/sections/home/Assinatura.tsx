import { Link } from "react-router-dom";
import Reveal from "@/components/Reveal";
import fotoBalneario from "@/assets/photos/locker-room.webp";
import fotoChegada from "@/assets/photos/leca-arrival.webp";

/**
 * Quem está do outro lado, e a ordem não é por acaso.
 *
 * Primeiro atleta, depois o resto. É a única coisa aqui que nenhum currículo
 * copia: quem já teve um plano na mão numa semana má lê o balneário de
 * outra maneira, e é essa leitura que se contrata. O percurso profissional
 * vem a seguir, como consequência, nunca como abertura.
 *
 * ⚠️ As épocas estão ditas como épocas, não como troféus dele. Ele esteve
 * dentro das equipas que as ganharam, e isso é forte; dizer "ganhei" seria
 * o mesmo exagero que o CV já proibiu uma vez ("criei o sistema de nutrição
 * do Anderlecht"). A linha que vem a seguir às etiquetas é a que mantém
 * isto honesto, e é também a que o faz soar melhor, não pior.
 *
 * Os três números ficam ao pé das fotografias de propósito: `630 horas` sem
 * cara é uma alegação, com a fotografia do sítio onde foram passadas é um
 * selo.
 *
 * ⚠️ Só entram fotografias dele, no ambiente dele. Atleta identificável,
 * emblema de clube de destino e material de trabalho interno ficam de fora
 * enquanto não houver autorização escrita (`prova-social.md` §6).
 */
const numeros = [
  { figura: "630", unidade: "horas de estágio" },
  { figura: "+100", unidade: "atletas acompanhados" },
  { figura: "22", unidade: "protocolos e ferramentas" },
];

const epocas = [
  "Subida de divisão",
  "Apuramento europeu",
  "Olympya Cup",
  "Taça sénior feminina",
  "Torneios de formação",
];

const Assinatura = () => (
  <section className="section-padding section-spacing-sm">
    <div className="max-content">
      <div className="grid md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-10 md:gap-14 items-start">
        <Reveal>
          <div className="grid grid-cols-2 gap-2.5 md:gap-3 md:sticky md:top-28">
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
              Fui atleta muito antes de estar deste lado.
            </h2>
          </Reveal>
          <Reveal delay={0.22}>
            <p className="text-body-lg mt-5 max-w-xl leading-relaxed">
              Quinze anos de desporto federado, e não só numa modalidade. Sei o
              que é ter um plano na mão numa semana má, porque passei a vida do
              lado de quem o tem de cumprir.
            </p>
          </Reveal>
          <Reveal delay={0.26}>
            <p className="text-body mt-4 max-w-xl leading-relaxed">
              Aos 21 já estive do outro: mais de 100 atletas acompanhados num
              clube europeu, da equipa principal aos sub-16, e um trabalho
              internacional com um jogador profissional, fora do país.
            </p>
          </Reveal>

          <Reveal delay={0.32}>
            <dl className="mt-11 flex flex-wrap gap-x-12 gap-y-7">
              {numeros.map((n) => (
                <div key={n.figura}>
                  <dt className="font-display text-4xl md:text-5xl font-medium tracking-tight text-foreground">
                    {n.figura}
                  </dt>
                  <dd
                    className="font-display text-[10px] tracking-[0.2em] uppercase mt-1.5"
                    style={{ color: "hsl(var(--olive))" }}
                  >
                    {n.unidade}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.38}>
            <div className="mt-12 pt-8" style={{ borderTop: "1px solid hsl(var(--border))" }}>
              <p className="text-caption mb-5">Épocas vividas por dentro</p>
              <ul className="flex flex-wrap gap-2">
                {epocas.map((e) => (
                  <li
                    key={e}
                    className="font-display text-[11px] tracking-wide px-3 py-1.5 rounded-[2px] border"
                    style={{
                      borderColor: "hsl(var(--olive) / 0.35)",
                      color: "hsl(var(--foreground) / 0.78)",
                    }}
                  >
                    {e}
                  </li>
                ))}
              </ul>
              <p className="text-body text-sm mt-5 max-w-lg leading-relaxed">
                Os troféus são das equipas. Meu é ter estado lá dentro aos 21,
                e ter aguentado o nível.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.44}>
            <p className="font-display text-lg md:text-xl mt-10 text-foreground max-w-lg leading-snug">
              O objetivo é internacional, e construído para durar.
            </p>
          </Reveal>
          <Reveal delay={0.48}>
            <p className="text-caption text-[10px] mt-5 opacity-70">
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
