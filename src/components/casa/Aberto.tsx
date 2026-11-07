import { Link } from "react-router-dom";
import Reveal from "@/components/Reveal";

/**
 * 04 · O que está aberto agora. Substitui a grelha de três serviços, que
 * apresentava como disponível trabalho que ainda não está: o acompanhamento
 * individual em Portugal espera pela cédula.
 *
 * Cada linha diz o estado antes de a pessoa ler o resto, que é a regra de
 * decisions.md ("the state belongs before the choice").
 *
 * Não há linha para clubes por agora, e não é esquecimento: entra quando
 * estiver decidida.
 */
const linhas = [
  {
    o: "Talks and workshops",
    estado: "Open",
    texto:
      "Run4Excellence talks, on hydration in running, October 2026. Athlete Med Studio at MedUBI, on protein, 24 November 2026.",
  },
  {
    o: "Tools and training for professionals",
    estado: "2027",
    texto: "For people who do this work. The first releases come in 2027, and the list hears first.",
  },
  {
    o: "Individual athletes",
    estado: "With the licence",
    texto: "In Portugal this waits for my professional licence. Anywhere else, ask.",
  },
];

const Aberto = () => (
  <section className="scene-dark section-padding section-spacing">
    <div className="max-content">
      <Reveal>
        <p className="t-kicker" style={{ color: "hsl(var(--ivory) / 0.5)" }}>
          04 · What’s open now
        </p>
      </Reveal>

      <ul className="mt-12">
        {linhas.map((l, i) => (
          <Reveal key={l.o} delay={0.06 * i}>
            <li
              className="grid md:grid-cols-12 gap-x-8 gap-y-3 py-8 md:py-10 border-t"
              style={{ borderColor: "hsl(var(--ivory) / 0.14)" }}
            >
              <p className="md:col-span-2 t-kicker pt-2" style={{ color: "hsl(110 22% 66%)" }}>
                {l.estado}
              </p>
              <p className="md:col-span-5 font-display font-bold tracking-tight text-3xl md:text-4xl leading-none">
                {l.o}
              </p>
              <p className="md:col-span-5 text-body-lg">{l.texto}</p>
            </li>
          </Reveal>
        ))}
      </ul>

      <Reveal>
        <div className="border-t pt-10" style={{ borderColor: "hsl(var(--ivory) / 0.14)" }}>
          <Link
            to="/contacto"
            className="inline-block font-body text-sm font-semibold px-7 py-4"
            style={{ background: "hsl(var(--ivory))", color: "hsl(var(--charcoal-deep))" }}
          >
            Talk to me
          </Link>
        </div>
      </Reveal>
    </div>
  </section>
);

export default Aberto;
