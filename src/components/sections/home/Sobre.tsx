import Reveal from "@/components/Reveal";

/**
 * Sobre, cortado da versão de dois minutos da história.
 *
 * Nada aqui é escrito de novo. É texto dele, encurtado, porque a regra é que
 * texto novo sobre ele se corta do documento-mãe em vez de se inventar.
 *
 * A palavra que não aparece, e não aparece em lado nenhum deste site: o
 * título é protegido e depende de cédula. O que se escreve é o grau.
 *
 * Fecha na imagem dos toques na parede, e não numa tagline, porque uma
 * imagem é a única coisa num site destes que ninguém consegue copiar.
 */
const Sobre = () => (
  <section className="section-padding section-spacing-sm">
    <div className="max-content max-w-3xl">
      <Reveal>
        <p className="text-caption mb-6">Quem sou</p>
      </Reveal>

      <Reveal delay={0.08}>
        <p className="text-body-lg">
          Passei a infância e a adolescência como atleta. Mais de seis
          desportos, mas o que me tocou à alma foi sempre o futebol. Joguei
          doze anos, até à 2.ª divisão nacional. E houve um dia em que tive de
          aceitar que não ia ser jogador profissional.
        </p>
      </Reveal>

      <Reveal delay={0.14}>
        <p className="font-display italic text-xl md:text-2xl text-foreground mt-7">
          Custa. Mas o jogo não tem de acabar ali.
        </p>
      </Reveal>

      <Reveal delay={0.2}>
        <p className="text-body-lg mt-7">
          Segui as paixões todas de uma vez: o desporto, a ciência, a
          alimentação. Licenciei-me em Ciências da Nutrição pela FCNAUP, a
          única faculdade do país dedicada só a isto. E anos mais tarde cheguei
          ao futebol europeu por uma via que, confesso, não estava nos meus
          planos.
        </p>
      </Reveal>

      <Reveal delay={0.26}>
        <p className="text-body-lg mt-5">
          Foi lá dentro que percebi duas coisas. Que este trabalho vai muito
          além do conhecimento, é sistemas, logística, contexto e cultura. E
          que o meu problema nunca tinha sido só meu: atletas de elite sem os
          básicos, com o potencial inteiro em cima da mesa, numa carreira que
          acaba aos 30.
        </p>
      </Reveal>

      <Reveal delay={0.32}>
        <p className="text-body-lg mt-5">
          Hoje construo de raiz o serviço de nutrição de um centro de alto
          rendimento, acompanhei um jogador profissional fora de Portugal aos
          21 anos, e construo ferramentas para que a ciência chegue ao atleta
          de uma forma que ele use sozinho.
        </p>
      </Reveal>

      <Reveal delay={0.38}>
        <p className="text-body-lg mt-5">
          Trabalho numa área que ainda não é devidamente reconhecida e que tem
          muita pedra para partir. O que quero construir é uma forma de
          trabalhar que trate a alimentação como potencial, não como restrição.
        </p>
      </Reveal>

      <Reveal delay={0.44}>
        <p className="font-display italic text-lg md:text-xl mt-8" style={{ color: "hsl(var(--foreground) / 0.72)" }}>
          E aqui continuo eu a dar toques na parede de minha casa. Porque a
          paixão e a alegria podem, e devem, continuar dentro de nós.
        </p>
      </Reveal>
    </div>
  </section>
);

export default Sobre;
