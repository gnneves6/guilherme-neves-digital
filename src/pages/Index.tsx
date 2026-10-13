import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import HeroSection from "@/components/sections/HeroSection";
import ProofMarquee from "@/components/sections/ProofMarquee";
import EnvironmentsSection from "@/components/sections/EnvironmentsSection";
import Prova from "@/components/sections/home/Prova";
import TresPortas from "@/components/sections/home/TresPortas";
import MatchdayPlanner from "@/components/sections/MatchdayPlanner";
import Captura from "@/components/sections/home/Captura";
import PointerField from "@/components/journey/PointerField";

/**
 * A home mostra o valor. Não conta a história.
 *
 * A versão anterior tinha o ciclo do problema em três parágrafos e o percurso
 * em seis, e isso é um currículo com boa tipografia. Quem chega não quer
 * explicações, quer ver o que há para ter. A história continua a ser a melhor
 * coisa que ele escreveu e por isso merece uma página onde alguém a vá ler de
 * propósito, não a primeira, onde é um obstáculo entre a pessoa e a oferta.
 *
 * Cinco blocos, e a ordem é promessa, prova, oferta, demonstração, lista:
 *
 *   1. HeroSection         Arrive fuelled, not full, e o que é em duas linhas
 *   2. ProofMarquee        onde, lido num relance e a mexer
 *   3. EnvironmentsSection o manequim com as cores de cada clube, um de cada vez
 *   4. Prova               três números atribuídos, mais o passo de agora
 *   5. TresPortas          o que se compra, uma linha cada, sem preços
 *   6. MatchdayPlanner     a parte útil, que se usa em vez de se ler
 *   7. Captura             a lista
 *
 * Os ambientes voltaram, e o corte que eu lhes tinha feito estava errado na
 * peça certa: o problema nunca foi a secção, foi o parágrafo de âmbito lá
 * dentro. Tirado esse e a nota de época, o que sobra é o que a fazia valer,
 * o manequim a mudar de cores clube a clube e três provas curtas por cada
 * um. Mostra em vez de contar, que é a única coisa que esta página tem de
 * fazer.
 *
 * O planeador é o bloco que mudou tudo e já existia, parado numa página
 * interior. É a única coisa aqui que entrega valor em vez de o descrever:
 * escolhe-se uma hora de jogo e o dia resolve-se à frente da pessoa. Também
 * é o único painel escuro e com cor numa página que, sem ele, é texto preto
 * sobre osso do princípio ao fim.
 *
 * Problema.tsx e Sobre.tsx continuam no repositório e não estão montados.
 * São o texto de /historia quando essa página existir, e é por isso que não
 * foram apagados.
 */
const Index = () => {
  return (
    <PointerField>
    <Layout>
      <SEO
        title="Guilherme Neves, Game Nutrition"
        description="O sistema de nutrição que uma equipa usa à volta da competição. Simples ao ponto de os jogadores o cumprirem."
        path="/"
      />

      <HeroSection />
      <ProofMarquee />
      <EnvironmentsSection />
      <Prova />
      <TresPortas />
      <MatchdayPlanner />
      <Captura />
    </Layout>
    </PointerField>
  );
};

export default Index;
