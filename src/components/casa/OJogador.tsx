import Reveal from "@/components/Reveal";

/**
 * 01 · O jogador. A história começa sempre no problema, nunca no currículo
 * (historia.md, regra 1), e o problema dele tem uma frase que ninguém inventa:
 * as contas de cabeça antes dos jogos.
 *
 * Não tem botão, e é de propósito. Isto é verdade, e uma verdade com um botão
 * no fim passa a ser campanha. O texto é a versão ③ de historia.md traduzida
 * de perto: as palavras são dele, só mudaram de língua.
 */
const OJogador = () => (
  <section className="scene-dark section-padding section-spacing">
    <div className="max-content">
      <Reveal>
        <p className="t-kicker" style={{ color: "hsl(var(--ivory) / 0.5)" }}>
          01 · The player
        </p>
      </Reveal>

      <Reveal delay={0.05}>
        <p className="t-quote mt-10 md:mt-14 max-w-5xl">“I’ve eaten loads. Hope I’m not starting.”</p>
      </Reveal>
      <Reveal delay={0.12}>
        <p
          className="t-title mt-5 max-w-4xl"
          style={{ color: "hsl(var(--ivory) / 0.42)", fontWeight: 500 }}
        >
          “Or I’ll eat more, I already know I’m on the bench.”
        </p>
      </Reveal>
      <Reveal delay={0.18}>
        <p className="t-kicker mt-8" style={{ color: "hsl(var(--ivory) / 0.5)" }}>
          The maths I used to do in my head before games
        </p>
      </Reveal>

      <div className="grid md:grid-cols-12 gap-x-8 gap-y-12 mt-20 md:mt-28 items-start">
        <Reveal className="md:col-span-5">
          <p className="text-body-lg">
            Twelve years of football, up to the second national division, and one thing I never
            managed to solve: the balancing act between wanting to be leaner and having the energy
            to train and perform. I cut during the week, ran out of gas, trained worse, didn’t
            play, made up for it at the weekend with what I shouldn’t have, and arrived at games
            full, tired and sleepy. For years I was full, not fuelled, and I didn’t even know it had
            a name.
          </p>
        </Reveal>
        <Reveal className="md:col-span-6 md:col-start-7" delay={0.1}>
          <p className="t-title" style={{ fontSize: "clamp(2rem, 3.7vw, 3.6rem)" }}>
            It wasn’t a lack of work.
            <br />
            It was a lack of literacy.
          </p>
          <p className="text-body-lg mt-6">
            And literacy is scarcest in exactly the people who depend on it most.
          </p>
        </Reveal>
      </div>
    </div>
  </section>
);

export default OJogador;
