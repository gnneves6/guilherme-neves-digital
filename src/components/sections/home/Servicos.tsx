import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";

/**
 * Serviços, em três colunas com uma luz e um ícone por coluna.
 *
 * A versão anterior era uma lista de três linhas debaixo do título "o que se
 * compra", e a crítica dele cobre as duas coisas: a expressão não tem jeito
 * nenhum, e uma lista de texto não guia ninguém. Quem chega varre a página
 * com os olhos. Se não houver uma forma e uma cor a dizer para quem é cada
 * coluna antes de se ler a primeira palavra, a pessoa não chega lá.
 *
 * Por isso cada coluna abre com um painel: vidro por cima do fundo, uma luz
 * própria a subir de baixo, e um ícone desenhado para aquele serviço e não
 * um símbolo de biblioteca. O pentágono de cinco nós é literalmente o
 * diagrama da secção seguinte; a folha com a faísca é o que ele constrói com
 * AI; a camisola é a mesma linguagem do capítulo dos equipamentos.
 *
 * As três áreas estão fixadas em `arquitetura-de-ofertas.md` §8, e a
 * diferença entre elas não é o público, é o valor: tempo, processo,
 * cumprimento. É isso que cada linha tem de dizer.
 *
 * Sem preços, de propósito, e sem as palavras que descrevem acto regulado.
 */

const Folha = () => (
  <svg viewBox="0 0 32 32" fill="none" className="w-11 h-11" aria-hidden>
    <rect x="3.5" y="6.5" width="25" height="21" rx="2" stroke="currentColor" strokeWidth="1.2" />
    <path d="M3.5 12.5h25M12 12.5v15M21 12.5v15" stroke="currentColor" strokeWidth="1.2" />
    <rect x="12" y="12.5" width="9" height="5" fill="currentColor" opacity="0.22" />
    <path
      d="M26.5 2.2l.95 2.35 2.35.95-2.35.95-.95 2.35-.95-2.35-2.35-.95 2.35-.95.95-2.35z"
      fill="currentColor"
    />
  </svg>
);

const Pentagono = () => (
  <svg viewBox="0 0 32 32" fill="none" className="w-11 h-11" aria-hidden>
    <path
      d="M16 6 L26.5 13.6 L22.5 25.9 L9.5 25.9 L5.5 13.6 Z"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
    <path
      d="M16 17 L16 6M16 17 L26.5 13.6M16 17 L22.5 25.9M16 17 L9.5 25.9M16 17 L5.5 13.6"
      stroke="currentColor"
      strokeWidth="0.8"
      opacity="0.4"
    />
    {[
      [16, 6],
      [26.5, 13.6],
      [22.5, 25.9],
      [9.5, 25.9],
      [5.5, 13.6],
    ].map(([cx, cy]) => (
      <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.8" fill="currentColor" />
    ))}
  </svg>
);

const Camisola = () => (
  <svg viewBox="0 0 32 32" fill="none" className="w-11 h-11" aria-hidden>
    <path
      d="M11.5 5.5 L6.5 8 L4.5 13.5 L8.5 15 L8.5 27 H23.5 L23.5 15 L27.5 13.5 L25.5 8 L20.5 5.5 C19.3 7.8 17.8 8.6 16 8.6 C14.2 8.6 12.7 7.8 11.5 5.5 Z"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
    <path d="M13 19.5h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.55" />
  </svg>
);

const servicos = [
  {
    n: "01",
    icone: <Folha />,
    luz: "150 36% 30%",
    luzClara: "148 42% 64%",
    titulo: "Ferramentas, construídas contigo",
    para: "Profissionais que trabalham com atletas",
    valor:
      "A folha que te leva uma tarde passa a levar dez minutos. E sais com ela construída por ti, não alugada à minha.",
    itens: ["Sessão a dois", "Revisão do teu ficheiro", "Formação de equipa"],
    href: "/contact",
  },
  {
    n: "02",
    icone: <Pentagono />,
    luz: "36 58% 40%",
    luzClara: "40 70% 68%",
    titulo: "Auditoria e sistemas de clube",
    para: "Clubes · Academias · Centros de alto rendimento",
    valor:
      "Meço as cinco dimensões, mostro onde se perde tempo e dinheiro, e deixo o processo escrito a funcionar sem depender de uma pessoa.",
    itens: ["Relatório e plano", "Dia de jogo e viagem", "Catering e hidratação"],
    href: "#dimensoes",
  },
  {
    n: "03",
    icone: <Camisola />,
    luz: "256 28% 42%",
    luzClara: "258 48% 74%",
    titulo: "Apoio a atletas de elite",
    para: "O atleta e a equipa privada dele",
    valor:
      "O que existe no supermercado onde ele vive, o que ele come mesmo, e um padrão que aguenta a época. Com a equipa dele, não por cima dela.",
    itens: ["Chegada a um clube novo", "Época acompanhada", "No sítio ou à distância"],
    href: "/contact",
  },
];

