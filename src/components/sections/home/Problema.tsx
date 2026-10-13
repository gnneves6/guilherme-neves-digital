import Reveal from "@/components/Reveal";

/**
 * O problema, contado por dentro.
 *
 * É o segundo bloco da página de propósito. Quem chega não sabe quem ele é,
 * e uma credencial não faz ninguém ficar. O ciclo faz, porque qualquer
 * jogador que já foi para um jogo cheio reconhece-se nele em três linhas.
 *
 * O texto é dele, cortado de `historia.md`. A regra que governa esta página
 * inteira: a história começa sempre no problema, nunca no currículo, e as
 * credenciais são prova, que vem depois da ideia que está a provar.
 *
 * `full, not fuelled` só pode aparecer aqui. No hero é a promessa ao
 * contrário, e em presente poria o próprio como o estado-problema.
 */
const Problema = () => (
  <section className="section-padding section-spacing-sm">
    <div className="max-content max-w-3xl">
      <Reveal>
        <p className="text-caption mb-6">Porque é que faço isto</p>
      </Reveal>

      <Reveal delay={0.08}>
        <p className="font-display text-2xl md:text-3xl lg:text-[2.4rem] font-light leading-[1.22] tracking-tight text-foreground">
          Cortava durante a semana, ficava sem energia, treinava pior, não
          jogava, compensava ao fim de semana com o que não devia, e chegava ao
          jogo cheio, cansado e sonolento.
        </p>
      </Reveal>

      <Reveal delay={0.16}>
        <p className="text-body-lg mt-7 md:mt-9">
          Cheguei a fazer contas de cabeça antes dos jogos. Comi muito, espero
          não ser titular. Andei doze anos <em>full, not fuelled</em>, cheio mas
          sem combustível, e nem sabia que aquilo tinha nome.
        </p>
      </Reveal>

      <Reveal delay={0.24}>
        <p className="text-body-lg mt-5">
          Não foi falta de trabalho. Foi falta de literacia, e ela é escassa
          precisamente em quem mais depende dela.
        </p>
      </Reveal>
    </div>
  </section>
);

export default Problema;
