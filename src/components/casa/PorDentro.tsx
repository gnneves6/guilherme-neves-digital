import Reveal from "@/components/Reveal";

/**
 * O que se percebeu lá dentro, e a tese defendida. Vem logo a seguir à peça
 * dos equipamentos, que é quem mostra os sítios.
 *
 * Os três cartões com fotografia e factos secos que aqui estavam saíram a
 * 7 nov: tinham substituído essa peça, e ele sentiu-lhe a falta, com razão.
 * Era a única coisa no site que nenhum outro site tem, e as provas dela
 * ("cortei 75% de um painel de sangue proposto") dizem muito mais do que
 * "mais de 100 atletas".
 */
const PorDentro = () => (
  <section className="section-padding section-spacing">
    <div className="max-content">
      <div className="grid md:grid-cols-12 gap-x-8 gap-y-12 items-start">
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
