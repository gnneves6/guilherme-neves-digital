import Reveal from "@/components/Reveal";
import fotoAnderlecht from "@/assets/photos/anderlecht-sign.webp";
import fotoLeca from "@/assets/photos/leca-arrival.webp";

/**
 * 02 · Por dentro. A prova vem depois da ideia que prova, e mostra-se o
 * caminho, nunca o troféu: por isso a fotografia das taças não está aqui.
 *
 * Três sítios com factos secos. A modéstia aplica-se ao resultado colectivo e
 * nunca ao papel dele (voice-dna, 3 nov): a subida é do Leça, o trabalho na
 * equipa principal é dele. A Run4Excellence não tem fotografia porque não há
 * nenhuma tirada lá, e pôr outra no lugar dela seria mentir com uma imagem.
 */
const sitios = [
  {
    nome: "RSC Anderlecht",
    quando: "Brussels · 2026",
    texto:
      "From the first team down to the under-16s, men’s and women’s. More than 100 athletes and 630 hours, before I had my degree in hand.",
    foto: fotoAnderlecht,
    alt: "Guilherme Neves outside the RSC Anderlecht training centre.",
    posicao: "50% 70%",
  },
  {
    nome: "Leça FC",
    quando: "First team",
    texto:
      "The season they won the Campeonato de Portugal and went up to Liga 3. Matchday, training and travel with the first team.",
    foto: fotoLeca,
    alt: "Guilherme Neves stepping off the Leça FC team bus.",
    posicao: "50% 35%",
  },
  {
    nome: "Run4Excellence",
    quando: "Since August 2026",
    texto:
      "Building the nutrition service of a high-performance centre from scratch, with the technical team.",
  },
];

const PorDentro = () => (
  <section className="section-padding section-spacing">
    <div className="max-content">
      <Reveal>
        <p className="t-kicker" style={{ color: "hsl(var(--graphite))" }}>
          02 · Inside
        </p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="t-title mt-8 max-w-4xl">
          I reached European football by a route that, I’ll admit, wasn’t in my plans.
        </h2>
      </Reveal>

      <div className="grid md:grid-cols-3 gap-6 md:gap-8 mt-16">
        {sitios.map((s, i) => (
          <Reveal key={s.nome} delay={0.08 * i}>
            <article>
              {s.foto ? (
                <img
                  src={s.foto}
                  alt={s.alt}
                  className="w-full aspect-[4/5] object-cover"
                  style={{ objectPosition: s.posicao }}
                  loading="lazy"
                />
              ) : (
                <div
                  className="w-full aspect-[4/5] flex items-end p-6"
                  style={{ background: "hsl(var(--charcoal-deep))", color: "hsl(var(--ivory))" }}
                >
                  <span className="t-mega" style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)" }}>
                    Now.
                  </span>
                </div>
              )}
              <p className="font-display font-bold text-2xl tracking-tight mt-5">{s.nome}</p>
              <p className="t-kicker mt-1" style={{ color: "hsl(var(--graphite))" }}>
                {s.quando}
              </p>
              <p className="text-body mt-3 max-w-sm">{s.texto}</p>
            </article>
          </Reveal>
        ))}
      </div>

      <div className="grid md:grid-cols-12 gap-x-8 gap-y-12 mt-24 md:mt-32 items-start">
        <Reveal className="md:col-span-6">
          <p className="text-body-lg">
            That’s where I understood two things. That this work goes far beyond knowledge: it is
            systems, logistics, context and culture. And that my problem had never been only mine.
            Elite athletes without the basics, with their whole potential on the table, in a career
            that ends at thirty.
          </p>
        </Reveal>
        <Reveal className="md:col-span-5 md:col-start-8" delay={0.1}>
          <blockquote>
            <p className="t-title">“Evidence does not automatically become practice.”</p>
            <footer className="text-body mt-5">
              The argument of my final-year review, defended at FCNAUP in July 2026, on what decides
              the role of nutrition inside a football club. Seventeen references.
            </footer>
          </blockquote>
        </Reveal>
      </div>
    </div>
  </section>
);

export default PorDentro;
