import { useState } from "react";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";

/**
 * O modelo, pela figura dele e não pela minha.
 *
 * A primeira versão disto era um percurso: a evidência entrava de um lado,
 * atravessava cinco portões por ordem, e saía prática do outro. Estava
 * errado, e ele apanhou-o: no diagrama do relatório as cinco dimensões
 * apontam todas ao mesmo tempo para o centro. Não há ordem, não há montante
 * nem jusante, e não há uma que se resolva antes da seguinte. Uma sequência
 * sugere que se arruma uma coisa de cada vez, que é exactamente o erro que
 * a tese dele desmonta.
 *
 * Por isso a forma é a dele: três em cima, duas aos lados, o centro no meio,
 * e o resultado numa faixa por baixo. As setas apontam para dentro.
 *
 * A interação diz o que uma figura estática não diz. Desligar uma dimensão
 * não corta um caminho, estraga o resultado: a faixa de baixo cai para "fica
 * no papel" com uma só desligada, e as outras quatro não compensam. É a
 * diferença entre uma lista de requisitos e um sistema.
 *
 * Clique, nunca scroll: o scroll está todo gasto no capítulo dos
 * equipamentos, e o que depende de scroll não existe na pré-visualização.
 */
const dimensoes = [
  {
    n: 1,
    nome: "Conhecimento científico",
    itens: ["Evidência e guidelines", "Conhecimento específico do futebol", "Formação contínua"],
    area: "a",
  },
  {
    n: 2,
    nome: "Contexto organizacional",
    itens: ["Estrutura e recursos do clube", "Clareza de funções", "Comunicação entre departamentos"],
    area: "b",
  },
  {
    n: 3,
    nome: "Contexto competitivo",
    itens: ["Congestionamento de calendário", "Objetivos de desempenho", "Viagens e recuperação"],
    area: "c",
  },
  {
    n: 4,
    nome: "Dinâmicas culturais e sociais",
    itens: ["Cultura e valores do clube", "Crenças e adesão do jogador", "Confiança e liderança"],
    area: "d",
  },
  {
    n: 5,
    nome: "Adaptabilidade contextual",
    itens: ["Flexibilidade e implementação", "Individualização", "Navegar os constrangimentos reais"],
    area: "e",
  },
];

const OLIVE = "hsl(110 30% 62%)";

const Cartao = ({
  d,
  desligada,
  onToggle,
}: {
  d: (typeof dimensoes)[number];
  desligada: boolean;
  onToggle: () => void;
}) => (
  <motion.button
    type="button"
    onClick={onToggle}
    aria-pressed={desligada}
    aria-label={`Desligar a dimensão ${d.nome}`}
    className="group text-left rounded-[3px] p-5 md:p-6 h-full w-full transition-colors duration-500"
    animate={{
      borderColor: desligada ? "hsl(var(--ivory) / 0.1)" : "hsl(var(--ivory) / 0.22)",
      backgroundColor: desligada ? "hsl(var(--ivory) / 0.01)" : "hsl(var(--ivory) / 0.04)",
      opacity: desligada ? 0.42 : 1,
    }}
    style={{ borderWidth: 1, borderStyle: "solid" }}
  >
    <span className="flex items-center gap-3">
      <motion.span
        className="flex items-center justify-center w-7 h-7 rounded-full font-display text-[11px] shrink-0"
        animate={{
          backgroundColor: desligada ? "hsl(var(--ivory) / 0.08)" : "hsl(var(--olive) / 0.75)",
          color: desligada ? "hsl(var(--ivory) / 0.45)" : "hsl(var(--ivory))",
        }}
      >
        {desligada ? "✕" : d.n}
      </motion.span>
      <span
        className="font-display text-[11px] md:text-xs tracking-[0.14em] uppercase leading-tight"
        style={{ color: "hsl(var(--ivory) / 0.9)" }}
      >
        {d.nome}
      </span>
    </span>
    <ul className="mt-4 space-y-1.5">
      {d.itens.map((i) => (
        <li key={i} className="flex items-start gap-2">
          <span
            className="mt-[7px] w-1 h-1 rounded-full shrink-0"
            style={{ background: desligada ? "hsl(var(--ivory) / 0.25)" : OLIVE }}
          />
          <span className="text-[12.5px] leading-snug" style={{ color: "hsl(var(--ivory) / 0.62)" }}>
            {i}
          </span>
        </li>
      ))}
    </ul>
  </motion.button>
);

const Seta = ({
  glifo,
  classe,
  activa,
}: {
  glifo: string;
  classe: string;
  activa: boolean;
}) => (
  <motion.span
    aria-hidden
    className={`hidden md:block absolute font-display text-xl pointer-events-none ${classe}`}
    animate={{ color: activa ? OLIVE : "hsl(var(--ivory) / 0.13)" }}
    transition={{ duration: 0.4 }}
  >
    {glifo}
  </motion.span>
);

