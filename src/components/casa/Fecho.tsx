import { Link } from "react-router-dom";
import { motion, useTransform } from "framer-motion";
import Reveal from "@/components/Reveal";
import { usePonteiro } from "@/components/palco/palco";
import retrato from "@/assets/guilherme-portrait.webp";

/**
 * O fecho. Fecha-se com imagem e nunca com slogan (historia.md, regra 3), e a
 * imagem é dele: os toques na parede de casa. As maiúsculas e o ";)" ficam,
 * são a aresta que faz isto soar a uma pessoa.
 *
 * O que está aberto agora vem aqui, curto e com o estado à frente, em vez de
 * uma secção inteira: depois de ter visto tudo o resto, quem chega aqui só
 * precisa de saber a que porta bater.
 *
 * A lista passou para o palco anterior, onde a comunidade é mostrada.
 */
const aberto = [
  { estado: "Open", o: "Talks and workshops", nota: "Run4Excellence talks, Oct 2026 · MedUBI, 24 Nov 2026" },
  { estado: "2027", o: "Tools and training for professionals", nota: "The list hears first" },
  { estado: "With the licence", o: "Individual athletes", nota: "In Portugal. Anywhere else, ask" },
];

const Fecho = () => {
  const rato = usePonteiro();
  const fotoX = useTransform(rato.x, [-1, 1], [-14, 14]);
  const fotoY = useTransform(rato.y, [-1, 1], [-10, 10]);

  return (
    <section className="relative overflow-hidden section-padding pt-32 pb-24 md:pt-40" style={{ background: "hsl(var(--charcoal-deep))" }}>
      <div className="max-content relative">
        <div className="grid md:grid-cols-12 gap-x-8 gap-y-14 items-center">
          <div className="md:col-span-8 relative z-10">
            <Reveal>
              <p className="t-quote" style={{ color: "hsl(var(--ivory))" }}>
                And here I am, still kicking a ball against the wall at home.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-body-lg mt-8 max-w-xl" style={{ color: "hsl(var(--ivory) / 0.65)" }}>
                Because the passion and the joy can (AND SHOULD) live on inside us ;)
              </p>
            </Reveal>
          </div>
          <motion.div className="md:col-span-4 relative" style={{ x: fotoX, y: fotoY }}>
            <img
              src={retrato}
              alt="Guilherme Neves, smiling."
              className="w-full aspect-[4/5] object-cover shadow-[0_50px_90px_-30px_rgba(0,0,0,0.9)]"
              style={{ objectPosition: "50% 30%" }}
              loading="lazy"
            />
          </motion.div>
        </div>

        <div className="mt-28 md:mt-36">
          <p className="t-kicker mb-2" style={{ color: "hsl(var(--ivory) / 0.45)" }}>
            What’s open now
          </p>
          <ul>
            {aberto.map((l) => (
              <li
                key={l.o}
                className="grid grid-cols-[7.5rem,1fr] md:grid-cols-[10rem,1fr,1fr] gap-x-6 gap-y-1 py-5 border-t items-baseline"
                style={{ borderColor: "hsl(var(--ivory) / 0.12)" }}
              >
                <span className="t-kicker" style={{ color: "hsl(110 22% 66%)" }}>
                  {l.estado}
                </span>
                <span className="font-display font-bold text-xl md:text-2xl tracking-tight" style={{ color: "hsl(var(--ivory))" }}>
                  {l.o}
                </span>
                <span className="col-start-2 md:col-start-3 text-body" style={{ color: "hsl(var(--ivory) / 0.55)" }}>
                  {l.nota}
                </span>
              </li>
            ))}
          </ul>
          <div className="border-t pt-10" style={{ borderColor: "hsl(var(--ivory) / 0.12)" }}>
            <Link
              to="/contacto"
              className="inline-block font-body text-sm font-semibold px-7 py-4"
              style={{ background: "hsl(var(--ivory))", color: "hsl(var(--charcoal-deep))" }}
            >
              Talk to me
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Fecho;
