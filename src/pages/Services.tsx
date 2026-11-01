import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/motion/Magnetic";
import { motion } from "framer-motion";
import AudienceSelector from "@/components/sections/AudienceSelector";
import MatchdayPlanner from "@/components/sections/MatchdayPlanner";
import Em from "@/components/text/Em";
import PlanGrid from "@/components/motion/PlanGrid";
import StandardStatement from "@/components/sections/StandardStatement";

/** A forma é a mensagem: cinco fases, e a última volta à primeira. */
const processSteps = [
  { label: "Descobrir" },
  { label: "Auditar" },
  { label: "Desenhar" },
  { label: "Implementar" },
  { label: "Rever" },
];

const Services = () => {
  return (
    <Layout>
      <SEO title="O que se compra, Guilherme Neves" description="Auditorias a clubes, ferramentas construídas à medida e apoio especializado a atletas de elite." path="/servicos" />
      {/* Hero, Why */}
      <section className="section-padding section-spacing">
        <div className="max-content">
          <Reveal>
            <p className="text-caption mb-6">O que se compra</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-display max-w-5xl">
              Três formas de trabalhar comigo, e a diferença entre elas não é
              o público.
            </h1>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="text-body-lg max-w-2xl mt-8">
              É o valor: uma devolve tempo, outra devolve processo, e a
              terceira devolve cumprimento. A pergunta por baixo das três é
              sempre a mesma:{" "}
              <Em>a nutrição aqui funciona como sistema, ou só no papel?</Em>
            </p>
          </Reveal>
          {/* The filter, stated before the offer.
              The six doors answer "which of these am I". They do not answer
              the question that actually decides whether the work goes well,
              which is not what somebody does for a living but how they think
              about spending money on getting better. Somebody weighing price
              against their bank balance and somebody weighing it against what
              it returns are two different clients, and only one of them
              finishes. Saying so here costs the wrong client a click and saves
              both of us a season.

              The guarantee is the other half of it. Selectivity without risk
              on my side is just a way of sounding expensive. */}
          <Reveal delay={0.3}>
            <div
              className="mt-10 max-w-2xl p-6 md:p-7"
              style={{ background: "hsl(41 40% 96%)", border: "1px solid hsl(var(--subtle-border))" }}
            >
              <p className="text-caption text-[10px] mb-3">Para quem isto resulta</p>
              <p className="text-body">
                Gente com um objetivo, que lê um número contra o que ele
                devolve e não contra o que custa, e que aceita ser disciplinada
                na parte que lhe toca. Não é para toda a gente, e não é para
                quem precisa de ser convencido.
              </p>
              <p className="text-body mt-4">
                Se eu não acrescentar valor, devolvo o dinheiro. Prefiro correr
                esse risco eu do que pô-lo do seu lado: se não tenho a certeza
                de que consigo ajudar, não devia estar a aceitar o trabalho.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.35}>
            <div className="mt-10 flex items-center gap-6 flex-wrap">
              <Link
                to="/trabalho"
                className="text-sm font-display tracking-wide link-underline"
              >
                Ver o trabalho aplicado em que isto assenta →
              </Link>
              <span className="text-caption text-[10px] text-muted-foreground">
                Porto / Bruxelas · Por convite e por contacto
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Sorted by who is arriving, before anything is sold */}
      <AudienceSelector />

      {/* The statement band owns its own scene and its own scroll length now,
          because the sequence inside it is what decides both. */}
      <StandardStatement />

      {/* The three engagements that used to stand here are gone as a section.
          They were a second taxonomy of the same work sitting under the six
          doors, so a stranger had to read both and map one onto the other.
          They now live inside the door they belong to, under "How it runs",
          with the photograph of what each one produces. */}

      <div className="section-padding max-content">
        <div className="divider" />
      </div>

      {/* A sample of the work itself, sitting between what can be bought and
          how it runs. It answers "what is it actually like" without a single
          extra paragraph of claim. */}
      <MatchdayPlanner />

      <div className="section-padding max-content">
        <div className="divider" />
      </div>

      {/* Process */}
      <section className="section-padding section-spacing-sm">
        <div className="max-content">
          <Reveal>
            <div className="flex items-baseline justify-between gap-6 flex-wrap mb-10 md:mb-12">
              <p className="text-caption">Como é que se trabalha</p>
              <p className="text-caption text-[10px] text-muted-foreground">
                Um ciclo, não uma entrega
              </p>
            </div>
          </Reveal>

          {/* Five steps used to carry a sentence each, a scroll-drawn rule and
              an animated return curve, and took most of a screen to say
              something a buyer reads in three seconds. The shape is the whole
              message here: five stages, and the last one goes back to the
              first. The words alone carry it. */}
          <div className="relative">
            <motion.div
              aria-hidden
              className="hidden md:block absolute top-1/2 left-0 right-0 h-px origin-left"
              style={{ background: "hsl(var(--olive) / 0.35)" }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            />
            {/* The knockout has to sit on the whole item, not on the label
                alone. With the background only behind the word, the rule ran
                straight through the step number and through the gap beside it,
                which read as a line drawn over the text by mistake. */}
            <ol className="relative flex flex-wrap items-center gap-x-1 gap-y-4 md:justify-between">
              {processSteps.map((step, i) => (
                <li
                  key={step.label}
                  className="flex items-center gap-2.5 md:px-3"
                  style={{ background: "hsl(var(--background))" }}
                >
                  <span
                    className="font-display text-[10px] tabular-nums"
                    style={{ color: "hsl(var(--olive) / 0.75)" }}
                  >
                    0{i + 1}
                  </span>
                  <span className="font-display text-base md:text-xl font-medium text-foreground tracking-tight">
                    {step.label}
                  </span>
                  {i < processSteps.length - 1 && (
                    <span aria-hidden className="md:hidden text-muted-foreground pl-1.5">·</span>
                  )}
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-8 flex items-center gap-2.5">
            <span className="text-base leading-none" style={{ color: "hsl(var(--olive))" }} aria-hidden>↺</span>
            <span className="text-[10px] tracking-[0.2em] uppercase font-display" style={{ color: "hsl(var(--olive))" }}>
              Revisto, não entregue
            </span>
          </div>
        </div>
      </section>

      <div className="section-padding max-content">
        <div className="divider" />
      </div>

      {/* Closing callout, full-width dark */}
      <section className="section-dark relative overflow-hidden">
        <div className="scene-grain absolute inset-0 pointer-events-none" />
        <div className="section-padding section-spacing relative">
          <div className="max-content">
            <Reveal>
              <p className="text-caption mb-10">Convite</p>
            </Reveal>
            <Reveal delay={0.1}>
              <blockquote className="font-display text-3xl md:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight max-w-5xl text-[hsl(var(--ivory))]">
                «Não quero mais um documento de nutrição. Quero um sistema que as pessoas cumpram.»
              </blockquote>
            </Reveal>
            <Reveal delay={0.25}>
              <div className="mt-12 flex items-center gap-6 flex-wrap">
                <Magnetic as="span" strength={7}>
                  <Link
                    to="/contacto"
                    className="inline-flex items-center justify-center px-10 py-4 bg-[hsl(var(--ivory))] text-[hsl(var(--charcoal-deep))] font-display text-sm font-medium tracking-wide transition-all duration-300 hover:opacity-90"
                  >
                    Falar comigo
                  </Link>
                </Magnetic>
                <p className="text-caption text-[10px] text-[hsl(var(--ivory)/0.5)]">
                  Cada contacto é lido por mim · Porto / Bruxelas
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;