const Servicos = () => (
  <section id="servicos" className="section-padding section-spacing scroll-mt-24">
    <div className="max-content">
      <Reveal>
        <p className="text-caption mb-6">Serviços</p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="text-headline max-w-3xl">
          A ciência não chega ao atleta sozinha. Alguém tem de construir o que
          a leva lá.
        </h2>
      </Reveal>

      <div className="mt-12 md:mt-16 grid md:grid-cols-3 gap-y-14 gap-x-7 lg:gap-x-10">
        {servicos.map((s, i) => {
          const interno = s.href.startsWith("#");
          const corpo = (
            <div className="group block">
              {/* O painel. A luz sobe de baixo e cresce ao passar o rato, que
                  é o que faz a coluna responder sem precisar de uma frase a
                  dizer que é clicável. */}
              <div
                className="relative h-40 md:h-48 overflow-hidden rounded-[3px]"
                style={{ background: "hsl(var(--charcoal-deep))" }}
              >
                {/* A luz. Em fundo claro isto lia como uma mancha de cor:
                    uma luz só se vê contra escuro, e era esse o pedido. */}
                <motion.div
                  aria-hidden
                  className="absolute inset-0"
                  initial={false}
                  whileHover={{ opacity: 1, scale: 1.08 }}
                  transition={{ duration: 0.6 }}
                  style={{
                    background: `radial-gradient(ellipse 78% 64% at 50% 100%, hsl(${s.luz} / 0.9), hsl(${s.luz} / 0.25) 46%, transparent 76%)`,
                    opacity: 0.8,
                  }}
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{ background: `radial-gradient(ellipse 34% 26% at 50% 97%, hsl(${s.luzClara} / 0.55), transparent 70%)` }}
                />
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px"
                  style={{ background: `linear-gradient(to right, transparent, hsl(${s.luzClara} / 0.35), transparent)` }}
                />
                <div className="absolute inset-0 flex items-center justify-center pt-5">
                  <span
                    className="block transition-transform duration-500 group-hover:-translate-y-1.5"
                    style={{ color: `hsl(${s.luzClara})` }}
                  >
                    {s.icone}
                  </span>
                </div>
                <span
                  className="absolute top-3.5 left-4 font-display text-[10px] tracking-[0.3em]"
                  style={{ color: `hsl(${s.luzClara} / 0.6)` }}
                >
                  {s.n}
                </span>
              </div>

              <h3 className="font-display text-xl lg:text-2xl font-medium tracking-tight text-foreground mt-6 leading-snug">
                {s.titulo}
              </h3>
              <p className="text-caption text-[10px] mt-2.5">{s.para}</p>
              <p className="text-body text-sm mt-4 leading-relaxed">{s.valor}</p>

              <ul className="mt-5 flex flex-wrap gap-x-2 gap-y-2">
                {s.itens.map((item) => (
                  <li
                    key={item}
                    className="font-display text-[11px] tracking-wide px-2.5 py-1 rounded-[2px] border"
                    style={{ borderColor: `hsl(${s.luz} / 0.4)`, color: "hsl(var(--foreground) / 0.72)" }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );

          return (
            <Reveal key={s.n} delay={0.12 + i * 0.1}>
              {interno ? (
                <a href={s.href}>{corpo}</a>
              ) : (
                <Link to={s.href}>{corpo}</Link>
              )}
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={0.44}>
        <p className="text-caption text-[10px] mt-14 opacity-60">
          Nenhuma das três é uma consulta.
        </p>
      </Reveal>
    </div>
  </section>
);

export default Servicos;
