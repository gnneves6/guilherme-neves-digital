import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Sitio } from "@/data/terreno";

/**
 * UM LUGAR, e é a resposta à crítica que fechou o dia 1 de novembro.
 *
 * Crítica dele, e tem razão: *"prefiro, em vez de scroll para baixo, navegar
 * e flutuar no mundo, como no site da Delta. Parece que estamos a navegar no
 * mundo deles, a explorar a história deles, e não a descer num site com texto
 * escrito como o nosso."*
 *
 * 📏 O que eu medi no deltacafes.com desmente metade do diagnóstico e confirma
 * a outra metade. Aquele site É scroll vertical: 11.140 px, scroll nativo, e
 * `pin` não aparece uma única vez nos ficheiros deles. Logo a sensação de
 * mundo não vem da direcção do movimento.
 *
 * Vem de três coisas, e esta peça tem as três:
 *
 *   1. A FOTOGRAFIA OCUPA O ECRÃ. Não é uma ilustração ao lado de um
 *      parágrafo, é o sítio. O `Sitio` anterior punha cinco camadas de texto
 *      por baixo da imagem, e isso é uma página de texto com uma fotografia
 *      em cima.
 *   2. TRÊS LINHAS, NO MÁXIMO. Número, nome, e uma frase. Tudo o resto espera
 *      por quem quiser entrar.
 *   3. A CÂMARA MEXE-SE SEMPRE, devagar e por tempo, não por scroll.
 *
 * E a quarta, que é dele e não da Delta: entrar num lugar é uma DECISÃO da
 * pessoa, não uma coisa que lhe acontece por passar. O painel responde ao
 * ponteiro antes do clique, pela regra de 1 nov: um hover que só muda de cor
 * é decoração, um hover que mostra a consequência é informação.
 *
 * ⚠️ Nada aqui depende de scroll nem de `100svh`. Na pré-visualização o
 * scroll interno fica a zero e `100svh` resolve para a altura do documento,
 * que já pôs o documento em 66 mil px uma vez. Altura em píxeis, movimento
 * por tempo e por ponteiro: corre igual nos dois sítios.
 */
