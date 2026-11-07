import { Link } from "react-router-dom";
import { motion, useMotionTemplate, useSpring, useTransform } from "framer-motion";
import { Palco, usePalco, usePonteiro } from "@/components/palco/palco";
import { RadarCapa, CincoCapa } from "@/components/casa/ODar";
import atlasPreview from "@/assets/work-previews/football-nutrition-atlas-preview.webp";

/**
 * 03 · O que ele dá. Eram três cartões numa grelha, lado a lado e parados.
 * Agora é uma fila que corre na horizontal com o scroll, com a peça em foco
 * à frente e as outras recuadas: é o carril do Huesca (medido a 3 nov) e a
 * profundidade que ele disse faltar a tudo menos aos equipamentos.
 *
 * O Radar é uma de três, como ficou decidido a 6 nov. Grátis e sem email
 * para ver: a primeira coisa que o site faz é dar.
 */
const pecas = [
  {
    titulo: "The Evidence Radar",
    texto:
      "A weekly research routine an AI runs against rules I wrote. Every study gets two grades: how strong the evidence is, and whether it changes anything on Monday morning.",
    nota: "More than 80 people asked for it in August 2026",
    para: "/trabalho?a=evidence-radar",
    capa: <RadarCapa />,
  },
  {
    titulo: "The five checks",
    texto: "The five things I check before anything else in a performance environment, each with the work behind it.",
    nota: "Free, whole, on one page",
    para: "/cinco-verificacoes",
    capa: <CincoCapa />,
  },
  {
    titulo: "Football Nutrition Atlas",
    texto:
      "Nine pages that turn football nutrition research into the decisions a player actually makes on the day, from the pre-match plate to recovery.",
    nota: "Finished · three real pages to see",
    para: "/trabalho?a=football-nutrition-atlas",
    capa: (
      <img
        src={atlasPreview}
        alt="Three pages of the Football Nutrition Atlas: the cover, the matchday flow and the cheat sheet."
        className="w-full aspect-[4/3] object-cover"
        loading="lazy"
      />
    ),
  },
];

const Cartao = ({ p, ativo }: { p: (typeof pecas)[number]; ativo: boolean }) => (
  <motion.div
    animate={{ scale: ativo ? 1 : 0.84, opacity: ativo ? 1 : 0.55, rotateY: ativo ? 0 : -10, filter: ativo ? "brightness(1)" : "brightness(0.55)" }}
    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    style={{ transformPerspective: 1200 }}
  >
    <Link to={p.para} className="group block" tabIndex={ativo ? 0 : -1}>
      <div className="overflow-hidden shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]">
        <div className="transition-transform duration-700 ease-out group-hover:scale-[1.03]">{p.capa}</div>
      </div>
      <div className="mt-6 grid grid-cols-[1fr,auto] gap-6 items-start">
        <div>
          <p className="font-display font-bold text-xl md:text-2xl tracking-tight" style={{ color: "hsl(var(--ivory))" }}>
            {p.titulo}
          </p>
          <p className="text-body mt-2 max-w-md" style={{ color: "hsl(var(--ivory) / 0.62)" }}>
            {p.texto}
          </p>
          <p className="t-kicker mt-4" style={{ color: "hsl(110 22% 66%)" }}>
            {p.nota}
          </p>
        </div>
        <span
          className="mt-1 inline-flex items-center justify-center w-12 h-12 rounded-full transition-transform duration-500 group-hover:translate-x-1"
          style={{ background: "hsl(var(--ivory))", color: "hsl(var(--charcoal-deep))" }}
          aria-hidden
        >
          →
        </span>
      </div>
    </Link>
  </motion.div>
);

const Cabeca = () => (
  <div className="section-padding max-content w-full">
    <p className="t-kicker" style={{ color: "hsl(var(--ivory) / 0.45)" }}>
      03 · Given away
    </p>
    <p className="t-title mt-4" style={{ color: "hsl(var(--ivory))" }}>
      Take what I use.
    </p>
    <p className="text-body-lg mt-4 max-w-md" style={{ color: "hsl(var(--ivory) / 0.6)" }}>
      The same tools I work with, given whole. Free, and no email to see any of it.
    </p>
  </div>
);

const Prateleira = () => {
  const palco = usePalco(pecas.length);
  const rato = usePonteiro();
  const suave = useSpring(palco.progresso, { stiffness: 80, damping: 24, mass: 0.5 });
  const x = useTransform(suave, (v) => `calc(${-v * (pecas.length - 1)} * var(--passo))`);
  const luzX = useTransform(rato.x, [-1, 1], [20, 80]);
  const luzY = useTransform(rato.y, [-1, 1], [20, 80]);
  const luz = useMotionTemplate`radial-gradient(circle at ${luzX}% ${luzY}%, hsl(var(--ivory) / 0.07), transparent 45%)`;

  if (palco.estatico) {
    return (
      <section id="dar" className="py-28" style={{ background: "hsl(var(--charcoal-deep))" }}>
        <Cabeca />
        <div className="section-padding max-content grid md:grid-cols-3 gap-10 mt-16">
          {pecas.map((p) => (
            <Cartao key={p.titulo} p={p} ativo />
          ))}
        </div>
      </section>
    );
  }

  return (
    <Palco palco={palco} id="dar" altura={pecas.length * 90 + 100} style={{ background: "hsl(var(--charcoal-deep))" }}>
      <motion.div aria-hidden className="absolute inset-0 z-0" style={{ background: luz }} />
      <div className="relative z-10 h-full flex flex-col justify-center gap-8 md:gap-12 pt-16 [--passo:86vw] [--largura:80vw] [--margem:10vw] md:[--passo:37vw] md:[--largura:31vw] md:[--margem:34.5vw]">
        <Cabeca />
        <motion.div className="flex" style={{ x, paddingLeft: "var(--margem)", gap: "calc(var(--passo) - var(--largura))" }}>
          {pecas.map((p, i) => (
            <div key={p.titulo} className="shrink-0" style={{ width: "var(--largura)" }}>
              <Cartao p={p} ativo={i === palco.indice} />
            </div>
          ))}
        </motion.div>
      </div>
    </Palco>
  );
};

export default Prateleira;
