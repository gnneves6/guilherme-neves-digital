import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";

/**
 * As três portas, e as três vendem-se hoje sem cédula.
 *
 * Nenhuma é ato próprio: são diagnóstico de uma organização, sistemas e
 * educação, não avaliação, diagnóstico nem prescrição de pessoas. A
 * restrição legal não está a limitar a oferta, está a escolhê-la, e calha
 * apontar para a mesma camada que o trabalho académico defende ser a
 * decisiva.
 *
 * Sem preços, de propósito. Publicar uma tabela de valores para clubes antes
 * de o enquadramento do estágio estar fechado cria um conflito que ainda não
 * existe, e uma primeira página não precisa deles.
 *
 * A auditoria vem primeiro porque é a única das três com um framework
 * publicado por trás, e porque é ela que diz o que falta: o sistema entrega
 * depois aquilo que ela encontrou.
 */
const portas = [
  {
    n: "01",
    titulo: "Auditoria das cinco dimensões",
    para: "Clubes · Academias · Centros de alto rendimento",
    corpo:
      "Entro no clube e meço as cinco dimensões que decidem se a nutrição pega ou se fica no papel: conhecimento, contexto organizacional, calendário competitivo, cultura do balneário e capacidade de adaptação. Sai um relatório e um plano de implementação.",
  },
  {
    n: "02",
    titulo: "Sistema de nutrição de equipa",
    para: "Clubes · Academias · Equipas técnicas",
    corpo:
      "Monta-se o que a equipa usa à volta da competição: matchday, viagem, hidratação, recuperação, catering. Fica a funcionar sem eu lá estar, que é a única forma de saber que está mesmo construído.",
  },
  {
    n: "03",
    titulo: "Formação",
    para: "Atletas · Pais · Equipas técnicas",
    corpo:
      "Sessões e workshops sobre o que a equipa precisar: hidratação, dia de jogo, suplementação, o que comer quando se viaja. A literacia que me faltou, dada a quem ainda está a tempo de a usar.",
  },
];

const TresPortas = () => (
  <section id="portas" className="section-padding section-spacing-sm scroll-mt-24">
    <div className="max-content">
      <Reveal>
        <p className="text-caption mb-6">O que faço</p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="text-headline max-w-3xl">
          Três portas, e nenhuma delas é uma consulta.
        </h2>
      </Reveal>

      <div className="mt-12 md:mt-16 border-t border-border/60">
        {portas.map((p, i) => (
          <Reveal key={p.n} delay={0.12 + i * 0.08}>
            <div className="grid md:grid-cols-[72px,1fr] gap-3 md:gap-10 items-baseline py-8 md:py-9 border-b border-border/60">
              <span
                className="font-display text-[10px] tracking-[0.3em]"
                style={{ color: "hsl(var(--olive))" }}
              >
                {p.n}
              </span>
              <div className="min-w-0">
                <h3 className="font-display text-xl md:text-2xl font-medium tracking-tight text-foreground">
                  {p.titulo}
                </h3>
                <p className="text-body text-sm md:text-base mt-2.5 max-w-2xl leading-relaxed">
                  {p.corpo}
                </p>
                <p className="text-caption text-[10px] mt-3.5">{p.para}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.36}>
        <div className="mt-10">
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 font-display text-sm tracking-wide text-foreground link-underline"
          >
            Diz-me em que ambiente estás
            <motion.span aria-hidden className="inline-block" initial={false} whileHover={{ x: 3 }}>
              →
            </motion.span>
          </Link>
        </div>
      </Reveal>
    </div>
  </section>
);

export default TresPortas;
