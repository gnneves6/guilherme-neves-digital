import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import PointerField from "@/components/journey/PointerField";
import EnvironmentsSection from "@/components/sections/EnvironmentsSection";
import Tunel from "@/components/casa/Tunel";
import Jogador from "@/components/casa/Jogador";
import Tese from "@/components/casa/Tese";
import Prateleira from "@/components/casa/Prateleira";
import Pertencer from "@/components/casa/Pertencer";
import Fecho from "@/components/casa/Fecho";

/**
 * A casa, feita de palcos. A forma está em gui-os/04-WEBSITE/visao-do-site.md.
 *
 * A 7 nov ele disse que a única parte do site que parecia feita a sério era
 * a dos equipamentos, porque tinha camadas, profundidade e mexia-se quando
 * se navegava, e que o resto era texto num fundo branco. Tinha razão, e a
 * página passou a ser toda feita nessa linguagem (components/palco):
 *
 *   Tunel        a frase sozinha num túnel; o scroll anda até à luz
 *   Jogador      01, o balneário, uma frase dele de cada vez
 *   Equipamentos 02, a peça que ele quis de volta: um clube de cada vez
 *   Tese         o túnel até ao relvado: a evidência a tornar-se prática
 *   Prateleira   03, as ferramentas numa fila que corre na horizontal
 *   Pertencer    04, os 80 e tal pedidos do Radar a juntarem-se, e a lista
 *   Fecho        a parede de casa, o que está aberto, e falar com ele
 *
 * O PointerField só embrulha os equipamentos: faz setState a cada fotograma,
 * e à volta da página inteira re-desenhava tudo sessenta vezes por segundo.
 * Os palcos novos leem o rato sem re-render (usePonteiro).
 */
const Index = () => (
  <Layout>
    <SEO
      title="Guilherme Neves · Performance nutrition, from inside elite football"
      description="Twelve years as a player, then RSC Anderlecht and Leça FC from the inside. I build the systems that carry the science to the athlete, and give most of them away."
      path="/"
    />
    <Tunel />
    <Jogador />
    <PointerField>
      <EnvironmentsSection />
    </PointerField>
    <Tese />
    <Prateleira />
    <Pertencer />
    <Fecho />
  </Layout>
);

export default Index;
