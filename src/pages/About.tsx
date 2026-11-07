import { type ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import Reveal from "@/components/Reveal";
import PortraitPlaceholder from "@/components/PortraitPlaceholder";
import Magnetic from "@/components/motion/Magnetic";
import Em from "@/components/text/Em";
import PlanGrid from "@/components/motion/PlanGrid";
import photoLockerRoom from "@/assets/photos/locker-room.webp";
import photoPitchside from "@/assets/photos/leca-pitchside.webp";
import photoArrival from "@/assets/photos/leca-arrival.webp";
import photoTrophies from "@/assets/photos/anderlecht-trophies.webp";
import photoSign from "@/assets/photos/anderlecht-sign.webp";


const certifications = [
  "ISAK Level 1, Certified Anthropometrist",
  "Sports Nutrition & Supplementation, Challenges for Athletes in the Next Decade",
  "Nutrition in Football: From Men to Women",
  "Muscle Mass & Physical Function Assessment",
  "Nutrition in Wound Healing",
  "Youthpass Certificate, Erasmus+ Project, Italy",
];

const awards = [
  { title: "Sports Student Award", org: "FCNAUP", year: "2025" },
  { title: "Breakthrough of the Year", org: "AEFCNAUP", year: "2023/24" },
  { title: "Mentorship Program Student Award", org: "FCNAUP", year: "" },
  { title: "Academic Merit Awards", org: "Colégio Luso-Francês", year: "2014–2022" },
];

const About = () => {
  return (
    <Layout>
      <SEO title="Sobre Guilherme Neves, nutrição de performance e sistemas" description="Nutrição de performance aprendida dentro do futebol de elite. O trabalho, os ambientes de onde veio, e porque é que um sistema vale mais do que um conselho." path="/sobre" />
      {/* Who I am. The page opens on the person, not on a positioning line. */}
      <section className="section-padding section-spacing">
        <div className="max-content">
          <div className="grid md:grid-cols-[1fr,340px] lg:grid-cols-[1fr,400px] gap-12 md:gap-16 items-start">
            <div>
              <Reveal>
                <p className="text-caption mb-6">Quem sou</p>
              </Reveal>
              <Reveal delay={0.1}>
                {/* O lema morreu a 6 nov, por decisão dele: "não precisamos
                    de nos intitular nutricionista em lado nenhum". O que
                    ficou no lugar é a frase com que a história dele abre
                    (historia.md, versão ④), ditada por ele a 11 out. */}
                <h1 className="t-title max-w-3xl">
                  There was a day I had to accept I wasn’t going to be a
                  professional player.
                </h1>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-body-lg max-w-2xl mt-8">
                  Sou licenciado em Ciências da Nutrição pela FCNAUP, Universidade
                  do Porto, e estou em vias de ter a cédula profissional. Aprendi
                  o trabalho dentro do <Em>futebol profissional de elite</Em> antes
                  de acabar o curso: mais recentemente no RSC Anderlecht, e antes
                  disso junto da equipa principal do Leça FC.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <p className="text-body max-w-2xl mt-4">
                  Mais de quinze anos como atleta decidem a forma como leio uma
                  sala e como <Em>ganho a confiança de atletas e de equipas
                  técnicas</Em>. O objetivo é internacional, e feito para durar.
                </p>
              </Reveal>
              <Reveal delay={0.4}>
                <p className="text-caption text-[10px] mt-8">
                  22 anos · Porto
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.2} direction="right">
              <div className="relative mt-4 md:mt-12">
                <PortraitPlaceholder caption="Guilherme Neves, Porto" />
              </div>
            </Reveal>
          </div>

          {/* Where it happened. Four frames instead of a paragraph of CV. */}
          <Reveal delay={0.15}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-4 mt-14 md:mt-20">
              {[
                { src: photoSign, alt: "Guilherme at the RSC Anderlecht training centre.", cap: "RSC Anderlecht", pos: "center 30%" },
                { src: photoTrophies, alt: "Guilherme inside the RSC Anderlecht club.", cap: "Brussels", pos: "center 20%" },
                { src: photoPitchside, alt: "Guilherme pitchside with Leça FC.", cap: "Leça FC", pos: "center 22%" },
                { src: photoArrival, alt: "Guilherme arriving with the Leça FC squad.", cap: "Matchday", pos: "center 25%" },
              ].map((ph) => (
                <figure key={ph.cap} className="relative overflow-hidden rounded-lg aspect-[3/4]">
                  <img src={ph.src} alt={ph.alt} className="w-full h-full object-cover" style={{ objectPosition: ph.pos }} loading="lazy" />
                  <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to top, hsl(var(--charcoal-deep) / 0.6), transparent 50%)" }} />
                  <figcaption className="absolute bottom-2.5 left-3 text-[9px] md:text-[10px] tracking-[0.2em] uppercase font-display" style={{ color: "hsl(var(--ivory) / 0.85)" }}>
                    {ph.cap}
                  </figcaption>
                </figure>
              ))}
            </div>
          </Reveal>

          {/* Four photographs of him inside two clubs raise exactly one
              question, and until now the page made you scroll another four
              thousand pixels before offering any answer. The door goes where
              the curiosity is. */}
          <Reveal delay={0.25}>
            <Link
              to="/trabalho"
              className="group inline-flex items-center gap-2.5 mt-6 py-2 font-display text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              O que fiz de facto nessas salas
              <span
                aria-hidden
                className="inline-block transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      <div className="section-padding max-content">
        <div className="divider" />
      </div>

      {/* Why this work */}
      <section className="section-padding section-spacing relative">
        <PlanGrid />
        <div className="max-content relative">
          <Reveal>
            <p className="text-caption mb-6">Porquê este trabalho</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-headline max-w-3xl">
              Fui atleta a vida toda.{" "}
              <span style={{ color: "hsl(var(--olive-light))", fontStyle: "italic", fontWeight: 300 }}>
                É daí que isto parte.
              </span>
            </h2>
          </Reveal>

          {/* Cinematic band, a real moment inside the football environment */}
          <Reveal delay={0.2}>
            <figure className="relative mt-10 md:mt-14 overflow-hidden rounded-lg">
              <img
                src={photoLockerRoom}
                alt="Guilherme focused inside a football dressing room before a match."
                className="w-full h-[38vh] md:h-[52vh] object-cover"
                style={{ objectPosition: "center 26%" }}
                loading="lazy"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: "linear-gradient(to top, hsl(var(--charcoal-deep) / 0.55), transparent 55%)" }}
              />
              <figcaption
                className="absolute bottom-4 left-5 text-[10px] tracking-[0.28em] uppercase font-display"
                style={{ color: "hsl(var(--ivory) / 0.75)" }}
              >
                Dentro do balneário, antes de contar
              </figcaption>
            </figure>
          </Reveal>

          {/* Story, essentials marked so the spine reads at a glance */}
          <div className="grid md:grid-cols-[0.9fr,1.3fr] gap-8 md:gap-16 mt-12 md:mt-16">
            <Reveal delay={0.15}>
              <p
                className="font-display text-xl md:text-2xl font-light leading-snug"
                style={{ color: "hsl(var(--foreground))" }}
              >
                Vivi isto por dentro. E aprendi que qualidade e esforço, sozinhos,
                <Em>nunca chegam</Em>.
              </p>
            </Reveal>
            <div className="space-y-5 max-w-2xl">
              <Reveal delay={0.2}>
                <p className="text-body-lg">
                  O talento e o trabalho levaram-me longe, mas bateram sempre na
                  mesma parede. O que faltava era <Em>estratégia, e saber mesmo o
                  que estava a fazer ao meu corpo</Em>. A ajuda de que precisei
                  nessa altura não existia à minha volta, por isso decidi passar a
                  ser essa ajuda para os atletas que vêm agora.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <p className="text-body">
                  As coisas mudaram no dia em que construí <Em>uma relação calma
                  com a comida</Em>. Sem pressão, sem nada proibido, a gostar
                  daquilo e a ser inteligente com o corpo. É isso que quero passar
                  a outros atletas: levar a sério, largar os tabus, e tratar a
                  nutrição como qualidade de que se goza e não como coisa a temer.
                  <Em>O alimento mais saudável no momento errado não faz nada pela
                  performance</Em>, e quase ninguém ouve isso.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <div className="section-padding max-content">
        <div className="divider" />
      </div>

      {/* Philosophy */}
      <section className="section-padding section-spacing">
        <div className="max-content">
          <Reveal>
            <p className="text-caption mb-6">Princípios</p>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-10 mt-8">
            {[
              {
                title: "Prático e sustentável",
                text: "Se não resulta numa semana de treino real, não resulta. E tem de continuar a resultar, semana após semana, ou nunca foi um sistema. O que construo tem de sobreviver a deslocações, a calendários e a pressão, e ainda fazer sentido um mês depois.",
              },
              {
                title: "Centrado no atleta",
                text: "Interessa-me a pessoa, não só a performance. A saúde vem com os resultados, nunca trocada por eles. Os gostos, a cultura e a vida de alguém têm de caber dentro do plano, porque uma estratégia que ignora quem a pessoa é não sobrevive.",
              },
              {
                title: "Com base na evidência",
                text: "Assente na ciência, mas sempre dependente do contexto. A investigação aponta a direção; o atleta à minha frente, o desporto dele e o momento é que decidem como é que aquilo se aplica.",
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.1}>
                <motion.div
                  className="space-y-4 p-8 border border-transparent hover:border-border/60 hover:bg-card/50 transition-all duration-500"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-caption text-xs">0{i + 1}</span>
                    <h3 className="font-display text-xl font-medium text-foreground">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-body">{item.text}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="section-padding max-content">
        <div className="divider" />
      </div>

      {/* Education & Credentials */}
      <section className="section-padding section-spacing">
        <div className="max-content">
          <Reveal>
            <p className="text-caption mb-6">Education</p>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-16 mt-8">
            <Reveal delay={0.1}>
              <div className="space-y-8">
                <div className="space-y-2">
                  <h3 className="font-display text-lg font-medium text-foreground">BSc in Nutrition Sciences</h3>
                  <p className="text-body text-sm">FCNAUP, University of Porto</p>
                  <p className="text-caption text-[10px] font-normal">2022–2026 · BSc, graduated July 2026</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-display text-lg font-medium text-foreground">Erasmus+ Mobility Project</h3>
                  <p className="text-body text-sm">Sicily, Italy</p>
                  <p className="text-caption text-[10px] font-normal">May 2024</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-display text-lg font-medium text-foreground">Sciences & Technology (12th)</h3>
                  <p className="text-body text-sm">Colégio Luso-Francês</p>
                </div>
              </div>
            </Reveal>
            <div>
              <Reveal delay={0.15}>
                <div className="mb-10">
                  <p className="text-caption text-xs mb-5">Awards</p>
                  <div className="space-y-4">
                    {awards.map((award) => (
                      <div key={award.title} className="flex items-baseline justify-between gap-4 py-2 border-b border-border/40">
                        <div>
                          <p className="font-display text-sm font-medium text-foreground">{award.title}</p>
                          <p className="text-[11px] text-muted-foreground mt-0.5">{award.org}</p>
                        </div>
                        {award.year && <span className="text-caption text-[10px] shrink-0">{award.year}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <div>
                  <p className="text-caption text-xs mb-5">Certifications</p>
                  <div className="space-y-3">
                    {certifications.map((cert) => (
                      <p key={cert} className="text-body text-sm py-1.5 border-b border-border/30">{cert}</p>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <div className="section-padding max-content">
        <div className="divider" />
      </div>

      {/* The close.
          This page used to end on "Considering an engagement?" and a single
          button to the contact form, which was also the only link in four and a
          half thousand pixels. It asked the wrong question. Someone who has
          just read who he is wants to know what he has actually done, not to
          write to a stranger, so the work goes first and the conversation goes
          second. About, then work, then contact, in that order. */}
      <section className="section-padding section-spacing">
        <div className="max-content text-center">
          <Reveal>
            <h2 className="text-headline max-w-2xl mx-auto">
              Isto é quem eu sou. Agora o que construí.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-body-lg max-w-md mx-auto mt-4">
              Os sistemas, as ferramentas e os modelos que saíram dessas salas,
              e para o que é que cada um servia de facto.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <Magnetic as="span" strength={7}>
                <Link
                  to="/trabalho"
                  className="inline-flex items-center justify-center px-10 py-4 bg-foreground text-background font-display text-sm font-medium tracking-wide transition-all duration-300 hover:opacity-85"
                >
                  Ver o trabalho
                </Link>
              </Magnetic>
              <Link
                to="/contacto"
                className="inline-flex items-center gap-2 py-2 font-display text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                Ou falar comigo
                <span aria-hidden>→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
};

export default About;
