import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import HeroSection from "@/components/sections/HeroSection";
import ProofMarquee from "@/components/sections/ProofMarquee";
import Problema from "@/components/sections/home/Problema";
import Prova from "@/components/sections/home/Prova";
import TresPortas from "@/components/sections/home/TresPortas";
import Sobre from "@/components/sections/home/Sobre";
import Captura from "@/components/sections/home/Captura";
import PointerField from "@/components/journey/PointerField";

/**
 * A home, construída ao brief de 12 de outubro.
 *
 * Seis blocos, nesta ordem, e a ordem é o argumento: a promessa, o problema
 * que a merece, a prova de que o problema foi resolvido por dentro, o que se
 * pode comprar, quem ele é, e a lista. As credenciais chegam depois da ideia
 * que estão a provar, nunca antes, porque uma credencial não faz ninguém
 * ficar e um ciclo que a pessoa reconhece faz.
 *
 * Em português, porque é onde está a conversão e porque o texto todo já
 * estava escrito em português no documento-mãe da história. O inglês serve
 * alcance e LinkedIn, e sai daqui traduzido, nunca escrito de raiz.
 *
 * As quatro regras que esta página cumpre e que não se negoceiam: o título
 * protegido não aparece em lado nenhum, o produto de atleta não é nomeado
 * nem ligado, o trabalho internacional é uma linha sem nome, clube nem
 * valor, e não há preços, porque publicá-los antes de o enquadramento do
 * estágio estar fechado cria um conflito que ainda não existe.
 *
 * O que a página anterior tinha e esta não tem, com a razão: a caminhada
 * pelos três ambientes era currículo e não caso; os números de alcance
 * estavam datados de setembro e as citações não têm autorização; a escada de
 * ofertas ordenava por preço, que é trabalho de outra página. Esses três
 * ficheiros continuam no repositório e não estão montados em lado nenhum.
 */
const Index = () => {
  return (
    <PointerField>
    <Layout>
      <SEO
        title="Guilherme Neves, Game Nutrition"
        description="Construo o sistema de nutrição que uma equipa usa à volta da competição: matchday, viagem, hidratação, recuperação. Simples ao ponto de os jogadores o cumprirem."
        path="/"
      />

      {/* 1. A promessa. Fuelled, not full. */}
      <HeroSection />

      {/* Onde, lido num relance e a andar sozinho. */}
      <ProofMarquee />

      {/* 2. O problema, que é o que faz ficar. */}
      <Problema />

      {/* 3. A prova, com cada número atribuído a onde foi feito. */}
      <Prova />

      {/* 4. As três portas, sem preços. */}
      <TresPortas />

      {/* 5. Quem sou, cortado da história e não escrito de novo. */}
      <Sobre />

      {/* 6. A captura, que é a razão de a página existir. */}
      <Captura />
    </Layout>
    </PointerField>
  );
};

export default Index;