const Lugar = ({ sitio }: { sitio: Sitio }) => {
  const [dentro, setDentro] = useState(false);
  const [perto, setPerto] = useState(false);
  const ref = useRef<HTMLElement>(null);

  return (
    <section
      ref={ref}
      id={sitio.id}
      className="relative overflow-hidden scroll-mt-24 h-[620px] md:h-[780px]"
      style={{ background: "hsl(var(--charcoal-deep))" }}
    >
      {/* O sítio. A imagem respira sozinha, 24 s, por tempo. */}
      <motion.img
        src={sitio.foto}
        alt={sitio.fotoAlt}
        className="absolute inset-0 w-full h-full object-cover sitio-respira"
        style={{ objectPosition: "center 26%" }}
        animate={{ filter: dentro ? "saturate(0.72)" : "saturate(1)" }}
        transition={{ duration: 0.8 }}
      />

      {/* 🚨 O ESCURECIMENTO NÃO É ESTÉTICA, É PROTECÇÃO, e a primeira versão
          desta peça falhou nisto. A ecrã inteiro liam-se duas caras de
          terceiros nesta fotografia, e nenhum deles deu autorização nenhuma.
          A regra é de 27 out: entrega ➜ caso ➜ autorização escrita ➜ foto, e
          em atletas da R4E a autorização é com a R4E.
          Por isso são duas camadas e não uma: um véu liso por cima de tudo,
          que tira a leitura da cara, mais o degradé que devolve o contraste
          ao texto em baixo. Medido a 1440 depois de aplicado. */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: "hsl(var(--charcoal-deep) / 0.52)" }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, hsl(var(--charcoal-deep) / 0.72) 0%, hsl(var(--charcoal-deep) / 0.42) 30%, hsl(var(--charcoal-deep) / 0.86) 74%, hsl(var(--charcoal-deep) / 0.97) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(118% 78% at 50% 34%, transparent 24%, hsl(var(--charcoal-deep) / 0.6) 100%)",
        }}
      />
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: "hsl(var(--charcoal-deep))" }}
        animate={{ opacity: dentro ? 0.55 : perto ? 0.18 : 0 }}
        transition={{ duration: 0.5 }}
      />

      {/* As três linhas, e mais nada. */}
      <div className="relative h-full max-content section-padding flex flex-col justify-end pb-12 md:pb-16">
        {/* Apaga-se ao entrar: visto por transparência debaixo do painel, o
            nome do sítio lia-se como um erro de desenho e não como fundo. */}
        <motion.div
          animate={{ y: dentro ? -14 : 0, opacity: dentro ? 0.12 : 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p
            className="font-display text-[10px] tracking-[0.3em] uppercase tabular-nums"
            style={{ color: "hsl(var(--ivory) / 0.55)" }}
          >
            {sitio.numero} · O terreno
          </p>
          <h2
            className="font-display text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight mt-3"
            style={{ color: "hsl(var(--ivory))" }}
          >
            {sitio.nome}
          </h2>
          <p
            className="text-base md:text-xl max-w-xl mt-4 leading-snug"
            style={{ color: "hsl(var(--ivory) / 0.74)" }}
          >
            {sitio.tagline}
          </p>
        </motion.div>

        {/* A porta. Com o rato em cima já começa a abrir, para se perceber
            que há alguma coisa atrás sem ser preciso clicar. */}
        {/* Escondido enquanto se está dentro: a primeira versão deixava-o por
            baixo do painel, e lia-se por transparência como um fantasma. A
            saída passa a estar DENTRO do painel, que é onde a pessoa está. */}
        <div className="mt-7" style={{ opacity: dentro ? 0 : 1, pointerEvents: dentro ? "none" : "auto" }}>
          <button
            type="button"
            onClick={() => setDentro(true)}
            onPointerEnter={() => setPerto(true)}
            onPointerLeave={() => setPerto(false)}
            onFocus={() => setPerto(true)}
            onBlur={() => setPerto(false)}
            className="inline-flex items-center gap-3 font-display text-sm tracking-wide"
            style={{ color: "hsl(var(--ivory))" }}
          >
            <span
              className="inline-flex items-center justify-center w-10 h-10 rounded-full"
              style={{ border: "1px solid hsl(var(--ivory) / 0.45)" }}
            >
              <motion.span
                aria-hidden
                animate={{ rotate: 45 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                ↓
              </motion.span>
            </span>
            Entrar neste sítio
          </button>

          {/* A antevisão: a primeira linha do que está lá dentro, só com o
              rato em cima. Mostra o GÉNERO do que há atrás e guarda o resto. */}
          <AnimatePresence>
            {perto && !dentro && (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.3 }}
                className="text-sm mt-4 max-w-md leading-snug"
                style={{ color: "hsl(var(--olive-light))" }}
              >
                {sitio.posicao.frase}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* A profundidade, só para quem entra. Sobe por cima do sítio em vez de
          empurrar a página, que é a diferença entre entrar num sítio e ler
          mais um bloco por baixo. */}
      <AnimatePresence>
        {dentro && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-0 bottom-0 top-[22%] overflow-y-auto"
            style={{
              background: "hsl(var(--charcoal-deep) / 0.94)",
              borderTop: "1px solid hsl(var(--ivory) / 0.16)",
            }}
          >
            <div className="max-content section-padding pt-6">
              <button
                type="button"
                onClick={() => setDentro(false)}
                className="inline-flex items-center gap-2.5 font-display text-[11px] tracking-[0.2em] uppercase"
                style={{ color: "hsl(var(--ivory) / 0.6)" }}
              >
                <span aria-hidden>↑</span> Voltar ao terreno
              </button>
            </div>
            <div className="max-content section-padding pt-6 pb-10 md:pb-12 grid md:grid-cols-2 gap-10 md:gap-14">
              <div>
                <p className="text-caption text-[10px]" style={{ color: "hsl(var(--ivory) / 0.45)" }}>
                  A posição
                </p>
                <p
                  className="font-display text-xl md:text-2xl font-medium mt-3 leading-snug"
                  style={{ color: "hsl(var(--ivory))" }}
                >
                  {sitio.posicao.frase}
                </p>
                <p className="text-sm mt-4 leading-relaxed" style={{ color: "hsl(var(--ivory) / 0.7)" }}>
                  {sitio.posicao.corpo}
                </p>

                <p className="text-caption text-[10px] mt-9" style={{ color: "hsl(var(--ivory) / 0.45)" }}>
                  {sitio.perguntas.quando}
                </p>
                <ul className="mt-3 space-y-2">
                  {sitio.perguntas.linhas.map((l) => (
                    <li
                      key={l}
                      className="text-sm leading-snug pl-4"
                      style={{
                        color: "hsl(var(--ivory) / 0.62)",
                        borderLeft: "1px solid hsl(var(--ivory) / 0.2)",
                      }}
                    >
                      {l}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-caption text-[10px]" style={{ color: "hsl(var(--ivory) / 0.45)" }}>
                  O que fica cá
                </p>
                <img
                  src={sitio.artefacto.imagem}
                  alt={sitio.artefacto.imagemAlt}
                  className="w-full mt-3 object-cover h-44 md:h-56"
                  style={{ border: "1px solid hsl(var(--ivory) / 0.14)" }}
                />
                <p
                  className="font-display text-base font-medium mt-4"
                  style={{ color: "hsl(var(--ivory))" }}
                >
                  {sitio.artefacto.nome}
                </p>
                <p className="text-sm mt-2 leading-relaxed" style={{ color: "hsl(var(--ivory) / 0.7)" }}>
                  {sitio.artefacto.corpo}
                </p>
                <p className="text-sm mt-3" style={{ color: "hsl(var(--olive-light))" }}>
                  {sitio.artefacto.fica}
                </p>

                <p className="text-[11px] mt-8" style={{ color: "hsl(var(--ivory) / 0.45)" }}>
                  <span className="tabular-nums">{sitio.agora.data}</span> · {sitio.agora.linha}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Lugar;
