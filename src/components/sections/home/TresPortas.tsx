import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";

/**
 * As três portas, agora em três linhas.
 *
 * Tinha um parágrafo por porta e a crítica a isso estava certa: quem chega
 * não lê metade do que lá está, e três parágrafos a explicar um serviço são
 * três parágrafos que ninguém lê. A porta 1 já foi demonstrada na secção
 * acima, portanto não precisa de se apresentar outra vez, e as outras duas
 * dizem-se numa linha ou não valem a página.
 *
 * Sem preços, de propósito. Publicar uma tabela para clubes antes de o
 * enquadramento do estágio estar fechado cria um conflito que ainda não
 * existe.
 *
 * Nenhuma das três é ato próprio: diagnóstico de uma organização, sistemas e
 * educação, não avaliação nem prescrição de pessoas.
 */
const portas = [
  {
    n: "01",
    titulo: "Auditoria das cinco dimensões",
    uma: "Entro, meço as cinco, e sais com o relatório e o plano.",
    para: "Clubes · Academias · Centros de alto rendimento",
    href: "#dimensoes",
  },
  {
    n: "02",
    titulo: "Sistema de nutrição de equipa",
    uma: "Dia de jogo, viagem, hidratação, recuperação. Fica a funcionar sem eu lá estar.",
    para: "Clubes · Academias · Equipas técnicas",
    href: "/contact",
  },
  {
    n: "03",
    titulo: "Formação",
    uma: "A literacia que faltou ao balneário, dada a tempo de servir para alguma coisa.",
    para: "Atletas · Pais · Equipas técnicas",
    href: "/contact",
  },
];

const TresPortas = () => (
  <section id="portas" className="section-padding section-spacing-sm scroll-mt-24">
    <div className="max-content">
      <Reveal>
        <p className="text-caption mb-6">O que se compra</p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="text-headline max-w-3xl">
          Três portas, e nenhuma delas é uma consulta.
        </h2>
      </Reveal>

      <div className="mt-12 md:mt-14 border-t border-border/60">
        {portas.map((p, i) => {
          const interno = p.href.startsWith("#");
          const Conteudo = (
            <div className="grid grid-cols-[34px,1fr] md:grid-cols-[64px,1fr,auto] gap-x-4 md:gap-x-8 items-baseline py-7 md:py-8">
              <span
                className="font-display text-[10px] tracking-[0.3em]"
                style={{ color: "hsl(var(--olive))" }}
              >
                {p.n}
              </span>
              <div className="min-w-0">
                <h3 className="font-display text-2xl md:text-4xl font-medium tracking-tight text-foreground leading-tight">
                  {p.titulo}
                </h3>
                <p className="text-body text-sm md:text-base mt-2 max-w-xl leading-relaxed">
                  {p.uma}
                </p>
                <p className="text-caption text-[10px] mt-3">{p.para}</p>
              </div>
              <motion.span
                aria-hidden
                className="hidden md:block font-display text-xl text-muted-foreground"
                initial={false}
                whileHover={{ x: 4 }}
              >
                →
              </motion.span>
            </div>
          );

          return (
            <Reveal key={p.n} delay={0.12 + i * 0.08}>
              <div className="border-b border-border/60 transition-colors duration-300 hover:bg-foreground/[0.025]">
                {interno ? (
                  <a href={p.href} className="block">
                    {Conteudo}
                  </a>
                ) : (
                  <Link to={p.href} className="block">
                    {Conteudo}
                  </Link>
                )}
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);

export default TresPortas;