const CincoDimensoes = () => {
  const [desligadas, setDesligadas] = useState<number[]>([]);
  const alternar = (n: number) =>
    setDesligadas((d) => (d.includes(n) ? d.filter((x) => x !== n) : [...d, n]));
  const partido = desligadas.length > 0;
  const liga = (n: number) => !desligadas.includes(n);

  const porArea = (area: string) => dimensoes.find((d) => d.area === area)!;

  return (
    <section id="dimensoes" className="section-dark section-padding section-spacing scroll-mt-24">
      <div className="max-content">
        <Reveal>
          <p className="text-caption mb-6">O modelo</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="text-headline max-w-4xl" style={{ color: "hsl(var(--ivory))" }}>
            Cinco dimensões decidem se a nutrição pega num clube, e agem todas
            ao mesmo tempo.
          </h2>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="text-body-lg mt-5 max-w-2xl">
            Não é uma sequência. Desliga uma e vê: as outras quatro não
            compensam.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="relative mt-12 md:mt-16">
            <div className="grid md:grid-cols-3 gap-4 md:gap-5">
              {/* linha de cima */}
              {["a", "b", "c"].map((a) => {
                const d = porArea(a);
                return (
                  <Cartao key={d.n} d={d} desligada={!liga(d.n)} onToggle={() => alternar(d.n)} />
                );
              })}

              {/* linha do meio: 04 · centro · 05 */}
              <Cartao
                d={porArea("d")}
                desligada={!liga(4)}
                onToggle={() => alternar(4)}
              />

              <div className="relative flex items-center justify-center py-6 md:py-2">
                <Seta glifo="↘" classe="left-[2px] top-[6px]" activa={liga(1)} />
                <Seta glifo="↓" classe="left-1/2 -translate-x-1/2 top-[-2px]" activa={liga(2)} />
                <Seta glifo="↙" classe="right-[2px] top-[6px]" activa={liga(3)} />
                <Seta glifo="→" classe="left-[-6px] top-1/2 -translate-y-1/2" activa={liga(4)} />
                <Seta glifo="←" classe="right-[-6px] top-1/2 -translate-y-1/2" activa={liga(5)} />

                <motion.div
                  className="relative flex flex-col items-center justify-center text-center rounded-full w-[232px] h-[232px] md:w-[248px] md:h-[248px] px-8"
                  animate={{
                    borderColor: partido ? "hsl(var(--ivory) / 0.18)" : OLIVE,
                    boxShadow: partido ? "none" : "0 0 50px hsl(var(--olive) / 0.4)",
                  }}
                  transition={{ duration: 0.5 }}
                  style={{
                    borderWidth: 1,
                    borderStyle: "solid",
                    background:
                      "radial-gradient(circle at 50% 40%, hsl(var(--olive) / 0.3), hsl(var(--charcoal-deep)) 72%)",
                  }}
                >
                  <p
                    className="font-display text-sm md:text-base tracking-[0.1em] uppercase leading-snug"
                    style={{ color: "hsl(var(--ivory))" }}
                  >
                    Prática de nutrição
                    <br />
                    no futebol
                  </p>
                  <span
                    aria-hidden
                    className="block w-10 h-px my-3.5"
                    style={{ background: "hsl(var(--ivory) / 0.3)" }}
                  />
                  <p
                    className="font-display text-[11px] italic leading-snug"
                    style={{ color: "hsl(var(--ivory) / 0.6)" }}
                  >
                    informada pela evidência, integrada e adaptada ao contexto
                  </p>
                </motion.div>
              </div>

              <Cartao
                d={porArea("e")}
                desligada={!liga(5)}
                onToggle={() => alternar(5)}
              />
            </div>

            {/* O RESULTADO */}
            <motion.div
              className="mt-5 md:mt-6 rounded-[3px] px-6 md:px-10 py-6 md:py-7 text-center"
              animate={{
                borderColor: partido ? "hsl(var(--ivory) / 0.14)" : "hsl(42 45% 58% / 0.5)",
                backgroundColor: partido ? "hsl(var(--ivory) / 0.015)" : "hsl(42 45% 58% / 0.07)",
              }}
              transition={{ duration: 0.5 }}
              style={{ borderWidth: 1, borderStyle: "solid" }}
            >
              <motion.p
                className="font-display text-base md:text-xl tracking-[0.08em] uppercase"
                animate={{ color: partido ? "hsl(var(--ivory) / 0.38)" : "hsl(42 55% 74%)" }}
              >
                {partido
                  ? "Nem exequível, nem aceite, nem sustentável"
                  : "Prática exequível, aceite e sustentável"}
              </motion.p>
              <motion.p
                className="font-display text-[12px] md:text-sm italic mt-2.5"
                animate={{ color: partido ? "hsl(var(--ivory) / 0.3)" : "hsl(var(--ivory) / 0.6)" }}
              >
                {partido
                  ? "o plano existe, e fica no papel"
                  : "sustenta a saúde, o rendimento e o desenvolvimento a longo prazo"}
              </motion.p>
            </motion.div>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <p className="text-body text-sm mt-10 max-w-2xl leading-relaxed">
            {partido
              ? "Com uma dimensão em baixo, o resto do sistema não salva o resultado. É por isto que a auditoria mede as cinco, e não só a que está à vista."
              : "É o diagrama do meu trabalho de fim de curso. Numa auditoria meço as cinco e digo-te qual é a tua."}
          </p>
        </Reveal>
      </div>
    </section>
  );
};

export default CincoDimensoes;
